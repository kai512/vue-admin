import { Page } from "view-design"
import underscoreExtend from "underscore-extend";

var Paginator = function(options, callback){
	let mode;
	
	let that = this;
	
	var defaultOptions = {
		pageSize : 10,
		pageSizeOpts : [10, 20, 30, 40, 50],
		showSizer : false
	};
	
	this.options = underscoreExtend.deepExtend(true, defaultOptions, options);
	
	this.Instance = new Lw({
		data : {
			total : 0
		},
		render : function(h){
			return h(Page, {
				 on : {
					"on-change": (page) => {
						callback && callback(page);
					},
					"on-page-size-change" : (pageSize) => {
					 	callback && callback(1, pageSize);
					}
				 },
				 props : {
					total : this.total,
					pageSize : that.options.pageSize,
					showTotal : true,
					showSizer : that.options.showSizer,
					pageSizeOpts : that.options.pageSizeOpts
				 }
				 
			})
		}
	})
	
	const component = this.Instance.$mount();
	document.getElementById(this.options.paginatorId).innerHTML = "";
	document.getElementById(this.options.paginatorId).appendChild(component.$el);
	mode = this.Instance.$children[0];
	mode.$parent.total = this.options.total || 0;
	
}

/**
 * 重置
 * @param {Object} curPage
 * @param {Object} total
 */
Paginator.prototype.setOptions = function(curPage, total){
	let mode = this.Instance.$children[0];
	mode.$parent.total = total || 0;
	mode.currentPage = curPage;
	
};

export default Paginator;