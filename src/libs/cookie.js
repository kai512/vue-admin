/**
 * cookie操作类
 * @author slong
 * @since 2016-04-05
 */

var cookieFunc = {
	/**
	 * 设置cookie
	 * @param {Object} name
	 * @param {Object} value
	 */
	setCookie: function(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		var cookieStr = name + "=" + escape(value) + ";path=/";
		if(location.protocol.indexOf("https") > -1) {
			cookieStr = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";secure=true;path=/";
		}
		document.cookie = cookieStr;
	},
	/**
	 * 设置自定义cookie
	 * @param {Object} name
	 * @param {Object} value
	 * @param {Object} expiresTime(long,毫秒)
	 */
	setCustomeCookie: function(name, value, expiresTime) {
		if(!expiresTime) {
			cookieFunc.setCookie(name, value);
			return;
		}

		var exp = new Date();
		exp.setTime(exp.getTime() + expiresTime);
		var cookieStr = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
		if(location.protocol.indexOf("https") > -1) {
			cookieStr = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";secure=true;path=/";
		}
		
		document.cookie = cookieStr;
	},
	/**
	 * 
	 * @param {Object} offset
	 */
	getCookieVal: function(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if(endstr == -1) endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
	},
	/**
	 * 获取cookie
	 * @param {Object} name
	 */
	getCookie: function(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while(i < clen) {
			var j = i + alen;
			if(document.cookie.substring(i, j) == arg) return cookieFunc.getCookieVal(j);
			i = document.cookie.indexOf(" ", i) + 1;
			if(i == 0) break;
		}
		return null;
	},
	/**
	 * 删除cookie
	 * @param {Object} name
	 */
	delCookie: function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = cookieFunc.getCookie(name);
		if(cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
	},
	/**
	 * 保存搜索历史记录
	 * @param {Object} name
	 * @param {Object} value
	 */
	setLog: function(name, value) {
		var wlink = value + "_log_";
		var old_info = cookieFunc.getCookie("history_artical");
		var insert = true;
		if(old_info == null) { //判断cookie是否为空
			insert = true;
		} else {
			var old_link = old_info.split("_log_");
			for(var j = 0; j <= 5; j++) {
				if(old_link[j].indexOf(value) != -1)
					insert = false;
				if(old_link[j] == "null")
					break;
			}
		}
		if(insert) {
			wlink += cookieFunc.getCookie("history_artical");
			cookieFunc.setCookie("history_artical", wlink);
		}
	},
	/**
	 * 展示搜索记录
	 * @param {Object} value 页面标识  -search.html  /search-person.html
	 */
	history_show: function(value) {
		var history_artical = cookieFunc.getCookie("history_artical");
		var content = "";
		if(history_artical != null) {
			history_arg = history_artical.split("_log_");
			var i;
			for(i = 0; i <= 5; i++) {
				if(history_arg[i] != "null") {
					//中文转码
					try {
						var history_value = decodeURIComponent(history_arg[i]);
					} catch(err) {
						var history_value = history_arg[i];
					}
					content += ('<a href="' + INNO_CHINA_CONSTANTS.BASE_URL + '/social/' + value + '?kw=' + history_value + '">' + history_value + '</a>');
				} else {
					break;
				}
			}
			document.getElementById("history").innerHTML = content;
			//控制main高度，防止超出
			var searchHeight = $('.search-history')[0].offsetHeight;
			$('.main-content.has-side').css({
				"min-height": searchHeight
			});
		} else {
			document.getElementById("history").innerHTML = "<span>暂无搜索记录</span>";
		}
	}
}

export default cookieFunc;