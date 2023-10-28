import abp from './index'
//处理abp获取权限的方法，由于从接口里来的和getall.js不一样，统一处理成小写进行判断
abp.auth.isGranted = function (permissionName) {
  if (typeof permissionName == 'string') {
    permissionName = permissionName.toLowerCase()
    return (
      abp.auth.grantedPermissions[permissionName] != undefined ||
      !abp.auth.allPermissions[permissionName]
    )
    //return abp.auth.allPermissions[permissionName] != undefined && abp.auth.grantedPermissions[permissionName] != undefined;
  } else {
    return false
  }
}
abp.auth.isStrictGranted = function (permissionName) {
  if (typeof permissionName == 'string') {
    permissionName = permissionName.toLowerCase()
    return abp.auth.grantedPermissions[permissionName] != undefined
  } else {
    return false
  }
}
abp.features.get = function (k) {
  if (typeof k === 'string') {
    return abp.features.allFeatures[k.toLowerCase()]
  } else {
    return undefined
  }
}
abp.setting.get = function (k) {
  if (typeof k === 'string') {
    return abp.setting.values[k.toLowerCase()]
  } else {
    return undefined
  }
}
abp.setting.getBoolean = function (n) {
  if (typeof n === 'string') {
    const t = abp.setting.get(n.toLowerCase())
    return t == 'true' || t == 'True'
  }
}
abp.setting.getInt = function (n) {
  if (typeof n === 'string') {
    return parseInt(abp.setting.values[n.toLowerCase()])
  }
}
abp.utils.getToken = function () {
  return abp.utils.getCookieValue('token')
}

export default abp
