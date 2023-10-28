//
/**
 * 拷贝
 * @param  {Boolean} bool 是否深拷贝
 * @param  {Object} obj 目标值
 * @param  {...Object} objects 来源值
 * @returns
 */
export const extend = function (...args) {
  let options,
    name,
    src,
    srcType,
    copy,
    copyIsArray,
    clone,
    target = args[0] || {},
    i = 1,
    length = args.length,
    deep = false
  if (typeof target === 'boolean') {
    deep = target
    target = args[i] || {}
    i++
  }
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {}
  }
  // 作为一个对象的方法被调用时；a.extend({})
  if (i === length) {
    target = this
    i--
  }
  for (; i < length; i++) {
    if ((options = args[i]) !== null) {
      for (name in options) {
        src = target[name]
        copy = options[name]
        if (target === copy) {
          continue
        }
        srcType = Array.isArray(src) ? 'array' : typeof src
        if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && srcType === 'array' ? src : []
          } else {
            clone = src && srcType === 'object' ? src : {}
          }
          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}
