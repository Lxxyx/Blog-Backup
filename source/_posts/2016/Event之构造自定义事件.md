---
title: Event之构造自定义事件
tags: 前端
date: 2016-08-23 13:11:52
---
## 起因
之所以写这篇博客，要追溯到16年寒假时，学习前端时产生的疑惑。
众所周知，在移动端点击事件是有300ms的延迟的。
而为了解决这个问题，各种方法层出不穷。
比较有名的有`zepto`的`tap`事件。
它可以向下面这样调用：

```javascript
$(element).on('tap', handler)
```

这种方式我当然还能理解，用`zepto`的`on`方法而已。
然后直到我看到了下面这种调用方式：

```javascript
const element = document.querySelector(selector)
element.addEventListener('tap', handler, capture)
```

当时虽然年少，却也知道原生事件中，是不存在`tap`的。
于是兴趣在一瞬间被调用，开始了探寻之旅。
还记得当时大概折腾了有好几天，至于探寻和折腾的结果,就和下面图片说的一样。

![2016-08-23_13:29:12.jpg](https://cdn.lxxyx.cn/2018-03-26-085414.jpg)

自定义事件这个问题，从寒假开始，一直困扰到今天。
基本每个月，我都会想起这个问题，然后尝试去解决。
然后重复得到“是在下输了”的结果。
现在想想，只是因为当时自己找的资料不对，然后一直看别人的源代码，但是源代码里加了很多兼容处理的东西。于是添加`tap`事件的核心代码就这样被淹没在里面。
<!-- more -->
## 意外之喜
今天在MDN找资料时，意外的看到了Event，本来只是想看看自己还有啥没写，或者遗漏的。
结果意外的发现了自定义事件的写法。有种本来只是瞎逛逛，却捡到了宝藏的感觉。

## 自定义事件

这儿借用MDN给的例子。来作为实例。

```javascript
var event = new Event('build')

// Listen for the event.
elem.addEventListener('build', function (e) { ... }, false)

// Dispatch the event.
elem.dispatchEvent(event)
```

这样看起来，确实简单。
一个自定义事件，只要做三件事情即可。

    构造事件 -> 监听事件 -> 触发事件

## 结语
没啥好说了。具体的方法下面的参考资料里有。
之所以写这篇文章，也只是纪念下烦恼自己半年有余的BUG罢了。

参考资料：
> [MDN - Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)
> [MDN- 创建和触发 events](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events)
---
前端路漫漫，且行且歌