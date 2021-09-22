import Vue from 'vue'
import Router from 'vue-router'
import modules from './module'
import store from '@/store'
import iView from 'view-design'
import { setToken, getToken, setTitle, getAppInfo } from '@/libs/util'
import config from '@/config'

import { canTurnTo } from '@/libs/login-filter'
import { constructorRouters } from '@/libs/router-factory'
import { getMenuList } from '@/api/user'
import menus from "@/mock/data/menus"
Vue.use(Router)
const router = new Router({
	routes : [...modules],
	mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'
const turnTo = (to, from, next) => {
    let { appId } = getAppInfo();
	canTurnTo(to, from).then(() => {
        let menusList = constructorRouters(menus);
        store.commit('addRouters', menusList)
        router.addRoutes(menusList)
        
        next();
        // 这边可以返回一个Promise，处理业务的权限过滤，如闽政通用户授权
        // getMenuList.then((menus) => {
        //     constructorRouters(menus);

        //     next();
        // })
        
        
	}).catch(() => {
        setToken('');
        next({      
            replace : true,
            name : LOGIN_PAGE_NAME + '-by-appid',
            params : {appId}
        })
	})
}

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start()
    turnTo(to, from, next)

})

router.afterEach(to => {
	setTitle(to, router.app)
	iView.LoadingBar.finish()
	window.scrollTo(0, 0)
})

export default router
