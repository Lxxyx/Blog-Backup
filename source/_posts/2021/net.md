---
title: net 模块，参数传错就进程崩溃
tags: 前端
date: 2021-01-17 13:19:57
---

近期给 Node.js 提了许多 PR。这当中有一些 BUG 我觉得还挺有意思的，所以开个专栏专门讲述 BUG 的定位、修复、提 PR 的过程。

话不多说，先来看第一个 BUG：使用 `net` 模块的 `BlockList` 类时，如果调用 [`addSubnet`](https://nodejs.org/dist/latest-v15.x/docs/api/net.html#net_blocklist_addsubnet_net_prefix_type) 的第 2 个参数为 NaN，进程就会 Crash 退出。

Issue 由我发现和修复，目前已合并至 Node.js 主分支中，并在 15.6.0 版本中分发。

Github 上提交的 Issue 和 PR：

- Issue: [net: blockList.addSubnet throw Assertion `args[2]->IsInt32()' failed when prefix is NaN](https://github.com/nodejs/node/issues/36731)
- Pull Request: [net: throw ERR_OUT_OF_RANGE if blockList.addSubnet prefix is NaN ](https://github.com/nodejs/node/pull/36732)

## 复现

**Node 版本**: 15.4.0

问题代码如下：

```typescript
const net = require('net');
const blockList = new net.BlockList();
blockList.addSubnet('', NaN);
```

报错信息：

```
> blockList.addSubnet('', NaN)
node[2155]: ../src/node_sockaddr.cc:614:static void node::SocketAddressBlockListWrap::AddSubnet(const FunctionCallbackInfo<v8::Value> &): Assertion `args[2]->IsInt32()' failed.
 1: 0x101379d05 node::Abort() (.cold.1) [/usr/local/bin/node]
 2: 0x1000bde89 node::Abort() [/usr/local/bin/node]
 ....
[1]    2155 abort      node
```

而这种在 C++ 抛出的异常，是你用 Try/Catch 也捕获不了的，如果你传入了错误的参数，那么进程只能 Crash。

## 定位

在 `net` 模块中，`BlockList` 负责网络黑名单的工作，用于屏蔽某些 IP 地址。本次出问题就是其中的 `addSubnet` 方法。

在 Node.js 的源码中，所有 JS 提供的功能都在 `lib` 目录下，简单的搜索 BlockList 关键词，我定位到了本次发生问题的代码文件及方法：[https://github.com/nodejs/node/blob/37a8179673590af10b9e8e413388adffc21ba713/lib/internal/blocklist.js#L81-L105](https://github.com/nodejs/node/blob/37a8179673590af10b9e8e413388adffc21ba713/lib/internal/blocklist.js#L81-L105)。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1610856720170-f6734e94-26c2-463c-8ef1-ec914e05b8ef.png#align=left&display=inline&height=317&margin=%5Bobject%20Object%5D&name=image.png&originHeight=634&originWidth=712&size=56652&status=done&style=none&width=356)

在 `addSubnet` 方法中，会对传入 `prefix` 参数做校验，而这个校验实际上是存在漏洞的。

在使用 `typeof` 来校验 number 时，往往会遗漏 NaN 的校验，因为 `typeof NaN === 'number'` 。此次的问题也是如此。

在最终调用 `this[kHandle].addSubnet(network, type, prefix);` 时我们传入了 NaN，而 `this[kHandle]` 是 C++ 的 binding。

```javascript
const { BlockList: BlockListHandle } = internalBinding('block_list');

class BlockList {
  constructor(handle = new BlockListHandle()) {
    this[kHandle] = handle;
  }
}
```

在 C++ 代码中，则对传入的参数又做了一次校验。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1610858744812-b584dc03-1ed4-4e5d-a21a-fe0b2675fd8e.png#align=left&display=inline&height=158&margin=%5Bobject%20Object%5D&name=image.png&originHeight=316&originWidth=746&size=48167&status=done&style=none&width=373)

而 `NaN` 不是 `Int32`，因此将导致进程异常退出（exit code: 134，代表中断）。

## 修复

了解问题后，修复并不困难，只要在 JavaScript 侧加入对 NaN 的校验即可。

而在 Node.js 的内部提供了 `validateInt32` 方法，用于校验数字。我们只需要将原来的 `if (typeof prefix !== 'number')` 替换为 `validateInt32` 即可。

下面是完整的 Diff。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1610859134001-5ed46955-3f85-45cf-bd9d-1ef544f57a59.png#align=left&display=inline&height=590&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1179&originWidth=2264&size=226887&status=done&style=none&width=1132)

## 单测

在 Node.js 源码中，任何变更都需要配上相应的单元测试，此次也不例外。

我在 [test/parallel/test-blocklist.js](https://github.com/nodejs/node/blob/f658bd1e8f7cd0a328c10c8d2a4eea6cf113122b/test/parallel/test-blocklist.js#L153) 加入了单元测试，本地测试通过后便提交了 Pull Request。

单元测试的代码：

```javascript
assert.throws(() => blockList.addSubnet('', NaN), /ERR_OUT_OF_RANGE/);
```

## 提交 & 合入主分支

相关的 Pull Request: [net: throw ERR_OUT_OF_RANGE if blockList.addSubnet prefix is NaN ](https://github.com/nodejs/node/pull/36732)

因为改动不大，且 BUG 确实存在，因此这个 PR 没有争议的迅速通过了。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1610859603215-e13e9a0e-12f5-4b62-b157-02f10b85abe7.png#align=left&display=inline&height=274&margin=%5Bobject%20Object%5D&name=image.png&originHeight=548&originWidth=1631&size=89721&status=done&style=none&width=815.5)
提出 PR 大概一周的时间，代码就已经被合入 Node.js 主分支，并在 Node.js 15.6.0 中分发到全世界了（顺带一提，在 15.6.0 版本中，我有 12 个 commit 被合入当前版本）。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1610859737838-4ef12a0c-f55e-4b70-a765-e80e1a6a3448.png#align=left&display=inline&height=244&margin=%5Bobject%20Object%5D&name=image.png&originHeight=487&originWidth=774&size=48168&status=done&style=none&width=387)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1610859806964-428735a6-df73-43fa-8327-32249f4765e3.png#align=left&display=inline&height=55&margin=%5Bobject%20Object%5D&name=image.png&originHeight=109&originWidth=983&size=18946&status=done&style=none&width=491.5)

## 后续

全文看下来，你会发现往 Node.js 提交 Pull Request 并不困难，且修复 BUG 的过程也是熟悉源码的过程。感兴趣的话不妨阅读 Node.js 的文档：[《Contributing to Node.js》](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md) 与 Starkwang 的文章：[《为 Node.js 贡献你的力量》](https://zhuanlan.zhihu.com/p/27932211)。

后续我也会持续更新这个专栏，将我解决过的 Issue 写成文字，供大家学习和参考，有兴趣的同学可以点个关注~
