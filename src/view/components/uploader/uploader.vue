<template>
    <div style="background: white;padding: 16px;">
        <i-form :label-width="120">
            <FormItem label="单图上传：">
                <!--sigle单图上传-->
                <div class="img-upload-box sigle">
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        >
                        <div>
                            <Icon type="cus-add"></Icon>
                        </div>
                    </Upload>
                </div>
                <div class="img-info">
                    建议上传180*180大小不超过200K，支持扩展名：.jpg .jpeg .png .gif...
                </div>
            </FormItem>
            <FormItem label="多图上传：">
                <div class="img-upload-box">
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        >
                        <div>
                            <Icon type="cus-add"></Icon>
                        </div>
                    </Upload>
                </div>
                <div class="img-info">
                    建议上传180*180大小不超过200K，支持扩展名：.jpg .jpeg .png .gif...
                </div>
            </FormItem>
            <FormItem label="头像上传：">
                <div class="img-upload-box sigle user-header">
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        >
                        <div>
                            <Icon type="cus-add"></Icon>
                        </div>
                    </Upload>
                </div>
                <div class="img-info">
                    建议上传180*180大小不超过200K，支持扩展名：.jpg .jpeg .png .gif...
                </div>
            </FormItem>
            <FormItem label="身份证上传：">
                <div class="img-upload-box sigle id-card">
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        >
                        <div>
                            <Icon type="cus-add"></Icon>
                        </div>
                    </Upload>
                </div>
                <div class="img-info">
                    建议上传180*180大小不超过200K，支持扩展名：.jpg .jpeg .png .gif...
                </div>
            </FormItem>
            <FormItem label="附件上传：">
                <Upload
                    multiple
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </FormItem>
            <FormItem label="附件上传：">
                <upload-files action="//jsonplaceholder.typicode.com/posts/">

                </upload-files>
            </FormItem>
        </i-form>
    </div>
</template>

<script>
import uploader from '_c/uploader/uploader.vue'
import uploadFiles from '_c/uploader/files-upload.vue'
export default {
  name: 'uploader_page',
  components: {
    uploader,
    uploadFiles
  },
  data () {
    return {
      defaultList: []
    }
  },
  mounted () {
    //
  }
}
</script>
