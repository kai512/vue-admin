/**
 * 富文本编辑器组件
 * @author xzhixin@linewell.com
 * @since 2018-07-26
 */

<template>
	<div style="height:270px;">
	</div>
</template>
<script type="text/javascript">
	import  "@/libs/wangEditor/css/wangEditor.min.css"
	import  wangEditor from "@/libs/wangEditor/js/wangEditor"
    import { getAuthClient, getToken } from "@/libs/util"
    import config from "@/config"
	import ossUploadUditor from "./oss-upload-editor"
	
	/**
	 * 初始化富文本编辑器
	 */
	let initEditor = function (){
		
		// 实例化富文本编辑器并挂载DOM
		this.editor = new wangEditor(this.$el);
		
		// 监听onchange事件，向父组件传递值
		this.editor.onchange = () =>{
			this.$emit("get-val", this.getValue());
			this.$emit("get-text", this.getText());
		};
		
		// 配置自定义菜单
		if(this.options){
			this.editor.config.menus = this.options;
		}
		
		// oss上传
		if(config.UPLOAD_URL){
			
			ossUploadUditor.init(null,this.editor);
		}else{
			// 配置图片默认上传方式
			this.editor.config.uploadImgUrl = this.actionUrl;
		
	    	// 配置自定义参数
		    this.editor.config.uploadParams = {
		        token: getToken() || ""
		    };
		    
		    // 设置请求头部参数
		    this.editor.config.uploadHeaders = getAuthClient();
		    this.editor.config.uploadImgFileName = 'files';
		}
		
		
		
		this.editor.config.hideLinkImg = true;
		
		this.editor.create();
		
		// 默认向父组件传值
		this.$emit("get-val", this.getValue());
		this.$emit("get-text", this.getText());
	}
	
	export default {
		props: {
			model: String, // 默认值
            options: Array, // 菜单配置
            actionUrl : {
    			type : String,
    			default : `${config.serviceBaseUrl.base}/zuul/tongplatform/common/third-party-extranet/v1/attachment/upload-pics`
    		}
		},
		data(){
			return {
				editor: null
			}
		},
		mounted(){
			initEditor.call(this);
		},
		watch : {
			model : function (val,oldVal){
				this.editor.$txt.html(this.model);
			}
		},
		methods: {
			
			/**
			 * 获取富文档框值
			 */
			getValue(){
				return this.editor.$txt.html() == "<p><br></p>" ? "" : this.editor.$txt.html();
			},
			
			/**
			 * 获取富文本的文本值
			 */
			getText() {
				return this.editor.$txt.formatText() || "";
			}
		}
	}

</script>
