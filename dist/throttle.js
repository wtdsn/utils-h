function throttle(dur, fun, endCall = true) {
  let pre = timer = 0

  return function () {
    let cur = Date.now()
    if (cur - pre >= dur) {
      if (endCall) {
        clearTimeout(timer)
        timer = 0
      }

      fun.call(this.arguments)
      pre = cur

      return
    }
    if (endCall && !timer) {
      timer = setTimeout(() => {
        fun.call(this.arguments)
        pre = cur
        timer = 0
      }, dur)
    }
  }
}

export default throttle