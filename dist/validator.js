class Validator {
  constructor() {
    this.rules = []
  }

  checkEmpty(text) {
    return !!(text && text.trim())
  }

  checkEqual(text1, text2) {
    // 直接比较
    return text1 === text2
  }

  checkObjEqual(obj1, obj2, keys = []) {
    // 浅比较对象
    if (keys.length === 0) {
      keys = Object.keys(obj1)
    }
    return keys.every(key => {
      // 支持 a.b 进行生层取值比较
      let v1 = obj1, v2 = obj2
      return key.split('.').every(k => {
        if (typeof v1 !== typeof v2) return false
        v1 = v1[k], v2 = v2[k]
        return true
      }) && v1 === v2
    })
  }

  checkLen(text, minL = -Infinity, maxL = Infinity) {
    text = text.trim()
    // 仅设置了 minL
    if (minL !== -Infinity && maxL === Infinity) {
      maxL = minL
    }
    return text.length >= minL && text.length <= maxL
  }

  checkRange(num, min = -Infinity, max = Infinity, loose = false) {
    // if loose is true , num can be 'number string'
    if (typeof num === 'number') {
      return num >= min && num <= max
    }

    if (loose && typeof num === 'string') {
      num = Number(num)
      return num === num && num >= min && num <= max
    }

    return false
  }

  checkIsNum(num, loose = false, canbeNaN = false) {
    // if loose is true , it can be 'number string'
    // if canbeNaN is true , NaN will return true
    if (typeof num === 'number') {
      return canbeNaN || num === num
    }
    if (loose && typeof num === 'string') {
      num = Number(num)
      return num === num
    }
    return false
  }

  addRule(rule) {
    this.rules.push(rule)
    return this.rule.length - 1
  }

  deleteRule(id) {
    this.rules.splice(id, 1)
  }

  clear() {
    this.rules = []
  }

  // rule can be id , or inner rule
  checkByRule(rule, obj, options) {
    if (typeof rule === 'number') {
      return this.rules[rule](obj, options)
    }

    if (typeof rule === 'string') {
      return rules_h[rule](obj, options)
    }

    return false
  }
}


//  TODO add： 日期，密码强弱 ， QQ ， IP ， URL， 身份证，地址
const rules_h = {
  phone(text) {
    return /^1[0-9]{10}$/.test(text)
  },

  mail(text) {
    return /^[^\.-]([\w-]*\.?[\w-]+)+@[\w]+\.[A-z]+$/.test(text)
  },

  nameCh(text) {
    return /^([\u4e00-\u9fa5]+\.?[\u4e00-\u9fa5]+)+$/.test(text)
  },

  pw(text, strength = 1) {
    if (/\s/.test(text)) return false
    if (strength === 3) {
      return /[A-z]/.test(text) && /[0-9]/.test(text) && /[\!@\#\$\%\^\&\*\(\)\_\+]/.test(text) && /[\w\!@\#\$\%\^\&\*\(\)\_\+]{8,}/.test(text)
    } else if (strength === 2) {
      return /[A-z]/.test(text) && /[0-9]/.test(text) && /[\w\!\@\#\$\%\^\&\*\(\)\_\+]{8,}/.test(text)
    } else
      return /[\w\!\@\#\$\%\^\&\*\(\)\_\+]{6,}/.test(text)
  }
}

// export default Validator
module.exports = Validator

// let validator = new Validator()