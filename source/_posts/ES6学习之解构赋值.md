---
layout: post
title: ES6学习之解构赋值
date: 2016-04-16 20:53:29
tags: 前端
---
> 本文选自我在SegmentFault的#21天阅读分享#中，所记录的两篇笔记。
因为对自己帮助较大，所以分享在此。

## 起因
前两天在项目中，需要应用到vuex（类似redux的状态管理工具）。而vuex中，关于变量的赋值是ES6中的解构赋值。
恰巧今天在看犀牛书时，也看到了关于解构赋值的介绍，所以今天准备专门学习解构赋值。
## 解构赋值
之前我们声明变量，是这样的：
```javascript
var one = 1;
var two = 2;
```
这种变量声明的方式，写的少了还好说。写多了，却会感觉繁琐。也容易出错。
而ES6中，关于解构赋值的写法，是这样的：
```javascript
var [one, two] = [1, 2]
console.log(one)
// 1
console.log(two)
// 2
```
这样的话，一次性就命名了两个变量。
但只是这样的话，功能其实是不够用的。
结构赋值还支持如下的形式：
```javascript
var [one,,three,] = [1,2,3,4]
console.log(three)
// 3
```
这种方式，可以留空位，从而是变量赋值达到精准的要求。
在阮一峰老师的ES6文档中，关于解构赋值有这么一句：
> 解构赋值可以方便地将一组参数与变量名对应起来。

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1})
```

现在看来，只是把传入的dispatch参数，给解构赋值了。

## 对象的解构赋值
先写一个demo。
```javascript
var { foo, bar } = {
  foo: "Hi i'm foo",
  bar: "Hi i'm bar"
}
console.log(foo)
// "Hi i'm foo"
console.log(bar)
// "Hi i'm bar"
```
对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
在这儿，我设置了foo和bar，自然就取到了相应的变量。
但是如果要名字不一样呢？
```javascript
var { foo: Anotherfoo, bar: Anotherbar } = {
  foo: "Hi i'm foo",
  bar: "Hi i'm bar"
}
console.log(Anotherfoo)
"Hi i'm foo"
console.log(Anotherbar)
"Hi i'm bar"
```
这儿相当于把获取到的foo值，赋值给Anotherfoo。从而达到变量名不同也能变量赋值的效果。
这部分的机制，就借用阮一峰老师的话语：
> 这实际上说明，对象的解构赋值是下面形式的简写

```javascript
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```
也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```javascript
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```
上面代码中，真正被赋值的是变量baz，而不是模式foo 

同时之前在使用vuex中，对这一句话很不理解：
```javascript
const vm = new Vue({
  vuex: {
    getters: { ... },
    actions: {
      plus: ({ dispatch }) => dispatch('INCREMENT')
    }
  }
})
```
> 2016.04.16更新

在看到Vuex源代码时，发现有这么一部分:
```
  constructor ({
    state = {},
    mutations = {},
    modules = {},
    middlewares = [],
    strict = false
  } = {})
```
感兴趣的，是函数中，指定了变量的默认参数并进行了变量解构赋值，但给整个参数又指定了默认值。
于是手写了一个demo：
```javascript
function getInfo({
  a = '我是默认参数A',
  b = '我是默认参数B'
} = {}) {
  console.log(a, b)
}

getInfo({ a: 'A被覆盖了', b: 'B被覆盖了' })
// A被覆盖了 B被覆盖了
getInfo({})
// 我是默认参数A 我是默认参数B
getInfo()
// 我是默认参数A 我是默认参数B
```
也就是说，这种写法，当函数未传入覆盖默认值的参数，则默认参数将被解构赋值。从而保证默认参数100%得到使用。
而不会出现下面，没有传入参数时报错的现象。
```javascript
function getInfo({……一些默认参数} = {}) {}

getAnotherInfo()
// Uncaught TypeError: Cannot match against 'undefined' or 'null'.
```
## 嵌套对象的解构
感觉，这应该是解构赋值中最实用的部分了（个人认为）。
因为经常套数据，所以也经常需要把变量的数据取出，转成变量。写多了的话，也是感觉很繁琐的。
而ES6，提供了一种全新的解决方式。
```
var json = {
  'name': 'Lxxyx',
  'info': {
    'age': 19,
    'subject': 'HRM'
  }
}

var {
  name,
  info: {
    age,
    subject
  }
} = json

name // "Lxxyx"
age //19
subject //"HRM"
```
如果直接写变量，代表把相应变量赋值。
如果加个`:`号，则表示操作符。表示要去这里面找变量。
如果不理解的话，自己写一遍demo也就理解了。

## 结尾
前端路漫漫，且行且歌~