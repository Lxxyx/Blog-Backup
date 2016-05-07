title: 理解JavaScript的数组与类数组
date: 2016-05-07 10:28:49
tags: 前端
---
## 起因
写这篇博客的起因，是我在知乎上回答一个问题时，说自己在学前端时把《JavaScript高级程序设计》看了好几遍。
于是在评论区中，出现了如下的对话：
![对话](http://7xoxxe.com1.z0.glb.clouddn.com/array3.png)

天啦噜，这话说的，宝宝感觉到的，是满满的恶意啊。还好自己的JavaScript基础还算不错，没被打脸。（吐槽一句：知乎少部分人真的是恶意度爆表，整天想着打别人的脸。都是搞技术的，和善一点不行吗…………）

不过这个话题也引起了我的注意，问了问身边很多前端同学关于数组与类数组的区别。他们都表示不太熟悉，所以决定写一篇博客，来分享我对数组与类数组的理解。

## 什么是类数组
类数组的定义，有如下两条：
  
* 具有：指向对象元素的数字索引下标以及 length 属性告诉我们对象的元素个数
* 不具有：诸如 push 、 forEach 以及 indexOf 等数组对象具有的方法Q

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
console.log(arrayLikeFunc1.length) // 2
let arrFunc2 = Array.prototype.slice.call(arrayLikeFunc2, 0)
console.log(arrFunc2, arrFunc2.length) // ([undefined × 2], 2)
```

可以看出，**函数也有length属性，其值等于函数要接收的参数。**
> 注：不适用于ES6的rest参数。具体原因和表现这儿就不再阐述了，不属于本文讨论范围。可参见 [《rest参数 - ECMAScript 6 入门》](http://es6.ruanyifeng.com/#docs/function#rest参数)。

而length属性大于0时，如果转为数组，则数组里的值会是undefined。个数等于函数length的长度。

## 类数组的原理
类数组的原理，主要有以下两点：
第一点是JavaScript的“万物皆对象”概念，


第二点则是JavaScript支持的“鸭子类型”，具体概念如下：
> 如果它走起来像鸭子，而且叫起来像鸭子，那么它就是鸭子。

首先，从第一点开始解释。

### 万物皆对象
万物皆对象具体解释如下：
> 在JavaScript中，“一切皆对象”，数组和函数本质上都是对象，就连三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”。


