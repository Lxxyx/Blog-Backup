---
title: 解读 DOMContentLoaded 与 load 事件
tags: 前端
date: 2017-08-31 09:07:22
---

## 起因

自己在最近的学习过程中，发现一些之前记住的知识点因为太久没有用到，而产生了模糊感。
所以在回学校的空隙时间，准备好好的理一下这些基础知识。
而自己又对性能优化比较感兴趣，所以这次从性能优化的角度出发。
<!-- more -->
## 两种加载事件

一般在加载的时候，会触发两种事件，一种是 DOMContentLoaded，一种是 Load 事件。
两种看起来差不多，其实内部还是有很大的区别的。

查看 MDN 的解释是：

> 当初始HTML文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架完成加载。另一个不同的事件 load 应该仅用于检测一个完全加载的页面。 

然而解释终究只是解释，中间其实还有很多谜题。

## 问题

接下来，就要抛出问题，然后一个个的去解决。

1. 浏览器解析时的加载顺序是怎么样的？
2. 什么时候触发 DOMContentLoaded，什么时候触发 Load
3. 浏览器的脚本是否会影响 DOMContentLoaded，defer 和 async 属性的脚本呢？

## 解析时的加载与执行顺序

### 加载顺序

关于加载顺序，比较容易理解：

首先浏览器会解析 HTML，获取需要加载的外部脚本与样式表文件，并行下载。
同时，加载资源的顺序是有优先级的，比如 CSS/JS 文件就是高优先级，图片则是低优先级。
保证在连接数有限的情况下，能尽可能快的加载必要资源。

**但，并不是下载完成就会直接执行的。执行顺序不等于加载完成的数据。**

说到加载顺序，这儿还踩了一个坑。
就是在做实验的时候，加载了两个JS，但是第二个 JS 的文件的加载时间后面。

![](https://cdn.lxxyx.cn/2018-03-26-085704.jpg)

一开始也是有点百思不得其解，后面看了看 Network 面板，资源的加载时间。

![](https://cdn.lxxyx.cn/2018-03-26-085705.jpg)

发现这个资源大部分时间花在了 Queueing 上，于是翻 Chrome dev tools 的文档，得到如下解释：

![](https://cdn.lxxyx.cn/2018-03-26-085706.jpg)

然后发现自己碰见了经典的浏览器连接数限制问题。

具体的问题与解释可以看：[浏览器允许的并发请求资源数是什么意思？](https://www.zhihu.com/question/20474326)

### 执行顺序

经过反复的实验与调试，还有资料的查找。这儿确定了浏览器资源的执行顺序，也明白了为什么人们常说性能优化时，CSS 文件要放在头部，JS 文件要放在 Body 底部，什么是阻塞渲染。

关于 CSS 与 JS 执行顺序，浏览器会严格按资源出现的顺序而执行。即使后续有资源提前完成了下载，也得等待之前的资源下载并执行完成才能执行。

关于 JS 是有些不同的， JS的执行，分为 CSS 之前的 JS 与 CSS 之后的 JS。
在CSS之前的JS立刻得到了执行，而在CSS之后的JS，需要等待CSS加载完后才执行。

### 阻塞渲染

这个其实也是一个老生常谈的问题，只是说之前的自己只是听过，谈过做过，但没有真正的去检测过实际效果。想想也是有些惭愧的。

#### CSS的阻塞渲染

> 默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。

也就是说，在CSS没有加载和解析完成之前，浏览器是不会渲染任何内容的。

#### JS 的阻塞渲染

JS 有可能会修改 DOM。比如说 `document.write` ，所以在浏览器遇到 JS 文件时，会停止后面的解析，等待 JS 完成后，再去解析后面的文档。这样也就造成了阻塞渲染的效果。

加入在头部放一个超级大，运算超级复杂的 JS 文件，由于阻塞渲染，所以页面将会有非常长的白屏时间，带来的体验也非常的差。

### 结论

浏览器会并发加载 CSS/JS，但执行顺序还是按原来的依赖顺序来，比如 JS 的执行需要等待位于其前面的 CSS/JS 加载并执行完。

## DOMContentLoaded 与 Load 事件

### DOMContentLoaded

关于 DOMContentLoaded 事件
这儿可以用这个来做总结：

DOMContentLoaded 事件的触发时机是，当浏览器加载完页面，解析完所有标签，执行完 script 标签中的 JS 脚本，就会触发。
需要注意的点就在于，JS 的执行，需要等待它前面的CSS加载与执行，因为 JS 可能会依赖位于它前面的 CSS 计算出来的样式。

### Load事件
而 Load 事件，MDN 上给的解释是：

>  load 应该仅用于检测一个完全加载的页面
>  当一个资源及其依赖资源已完成加载时，将触发load事件

浏览器这儿，则是：
> 当onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

## 脚本对 DOMContentLoaded 的影响

问题：是否会造成影响？
答案：会，原因上面已经说过了。只有执行完成JS后，DOMContentLoaded 事件才会被触发。

### defer 与 async

JS 脚本加载时，可以选择 defer 与 async 属性。
这儿选择

>
```html
1. <script src="script.js"></script>
```

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

```html
2. <script async src="script.js"></script>
```

有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

```html
3. <script defer src="myscript.js"></script>
```
有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。

同时关于具体的表现，这儿有张图：

![](https://cdn.lxxyx.cn/2018-03-26-085708.jpg)

## 参考资料：

- [CSS、JS 放置位置与前端性能的关系？](https://www.zhihu.com/question/23250329)
- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
- [阻塞渲染的 CSS](https://developers.google.cn/web/fundamentals/performance/critical-rendering-path/render-blocking-css?hl=zh-cn)
- [the-end](https://www.w3.org/TR/html5/syntax.html#the-end)
- [defer和async的区别](https://segmentfault.com/q/1010000000640869)
- [DOMContentLoaded - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
- [JS、CSS以及img对DOMContentLoaded事件的影响 | AlloyTeam](http://www.alloyteam.com/2014/03/effect-js-css-and-img-event-of-domcontentloaded/)