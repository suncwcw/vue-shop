import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
// import all css
import './assets/css/global.css'
import ElementUI from 'element-ui'
// 换主题下面二选一 elemnt 换主题
// import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'

import axios from 'axios'
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
// 挂在到原型上 通过this 可以直接访问$http
// 配置请求的根路径  给后台访问加token 头
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
//
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须return config
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
