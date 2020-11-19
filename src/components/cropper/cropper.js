/**
 * 裁剪的工具类
 * @author hlijing
 * @since 2018-07-26
 */
import { picCut } from "@/libs/uploader"
import config from "@/config"
const cropperConstructor = Vue.extend(require("./cropper.vue").default);

const OSS_UPLOAD_URL = config.UPLOAD_URL;

var privateMethods = {

	/**
	 * 裁剪回调
	 */
	endCropper: function($root, options, callback) {
		var isOss = OSS_UPLOAD_URL ? true : false;

		if(options) {
			privateMethods[isOss ? "ossUpload" : "fastDFS"]($root, options, callback);
		}
	},

	/**
	 * oss上传回调处理
	 */
	ossUpload: function($root, options, callback) {
		var params = options ? options.params : {};
		
		// 裁剪后路径
		var imgPath = "/crop" + ",x_" + params.x1 + ",y_" + params.y1 + ",w_" + params.width + ",h_" + params.height;
		var fileId = options.fileId + "?x-oss-process=image/auto-orient,1" + imgPath;		
		var imgUrl = OSS_UPLOAD_URL + "/" + fileId;

		callback && typeof callback == "function" && callback({
			filePath: imgUrl,
			fileId: fileId
		});
	},

	/**
	 * fastDFS上传回调处理
	 */
	fastDFS: function($root, options, callback) {
        var params = options ? options.params : {};
        
        picCut({
            fileId : options.fileId,
            ...options.params
        }).then(data => {

            data = data ? data : {};
            callback && typeof callback == "function" && callback({
                filePath: data.filePath,
                fileId: data.fileId
            });
        }).catch(() => {
            $root.$Message.error(msg || "裁剪失败");

        })
	}
};

/**
 * 裁剪
 */
let CropperVue = function(options, callback, cancelCallback) {

	// 传递初始化裁剪参数
	this.instance = new cropperConstructor({
		data: {
			cropperOption: options.cropperObj
		}
	})

	// 裁剪完参数传递
	this.instance.successCallback = callback;
	
	// 裁剪取消
	this.instance.cancelCallback = cancelCallback;

	// 实例挂载
	this.instance.$mount();
	document.body.appendChild(this.instance.$el)

}

/**
 * 上传完后弹出裁剪框显示原图
 */
CropperVue.prototype.startCropper = function(files) {
	var that = this;
	
	var reader = new FileReader();
	reader.readAsDataURL(files);
	reader.onload = function(e) {
		// 每次替换图片要重新得到新的url 
		if(that.instance.cropperObj) {
			that.instance.cropperObj.replace(this.result);
		}

		that.instance.url = this.result;
		that.instance.panel = true;
	}

}

//执行回调
CropperVue.prototype.endCropper = function(options, callback) {
	privateMethods.endCropper(this.$root, options, callback);
};

export default CropperVue