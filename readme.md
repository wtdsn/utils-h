# utils-h
utils-h 是一个前端工具包，
包括  qs , debounce ,throttle , LazyLoad , getTime , 等函数或类等 API


## download
```shell
> yarn add utils-h
```

## import
可以通过此，全部引入
```js
import * as UtilsH from 'utils-h'

console.log(utilsH.throttle)
```

或者仅引入你需要使用的

```js
import {debounce} from 'utils-h'

let f = debounce(100,cb,true)
```


## use tools

### 🌀debounce
防抖函数

`function debounce(wait: number, fun: Function, immediate?: boolean): Function`

- wait (ms)
- fun
- immediate
> 如果 immediate 是 true , 防抖函数会立即调用 ，默认 false

```ts
import { debounce } from 'utils-h'

let cb = function(){
  //...
}

let cbWithDebounce = debounce(200,cb,true)

ele.onclick = cbWithDebounce
```

### 🌈throttle
节流函数
`function throttle(dur: number, fun: Function, endCall?: boolean): Function`

- dur(ms)
- fun
- endCall
> 如果 endCall 是 true , 讲在末尾再执行一次回调，假如 2s 执行一次，但是你 1 秒时停止了操作，但会执行2次 , 默认 true

```ts
import { throttle } from 'utils-h'

let cb = function(){
  //...
}

let cbWithThrottle = throttle(100,cb)

ele.onsroll = cbWithThrottle
```

### 🦀LazyLoad
图片懒加载类
未加载真正图片的 img 元素增加 data-lazy 属性 和 data-lazy-src 属性
data-lazy 为 true ， data-lazy-src 为图片真正的 src
在 vue 和 react 中，请勿动态添加 data-lazy

#### constructor
- `constructor(root?:string)`
root 是 rootEle 的 id 或者 class , 默认值是 document 。rootEle 和 `IntersectionObserver.root
` 是同一个意思

#### instance methods
- `observe()`
在有新的 img 元素增加时，增加新的监听元素。
如果你使用 vue 或者 react ， 请确保 img 元素已经渲染

#### disconnect
停止监听所有 img 元素


```vue
<script setup lang="ts">
import { LazyLoad } from 'utils-h4'
import { ref, onMounted } from 'vue'

const lazyload = ref<LazyLoad>(new LazyLoad('.container'))

onMounted(() => {
  lazyload.value.observe()
})

const imgList = ref<string[]>([])
imgList.value = [
  'src1',
  'src2',
  'src3'
]

</script>

<template>
  <div class="container">
    <img v-for="v in imgList" src="./loading.png" alt="" :key="v" data-lazy :data-lazy-src="v">
  </div>
</template>

<style>
.container {
  margin: 100px auto;
  width: 200px;
  height: 250px;
  overflow-x: hidden;
  overflow-y: scroll;
}

img {
  width: 200px;
  height: 200px;
}
</style>
```

### 🐻qs
提取 url 中的数据或者设置 search 参数

`let {qs} from 'utils-h'`

#### methods
- parse(url:string)
获取 url 各个部分数据，返回对象

```ts
 let parseRes = qs.parse('https://abc.com:80/a/b/?a=1#efg')
 console.log(parseRes)
 /* 
  {
      url:'https://abc.com:80/?a=1#efg'
      scheme: https,
      domain: abc.com,
      port: 80,
      path: /a/b,
      query: a=1,
      hash: efg,
  }
 */

```


- getQuery(url:string)
获取 search (query) 参数

```ts
let qo = qs.getQuery('http://abc.com?a=1&b=2')
console.log(qo)
/* 
  {
    a:1,
    b:2
  }
*/
```


- setQuery(url:string,query:object)
设置 query (search) 参数

```ts
  let qo = {
    a:1,
    b:2
  }

  let url = qs.setQuery('http://abc.com',qo)
  console.log(url)
  // http://abc.com?a=1&b=2
```



### 🕐getTime
获取时间参数
根据你的格式，返回对应格式的时间

```js
const time = getTime(format)

getTime('yyyy')  // 2023

getTime('mm')  // 03   (month
getTime('m')  // 3   (month

getTime('dd')  // 21   (day
getTime('d')  // 21   (day

getTime('hh:mimi:ss')  // 08:06:36
geTime('h:mi:s') // 8:6:36

getTime('yy/m/d hh:mimi:ss')  // 23/3/21 08:06:36
```





### 🐞Validator
校验器，doing....

```js
const validator = new Validator()
```

### methods
- **checkEmpty(text)**
if text is empty string or text only has space , it will return false

- **checkEqual(text1,text2)**

- **checkObjEqual(obj1,ibj2,kesy?)**
examples

1. without keys , keys will from Object.keys(obj1)
```js
let obj1 = {
  a:1,
  b:2
},
obj2 = {
  a:1,
  b:2
}
validator.checkObjEqual(obj1,obj2) // true
```

2. check keys
```js
let obj1 = {
  a:1,
  b:'2',
  c:{
    d:3
  },
  e:false
},
obj2 = {
  a:1,
  b:false,
  c:{
    d:3
  }
}
validator.checkObjEqual(obj1,obj2,['a','c.d']) // true
```

- **checkLen(text,minL,maxL)**
- **checkRange(num,min,max,loose = false)**
if loose is true , num can be 'number string'
```js
checkRange('12',0,12) // false  '12' is string
checkRange('12',0,12,true) // true  '12' will translate to 12
```

- **checkIsNum(num,loose = false,canbeNaN = false)**
if loose is true , it can be 'number string'
if canbeNaN is true , NaN will return true


- ... doing
