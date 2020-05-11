<template>
	<Modal v-model="isMapPopShow" title="坐标定位" :mask-closable="false" :closable="false">
		<div class="map-wrap" style="height: 344px;position: relative; margin: -16px;margin-bottom: 0;">
			<i-input placeholder="请输入关键字，以便快捷定位" type="text" v-on:input="inputFunc" v-model="keyAdress" style="z-index:9;position: absolute;right: 20px;top:20px; width: 360px;"></i-input>
			<i-select ref="associate" v-model="associate" @on-change="getValue" style="z-index:5;position: absolute;right: 20px;top:20px;width: 360px;">
				<i-option v-for="item in associateList" :value="item.id" :key="item.id">{{item.name}}<b>{{!item.address.length || item.address.length == 0 ? '' : item.address}}</b></i-option>
			</i-select>
			<div id="container" style="position: absolute;left: 0;top:0;width: 100%;height: 100%;z-index: 1;">

			</div>
		</div>
		<div class="opera-box" slot="footer">
			<i-button type="ghost" @click="handlePopCancle">取消</i-button>
			<i-button type="primary" @click="handlePopConfirm">确定</i-button>
		</div>
	</Modal>
</template>

<script>
	import mapUtils from "@/libs/AMap-utils.js";

	var map = "",
		mapPosition,
		mapZoom,
		fn;

	export default {
		name: "MapPop",
		components: {},
		data() {
			return {
				isMapPopShow: false, // 地图弹框显示标识
				isSuggestWrapper: false, // 地图联想显示标识
				associate: "", // 地图联想选中项
				position: {
					actualAddress: "",
					poiName: "",
					longitude: "",
					latitude: ""
				},
				keyAdress: "", // 搜索地址关键字

				actualAddress: "", // 表单提交实际搜索完地址
				poiName: "", // 表单提交标志性建筑
				longitude: "", // 表单提交经度
				latitude: "", // 表单提交纬度
				associateList: [], // 地图联想下拉项列表
			}
		},
		computed: {},
		props: {
			coordinateType : {
				type : String,
				default : ""
			},
			lnglat :{
				type : Array,
				default : function() {
					return [];
				}
			},
			value: {
				type: Boolean,
				default: false
			},
		},
		watch: {
			value: function(val, oldVal) {
				var that = this;
				this.isMapPopShow = val;
				
				// 回填坐标
				if(val && this.lnglat.length && this.lnglat[0] && this.lnglat[1]) {
					setTimeout(function() {
						map.clearMap();
						var marker = new AMap.Marker({
							map: map,
							position: that.lnglat
						});
						map.setFitView();				
						fn({
							lnglat: {
								M : that.lnglat[0],
								O : that.lnglat[1]
							}
						})
					}, 100);
				}
			}		
		},
		mounted() {

			var that = this;

			// 加载地图
			map = new AMap.Map('container', {
				resizeEnable: false,
				zoom: 16,
				rotateEnable: true
			});

			mapPosition = map.getCenter();
			mapZoom = map.getZoom();

			// 要返回的兴趣点地址
			var poiName = "";

			// 初始化地址
			var position = null;

			// 缩放工具
			map.plugin(["AMap.ToolBar"], function() {

				// 加载工具条
				var tool = new AMap.ToolBar({
					direction: false
				});
				map.addControl(tool);
			});
			fn = function(e) {

				// 要返回的实际地址
				var address = "";

				// 地图点击后选点
				map.clearMap();
				var marker = new AMap.Marker({
					map: map,
					position: [e.lnglat.M, e.lnglat.O]
				});
 
				var markers = map.getAllOverlays("marker");
				if(markers.length == 1) {
					position = markers[0].Qi.position;
				}

				if(!position) {
					return;
				}

				// 获取地址坐标
				var lnglat = {
					lng: position.M,
					lat: position.O
				}

				// 高德地址转化为百度地址，并回填
				mapUtils.GDPositionToBDPosition(lnglat, function(ret) {
					if(ret) {

						var lng = (ret.lng).toFixed(6);
						var lat = (ret.lat).toFixed(6);

						if(!address) {
							mapUtils.getCurrentPositionAllByLanLat([position.lng, position.lat], function(ret, selecter) {
								address = selecter.replace(ret.province, "").replace(ret.city, "").replace(ret.district, "");

								// 标志性建筑为空时取实际地址去掉街道名
								poiName = ret.building || selecter.replace(ret.province, "").replace(ret.city, "").replace(ret.district, "").replace(ret.township, "");

								// 定位赋值
								that.keyAdress = "";
								that.position.actualAddress = address;
								that.position.poiName = poiName;
								that.position.longitude = lng;
								that.position.latitude = lat;
								
								// 默认高德地图坐标
								if(that.coordinateType == "default") {
									that.position.longitude = (e.lnglat.M).toFixed(6);
									that.position.latitude = (e.lnglat.O).toFixed(6);
								}				
							});
						}
					}
				});
			}
			// 选择地图点位
			map.on("click", fn);

		},
		methods: {
			inputFunc(e) {
				var that = this;
				var auto = new AMap.Autocomplete();
				
				if(!e) {
					that.$refs.associate.toggleMenu(null, false);
					return;
				}
				
				auto.search(e, function(status, result) {
					if(result.info == "OK") {
					
						// 过滤条件
						var searchTips = [];
						var j = 0;
						for(var i = 0; i < result.tips.length; i++) {
							if(result.tips[i].location && result.tips[i].location.M && result.tips[i].location.O) {
								searchTips[j++] = result.tips[i];
							}
						}
						that.isSuggestWrapper = true;
						that.associateList = searchTips;
						
						that.$refs.associate.toggleMenu(null, true);
					}
				});
			},
			getValue(value) {
				var that = this;
				for(var i = 0; i < that.associateList.length; i++) {
					if(that.associateList[i].id == value) {
						that.keyAdress = that.associateList[i].name;
		    			that.position.actualAddress = that.associateList[i].address;
		    			that.position.poiName = that.associateList[i].name;
		    			that.position.longitude  = that.associateList[i].location.M + "";
		    			that.position.latitude = that.associateList[i].location.O + "";
					}
				}
				
				if(!that.position.longitude  || !that.position.latitude) {
					this.$Message.error('请选择一个具体的地址');
					return;
				}
				map.clearMap();
				var marker = new AMap.Marker({
					map: map,
					position: [that.position.longitude , that.position.latitude]
				});
				
				// 自动锁定图标
				map.setFitView();
	        },
			handlePopCancle() {
				this.keyAdress = "";
    			this.isMapPopShow = false;
    		
    			map.clearMap();
    			map.setZoomAndCenter(mapZoom, mapPosition);
    			
				this.$emit("input", false);
			},
			handlePopConfirm() {
				if(!this.position.poiName) {
					this.$Message.error('请至少选择唯一的一个点位');
					return;
				}	
				this.isMapPopShow = false;
				this.$emit("input", false);
				
				this.$emit("on-confirm", this.position);
			}
		}
	}
</script>