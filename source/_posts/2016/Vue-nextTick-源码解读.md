---
title: Vue nextTick 源码解读
tags: 前端
date: 2016-09-25 22:21:16
---
## 起因
自己第一次用Vue做项目时，经常遇到操作DOM的问题，但是很多时候因为Vue数据更新的特性，是不能在第一时间拿到更新后的DOM。
后面才观察到，Vue有一个`nextTick`方法。
nextTick的Api如下：
![](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045713.jpg)
对于这句话：

> 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

自己感到十分好奇，因为之前我解决此类问题，使用的是`setTimeout(fn, 0)`的方式来的。
所以就继续打开Vue的源代码，细细研读。

## 异步更新队列
在Vue的文档中，[异步更新队列](http://cn.vuejs.org/guide/reactivity.html#u5F02_u6B65_u66F4_u65B0_u961F_u5217)部分有这么一段：

> Vue.js 默认异步更新 DOM。每当观察到数据变化时，Vue 就开始一个队列，将同一事件循环内所有的数据变化缓存起来。如果一个 watcher 被多次触发，只会推入一次到队列中。等到下一次事件循环，Vue 将清空队列，只进行必要的 DOM 更新。在内部异步队列优先使用 MutationObserver，如果不支持则使用 setTimeout(fn, 0)。
例如，设置了 vm.someData = 'new value'，DOM 不会立即更新，而是在下一次事件循环清空队列时更新。
为了在数据变化之后等待 Vue.js 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback) 。回调在 DOM 更新完成后调用。

那么由文档可知，异步更新队列的奥妙则在于`MutationObserver`。
在MDN中，对`MutationObserver`的介绍如下：

> MutationObserver给开发者们提供了一种能在某个范围内的DOM树发生变化时作出适当反应的能力.

而在Vue的源代码中，则是：

```javascript
/**
 * Defer a task to execute it asynchronously. Ideally this
 * should be executed as a microtask, so we leverage
 * MutationObserver if it's available, and fallback to
 * setTimeout(0).
 *
 * @param {Function} cb
 * @param {Object} ctx
 */

export const nextTick = (function () {
  var callbacks = []
  var pending = false
  var timerFunc
  function nextTickHandler () {
    pending = false
    var copies = callbacks.slice(0)
    callbacks = []
    for (var i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  /* istanbul ignore if */
  if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(counter)
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc = function () {
      counter = (counter + 1) % 2
      textNode.data = counter
    }
  } else {
    // webpack attempts to inject a shim for setImmediate
    // if it is used as a global, so we have to work around that to
    // avoid bundling unnecessary code.
    const context = inBrowser
      ? window
      : typeof global !== 'undefined' ? global : {}
    timerFunc = context.setImmediate || setTimeout
  }
  return function (cb, ctx) {
    var func = ctx
      ? function () { cb.call(ctx) }
      : cb
    callbacks.push(func)
    if (pending) return
    pending = true
    timerFunc(nextTickHandler, 0)
  }
})()
```

解读一下，这是个自执行函数。在`MutationObserver`存在的情况下，则是这样的：

```javascript
var callbacks = []
var pending = false
var timerFunc
function nextTickHandler () {
  pending = false
  var copies = callbacks.slice(0)
  callbacks = []
  for (var i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

var counter = 1
var observer = new MutationObserver(nextTickHandler)
var textNode = document.createTextNode(counter)
observer.observe(textNode, {
  characterData: true
})
timerFunc = function () {
  counter = (counter + 1) % 2
  textNode.data = counter
}

const nextTick = function (cb, ctx) {
  // 如果ctx参数存在，则为回调函数绑定this
  var func = ctx
    ? function () { cb.call(ctx) }
    : cb
  callbacks.push(func)
  if (pending) return
  pending = true
  timerFunc(nextTickHandler, 0)
}
```

核心的部分为：

```javascript
var counter = 1
var observer = new MutationObserver(nextTickHandler)
var textNode = document.createTextNode(counter)
observer.observe(textNode, {
  characterData: true
})
timerFunc = function () {
  counter = (counter + 1) % 2
  textNode.data = counter
}
```

在调用`observe`时，传入的参数有：
![](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045714.jpg)
**因为Mutation Observer则是异步触发，DOM发生变动以后，并不会马上触发，而是要等到当前所有DOM操作都结束后才触发。**
调用timerFunc时，因为DOM操作已经结束，此刻触发注册的回调，就能获取到更新后的回调。

### 队列更新

在看文档时，也有注意这句话：

> Vue.js 默认异步更新 DOM。每当观察到数据变化时，Vue 就开始一个队列，将同一事件循环内所有的数据变化缓存起来。如果一个 watcher 被多次触发，只会推入一次到队列中。等到下一次事件循环，Vue 将清空队列，只进行必要的 DOM 更新。

队列更新的实现则在于`Mutation Observer`与`pending`状态的配合。

```javascript
var pending = false

function nextTickHandler () {
  pending = false
  var copies = callbacks.slice(0)
  callbacks = []
  for (var i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

const nextTick = function (cb, ctx) {
  // 如果ctx参数存在，则为回调函数绑定this
  var func = ctx
    ? function () { cb.call(ctx) }
    : cb
  callbacks.push(func)
  if (pending) return
  pending = true
  timerFunc(nextTickHandler, 0)
}
```

在这里，`pending = true`时代表正在等待所有的DOM操作结束，等待操作结束时调用`nextTick`传入的回调，将会被推入队列。从而实现DOM更新后，才触发某个队列的回调。
回调触发时，pending将被设为false, 队列也将被清空，从而继续实现队列功能。

### setTimeout

既然看到了`Mutation Observer`，源代码中又有`setTimeout(fn, 0)`
就必须解释下`setTimeout(fn, 0)`的作用。这个涉及到了JavaScript的EventLoop，还是挺有意思的。
继续看MDN的解释：

> 零延迟 (Zero delay) 并不是意味着回调会立即执行。在零延迟调用 setTimeout 时，其并不是过了给定的时间间隔后就马上执行回调函数。其等待的时间基于队列里正在等待的消息数量。

因此，每次调用`setTimeout(fn, 0)`时，DOM的操作已经完成。确保获取的是更新后的DOM。

### setImmediate

在Node.js中，有个setImmediate的Api。

在Node.js的Api中，解释如下：

```
setImmediate(callback[, ...arg])#

  callback <Function> The function to call at the end of this turn of the Node.js Event Loop
  [, ...arg] Optional arguments to pass when the callback is called.
```

作用也和`setTimeout(fn, 0)`类似。

## 结语

很早之前就想写这篇文章，但是因为各种事情，一直拖到了现在。
今天抽空，一口气写了出来。也算是自己对之前知识的总结。

## 参考资料:
> [Vue - 异步更新队列](http://cn.vuejs.org/guide/reactivity.html#u5F02_u6B65_u66F4_u65B0_u961F_u5217)
> [HTML5新特性之Mutation Observer](http://www.cnblogs.com/jscode/p/3600060.html)
> [MDN - 事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#事件循环)
> [Node.js - setImmediate](https://npm.taobao.org/mirrors/node/latest/docs/api/timers.html#timers_setimmediate_callback_arg)

---
前端路漫漫，且行且歌