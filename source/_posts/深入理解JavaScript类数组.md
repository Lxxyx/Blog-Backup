---
layout: post
title: 深入理解JavaScript类数组
date: 2016-05-07 10:28:49
tags: 前端
---
## 起因
写这篇博客的起因，是我在知乎上回答一个问题时，说自己在学前端时把《JavaScript高级程序设计》看了好几遍。
于是在评论区中，出现了如下的对话：
![对话](https://cdn.lxxyx.cn/2018-03-26-085841.png)

天啦噜，这话说的，宝宝感觉到的，是满满的恶意啊。还好自己的JavaScript基础还算不错，没被打脸。（吐槽一句：知乎少部分人真的是恶意度爆表，整天想着打别人的脸。都是搞技术的，和善一点不行吗…………）

不过这个话题也引起了我的注意，问了问身边很多前端同学关于数组与类数组的区别。他们都表示不太熟悉，所以决定写一篇博客，来分享我对数组与类数组的理解。

## 什么是类数组
类数组的定义，只有一条：
  有length属性。

这儿有三个典型的JavaScript类数组例子。

1. DOM方法:

```javascript
// 获取所有div
let arrayLike = document.querySelectorAll('div')

console.log(Object.prototype.toString.call(arrayLike))  // [object NodeList]

console.log(arrayLike.length) // 127

console.log(arrayLike[0]) 
// <div id="js-pjax-loader-bar" class="pjax-loader-bar"></div>

console.log(Array.isArray(arrayLike)) // false

arrayLike.push('push') 
// Uncaught TypeError: arrayLike.push is not a function(…)
```
是的，这个arrayLike的 `NodeList`，有length，也能用数组下标访问，但是使用Array.isArray测试时，却告诉我们它不是数组。直接使用push方法时，当然也会报错。
但是，我们可以借用类数组方法：

```javascript
let arr = Array.prototype.slice.call(arrayLike, 0)

console.log(Array.isArray(arr)) // true

arr.push('push something to arr')
console.log(arr[arr.length - 1]) // push something to arr
```
不难看出，此时的arrayLike在调用数组原型方法时，返回值已经转化成数组了。也能正常使用数组的方法。

2. 类数组对象

```javascript
let arrayLikeObj = {
  length: 2,
  0: 'This is Array Like Object',
  1: true
}

console.log(arrayLikeObj.length) // 2
console.log(arrayLikeObj[0]) // This is Array Like Object
console.log(Array.isArray(arrayLikeObj)) // false

let arrObj = Array.prototype.slice.call(arrayLikeObj, 0)
console.log(Array.isArray(arrObj)) // true
```

这个例子也很好理解。一个对象，加入了length属性，再用Array的原型方法处理一下，摇身一变成为了真的数组。

3. 类数组函数

这个应该算是最好玩，也是最迷惑人的类数组对象了。

```javascript
let arrayLikeFunc1 = function () {}
console.log(arrayLikeFunc1.length) // 0
let arrFunc1 = Array.prototype.slice.call(arrayLikeFunc1, 0)
console.log(arrFunc1, arrFunc1.length) // ([], 0)

let arrayLikeFunc2 = function (a, b) {}
console.log(arrayLikeFunc2.length) // 2
let arrFunc2 = Array.prototype.slice.call(arrayLikeFunc2, 0)
console.log(arrFunc2, arrFunc2.length) // ([undefined × 2], 2)
```

可以看出，**函数也有length属性，其值等于函数要接收的参数。**
> 注：不适用于ES6的rest参数。具体原因和表现这儿就不再阐述了，不属于本文讨论范围。可参见 [《rest参数 - ECMAScript 6 入门》](http://es6.ruanyifeng.com/#docs/function#rest参数)。另外arguments在ES6中，被rest参数代替了，所以这儿不作为例子。

而length属性大于0时，如果转为数组，则数组里的值会是undefined。个数等于函数length的长度。

## 类数组的实现原理
类数组的实现原理，主要有以下两点：
第一点是JavaScript的“万物皆对象”概念。
第二点则是JavaScript支持的“鸭子类型”。

首先，从第一点开始解释。

### 万物皆对象
万物皆对象具体解释如下：
> 在JavaScript中，“一切皆对象”，数组和函数本质上都是对象，就连三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”。

而另外一个要点则是，所有对象都继承于Object。所以都能调用对象的方法，比如使用点和方括号访问属性。
比如说，这样的：

```javascript
let func = function() {}
console.log(func instanceof Object) // true
func[0] = 'I\'m a func'
console.log(func[0]) // 'I\'m a func'
```

### 鸭子类型
万物皆对象具体解释如下：
> 如果它走起来像鸭子，而且叫起来像鸭子，那么它就是鸭子。

比如说上面举的类数组例子，虽然他们是对象/函数，但是只要有length属性，能当数组用，那么他们就是数组。
是什么，不是什么对鸭子类型来说，一点也不重要。能做什么，才是鸭子类型的核心。（谢谢nightre大大的指正）

但是，在这儿，还是有些迷糊的。为什么使用`call/apply`借用数组方法就能处理这些类数组呢？

## 探秘V8
一开始，我也对这个犯迷糊啊。直到我去Github上，看到了谷歌V8引擎处理数组的源代码。
地址在这儿：[v8/array.js](https://github.com/v8/v8/blob/master/src/js/array.js)
作为讲述，我们在这里引用push的源代码（方便讲述，删除部分。slice的比较长，但是原理一致）：

```javascript
// Appends the arguments to the end of the array and returns the new
// length of the array. See ECMA-262, section 15.4.4.7.
function ArrayPush() {
  // 获取要处理的数组
  var array = TO_OBJECT(this);
  // 获取数组长度
  var n = TO_LENGTH(array.length);
  // 获取函数参数长度
  var m = arguments.length;

  for (var i = 0; i < m; i++) {
    // 将函数参数push进数组
    array[i+n] = arguments[i];
  }

  // 修正数组长度
  var new_length = n + m;
  array.length = new_length;
  // 返回值是数组的长度
  return new_length;
}
```
是的，**整个push函数，并没有涉及是否是数组的问题。只关心了length。而因为其对象的特性，所以可以使用方括号来设置属性。**

这也是万物皆类型和鸭子类型最生动的体现。

## 总结
JavaScript中的类数组的特殊性，是由其“万物皆类型”和“鸭子类型”决定的，而浏览器引擎底层的实现，更是佐证了这一点。
而先前说我的那位同学，因为只是知道类数组的几种表现和用法，并且想通过apply来打我脸，证明我根本没有仔细看书。这种行为不仅不友善，而且学习效率也不高。
因为，**知其然而不知其所以然是不可取的**。特别是发现很多这种例子，就得学会归纳总结。（感谢winter老师的演讲：[一个前端的自我修养](http://taobaofed.org/blog/2016/03/23/the-growth-of-front-end/)，教会我很多东西。）。
很多时候，深入看看源代码也会让你对这个理解的更透彻。将来就算是蹦出一百种类数组，也能知道是怎么回事儿。

最后，还是开头那句话：“都是搞技术的，和善一点不行吗？有问题就好好交流，不要总想着打别人脸啊…………”