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
import { Message as MessageF } from 'view-design'

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
		showErrorMsg : true,   // 失败后是否吐司
		autoShowWait : false,   // 自动显示菊花
		loadingText : "正在加载", // 加载的提示语
		autoCloseWait : false,  // 自动关闭菊花
		headers : {
			'base-params': JSON.stringify(authClient),
			'token': unescape(getToken() || '') || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXB0TmFtZSI6IuWfjuW4gumAmuS9k-mqjOeJiCIsInJvbGVJZHMiOm51bGwsImxvZ2luVGltZSI6MTYyNjQwMDc1NzA2OCwicGhvbmUiOiIxODg4ODg4ODg4OCIsImFwcElkIjoiYjU4ZjhkNDBmMzIwNDUxNWFhNjA1Mjc0ZDdhYWQwMzQiLCJuaWNrbmFtZSI6IuWfjuW4gumAmueuoeeQhuWRmCIsImRlcHRJZCI6IjM3MTQ1OTdlOWZjZDRhZWRiMzVlNzY0OGEyZTI1MjdlIiwidXNlclR5cGUiOjIsInJvbGVUeXBlIjoyLCJ1c2VySWQiOiJkODJlY2E1NDhkOTg0Nzc1OWVlMDEwYjMzNzgyYzQ4ZiJ9.W2QojuNy5ANJocQay6nVFwlCJkDgCoMbucsHxL-nhLDVQ1Tp-n_RvZDIAuUNXLrOmChn8H5RYumntsY8_xxFyF_FnOFW7D8vEoVqriagUx--9FvMGvf4hTifEDqh7tYFl-Ci6CbAX6BV2UH0VGmeLp-OIAGZbxEVivmUbFJdBJlCjmmxGDxl9UR72PbK7sTYPSeGXgQSJVmOJGu6zs0KNGYh47R3S_HbncSMpJ_bTTLULrMWj9HTPIvrSWiFPr4HQOYoB3K0FIKmBfDJ4u8Ez-pBkEX2fkyZx-P64r0Bvlnz0PuCVPcA8m--N9FE1c7NtNqxPSusz3-x2RQ__AKYLQ'
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

                        return Promise.resolve(data.content || null, data);

						break;
					case 2:// 回话过期或者未登录

						break;
					default:// 失败或者其他

                        var message = data.message ? data.message : '有点忙开个小差，稍后再试~'
                        if(ajaxParams.showErrorMsg) {
                            MessageF.error(message);
                        }

                        return Promise.reject(message, data)
				}
			}
		}catch(e){
			console.log(e);
		}
	};

	ajaxParams.error = function(message){

		// 制空加载样式
        curLoadingButton.instance[curLoadingButton.isLoading] = false;

        if(!ajaxParams.showErrorMsg) {
            MessageF.error(message);
        }

        return Promise.reject(message)
	};

	try {

		// 交互方法
		return axiosUtils.postJson(ajaxParams);

	} catch (e) {

		// 去除加载状态
		curLoadingButton.instance[curLoadingButton.isLoading] = false;

	}

};

var exportsMethods = {
	/**
	 * 提交Json对象
	 * @param {Object} params 配置定义的key
	 */
	postJson:function(params){
		return _postJson(params);
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
