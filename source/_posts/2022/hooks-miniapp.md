---
title: 跨云 & 跨端 — 小程序云开发一体化方案
tags: 前端
date: 2022-01-07 10:46:00
---

> 演讲录音转文字 + 校对，偏口语化。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641372993619-3078e36a-b069-4398-8b90-d5d6c021a270.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u8b011520&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=177086&status=done&style=none&taskId=uec7e7ac6-3e2e-40bf-a8ef-fa46d916249&title=&width=1920)
​

大家下午好，非常感谢大家的到来。
​

我是刘子健，花名繁易。目前在阿里巴巴淘系前端的 Node.js 架构组就职。今天给大家带来的分享话题标题是：《跨云 & 跨端 — 小程序云开发一体化方案》。
​

## 个人简介
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641373045523-931ef785-0d02-4a4f-b014-3741810beb14.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u9b69905c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=612780&status=done&style=none&taskId=u743e5030-d3e2-4120-b793-966b3789a9c&title=&width=1920)
​

首先是个人自我简介，我叫刘子健，花名繁易，Github 的账号是 [Lxxyx](https://github.com/Lxxyx)。 目前在阿里巴巴的 Node.js 架构组担任前端技术专家一职。
​

个人工作主要专注于以下三方面：

- Node.js
- Serverless
- Web 框架

​

然后我个人也有积极在参与开源社区，简介如下：

- 阿里 Node.js 框架 Midway.js 团队核心成员，负责框架研发工作
- Node.js Core Collaborator
- TC39 阿里巴巴代表，对部分提案提供反馈 & 意见

​

## 大纲
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641373287769-1026a956-0f95-4e13-8720-251c48c0d672.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u637fa5a2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=114074&status=done&style=none&taskId=u108b37de-b72b-41de-a90f-c36531b6490&title=&width=1920)
今天的分享会从以下四部分给大家去讲述。
​


- 介绍一下小程序和云开发
- 介绍推出的云开发一体化方案
- 内部落地实践案例
- 展望和总结

​

## 小程序与云开发
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641373662656-ea31cec4-d88d-4330-baa2-f907a6954e76.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u08f49ce7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=89033&status=done&style=none&taskId=u8156b2d9-a4a9-4650-97a4-b490512b478&title=&width=1920)
### 小程序
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641373366852-e012a286-8906-47c8-8547-c2f42099214f.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u0ec9aa2f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=202735&status=done&style=none&taskId=ue664d80d-746e-42ba-bc5d-7346d707c7b&title=&width=1920)
​

从上图大家可以看到，自小微信推出小程序开始，各大厂商都针对自己的平台推出了相应的小程序的方案，可以说层出不穷，基本上每一个场都有一个对应的小程序的一个方案。
​

但是很多第三方开发者或者厂商，他开发的应用不只是投放至单一平台的。他很多时候有一码多投或代码复用的需求，在这种情况下，开发者必须去使用跨端框架。
​

然后大家也知道微信传统的小程序开发模式，我认为是非常低效且痛苦的。于是很多开发者想着使用前端框架来解决开发体验的问题，所以也会去使用跨端框架，比如基于 Vue 或基于 React 的各种第三方跨端框架。
​

因此对于目前小程序跨端框架的现状，我的判断是：**“跨端和效率的需求催生了大量的跨端框架，每次都有新方案，每年都有新东西。”**
**​**

### 云开发
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641373714851-72f18d0e-f66d-4474-b52b-d352469fe5b1.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u7b3098cf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=203704&status=done&style=none&taskId=uce505564-76c5-4ff2-bb43-23b5f9d471f&title=&width=1920)
第二部分我会讲述云开发。要提到云开发，就不得不先提我们传统的服务开发。
​

在我们传统服务开发中，如果你要去开发一个应用的后端，其实是非常繁琐的。
大家可以看上图，在实际开发过程中，开发者其实是需要关心应用扩容、安全、文件存储、容灾等各方各面的。开发者在服务端需要做非常多的运维工作，然后也需要花费很多时间在接口联调上，然后才能去实现业务逻辑，整体工作其实非常繁琐。
​

对一些第三方一些小的开发者，甚至说个人开发者，这个部分的成本其实高到难以接受的。
​

面对这些问题，云厂商推出了云开发功能。关于云开发，我把它拆解成以下两个部分：

- 平台特定的 API
- 云开发基础能力

​

那么云开发到底节省了哪部分的时间呢？我认为有以下两方面：


1. 在一些常用的功能的开发上，你不再需要重新去做很多事情了。例如登录支付功能，你如果有做过对接都知道这个过程非常痛苦。但是有云开发提供的 API 情况下，你可以直接调用它内置的 API 去实现功能，从而节约你的开发成本。
1. 云开发的基础能力（函数、文件、数据库等）。也就是说你不用再关心运维，不用再关心安全，不用再关心容灾，直接去调用这些就可以。然后它整个的目标是为了让你能专注到业务逻辑上。

​

关于云开发，我们的判断是：**“Serverless + BaaS，可以降低小程序开发成本。”**
**​**

但云开发不是一个新东西，它在 18~19 年左右，其实就已经有云厂商提出并落地了。大家在各种会议上听分享，其实可以看到社区重点提的都是跨端框架，例如我的框架可以跨几个端，但几乎没有人关注到云开发可以怎么做。
对于这一点，其实我们也有自己的一个判断：云开发和跨端之间存在“不可调和”的矛盾。我们可以做跨端，但很难说跨端框架上可以很好的去利用云开发的能力。
​

我们进行的归纳总结，认为跨端与云开发间存在以下三个矛盾。
​

### 矛盾 - 云开发语法分裂
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641374737546-4b261f7a-f745-4528-b005-c0fa00f02458.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u6af6fbeb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=156326&status=done&style=none&taskId=uf4159765-6910-42b6-9c02-a599669ead5&title=&width=1920)
第一个矛盾是：云开发的语法分裂。
​

在上图中我列举了几个云：阿里云、腾讯云、轻服务。这一点其实非常有趣，因为我在长期跟踪各个云的云函数功能，发现每个云为了让自己长得不太一样，它必须设计一个不太一样，但其实一样的语法。例如：

- 阿里云：`context`
- 腾讯云：`event`
- 轻服务：`params`

​

虽然功能大致是一样的，但不同厂商有着不同的一个语法，导致云开发的语法其实相当分裂。之前做跨端小程序，开发者可以通过同一套 DSL 去做，但在云开发上其实很难去做，每个云服务商你都要学习和接受全新的语法。
​

### 矛盾 - 开发繁琐
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641374999205-ed4f8f02-6df8-43a2-9b5c-48799b44fbc7.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u3b7af4f9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=330437&status=done&style=none&taskId=u965d59b7-31f7-46ef-b2d6-a4f6f77922c&title=&width=1920)
第二个矛盾是：开发繁琐。
​

目前所有云开发的目录结构或者是云开发所谓的架构都是上图的模式。

- 架构视角：端侧使用了云开发 BaaS 服务进行开发
- 代码视角：前端后端同一个仓库，通过 monorepo 的方式去开发，其中小程序的每一个函数都需要创建新文件夹

​

这种情况下，其实我们认为它只是机械的组合资源，你的代码很多部分是雷同的，并没有发挥 JavaScript 通吃前后端的优势。
​

### 矛盾 - 云平台锁定
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641375322483-03ae465e-1d89-4d70-9d04-acb635ac30e2.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u8e937a16&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=197252&status=done&style=none&taskId=u23ffa8f4-8c71-4793-8603-39ff5215426&title=&width=1920)
第三个矛盾是：云平台锁定。


云平台锁定其实是提的比较多的一个概念。简单来说，如果你选择了一家云服务厂商，你的数据，你的代码、你的服务器全都上云之后，如果这个云服务厂商的质量没有达到你的要求，或者说它的功能达不到你要求，你想去切换云的时候，这种时候成本是非常高并且难以接受的。这种时候我们称为云平台锁定。
​

然后很多时候很多厂商会选择多云策略，同理做小程序也是一样，做小程序时，开发者可能说不止投一个平台，但很多时候你也希望去使用别的平台的功能，就容易遇见云平台锁定问题。
​

## **云开发一体化方案**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641375608709-941486fc-b935-4a01-bbe6-e0da6c05aeed.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uf154861f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=92495&status=done&style=none&taskId=u2215af81-46e0-4f45-a4ab-7177d60d1ed&title=&width=1920)
说完以上三个矛盾，接下来我给大家一起来看我们是如何去解决这些问题的。这边就要提到我们推出的云开发一体化方案。
​

### 一体化应用开发方案
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641375761256-48cb352f-6087-4206-83a1-ce37dd438d21.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ub24a1e25&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=170824&status=done&style=none&taskId=uef9c4b94-d0a5-469d-8665-caf6a775667&title=&width=1920)
​

一体化应用开发方案它并不是一个非常新的一个概念。这个方案其实是我们团队 2020 年 4 月份在阿里内部发布的。因为涉及到非常多配套的云平台，因此也没有做大规模的宣传。


目前在阿里内部有 2500+ 一体化应用，它也是目前阿里前端主流开发模式之一。举个例子：目前我们在开发中后台应用的时候，已经很少在开发那种纯资源型的应用，而是选择一体化应用的研发模式，它可以更好地利用函数与 Serverless 的能力，让开发者可以去做一些后端的一些事情，我们认为这对应用是一个增强的能力。
​

然后一体化应用本来只是我们在开发 Web 应用时去使用的方案，比如说 C 端或者中后台应用。但是我们发现如果把它的方案和我们内部的小程序方案去做一个结合（例如淘宝小程序），其实也可以解决小程序所带来的非常多的一些痛点。
​

因此这次我们也将云开发与小程序的方案去进行了一个融合，这边会讲到我们是如何解决上面的三个矛盾的。
### 语法分裂 — 函数式
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641376331639-e401c9e8-ab4f-4f9b-a7d0-28749a93c38b.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ua55088d8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=156326&status=done&style=none&taskId=ua7b2b038-86b5-4549-a34d-32dd2dd4161&title=&width=1920)
第一个矛盾是语法分裂。
​

上图可以看到，不同厂商有不同语法。往往这种时候，我们需要设计一种 DSL，通过跨端的DSL 来解决这个问题。而在后端情况下我们发现其实有更简单的方式，因此我们最终选择的 DSL 可能简单到，我相信在座的每个同学不用学习就会了。


#### 函数式 - 函数即接口
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641376594094-28da4397-b57d-4c87-b3c6-f12866998755.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u6955ad18&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=238313&status=done&style=none&taskId=u2cead45a-539f-4e80-8471-18f561bd600&title=&width=1920)
在这里，我们使用的 DSL 是 JavaScript 函数，也称作为： JavaScript 函数即接口 - 统一 & 无协议。
​

我们发现，在你实际开发的过程中，你去开发一个 JavaScript 函数，这个函数所携带的信息其实就已经足够描述API 接口或者云函数需要的信息。这边我以 HTTP 接口为例。

- HTTP 路径：函数名 + 文件名
- HTTP Method：无参数为 `GET`，有参数为 `POST`
- HTTP Body：参考 RPC 设计，使用数组来映射函数实际入参
- 返回值：TypeScript 自带类型分析



这一点就是我们所提出的一个理念，叫做基于函数元信息是生成接口。同理如果你生成的是一个云函数，你有一个函数名，你就能只要保证这个函数名不重名，你就能使用函数名作为函数 ID 去生成一个云函数。
​

然后大家可以看图中的代码，可以看到用了一个 `useContext`  的 API，这也是我们方案的创新之处。
​

#### 函数式 - 使用 Hooks 开发后端接口
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641381544146-d4b7284e-6a8a-4c71-84af-097ed7725c37.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ub0152926&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=464991&status=done&style=none&taskId=u4d3252a4-8155-4c27-b36c-013ce2cea4c&title=&width=1920)
这一点我们称之为: 使用 Hooks 开发后端接口。
​

为了给开发者提供更好的开发体验，解决语法问题，解决 DSL 问题。我们提出了一个全新的理念：Hooks 开发后端接口。在传统的 Web 开发中，大家其实需要传递 `Context` 的，此处 `Context` 你可以理解为 `Express` 的 `req/res` 或者是 `Koa` 的 `ctx`。也可以理解为云函数里面 `Context` 所带的一些函数信息。
​

上图有简单的示例，这个如果你云函数支持 HTTP 请求的话，可以使用 `useContext` Api 来获取到 `Context`，从而拿到请求的 IP。这种情况下你可以获取上下文，而且不需要手动传参数，使用方法也与前端保持完全一致，然后这一点也会引出我们后面的一个核心 feature ，后文会说到。
​

然后在当时做的时候其实也遇到了一些难题，比如在我们做的时候，其实 JavaScript 是不支持线程级 `Context` 传递的，想要实现需要依赖 Node.js `[async_hooks](https://nodejs.org/api/async_hooks.html)` 模块。
​

然后这背后其实也有一个小故事，就是 JavaScript 不支持线程上下文，我们想让它支持，要怎么办？我们团队在 2020 年 的 6 月份向 ECMA 去提交了一份关于线程上下文的提案，但是因为各种语言语义等潜在的问题，并没有通过，所以后面我们才切换到 Node.js `async_hooks` 的实现。所以我们也在积极参与标准，只不过这个过程比较坎坷，不像 [Error Cause](https://github.com/tc39/proposal-error-cause) 提案推进的比较顺利。
​

然后当我们在使用 `async_hooks` 时，其实也存在两个问题：

- 性能问题非常严重
- 稳定性不足，Node.js Module Stability 1

​

然后我们也尝试做了两版方案，来解决提到的这两个问题。
​

##### 编译时方案
首先是性能问题，我们通过编译器解决。我们自研了 TypeScript 的编译器 [mwcc](https://github.com/midwayjs/mwcc)，这里面用到了非常多的 TypeScript Internal Api。我们通过将所有函数的调用编译为带 bind 的调用方式，同时去生成正确的 `source map` ，从而得到一个可以正确被加载和调用的函数，也解决了性能问题。当然也存在一定的语法限制。
​

但最后我们还是放弃了这个方案。因为在 TypeScript 3.9 迭代到 4.0 的时候，TypeScript 4.0 出现了非常多的 breaking changes，然后内部的 API 改动也也非常大，我们已经改不动了，所以我们决定投入到第二版方案，运行时方案。
​

##### 运行时方案
这个使用了 Node.js 中的 `[AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage)` API。`[AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage)` 是 Node.js JS 为了专门解决请求上下文追踪难题或者用来做监控的一个模块，它性能比较好，然后也没有语法限制，API 也比较稳定。
​

然后在这之后我们也在积极参与社区。图里面其实是我们参与社区的例子，包含我们对 `[AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage)` 的反馈等，推进这个 API 达到稳定可用的状态。


在 Node.js 16.x 时，这个 API 正式落地了，目前是一个 Stability: 2 的稳定模块。整个过程略显繁琐，但其实也是我们在不断探索的一个过程，也是我个人加入 Node.js 社区的初衷。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641382722443-a9a9299d-db90-48c0-a7fa-5caf25672962.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=240&id=u22ad74d9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=240&originWidth=860&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22287&status=done&style=none&taskId=u74efdd24-7b62-4a6d-9b86-1f595a7b2f6&title=&width=860)
​

### 开发繁琐 - 全栈架构 & 简化调用
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641382775882-42ff3f7d-bff8-49ac-8920-30675db36558.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u5130fe18&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=330437&status=done&style=none&taskId=ue8bb05cf-da96-494f-a11f-15a570d7e90&title=&width=1920)
​

关于开发繁琐。其实大家可以看到你用传统的开发模式，去开发一个全栈应用或者云函数应用其实是非常繁琐的。你每一个云函数你都需要新建一个文件夹，需要拷代码，很难复用。你抽象成一个 npm 模块，你需要来回发布，也非常繁琐，并且前后端其实也是不连通的。
​

#### 全栈架构
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641382836854-d5e70214-d71a-4006-a4c6-b61267e81390.png#clientId=ua50d3a86-1e21-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uff02d7e2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226518&status=done&style=none&taskId=ud19d2296-ae9e-4692-9733-b6203549ade&title=&width=1920)
在这里，我们也推出了一个全新的架构模式，叫全栈架构。
​

这个就是目前我们内部使用一体化去开发的一个目录结构。可以看到与传统的方式完全不一样的是，`src` 目录内包含了云函数、小程序页面等前后端的资源。
​

这么做的好处其实有很多：

- 统一依赖管理：不再需要重复安装依赖了，你也不需要再复制粘贴文件了
- 统一工程配置：避免来回配置
- 共享 src：这个其实带来了非常大的一个想象力空间，你可以共享代码，你也可以共享类型。之前前后端那种分割的模式下，你每次需要手动生成类型的时代已经过去了，你们都在一起，为什么还要互相引用呢？为什么还要互相生成呢？直接引用就行，而且是最新的。

​

#### 云函数依赖管理
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641437162328-9089a894-d1cb-4c43-a712-8f1f7d506104.png#clientId=uf3597841-7d38-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uf4e611f0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=222456&status=done&style=none&taskId=u96bb403e-6df6-4846-bcb2-65b21b395e1&title=&width=1920)
针对这个目录结构，我们也做了非常多的优化，其中就包括依赖管理。
​

上图左侧是我们云开发目前的函数结构，我相信所有做过云开发用过函数的都知道，每个云开发函数都是一个单独的一个实例，它包含业务逻辑 / `node_modules` / `package.json`，每个函数都互相分隔开来。
​

这样做会带来以下的问题：

- 跨函数逻辑复用：比如说你要去检查用户是否登录，utils 的抽象复用，都会带来逻辑复用的问题
- 重复依赖：每个函数如果要用到 loadsh，就得重复安装
- 重复文件：package.json 等



针对这个问题，我们提出了新方案：一体化函数。
​

我们将函数以入口文件的方式做了隔离。简单来说，我们不再是像左边一样一个函数包含所有文件，而是只包含一个入口文件。
大家可以看到这边我每个函数都有一个入口文件， A 函数 / B 函数 / C 函数其实是可以引用公用的一些逻辑的，比如说有 `utils / model / service`， 然后共享同一份 `node_modules` 和 `package.json`。然后在打包的时候，我们在工程上做优化，而不是在你让你手动去做优化。


![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641437548770-a9ace070-37e9-400a-825b-94fbe4eaf553.png#clientId=uf3597841-7d38-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ucac89e3e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=318530&status=done&style=none&taskId=uf5511ab2-de4c-458e-858a-0234be92605&title=&width=1920)
​

在打包的时候，我们会根据每个函数入口文件去打包成一个函数，然后单独去做部署，相当于是说你在保留了应用开发的习惯之下，你同时拥有了函数的一个优势，而且不需要去做切换，也不会遇到刚才的那些问题。
​

在这一点，其实我们是使用了 vercel 的 [ncc](https://github.com/vercel/ncc) 。 [ncc](https://github.com/vercel/ncc) 有个最简单的解释： “Webpack for Node.js”。它是可以把一个函数的入口文件去打包成单独的一个 bundle 的，会把这个函数所引用到的各种的后端的一些模块，不管你是 `lodash` 还是相关的模块，它都会帮你打包在一起。这样做的话其实是可以保证说你每个函数入口文件都是一个单独的可以部署的一个 JS。
​

然后在这里其实我们也对新的方案做行了一个优化。在我们传统的一个打包方案过程中，我们打一次包其实可能会需要 20 秒到 30 秒，我们需要做非常多构建和优化的一些事情。压缩包也很大，然后解压后的体积也很大，启动时间也很慢。
而在单文件的情况下，我们不仅打包时间快，我们压缩包大小也小，我们解压体积也小。因为 Webpack 大家都知道它有 `Tree Shaking` 的功能，可以把一些用不到的模块给去掉，因为体积小所以启动时间也快。
​

通过这种方案，我们解决了云开发工程中资源机械组合的问题，但是我们觉得还可以再往前进一步。
​

#### 简化调用 - “零” API 实践
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641437750414-28882e68-6a81-4e60-8130-42dffe44e966.png#clientId=uf3597841-7d38-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ubfbf6d29&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=291301&status=done&style=none&taskId=uc3728742-aa13-4319-aceb-6b646c1cc04&title=&width=1920)
我们把后面进一步的实践叫：“零” API 实践。
​

刚才我说过共享 src 的代码其实有非常广阔的想象空间，想象空间就在于此。因为你共享代码之后，那么你调用函数或者接口，其实你不需要再去手动发请求，或者不需要再手动使用云函数的客户端。你只需要两步就可以完成整个调用。
​


1. 把你的函数从 API 目录里面导入进来，比如上图的 `getUserProfile` 函数
1. 调用函数，拿到返回值

​

在这个过程中，我们把原来传统的云函数的发布、调用、获取返回值的过程给精简化了。
为什么我们上一章会提到用 JavaScript 函数去写接口，因为这一章我们就要用 JavaScript 去调用。把云函数开发或前后端调用的过程中的胶水层给抹到 0。
​

然后这个就是我们一个核心的设计理念，“零” API。这样做的好处很多：

- 前后端调用的胶水层都被抹去了
- 通过  `useContext` 获取到请求上下文，调用接口函数和普通函数是一样的
- 前后端都使用 `Hooks` 的语法，前后端非常一致

​

简单且容易理解。
​

#### 简化调用 - “零” API 原理
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641439149042-739f5588-a2c2-4509-a5fd-91ddca951a6c.png#clientId=uf3597841-7d38-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ube3ccd29&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=378244&status=done&style=none&taskId=u6e561f43-3188-4da9-bd85-3ecf8803ad6&title=&width=1920)


整个方案的原理其实也很简单。
​

大家都知道前端工程里，我们会依赖 Webpack / `Vite` 此类的构建工具。我们可以通过 Webpack Loader 或者 Vite 的 Plugin 来对导入的文件做处理。
​

如上图所示，一个导入的函数，我们可以在 Loader 中，通过 [es-module-lexer](https://github.com/guybedford/es-module-lexer) 来解析导出的函数，最终构建出前端可用的 API Client。也就是说，前端在编辑器里面引入的是后端接口，但实际运行的时候其实已经被替换成了 API Client，从而可以正确的发起调用。


提一句题外话，[es-module-lexer](https://github.com/guybedford/es-module-lexer) 实际上也是个非常有趣的库，这也是 Vite 使用的底层库，用来分析导入导出的，大家有兴趣可以上 Github 看看相关文档和实现。
​

### 云平台锁定 - 跨云 & 多云适配
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641375322483-03ae465e-1d89-4d70-9d04-acb635ac30e2.png#clientId=u92a3224d-97c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=btR89&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=197252&status=done&style=none&taskId=u23ffa8f4-8c71-4793-8603-39ff5215426&title=&width=1920)


刚才我们有提到过云平台锁定，那么我们能不能去做一些多云的适配工作呢？其实是可以的。
​

#### 函数式 - 多云适配
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641440007270-a5cf856b-4310-45d4-b985-31137766166e.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u5473bbff&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=144106&status=done&style=none&taskId=u39192368-6982-4225-a343-a20d10b1627&title=&width=1920)
​

多云适配的原理比较简单。
​

我们针对不同的云厂商，开发了不同的 `adapter`，每个 `adapter` 负责如下的工作：

- 解析参数
- 调用函数
- 错误处理

​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641440271475-fae19f57-2198-4728-8da3-b4e7c3d17c5b.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u7e1edc1d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=256957&status=done&style=none&taskId=ud199ff9f-6170-453d-b85c-7ab9755d2e0&title=&width=1920)
​

上图中有 `adapter` 简单的示例。一个 `adapter` 接收 `fn` 和 `ctx` 两个参数，其中 `fn` 就是我要调用的云函数，`ctx` 则是调用的上下文。
​

关于 `ctx`，因为不同云对应的入参不一样，因此获取参数的方式也不一样，可以看上图。通过这种方式我拿到它的入参。当我们拿到入参的时候，因为之前提到过入参的格式是数组的话，其实是可以直接和后端参数映射上的。这种情况下，你前端传入的参数就是后端实际收到的参数，就可以实现跨云的一体化调用了。


#### 跨云原理 - 多云部署
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641440980703-21026d3c-21d5-49a3-a0f3-9f484e448e3b.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ud5d8d0c6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=142814&status=done&style=none&taskId=u498f4654-1c09-4bbc-a5ee-9bea27a097f&title=&width=1920)


同时多云其实还涉及到部署的问题。
​

上图是我们的部署产物的结构，包含：

- User Code：用户代码
- entry.js：云平台入口文件，不同云平台要求入口文件格式和导出方法不一致
- Args Adapter：云平台适配



这些构建产物可以去部署到不同的云平台，比如说我生成的是阿里云的部署结构，我就可以部署到阿里云生成到腾讯云的结构，我就可以部署到腾讯云，生成到自有服务的结构，就可以部署到自有的一个云平台，非常自由。
​

然后关于该方案其实后面还有很多可以做的事情，但基本原理就是根据不同云平台去生成适配代码，提交部署。而且适配代码大家可以发现是做的非常的轻量的，你不需要去关心特别多的事情，你只需要说去拿到参数，调用函数并返回即可。


#### 跨云 - 使用 Case
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641441573814-9aff9fde-1173-495b-b252-69a3703b1fac.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ud267f4a3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=190900&status=done&style=none&taskId=u8be8337c-3581-4892-b2ce-9214b5e7c3a&title=&width=1920)
这里我会列举一下跨云的使用 Case。
​

例如小程序 + 云函数的组合，去落地跨云方案时，其实是可以根据不同云平台去使用不同用的云函数的一些服务的。例如：

- 支付宝：支付宝小程序 + 阿里云 FC
- 微信：微信小程序 + 微信云函数
- 头条：头条小程序 + 轻服务

​

因为你的代码你不涉及到具体的后端服务，其实你在云平台上就可以部署和调用。
​

然后还有一点，是关于我们的内部场景，我们称为自建云服务，这个其实能做的事情就非常多了。我们开发的一体化应用，前端可以部署为 Web / 小程序 / Native 页面，后端也可以部署在自建的云服务 / FaaS / 裸机上的。在这种架构模式下，我可以在不同的前端源站及云服务间切换，不仅防止锁定，而且可以统一语法，降低学习成本。
​

这里其实也提到了一个很重要的概念，就是降低统一语法，降低学习成本。像之前社区有两个概念：

- Learn once write everywhere. 这个是 React 的理念
- Write once run everywhere. 这个是国内部分开源产品推荐的理念

​

而我们实际上更认可前者，学习一次在哪儿都能写。
## **iFashion 落地实践**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641450163664-726f1dd8-8fad-4037-9fc5-a1a354d99471.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u0deabe21&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=94163&status=done&style=none&taskId=ua685b71a-438a-4953-9e30-eacfc2e53e1&title=&width=1920)
在解决了上述的问题后，我们尝试在内部找了一个小程序 IFashion 做落地尝试。
​

### 项目概况
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641450206802-6b6ca26e-2cba-44c0-bee7-637ac917b875.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ua2a00316&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=977245&status=done&style=none&taskId=ufebff0d5-6d43-4661-b2d0-f07bf11eab1&title=&width=1920)
​

iFashion 是淘宝服饰的应用，也是我们内部流量非常大的一个小程序应用。
​

技术栈如下：

- Rax
- 阿里云定制版
- 构建工具 Web
- 投放平台：手淘小程序 & H5 页面（我们开发的应用会投放至全网。投放在手淘是小程序，投放在外部我们是 H5 页面）



前两年淘系前端在推动一个前端研发模式升级战役，在一体化方案推出后，iFashion 也希望使用一体化方案来去接入一个内部的云服务去提升效率。然后这一点就是我刚才提到的那个使用的 case ，如何去把这个服务去部署到自建云平台上。因为有些公司不会用公有云，它自己就有云服务（比如阿里、腾讯等云服务商）。
​

### Webpack 工程接入
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641450761016-b7cf1739-1417-45d4-a710-ab2ee60c4574.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ubf1162a2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=277942&status=done&style=none&taskId=uccd9acda-28e2-4250-b437-7eb2c5eb32d&title=&width=1920)
实际工程接入一体化应用需要解决几个问题，第一个就是如何接入 Webpack 的工程体系。
​

这一点其实非常简单。这一点我们开发了 Webpack Loader 和 Express（for webpack dev server） 的中间件，然后使用 Webpack chain 去快速接入原有的工程。
​

然后上图就是我们实际接入的代码，你通过这简单的几行代码，你就可以去接入一体化工程，成本很低。然后图中右侧就是我们实际的调用流程图。
​

### 一体化调试
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641451130067-8734040c-0498-4c7f-b49b-beb3b655a10a.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u225f63dd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=538411&status=done&style=none&taskId=u11d8de79-2940-4655-ae2f-1bf40d21829&title=&width=1920)
然后还有这部分是第二部分是关于一体化调试的，这部分也是目前我们做的觉得体验非常好的一个功能。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641451141085-ef279df7-7358-419d-acb8-2c9a8a3b38f0.png#clientId=u41bb3191-67d3-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u6d3da8f0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=376085&status=done&style=none&taskId=ub58bc81a-3143-4e31-bc3f-c1fd891350b&title=&width=1920)
这里我写了一个简单的工程，前后端代码分别如上图，功能也很简单，就是展示 [Rax](https://github.com/alibaba/rax) 和 [Midway](https://midwayjs.org/) 两个仓库的 Stars。


题外话 +1。大家看上图的后端代码，我第四行其实有个注释，这个给 Github 的 [Copilot](https://copilot.github.com/) 用的。整段 Demo 基本上是 Copilot 写的，在小 Demo 的场景非常好用。
​

然后下面是我们调试录制的视频。在一体化调试功能下，你可以在编辑器中，一次完成从前端到后端的全链路 Debug。
​

[![iShot2021-11-26-15.52.50-8476.mp4 (1.71MB)](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*NNs6TKOR3isAAAAAAAAAAABkARQnAQ)]()

> 一体化调试放大版

[![我的影片-1-9576.mp4 (687.29KB)](https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*NNs6TKOR3isAAAAAAAAAAABkARQnAQ)]()​

### 一体化发布
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641453450859-b85cf931-9fd7-459e-b0ec-9c7cfae86c4a.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u878b0cb1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=192870&status=done&style=none&taskId=u584f612f-c9c5-4003-a31a-8e4984d49b2&title=&width=1920)
关于应用的发布，我们也去定制了我们内部的发布工作流。
​

如上图所示。当我们在点击发布之后，我们 Workflow 会运行设定好的 steps ，去做不同的事情。
​

从源码检查开始，然后同时会进入一个并行的构建的过程。首先是前端进行构建，这种时候前端会进将它的产物进行一个上传和部署，你是网页就到 CDN，你是小程序就到小程序平台。然后也会对函数做一个构建和一个部署，去部署到相应的 FaaS 平台上或者多个云平台上。
​

构建完成，我们有一体化灰度和切流的节点。简单的说，相较于之前的前后端分开切流，中间需要配合不一样。我们在一体化切流的 workflow 中也做了非常多的一些定制，我们能保证整个应用现在按一体化的维度去做切流，新应用新接口，老应用老接口，新老接口不会串。我们认为这种是一种更简单的一种开发方式。


灰度完成后即正式上线。
### 提效 30%
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641454024070-cf8cee93-7cb1-49f5-b776-6533da51335b.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u38e2bfcd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=160280&status=done&style=none&taskId=uf8d70596-1c74-4138-b2a2-35b2d016c57&title=&width=1920)
这个是我们上线数据实测的结果。
​

图中上半部分，是我们之前在开发一个需求时，需要投入前端和后端两名同学，大概一起开发 13 个人日。
而图中下半部分则是使用一体化这种开发，只要投入一个人 + 10 个人日即可。
​

这个听起来有点不可思议。但是我们在内部大量的应用的实践的情况下，我们发现当你使用一体化这种开发的方式，你去开发一些简单或者一般的需求的时候，你完全可以实现节约人力投入且节约时间的效果。
​

因为在开发过程中，其实大家有做过前后端联调，都知道联调是非常繁琐的一个过程。联调 / debug /上线等待花费了很多时间，但可能你的改动就两行代码。因此在使用一体化的时候，你一个人开发，就可以大大加速整个流程。
​

## 总结与展望
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641454833942-39e57956-aca3-4331-8850-507a8ae26d93.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ude558a44&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=88465&status=done&style=none&taskId=u2f7ca88f-c686-47ec-80d0-ee3f35bd953&title=&width=1920)
最后一部分是总结与展望。
​

### 总结
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641454874186-2a127bdb-c647-4a51-81c3-33e6407fd9b6.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ucbedbe8e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=144322&status=done&style=none&taskId=ufcd25cf2-b7ac-4efe-9e82-68806ede601&title=&width=1920)


在跨端小程序方案中，我们去尝试引入云和一体化的开发方案来进一步为开发同学提效。
​

这一点其实也是我们架构团队一直在探索的，我们认为端侧红利及工程红利已经见顶的时候，有什么办法能进一步提高它的开发效率呢？
​

于是我们尝试了云和端的一个结合，这个也是我们未来非常重要的目标和方案，我们会尝试去更多的和云上的能力去做一个结合，而不仅仅是在端上去寻找更多的一些红利。因为你端上再怎么做，你还是需要那么多人。而你在云上做，你一个人做掉了反而可能效率更高，这是一个非常神奇的一个反应。
​

### 展望：云端融合
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641454996662-71ba633e-312f-4091-98e4-fd34f50f0d50.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u2c97806e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=391796&status=done&style=none&taskId=u73c9fa0f-bdd7-46f7-9988-9ed0faf695e&title=&width=1920)
在目前的场景中，我们也去加入了 TC 39，参与提案的讨论。
​

上图中有两个提案，一个是 [JS Module Blocks](https://github.com/tc39/proposal-js-module-blocks)，另外一个是衍生的提案 [JS Module Fragments](https://github.com/tc39/proposal-module-fragments)。我们更关注的是后者，因为这能为一体化应用带来更好的研发体验。 
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641455795449-1c68b3d8-e58f-4054-9196-ddebcbce9a80.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ub4a10d4e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=308542&status=done&style=none&taskId=uc87e7f7f-8292-4002-aa4b-1688cace31a&title=&width=1920)
上图就是我们基于 [JS Module Fragments](https://github.com/tc39/proposal-module-fragments) 写的 Demo。这里面我可以有一个叫 cloud 的模块，写一些后端的代码，我可以去引入微信的服务端的 SDK，可以去拿到微信的 `context`，我可以去获取它的 `OpenId`。同时我可以有一个 client 的模块，来写前端的逻辑。其中后端接口的调用可以直接从云端这个 cloud 这个模块导入。
​

可以发现在这个提案下，一个 JS 文件就包含了前端、后端两部分的代码，并且非常和谐。然后这个也是目前我们未来可能会去倡导的一个理念叫云端更加融合，更加一体化。
​

题外话 +2，云端一体在前端框架的趋势已经非常明显了，无论是 Next.js/Nuxt/Svelte Kit 或者是新出的 Remix 框架，大家都在更多地去结合云函数的能力，去提供服务 OR 实现 SSR。


然后目前我们也在和前端委员会的标准化小组去共同推进提案，这个是我们的反馈链接：[https://github.com/tc39/proposal-module-fragments/issues/14](https://github.com/tc39/proposal-module-fragments/issues/14)。
​

### 欢迎关注
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641456188061-2aade372-fc12-4057-8617-85af337605fb.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u7767f352&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=446001&status=done&style=none&taskId=u5967dfa1-6469-42ee-85af-83a487b9250&title=&width=1920)
整个一体化框架是基于 Midway.js 开发的，也欢迎大家多多 Star 或者 Watch 我们的 Repo，看看我们最近在搞什么新东西。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1641456238140-b8687011-6e65-4a0c-a707-06304794115f.png#clientId=u05debb1c-79cd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uf4353a2c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=245092&status=done&style=none&taskId=ua0120752-f63e-4dbb-8a7a-ae11515b564&title=&width=1920)
图中“**让 Node.js Web 开发更简单 & 有趣**”是个人的 Slogan，也是一直在努力的方向。
​

本次分享到此结束，谢谢大家！
