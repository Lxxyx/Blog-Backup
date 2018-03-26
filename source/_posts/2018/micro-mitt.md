---
title: 微型库解读之200byte的EventEmitter - Mitt
tags: 前端
date: 2018-01-26 00:55:08
---

## 起源

关于 `EventEmitter` 我想应该很多同学都很熟悉了。简而言之是一个事件的发布与订阅器。
这两天读到了一些非常有意思的小库，虽然小但是功能完备，比如说这次我们要讲解的 Mitt.

[Github地址](https://github.com/developit/mitt)
<!-- more -->
## 小

`Mitt`是一个微型的 `EventEmitter` 库，实现了基本的 `on`, `off`, `emit`  三个Api，对于使用 EventEmitter 其他功能不多的同学来说，200byte 的体积可以说是非常划算了。

当然小也有其付出的代价，那就是只支持这三个功能。
至于怎么取舍，见仁见智吧，我建议是先使用 `mitt`，就算后期要更换别的库，因为 Api 统一，所以更换起来基本不费事。

`Mitt` 在 Github的 demo 中，也显示出了代码虽小，五脏俱全的特点。

Demo:

```js
import mitt from 'mitt'

let emitter = mitt()

// listen to an event
emitter.on('foo', e => console.log('foo', e) )

// listen to all events
emitter.on('*', (type, e) => console.log(type, e) )

// fire an event
emitter.emit('foo', { a: 'b' })

// working with handler references:
function onFoo() {}
emitter.on('foo', onFoo)   // listen
emitter.off('foo', onFoo)  // unlisten
```

## 代码解读

在研究 `Mitt` 能完成的功能后，也在想为什么能做到这么小。
在这儿对一些闪光点做一些解读。

### 节约内存且避免冲突的 EventMap

```js
export default function mitt(all: EventHandlerMap) {
	all = all || Object.create(null);
	return {
	  // ...Api
	}
}
```

在初始化 mitt 时，会有一个可选的参数 `all`，用于存放要监听的事件。
如果初始化不传参时，会使用 `Object.create(null)` 来实现。
这样的好处在于，生成的对象是一个原型为空的对象。

优点如下：

- 节约内存
- 避免冲突

节约内存是因为没有了原型，可以节省部分开销。
避免冲突则是因为在普通对象中，当要触发的事件与对象原型上的属性或方法重名时，会出现事件不存在却被错误触发导致不必要的问题。

```js
var obj = {};
console.log('toString' in obj);

var noPrototypeObj = Object.create(null);
console.log('toString' in noPrototypeObj);
```

输出结果如下：

![](https://cdn.lxxyx.cn/2018-03-26-085721.png)

### 简洁的队列初始化

经常我们会做这样一个操作，当对象中某个属性不存在时，就初始化，存在则直接返回值。用代码表示就是：

```js
var obj = {};

var getQueue = (key) => {
  if (!obj[key]) {
    obj[key] = []
  }

  return obj[key]
}
```

这是一个很常见的操作，但是在 `mitt` 的却简洁了很多。

```js
export default function mitt(all: EventHandlerMap) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on(type: string, handler: EventHandler) {
			(all[type] || (all[type] = [])).push(handler);
		}
	};
}
```

在 `on` 函数之中，有这么一句：`(all[type] || (all[type] = []))`
这个表达式的意思很简单，有值取值，无值初始化。

但是总的代码量比起之前的代码小了很多，实现了简化代码的目的。

PS：这个操作我之前在读 React setState 源代码时，也碰到过。
![](https://cdn.lxxyx.cn/2018-03-26-085724.png)


其中 queue 的获取便是使用了这种方式。

### 无符号右移（>>>）

在 `off` 的Api中，有使用到无符号右移（>>>）的操作，具体操作如下：

```js
/**
 * Remove an event handler for the given type.
 *
 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
 * @param  {Function} handler Handler function to remove
 * @memberOf mitt
 */
off(type: string, handler: EventHandler) {
	if (all[type]) {
		all[type].splice(all[type].indexOf(handler) >>> 0, 1);
	}
}
```

其中 `all[type].splice(all[type].indexOf(handler) >>> 0, 1);` 这一句的作用可谓亮眼。
移除某个指定的事件监听是很正常的事，但可能会有一个问题，就是传入的要移除的监听器并不存在。
换做以往的代码，可能你会先搜索，再决定是否执行移除操作，但是这样一来代码量就又增加了。

而无符号右移（>>>），恰恰符合我们的需要。

![](https://cdn.lxxyx.cn/2018-03-26-085726.png)

具体的作用如 demo，在搜索的事件监听函数不存在时，会返回一个极大的正数，传入 splice 后，并不会删除已有的函数监听器，从而实现了想要的功能。

### 监听所有事件的监听器

在日常开发中，经常可能想监听所有的事件，来辅助开发。
而 `mitt` 就实现了这个功能。

Demo:

```js
import mitt from 'mitt'
let emitter = mitt()
// listen to all events
emitter.on('*', (type, e) => console.log(type, e) )
```

而在源代码里，这个的实现很简洁：

```js
/**
 * Invoke all handlers for the given type.
 * If present, `"*"` handlers are invoked after type-matched handlers.
 *
 * @param {String} type  The event type to invoke
 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
 * @memberOf mitt
 */
emit(type: string, evt: any) {
	(all[type] || []).slice().map((handler) => { handler(evt); });
	(all['*'] || []).slice().map((handler) => { handler(type, evt); });
}
```

就是在使用 `emit` 函数时，找出事件类型为 `*` 的监听器，并触发它。

## 小而美

`Mitt`的整个库非常的小，但是却功能齐全，为了缩减代码，也是有一些小技巧在里面。
但是 `Mitt`的库小也有缺点，比如参数的类型如果传错了，它并不会预先提示你，这也算是一个要取舍的点吧。

这几天也在疯狂的看 [developit](https://github.com/developit) 写的一些库，他的库都有小而美的特点，无论是著名的 `Preact` 还是简单的 `mitt` 这种库。他写的代码，还是挺值得一读的。

## 计划

之后的计划，可能也准备写几篇这种微型库的源码阅读文章，这种库读起来轻松，适合每天读一两个，而能学到的东西和思路也不少。