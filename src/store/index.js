import Vue from 'vue'
import Vuex from 'vuex'
import loginStore from './login'
Vue.use(Vuex)

//持久化vuex插件（防止页面刷新丢失state数据）
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
    modules: {
        loginStore: loginStore
    },
    plugins: [createPersistedState()]
})
