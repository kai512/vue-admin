<template>
	<!-- 遮罩层 --> 
	<div class="mask" v-show="panel" style="z-index: 99999;">
		<div class="container upload" > 
			<div class="img-wrap">
			   <div class="upload-img-box"> 
			    	<img id="image" :src="url" alt="Picture" ref="image"> 
			   </div>
		   </div>
		   <div class="btn-box">
		   		<button type="button" class="ivu-btn ivu-btn-ghost mr-l" @click="cancelCrop">取消</button>
		   		<button type="button" class="ivu-btn ivu-btn-primary" @click="crop">确定</button>
		   </div>
		</div> 
	</div>
</template>
<script type="text/javascript">
	import Cropper from './cropper-utils'
	
	import underscore from "underscore";
	
	export default {
		data () { 
		  	return { 
			    headerImage : '', 
			    cropperObj : '', 
			    cropperOption: '',
			    croppable : false, 
			    panel : false, 
			    url : ''
		  	} 
		}, 
	    mounted () { 
	    	
		    // 初始化这个裁剪框 
			var self = this; 
			
			// 默认初始化参数
			var defaultCropperObj = { 
			    aspectRatio: 1, 
			    viewMode: 1, 
			    background:false, 
			    zoomable:false, 
			    ready: function () { 
				    self.croppable = true; 
				}
			}
			
			this.cropperObj = new Cropper(this.$refs.image, underscore.extend(defaultCropperObj, this.cropperOption)); 
		}, 
	    methods: { 
			crop () { 
			    this.panel = false; 
			    var croppedCanvas; 
			    var roundedCanvas; 
			    if (!this.croppable) { 
			        return; 
			    } 
			    
			    // Crop 
			    croppedCanvas = this.cropperObj.getCroppedCanvas(); 
			    
			    // Round 
			    roundedCanvas = this.getRoundedCanvas(croppedCanvas); 
			    this.headerImage = roundedCanvas.toDataURL(); 
				
				// 原图实际宽高
				var naturalWidth = this.cropperObj.canvasData.naturalWidth;
				var naturalHeight = this.cropperObj.canvasData.naturalHeight;
				
				// 裁剪弹框宽高
				var maskWidth = this.cropperObj.containerData.width;
				var maskHeight = this.cropperObj.containerData.height;
				
				// 裁剪弹框实际比例
				var widthRatio = 1;
				var heightRatio = 1;
				if(maskWidth != naturalWidth) {
					widthRatio = Number(naturalWidth) / Number(maskWidth);
				}
				if(maskHeight != naturalHeight) {
					heightRatio = Number(naturalHeight) / Number(maskHeight);
				}
				
			    // 返回的数据格式
			    var imgObj = {
			    	x1 : Math.round(Number(this.cropperObj.cropBoxData.left) * widthRatio),
					y1 : Math.round(Number(this.cropperObj.cropBoxData.top) * heightRatio),
					width : Math.round(Number(this.cropperObj.cropBoxData.width) * widthRatio),
					height : Math.round(Number(this.cropperObj.cropBoxData.height) * heightRatio),
					fileId : this.headerImage
			    }
			    
			    // 裁剪成功回调函数
			    this.successCallback && typeof this.successCallback == "function" && this.successCallback(imgObj);
			}, 
			cancelCrop () {
				this.panel = false; 
				
				 // 裁剪取消回调函数
			    this.cancelCallback && typeof this.cancelCallback == "function" && this.cancelCallback();
			},
			getRoundedCanvas (sourceCanvas) { 
			    var canvas = document.createElement('canvas'); 
			    var context = canvas.getContext('2d'); 
			    var width = sourceCanvas.width; 
			    var height = sourceCanvas.height; 
			    canvas.width = width; 
			    canvas.height = height; 
			    context.imageSmoothingEnabled = true; 
			    context.drawImage(sourceCanvas, 0, 0, width, height); 
			    context.globalCompositeOperation = 'destination-in'; 
			    context.beginPath(); 
			    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true); 
			    context.fill(); 
		        return canvas; 
		    }
		} 
	}

</script>
