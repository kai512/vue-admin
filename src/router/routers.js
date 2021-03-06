import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
    import('@/view/login/login.vue')
},
{
    path: '/vue*',
    name: 'vue',
    meta: {
      title: 'vue',
      hideInMenu: true
    },
    component: Main
},
{
    path: '/demo*',
    name: 'demo',
    meta: {
      title: 'demo',
      hideInMenu: true
    },
    component: Main
},
{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: false
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      hideInMenu: false,
      title: '首页',
      icon: 'md-home'
    },
    component: () =>
      import('@/view/home/home')
  }]
},
{
  path: '/components',
  name: 'components',
  meta: {
    icon: 'logo-buffer',
    title: '组件'
  },
  component: Main,
  children: [{
    path: 'uploader_page',
    name: 'uploader_page',
    meta: {
      icon: 'md-arrow-dropdown-circle',
      title: '上传组件'
    },
    component: () =>
      import('@/view/components/uploader/uploader.vue')
  },
  {
    path: 'city_cascader_page',
    name: 'city_cascader_page',
    meta: {
      icon: 'md-arrow-dropdown-circle',
      title: '城市级联'
    },
    component: () =>
      import('@/view/components/cascader/cascader.vue')
  },
  {
    path: 'date_picker_page',
    name: 'date_picker_page',
    meta: {
      icon: 'md-arrow-dropdown-circle',
      title: '日期选择'
    },
    component: () =>
      import('@/view/components/picker/picker.vue')
  },
  // {
  // 	path: 'tree_select_page',
  // 	name: 'tree_select_page',
  // 	meta: {
  // 		icon: 'md-arrow-dropdown-circle',
  // 		title: '树状下拉选择器'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/tree-select/index.vue')
  // },
  // {
  // 	path: 'count_to_page',
  // 	name: 'count_to_page',
  // 	meta: {
  // 		icon: 'md-trending-up',
  // 		title: '数字渐变'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/count-to/count-to.vue')
  // },
  // {
  // 	path: 'drag_list_page',
  // 	name: 'drag_list_page',
  // 	meta: {
  // 		icon: 'ios-infinite',
  // 		title: '拖拽列表'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/drag-list/drag-list.vue')
  // },
  // {
  // 	path: 'drag_drawer_page',
  // 	name: 'drag_drawer_page',
  // 	meta: {
  // 		icon: 'md-list',
  // 		title: '可拖拽抽屉'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/drag-drawer')
  // },
  // {
  // 	path: 'org_tree_page',
  // 	name: 'org_tree_page',
  // 	meta: {
  // 		icon: 'ios-people',
  // 		title: '组织结构树'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/org-tree')
  // },
  // {
  // 	path: 'tree_table_page',
  // 	name: 'tree_table_page',
  // 	meta: {
  // 		icon: 'md-git-branch',
  // 		title: '树状表格'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/tree-table/index.vue')
  // },
  // {
  // 	path: 'cropper_page',
  // 	name: 'cropper_page',
  // 	meta: {
  // 		icon: 'md-crop',
  // 		title: '图片裁剪'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/cropper/cropper.vue')
  // },
  // {
  // 	path: 'tables_page',
  // 	name: 'tables_page',
  // 	meta: {
  // 		icon: 'md-grid',
  // 		title: '多功能表格'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/tables/tables.vue')
  // },
  // {
  // 	path: 'split_pane_page',
  // 	name: 'split_pane_page',
  // 	meta: {
  // 		icon: 'md-pause',
  // 		title: '分割窗口'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/split-pane/split-pane.vue')
  // },
  // {
  // 	path: 'markdown_page',
  // 	name: 'markdown_page',
  // 	meta: {
  // 		icon: 'logo-markdown',
  // 		title: 'Markdown编辑器'
  // 	},
  // 	component: () =>
  // 		import('@/view/components/markdown/markdown.vue')
  // },
  {
    path: 'editor_page',
    name: 'editor_page',
    meta: {
      icon: 'ios-create',
      title: '富文本编辑器'
    },
    component: () =>
      import('@/view/components/editor/editor.vue')
  }
    // {
    // 	path: 'icons_page',
    // 	name: 'icons_page',
    // 	meta: {
    // 		icon: '_bear',
    // 		title: '自定义图标'
    // 	},
    // 	component: () =>
    // 		import('@/view/components/icons/icons.vue')
    // },
  ]
}
]
