import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui模块
import ElementUI from 'element-ui'
// 引入axios模块
import Axios from 'axios'
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.less样式
import './styles/index.less'

Vue.config.productionTip = false

// 全局注册elementUI组件
Vue.use(ElementUI)
// Axios共享为所有实例
Vue.prototype.$axios = Axios
// 设置共享方法
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
