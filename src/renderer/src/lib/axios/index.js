import axios from 'axios'

const config = {
  baseURL: 'https://www.imouldyun.com',
  timeout: 2 * 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
}
// axios.defaults.adapter = require('axios/lib/adapters/http')

function addToken(config) {
  // const token = window.abp.auth.getToken()
  let token = localStorage[window.abp.auth.tokenCookieName]
  try {
    if (token) {
      const t = JSON.parse(token)
      if (new Date() < new Date(t.date)) {
        token = t.token
      } else {
        localStorage[window.abp.auth.tokenCookieName] = null
      }
    }
  } catch (e) {
    console.log(e)
  }
  // const refreshToken = window.abp.auth.getRefreshToken()
  if (token) config.headers.Authorization = 'Bearer ' + token
  // if (refreshToken) config.headers['X-Authorization'] = 'Bearer ' + refreshToken
  // config.headers['.AspNetCore.Culture'] = window.abp.utils.getCookieValue(
  //   'Abp.Localization.CultureName'
  // )
  // config.headers['Abp.TenantId'] = window.abp.multiTenancy.getTenantIdCookie()
}
const _axios = axios.create(config)
_axios.interceptors.request.use(
  (config) => {
    addToken(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
_axios.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return response.data.result
    } else {
      return response.data
    }
  },
  (e) => {
    console.log(e)
    const myAlert = window.api.alert

    myAlert(e.response?.data?.message ?? e.message)
  }
)

export default _axios
