import Aside from './home/layout-aside'
import Header from './home/layout-header'
import Crumb from './common/bread-crumb'
export default {
  install (Vue) {
    // Vue.component('组件名', 组件)
    Vue.component('layout-aside', Aside) // 注册左侧导航栏
    Vue.component('layout-header', Header) // 注册头部组件
    Vue.component('bread-crumb', Crumb) // 注册面包屑组件
  }
}
