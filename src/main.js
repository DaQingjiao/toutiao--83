import Vue from 'vue'
import App from './App.vue'
// 引入全局导航守卫
import router from './promission'
// 引入element-ui模块
import ElementUI from 'element-ui'
// 引入axios已处理的模块
import Axios from './utlis/axios-config'

// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.less样式
import './styles/index.less'
// 引入组件插件对象
import Component from './components'
Vue.config.productionTip = false

// 全局注册elementUI组件
Vue.use(ElementUI)
// 全局注册ElementUI插件
Vue.use(Component)
// 全局Axios注册插件
Vue.use(Axios)

new Vue({
  router,
  // 使用一个指定的组件，对div容器进行“覆盖渲染”
  render: h => h(App)
}).$mount('#app')
