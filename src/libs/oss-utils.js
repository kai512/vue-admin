/**
 * oss大小，旋转操作
 * @author jliangliang
 * @since 2017/9/26
 */
import { getUploadParams } from "@/api/uploader"
export default {

	/**
	 * 图片自定义大小
	 * @param {Object} url
	 * @param {Object} w
	 * @param {Object} h
	 */
	buildResizeUrl: function(url, w, h, quality) {
		if(!url || url.indexOf('x-oss-process=image') >= 0 && url.indexOf('/resize,') >= 0) {
			return this.buildAutoOrientUrl(url)
		}

		if(url.indexOf('x-oss-process=image') >= 0) {
			return this.buildAutoOrientUrl(url + '/resize,m_lfit,limit_1,w_' + (w || 4096) + ',h_' + (h || 4096) + '/format,jpg/quality,Q_' + quality)
		} else {
			return this.buildAutoOrientUrl(url + '?x-oss-process=image/resize,m_lfit,limit_1,w_' + (w || 4096) + ',h_' + (h || 4096) + '/format,jpg/quality,Q_' + quality)
		}
	},

	/**
	 * 图片自动旋转
	 * @param {Object} url
	 */
	buildAutoOrientUrl: function(url) {
		if(!url || url.indexOf('x-oss-process=image') >= 0 && url.indexOf('/auto-orient,') >= 0) {
			return url
		}
		if(url.indexOf('x-oss-process=image') >= 0) {
			return url + '/auto-orient,1'
		} else {
			return url + '?x-oss-process=image/auto-orient,1'
		}
	},

	/**
	 *
	 */
	getPicList: function(picList, w, h, quality) {
		var imgZipArr = []
		if(!picList || picList.length <= 0) {
			return
		}
		if(typeof(picList) !== 'object') {
			return this.buildResizeUrl(picList, w, h, quality)
		}

		for(var i = 0, len = picList.length; i < len; i++) {
			if(typeof(picList[i]) === 'object') {
				picList[i].imgZip = this.buildResizeUrl(picList[i].filePath, w, h, quality)
			} else {
				picList[i] = {
					imgZip: this.buildResizeUrl(picList[i], w, h, quality),
					filePath: picList[i]
				}
			}
		}

		return picList
	},

	/**
	 * 获取上传参数
	 * @param {Object} callback
	 */
	getUploadParams: function(file, callback, errorBack) {
        // 请求oss参数
        
        getUploadParams().then(data => {
            var res = data
            var fileExt = '.png'
            var params = {
                OSSAccessKeyId: res.accessid,
                policy: res.policy,
                signature: res.signature,
                key: res.filename,
                success_action_status: '200'
            }
            if(file.name.lastIndexOf('.') > -1) {
                fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
            }

            params.key = params.key + fileExt
            params.name = file.name
            callback && callback(params)

        }).catch(() => {
            errorBack && errorBack()
        })
		
	}
}