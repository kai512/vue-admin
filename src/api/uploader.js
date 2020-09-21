import appAjax from "@/libs/app-ajax"

/**
 * 获取oss上传参数
 */
export const getUploadParams = () => {
	
	return appAjax.postJson({
        service: '/tongplatform/common/third-party-extranet/v1/alioss/token-for-pc',
        type: 'GET',
        data: {
            size: 1
        }
    })
}

/**
 * 图片裁剪上传
 */
export const picCut = ({fileId, x1, y1, width, height}) => {
	
	return appAjax.postJson({
        service: "UPLOAD_CUT",
        type: "POST",
        data: {
            fileId,
            x,
            y1,
            width,
            height
        },
        showErrorMsg : false
    })
}