import {Message} from 'element-ui'
import store from '../store'

const registerRouter = {
    path: '/register',
    component: ()=>import('../pages/register.vue'),
    meta: {title: '登记页',isAuth: true},
    beforeEnter: (to,from,next) => {        
        if(to.query.areaId == '' || to.query.listArea == '' || !store.state.loginStore.isLogin){
            Message({
                message: '请先登录',
                type: 'warning',
                duration: 5*1000
            })
            next({ path: '/login' })
        }else{            
            next()
        }
    }
}

export default registerRouter