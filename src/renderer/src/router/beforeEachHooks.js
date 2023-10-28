export default {
  async checkLoginAuth(to, from, next) {
    const notLoggedIn = !window.abp.session.userId
    const whiteList = ['success', 'error', 'Login']
    console.log(window.abp.session.userId, to)
    // 这个判断必须放在最前面，错误页允许随意访问
    if (whiteList.includes(to.name)) {
      next()
      return
    }
    if (notLoggedIn) {
      next({ name: 'Login' })
      return
    }
    next()
  }
}
