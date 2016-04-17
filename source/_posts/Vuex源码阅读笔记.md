title: Vuex源码阅读笔记
date: 2016-04-17 09:41:19
tags: 前端
---
> 笔记中的Vue与Vuex版本为1.0.21和0.6.2,需要阅读者有使用Vue与Vuex的经验。

## 起因
俗话说得好，没有无缘无故的爱，也没有无缘无故的恨，更不会无缘无故的去阅读别人的源代码。
之所以会去阅读Vuex的源代码，是因为在刚开始接触Vuex时，就在官方文档的Actions部分，看到这么一句：

```javascript
// the simplest action
function increment (store) {
  store.dispatch('INCREMENT')
}

// a action with additional arguments
// with ES2015 argument destructuring
function incrementBy ({ dispatch }, amount) {
  dispatch('INCREMENT', amount)
}
```

上面的Action还好说，能看懂，但是下面使用ES6写法的Action是什么鬼呀喂（摔！）
虽然知道有解构赋值，但是那个`{ dispatch }`又是从哪儿冒出来的呀喂！明明我在调用时，没有传这个参数呀！
之前因为赶项目进度，所以抱着能用就行的态度，也就没管那么多。如今有了空闲时间，必须好好钻研一下呀。
而钻研最好的方式，就是阅读Vuex的源代码。这样就能弄清楚，那个`{ dispatch }`到底从哪儿冒出来的。

### Vuex源代码简介
Vuex的源代码量挺少的，加起来也才600行不到，但是其中大量使用了ES6的语法，且部分功能（如Vuex初始化)使用到了Vue。所以读起来还是有些费劲的。
整个Vuex的源代码，核心内容包括两部分。一部分是Store的构造函数，另一部分则是Vuex的初始化函数。
而刚才问题的答案，就在第二部分。

## 问题场景还原
首先要介绍的，就是Vuex在Vue项目中的初始化。这儿贴一段代码：
首先是Vuex中，我写的Actions源代码：
```javascript
// global/Vuex/action.js
export const getMe = ({ dispatch }) => {
  /**
   * 异步操作，获取用户信息，并存入Vuex的state中
   */
  res.user.get_me()
  .then(data => {
    dispatch('GET_ME', data)
  })
  .catch(err => {
    console.log(err)
  })
}
```
这个则是顶层组件，调用store的地方。由于Vuex的特点，store只需要在最顶层的组件声明一次。
```html
<template>
  <div id="wrapper">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import store from './Vuex/store.js'

  export default {
    store
  }
</script>
```
接下来则是组件中，则是实际调用Vuex的代码。
```javascript
// index.vue
import { getMe } from './../global/Vuex/action'

export default {

  vuex: {
    actions: {
      getMe
    },
    getters: {
      // 从state中获取信息
      user: state => state.user
    }
  },

  ready() {
    // 开始获取用户信息
    this.getMe()
  }
}
```
在这儿，可以很明显的看出，我在使用`this.getMe()`时，是没有任何参数的。但是在`getMe`函数的定义中，是需要解构赋值出`{dispatch}`的。
就好比说这个：
```javascript
function getX({ x }) {
  console.log(x)
}

getX({ x: 3, y: 5 })
// 3
```
你得传入相应的参数，才能进行解构赋值。
同时，我注意到在Vuex的Actions调用，需要在Vue的options的Vuex.actions中先声明，之后才能使用。
那么，一定是Vuex对这个Action动了手脚。（逃）
而动手脚的代码，就存在于Vuex源代码的`override.js`中。这个文件，是用于初始化Vuex的。

## Vuex的初始化
在`override.js`中，有个`vuexInit`的函数。看名字就知道，这是拿来初始化Vuex的。
在代码开头，有这么一句：
```javascript
const options = this.$options
const { store, vuex } = options
// 感觉解构赋值真的很棒，这样写能省很多时间。
// 下面的是老写法
// const store = options.store
// const vuex = options.vuex
```
在这儿，用于是在Vue中调用，所以this指向Vue,而this.$options则是Vue的配置项。
也就是写Vue组件时的：
`export default {……一些配置}`
这里，就把Vue配置项的store和vuex抽离出来了。
接下来，则看到了Vuex源代码的精妙之处：
```javascript
// store injection
if (store) {
  this.$store = store
} else if (options.parent && options.parent.$store) {
  this.$store = options.parent.$store
}
```
解构赋值并不是一定成功的，如果store在options中不存在，那么store就会是undefined。
