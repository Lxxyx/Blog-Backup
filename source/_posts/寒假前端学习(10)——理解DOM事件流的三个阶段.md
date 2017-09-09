---
layout: post
title: 寒假前端学习(10)——理解DOM事件流的三个阶段
date: 2016-02-17 10:25:20
tags: 前端
---
本文主要解决两个问题：

1. 什么是事件流
2. DOM事件流的三个阶段

## 起因
在学习前端的大半年来，对DOM事件了解甚少。一般也只是用用`onclick`来绑定个点击事件。在寒假深入学习JavaScript时，愈发觉得自己对DOM事件了解不够，遂打开我的《JavaScript高级程序设计》，翻到DOM事件那一章，开始第二次学习之旅。
当然，DOM事件所囊括的知识较为庞杂，所以本文专注与自己学习时所碰到的难点，DOM事件流。
## 流
流的概念，在现今的JavaScript中随处可见。比如说React中的单向数据流，Node中的流，又或是今天本文所讲的DOM事件流。都是流的一种生动体现。
至于流的具体概念，我们采用下文的解释：
> 用术语说流是对输入输出设备的抽象。以程序的角度说，流是具有方向的数据。
> [通通连起来——无处不在的流 淘宝FED--愈之](http://taobaofed.org/blog/2016/01/28/nodejs-stream/)

## 事件流之事件冒泡与事件捕获
在浏览器发展的过程中，开发团队遇到了一个问题。那就是页面中的哪一部分拥有特定的事件？
可以想象画在一张纸上的一组同心圆，如果你把手指放在圆心上，那么你的手指指向的其实不是一个圆，而是纸上所有的圆。放到实际页面中就是，你点击一个按钮，事实上你还同时点击了按钮所有的父元素。
开发团队的问题就在于，当点击按钮时，是按钮最外层的父元素先收到事件并执行，还是具体元素先收到事件并执行？所以这儿引入了事件流的概念。
> 事件流所描述的就是从页面中接受事件的顺序。

因为有两种观点，所以事件流也有两种，分别是事件冒泡和事件捕获。现行的主流是事件冒泡。
### 事件冒泡
事件冒泡即事件开始时，由最具体的元素接收（也就是事件发生所在的节点），然后逐级传播到较为不具体的节点。
举个栗子，就很容易明白了。
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Bubbling</title>
</head>
<body>
  <button id="clickMe">Click Me</button>
</body>
</html>
```
然后，我们给`button`和它的父元素，加入点击事件。
```javascript
var button = document.getElementById('clickMe');

button.onclick = function() {
  console.log('1. You click Button');
};
document.body.onclick = function() {
  console.log('2. You click body');
};
document.onclick = function() {
  console.log('3. You click document');
};
window.onclick = function() {
  console.log('4. You click window');
};
```
效果如图所示：
![事件冒泡示例图](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050035.png)

在代码所示的页面中，如果点击了button，那么这个点击事件会按如下的顺序传播（Chrome浏览器）：

1. button
2. body
3. document
4. window

也就是说，click事件首先在`<button>`元素上发生，然后逐级向上传播。这就是事件冒泡。
### 事件捕获
事件捕获的概念，与事件冒泡正好相反。它认为当某个事件发生时，父元素应该更早接收到事件，具体元素则最后接收到事件。比如说刚才的demo，如果是事件捕获的话，事件发生顺序会是这样的：

1. window
2. document
3. body
4. button

![事件捕获示例图](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050041.png)
当然，由于时代更迭，事件冒泡方式更胜一筹。所以放心的使用事件冒泡，有特殊需要再使用事件捕获即可。
## DOM事件流
DOM事件流包括三个阶段。

1. 事件捕获阶段
2. 处于目标阶段
3. 事件冒泡阶段

如图所示（图片源于网络，若侵权请告知）：
![DOM事件流示例图](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050043.png)

### 1. 事件捕获阶段
也就是说，当事件发生时，首先发生的是事件捕获，为父元素截获事件提供了机会。
例如，我把上面的Demo中，window点击事件更改为使用事件捕获模式。(addEventListener最后一个参数，<em>为true则代表使用事件捕获模式</em>，false则表示使用事件冒泡模式。不理解的可以去学习一下addEventListener函数的使用)

```javascript
window.addEventListener('click', function() {
  console.log('4. You click window');
}, true);
```

此时，点击button的效果是这样的。
![DOM事件流中事件捕获示例图](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050044.png)

可以看到，点击事件先被父元素截获了，且该函数只在事件捕获阶段起作用。

### 处于目标与事件冒泡阶段
事件到了具体元素时，在具体元素上发生，并且被看成冒泡阶段的一部分。
随后，冒泡阶段发生，事件开始冒泡。
### 阻止事件冒泡
事件冒泡过程，是可以被阻止的。防止事件冒泡而带来不必要的错误和困扰。
这个方法就是:`stopPropagation()`
> stopPropagation() 方法
终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。

我们对`button`的click事件做一些改造。
```javascript
button.addEventListener('click', function(event) {
  // event为事件对象
  console.log('1. You click Button');
  event.stopPropagation();
  console.log('Stop Propagation!');
}, false);
```
点击后，效果如下图：
![阻止冒泡示例图](//7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050046.png)

不难看出，事件在到达具体元素后，停止了冒泡。但不影响父元素的事件捕获。

## 总结与感想
事件流：描述的就是从页面中接受事件的顺序。分有事件冒泡与事件捕获两种。
DOM事件流的三个阶段：

1. 事件捕获阶段
2. 处于目标阶段
3. 事件冒泡阶段

在学习DOM事件的过程中，了解了DOM事件的三个阶段，也知道事件冒泡是干啥用的，又如何阻止。配合前期所学的二叉树的相关知识，受益匪浅。
---
前端路漫漫，且行且歌~
