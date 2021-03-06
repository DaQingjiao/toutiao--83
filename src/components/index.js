import Aside from './home/layout-aside'
import Header from './home/layout-header'
import Crumb from './common/bread-crumb'
import coverImage from './publish/cover-image'
import selectImg from './publish/select-img'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    // Vue.component('组件名', 组件)
    Vue.component('layout-aside', Aside) // 注册左侧导航栏
    Vue.component('layout-header', Header) // 注册头部组件
    Vue.component('bread-crumb', Crumb) // 注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑
    Vue.component('cover-image', coverImage) // 全局注册封面组件
    Vue.component('select-img', selectImg) // 全局注册会话框组件
  }
}
