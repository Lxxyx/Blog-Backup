---
layout: post
title: 寒假前端学习(7)——学习JavaScript之this,call,apply
date: 2016-01-28 13:47:37
tags: 前端
---
## 学习起因：
在之前的JavaScript学习中，this,call,apply总是让我感到迷惑，但是他们的运用又非常的广泛。遂专门花了一天，来弄懂JavaScript的this,call,apply。
中途参考的书籍也很多，以《JavaScript设计模式与开发实践》为主，《JavaScript高级程序设计》、《你不知道的JavaScript》为辅。这三本书对我理解this,call,apply都起了很大的帮助。
<!-- more -->
## this
首先，我们先讲述this。

在《JavaScript设计模式与开发实践》关于this的描述中，我认为有一句话切中了this的核心要点。那就是：

> <strong>JavaScript的this总是指向一个对象</strong>

具体到实际应用中，this的指向又可以分为以下四种：

1. 作为对象的方法调用
2. 作为普通函数调用
3. 构造器调用
4. apply和call调用

接下来我们去剖析前3点，至于第4点的apply和call调用，会在call和apply部分详细讲解。

### 1.作为对象的方法调用
说明：作为对象方法调用时，this指向该对象。
举例：
```javascript
/**
 * 1.作为对象的方法调用
 *
 * 作为对象方法调用时，this指向该对象。
 */

var obj = {
  a: 1,
  getA: function() {
    console.log(this === obj);
    console.log(this.a);
  }
};

obj.getA(); // true , 1
```
### 2.作为普通函数调用
说明：作为普通函数调用时，this总是指向全局对象(浏览器中是window)。
举例：
```javascript
/**
 * 2.作为普通函数调用
 *
 * 不作为对象属性调用时,this必须指向一个对象。那就是全局对象。
 */

window.name = 'globalName';

var getName = function() {
  console.log(this.name);
};

getName(); // 'globalName'

var myObject = {
  name: "ObjectName",
  getName: function() {
    console.log(this.name)
  }
};

myObject.getName(); // 'ObjectName'

// 这里实质上是把function() {console.log(this.name)}
// 这句话赋值给了theName。thisName在全局对象中调用，自然读取的是全局对象的name值
var theName = myObject.getName;

theName(); // 'globalName'
```
### 3.构造器调用
说明：作为构造器调用时，this指向返回的这个对象。
举例：
```javascript
/**
 * 3.作为构造器调用
 * 
 * 作为构造器调用时，this指向返回的这个对象。
 */

var myClass = function() {
  this.name = "Lxxyx";
};

var obj = new myClass();

console.log(obj.name); // Lxxyx
console.log(obj) // myClass {name: "Lxxyx"}
```

但是如果构造函数中手动指定了return其它对象，那么this将不起作用。
如果return的是别的数据类型，则没有问题。
```javascript
var myClass = function() {
  this.name = "Lxxyx";
  // 加入return时，则返回的是别的对象。this不起作用。
  return {
    name:"ReturnOthers"
  }
};

var obj = new myClass();
console.log(obj.name); // ReturnOthers
```

### Call和Apply
Call和Apply的用途一样。都是用来指定函数体内this的指向。
### Call和Apply的区别
Call：第一个参数为this的指向，要传给函数的参数得一个一个的输入。
Apply：第一个参数为this的指向，第二个参数为数组，一次性把所有参数传入。

如果第一个参数为null,则this指向宿主环境，浏览器中是window。
### 1.改变this指向
说明：这是call和apply最常用的用途了。用于改变函数体内this的指向。
举例：
```javascript
var name = "GlobalName"

var func = function() {
  console.log(this.name)
};

func(); // "GlobalName"

var obj = {
  name: "Lxxyx",
  getName: function() {
    console.log(this.name)
  }
};

obj.getName.apply(window) // "GlobalName" 将this指向window
func.apply(obj) // "Lxxyx" 将this指向obj
```
### 2.借用其它对象的方法
这儿，我们先以一个立即执行匿名函数做开头：
```javascript
(function(a, b) {
  console.log(arguments) // 1,2
  // 调用Array的原型方法
  Array.prototype.push.call(arguments, 3);
  console.log(arguments) // 1,2,3
})(1,2)
```
函数具有arguments属性，而arguments是一个类数组。
但是arguments是不能直接调用数组的方法的，所以我们要用call或者apply来调用Array对象的原型方法。
原理也很容易理解，比如刚才调用的是push方法，而push方法在谷歌的v8引擎中，源代码是这样的：
```javascript
function ArrayPush() {
  var n = TO_UINT32(this.length); // 被push对象的长度
  var m = % _ArgumentsLength(); // push的参数个数
  for (var i = 0; i < m; i++) {
    this[i + n] = % _Arguments(i); // 复制元素
  }
  this.length = n + m; //修正length属性
  return this.length;
}
```
他只与this有关，所以只要是类数组对象，都可以调用相关方法去处理。

这部分内容比较复杂，再加上自己水平也不太够。所以推荐有条件的同学去购买相关书籍，或者等我的后续博客文章。

## 感想
通过对这部分的学习，算是加深了对JavaScript的理解。最直观的表现就是，去看一些优秀框架的源代码时，不再是被this,call,apply,bind绕的晕乎乎的。还是很开心的~

下一段时间，准备深入探索一下日常学习和使用的CSS。毕竟JavaScript学了，HTML和CSS也不能落下。
---
前端路漫漫，且行且歌。