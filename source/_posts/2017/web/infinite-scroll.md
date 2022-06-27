---
title: JavaScript实现列表无限加载
tags: 前端
date: 2017-04-27 13:40:50
---

## 起因
之前自己在使用这种网站时，经常看到无限加载的效果。
今天正好看到了`getBoundingClientRect`这个Api，就想着试试看如何实现`Infinite scroll`的效果。
<!-- more -->
## 原理

在需要无限加载的列表底部，埋下一个隐藏元素。
当不断滑动时，隐藏元素将出现在视窗(viewport)里，也就意味着当前浏览的列表已经到底部了。
这时候就需要进行列表加载。
大概的HTML结构如下：

```html
<div>
  <ul class="article-list">
    <li>我是文章</li>
    <li>我是文章</li>
    <li>我是文章</li>
    <li>我是文章</li>
    <li>我是文章</li>
  </ul>
  <div class="infinite-scroll-signal"></div>
</div>
```

也就是：**滑动列表 => 隐藏的无限加载指示器出现在视图 => 开始加载**

那么重点就是检测隐藏的无限加载指示器是否出现在视图窗口。
还好，我们有`getBoundingClientRect`这个Api。

## getBoundingClientRect

通过查阅MDN，得知：
> Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。而除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。

至于兼容性，一片绿，可以放心使用。

<p class="ciu_embed" data-feature="getboundingclientrect" data-periods="future_1,current,past_1,past_2">
  <a href="http://caniuse.com/#feat=getboundingclientrect">Can I Use getboundingclientrect?</a> Data on support for the getboundingclientrect feature across the major browsers from caniuse.com.
</p>

### DOMRect 对象

getBoundingClientRect()方法的返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。

对象的属性如下图所示：
![](/images/2018-03-26-085702.jpg)

其中的 `top, left, bottom, right` 均是元素自身相对于视图左上角而言的。
就`top, left`属性而言，很好理解。而`bottom, right`则一开始搞的有点懵，后面通过devtools观察，发现`bottom`是元素的最底部相对于视图窗口左上角而言的，而`right`则是元素的最右侧相对于视图窗口左上角而言的。
其中`right-left`为元素的宽度,`bottom - top`则是元素的高度。

### 检测元素是否出现于视图窗口中

在这里，有两种情况，一个是元素是否出现于视图窗口中，另一种则是元素是否完全出现于视图窗口中。
两种情况的区别在于一个是部分出现，一个是完全出现。

下面我把两种情况都写出来：

1. 部分出现在视图窗口中

```javascript
function checkIsPartialVisible (element) {
  const rect = element.getBoundingClientRect()
  const {
    top,
    left,
    bottom,
    right
  } = rect
  const isPartialVisible = top >= 0 && left >= 0
  return isPartialVisible
}
```

2. 全部出现于视图窗口中：

```javascript
function checkIsTotalVisible (element) {
  const rect = element.getBoundingClientRect()
  const {
    top,
    left,
    bottom,
    right
  } = rect
  const isTotalVisible = (
    top >= 0
    &&
    left >= 0
    &&
    bottom < document.documentElement.clientHeight
    &&
    right < document.documentElement.clientWidth
  )
  return isTotalVisible
}
```

那么问题来了：我们到底选用那种呢？
从无限加载这个业务场景出发，埋在列表最下边的加载触发器都非常小且不可见，因此推荐选用第二种，也就是完全出现于视图窗口的方式。
至于第一种，更适合检测该元素是否已经出现在视图窗口，但并不要求全部出现的情况。

## 实战
具体可以看我在jsfiddle上写的demo：
[无限加载实例](https://jsfiddle.net/c7han1op/3/)

## 后续

后续更多的则是一些性能优化的事情，比如debounce或者throttle来减少scroll事件调用次数，加入ajax加载，loading indicator等。
那些都是属于具体的业务范围了，这儿不做讨论。
