/**
 * axios的工具类 -- rest接口
 * @author jliangliang@linewell.com
 * @since 2018-07-03
 */
import axiosUtils from './ajax-utils-rest'
import cookies from './cookie'
import underscore from 'underscore-extend'
import config from '@/config'
import {getToken, getAppInfo} from '@/libs/util'


var instance = {};
var isLoading = "";

/**
 * 获取loadingButton
 */
var _getLoadingButton = function (){
	var loadingButton = {
		instance : instance,
		isLoading : isLoading
	};
	instance = {};
	isLoading = "";
	return loadingButton;
}
/**
 * 获取service
 * @param {Object} params
 */
var _getServiceUrl = function(params){
	var serviceUrl;
	if(!params.otherParams){

		return servicesConfig[params["service"]];
	}
	for(var key in params.otherParams){
		serviceUrl = (serviceUrl || servicesConfig[params["service"]]).replace("{" +key + "}", params.otherParams[key]);
	}

	return serviceUrl;
};

/**
 * json参数序列化
 * @param {Object} data  参数
 */
var _addUrlParam = function (data){
	var postData = "";
	for(var key in data){
		if(!postData){
			postData = key + "=" + data[key];
		}else{
			postData += "&" + key + "=" + data[key];
		}
	}
	
	return postData;
};

/* 基础通信参数  */
var _authClient = function() {
	let {areaCode, appId} = getAppInfo();
	var deviceId = cookies.getCookie("deviceId") || "H5";
	var auth = {
		clientParams : {
			os: cookies.getCookie("os_type") || "H5",
			network: "",
			deviceId: deviceId,
			appVersion: ""
		},
		areaCode : areaCode,
		appId : appId
	};
	
	return auth;
};

/**
 * 提交表单数据
 * @param {Object} params
 */
var _postJson = function(params){

	var curLoadingButton = _getLoadingButton();
	
	// 判断按钮状态
	if (curLoadingButton.instance[curLoadingButton.isLoading]) {
		return;
	}
	
	// 判断是否传入loadingButton
	if(curLoadingButton.isLoading){		
		curLoadingButton.instance[curLoadingButton.isLoading] = true;
	}
	
	var authClient =  _authClient();
	
	// 默认参数
	var defaultParams = {
		service : "",            // 服务的配置名称
		data : {}, // 发送的data
		params : {},
		success : function(d){}, // 成功后回调
		error : null,   // 失败后回调
		autoShowWait : false,   // 自动显示菊花
		loadingText : "正在加载", // 加载的提示语
		autoCloseWait : false,  // 自动关闭菊花
		headers : {
			'base-params': JSON.stringify(authClient),
			'token': unescape(getToken() || '')
		},
		isAsync : true
	};
	
	var ajaxParams = underscore.deepExtend(defaultParams, params);
	
	if((ajaxParams.type == "GET" || ajaxParams.type == "DELETE") && ajaxParams.data && typeof(ajaxParams.data) == "object"){
		ajaxParams.params = ajaxParams.data;
	}
	
	const baseUrl =  config.serviceBaseUrl.base

	// rest请求路径
	ajaxParams['url'] = baseUrl + params.service
	
	// 增加请求头部
	ajaxParams["beforeSend"] = function (config) {
	
		return config;
	};
	
	//成功回调方法重载
	ajaxParams.success = function(d){
		
		// 制空加载样式
		curLoadingButton.instance[curLoadingButton.isLoading] = false;
		
		var data = typeof d.data == "string" ? JSON.parse(d.data) : d.data;
		try{
			if(data){
				switch(data.status){
					case 1:// 成功
						if(data.content){
							if(params.success){
								params.success.call(this, data.content, data);	
							}
						}else{
							if(params.success){
								params.success.call(this, null, data);
							}		   		
						}	 		
						break;
					case 2:// 回话过期或者未登录
						
						break;
					default:// 失败或者其他
						
						var message = data.message ? data.message : "有点忙开个小差，稍后再试~";
						if(params.error){
							params.error.call(this, message, data);
						}else{
							new Lw().$Message.error(message);
						}
						break;
				}
			}
		}catch(e){
			// handle the exception
			//ajaxParams.autoCloseWait && loadingUtils.close();
			console.log(e);
		}
	};
	
	// 是否显示菊花
	//ajaxParams["autoShowWait"] && loadingUtils.open(ajaxParams["loadingText"]);
	
	var errorFn = ajaxParams.error;
	ajaxParams.error = function(d){
		//ajaxParams.autoCloseWait && loadingUtils.close();
		
		// 制空加载样式
		curLoadingButton.instance[curLoadingButton.isLoading] = false;
		
		var data = d.data;
		if(errorFn){
			errorFn(data.message, data);
		} else if (data) {
			new Lw().$Message.error(data.message);
		}
	};
	
	try {
		
		// 交互方法
		axiosUtils.postJson(ajaxParams);
		
	} catch (e) {
		
		// 去除加载状态
		curLoadingButton.instance[curLoadingButton.isLoading] = false;
		//ajaxParams.autoCloseWait && loadingUtils.close();
	}

};

var exportsMethods = {
	/**
	 * 提交Json对象
	 * @param {Object} params 配置定义的key
	 */
	postJson:function(params){
		_postJson(params);
	},
	
	/**
	 * 设置按钮加载样式
	 * @param $button 按钮
	 */
	loadingButton : function (buttonInstance, loadingButton) {
		var that = this;
		
		if(!(buttonInstance&&loadingButton)){
			return that;
		}
		instance = buttonInstance;
		isLoading = loadingButton;
		
		return that;
	},
	
	/**
	 * 获取用户登录信息封装对象
	 */
	getAuthClient : function(){
		return {
			'base-params': JSON.stringify(_authClient()),
			'token': unescape(getToken() || "")
		}
	}
};

export default exportsMethods;
