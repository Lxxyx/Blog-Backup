<!-- title: Koa源码阅读笔记(3) -- 服务器の启动
date: 2016-07-29 09:40:03
tags: 前端
---
 -->

## 起因
前两天阅读了Koa的基础`co`，和Koa中间件的基础`compose`。
然后这两天走在路上也在思考一些Koa运行机制的问题，感觉总算有点理通了。
今天就来解读一下Koa启动时，发生的一系列事情。

## 启动
如果只是单纯用Koa，那么启动服务器是很方便的。
下面就是一个最简单的Hello World的例子。

```javascript
var koa = require('koa')
var app = new koa()

app.use(function * (next) {
  this.set('Powered by', 'Koa2-Easy')
  yield next
})

app.use(function * (next) {
  this.body = 'Hello World!'
})

app.listen(3000) 
```

在上一节对[koa-compose的分析](http://www.lxxyx.win/2016/07/28/2016/Koa%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0(2)%20--%20compose/)中，解决了我一个问题，那就是使用中间件时，那个`next`参数是如何来的。
这一节也会解决一个问题，那就是中间件中的`this`是如何来的。

## 有意思的地方

### 无new也可使用的构造函数
首先看Koa构造函数的源代码：

```javascript
/**
 * Expose `Application`.
 */

module.exports = Application;

/**
 * Initialize a new `Application`.
 *
 * @api public
 */

function Application() {
  if (!(this instanceof Application)) return new Application;
  this.env = process.env.NODE_ENV || 'development';
  this.subdomainOffset = 2;
  this.middleware = [];
  this.proxy = false;
  this.context = Object.create(context);
  this.request = Object.create(request);
  this.response = Object.create(response);
}
```

在`Application`函数内部的第一句很有意思。

```javascript
if (!(this instanceof Application)) return new Application;
```

因为是构造函数，但很多人会忘记使用`new`来初始化。但是在Koa，则做了一点小措施，从而达到了是否调用`new`都能初始化的效果。

### 原型的写法
关于原型的写法，很多人肯定不陌生。以Koa的Application为例，平时如果要写原型的属性，那么会是这样写的。

```javascript
function Application() {}
Application.prototype.listen = function () {}
Application.prototype.callback = function () {}
```

这样写的话，每次都需要写冗长的`Application.prototype`。
而在Koa中，则使用一个变量，指向了`prototype`。

```javascript
var app = Application.prototype;
app.listen = function () {}
app.callback = function () {}
```
写起来简洁，看起来也简洁。

## 服务器の启动流程
在Koa中，或者说一切Node.js的Web框架中，其底层都是Node.js HTTP模块来构建的服务器。
那么我就对这点产生了好奇，到底是什么，能让发送给服务器的相应，被Koa等框架截获，并进行相应处理。
同时在Koa框架中，调用`listen`方法才能启动服务。
那么服务器的启动流程就从`listen`方法开始。

首先是`listen`方法的源代码

```javascript
/**
 * Shorthand for:
 *
 *    http.createServer(app.callback()).listen(...)
 *
 * @param {Mixed} ...
 * @return {Server}
 * @api public
 */

app.listen = function(){
  debug('listen');
  var server = http.createServer(this.callback());
  return server.listen.apply(server, arguments);
};
```

不难看出，只有使用了listen方法，http服务才会被真正的创建并启动。
而查阅文档，则看到在`http.createServer(this.callback())`中传入的参数的作用。
![2016-07-29_10:07:26.jpg](http://7xoxxe.com1.z0.glb.clouddn.com/2016-07-29_10:07:26.jpg)
在这里，server 每次接收到请求，就会将其传入回调函数处理。
同时listen方法执行完毕时，server便开始监听指定端口。
所以在这里，`callback`便成为一个新的重点。

继续放上`callback`的源代码（删除部分无用部分）：

```javascript
/**
 * Return a request handler callback
 * for node's native http server.
 *
 * @return {Function}
 * @api public
 */

app.callback = function(){
  var fn = co.wrap(compose(this.middleware));
  var self = this;

  if (!this.listeners('error').length) this.on('error', this.onerror);

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

在这儿，Koa的注释对这个函数的作用解释的很清楚。
> Return a request handler callback for node's native http server.

而这儿，对于闭包的应用则让我眼前一亮。
由于服务器启动后，中间件是固定的，所以像初始化中间件，保持this引用，注册事件这种无需多次触发或者高耗能事件，便放入闭包中好了。
一次创建，多次使用。

说到这儿想起一个问题，上次NodeParty, Koa演讲结束后，有人询问Koa能否根据请求做到动态加载中间价，当时他没回答出来。
就源代码来看，是不能做到动态加载的。最多也只是在中间价内部做一些判断，从而决定是否跳过。

往下继续读，则可以看到这一行：

```javascript
var ctx = self.createContext(req, res);
```
在context中，是把一些常用方法挂载至ctx这个对象中。
比如在koa中，直接调用`this.body = 'Hello World'`这种`response`的方法，或者通过`this.path`获得`request`的路径都是可行的。
而不用像`Express`一般，`request`和`response`方法泾渭分明。同时在使用过程中，是明显有感觉到`Koa`比`Express`要便利的。而不仅仅是解决回调地狱那么简单。

在第一节[Koa源码阅读笔记(1) -- co](http://www.lxxyx.win/2016/07/27/2016/Koa%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0(1)%20--%20co/)中，已经解释了`co.wrap`的作用。
这儿可以再看一次`compose`函数的源代码。

```javascript
function compose(middleware){
  return function *(next){
    // next不存在时，调用一个空的generator函数
    if (!next) next = noop();

    var i = middleware.length;
    // 倒序处理中间件，给每个中间件传入next参数
    // 而next则是下一个中间件
    while (i--) {
      next = middleware[i].call(this, next);
    }

    return yield *next;
  }
}

function *noop(){}
```

在这里，中间件被倒序处理，保证第一个中间价的next参数为第二个中间价函数，第二个的next参数则为第三个中间价函数。以此类推。
而最后一个则以一个空的`generator`函数结尾。

