import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '../store/index'

import nProgress  from 'nprogress'
import 'nprogress/nprogress.css'

const routerList = [];
function importAll(rt){
    let list = rt.keys().filter(item=>item != './index.js')
    list.forEach(
        key => routerList.push(rt(key).default)
    );
}

importAll(require.context('./',false,/\.js/))

const routes = [...routerList]

const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next) =>{
    //只有切换到不同路由时才显示进度条
    if(to.path !== from.path){
        nProgress.start()
    }
    //需要验证否
    if(to.meta.isAuth){
        if(store.state.loginStore.isLogin){
            next()
        }else{
            next({path: '/login'})
        }
    }else{
        next()
    }
    nProgress.done()
})

router.afterEach(()=>{
    nProgress.done();
})
export default router