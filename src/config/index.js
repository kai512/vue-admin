export default {
	/**
	 * @description 配置显示在浏览器标签的title
	 */
	title: '',
	/**
	 * @description token在Cookie中存储的天数，默认1天
	 */
	cookieExpires: 30,
	/**
	 * @description 是否使用国际化，默认为false
	 *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
	 *              用来在菜单中显示文字
	 */
	useI18n: false,
	/**
	 * @description api请求基础路径
	 */
	serviceBaseUrl: {
		base : process.env.NODE_ENV === 'development' ? '/rest' : '/rest'
	},
	/**
	 * @description 默认打开的首页的路由name值，默认为home
	 */
	homeName: 'home',
	/**
	 * @description 需要加载的插件
	 */
	plugin: {
		'error-store': {
			showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
			developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
		}
	},
	
	// 上传路径
	UPLOAD_URL: 'https://zsnanping.oss-cn-shenzhen.aliyuncs.com',

	AMAP_KEY: 'f4996d64cbfa55701a9297a216f93a7e',
	
	// 展会
	APP_ID: 'f4d83b0187804f8792fa8b5bd7c64a25',

	AREA_CODE: '350500'
}