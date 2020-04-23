import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import all css
import './assets/css/global.css'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { Message } from 'element-ui'
// 挂在到原型上 通过this 可以直接访问$http
// 配置请求的根路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
