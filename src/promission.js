import router from './router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 判断是否以 /home 开头
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    // 判断是否有 token
    if (token) {
      next()
    } else {
      // 强制跳转
      next('/login')
    }
  } else {
    next()
  }
})
export default router
