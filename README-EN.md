# utils-h
utils-h is a package for front-end
inluced qs , debounce ,throttle , LazyLoad ...


## download
```shell
> yarn add utils-h
```

## import
you can use it like :
```js
import * as UtilsH from 'utils-h'

console.log(utilsH.throttle)
```

or

```js
import {debounce} from 'utils-h'

let f = debounce(100,cb,true)
```


## use tools

### 🌀debounce
`function debounce(wait: number, fun: Function, immediate?: boolean): Function`

- wait (ms)
- fun
- immediate
If true, fun will be executed immediately , default false

```ts
import { debounce } from 'utils-h'

let cb = function(){
  //...
}

let cbWithDebounce = debounce(200,cb,true)

ele.onclick = cbWithDebounce
```

### 🌈throttle
`function throttle(dur: number, fun: Function, endCall?: boolean): Function`

- dur(ms)
- fun
- endCall
If true, Fun will execute again at the end , default true

```ts
import { throttle } from 'utils-h'

let cb = function(){
  //...
}

let cbWithThrottle = throttle(100,cb)

ele.onsroll = cbWithThrottle
```

### 🦀LazyLoad
only for img , LazyLoad is a class


#### constructor
- `constructor(root?:string)`
rootEle is the viewable area element of imgs 。root can be class or id
default is document

#### instance methods
- `observe()`
observe the img elements
if you use it in vue or react , You need to make sure that the img elements has been rendered

#### disconnect
unobserve all img elements


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
`let {qs} from 'utils-h'`
#### methods

- parse(url:string)
parse url to object

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
parse queryString to Object and return

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
