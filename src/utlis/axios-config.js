// 以下对axios进行处理，在发送请求到达后台之前，将token塞入
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../promission'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置共享方法
// config为axios默认选项，url\method\data等
// axios.interceptors.request.use(函数1，函数2)
// 函数1：对发送请求数据做处理、函数2：对请求失败做处理
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 将token加入到请求头中
  return config
}, function (error) {
  return Promise.reject(error)
})

// 以下对axios进行处理，在响应数据 then 执行之前拦截，处理响应数据
// 函数1：对响应数据做处理、函数2：对响应错误做处理
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {} // 相当于去掉一层data
}, function (error) {
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户，无权限登录'
      break
    case 507:
      message = '服务器数据错误'
      break
    case 401:
      message = 'token过期或未传'
      window.localStorage.clear() // 清空缓存
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message, type: 'warning' }) // 在异常处理函数中将所有的错误处理完毕，不在进入catch
  return Promise(function () {}) // 终止当前的错误
})

export default {
  install (Vue) {
    // Axios共享为所有实例
    Vue.prototype.$axios = axios
  }
}
