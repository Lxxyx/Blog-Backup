---
title: Intersection Observer 实现哨兵元素
tags: 前端
date: 2017-09-15 20:52:32
---

## 起因

在自己之前写的博客[《JavaScript实现列表无限加载》](https://lxxyx.win/2017/04/27/2017/web/infinite-scroll/)中，有提到使用 `getBoundingClientRect` 实现一个哨兵元素，从而实现无限加载等功能。

然而 `getBoundingClientRect` 的方法，用起来其实挺别扭的，因为每次滚动都要调用与检测，且必须自己书写检测函数，并不是很方便。
所幸的是，浏览器给我们添加了新的 Api，`Intersection Observer`。

## Intersection Observer

参照 MDN 上的解释，这个 API 的作用是：

> Intersection observer API提供了一种方法，可以异步观察目标元素的交集变化与祖先元素或顶层文件。

### 使用场景

- 当页面滚动时，懒加载图片或其他内容。
- 实现“可无限滚动”网站，也就是当用户滚动网页时直接加载更多内容，无需翻页。
- 为计算广告收益，检测其广告元素的曝光情况。
- 根据用户是否已滚动到相应区域来灵活开始执行任务或动画。

简单来说，就是实现一个哨兵功能，当它出现在视图窗口，或者指定区域时，触发相应的回调。

### Why？

关于为什么使用，MDN 也给出了详实的解释：

> 过去，交集检测通常需要涉及到事件监听，以及对每个目标元素执行Element.getBoundingClientRect() 方法以获取所需信息。可是这些代码都在主线程上运行，所以任何一点都可能造成性能问题。当网页遍布这些代码时就显得比较丑陋了。

## 兼容性

兼容性如下：

<p class="ciu_embed" data-feature="intersectionobserver" data-periods="future_1,current,past_1,past_2">
  <a href="http://caniuse.com/#feat=intersectionobserver">Can I Use intersectionobserver?</a> Data on support for the intersectionobserver feature across the major browsers from caniuse.com.
</p>

只能说不容乐观

## 后续

这篇文章这儿不会讲具体的用法什么的，MDN 已经讲解的很详细了，搬运二手知识是没有意义的。
MDN 的教程，可以在文章最后的参考资料看到。

## 总结

这是个很强大的 API，很好用。
但是兼容性不容乐观也是它的缺点。

## 参考资料

- [Intersection Observer API - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)