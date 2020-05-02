import Router from './Router'
import router from './router'
import Vue from 'vue'
import VueRouter from 'Vue.Router'
import Users from '/users.vue'

Vue.use(VueRouter)
const routes = [{ path: '/login', component: Users }]
const router = new Router({ routes })

router.beforeEach((to, from, next) => {
    if (to.path !== '/login') return next()
    const localtoken = window.sessionStorage.getItem('token')
    if (!localtoken) {
        return next('/login')
    }
    return next()
})
export default router
//  router.js=>main.js =>App.vue  =>index.html

// router.js=》 main.js =>App.vue= >index.html
// logic  vue use VueRouter, routes => router  use routes const router = new Router({ routes })  router beforeeach if to.path login

import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [{ path: '/login', component: Users }]
const router = new Router({ routes })

router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        return next()
    } else {
        const localtoken = window.sessionStorage.getItem('token')
        if (!localtoken) {
            return next('/login')
        }
        return next()
    }
})
export default router

import axios from 'axios'
import ElementUI, { Message } from 'element-ui'
import { MessageBox } from 'element-ui'

axios.defaults.baseURL = 'http://baidu.com:8080/v1'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.productionTip = false

Vue.use(ElementUI)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    必须return config
    return config
})

Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false

Vue.use(ElementUI)

// 渲染到app 上
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')


getProductList() {
    this.$http.get('goods', { params: this.queryInfo }).then(res => {
      console.log(res)
    })
  }