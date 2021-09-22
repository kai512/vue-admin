const menus = [{
    menuId: '00010002',
    name: '用户中心',
    nameen : "all",
    url: '/manage/user-center/user-manage/user-list.html',
    icon: "icon-db-setting",

        childMenus: [{
            menuId: '0001000200010001',
            name: '全部用户列表',
            nameen : "user-list",
            url: 'components/uploader/uploader',
            childMenus: null,
            integration: true,
            sort: 8
        },{
            menuId: '0001000200010001',
            name: '全部用户',
            nameen : "all-user-list",
            url: '/manage/user-center/user-manage/user-list.html',
            childMenus: null,
            integration: true,
            sort: 8
        }]
}];
export default menus