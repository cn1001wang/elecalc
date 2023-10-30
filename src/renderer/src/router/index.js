import { createRouter, createWebHashHistory } from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
Object.values(beforeEachHooks).forEach((hook) => {
  router.beforeEach(hook)
})

export default function setupRouter(app) {
  app.use(router)
}

export const routerInstance = router
