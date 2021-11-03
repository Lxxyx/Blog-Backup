---
title: React setState 解读
tags: 前端
date: 2018-01-13 18:06:36
---

## 起因

之前对于 React 的源代码与底层实现一直很感兴趣，但是 React 的源代码大且多，不易读。
再加上之前也遇到过在调用 `setState` 的 Api 后，`this.state` 属性并未及时更新的问题，这对于我个人而言，就如同一个黑匣子一般。
现今有空了，总得打开黑匣子，一探究竟。

<!-- more -->

## setState 的疑惑

看下面这段代码，你认为会输出什么呢？

![](https://cdn.lxxyx.cn/2018-03-26-085727.png)

答案在右侧的 console 中，是 0，0，2，3
我第一次回答的时候是答错的，所以就对这个产生了兴趣。

这也是我当时遇见的一个 React 的坑，setState 可能是异步的。
就像图里的情况，4 次输出，其中前两次是异步的，后两次是同步的。

## setState 的流程

setState 的流程，在知乎专栏的一篇文章里已经讲的很清晰了，这儿选择贴一张它的图：

![](https://cdn.lxxyx.cn/2018-03-26-085730.jpg)

但是那篇文章也没有讲清楚，队列是什么、多次 setState 如何处理，这儿会针对这几个点做解释。

### setState 之后

首先下载 React 的仓库，切换到 15.6.2 版本查看源代码，commit 号是：ffbc2db0e7860ee1a96511578235dec7eaccc8d3。

在看 setState 的源代码时，顶上的注释就有提到：

> There is no guarantee that `this.state` will be immediately updated, so
> accessing `this.state` after calling this method may return the old value.You can provide an optional callback that will be executed when the call to setState is actually completed.

翻译成中文就是，不保证 setState 是同步的，如果你要准确的获取到更新后的 `this.state`，可以给 setState 传一个回调函数，这会在 state 更新完后触发。

调用 setState 时，函数内部是：

![](https://cdn.lxxyx.cn/2018-03-26-085732.png)

可以看到调用了 `this.updater.enqueueSetState`，把自己和要更新的 state 传了进去。
（另外不得不感慨一句，React 这种顶级开源项目，注释完善，各种错误提示完善，不论是使用还是读源代码，都太幸福了）

调用 `enqueueSetState` 后，内部逻辑如下：

![](https://cdn.lxxyx.cn/2018-03-26-085734.png)

这儿有个很有趣的点就是，React 把组件划分为两种实例，一种是对外的，可以查看的，一种是挂载部分私有属性与任务的，就是图里面的 `internalInstance`，这么做的好处是可以把部分细节屏蔽，不对外暴露从而避免被修改等。

### pending 队列

代码中，有关于一个 \_pendingStateQueue 的，而这种初始化的写法，也让自己感觉到新奇与简便。

```js
var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
queue.push(partialState);
```

从这儿可以看出，在调用 setState 后，那个传入的 `partialState` 会被首先推入到 `_pendingStateQueue` 当中，等待处理。

### pending 队列的处理

之前就听说过，react 在多次 setState 时，会优化到只更新一次，这次看到了队列，便推测于此有关。
随后搜索源代码，看到了这么一段：

![](https://cdn.lxxyx.cn/2018-03-26-085736.png)

在代码中不难看出，nextState 时由队列中各种状态合并成的一个最终对象。

### enqueueUpdate

enqueueUpdate 函数很短，核心部分便是判断是否正处于 `isBatchingUpdates`的状态下，来决定是直接开始升级，还是推入 dirtyComponents 等待处理。
在注释的开头部分也说的很清楚，标记一个组件是否需要升级。
![](https://cdn.lxxyx.cn/2018-03-26-085738.png)

## batchingStrategy

简化代码如下：

```js
var batchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function (callback, a, b, c, d, e) {
    // ...
    batchingStrategy.isBatchingUpdates = true;

    transaction.perform(callback, null, a, b, c, d, e);
  },
};
```

关于 Transaction 的介绍可以在这儿看到：[React 源码剖析系列 － 解密 setState](https://zhuanlan.zhihu.com/p/20328570)

不难看出，调用 batchedUpdates 时，isBatchingUpdates 会被设置为 true.
当 **isBatchingUpdates 为 true 时，所有的 setState 调用都会进入 dirtyComponents **的处理流程。从而出现 `setState` 是异步的特点

## 何时异步？

取决于是否有人调用了 batchedUpdates。

比如说在触发 React 的事件时，就调用了 batchedUpdates

![](https://cdn.lxxyx.cn/2018-03-26-085739.png)

在这儿，我们的理解是：由 React 触发的事件，会使用 batchedUpdates 方法。
此时 setState 是异步的。
