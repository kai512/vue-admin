/**
 * axios的工具类--rest接口
 *
 * @author jliangliang@linewell.com
 * @since 2018-07-03
 */
import axios from 'axios'

import underscore from 'underscore-extend'
/**
 * 添加URL的参数
 * @param {Object} url        URL地址
 * @param {Object} paramName  参数的名称
 * @param {Object} paramValue 参数的值
 */
var addUrlParam = function(url, paramName, paramValue) {
	if(!url) {
		return url
	}
	url += ((url.indexOf('?') > 0) ? '&' : '?')
	url += paramName + '=' + paramValue
	return url
}

/**
 * 提交Json对象
 * @param {Object} params 配置定义的key
 */
var postJson = function(params) {
	let api = axios.create({
		baseUrl: params['baseUrl'] || ''
	})

	api.defaults.headers.post['Content-Type'] = 'application/json'

	// 默认参数
	var defaultParams = {
		url: '',
		data: {},
		headers: {
			'Content-Type': 'application/json'
		}
	}

	// 合并参数
	params = underscore.deepExtend(defaultParams, params)

	// 添加随机数
	params['url'] = addUrlParam(params['url'], 'rnd', Math.random())

	// 请求数据
	var dataStr = params['data'] && ((typeof(params['data']) === 'object') ? JSON.stringify(params['data']) : params['data'])

	// 拦截器
	api.interceptors.request.use(params['beforeSend'], function(err) {

		// return Promise.reject(error);
	})

	return api({
		method: params['type'] || 'post',
		url: params['url'],
		data: dataStr,
		params: params['params'],
		responseType: 'json',
		withCredentials: params['withCredentials'] || false, // 是否跨域
		timeout: 600000, // 超时时间10分钟
		headers: params['headers'],
		transformResponse: params['transformResponse'] // 回调拦截
	}).then(params['success']).catch(params['error'])
}

var exportsMethods = {

	/**
	 * 提交Json对象
	 * @param {Object} params 发送的参数
	 */
	postJson: function(params) {
		return postJson(params)
	}
}

export default exportsMethods