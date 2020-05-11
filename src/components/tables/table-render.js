import underscoreExtend from "underscore-extend";
import appAjax from "@/libs/app-ajax";
import Paginator from "./paginator";
var remote = {
		
	/**
	 * 获取列表
	 */
	getDataList : function(curPage, pageCallback, pageSize){
		var that = this;
		that.options.data.pageNum = curPage;
		that.options.data.pageSize = pageSize || that.options.pageSize;
		
		if(that.options.instance && that.options.loadingField) {
			appAjax.loadingButton(that.options.instance, that.options.loadingField);
		}
		
		appAjax.postJson({
			type: that.options.type,
			service : that.options.url,
			otherParams : that.options.otherParams,
			data : that.options.data,
			success : function(data){
				let mode;
				let pageTotal = data ? (data.total ? data.total : 0) : 0;
				
				if(curPage > 1 && (!data || !data.list || !data.list.length)){
					remote.getDataList.call(that, curPage-1, false);
					return;
				}
				
				that.options.callback && that.options.callback(data)
				
				if(!pageCallback){
					that.paginator.setOptions(curPage, pageTotal);
					return;
				}
				
				pageCallback && pageCallback(that, {
					pageSize : that.options.pageSize,
					paginatorId : that.options.paginatorId,
					total : pageTotal,
					showSizer : that.options.showSizer
				})
			}
		})
	}	
};

var local = {
	
	/**
	 * 初始化分页控件
	 * @param {Object} that
	 * @param {Object} obj
	 */
	initJqPaginator : function(that, obj){
		
		that.paginator = new Paginator(obj, function(page, pageSize){
			
			remote.getDataList.call(that, page, null, pageSize);
		});
	}
}

/**
 * 表格渲染构造函数
 */
let TableRender = function(options) {
	var that = this;
	let defaultOptions = {
		type : "POST",// method
		url : "", // 请求地址	
		data : {},
		paginatorId : null,
		pageSize : 10,
		otherParams : null,
		showSizer : false
	};
	
	this.options = underscoreExtend.deepExtend(true, defaultOptions, options);
	
	remote.getDataList.call(this, 1, local.initJqPaginator);
}

/**
 * 设置条件（用于更新条件）
 */
TableRender.prototype.setOptions = function(options, isRender){
	this.options = underscoreExtend.deepExtend(true, this.options, options);
	
	remote.getDataList.call(this, isRender ? 1 : this.options.data.pageNum, false);
}

export default TableRender