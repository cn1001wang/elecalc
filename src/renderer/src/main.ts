import { createApp } from 'vue'
import App from './App.vue'
import setupRouter from './router'
import './lib/abp/index.js'
import abpUtil from './lib/abp/abpUtil'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

abpUtil.getAbpConfig().then(() => {
  const app = createApp(App)

  app.use(ElementPlus)
  setupRouter(app)
  app.mount('#app')
})
