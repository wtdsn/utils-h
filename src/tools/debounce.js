function debounce(wait, fun, immediate = false) {
  // 定时器
  let timer = null
  // 是否取消
  let waiting = false

  return function () {
    // 等待中
    if (waiting) {
      clearTimeout(timer)
      if (immediate) {
        timer = setTimeout(() => {
          waiting = false
        }, wait)
      } else {
        timer = setTimeout(() => {
          waiting = false
          fun.apply(this, arguments)
        }, wait)
      }
      return
    }
    waiting = true
    // 立即执行
    if (immediate) {
      fun.apply(this, arguments)
      timer = setTimeout(() => {
        waiting = false
      }, wait)
    } else {
      // 非立即执行
      timer = setTimeout(() => {
        waiting = false
        fun.apply(this, arguments)
      }, wait)
    }
  }
}

export default debounce