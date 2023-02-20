
/**
 * @class LazyLoad
 * @param {string} [url="document"] 图片可显示区域的元素选择器。默认是文档对象
 */
class LazyLoadOld {
  constructor(root = 'document') {
    this.imgList = []
    this.root = root
  }


  /**
   * 静态方法，添加图片到监听队列
   * @memberOf LazyLoad
   */
  observe() {
    this._init()
    this.imgList = [...document.querySelectorAll(`${this.root === 'document' ? '' : this.root} img[data-lazy]`)]
    this._cb()
  }

  /**
   * 静态方法 ， 清空监听队列，取消监听
   * @memberOf LazyLoad
   */
  disconnect() {
    this.imgList = []
    this.rootEle.removeEventListener('scroll', this.cb)
    this._cb = null
    this.rootEle = null
  }

  // 初始化
  _init() {
    let rects

    // 如果是 root 是 document
    if (this.root === 'document') {
      this.rootEle = document
      rects = {
        left: 0,
        top: 0,
        right: window.innerWidth || document.documentElement.clientWidth,
        bottom: window.innerHeight || document.documentElement.clientHeight
      }
    } else {
      this.rootEle = document.querySelector(this.root)

      if (!this.rootEle) {
        throw `${this.root} can be select`
      }
      rects = this.rootEle.getBoundingClientRect()
    }

    let { left, top, right, bottom } = rects
    rects = null

    this._cb = () => {
      if (this.imgList.length === 0) return
      const imgList = this.imgList

      this.imgList = imgList.filter((v, i) => {
        let { left: imgL, top: imgT, right: imgR, bottom: imgB } = v.getBoundingClientRect()
        // 左或右在可视界面内
        let lor = ((imgT >= top && imgT <= bottom) || (imgB <= bottom && imgB >= top))

        if (lor && ((imgL >= left && imgL <= right) || (imgR <= right && imgR >= left))) {

          v.setAttribute('src', v.getAttribute('data-lazy-src'))
          v.removeAttribute('data-lazy')
          v.removeAttribute('data-lazy-src')
          return false
        } else return true
      })
    }

    this.rootEle.addEventListener('scroll', this._cb)
  }
}


/* 
   使用方法：
    img 元素 src 使用默认的加载图片，
    真正的 src 放入自定义属性 data-lazy-src 中
    添加 data-lazy 属性，表示此 img 需要进行懒加载
    需要注意，在 vue 中， data-lazy 不要动态渲染，可能出现重复监听的清空

    调用 observe 可以增加监听的图片
*/
class LazyLoadNew {
  constructor(root) {
    this.root = root

    function cb(entries, observer) {
      entries.forEach(e => {
        if (e.isIntersecting) {
          let target = e.target
          target.setAttribute('src', target.getAttribute('data-lazy-src'))
          target.removeAttribute('data-lazy')
          target.removeAttribute('data-lazy-src')
          observer.unobserve(target)
        }
      })
    }

    this.observer = new IntersectionObserver(cb, {
      root: document.querySelector(root),
      threshold: 0
    })
  }

  observe() {
    this.observer.disconnect()
    let imgList = document.querySelectorAll(`${this.root === 'document' ? '' : this.root} img[data-lazy]`)

    imgList.forEach(v => {
      this.observer.observe(v)
    })
  }

  disconnect() {
    this.observer.disconnect()
  }
}

let LazyLoad
if (window.IntersectionObserver) {
  LazyLoad = LazyLoadNew
} else {
  LazyLoad = LazyLoadOld
}


export default LazyLoad