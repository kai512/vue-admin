import { getToken, setToken, addUrlParam} from '@/libs/util'
import config from '@/config'
import store from '@/store'
import { getUserInfo } from '@/api/user'


/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (to, from) => {
	
	let needLogin = to.meta.loginCheck;
	
	return new Promise((resolve, reject) => {
		
		// 如果不需要登录
		if(!needLogin || needLogin.length <= 0){
			
			resolve();
		}

        const token = getToken()
        if(!token) {
            // 未登录且要跳转的页面不是登录页
            reject();
        } else {
            store.dispatch('getUserInfo').then(user => {
                
                if(user){
                    resolve();
                    return;
                }
                reject();               
            }).catch(() => {
                reject()
            })
        }	
	})	
}