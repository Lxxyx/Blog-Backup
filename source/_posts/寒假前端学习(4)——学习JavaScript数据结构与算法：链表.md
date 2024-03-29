---
layout: post
title: 寒假前端学习(4)——学习JavaScript数据结构与算法（二）：链表
date: 2016-01-15 10:09:55
tags: 前端
---
> 本系列的第一篇文章: [学习JavaScript数据结构与算法（一）：栈与队列](http://t.cn/R4Ybrs0)
> 第二篇文章：[学习JavaScript数据结构与算法（二）：链表](http://t.cn/R4W3y3X)
> 第三篇文章: [学习JavaScript数据结构与算法（三）：集合](http://t.cn/R4jLf0o)
> 第四篇文章: [学习JavaScript数据结构与算法（四）：二叉搜索树](http://t.cn/R4QbVOg)

## 链表简介
链表是一种常见的数据结构，也属于线性表，但不会按线性的顺序来储存数据。而是在每一个节点中，储存了下一个节点的指针。可以看图理解。(有C语言基础的可能比较好理解)。
使用链表结构可以克服数组需要预先知道数据大小的缺点(C语言的数组需要预先定义长度)，链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。

接下来就是介绍两种常见的链表: 单向链表，双向链表在JavaScript中的实现。
<!-- more -->
## 单向链表
链表中最简单的形式就是单向链表，链表中的节点都包含两个部分，第一部分储存着自身信息，第二部分则储存有指向下一节点的指针。最后一个节点则指向`NULL`，如图所示:
![单向链表图示2](/images/2018-03-26-85760.png)
### JavaScipt中单向链表的实现
首先，创建一个构造函数。

```javascript
/**
 * 单向链表构造函数
 */
function LinkedList() {
  /**
   * 单向链表中节点的构造函数
   * @param {Any} element 要传入链表的节点
   */
  var Node = function(element) {
    this.element = element;
    //下个节点的地址
    this.next = null;
  }

  //单向链表的长度
  var length = 0;
  //单向链表的头结点，初始化为NULL
  var head = null;
}
```
不难看出，单向链表构造函数比栈与队列要复杂许多。

单向链表需要有如下的方法:

* append(element): 添加元素到链表尾部
* insert(position,element): 向单向链表中某个位置插入元素
* indexOf(element): 寻找某个元素在单向链表中的位置
* remove(element): 移除给定的元素
* removeAt(position): 移除单向链表中某个位置的元素
* getHead(): 获取单向链表的头部
* isAmpty(): 检查单向链表是否为空，为空则返回true
* toString(): 将链表所有内容以字符串输出
* size(): 返回单向链表长度

#### append方法:
说明: 向单向链表尾部添加元素。
实现: 
```javascript
/**
 * 向单向链表尾部添加元素
 * @param  {Any} element 要加入链表的节点
 */
this.append = function(element) {
  var node = new Node(element);
  var current;

  if (head == null) {
    head = node;
  } else {
    // 当前项等于链表头部元素.
    // while循环到最后一个，从而将该节点加入链表尾部。
    current = head;
    // 当next为null时，判定为false。退出循环。
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
  length++;
};
```
#### insert方法:
说明: 向单向链表中某个位置插入元素。
实现: 
```javascript
/**
 * 向单向链表中插入某个元素
 * @param  {Number} position 要插入的位置
 * @param  {Any} element  要插入的元素
 * @return {Boolean}          插入成功返回true，失败返回false
 */
this.insert = function(position, element) {
  if (position >= 0 && position <= length) {
    var node = new Node(element);
    var current = head;
    var previous;
    var index = 0;

    if (position == 0) {
      node.next = current;
      head = node;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      previous.next = node;
      node.next = current;
    }

    length++;
    return true;
  } else {
    return false;
  }
};
```
#### indexOf方法: 
说明：寻找某个元素在单向链表中的位置。
实现: 
```javascript
/**
 * 寻找某个元素在单向链表中的位置
 * @param  {Any} element 要寻找的元素
 * @return {Number}         返回值>=0则代表找到相应位置
 */
this.indexOf = function(element) {
  var current = head;
  var index = -1;

  while (current) {
    if (element === current.element) {
      return index;
    }
    index++;
    current = current.next;
  }

  return -1;
};
```
#### remove方法:
说明: 移除给定的元素。
实现: 
```javascript
/**
 * 移除给定的元素
 * @param  {Any} element 要移除的元素
 * @return {Number}         返回值>=0表示移除成功
 */
this.remove = function(element) {
  var index = this.indexOf(element);
  return this.removeAt(index);
};
```
#### removeAt方法:
说明:移除单向链表中某个位置的元素。
实现: 
```javascript
/**
 * 移除单向链表中某一个元素
 * @param  {Number} position 要移除元素的位置
 * @return {Any}          移除成功返回被移除的元素，不成功则返回NULL
 */
this.removeAt = function(position) {
  if (position > -1 && position < length) {
    var current = head;
    var previous;
    var index = 0;

    if (position == 0) {
      // 因为之前head指向第一个元素，现在把head修改为指向第二个元素。
      // 核心概念在于链表前后全靠指针链接，而非数组一般。
      // 所以只需要改变head的元素。
      head = current.next;
    } else {
      while (index++ < position) {
        // previous指要操作元素位置之前的那个元素，current表示之后的那个元素。
        previous = current;
        current = current.next;
      }

      previous.next = current.next;
    }

    length--;

    return current.element;
  } else {
    return null;
  }
};
```
#### getHead方法:
说明:获取单向链表的头部。
实现: 
```javascript
/**
 * 获取单向链表的头部
 * @return {Any} 单向链表的头部
 */
this.getHead = function() {
  return head;
}
```
#### isAmpty、toString、size方法
实现: 
```javascript
/**
 * 判断单向链表是否为空
 * @return {Boolean} 为空则返回true，不为空则返回false
 */
this.isAmpty = function() {
  return length === 0
};

/**
 * 将链表所有内容以字符串输出
 * @return {String} 要输出的字符串
 */
this.toString = function() {
  var current = head;
  var string = '';

  while (current) {
    string += current.element;
    current = current.next;
  }
  return string;
};

/**
 * 返回单向链表长度
 * @return {Number} 单向链表的长度
 */
this.size = function() {
  return length;
};
```
#### 源代码
以上的就是单向链表在JavaScript中的实现，有兴趣的同学可以自己下载源代码查看。
> [单向链表-源代码](https://github.com/Lxxyx/LearnDataStructrue/blob/master/LinkedList.js)

## 双向链表
双向链表与单向链表很是相像。在单向链表中，只有指向下一个节点的链接。但在双向链表中，<strong>还有指向上一个节点的链接，是双向的。</strong>
如图所示: ![双向链表图示](/images/2018-03-26-085800.png)
### JavaScipt中双向链表的实现
首先，依然是构造函数:
```javascript
/**
 * 双向链表的构造函数
 */
function DoublyLinkedList() {
  /**
   * 双向链表中节点的构造函数
   * @param {Any} element 要传入链表的元素
   */
  var Node = function(element) {
    this.element = element;
    this.prev = null;
    this.next = null;
  }

  //双向链表的长度
  var length = 0;
  //双向链表的头结点，初始化为NULL
  var head = null;
  //双向链表的尾结点，初始化为NULL
  var tail = null;
}
```
双向链表需要有如下的方法:

* append(element): 添加元素到双向链表尾部
* insert(position,element): 向双向链表中某个位置插入元素
* removeAt(position): 移除双向链表中某个位置的元素
* showHead(): 获取双向链表的头部
* showLength(): 获取双向链表长度
* showTail(): 获取双向链表尾部

#### append方法:
说明: 添加元素到双向链表尾部
实现: 
```javascript
/**
 * 向链表尾部添加元素
 * @param  {Any} element 要加入链表的节点
 * @return {Any}         加入链表的节点
 */
this.append = function(element) {
  var node = new Node(element);

  if (head === null) {
    head = node;
    tail = node;
  } else {
    var previous;
    var current = head;

    while (current.next) {
      current = current.next;
    }

    current.next = node;
    node.prev = current;
    tail = node;
  }

  length++;
  return node;
};
```
#### insert方法:
说明: 向双向链表中某个位置插入元素。
实现: 
```javascript
/**
 * 向链表中插入某个元素
 * @param  {Number} position 要插入的位置
 * @return {Boolean}         插入成功返回true，失败返回false
 */
this.insert = function(position, element) {
  if (position >= 0 && position <= length) {

    var node = new Node(element);
    var index = 0;
    var previous;
    var current = head;

    if (position === 0) {

      if (head === null) {
        head = node;
        tail = node;
      } else {
        current.prev = node;
        node.next = current;
        head = node;
      }
    } else if (position === length) {

      current = tail;
      current.next = node;
      node.prev = current;
      tail = node;
    } else {

      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      previous.next = node;
      node.prev = previous;
      current.prev = node;
      node.next = current;
    }

    length++;
    return true;
  } else {
    return false;
  }
};
```
#### removeAt方法:
说明:移除双向链表中某个位置的元素。
实现: 
```javascript
/**
 * 移除链表中某一个元素
 * @param  {Number} position 要移除元素的位置
 * @return {Any}             移除成功返回被移除的元素，不成功则返回false
 */
this.removeAt = function(position) {
  if (position > -1 && position < length) {
    var current = head;
    var index = 0;
    var previous;

    if (position === 0) {
      head = current.next;

      if (length === 1) {
        tail = null;
        head.prev = null;
      }
    } else if (position === length - 1) {
      current = tail;
      tail = current.prev;
      tail.next = null;
    } else {
      while (index++ < position) {
        previous = current.prev;
        current = current.next;
      }
      previous.next = current.next;
      current.next.prev = previous;
    }

    length--;
    return current.element;
  } else {
    return false;
  }
};
```
#### showHead、showLength、showTail方法
实现: 
```javascript
/**
 * 获取链表的头部
 * @return {Any} 链表的头部
 */
this.showHead = function() {
  return head;
};

/**
 * 获取链表长度
 * @return {Number} 链表长度
 */
this.showLength = function() {
  return length;
};

/**
 * 获取链表尾部
 * @return {Any} 链表尾部
 */
this.showTail = function() {
  return tail;
};
```
#### 源代码
源代码在此~
> [双向链表-源代码](https://github.com/Lxxyx/LearnDataStructrue/blob/master/DoublyLinkedList.js)

## 感想
链表这一节，基本全部都是先按需求写代码，写完后再和书上对比。发现简直被瞬间秒成渣。自己写的很多暗坑，逻辑也很混乱。看来还是太年轻了。

有兴趣的同学，也可以自己试试只看要求先写代码，写完后再与书上比对，就知道自己的不足了。
---
前端路漫漫，且行且歌~
