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
    import { getAuthClient } from "@/libs/util";
    import draggable from '_libs/vue-draggable'
	import oss from "@/libs/oss-utils";
	import underscore from "underscore-extend"
    
    import config from "@/config"
	
	const FAST_IMG_UPLOAD_PATH = `${config.serviceBaseUrl.base}/zuul/tongplatform/common/third-party-extranet/v1/attachment/upload-pics`;
	const ACTION_URL = config.UPLOAD_URL || FAST_IMG_UPLOAD_PATH;
	
    export default {
    	data() {
    		return {
    			headers : getAuthClient(),
    			uploadList : [],
    			imgSrc : '',
                visible : false,
                isShow : true,
                otherParams : this.defaultData,
                filename : config.UPLOAD_URL ? "file" : "files",
                temParams : {},
                flag : true,
                defaultChangeFlag: false,
    		}    		  		
    	},
    	props : {
    		defaultList : Array,
    		defaultData : {
    			type : Object,
    			default(){
    				return {}
    			}
    		},
    		isShowImgName : {
    			type : Boolean,
    			default : false
    		},
    		actionUrl : {
    			type : String,
    			default : ACTION_URL
    		},
    		maxSize : {
    			type : Number,
    			default : 2048
    		},
    		format : {
    			type : Array,
    			default(){
    				return  ['jpg','jpeg','png']
    			}
    		},
    		multiple : {
    			type : Boolean,
    			default : false
    		},
    		maxCount : {
    			type : Number
    		},
    		sort: {
    			type : Boolean,
    			default : false
    		},
    		sortOptions: {
    			type : Object,
    			default() {
    				return {
    					animation: 400,
    					handle: '.sortable',
    					draggable: '.sortable',
    					disabled: !this.sort
    				}
    			}
    		},
    		otherData : {
    			
    		}
    	},
    	components : {
    		draggable
    	},
    	updated : function() {    		
    	
    		if(this.sort) {
    			if(!this.defaultChangeFlag) {
    				this.$refs.upload.fileList = this.uploadList;
    			}else {
    				this.uploadList = this.$refs.upload.fileList;
    			}
    			this.defaultChangeFlag = false;
    		}else {
    			this.uploadList = this.$refs.upload.fileList;
    		}
    		
    		if(this.multiple && (this.uploadList.length < this.maxCount)){
        		this.isShow = true;
        	}else if(this.multiple && (this.uploadList.length >= this.maxCount)){
				this.isShow = false;
			}
        	
    	},
    	mounted : function() {
    		this.uploadList = this.$refs.upload.fileList;
    	},
        methods : {
        	
        	/**
        	 * 预览
        	 */
        	handleView (path) {
                this.imgSrc = path;
                this.visible = true;
            },
            
            /**
             * 删除文件
             */
            handleRemove (file) {
                const fileList = this.uploadList;
                this.uploadList.splice(fileList.indexOf(file), 1);
                this.$emit("handle-remove", this.uploadList, file, this.otherData);
            },
        	
        	/**
        	 * 成功回调
        	 */
        	handleSuccess(res, file, fileList){
        		if(config.UPLOAD_URL){
        			res = {
        				content : [{
        					fileId : this.temParams[file.name],
							fileName : file.name,
							filePath : config.UPLOAD_URL + "/" + this.temParams[file.name]
        				}]
        			}
        			file.url = res.content[0].filePath;
            		file.name = res.content[0].fileName;
            		file.id = res.content[0].fileId;
        			this.$emit("handle-success", res, file, fileList, this.otherData);
        			return;
        		}
        		
        		if(res && res.content && res.content.length > 0){ 
        			
        			file.url = res.content[0].filePath;
            		file.name = res.content[0].fileName;
            		file.id = res.content[0].fileId;
        			this.$emit("handle-success", res, file, fileList, this.otherData);
        		} else {
					this.uploadList.forEach((item, index) => {
						if (!item.id && item.percentage && item.percentage == 100) {
							this.uploadList.splice(index, 1);
						}
					});
					this.$Message.error(res.message);
				}
        	},
        	
        	/**
        	 * 超过文件大小
        	 */
        	handleMaxSize(file){

        		let fileSize = this.maxSize > 1024 
        			? (parseFloat(this.maxSize / 1024).toFixed(2) + "M")
        			: (this.maxSize + "KB");
        		
        		this.$Message.warning("请选择小于"+fileSize+"的文件");        		
        		
        		this.$emit("on-exceeded-size", file, this.otherData);
        	},
        	
        	/**
        	 * 文件格式有误
        	 */
        	handleFormatError(file){
        		
        		this.$Message.warning("请上传正确的文件格式");
        		
        		this.$emit("on-format-error", file, this.otherData);
        	},
        	
        	/**
        	 * 上传之前
        	 */
        	handleBeforeUpload (file){
        		
        		!this.flag && (this.temParams = {});
        		this.flag = true;
        		if(this.multiple && (this.uploadList.length == this.maxCount)){
            		return false;
            	}
        		
        		this.$emit("before-upload", file, this.otherData);
        		
        		!this.multiple && this.handleRemove(file);
        		
        		if(config.UPLOAD_URL){
//      			this.headers = underscore.deepExtend(this.headers, {"content-disposition" : "attachment;filename="+file.name+""});
        			return new Promise((resolve) => {
	        			oss.getUploadParams(file, (data) => {
	        					this.otherParams = underscore.deepExtend(this.otherParams, data);
	        					this.flag = false;
	        					this.temParams[file.name] = this.otherParams.key;
	        					resolve();
	        				
	        			})
	        			
	        		})
        		}
        	
        		
        	},
        	
        	/**
        	 * 上传错误
        	 */
        	handleError (){
				this.isShow = true;
				this.$Message.error("上传失败，请重新上传");
        	},
        	
        	/**
        	 * 排序结束
        	 */
        	sortEnd(e) {
        		if(e.newIndex != e.oldIndex) {
					this.$emit("handle-sort-end", this.uploadList, this.otherData);
        		}
        	}
 
        },
        filters: {
        	format: function (value){
        		return value.replace(/(.+)\.(.+)/g, "$1");
        	}
        },
        watch: {
        	defaultList: {
        		handler: function (val, oldVal) {     		
        			if(val.length != this.uploadList.length && this.sort) {
        				this.defaultChangeFlag = true;
        			}
        		},
      			deep: true
        	}
        }
    }
</script>