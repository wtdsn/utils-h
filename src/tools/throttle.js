function throttle(dur, fun, endCall = true) {
  let pre = 0, timer = 0

  return function () {
    let cur = Date.now()
    if (cur - pre >= dur) {
      if (endCall) {
        clearTimeout(timer)
        timer = 0
      }
      fun.apply(this, arguments)
      pre = cur

      return
    }
    if (endCall && !timer) {
      timer = setTimeout(() => {
        fun.apply(this, arguments)
        pre = cur
        timer = 0
      }, dur)
    }
  }
}

export default throttle