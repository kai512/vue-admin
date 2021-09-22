<template>
	<div id="sortPicBox">
		<draggable :options="sortOptions" @end="sortEnd" element="span" class="js-sort-box" v-model="uploadList">
		<div class="upload-list sortable" v-for="(item,index) in uploadList" :key="index">
	        <template v-if="item.status === 'finished'">
	            <img :src="item.url">
	            <div class="upload-list-cover">
	                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
	                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
	            </div>
	        </template>
	        <template v-else>
	            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
	        </template>
	        <span v-if="isShowImgName">{{item.name | format}}</span>
	    </div>
	    <Upload
	    	v-show="isShow"
	        ref="upload"
	        :show-upload-list="false"
	        :default-file-list="defaultList"
	        :on-success="handleSuccess"
	        :on-error="handleError"
	        :on-remove="handleRemove"
	        :format="format"
	        :max-size="maxSize"
	        :on-format-error="handleFormatError"
	        :on-exceeded-size="handleMaxSize"
	        :before-upload="handleBeforeUpload"
	        :headers="headers"
	        :multiple="multiple"
	        :name="filename"
	        type="drag"
	        :action="actionUrl"
	        :data="otherParams">
	        <div>
	            <Icon type="cus-add"></Icon>
	        </div>
	    </Upload>
	    </draggable>
	    <Modal title="查看大图" style="position: relative;z-index: 10001;" v-model="visible" align="center">
	        <img :src="imgSrc" v-if="visible" style="width: 100%">
			<div slot="footer" class="opera-box">
				<Button type="primary" @click="visible=false">关闭</Button>
			</div>
	    </Modal>
    </div>
</template>
<script>
import { getAuthClient } from '@/libs/util'
import draggable from '_libs/vue-draggable'
import oss from '@/libs/oss-utils'
import underscore from 'underscore-extend'

import config from '@/config'

const FAST_IMG_UPLOAD_PATH = `${config.serviceBaseUrl.base}/zuul/tongplatform/common/third-party-extranet/v1/attachment/upload-pics`
const ACTION_URL = config.UPLOAD_URL || FAST_IMG_UPLOAD_PATH

export default {
    data () {
        return {
            headers: getAuthClient(),
            uploadList: [],
            imgSrc: '',
            visible: false,
            isShow: true,
            otherParams: this.defaultData,
            filename: config.UPLOAD_URL ? 'file' : 'files',
            temParams: {},
            flag: true,
            defaultChangeFlag: false
        }
    },
    props: {
        defaultList: Array,
        defaultData: {
            type: Object,
            default () {
                return {}
            }
        },
        isShowImgName: {
            type: Boolean,
            default: false
        },
        actionUrl: {
            type: String,
            default: ACTION_URL
        },
        maxSize: {
            type: Number,
            default: 2048
        },
        format: {
            type: Array,
            default () {
                return ['jpg', 'jpeg', 'png']
            }
        },
        multiple: {
            type: Boolean,
            default: false
        },
        maxCount: {
            type: Number
        },
        sort: {
            type: Boolean,
            default: false
        },
        sortOptions: {
            type: Object,
            default () {
                return {
                    animation: 400,
                    handle: '.sortable',
                    draggable: '.sortable',
                    disabled: !this.sort
                }
            }
        },
        otherData: {

        }
    },
    components: {
        draggable
    },
    updated: function () {
        if (this.sort) {
            if (!this.defaultChangeFlag) {
                this.$refs.upload.fileList = this.uploadList
            } else {
                this.uploadList = this.$refs.upload.fileList
            }
            this.defaultChangeFlag = false
        } else {
            this.uploadList = this.$refs.upload.fileList
        }

        if (this.multiple && (this.uploadList.length < this.maxCount)) {
            this.isShow = true
        } else if (this.multiple && (this.uploadList.length >= this.maxCount)) {
            this.isShow = false
        }
    },
    mounted: function () {
        this.uploadList = this.$refs.upload.fileList
    },
    methods: {

        /**
         * 预览
         */
        handleView (path) {
            this.imgSrc = path
            this.visible = true
        },

        /**
         * 删除文件
         */
        handleRemove (file) {
            const fileList = this.uploadList
            this.uploadList.splice(fileList.indexOf(file), 1)
            this.$emit('handle-remove', this.uploadList, file, this.otherData)
        },

        /**
         * 成功回调
         */
        handleSuccess (res, file, fileList) {
            if (config.UPLOAD_URL) {
                res = {
                    content: [{
                        fileId: this.temParams[file.name],
                        fileName: file.name,
                        filePath: config.UPLOAD_URL + '/' + this.temParams[file.name]
                    }]
                }
                file.url = res.content[0].filePath
                file.name = res.content[0].fileName
                file.id = res.content[0].fileId
                this.$emit('handle-success', res, file, fileList, this.otherData)
                return
            }

            if (res && res.content && res.content.length > 0) {
                file.url = res.content[0].filePath
                file.name = res.content[0].fileName
                file.id = res.content[0].fileId
                this.$emit('handle-success', res, file, fileList, this.otherData)
            } else {
                this.uploadList.forEach((item, index) => {
                    if (!item.id && item.percentage && item.percentage == 100) {
                        this.uploadList.splice(index, 1)
                    }
                })
                this.$Message.error(res.message)
            }
        },

        /**
         * 超过文件大小
         */
        handleMaxSize (file) {
            let fileSize = this.maxSize > 1024
                ? (parseFloat(this.maxSize / 1024).toFixed(2) + 'M')
                : (this.maxSize + 'KB')

            this.$Message.warning('请选择小于' + fileSize + '的文件')

            this.$emit('on-exceeded-size', file, this.otherData)
        },

        /**
         * 文件格式有误
         */
        handleFormatError (file) {
            this.$Message.warning('请上传正确的文件格式')

            this.$emit('on-format-error', file, this.otherData)
        },

        /**
         * 上传之前
         */
        handleBeforeUpload (file) {
            !this.flag && (this.temParams = {})
            this.flag = true
            if (this.multiple && (this.uploadList.length == this.maxCount)) {
                return false
            }

            this.$emit('before-upload', file, this.otherData)

            !this.multiple && this.handleRemove(file)

            if (config.UPLOAD_URL) {
                //  this.headers = underscore.deepExtend(this.headers, {"content-disposition" : "attachment;filename="+file.name+""});
                return new Promise((resolve) => {
                    oss.getUploadParams(file, (data) => {
                        this.otherParams = underscore.deepExtend(this.otherParams, data)
                        this.flag = false
                        this.temParams[file.name] = this.otherParams.key
                        resolve()
                    })
                })
            }
        },

        /**
         * 上传错误
         */
        handleError () {
            this.isShow = true
            this.$Message.error('上传失败，请重新上传')
        },

        /**
         * 排序结束
         */
        sortEnd (e) {
            if (e.newIndex != e.oldIndex) {
                this.$emit('handle-sort-end', this.uploadList, this.otherData)
            }
        }

    },
    filters: {
        format: function (value) {
            return value.replace(/(.+)\.(.+)/g, '$1')
        }
    },
    watch: {
        defaultList: {
            handler: function (val, oldVal) {
                if (val.length != this.uploadList.length && this.sort) {
                    this.defaultChangeFlag = true
                }
            },
            deep: true
        }
    }
}
</script>
<style lang="less">
    @import '../../assets/style/vars.less';
    .img-upload-box{
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .img-upload-box.sigle{
        width: 76px;
        height: 76px;
    }
    .img-upload-box .ivu-upload-drag{
        border-color: @border-color-dark;
    }
    .img-upload-box .ivu-icon-cus-add:before{
        color: @border-color-dark;
    }
    .img-upload-box.sigle.user-header .upload-list img,
    .img-upload-box.sigle.user-header .ivu-upload-drag{
        border-radius: 50%;
    }
    .img-upload-box.sigle.with-title{
        height: auto;
        h3{
            font-size: 14px;
            font-weight: normal;
            color: @text-light;
            text-align: center;
        }
    }
    .img-upload-box.sigle.with-title+.img-upload-box{
        margin-left: 16px;
    }
    .img-upload-box .ivu-upload{
        display: inline-block;
        width: 76px;
        height: 76px;
        vertical-align: top;
    }
    .img-upload-box .ivu-upload>div{
        width: 76px;
        height: 76px;
    }
    .img-upload-box .upload-list{
        width: 76px;
        height: 76px;
        display: inline-block;
        vertical-align: top;
        margin-right: 16px;
        position: relative;
        border:solid 1px @border-color-base;
    }
    .img-upload-box .ivu-upload i{
        font-size: 20px;
        line-height: 74px;
        color: @border-color-base;
        vertical-align: top;
    }
    .img-upload-box .upload-list img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    //安卓特殊处理
    .img-upload-box.android-bottom-logo .upload-list img{
        height: auto;
        width:100%;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        background: white;
    }
    //安卓特殊处理end
    .img-upload-box.sigle .upload-list~.ivu-upload{
        position: absolute;
        left: 0;
        bottom:0;
    }
    .img-upload-box.sigle .upload-list~.ivu-upload .ivu-upload-drag{
    //  display: none;
        height: 20px;
        position: absolute;
        bottom: 0;
        z-index: 10;
        background: rgba(0,0,0,.5);
        border: 0;
        border-radius: 0;
    }
    .img-upload-box .upload-list{
        // margin-bottom: 32px;
    }
    .img-upload-box .upload-list~.ivu-upload .ivu-upload-drag{
        display: inline-block;
        width: 76px;
        height: 76px;
        vertical-align: top;
    }
    .img-upload-box.sigle .upload-list~.ivu-upload .ivu-upload-drag:before{
        content: "\重新选择";
        color: white;
        font-size: 12px;
        line-height: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }
    .img-upload-box .upload-list-cover{
        position: absolute;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 9;
    }
    .img-upload-box .upload-list-cover .ivu-icon{
        color: white;
        font-size: 18px;
    }
    .img-upload-box .upload-list-cover .ivu-icon-ios-eye-outline{
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
    }
    .img-upload-box .upload-list-cover .ivu-icon-ios-eye-outline:before{
        display: none;
    }
    .img-upload-box .ivu-icon-ios-trash-outline{
        position: absolute;
        right: 0;
        top:0;
        width: 24px;
        height: 24px;
        line-height: 24px;
        background: rgba(0,0,0,.5);
        border-radius: 0 0 0 6px;
        text-align: center;
    }
    .img-upload-box.large .upload-list,
    .img-upload-box.large .ivu-upload>div,
    .img-upload-box.large .ivu-upload{
        width: 111px;
        height: 188px;
    }
    .img-upload-box.sigle.large,
    .img-upload-box.sigle.large .upload-list,
    .img-upload-box.sigle.large .ivu-upload>div,
    .img-upload-box.sigle.large .ivu-upload{
        width: 111px;
        height: 188px;
    }
    .img-upload-box .upload-list ~ .ivu-upload .ivu-upload-drag{
        width: 100%;
        height: 100%;
        line-height: 188px;
    }
    .img-upload-box.large .ivu-upload i{
        line-height: 188px;
    }
    .img-upload-box.sigle.large .upload-list~.ivu-upload .ivu-upload-drag:before{
        line-height: 32px;
    }
    .img-upload-box.sigle.large .upload-list ~ .ivu-upload .ivu-upload-drag{
        height: 32px;
    }

    .much-list .img-upload-box{
        margin-top: 24px;
    }
    //上传图标
    .img-upload-box.icon-upload{
        @imgSize:64px;
        .img-size(@size:@imgSize){
            width: @size;
            height: @size;
            border-radius: 50%;
        }
        display: block;
        margin: 0 auto;
        overflow: hidden;
        .img-size();
        .upload-list{
            .img-size();
        }
        .ivu-upload{
            .img-size;
            .ivu-upload-drag{
                border-style: solid;
            }
            & >div{
                .img-size;
            }
            i{
                line-height: @imgSize;
            }
        }
        &~.img-info{
            margin: @l-space;
            font-size:14px;
            color: #bbb;
            line-height: 1.25;
        }
        .ivu-icon-ios-trash-outline{
            display: none;
        }
        .upload-list ~ .ivu-upload .ivu-upload-drag{
            line-height: 32px;
            height: 32px;
            &:before{
                line-height: 32px;
            }
            .ivu-icon-cus-add{
                display: none;
            }
        }
    }

    .upload-resize(@widht,@height){
        width: @widht;
        height: @height;
        .upload-list,
        .ivu-upload>div,
        .ivu-upload{
            width: @widht;
            height: @height;
        }
        .ivu-upload i{
            line-height: @height;
        }
    }

    //单张上传尺寸重置
    //上传身份证
    .img-upload-box.sigle.id-card{
        .upload-resize(280px,157px);
    }
    //上传服务大图单图
    .img-upload-box.service-pic-big{
        .upload-resize(351px,112px);
    }
    //服务大图单图end
    //单图上传end
    .user-header{
        border-radius: 50%;
    }
    .user-header img{
        border-radius: 50%;
    }
    .img-info{
        color: #bbb;
        margin-top: @s-space;
    }
    .ivu-upload-drag p{
        color: @text-light;
    }
    .ivu-icon-ios-cloud-upload{
        color: @main-color !important;
    }
    .ivu-icon-ios-cloud-upload-outline:before{
        content: "\e908";
        font-family: icon-font;
    }
    .ivu-btn-ghost{
        color:@main-color;
        border-color: currentcolor;
    }
    .ivu-upload-drag p{
        color: #bbb;
    }
</style>
