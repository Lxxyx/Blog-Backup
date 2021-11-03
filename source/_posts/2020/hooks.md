---
title: Midway Serverless - 新一代云端一体研发框架
tags: 前端
date: 2020-09-07 17:52:03
---

这是 Midway Serverless 体系在 8 月底位于 **阿里云云原生微服务大会 **对外分享的内容文字版，介绍了 Midway Serverless 全新的类 React Hooks 风格的 Serverless 开发方案，欢迎阅读和转发。<br />
<br />大家好，我是来自淘系技术部 - 前端架构团队的繁易，今天我要给大家来分享是《Midway Serverless，新一代云端一体研发框架》。向大家分享我们是在如何在开发过程中，打破云和端的那堵墙，从而去享受真正的云端一体应用研发。<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1gSdRjLzO3e4jSZFxXXaP_FXa-1920-1080.png)<br />

<a name="opePr"></a>

## 自我介绍

首先是个人介绍，我的花名叫繁易,目前就职于阿里巴巴-淘系技术部-前端架构团队，主要负责淘系前台业务的 Serverless 落地和前端提效战役，目前也在负责 Midway Serverless 框架云端一体场景的架构设计和落地工作。<br />![image.png](https://img.alicdn.com/tfs/TB1do91T1L2gK0jSZPhXXahvXXa-1920-1080.png)<br />

<a name="c3Sjg"></a>

## 大纲

本次分享我将会从以下 4 部分出发：<br />

- 阿里巴巴 Node.js Serverless 建设现状
- Midway Serverless 介绍
- 新一代云端一体研发方案
- 未来规划

<br />![image.png](https://img.alicdn.com/tfs/TB1hmr8knM11u4jSZPxXXahcXXa-1920-1080.png)<br />

<a name="eb87fd55"></a>

## 阿里巴巴 Node.js Serverless 建设现状

![image.png](https://img.alicdn.com/tfs/TB1PfCYT7L0gK0jSZFtXXXQCXXa-1920-1080.png)<br />
<br />在过去的 2019 年中，阿里经济体前端委员会提出了四大技术方向。分别是：

- 搭建服务
- Serverless
- 智能化
- Web IDE

<br />![image.png](https://img.alicdn.com/tfs/TB1SnvzkGNj0u4jSZFyXXXgMVXa-1920-1080.png)<br />

<a name="vsHGk"></a>

### Serverless 与前端

Serverless 首次作为一个技术方向，被列为前端委员会的主要攻关方向。这背后也是有一定原因的。<br />
<br />首先是在阿里巴巴集团，我们拥有 1600+ Node.js 应用，但应用常年的 CPU 利用率非常低，大部分 CPU 利用率 < 10%，甚至有 < 5% 的应用。<br />
<br />从技术视角来看，Node.js 的维护实际上是有一定难度的，在开发的过程中，我们会遇到非常多前端之前所没有处理过的问题。例如 Docker、限流、日志、跨语言调用等。而这一系列的难题则会带来非常高的成本。<br />恰巧的是，这些传统应用开发所会面对的一些问题，正好是我们函数开发中的优势。因为函数可以提高服务器的利用率，按量付费，也可以减少非常多不必要的运维成本。<br />
<br />而从业务视角来看，前端也提出了一些业务上的诉求。阿里巴巴是几年前开始了中台战略，并希望做到大中台小前台的目标，因此我们前端同学，也希望借中台服务来快速组合为各类业务接口，从而达到快速交付的目标。更快的完成业务需求和降低业务试错成本。<br />因此我们需要 Serverless 来赋能前端，让云原生给前端降本增效。<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1s4uRg7cx_u4jSZFlXXXnUFXa-1920-1080.png)
<a name="PXGBu"></a>

### Serverless 落地成果

经过大约一年的实践之后，我们也取得了一定的一些成果。<br />
<br />首先，我们在多个 BU 实现了 Serverless 的落地 ，平稳度过了双促。这些 BU 大家可能也都很熟悉，比如：淘系、新零售、飞猪、ICBU、天猫精灵等。<br />
<br />而在业务增效降本上，Serverless 也有亮眼的表现。<br />
<br />在机效方面，我们传统业务机器成本降低 ~**30%**，而中后台业务机器成本更是降低 ~**87%**，Serverless 帮我们节约了成本的同时，也一定程度上解决了服务器利用率低下的问题。<br />在人效方面，使用函数整体人效提升 ~**48%。**这部分是我们根据用户使用工具埋点 + 调用时长 + 代码量测算得出。<br />
<br />最后则是 Serverless 整体架构经过了双促的验证，零故障。有力的证明了 Serverless 架构的稳定性。![image.png](https://img.alicdn.com/tfs/TB1R_oqhMgP7K4jSZFqXXamhVXa-1920-1080.png)
<a name="dvmbQ"></a>

## **Midway Serverless 体系介绍**

![image.png](https://img.alicdn.com/tfs/TB1Ku2qlz39YK4jSZPcXXXrUFXa-1920-1080.png)<br />我们在整个 Node FaaS 落地的过程中，都是基于我们 Midway Serverless 框架去开发的。所以在讲述云端一体前，我还会向大家介绍一下整个 Midway Serverless 的体系。<br />

<a name="rRqhR"></a>

### 简介

下面我们以请求调用为例，大家可以看到请求处理的过程中，云开发平台的 Runtime 会加载 index.js，而 index.js 又会执行我们的 Midway Serverless Framework，最后再由框架去执行用户代码，返回结果。<br />![image.png](https://img.alicdn.com/tfs/TB1TQ2aT7T2gK0jSZFkXXcIQFXa-1920-1080.png)
<a name="kAYM2"></a>

### 体系

而在整个 Midway Serverless 的体系里面。我们一共有以下三个部分：

- 工具链
- 框架
- 标准化

<br />首先是工具链，我们在本地工具链这边做了非常多的事情。包括本地触发器的模拟、调试、一体化、多平台的发布等。

第二部分则是框架，包括数据模拟、环境配置、请求适配、组件拓展、IoC 等。这部分都是希望开发者可以更方便的去开发应用<br />
<br />最后一个则是标准化。目前云厂商在 Serverless 标准层面是割裂的，而我们则希望一定程度上的去解决这个问题，比如我们推出的 yml 标准、前端调用标准，运行时标准、一体化标准。这一切都是希望大家在 Serverless 时代能更好的去利用 Serverless 的红利来加速开发。

![image.png](https://img.alicdn.com/tfs/TB1M66Yg5pE_u4jSZKbXXbCUVXa-1920-1080.png)<br />

<a name="DSWV0"></a>

## **新一代云端一体研发方案**

**![image.png](https://img.alicdn.com/tfs/TB1.E2zkGNj0u4jSZFyXXXgMVXa-1920-1080.png)**<br />这部分我们将会向大家介绍新一代一体化云端一体研发方案，至于为什么是新一代，这儿先卖个悬念，后面会提及。

<a name="PzYMl"></a>

### 我们遇到的问题

在阿里巴巴实践 Serverless 并不是一帆风顺的，我们也遇到了许多难题。<br />
<br />首先是上手难度高的难题，因为 Serverless 虽说把运维的成本降低了，但是你在开发一个应用时，需要去接触后端，相比于传统的前端开发来说，难度是升高的。

其次是前后端割裂的问题，我们现阶段主要在负责纯函数的开发。从代码层面来看，就是前端是一个仓库，后端是另外一个仓库，前后端分开开发与发布。虽然都是一个人在做，但依然会有比较强的一个割裂感。<br />
<br />最后则是研发成本高问题，上面提到前后端割裂的问题，当你前端和后端在不同的仓库时，意味着你需要分开发布，并且多次联调，这部分带来的研发成本是偏高的。

带着这些问题，我们经过了大约一年的思考与探索，推出了我们自己的解决方案：云端一体应用开发模式。

![image.png](https://img.alicdn.com/tfs/TB1xD6jTVP7gK0jSZFjXXc5aXXa-1920-1080.png)
<a name="jAh0G"></a>

### 云端一体在社区的定义

云端一体这个概念并不是一个新词，近期在社区也很常见。而在社区的视角上，关于云端一体主要有以下两种定义。

<a name="JjGDz"></a>

#### 架构视角

第一种是架构视角出发的。他们所认定的云端一体，是云服务和端侧技术能够结合在一起使用。比如说前端使用 BaaS 服务进行开发，他们把这种开发模式就叫云端一体。

<a name="HK9Ru"></a>

#### 代码视角

另外一种是从代码视角出发，当前后端同仓库时，我们通过 monorepo 等工具进行开发，也被称之为云端一体。<br />像下图中展示的就是一种比较经典的研发模式。Server 端与 Web 端分别是一个文件夹，双方管理自己的依赖，一同开发与一同发布，这种也称之为云端一体。

但是我们在去年调研方案时，我们觉得这两种方向，只是机械的将资源组合在一起，并没有发挥出 JavaScript 统一前后端的优势。

![image.png](https://img.alicdn.com/tfs/TB1GUP8knM11u4jSZPxXXahcXXa-1920-1080.png)

<a name="wcL0z"></a>

### **Midway Serverless 的云端一体方案**

对此，我们也提出了自己的云端一体解决方案。新方案的定义为：云端协同开发、无缝融合。

然后在下图有我们方案的一个目录结构。在新方案中，前后端是在同一个仓库里的，而且前后端只需要管理一份依赖。这么做有以下几个好处：<br />

- 易于开发：前后端在一个仓库里，只需要管理一份依赖。可以降低开发时的心智负担
- 易于维护：前后端都在一起的时候，功能是一同开发一同管理的，可以提升项目的可维护性
- 易于部署：前后端都是一个仓库，在一次发布中，我们可以同时发布前后端，降低部署的成本

![image.png](https://img.alicdn.com/tfs/TB1emjcT4v1gK0jSZFFXXb0sXXa-1920-1080.png)

<a name="TcyTz"></a>

## Midway Serverless 云端一体特性

我们这次推出的云端一体方案，主要有以下 4 个特性：

- 函数式研发（_Functional R&D Solutions_）：函数即接口。我们通过函数来统一前后端的体验，减少不必要的样板代码，加速应用研发
- 一体化调用（_Api not required_）：从此不再手动调用 Api。在新框架中，你可以直接从服务端导入函数并调用，就像调用普通函数一样简单
- Hooks（_Using Node.js like React Hooks_）：通过 Hooks 开发 Node.js 应用。是全新的体验，也是你熟悉的语法。更为函数式开发带去了完善的能力支持
- 渐进式开发（_Progressive development_）：简单和复杂场景通吃。通过对于 IoC 的支持，我们可以复用阿里 Node.js 复杂应用最佳实践，支撑企业级应用开发

**<br />**![image.png](https://img.alicdn.com/tfs/TB1oq5Zh6MZ7e4jSZFOXXX7epXa-1920-1080.png)\*\*<br />

<a name="iRrxS"></a>

### 函数式研发：Functional R&D Solutions

<a name="54leS"></a>

#### 当前云厂商接口开发模式

在当前的云厂商提供的 Serverless 服务中，不同云厂商的接口开发方式是不一样的。

比如说阿里云，腾讯云、AWS 这三个云平台，他们都有着不同的入参。而不同的入参意味着需要开发者去自行了解各个平台间的差异，学习成本高。

我们在经过思考之后，觉得这种开发模式所带来的成本太高了，那么有没有一种更简单的方式呢？<br />![image.png](https://img.alicdn.com/tfs/TB1CxkvgmslXu8jSZFuXXXg7FXa-1920-1080.png)<br />

<a name="ap0mW"></a>

#### 用最简洁的方式开发接口

答案是有。<br />
<br />我们发现，其实使用原生的 JavaScript 函数，就可以实现我们的目标。以下图为例，左边的是 Get 接口的开发方式，右边的是 Post 接口的开发方式。

当函数没有参数时，则接口的 HTTP Method 为 Get，而当接口需要传参时，它就是一个 Post 接口，整个开发方式是自然且完全对齐 JavaScript 函数开发体验的。

像写 JavaScript 函数一样写接口。

![image.png](https://img.alicdn.com/tfs/TB1pODpkBBh1e4jSZFhXXcC9VXa-1920-1080.png)
<a name="VbkoK"></a>

#### 函数元信息

使用 JavaScript 函数，是可以描述函数的信息的。<br />
<br />JavaScript 函数与接口元信息的映射关系如下：

- 路径：文件名 + 函数名
- HTTP Method：函数是否有参数
- HTTP Request Body：函数参数

<br />通过这种方式，我们使得函数元信息能转换为接口的信息，来进行 HTTP 服务的开发。<br />![image.png](https://img.alicdn.com/tfs/TB1HGXSjLzO3e4jSZFxXXaP_FXa-1920-1080.png)

<a name="F7koC"></a>

### 一体化调用：Api not required

我们通过函数自身的信息，来生成接口的信息，这中间实际上包含了一个转换的过程。如果要让开发者手动拼接路径，调用函数，那无疑是一种倒退。<br />
<br />接下来展示的一体化调用则会向大家展示我们是如何解决这个问题，充分发挥函数的优势。<br />

<a name="7WWxC"></a>

#### 重塑接口调用体验

在过往的开发中，我们要完成接口的请求，总是需要手动去拼接参数并且调用，整个过程显得繁琐不堪。<br />而在云端一体的开发场景下，我们希望重塑整个接口的调用体验，真正做到云端融合，忘记 Api 和 Ajax 调用。<br />

<a name="S6bX6"></a>

#### 一体化调用：最简单的接口请求方式

我们选择使用函数开发接口，是为了实现一体化调用。

所谓一体化调用，就是在接口的调用过程中，我们不再手动调用 Ajax 与 Api，而是直接通过 JavaScript import 的方式，导入函数并调用。<br />
<br />调用接口，就和调用普通函数一样简单。<br />

> Get 接口调用

![image.png](https://img.alicdn.com/tfs/TB1DXnjT1L2gK0jSZFmXXc7iXXa-1920-1080.png)

> Post 接口调用

![image.png](https://img.alicdn.com/tfs/TB1HelVicVl614jSZKPXXaGjpXa-1920-1080.png)<br />和普通函数一样写接口，也和普通函数一样调接口，从此忘记 Ajax 和 Api 调用。<br />

> 前后端调用示例

![image.png](https://img.alicdn.com/tfs/TB1FNy9TWL7gK0jSZFBXXXZZpXa-1920-1080.png)
<a name="4qbQ2"></a>

#### 实现原理

一体化调用的实现原理并不复杂，我们基于 Webpack 和 Babel 开发了编译插件，将前端对于函数的引用转换成了 HTTP 的请求。<br />
<br />具体的可以看下图：<br />![image.png](https://img.alicdn.com/tfs/TB1Foq_TYr1gK0jSZFDXXb9yVXa-1920-1080.png)<br />

<a name="Eyscw"></a>

### Hooks：Using Node.js like React Hooks

<a name="smHj8"></a>

#### 为什么会有 Hooks

在传统的 Web 应用开发中，我们需要的不仅仅是函数参数，还包括非常多的请求上下文信息，例如请求的 Header、Method 等。

但在一体化调用中，由于接口也是通过 JavaScript 函数开发，因此无法获取到请求上下文的信息，也不能通过参数手动传入（因为会损害调用体验，前端也无法传入上下文参数）

![image.png](https://img.alicdn.com/tfs/TB1yP9YT7L0gK0jSZFtXXXQCXXa-1920-1080.png)

<a name="i2SAm"></a>

#### 通过 Hooks 获取请求上下文

我们在借鉴和吸取了 React Hooks 的经验之后，决定通过 Hooks 去解决获取请求上下文的难题。

整个 Api 非常简单：

```typescript
const ctx = useContext();
```

![image.png](https://img.alicdn.com/tfs/TB1d3Ypf0Tfau8jSZFwXXX1mVXa-1920-1080.png)<br />通过 useContext 这个 Api 与 Hook 的开发方式，带来了以下三个好处：

- 解决了在函数中获取请求上下文的难题
- 无需手动传入参数，不损害调用体验
- 遵循 React Hooks Style 的开发方式，云端一体融合不仅仅是项目目录结构与接口调用的融合，更是开发心智的融合

<br />下面是一些简单的示例：<br />![image.png](https://img.alicdn.com/tfs/TB1sqHjT1L2gK0jSZFmXXc7iXXa-1920-1080.png)<br />通过 Hooks 的方式，我们可以像写 React Hooks 一样去开发 Web 服务。<br />

<a name="b1uaG"></a>

#### 可复用的 Hooks

在 Hooks 的开发中，我们也支持将复杂或重复的逻辑，提取成单独的 Hooks 并进行复用，从而减少重复性的劳动。<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1PWTjT1L2gK0jSZFmXXc7iXXa-1920-1080.png)
<a name="u2GSh"></a>

#### 实现原理与性能问题的解决

在实现 Hooks 语法的支持时，实际上是存在一波三折的。<br />
<br />在社区上，Node.js 官方提供了 Async Hooks 这个模块，可以用于模拟实现请求上下文的传递功能。但该模块也存在两个问题：

- 模块 Api 不稳定
- 性能问题严重

<br />其中，第二个问题是我们弃用该方案的直接原因，具体的 Benchmark 可以看下图：<br />

> Async Hooks 所带来的性能损耗十分惊人

![image.png](https://img.alicdn.com/tfs/TB1OCiRg7cx_u4jSZFlXXXnUFXa-1920-1080.png)<br />因此，我们尝试另辟蹊径，通过在工程上预编译的方式，来实现 Hooks 的开发与请求上下文的传递。<br />
<br />编译原理并不复杂，主要是以下两点：

- 获取请求上下文：转换为对 `this` 的引用
- 调用 Hooks：转换为 `bind` 调用，将 `this` 传递下去

<br />通过这种方式，我们在函数间对于上下文与 Hooks 的引用，串成了一条完整的调用链。而 bind 操作所带来的调用开销完全是可接受的。<br />
<br />由于我们是使用的 TypeScript，在编译过程中对于源码的更改会影响到 Source Map 的生成，因此我们也自研了 Midway 的编译器 mwcc，不仅解决了 Source Map 生成等问题，更是提供了类似于 Babel + Babel Traverse + Plugin 的开发体验，有兴趣的同学可以自行了解一下~<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1TT2Yg5pE_u4jSZKbXXbCUVXa-1920-1080.png)<br />

<a name="krI6U"></a>

### 渐进式开发：Progressive development

阿里在落地 Node.js 时，会遇到非常多复杂的业务场景，这部分将向大家介绍我们在 Node.js 企业级应用开发的实践与解决方案，及在函数式开发的场景下，如何复用这部分最佳实践。<br />

<a name="Qxh9A"></a>

#### 阿里巴巴企业级 Node.js 应用开发实践

在设计整个 Midway 框架时，我们一直在思考一个问题：“用什么方式解决复杂业务问题”？而我们给出的答案是参考软件设计的经典原则：[SOLID 软件设计原则](<https://zh.wikipedia.org/zh-hans/SOLID_(%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1)>)与其中的[依赖倒置原则](https://zh.wikipedia.org/wiki/%E4%BE%9D%E8%B5%96%E5%8F%8D%E8%BD%AC%E5%8E%9F%E5%88%99)。

同时我们也参考了诸多业界的实践，发现成熟的 IoC 设计已经能够解决复杂业务的问题，包括 Java 的 Spring、JS 社区的 Nest.js/TypeOrm 等，都采用了基于 IoC 的实现方式。<br />
<br />因此，我们决定通过自研的 IoC 框架，作为 Midway 体系的核心去解决复杂应用的维护问题。<br />
<br />而函数式研发作为 Midway 体系的一种解决方案，因此在设计之初我们就考虑了函数与 Midway IoC 体系的融合，使得函数式研发可以复用 IoC 的最佳实践。<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1erDjT1L2gK0jSZFmXXc7iXXa-1920-1080.png)<br />

<a name="K3AJK"></a>

#### 函数式与 IoC 的结合

这儿我们依然通过 Hooks 来解决这个问题。<br />
<br />我们提供了 `useInject` Api，通过这个 Hooks 在函数中来使用 IoC。<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1X.1VjlFR4u4jSZFPXXanzFXa-1920-1080.png)<br />
<br />通过这种方式，我们实现了函数式与 IoC 的无缝结合，从简单到复杂场景都能处理。<br />

<a name="XNx2f"></a>

### 内部落地情况

Midway Serverless 的云端一体方案在对外发布前，在阿里内部实际上已经探索了有大半年的时间。<br />
<br />项目时间轴如下

- 2020.02：Idea 提出 & POC 演示
- 2020.03：核心功能确认 & Api 确认
- 2020.04：首个业务落地
- 2020.05 - Now：多个业务落地并使用，持续迭代中

> 内部落地的 BU

![image.png](https://img.alicdn.com/tfs/TB1g35YT4z1gK0jSZSgXXavwpXa-1920-1080.png)
<a name="ygwot"></a>

## 未来展望

<a name="FMkFw"></a>

### 开源

目前 Midway Serverless 的云端一体方案已正式对社区发布并可用，大家可以进入 Midway Serverless 的 [Github 仓库](http://gitlab.alibaba-inc.com/midway/midway)，[查看云端一体方案的文档与使用方式](https://www.yuque.com/midwayjs/faas/quickstart_integration)，觉得好用的话记得点个 Star 哦~<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1ctBSjLzO3e4jSZFxXXaP_FXa-1920-1080.png)
<a name="tOn3b"></a>

### 未来：多场景落地

在阿里巴巴内部，我们主打的是中后台与移动端的场景，但实际上这套方案是可以用于多场景的。因此在未来，我们希望能投入到开源，结合前端框架、SSR、小程序等各种场景并落地。<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1XcO3T.z1gK0jSZLeXXb9kVXa-1920-1080.png)<br />这部分是我们未来的一个规划，也欢迎大家来参与[开源](http://gitlab.alibaba-inc.com/midway/midway)，提交 Idea 与代码。一同去打造更优秀的研发体验。<br />![image.png](https://img.alicdn.com/tfs/TB1ctjjT1L2gK0jSZFmXXc7iXXa-1920-1080.png)
