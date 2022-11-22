import Vue from 'vue'

//request中使用window.$globalConfig为undefiend，先加载
import './utils/initGlobalConfig'

import App from './App.vue'
import store from './store'
import router from './router'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/* import Animate from 'animate.css'
Vue.use(Animate) */

Vue.config.productionTip = false

Vue.prototype.$process = {
  VUE_APP_BASE_API: window.$globalConfig.VUE_APP_BASE_API,
  MEDIA_API: window.$globalConfig.MEDIA_API
}

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
