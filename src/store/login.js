import {login,logout} from '../axios/start'

const loginStore = {
    namespaced: true,
    state: {
        isLogin: false,
        userData: {     //每次验证页面使用的用户信息（含权限）
            permissions: [],
            name: '',
            userId: ''
        }
    },
    actions: {
        loginUser(context,value){
            return new Promise((resolve,reject)=>{
                login(value).then(res => {
                    const data = res.data
                    data.isLogin = true
                    context.commit('updateToken',data.delayToken)
                    context.commit('persistUser',data)
                    resolve('登录成功')
                }).catch(error => reject(error))
            })
        },
        logoutUser(context){
            return new Promise((resolve,reject) =>{
                logout().then(()=>{
                    resolve()
                }).catch(()=> reject())
                .finally(()=>{
                    let obj = {isLogin: false}
                    context.commit('updateToken','')
                    context.commit('persistUser',obj)
                })
            })
        }
    },
    mutations: {
        persistUser(state,value){
            state.userData.name = value.name
            state.userData.userId = value.userId
            state.userData.permissions = value.permissions
            state.isLogin = value.isLogin            
        },
        updateToken(state,value){
            localStorage.setItem('delayToken',value)
        }
    }
}

export default loginStore