title: 从零组装新工具 - Koa2
date: 2016-04-23 20:27:06
tags: 前端
---
## 起因
作为一个前端，Node.js算是必备知识之一。同时因为自己需要做一些后台性的工作，或者完成一个小型应用。所以学习了Node的Express框架，用于辅助和加速开发。

不过当初自己对Express的学习和了解，并不是很深入。要求也仅仅是停留在能发送静态文件，构建后台API，与数据库完成简单交互而已。所以当初自己选用Express时，靠的是[Express 应用生成器](http://www.expressjs.com.cn/starter/generator.html)，相当于Express的最佳实践。
在使用了一段时间之后，被Express的“回调地狱”，“自定义程度不高”等问题所困扰，于是决定更换至新的框架。

在选择框架时，遵循了自己学习新技术的原则：
> 要么找值得学习的，深入学习并理解。要么找适合当前业务，能快速解决问题的。不要在具体某某某个技术上纠结太久。

这句话也是自己看余果大大的《Web全栈工程师的自我修养》这本书的体会。

## 选择Koa
在上面原则的指导下，很容易的就找到了一款符合自己需求的框架：Koa。
Koa因为应用了ES6的生成器语法，所以非常优雅的解决了Node.js的回调地狱问题。
比如说这样的Ajax代码，看起来就比回调函数的写法优雅很多。
```javascript
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
  console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}
```
> 例子来源： [Generator 函数](http://es6.ruanyifeng.com/#docs/generator#yield-语句)

虽然yield的写法有点奇怪，但还是可以接受的。
### 选择Koa2
同时在Koa的github首页中，看到了Koa2。
Koa2应用了ES7的`Async/Await`来替代Koa1中的生成器函数与yield。
所以上一段代码的main函数，在Koa2里长这样：

```javascript
async function main() {
  var result = await request("http://some.url");
  var resp = JSON.parse(result);
  console.log(resp.value);
}
```
使用了`Async/Await`后，整段代码是变的更加好看的。

### 理解Koa的中间件
在一开始学习Koa时，是不太理解Koa的中间件级联这个概念的。
就是下图这玩意。
![中间件级联](http://7xoxxe.com1.z0.glb.clouddn.com/koa.jpg)

这个算是Koa的核心概念了，不理解这个，只能安安心心继续用Express。

还好自己平时爱去看各种开发大会的视频，来提升自己的眼界。所以昨晚正好在慕课网看到了《阿里D2前端技术论坛——2015融合》的大会视频，便开心的点开学习。
而第一篇《用 Node.js 构建海量页面渲染服务——by 不四》讲的就有Koa框架，还梳理了Koa的中间件级联这个概念。
在不四前辈介绍完Koa的中间件级联后，我发现自己好像理解了。
配合着自己之前学习的ES6知识，才发现原来是这样。
在这儿我贴一段代码和自己的理解，有兴趣的同学可以看一看。
```javascript
var koa = require('koa');
var app = koa();

// x-response-time

app.use(function *(next){
  // 首先启动第一个中间件，记录下时间
  var start = new Date;
  // 进入中间件，并等待返回。
  yield next;
  // 返回后，代表操作已完成，记录结束时间并输出。
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// response
app.use(function *(){
  // 最后一个中间件，将body写成'Hello World'
  this.body = 'Hello World';
});

app.listen(3000);
```
整个的流程，会是这样的：
```javascript
.middleware1 {
  // (1) do some stuff
  .middleware2 {
    // (2) do some other stuff
    .middleware3 {
      // (3) NO next yield !
      // this.body = 'hello world'
    }
    // (4) do some other stuff later
  }
  // (5) do some stuff lastest and return
}
```
至此，学习Koa的最后一个难关，也被攻克了。

## 从零组装Koa
因为对Express的学习和使用，知道了自己对于后台框架的真实需求。
所以这回决定不用Koa generator之内的工具，而是自己从零开始，组装一个适合自己的Koa框架。
基于Koa2，使用Async/Await，符合自己需求……
想想就是很美好的事情呀。

### 梳理需求
首先要做的，自然就是梳理自己的需求。看看到底需要什么东西。
于是翻出自己前两个月在使用的Express框架，确定了以下要点。

1. 路由，创建Rest Api
2. 发送静态HTML文件
3. 设置静态文件目录
4. 发送和读取JSON数据
5. 渲染模板
6. 使用ES6语法完成工作

### 实现需求
具体的实现部分，这儿就不再赘述了。就是去github和npm上，寻找一个一个的包并组装在一起了而已。
整个项目的亮点就在于：完全符合个人需求，并且使用ES6来完成工作。对我个人而言，用ES6不仅看起来爽，也能提升我的工作效率。

整个项目已开源于Github，日后自己取用也非常方便。有兴趣的同学，也可以尝试一下。
项目地址：[koa2-easy](https://github.com/Lxxyx/koa2-easy)

## 总结
这周因为胃肠炎，好像也没做啥事情……最大的事儿也只是组装了个Koa框架。
因为养病的原因，只能每天看看开发者大会的视频。因为肚子时不时的抽一下，真的很影响工作啊……

今天感觉好了一点，希望病情早日康复~
就酱~
