// src/tools/debounce.js
function debounce(wait, fun, immediate = false) {
  let timer = null;
  let waiting = false;
  return function() {
    if (waiting) {
      clearTimeout(timer);
      if (immediate) {
        timer = setTimeout(() => {
          waiting = false;
        }, wait);
      } else {
        timer = setTimeout(() => {
          waiting = false;
          fun.apply(this, arguments);
        }, wait);
      }
      return;
    }
    waiting = true;
    if (immediate) {
      fun.apply(this, arguments);
      timer = setTimeout(() => {
        waiting = false;
      }, wait);
    } else {
      timer = setTimeout(() => {
        waiting = false;
        fun.apply(this, arguments);
      }, wait);
    }
  };
}
var debounce_default = debounce;

// src/tools/throttle.js
function throttle(dur, fun, endCall = true) {
  let pre = 0, timer = 0;
  return function() {
    let cur = Date.now();
    if (cur - pre >= dur) {
      if (endCall) {
        clearTimeout(timer);
        timer = 0;
      }
      fun.apply(this, arguments);
      pre = cur;
      return;
    }
    if (endCall && !timer) {
      timer = setTimeout(() => {
        fun.apply(this, arguments);
        pre = cur;
        timer = 0;
      }, dur);
    }
  };
}
var throttle_default = throttle;

// src/tools/lazyLoad.js
var LazyLoadOld = class {
  constructor(root = "document") {
    this.imgList = [];
    this.root = root;
  }
  /**
   * 静态方法，添加图片到监听队列
   * @memberOf LazyLoad
   */
  observe() {
    this._init();
    this.imgList = [...document.querySelectorAll(`${this.root === "document" ? "" : this.root} img[data-lazy]`)];
    this._cb();
  }
  /**
   * 静态方法 ， 清空监听队列，取消监听
   * @memberOf LazyLoad
   */
  disconnect() {
    this.imgList = [];
    this.rootEle.removeEventListener("scroll", this.cb);
    this._cb = null;
    this.rootEle = null;
  }
  // 初始化
  _init() {
    let rects;
    if (this.root === "document") {
      this.rootEle = document;
      rects = {
        left: 0,
        top: 0,
        right: window.innerWidth || document.documentElement.clientWidth,
        bottom: window.innerHeight || document.documentElement.clientHeight
      };
    } else {
      this.rootEle = document.querySelector(this.root);
      if (!this.rootEle) {
        throw `${this.root} can be select`;
      }
      rects = this.rootEle.getBoundingClientRect();
    }
    let { left, top, right, bottom } = rects;
    rects = null;
    this._cb = () => {
      if (this.imgList.length === 0)
        return;
      const imgList = this.imgList;
      this.imgList = imgList.filter((v, i) => {
        let { left: imgL, top: imgT, right: imgR, bottom: imgB } = v.getBoundingClientRect();
        let lor = imgT >= top && imgT <= bottom || imgB <= bottom && imgB >= top;
        if (lor && (imgL >= left && imgL <= right || imgR <= right && imgR >= left)) {
          v.setAttribute("src", v.getAttribute("data-lazy-src"));
          v.removeAttribute("data-lazy");
          v.removeAttribute("data-lazy-src");
          return false;
        } else
          return true;
      });
    };
    this.rootEle.addEventListener("scroll", this._cb);
  }
};
var LazyLoadNew = class {
  constructor(root) {
    this.root = root;
    function cb(entries, observer) {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          let target = e.target;
          target.setAttribute("src", target.getAttribute("data-lazy-src"));
          target.removeAttribute("data-lazy");
          target.removeAttribute("data-lazy-src");
          observer.unobserve(target);
        }
      });
    }
    this.observer = new IntersectionObserver(cb, {
      root: document.querySelector(root),
      threshold: 0
    });
  }
  observe() {
    this.observer.disconnect();
    let imgList = document.querySelectorAll(`${this.root === "document" ? "" : this.root} img[data-lazy]`);
    imgList.forEach((v) => {
      this.observer.observe(v);
    });
  }
  disconnect() {
    this.observer.disconnect();
  }
};
function LazyLoad(root) {
  if (window.IntersectionObserver) {
    return new LazyLoadNew(root);
  } else {
    return new LazyLoadOld(root);
  }
}
var lazyLoad_default = LazyLoad;

// src/tools/qs.js
function parse(url) {
  url = url.trim();
  let reg = /^(.+?):\/\/([A-z0-9\.]+)(?:\:([0-9]{0,5}))?([^\?\#\:]+)*(?:\?([^#]*))?(?:\#(.*))?$/i;
  let res;
  try {
    let matchRes = url.match(reg);
    res = {
      url,
      scheme: matchRes[1],
      domain: matchRes[2],
      port: matchRes[3],
      path: matchRes[4],
      query: matchRes[5],
      hash: matchRes[6]
    };
    return res;
  } catch (err) {
    console.log(`fail to parse ${url}
`, err);
    return {};
  }
}
function getQuery(url) {
  let queryString;
  try {
    queryString = url.match(/(?:\?([^#]*))/i)[1];
  } catch (err) {
    console.log(`fail to getQuery ${url}
`, err);
  }
  if (!queryString)
    return {};
  const queryObj = {};
  queryString = decodeURI(queryString);
  queryString.split("&").forEach((v) => {
    const [key, value] = v.split("=");
    queryObj[key] = value;
  });
  return queryObj;
}
function setQuery(url = "", query) {
  let queryArr = [];
  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      queryArr.push([key] + "=" + query[key]);
    }
  }
  return `${url}?${encodeURI(queryArr.join("&"))}`;
}
var qs = {
  parse,
  getQuery,
  setQuery
};
var qs_default = qs;

// src/tools/time.js
function getFullY(format = "yyyy") {
  if (format.toLowerCase() === "yyyy")
    return (/* @__PURE__ */ new Date()).getFullYear();
  else
    return (/* @__PURE__ */ new Date()).getFullYear().toString().slice(2, 4);
}
function getT(t, format, dual) {
  if (format.toLowerCase() === dual) {
    return t < 9 ? "0" + t : t;
  }
  return t;
}
function getMouth(format = "mm") {
  let m = (/* @__PURE__ */ new Date()).getMonth() + 1;
  return getT(m, format, "mm");
}
function getDate(format = "dd") {
  let d = (/* @__PURE__ */ new Date()).getDate();
  return getT(d, format, "dd");
}
function getHours(format = "hh") {
  let h = (/* @__PURE__ */ new Date()).getHours();
  return getT(h, format, "hh");
}
function getMinutes(format = "mimi") {
  let m = (/* @__PURE__ */ new Date()).getMinutes();
  return getT(m, format, "mimi");
}
function getSeconds(format = "ss") {
  let s = (/* @__PURE__ */ new Date()).getSeconds();
  return getT(s, format, "ss");
}
function getTime(format) {
  let FY = /y{4}/ig;
  let FM = /m{2}/ig;
  let FD = /d{2}/ig;
  let FH = /h{2}/ig;
  let FMI = /(mi){2}/ig;
  let FS = /s{2}/ig;
  format = format.replace(FY, getFullY());
  format = format.replace(FM, getMouth());
  format = format.replace(FD, getDate());
  format = format.replace(FH, getHours());
  format = format.replace(FMI, getMinutes());
  format = format.replace(FS, getSeconds());
  let Y = /yy/ig;
  let M = /m(?!i)/ig;
  let D = /d/ig;
  let H = /h/ig;
  let MI = /(mi)/ig;
  let S = /s/ig;
  format = format.replace(Y, getFullY("yy"));
  format = format.replace(M, getMouth("m"));
  format = format.replace(D, getDate("d"));
  format = format.replace(H, getHours("h"));
  format = format.replace(MI, getMinutes("mi"));
  format = format.replace(S, getSeconds("s"));
  return format;
}
var time_default = getTime;

// src/tools/validator.js
var Validator = class {
  constructor() {
    this.rules = [];
    this.ini();
  }
  ini() {
    if (!Validator.prototype.inited) {
      let keys = Object.keys(rules_h);
      keys.forEach((v) => {
        Validator.prototype[v] = rules_h[v];
      });
      Validator.prototype.inited = true;
    }
  }
  addRule(rule) {
    this.rules.push(rule);
    return this.rule.length - 1;
  }
  /* 
    deleteRule(id) {
      this.rules.splice(id, 1)
    } */
  clear() {
    this.rules = [];
  }
  // rule can be id , or inner rule
  checkByRule(rule, ...args) {
    if (typeof rule === "number") {
      return this.rules[rule](...args);
    }
    if (typeof rule === "string") {
      return rules_h[rule](...args);
    }
    return false;
  }
  checkByRules(rules = []) {
    return new Promise((resolve, reject) => {
      rules.every((v) => {
        if (this.checkByRule(v.rule, ...v.args)) {
          return true;
        }
        reject(v.errText);
      });
      resolve(true);
    });
  }
};
var rules_h = {
  phone(text) {
    return /^1[0-9]{10}$/.test(text);
  },
  mail(text) {
    return /^[^\.-]([\w-]*\.?[\w-]+)+@[\w]+\.[A-z]+$/.test(text);
  },
  nameCh(text) {
    return /^([\u4e00-\u9fa5]+·?[\u4e00-\u9fa5]+)+$/.test(text);
  },
  pw(text, strength = 1) {
    if (/\s/.test(text))
      return false;
    if (strength === 3) {
      return /[A-z]/.test(text) && /[0-9]/.test(text) && /[\!@\#\$\%\^\&\*\(\)\_\+]/.test(text) && /[\w\!@\#\$\%\^\&\*\(\)\_\+]{8,}/.test(text);
    } else if (strength === 2) {
      return /[A-z]/.test(text) && /[0-9]/.test(text) && /[\w\!\@\#\$\%\^\&\*\(\)\_\+]{8,}/.test(text);
    } else
      return /[\w\!\@\#\$\%\^\&\*\(\)\_\+]{6,}/.test(text);
  },
  noEmpty(text) {
    return !!(text && text.trim());
  },
  equal(text1, text2) {
    return text1 === text2;
  },
  objEqual(obj1, obj2, keys = []) {
    if (keys.length === 0) {
      keys = Object.keys(obj1);
    }
    return keys.every((key) => {
      let v1 = obj1, v2 = obj2;
      return key.split(".").every((k) => {
        if (typeof v1 !== typeof v2)
          return false;
        v1 = v1[k], v2 = v2[k];
        return true;
      }) && v1 === v2;
    });
  },
  len(text, minL = -Infinity, maxL = Infinity) {
    text = text.trim();
    if (minL !== -Infinity && maxL === Infinity) {
      maxL = minL;
    }
    return text.length >= minL && text.length <= maxL;
  },
  range(num, min = -Infinity, max = Infinity, loose = false) {
    if (typeof num === "number") {
      return num >= min && num <= max;
    }
    if (loose && typeof num === "string") {
      num = Number(num);
      return num === num && num >= min && num <= max;
    }
    return false;
  },
  isNum(num, loose = false, canbeNaN = false) {
    if (typeof num === "number") {
      return canbeNaN || num === num;
    }
    if (loose && typeof num === "string") {
      num = Number(num);
      return num === num;
    }
    return false;
  }
};
var validator_default = Validator;
export {
  lazyLoad_default as LazyLoad,
  validator_default as Validator,
  debounce_default as debounce,
  time_default as getTime,
  qs_default as qs,
  throttle_default as throttle
};
