import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from "components/common/toast"
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus=new Vue()

// 注册 toast 插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载
Vue.use(VueLazyload,{
   // loading 参数表示图片还没加载出来显示的默认图片
  // loading:require('图片路径')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
