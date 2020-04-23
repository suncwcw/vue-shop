import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
// 挂在一个守卫函数
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转过来
  // next 函数
  // next() 放行next('/login') 强制调转
  if (to.path === '/login') return next()
  // token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})
export default router
