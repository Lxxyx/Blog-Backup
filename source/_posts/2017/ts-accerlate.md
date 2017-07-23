---
title: TypeScript - 不止稳，而且快
tags: 前端
date: 2017-07-23 22:35:57
---

## 前言

关于 TypeScript 是什么，应该大部分人都已经知道了，但是在这儿，还是摘抄一下知乎的回答：

> TypeScript 是 JavaScript 的强类型版本。然后在编译期去掉类型和特有语法，生成纯粹的 JavaScript 代码。由于最终在浏览器中运行的仍然是 JavaScript，所以 TypeScript 并不依赖于浏览器的支持，也并不会带来兼容性问题。

对于我个人而言， 使用 TypeScript 写项目已经有半年多了，中间有被 TypeScript 的配置与升级折腾到想砸电脑的时候，也有提前发现错误时的暗自庆幸，同时也有因为找不到类型定义文件而自己手写，提PR补全的时候。
总的来说使用 TypeScript 的这一年，什么感觉都有。但最后还是依然坚持使用 TypeScript ，因为其带来的效率提升是远远大于环境升级所带来的开销的。

## 稳定压倒一切

作为程序员，自然希望代码上线之后能安安稳稳的跑着，而不是突然报错崩溃啥的。
所以 TypeScript 之前最被看重的就是静态类型检查功能。

至于静态类型检查的作用，在知乎的另一个回答中有相关的回答：

> 静态类型检查可以避免很多不必要的错误, 不用在调试的时候才发现问题 (其实有的时候根本调试不出问题, 只是默默地把坑挖了, 说不定埋的就是个炸弹, 之前用 TypeScript 重写应用的服务器端程序, 写完之后就发现了不少暂时没有影响到运行的严重问题).

## 懒人的自我救赎

然而，我是个很“懒”的人，不愿在重复的事情上花上很多时间，也不喜欢像背书一下，背下来 Api 文档。更希望自己的时间能专注于核心业务的开发，而非边边角角的事情。

去年十月，在因为实际学习需要，接触越来越多前端框架时候，感觉整天的开发，大半的时间都浪费在了查文档上，特别是一些 React 的组件，props又多又长……每次写的时候，都得回去翻文档，简直绝望。

![](https://gw.alicdn.com/tfs/TB1HHW4SpXXXXbJapXXXXXXXXXX-1878-958.png)

![](https://gw.alicdn.com/tfs/TB1nPYpSpXXXXcSXFXXXXXXXXXX-269-220.png)

在这种每天近乎绝望的重复劳动下，我开始尝试去找解决方法，再到后来有一天接触了 TypeScript ，感觉到这就是自己想要的功能。
嗯……看中的不是 TypeScript 的稳定性，而是 TypeScript 的代码提示。

比如写 Node.js，使用 TypeScript 与 不使用的区别是这样的：

![](https://gw.alicdn.com/tfs/TB11WrkSpXXXXX_XVXXXXXXXXXX-772-604.png)

不仅不用手动翻阅 Api, 而且参数是什么也都一清二楚了。

且TypeScript 的代码提示是基于类型文件工作的，而相比于各个编辑器自己定义的代码片段来说，不仅有大量的志愿者去维护，更新及时，而且种类繁多，基本现有的流行框架类库，都有相应的类型定义文件。

所以自打用上 TypeScript 后，就过上了再也不用去费脑子记 Api 和参数的日子，开发效率与幸福感都得到了大大的提升。

## 不止稳，更要快

而 TypeScript 的快，不仅体现在代码提示上，同时也体现于重构、可读性和配套的编辑器上。

### 代码重构

在重构上，这个自己是有实际体会的，如果写JS，重构时候不小心改了啥，除了运行时候能发现，其他时候往往难以察觉，且 ESLint 也只能是排查简单的问题，所以出了BUG会非常麻烦。
而 TypeScript 不一样，重构了，重新编译一下就知道，哪里错了，哪里改动了不应该改的。对于我自己这种时不时就会重构的人来说，省时又省力。

### 可读性

可读性上，TypeScript 明显占优，查看开源代码时，如果注释不是很完善，往往会看的云里雾里，而 TypeScript 在同等条件下，至少有个类型，能让自己更容易明白代码的参数、返回值和意图。

### 编辑器

这个是不得不提的部分，因为 VSCode 实在是太方便了，性能也高，且编辑器自身保持着一个高速的开发与迭代状态，时不时就能感受到 VSCode 开发团队的诚意和其所带来的惊喜。

因为都是微软家产品的原因，VSCode 对 TypeScript 的支持也相当完善。各种插件也层出不穷，基于 TypeScript 做的 `Automatic Type Acquisition` 功能使得 JavaScript 的用户也能享受到详细的代码提示功能，这一点上比 Sublime 等编辑器方便了很多。

同时，两周前在 Rax 的开发者群中发布了一份问卷，在收上的有效问卷中，看到了 VSCode 的占有率，有点令人惊讶。（样本较小，会有误差存在）

![](https://gw.alicdn.com/tfs/TB12314SpXXXXbuapXXXXXXXXXX-2024-798.png)

关于 VSCode 编辑器的上手与配置，可以看阎王发表的这篇文章：[如何快速上手一款 IDE - VSC 配置指南和插件推荐](http://www.barretlee.com/blog/2017/04/21/something-about-vsc/)

## 解放自己，专注业务核心开发：TypeScript 编辑器插件推荐

当然，每次写 TypeScript 时，依然会遇到一些烦心的问题和重复的劳动。
比如说，TypeScript的类型定义文件是需要手动下载相应的 @types 包的，虽然相比于之前的方式已经进化了很多，但是每次还要重复，依然会觉得繁琐。
所以下面会推荐自己常用的几个插件，把自己从繁琐无趣零成长的工作中解放出来。


### TypeScript Importer-告别手动重复写import的日子

[插件地址：TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)

这个是我最喜欢的插件，具体的作用，一图胜千言：

![](http://g.recordit.co/QHByAo9Km7.gif)

在长长的路径里，导入另一个文件夹深处的模块，那种感觉是绝望……
每次都要重复的import，每次都要重复的判断路径，每次都要重新写一遍import……

虽然工作量也不大，但是确实会影响心情和效率。


### Types auto installer - 自动安装相应的类型定义文件

[插件地址：Types auto installer](https://marketplace.visualstudio.com/items?itemName=jvitor83.types-autoinstaller)

在之前，你安装一个模块并在 TypeScript 运行两段命令。
以lodash为例：

```shell
npm i lodash --save
npm i @types/lodash --save
```

当然，你也可以合并到一句话去写。
虽然工作量不大……但是架不住量多啊……每开一个项目都得来这么一次，简直绝望……

所以当时就想着自己写一个自动安装类型定义文件的小工具，后面确实也写出来了，只是再后来又发现 VSCode 有这个插件，功能也很完善，就用它的了。
插件的作用很简单，就是当你运行：

```bash
npm install --save lodash
```

它会自动执行：

```bash
npm install --save @types/lodash
```

与此同时还有一键下载安装所有 package.json 依赖类型定义文件的功能，可以说是非常方便了。

### Sort Typescript Imports-给你import的模块们排序

[插件地址：Sort Typescript Imports](https://marketplace.visualstudio.com/items?itemName=miclo.sort-typescript-imports)

同样，话不多说，一图胜千言：

![](https://github.com/MLoughry/sort-typescript-imports/raw/master/images/example.gif)

这是一个看起来没什么作用的插件……因为其实 import顺序是否整洁有序好像对开发效率啥的并没有很大的提升。
但这是一个你接受了它的设定，就可能会觉得十分有趣的插件……

具体的作用就是，让你的 imports 更有顺序，相近文件夹的排列在一起。看起来会更好看一些。

Emmm……如果一定要说作用的话，就是更好看一些吧……很符合我这种有轻微代码洁癖的人的心态……

## 为什么要关注这个？

自己在知乎上有回答过一道问题：《最近一年前端技术栈哪些技术点最困扰你?》
我的回答是：

> 开发环境的搭建。
> 没有官方的cli，或者自己要做一些拓展(比如用ts)真的非常烦人。
> 各种报错，而这种在开发环境上积累的经验和踩的坑是价值非常低的。(因为基本最后翻官方配置文档都能解决)
> 耗时长，学习价值低，更新速度快。

在这儿，也是同理。
用 TypeScript 和相关插件所解决的问题，都是一些繁琐、无趣、零成长的工作，而且还影响心情。
有这个时间，为什么不多陪陪女朋友，多学点东西，多解决一些有意思的问题呢？
所以这种可以让计算机解决的问题，就让计算机去解决吧~