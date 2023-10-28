// import { extend } from "lodash-es"
import ajax from '../axios/index'
import { extend } from '../../core/utils/index'

class Util {
  authorization = {
    encrptedAuthTokenName: 'token',
    wx_sessionId: 'wx_sessionId',
    wx_openId: 'wx_openId',
    wx_unionId: 'wx_unionId'
    // 'enc_auth_token'
  }

  deleteCookie() {
    abp.utils.deleteCookie(this.authorization.wx_sessionId, abp.appPath)
    abp.utils.deleteCookie(this.authorization.wx_openId, abp.appPath)
    abp.utils.deleteCookie(this.authorization.wx_unionId, abp.appPath)
    abp.utils.deleteCookie(this.authorization.encrptedAuthTokenName, abp.appPath)
    abp.auth.clearToken()
  }
  // async weixinSPAOauth() {
  //   this.deleteCookie()
  //   location.replace(`https://www.imouldyun.com/weixin/spaoauth?returnurl=${encodeURIComponent(location.href)}`)
  // }
  async goAuthRedirect() {
    let url = encodeURIComponent(location.pathname + location.search + location.hash)
    location.href = `/login?returnUrl=${url}&referer=jmouldyun`
  }
  setSession(rep) {
    const tokenExpireDate = new Date(new Date().getTime() + 1000 * rep.expireInSeconds || 1)
    // abp.utils.setCookieValue(this.authorization.wx_sessionId, rep.sessionId, tokenExpireDate, abp.appPath)
    abp.utils.setCookieValue(this.authorization.wx_openId, rep.openId, tokenExpireDate, abp.appPath)
    abp.utils.setCookieValue(
      this.authorization.wx_unionId,
      rep.unionId,
      tokenExpireDate,
      abp.appPath
    )
  }
  setToken(rep) {
    const tokenExpireDate = new Date(new Date().getTime() + 1000 * rep.expireInSeconds || 1)
    // abp.auth.setToken(rep.accessToken, rep.refreshToken, tokenExpireDate)
    // abp.utils.setCookieValue(
    //   this.authorization.encrptedAuthTokenName,
    //   rep.encryptedAccessToken,
    //   tokenExpireDate,
    //   abp.appPath
    // )
    localStorage[abp.auth.tokenCookieName] = JSON.stringify({
      token: rep.accessToken,
      date: tokenExpireDate.toUTCString()
    })
  }

  getAbpConfig() {
    return ajax('/UserConfiguration/GetAll')
      .catch(({ err, hide }) => {
        // this.deleteCookie();
        // console.log(document.cookie)
        if (err.response.status === 302) {
          this.authenticate()
          hide()
        } else {
          document.body.innerHTML =
            '<h1 style="text-align:center;margin:40px 0;">404,服务器正在更新请稍后</h1>'
        }
        throw err
        // document.body.innerHTML=JSON.stringify(err);
      })
      .then((res) => {
        function toLowerCaseKeys(obj) {
          Object.keys(obj).forEach((el) => {
            obj[el.toLowerCase()] = obj[el]
            delete obj[el]
          })
        }
        toLowerCaseKeys(res.auth.allPermissions || {}) //全部权限
        toLowerCaseKeys(res.auth.grantedPermissions || {}) //已有权限
        toLowerCaseKeys(res.features.allFeatures || {})
        toLowerCaseKeys(res.setting.values || {})
        //塞入abp.session等
        window.abp = extend(true, window.abp, res)
        Object.assign(abp.session, res.loginInformation)
        // this.initTenantPower()
        return abp
      })
  }
  // getMacValid(){
  //   return ajax(`/api/auth/programmacinfo/getMacValid?mac=${window.api.mac}&ProgramType=elecalc` )
  // }

  // 将url中某个字符去掉
  funcUrlDel(name) {
    var loca = window.location
    var baseUrl = loca.origin + loca.pathname + '?'
    var query = loca.search.substr(1)
    if (query.indexOf(name) > -1) {
      var obj = {}
      var arr = query.split('&')
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=')
        obj[arr[i][0]] = arr[i][1]
      }
      delete obj[name]
      var targetUrl =
        baseUrl +
        JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '=').replace(/,/g, '&') +
        loca.hash
      return targetUrl
    } else {
      return loca.href
    }
  }
}
export default new Util()
