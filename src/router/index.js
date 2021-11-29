import Vue from "vue"
import VueRouter from "vue-router";

// 1 安装插件
Vue.use(VueRouter)

const Home = () => import("../views/home/Home")
const Categroy = () => import("../views/categroy/Categroy")
const Cart = () => import("../views/cart/Cart")
const Profile = () => import("../views/profile/Profile")
const Detail = () => import("../views/detail/Detail")

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  // {
  //   path: '/category',
  //   component: Categroy
  // },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

// 2 创建 router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

