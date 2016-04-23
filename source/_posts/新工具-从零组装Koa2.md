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
看完大会视频后自己也想了一想，发现好像理解了Koa的中间件级联。
