import parentView from "@/components/parent-view";
import Main from "@/components/main";
export function constructorRouters(routers) {
    const res = []
    // routers.forEach(route => {
    //     const { name, url, icon, childMenus, component, nameen } = route
    //     const oRouter = {
    //         path: url,
    //         name : nameen,
    //         component(resolve) {
    //             let componentPath = ''

    //             if(childMenus && childMenus.length > 0){
    //                 require(['@/components/main/main.vue'], resolve)
    //                 return;
    //             }
                
                
    //             require([`@/view/${component || url}.vue`], resolve)
    //         },
    //         meta : {
    //             title: name,
    //             icon: icon,
    //         },
    //         children: !childMenus ? [] : constructorRouters(childMenus)
    //     }
        
    //     res.push(oRouter)
    // })

    return [
        {
            path: "/demo",
            name: "demo",
            meta: {
                icon: "cus-default",
                title: "样式总览"
            },
            component: Main,
            children: [
                {
                    path: 'form2',
                    name: 'form2',
                    meta: {
                        title: '表单布局',
                        showAlways: true,
                    },
                    component: parentView,
                    children : [
                        {
                            path: 'demo-table',
                            name: 'demo-table',
                            meta: {
                                title: '表格布局'
                            },
                            component: () => import('@/view/demo/demo-table.vue')
                        },
                        {
                            path: 'form',
                            name: 'form',
                            meta: {
                                title: '表单布局'
                            },
                            component: () => import('@/view/demo/demo.vue')
                        }
                    ],
                    
                },
               
             ]
        }
    ];
  }
  