---
title: 浅析Node与Element
tags: 前端
date: 2017-06-25 12:19:18
---

## 起因
起因有二：
1. 在看winter老师的分享：[《一个前端的自我修养》](http://taobaofed.org/blog/2016/03/23/the-growth-of-front-end/)时，有注意到这么一幅图，里面有写`childNode`和`children`属性。
![node和element](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045945.png)

2. 昨天有学弟问起我，能否自己定义一个所有元素节点通用的方法，就像数组可以用 Array.prototype.xxx 来添加一个所有数组的方法。
于是发现自己对于Node和Element的概念其实还不太清晰，所以上MDN看了看，写篇博客沉淀一下。

## Node
Node类继承于EventTarget，下面是MDN给的解释。
![](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045947.jpg)

Node在这儿指DOM节点，其中包括了我们最常见的元素节点，比如 div/p/span 之类的。除此之外还包括了 Document/Comment 之类的节点。
一个节点的类型，可以通过其`nodeType`类型查看到，具体的类型则可以看下图：
![](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045958.jpg)

### 高频的属性与方法
Node定义了一些经典的节点操作方法，我这儿画了个简单的图，**并没有列出全部属性**。
![](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050009.jpg)
写前端的同学，日常应该都会频繁的用到这些方法。

### 坑
当然，也有可能会遇到踩坑的现象。比如说在使用`nextSibling`完成遍历操作的时候，`nextSibling`有可能会返回的是文本节点而非元素节点，那么在调用一些元素节点的属性或方法时（如 `innerHTML`），就会出错。这也是为什么一定要区分清楚两种节点的原因。

## Element
至于说Element, 大家肯定就熟悉多了。学前端入门的时候，就用过的 `document.getElementBy*` 的 Api，取出来的就是Element。
Element在MDN的解释如下：
![](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050011.jpg)

这个其实大家日常的使用也非常多，就不多做解释了。

## Node与Element的关系
至于Node与Element的关系，从继承方面讲可能为清晰很多。

**Element 继承于 Node，具有Node的方法，同时又拓展了很多自己的特有方法。**
所以在Element的一些方法里，是明确区分了Node和Element的，比如说：`childNodes`, `children`, `parentNode`, `parentElement`等方法。

而Node的一些方法，返回值为Node，比如说文本节点，注释节点之类的，而Element的一些方法，返回值则一定是Element。
区分清楚这点了，也能避免很多低级问题。

## 如何给所有DOM元素添加方法

由于JavaScript原型的特点，我们只要给原型添加方法，就可以在所有继承的子元素中调用此方法。

当然，在这儿你选择**污染**Element的原型也好，Node的原型也罢，都是可行的。
具体看你要调用这个方法的元素，是纯元素节点还是会有别的一些节点。
按需取用就行。

DEMO:
```javascript
HTMLElement.prototype.sayHi = () => alert('hi')

const p = document.querySelector('p')
p.sayHi()
```

## 总结：

1. Node是节点，其中包含不同类型的节点，Element只是Node节点的一种。
2. Element继承与Node，可以调用Node的方法。
3. 给所有DOM元素添加方法，只需要污染Node或者Element的原型链就行。

参考资料：

- [MDN-Node](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)
- [MDN-Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)