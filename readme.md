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
校验器，用于表单数据的校验，

```js
const validator = new Validator()
```

### 实例方法
- **noEmpty(text)**
如果 text 是空字符串或者仅空格，则返回 false ，否则返回 true

- **equal(text1,text2)**
严格比较 text1 和 text2

- **objEqual(obj1,ibj2,keys?)**
根据 keys 指定比较的对象属性，比较对象是否相等
如果 keys 没有指定，则 keys = Object.keys(obj1)

不指定 keys
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

指定 keys
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
// 比较 a 和 c 下的 d 属性
validator.checkObjEqual(obj1,obj2,['a','c.d']) // true
```

- **len(text,minL,maxL)**
text 的长度是否在 [minL,maxL] 的范围内，如果在即 true ，否则 false

- **range(num,min,max,loose = false)**
检测 num 数值的范围是否在 [min,max] 内 , 如果 loose 为 true ，则 num 可以为一个字符串数值，比如 '123'
```js
validator.range('12',0,12) // false  '12' is string
validator.range('12',0,12,true) // true  '12' will translate to 12
```

- **isNum(num,loose = false,canbeNaN = false)**
检测 num 是否是一个数值，loose 为 true1 ，表示字符串数值（'12'） 也认为是数值
canbeNaN 如果为 true ，则 NaN 也返回 true
其他情况非数值返回 false


- **phone(text)**
根据传入的数值或字符串，检测是否为号码

- **mail(text)**
根据传入的字符串，检测是否为邮箱

- **nameCh(text)**
根据传入的字符串，检测是否为中文的名字，包括 XXX·XXX·XXX 的格式

- **pw(text,strength = 1)**
检测密码的强度
strength = 1 时 ， 限制长度不小于 6
strength = 2 时 ， 限制长度不小于 8,且必须包含数值和英文
strength = 1 时 ， 限制长度不小于 6 ，且必须包含数值，英文和特殊字符（部分特殊字符不支持）

- **addRule(rule:function)**
传入一个自定义检测函数 ， 返回一个 id

- **clear()**
清空所有自定义函数

- **checkByRule(rule,...args:any)**
传入 rule , 使用 rule 对应的方法对数据进行检测
rule 可以是自定义函数的 id ，也可以是 isNum ，mail 等字符串

```js
let id = addRule((text)=>{
  return !!text
})
checkByRule(id,'abc') // true

checkByRule('phone','12312312312') // true
```

- **checkByRules(rules)**
对于大量数据需要校验时，rules 只是一个配置，checkByRules 函数会根据配置，主动进行检测
返回一个 promise ， 如果所有检测都是 true ，则 resolve 为 true
否则 resolve 为第一个 false 的检测的错误提示

rules 是对象数组，对象包括三个元素 `rule` , `errText` , `args`
rule 可以是自定义检测函数的 id ，也可以是 `isNum` ,`phone` 等字符串
errText 是抛出的错误提示文字
args 是检测函数的参数数组

```js
const rules = [
      {
        rule: "noEmpty",
        errText: "名字不能为空",
        args: [' asd  ']
      },
      {
        rule: "phone",
        errText: "号码不正确",
        args: ['123asd']
      },
      {
        rule: 'len',
        errText: "长度不符合",
        args: ['123', 2, 4]
      }
    ]

validator.checkByRules(rules).then((r) => {
      // all true
    }, err => {
      // first err
      // err === 号码不正确
    })
```