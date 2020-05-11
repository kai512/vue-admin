/**
 * 城市code-name
 */

import dataSource from "./city.data-3"
/**
 * 获取默认城市
 */
var getDefaultCity = function() {
	return {
		name: "泉州",
		code: 350500
	};
};

/**
 * 获取城市code
 * @param {Object} data
 * @param {Object} name
 * @param {Object} callback
 */
function getCode (data, name, callback){
	
	for(var i=0, len=data.length; i<len; i++){
			
		if(data[i].label.indexOf(name) > -1){
			
			callback(data[i].value, data[i].children)
			break;				
		}
		
	}
}

/**
 * 获取城市全程
 * @param {Object} data
 * @param {Object} name
 * @param {Object} callback
 */
function getName (data, code, callback){
	
	for(var i=0, len=data.length; i<len; i++){
			
		if(data[i].code == code){
			
			callback(data[i].label, data[i].children)
			break;				
		}
		
	}
}

export default {
	
	cityData: cityData,

	/**
	 * 获取默认城市--泉州
	 */
	getDefaultCity: getDefaultCity,

	/**
	 * 是否是二级城市
	 * @param {Object} name
	 */
	isCityByName: function(name) {
		if(cityData[name]) {
			return true;
		}

		for(var key in cityData) {
			if(name.indexOf(key) >= 0 || key.indexOf(name) >= 0) {
				return true;
			}
		}

		return false;
	},

	/**
	 * 通过城市名获取城市编码
	 */
	getCodeByName: function(province, city, county, callback) {
		var value = [];
		
		new Promise((resolve, reject)=>{
			getCode(dataSource, province, function(code, children){
				value.push(code);
				resolve(children);
			})
			
		}).then((data)=>{
			
			return new Promise((resolve, reject) => {
				if(!city){
					reject(value);
					return;
				}
				getCode(data, city, function(code, children){
					value.push(code);
					if(!children || children.length <= 0){
						
						reject(value);
						return;
					}
					
					resolve(children);
				})
				
			})
			
		}).then((data)=>{
			return new Promise((resolve, reject) => {
				if(!county){
					reject(value);
					return;
				}
				getCode(data, county, function(code, children){
					value.push(code);
					if(!children || children.length <= 0){
						reject(value);
						return;
					}
					
					
					callback && callback(value)
				})
				
			})
		}).catch((value) => {
			callback && callback(value)
		})
	},

	/**
	 * 通过城市名获取城市的简写
	 */
	getSimpleNameByName: function(name) {
		if(cityData[name]) {
			return name;
		}

		for(var key in cityData) {
			if(name.indexOf(key) >= 0 || key.indexOf(name) >= 0) {
				return key;
			}
		}

		return "泉州";
	},

	/**
	 * 通过城市名获取城市的简写
	 */
	getNameAndCodeByName: function(province, city, county, callback) {
		var value = [];
		
		new Promise((resolve, reject)=>{
			getCode(dataSource, province, function(code, children){
				value.push({
					name : province,
					value : code
				});
				resolve(children);
			})
			
		}).then((data)=>{
			
			return new Promise((resolve, reject) => {
				if(!city){
					reject(value);
					return;
				}
				getCode(data, city, function(code, children){
					value.push({
						name : city,
						value : code
					});
					
					if(!children || children.length <= 0){
						
						reject(value);
						return;
					}
					
					resolve(children);
				})
				
			})
			
		}).then((data)=>{
			return new Promise((resolve, reject) => {
				if(!county){
					reject(value);
					return;
				}
				getCode(data, county, function(code, children){
					value.push({
						name : county,
						value : code
					});
					
					if(!children || children.length <= 0){
						reject(value);
						return;
					}
					
					
					callback && callback(value)
				})
				
			})
		}).catch((value) => {
			callback && callback(value)
		})
	},

	/**
	 * 通过城市编码或者区/县编码获取城市的简写和城市编码
	 */
	getNameAndCodeByCode: function(provinceCode, cityCode, countyCode, callback) {

		var value = [];
		
		new Promise((resolve, reject)=>{
			getCode(dataSource, provinceCode, function(name, children){
				value.push({
					name : name,
					value : provinceCode
				});
				resolve(children);
			})
			
		}).then((data)=>{
			
			return new Promise((resolve, reject) => {
				if(!city){
					reject(value);
					return;
				}
				getCode(data, cityCode, function(name, children){
					value.push({
						name : name,
						value : cityCode
					});
					
					if(!children || children.length <= 0){
						
						reject(value);
						return;
					}
					
					resolve(children);
				})
				
			})
			
		}).then((data)=>{
			return new Promise((resolve, reject) => {
				if(!county){
					reject(value);
					return;
				}
				getCode(data, countyCode, function(name, children){
					value.push({
						name : name,
						value : countyCode
					});
					
					if(!children || children.length <= 0){
						reject(value);
						return;
					}
					
					
					callback && callback(value)
				})
				
			})
		}).catch((value) => {
			callback && callback(value)
		})
	}
};

var cityData = {
	"北京": 110100,
	"天津": 120100,
	"石家庄": 130100,
	"唐山": 130200,
	"秦皇岛": 130300,
	"邯郸": 130400,
	"邢台": 130500,
	"保定": 130600,
	"张家口": 130700,
	"承德": 130800,
	"沧州": 130900,
	"廊坊": 131000,
	"衡水": 131100,
	"太原": 140100,
	"大同": 140200,
	"阳泉": 140300,
	"长治": 140400,
	"晋城": 140500,
	"朔州": 140600,
	"晋中": 140700,
	"运城": 140800,
	"忻州": 140900,
	"临汾": 141000,
	"吕梁": 141100,
	"呼和浩特": 150100,
	"包头": 150200,
	"乌海": 150300,
	"赤峰": 150400,
	"通辽": 150500,
	"鄂尔多斯": 150600,
	"呼伦贝尔": 150700,
	"巴彦淖尔": 150800,
	"乌兰察布": 150900,
	"兴安盟": 152200,
	"锡林郭勒盟": 152500,
	"阿拉善盟": 152900,
	"沈阳": 210100,
	"大连": 210200,
	"鞍山": 210300,
	"抚顺": 210400,
	"本溪": 210500,
	"丹东": 210600,
	"锦州": 210700,
	"营口": 210800,
	"阜新": 210900,
	"辽阳": 211000,
	"盘锦": 211100,
	"铁岭": 211200,
	"朝阳": 211300,
	"葫芦岛": 211400,
	"长春": 220100,
	"吉林": 220200,
	"四平": 220300,
	"辽源": 220400,
	"通化": 220500,
	"白山": 220600,
	"松原": 220700,
	"白城": 220800,
	"延边": 222400,
	"哈尔滨": 230100,
	"齐齐哈尔": 230200,
	"鸡西": 230300,
	"鹤岗": 230400,
	"双鸭山": 230500,
	"大庆": 230600,
	"伊春": 230700,
	"佳木斯": 230800,
	"七台河": 230900,
	"牡丹江": 231000,
	"黑河": 231100,
	"绥化": 231200,
	"大兴安岭": 232700,
	"上海": 310100,
	"南京": 320100,
	"无锡": 320200,
	"徐州": 320300,
	"常州": 320400,
	"苏州": 320500,
	"南通": 320600,
	"连云港": 320700,
	"淮安": 320800,
	"盐城": 320900,
	"扬州": 321000,
	"镇江": 321100,
	"泰州": 321200,
	"宿迁": 321300,
	"杭州": 330100,
	"宁波": 330200,
	"温州": 330300,
	"嘉兴": 330400,
	"湖州": 330500,
	"绍兴": 330600,
	"金华": 330700,
	"衢州": 330800,
	"舟山": 330900,
	"台州": 331000,
	"丽水": 331100,
	"合肥": 340100,
	"芜湖": 340200,
	"蚌埠": 340300,
	"淮南": 340400,
	"马鞍山": 340500,
	"淮北": 340600,
	"铜陵": 340700,
	"安庆": 340800,
	"黄山": 341000,
	"滁州": 341100,
	"阜阳": 341200,
	"宿州": 341300,
	"六安": 341500,
	"亳州": 341600,
	"池州": 341700,
	"宣城": 341800,
	"福州": 350100,
	"厦门": 350200,
	"莆田": 350300,
	"三明": 350400,
	"泉州": 350500,
	"漳州": 350600,
	"南平": 350700,
	"龙岩": 350800,
	"宁德": 350900,
	"南昌": 360100,
	"景德镇": 360200,
	"萍乡": 360300,
	"九江": 360400,
	"新余": 360500,
	"鹰潭": 360600,
	"赣州": 360700,
	"吉安": 360800,
	"宜春": 360900,
	"抚州": 361000,
	"上饶": 361100,
	"济南": 370100,
	"青岛": 370200,
	"淄博": 370300,
	"枣庄": 370400,
	"东营": 370500,
	"烟台": 370600,
	"潍坊": 370700,
	"济宁": 370800,
	"泰安": 370900,
	"威海": 371000,
	"日照": 371100,
	"莱芜": 371200,
	"临沂": 371300,
	"德州": 371400,
	"聊城": 371500,
	"滨州": 371600,
	"菏泽": 371700,
	"郑州": 410100,
	"开封": 410200,
	"洛阳": 410300,
	"平顶山": 410400,
	"安阳": 410500,
	"鹤壁": 410600,
	"新乡": 410700,
	"焦作": 410800,
	"濮阳": 410900,
	"许昌": 411000,
	"漯河": 411100,
	"三门峡": 411200,
	"南阳": 411300,
	"商丘": 411400,
	"信阳": 411500,
	"周口": 411600,
	"驻马店": 411700,
	"武汉": 420100,
	"黄石": 420200,
	"十堰": 420300,
	"宜昌": 420500,
	"襄阳": 420600,
	"鄂州": 420700,
	"荆门": 420800,
	"孝感": 420900,
	"荆州": 421000,
	"黄冈": 421100,
	"咸宁": 421200,
	"随州": 421300,
	"恩施": 422800,
	"长沙": 430100,
	"株洲": 430200,
	"湘潭": 430300,
	"衡阳": 430400,
	"邵阳": 430500,
	"岳阳": 430600,
	"常德": 430700,
	"张家界": 430800,
	"益阳": 430900,
	"郴州": 431000,
	"永州": 431100,
	"怀化": 431200,
	"娄底": 431300,
	"湘西": 433100,
	"广州": 440100,
	"韶关": 440200,
	"深圳": 440300,
	"珠海": 440400,
	"汕头": 440500,
	"佛山": 440600,
	"江门": 440700,
	"湛江": 440800,
	"茂名": 440900,
	"肇庆": 441200,
	"惠州": 441300,
	"梅州": 441400,
	"汕尾": 441500,
	"河源": 441600,
	"阳江": 441700,
	"清远": 441800,
	"东莞": 441900,
	"中山": 442000,
	"潮州": 445100,
	"揭阳": 445200,
	"云浮": 445300,
	"南宁": 450100,
	"柳州": 450200,
	"桂林": 450300,
	"梧州": 450400,
	"北海": 450500,
	"防城港": 450600,
	"钦州": 450700,
	"贵港": 450800,
	"玉林": 450900,
	"百色": 451000,
	"贺州": 451100,
	"河池": 451200,
	"来宾": 451300,
	"崇左": 451400,
	"海口": 460100,
	"三亚": 460200,
	"三沙": 460300,
	"儋州": 460400,
	"重庆": 500100,
	"成都": 510100,
	"自贡": 510300,
	"攀枝花": 510400,
	"泸州": 510500,
	"德阳": 510600,
	"绵阳": 510700,
	"广元": 510800,
	"遂宁": 510900,
	"内江": 511000,
	"乐山": 511100,
	"南充": 511300,
	"眉山": 511400,
	"宜宾": 511500,
	"广安": 511600,
	"达州": 511700,
	"雅安": 511800,
	"巴中": 511900,
	"资阳": 512000,
	"阿坝": 513200,
	"甘孜": 513300,
	"凉山": 513400,
	"贵阳": 520100,
	"六盘水": 520200,
	"遵义": 520300,
	"安顺": 520400,
	"毕节": 520500,
	"铜仁": 520600,
	"黔西南": 522300,
	"黔东南": 522600,
	"黔南": 522700,
	"昆明": 530100,
	"曲靖": 530300,
	"玉溪": 530400,
	"保山": 530500,
	"昭通": 530600,
	"丽江": 530700,
	"普洱": 530800,
	"临沧": 530900,
	"楚雄": 532300,
	"红河": 532500,
	"文山": 532600,
	"西双版纳": 532800,
	"大理": 532900,
	"德宏": 533100,
	"怒江": 533300,
	"迪庆": 533400,
	"拉萨": 540100,
	"日喀则": 540200,
	"昌都": 540300,
	"林芝": 540400,
	"山南": 540500,
	"那曲": 542400,
	"阿里": 542500,
	"西安": 610100,
	"铜川": 610200,
	"宝鸡": 610300,
	"咸阳": 610400,
	"渭南": 610500,
	"延安": 610600,
	"汉中": 610700,
	"榆林": 610800,
	"安康": 610900,
	"商洛": 611000,
	"兰州": 620100,
	"嘉峪关": 620200,
	"金昌": 620300,
	"白银": 620400,
	"天水": 620500,
	"武威": 620600,
	"张掖": 620700,
	"平凉": 620800,
	"酒泉": 620900,
	"庆阳": 621000,
	"定西": 621100,
	"陇南": 621200,
	"临夏": 622900,
	"甘南": 623000,
	"西宁": 630100,
	"海东": 630200,
	"海北": 632200,
	"黄南": 632300,
	"海南": 632500,
	"果洛": 632600,
	"玉树": 632700,
	"海西": 632800,
	"银川": 640100,
	"石嘴山": 640200,
	"吴忠": 640300,
	"固原": 640400,
	"中卫": 640500,
	"乌鲁木齐": 650100,
	"克拉玛依": 650200,
	"吐鲁番": 650400,
	"哈密": 652200,
	"昌吉": 652300,
	"博尔塔拉": 652700,
	"巴音郭楞": 652800,
	"阿克苏": 652900,
	"克孜勒苏": 653000,
	"喀什": 653100,
	"和田": 653200,
	"伊犁": 654000,
	"塔城": 654200,
	"阿勒泰": 654300,
	"台北": 710100,
	"高雄": 710200,
	"基隆": 710300,
	"台中": 710400,
	"台南": 710500,
	"新竹": 712400,
	"嘉义": 713000,
	"新北": 710800,
	"宜兰": 712200,
	"桃园": 712300,
	"苗栗": 712500,
	"彰化": 712700,
	"南投": 712800,
	"云林": 712900,
	"屏东": 713300,
	"台东": 713400,
	"花莲": 713500,
	"澎湖": 713600,
	"金门": 713700,
	"连江": 713800,
	"香港岛": 810100,
	"九龙": 810200,
	"新界": 810300,
	"澳门半岛": 820100,
	"氹仔岛": 820200,
	"路环岛": 820300
};