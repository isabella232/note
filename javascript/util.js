/**
 * @author ltw
 */

/**
 * 对象深拷贝
 * 签拷贝使用 Object.assign()
 * @param {} obj 
 */
export function ObjectDeepClone(obj) {
  if (typeof obj === 'object') {
    let jsonStr = JSON.stringify(obj)
    return JSON.parse(jsonStr)
  } else {
    throw new Error('param should be Object')
  }
}

/**
 * 是否为null
 * @param {String} input 
 */
export function isEmpty(input) {
  return !(isNull() || isUndefined() || isFalse() || isStringNullOrUndefined())
}

export function isFalse(input) {
  return !!input
}

export function isStringNullOrUndefined(input) {
  if (typeof input === 'string') {
    return input === 'null' || input === 'undefined'
  }
  return false
}

export function isNull(input) {
  return Object.prototype.toString.call(input) === '[object Null]'
}

export function isUndefined(input) {
  return Object.prototype.toString.call(input) === '[object Undefined]'
}

/**
 * Regexp
 */

export const Reg = Object.create(null)

Reg.isPhoneRight = (input) => {
  if (typeof input === 'string' || typeof input === 'number') {
    return /1\d{10}/ig.test(input)
  }
  return false
}
