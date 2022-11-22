const loginRouter = {
    path: '/login',
    component: ()=>import('../components/Login.vue'),
    meta: {title: '登录', isAuth: false}
}

export default loginRouter