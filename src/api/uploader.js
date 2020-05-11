import appAjax from "@/libs/app-ajax"

/**
 * 获取oss上传参数
 */
export const getUploadParams = () => {
	
	return new Promise((resolve, reject) => {
		appAjax.postJson({
			service: '/tongplatform/common/third-party-extranet/v1/alioss/token-for-pc',
			type: 'GET',
			data: {
				size: 1
			},
			success(data) {
				resolve(data)
			},
			error() {
				reject()
			}
		})
		
	})
}

/**
 * 图片裁剪上传
 */
export const picCut = ({fileId, x1, y1, width, height}) => {
	
	return new Promise((resolve, reject) => {
		appAjax.postJson({
			service: "UPLOAD_CUT",
			type: "POST",
			data: {
				fileId,
				x,
				y1,
				width,
				height
			},
			success: function(data) {
				resolve(data)
			},
			error: function(msg) {
				reject()
			}
		})
		
	})
}