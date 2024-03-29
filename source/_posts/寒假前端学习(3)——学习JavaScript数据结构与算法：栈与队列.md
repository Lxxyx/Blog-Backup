---
layout: post
title: 寒假前端学习(3)——学习JavaScript数据结构与算法（一）：栈与队列
date: 2016-01-14 11:09:55
tags: 前端
---
> 本系列的第一篇文章: [学习JavaScript数据结构与算法（一）：栈与队列](http://t.cn/R4Ybrs0)
> 第二篇文章：[学习JavaScript数据结构与算法（二）：链表](http://t.cn/R4W3y3X)
> 第三篇文章: [学习JavaScript数据结构与算法（三）：集合](http://t.cn/R4jLf0o)
> 第四篇文章: [学习JavaScript数据结构与算法（四）：二叉搜索树](http://t.cn/R4QbVOg)

## 学习起因

曾经有一次在逛V2EX时，碰到这么一个帖子。

> [数学完全还给老师了，想学回一些基础数学，大概是高中程度的，有什么书籍推荐？](https://www.v2ex.com/t/247874)

发帖的楼主大学没有高数课程，出去工作时一直在从事前端的工作。感觉到数学知识的匮乏，所以想补一补数学。

看了看帖子，感觉和我很像，因为我的专业是不开高数的，我学的也是前端。也同样感觉到了数学知识匮乏所带来的困顿。同时因为自己的数学思维实在是不怎么好，所以决定努力补习数学与计算机基础知识。

当时也有人说:"前端需要什么数据结构与算法"，但是对于这个事情我有自己的看法。

> 我并不认为前端不需要算法之类的知识，在我看来前端具备坚实的计算机基础，对自身发展是极其有利的。我想做程序员。而不是一辈子的初级前端和码农。

也算是给自己的勉励吧。毕竟基础决定上限，再加上自己对计算机真的很感兴趣，所以学起来就算很累，但也是很幸福的。于是去网上选购了《学习JavaScript数据结构与算法》这本书，配合着去图书馆借阅的《大话数据结构》，开始了数据结构与算法的初步学习。

![选用的书籍](/images/2018-03-26-085757.png)

这本书讲的内容很是不错，清晰易懂。同时用JavaScipt语言实现，学起来的难度低。值得一看呢。
<!-- more -->
## 栈

书中前两章是对JavaScipt基础与数组常用操作的讲解，如果不清楚的话,推荐去看看下面这篇博客。

> [JavaScipt之数组操作](http://www.cnblogs.com/zhangzt/archive/2011/04/01/2002213.html)

接下来就是数据结构的第一部分，栈。

栈是一种遵从后进先出原则(LIFO,全称为Last In First Out)的有序集合。栈顶永远是最新的元素。

举个例子就是:栈就像放在箱子里的一叠书 你要拿下面的书先要把上面的书拿开。(当然，你不能先拿下面的书。)

看图示也可明白。

![栈的图示](/images/2018-03-26-085759.png)

### JavaScipt中栈的实现

首先，创建一个构造函数。

``` javascript
/**
 * 栈的构造函数
 */
function Stack() {

  // 用数组来模拟栈
  var item = [];
}
```

栈需要有如下的方法:

* push(element(s)): 添加几个元素到栈顶
* pop(): 移除并返回栈顶元素
* peek(): 返回栈顶元素
* isAmpty: 检查栈是否为空，为空则返回true
* clear: 移除栈中所有元素
* size: 返回栈中元素个数。
* print: 以字符串显示栈中所有内容

#### push方法的实现

说明: 需要往栈中添加新元素，元素位置在队列的末尾。也就是说，我们可以用数组的push方法来模拟实现。

实现: 

``` javascript
/**
 * 将元素送入栈，放置于数组的最后一位
 * @param  {Any} element 接受的元素，不限制类型
 */
this.push = function(element) {
  items.push(element);
};
```

#### pop方法的实现

说明: 需要把栈顶元素弹出，同时返回被弹出的值。可以用数组的pop方法来模拟实现。

实现: 

``` javascript
/**
 * 弹出栈顶元素
 * @return {Any} 返回被弹出的值
 */
this.pop = function() {
  return items.pop();
};
```

#### peek方法的实现

说明: 查看栈顶元素，可以用数组长度来实现。

实现: 

``` javascript
/**
 * 查看栈顶元素
 * @return {Any} 返回栈顶元素
 */
this.peek = function() {
  return items[items.length - 1];
}
```

#### 其余方法的实现

说明: 前三个是栈方法的核心，其余方法则在此一次性列出。因为下文要讲的队列，会与这部分有很大重合。

实现: 

``` javascript
/**
 * 确定栈是否为空
 * @return {Boolean} 若栈为空则返回true,不为空则返回false
 */
this.isAmpty = function() {
  return items.length === 0
};

/**
 * 清空栈中所有内容
 */
this.clear = function() {
  items = [];
};

/**
 * 返回栈的长度
 * @return {Number} 栈的长度
 */
this.size = function() {
  return items.length;
};

/**
 * 以字符串显示栈中所有内容
 */
this.print = function() {
  console.log(items.toString());
};
```

### 实际应用

栈的实际应用比较多，书中有个十进制转二进制的函数。(不懂二进制怎么算的话可以百度)下面是函数的源代码。

原理就是输入要转换的数字，不断的除以二并取整。并且最后运用while循环，将栈中所有数字拼接成字符串输出。

``` javascript
/**
 * 将10进制数字转为2进制数字
 * @param  {Number} decNumber 要转换的10进制数字
 * @return {Number}           转换后的2进制数字
 */
function divideBy2(decNumber) {

  var remStack = new Stack(),
    rem,
    binaryString = '';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }

  while (!remStack.isAmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
};
```

到此而言，栈的学习就告一段落了。因为源代码中注释较多，所以这儿就不贴出源代码的内容了。有兴趣的可以自己下载查看。

> [栈-源代码](https://github.com/Lxxyx/LearnDataStructrue/blob/master/Stack.js)

## 队列

队列与栈是很相像的数据结构，不同之处在于队列是是先进先出(FIFO:First In First Out)的。

举个例子: 火车站排队买票，先到的先买。(插队的不算)，是不是很好理解了~

### JavaScipt中队列的实现

队列的实现和栈很像。首先依然是构造函数:

``` javascript
/**
 * 队列构造函数
 */
function Queue() {
  var items = [];
}
```

队列需要有如下的方法:

* enqueue(element(s)): 向队列尾部添加几个项
* dequeue(): 移除队列的第一项(也就是排在最前面的项)
* front(): 返回队列的第一个元素，也就是最新添加的那个

其余方法与队列相同

#### enqueue方法的实现

说明: 向队列尾部添加几个项。

实现: 

``` javascript
/**
 * 将元素推入队列尾部
 * @param  {Any} ele 要推入队列的元素
 */
this.enqueue = function(ele) {
  items.push(ele);
};
```

#### dequeue方法的实现

说明: 移除队列的第一项。

实现: 

``` javascript
/**
 * 将队列中第一个元素弹出
 * @return {Any} 返回被弹出的元素
 */
this.dequeue = function() {
  return items.shift()
};
```

#### front方法的实现

说明: 返回队列的第一个元素，也就是最新添加的那个。

实现:

``` javascript
/**
 * 查看队列的第一个元素
 * @return {Any} 返回队列中第一个元素
 */
this.front = function() {
  return items[0];
};
```

以上的三个方法，就是队列这种数据结构的核心方法了。其实很好理解的。

### 实际应用

书上的是个击鼓传花的小游戏。原理就是循环到相应位置时，队列弹出那个元素。最后留下的就是赢家。

源代码如下:

``` javascript
/**
 * 击鼓传花的小游戏
 * @param  {Array}  nameList 参与人员列表
 * @param  {Number} num      在循环中要被弹出的位置
 * @return {String}          返回赢家(也就是最后活下来的那个)
 */
function hotPotato(nameList, num) {
  var queue = new Queue();

  for (var i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  var eliminated = '';

  while (queue.size() > 1) {
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }

    eliminated = queue.dequeue();
    console.log(eliminated + " Get out!")
  }

  return queue.dequeue()
}
```

具体实现，有兴趣的同学可以自己下载源代码，试一试。

> [队列-源代码](https://github.com/Lxxyx/LearnDataStructrue/blob/master/Queue.js)

队列的学习到此就告一段落了。下一期将讲述另外一种数据结构: 链表。

## 感想

很多时候看书，直接看算法导论或者一些数据结构的书，都是很迷糊的。后来才发现，看书从自己能看懂的开始，由浅入深才是适合自己的学习方式。
---
前端路漫漫，且行且歌~
