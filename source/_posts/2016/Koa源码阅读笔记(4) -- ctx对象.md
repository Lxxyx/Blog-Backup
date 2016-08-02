title: Koa源码阅读笔记(4) -- ctx对象
date: 2016-07-30 10:39:59
tags: 前端
---

## 起因
前两天终于把自己一直想读的Koa源代码读了一遍。
今天就要来分析Koa的ctx对象，也就是在写中间件和处理请求和响应时的那个`this`对象。
而这个this对象，也是和Express的重要区别之一。不用再区分req,res（虽然还是得知道），一个this对象就能调用所有方法。
在实际开发中，是非常便利的。

### Koa1和Koa2的区别
在这儿则需要谈一谈Koa1和Koa2调用this对象的区别。
Koa1在调用时，使用的是this,而Koa2则是ctx。

```javascript
// Koa1
app.use(function * (next) {
  this.body = 'hello world'
  yield next
})
```

```javascript
// Koa2
app.use(async (ctx, next) => {
  ctx.body = 'hello world'
  await next()
})
```

使用方式，只是把this换成了ctx。
具体为什么出现ctx和next,之前的文章[koa-compose的分析](http://t.cn/RtVApVz)有写。

## ctx对象的作用
这儿继续以Koa1为例，因为看得懂Koa1源代码的，看Koa2的源码自然也不难。
首先放上关键的源代码：

```javascript
app.callback = function(){
  var fn = co.wrap(compose(this.middleware));
  var self = this;

  return function(req, res){
    res.statusCode = 404;
    var ctx = self.createContext(req, res);
    onFinished(res, ctx.onerror);
    fn.call(ctx).then(function () {
      respond.call(ctx);
    }).catch(ctx.onerror);
  }
};
```

在上一篇[Koa源码阅读笔记(3) -- 服务器の启动与请求处理](http://t.cn/RtJhLfa)中，我们已经分析了fn的作用。
而onFinished则会在请求完成时调用，剩下的则是调用中间件去处理响应。
同时`var ctx = self.createContext(req, res);`这一句，不看`createContext`这个函数，应该也能猜出它的作用。
之后的`fn.call(ctx)`则说明了中间件中`this`的来源。
在这儿不得不感叹一句，JavaScript的this真的是太灵活了，配合闭包，call,apply等，简直拥有无限魔力。

## ctx对象的创建
贴出相关的源代码：

```javascript
var response = require('./response');
var context = require('./context');
var request = require('./request');

/**
 * Initialize a new context.
 *
 * @api private
 */

app.createContext = function(req, res){
  var context = Object.create(this.context);
  var request = context.request = Object.create(this.request);
  var response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req;
  context.res = request.res = response.res = res;
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  context.onerror = context.onerror.bind(context);
  context.originalUrl = request.originalUrl = req.url;
  context.cookies = new Cookies(req, res, {
    keys: this.keys,
    secure: request.secure
  });
  context.accept = request.accept = accepts(req);
  context.state = {};
  return context;
};
```

虽然看上去有点绕，但是仔细看看，还是不难的。
之前说过，Koa的源码简洁，一共就4个文件。
除了主要的`Application.js`, 剩下就都是与请求和响应相关的了。

### 有趣的地方
这儿，因为每次都要创建并调用`ctx`对象。为了避免影响原有的`context`,`request`,`response`对象。
这儿采用了`Object.create()`来克隆对象。

![2016-08-02_14:52:55.jpg](http://7xoxxe.com1.z0.glb.clouddn.com/2016-08-02_14:52:55.jpg)

## context.js
首先就来分析，最开始的context.js。
context的实现很简单，但有意思的地方在于delegate这个地方。
就如下图所示：
![2016-08-02_14:45:30.jpg](http://7xoxxe.com1.z0.glb.clouddn.com/2016-08-02_14:45:30.jpg)

我看了delegate这个源代码，功能是把`context`中相应的方法调用和属性读取，委托至某个对象中。
而不用自己一个一个的写`apply`,`call`等。

## request, response
关于request和response，我这儿就不详细写了。
在这儿放一张图足以。

![2016-08-02_14:56:29.jpg](http://7xoxxe.com1.z0.glb.clouddn.com/2016-08-02_14:56:29.jpg)

实际上，request和response是通过getter和setter，来实现存取不同属性的功能。
另外，通过刚才说的delegate方法，则使用ctx对象时，便能自动通过getter和setter获取想要的内容。

## 结语
这一篇很简单，其实也没啥可以说的。
因为Koa除了中间件部分看起来复杂，其它地方还是很简洁明了的。
学习源代码的过程中，也发现了很多优雅的写法，算是开拓了自己的眼界。
从会写到写好，看来还要挺长一段时间的。

---
前端路漫漫，且行且歌。
