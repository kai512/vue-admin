import appAjax from "@/libs/app-ajax"
import menus from "@/mock/data/menus"

/**
 * 登录
 */
export const login = (data) => {
	return appAjax.postJson({
        service: '/login',
        type: 'GET',
        data: data || {},
        params: data || {}
    })
}

/**
 * 用户信息
 */
export const getUserInfo = (data) => {
    return appAjax.postJson({
        service: '/get_info',
        type: 'GET',
        data: data || {},
        params: data || {}
    })
}

/**
 * 获取菜单
 */
export const getMenuList = () => {
    alert(1)
    return Promise.resolve(menus)

}
