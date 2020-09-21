import * as singleSpa from 'single-spa'; //导入single-spa
import { GlobalEventDistributor } from './GlobalEventDistributor' 
const globalEventDistributor = new GlobalEventDistributor();

/*
* runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
* */
const runScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};

async function registerApplication(){

    let storeModule = {}, customProps = { globalEventDistributor: globalEventDistributor };

    // 在这里,我们会用SystemJS来导入模块的对外输出的Store(后续会被称作模块对外API),统一挂载到消息总线上
    try {
        storeModule = await SystemJS.import('http://localhost:3000/store.js');
    } catch (e) {
        console.log(`Could not load store of app.`, e);
        //如果失败则不注册该模块
        return
    }

    // 注册应用于事件派发器
    if (storeModule.storeInstance && globalEventDistributor) {
        //取出 redux storeInstance
        customProps.store = storeModule.storeInstance;

        // 注册到全局
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    //当与派发器一起组装成一个对象之后,在这里以这种形式传入每一个单独模块
    customProps = { store: storeModule, globalEventDistributor: globalEventDistributor };

    // 在注册的时候传入 customProps
    singleSpa.registerApplication('singleDemo', () => SystemJS.import('http://localhost:3000/app.js'), location => location.pathname.startsWith('/vue'), customProps);

    // singleSpa.registerApplication( //注册微前端服务
    //     'singleDemo',
    //     async () => {
    //         // 注册用函数，
    //         // return 一个singleSpa 模块对象，模块对象来自于要加载的js导出
    //         // 如果这个函数不需要在线引入，只需要本地引入一块加载：
    //         // () => import('xxx/main.js')
    //         await runScript('http://localhost:3000/app.js');
    //         return window.singleVue
    //     },
    //     location => location.pathname.startsWith('/vue'), // 配置微前端模块前缀
    //     customProps
    // );

}

async function registerApplication2(){

    let storeModule = {}, customProps = { globalEventDistributor: globalEventDistributor };

    // 在这里,我们会用SystemJS来导入模块的对外输出的Store(后续会被称作模块对外API),统一挂载到消息总线上
    try {
        storeModule = await SystemJS.import('http://localhost:4000/store.js');
    } catch (e) {
        console.log(`Could not load store of app.`, e);
        //如果失败则不注册该模块
        return
    }

    // 注册应用于事件派发器
    if (storeModule.storeInstance && globalEventDistributor) {
        //取出 redux storeInstance
        customProps.store = storeModule.storeInstance;

        // 注册到全局
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    //当与派发器一起组装成一个对象之后,在这里以这种形式传入每一个单独模块
    customProps = { store: storeModule, globalEventDistributor: globalEventDistributor };

    // 在注册的时候传入 customProps
    singleSpa.registerApplication('singleDemo2', () => SystemJS.import('http://localhost:4000/app.js'), location => location.pathname.startsWith('/demo'), customProps);

    // singleSpa.registerApplication( //注册微前端服务
    //     'singleDemo',
    //     async () => {
    //         // 注册用函数，
    //         // return 一个singleSpa 模块对象，模块对象来自于要加载的js导出
    //         // 如果这个函数不需要在线引入，只需要本地引入一块加载：
    //         // () => import('xxx/main.js')
    //         await runScript('http://localhost:3000/app.js');
    //         return window.singleVue
    //     },
    //     location => location.pathname.startsWith('/vue'), // 配置微前端模块前缀
    //     customProps
    // );

}

registerApplication();
registerApplication2();

singleSpa.start(); // 启动
