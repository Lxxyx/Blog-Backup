---
layout: post
title: 寒假前端学习(5)——学习JavaScript数据结构与算法（三）：集合
date: 2016-01-16 09:47:33
tags: 前端
---
> 本系列的第一篇文章: [学习JavaScript数据结构与算法（一）：栈与队列](http://t.cn/R4Ybrs0)
> 第二篇文章：[学习JavaScript数据结构与算法（二）：链表](http://t.cn/R4W3y3X)
> 第三篇文章: [学习JavaScript数据结构与算法（三）：集合](http://t.cn/R4jLf0o)
> 第四篇文章: [学习JavaScript数据结构与算法（四）：二叉搜索树](http://t.cn/R4QbVOg)

## 集合(Set)
说起集合，就想起刚进高中时，数学第一课讲的就是集合。因此在学习集合这种数据结构时，倍感亲切。
集合的基本性质有一条: 集合中元素是不重复的。因为这种性质，所以我们选用了对象来作为集合的容器，而非数组。
虽然数组也能做到所有不重复，但终究过于繁琐，不如集合。
<!-- more -->
### 集合的操作
集合的基本操作有交集、并集、差集等。这儿我们介绍JavaScipt集合中交集、并集、差集的实现。至于这三个的具体概念，可以看图:
![交集、并集、差集](/images/2018-03-26-085802.png)
### JavaScipt中集合的实现
首先，创建一个构造函数。
```javascript
/**
 * 集合的构造函数
 */
function Set方法 {
  /**
   * 集合元素的容器，以对象来表示
   * @type {Object}
   */
  var items = {};
}
```
集合需要有如下方法:

* has(value): 检测集合内是否有某个元素
* add(value): 给集合内添加某个元素
* remove(value): 移除集合中某个元素
* clear(value): 清空集合
* size(): 返回集合长度
* values(): 返回集合转换的数组
* union(otherSet): 返回两个集合的并集
* intersection(otherSet): 返回两个集合的交集
* difference(otherSet): 返回两个集合的差集
* subset(otherSet): 判断该集合是否为传入集合的子集

#### has方法:
说明:集合中元素是不重复的。所以在其它任何操作前，必须用has方法确认集合是否有某个元素。这儿使用了hasOwnProperty方法来检测。
实现:
```javascript
/**
 * 检测集合内是否有某个元素
 * @param  {Any}  value    要检测的元素
 * @return {Boolean}       如果有，返回true
 */
this.has = function(value) {
  // hasOwnProperty的问题在于
  // 它是一个方法，所以可能会被覆写
  return items.hasOwnProperty(value)
};
```
#### add方法:
说明: 给集合内添加某个元素。
实现: 
```javascript
/**
 * 给集合内添加某个元素
 * @param {Any} value 要被添加的元素
 * @return {Boolean}       添加成功返回True。
 */
this.add = function(value) {
  //先检测元素是否存在。
  if (!this.has(value)) {
    items[value] = value;
    return true;
  }
  //如果元素已存在则返回false
  return false;
};
```
#### remove方法:
说明: 移除集合中某个元素
实现:
```javascript
/**
 * 移除集合中某个元素
 * @param  {Any} value 要移除的元素
 * @return {Boolean}       移除成功返回True。
 */
this.remove = function(value) {
  //先检测元素是否存在。
  if (this.has(value)) {
    delete items[value];
    return true;
  }
  //如果元素不存在，则删除失败返回false
  return false;
};
```
####clear方法:
说明: 清空集合
实现: 
```javascript
/**
 * 清空集合
 */
this.clear = function() {
  this.items = {};
};
```
#### size方法
说明: 返回集合长度，这儿有两种方法。第一种方法使用了Object.keys这个Api，但只支持IE9及以上。第二种则适用于所有浏览器。
实现:
```javascript
/**
 * 返回集合长度，只可用于IE9及以上
 * @return {Number} 集合长度
 */
this.size = function() {
  // Object.keys方法能将对象转化为数组
  // 只可用于IE9及以上，但很方便
  return Object.keys(items).length;
}

/**
 * 返回集合长度，可用于所有浏览器
 * @return {Number} 集合长度
 */
this.sizeLegacy = function() {
  var count = 0;
  for (var prop in items) {
    if (items.hasOwnProperty(prop)) {
      ++count;
    }
  }
  return count;
}
```
#### values方法
说明: 返回集合转换的数组，这儿也有两种方法。理由同上。使用了Object.keys，只能支持IE9及以上。
实现:
```javascript
/**
 * 返回集合转换的数组，只可用于IE9及以上
 * @return {Array} 转换后的数组
 */
this.values = function() {
  return Object.keys(items);
};

/**
 * 返回集合转换的数组，可用于所有浏览器
 * @return {Array} 转换后的数组
 */
this.valuesLegacy = function() {
  var keys = [];
  for (var key in items) {
    keys.push(key)
  };
  return keys;
};
```
#### union方法
说明: 返回两个集合的并集
实现:
```javascript
/**
 * 返回两个集合的并集
 * @param  {Set} otherSet 要进行并集操作的集合
 * @return {Set}          两个集合的并集
 */
this.union = function(otherSet) {
  //初始化一个新集合，用于表示并集。
  var unionSet = new Set();
  //将当前集合转换为数组，并依次添加进unionSet
  var values = this.values();
  for (var i = 0; i < values.length; i++) {
    unionSet.add(values[i]);
  }

  //将其它集合转换为数组，依次添加进unionSet。
  //循环中的add方法保证了不会有重复元素的出现
  values = otherSet.values();
  for (var i = 0; i < values.length; i++) {
    unionSet.add(values[i]);
  }

  return unionSet;
};

```
#### intersection方法
说明: 返回两个集合的交集
实现:
```javascript
/**
 * 返回两个集合的交集
 * @param  {Set} otherSet 要进行交集操作的集合
 * @return {Set}          两个集合的交集
 */
this.intersection = function(otherSet) {
  //初始化一个新集合，用于表示交集。
  var interSectionSet = new Set();
  //将当前集合转换为数组
  var values = this.values();
  //遍历数组，如果另外一个集合也有该元素，则interSectionSet加入该元素。
  for (var i = 0; i < values.length; i++) {

    if (otherSet.has(values[i])) {
      interSectionSet.add(values[i])
    }
  }

  return interSectionSet;
};
```
#### difference方法
说明: 返回两个集合的差集
实现:
```javascript
/**
 * 返回两个集合的差集
 * @param  {Set} otherSet 要进行差集操作的集合
 * @return {Set}          两个集合的差集
 */
this.difference = function(otherSet) {
  //初始化一个新集合，用于表示差集。
  var differenceSet = new Set();
  //将当前集合转换为数组
  var values = this.values();
  //遍历数组，如果另外一个集合没有该元素，则differenceSet加入该元素。
  for (var i = 0; i < values.length; i++) {

    if (!otherSet.has(values[i])) {
      differenceSet.add(values[i])
    }
  }

  return differenceSet;
};
```
#### subset方法
说明: 判断该集合是否为传入集合的子集。这段代码在我自己写完后与书上一比对，觉得自己超级low。我写的要遍历数组三次，书上的只需要一次，算法复杂度远远低于我的。
实现:
```javascript
/**
 * 判断该集合是否为传入集合的子集
 * @param  {Set} otherSet 传入的集合
 * @return {Boolean}      是则返回True
 */
this.subset = function(otherSet) {
  // 第一个判定,如果该集合长度大于otherSet的长度
  // 则直接返回false
  if (this.size() > otherSet.size()) {
    return false;
  } else {
    // 将当前集合转换为数组
    var values = this.values();

    for (var i = 0; i < values.length; i++) {

      if (!otherSet.has(values[i])) {
        // 第二个判定。只要有一个元素不在otherSet中
        // 那么则可以直接判定不是子集，返回false
        return false;
      }
    }

    return true;
  }
};
```

#### 源代码
源代码在此~
> [集合-源代码](https://github.com/Lxxyx/LearnDataStructrue/blob/master/Set.js)

## ES6中的集合
ES6也提供了集合，但之前看ES6的集合操作一直迷迷糊糊的。实现一遍后再去看，感觉概念清晰了很多。
具体的我掌握的不是很好，还在学习中，就不写出来啦~推荐看阮一峰老师的《ECMAScript 6入门》中对ES6 Set的介绍。

> [《ECMAScript 6入门》-- Set和Map数据结构](http://es6.ruanyifeng.com/#docs/set-map#WeakSet)

## 感想
到了这儿，已经掌握了一些基本的数据结构。剩下的都是难啃的骨头了(对我而言)。

字典的散列表、图、树、排序算法。算是四大金刚，所以近期关于数据结构与算法系列的文章，可能会更新的很慢。对我来说，也算是一个坎。希望这个寒假，能跨过这个坎。
---
前端路漫漫，且行且歌~
