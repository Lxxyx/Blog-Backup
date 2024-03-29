---
title: Midway & 一体化 3.0 ：新语法 & 新路由 & 新全栈套件
tags: 前端
date: 2022-02-10 16:45:05
---

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644474071183-60908470-8b3c-44a9-8a18-973d47de743a.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=ude3606ba&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=176725&status=done&style=none&taskId=u1bebb02d-c2b9-468f-b15b-3cced1953d5&title=&width=1920)
在刚过去的 2022 年 1 月，我们如约带来了 Midway 冬季直面会的直播，并正式发布了 Midway & 一体化 3.0 版本，下面是冬季直面会现场发布内容的文字稿。
​

# Midway 3.0
首先将给大家介绍的是 Midway 3.0 的相关内容。
​

## 3.0 版本发布
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644474140850-f23c6d28-d8fb-41a4-8169-a9909c7e9b9d.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uut0R&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=137960&status=done&style=none&taskId=u628f488a-8bd6-4efa-a9f7-885b3b1d906&title=&width=1920)
去年的秋季发布会时，我们介绍了 Midway 3.X 预览版本中的新功能。
​

而在这几个月中，我们一直在对 Midway 3.X 的功能进行迭代与完善，并且不断有同学通过微信、钉钉、Issue 等渠道来关注我们 3.X 的进度。
​

而在本次冬季直面会中，我们非常高兴的告诉大家，在 2022.01.20 这天，Midway 3.0 正式发布了，相关新功能可以参考：[Midway v3 新功能预览](https://www.bilibili.com/video/BV1aL4y1p7oA?from=search&seid=8235946720906913847&spm_id_from=333.337.0.0)。
​

## 官网支持多版本文档
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644474447060-b4170c94-1a34-4849-bd96-b96533dd7e78.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u64cd0c97&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=306302&status=done&style=none&taskId=ub2c58235-a44c-4ce7-85c5-84fa375e6b1&title=&width=1920)
我们也对 Midway 的官网进行了更新。在新版本中，我们支持了多版本的文档，大家可以在网页右上角切换版本来查阅相关文档。
​

Midway 3.0 发布了，官网文档默认以 3.0 为主。
​

## 技术栈明确
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644474515285-b8a96015-64fe-44ec-a187-e94782b5b809.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u06e5a1a0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=129273&status=done&style=none&taskId=u43550f84-393b-48f8-bce0-6eca0a25138&title=&width=1920)
在 3.0 发布后，Midway 在不同场景的技术栈也愈发明确。
​

第一部分是标准项目，使用 `Class + IoC` 的技术栈，来承载传统 Node.js Web 项目的开发。
第二部分是 Serverless 项目，我们支持了阿里云 / 腾讯云等云厂商，同时我们也在积极接入 KNative 原生的基建。
第三部分是一体化部分，是从传统的 Node.js Web 工程孵化出的创新模式。它主要支持前后端一体化融合的开发方式，并且在前后端都使用了函数式去进行开发，去给大家带去一个不同的体验。今天也将在后面发布 Midway 一体化 3.0 的相关内容。
​

## 感谢参与开源
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644474791627-2293c387-07fb-4e77-aa56-a497ac534bc3.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uf5cf5cea&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107892&status=done&style=none&taskId=u2f896a6a-9351-47ae-943d-e862bc3a332&title=&width=1920)
同时在过去的一年中，我们发现有很多的小伙伴给我们提交过 PR，非常感谢这些同学。我们深知，所有的开源项目，不论大小都是从一点一滴开始做起的。
​

为了感谢这些给我们提交 PR 的同学，我们也准备了一些精美礼品，如果大家在 2021.01.01 - 2021.12.31 期间有给 Midway 提交过 PR，欢迎扫码或访问 [礼品问卷](https://survey.taobao.com/apps/zhiliao/vDoGO5p27) 提交信息，我们将及时寄出礼品。
​

## 信息同步
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644474966144-9b667152-e261-408c-b013-be223db8d8c8.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u2c20adcb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96860&status=done&style=none&taskId=u3e4592b1-5ecb-4d0f-947f-811382c7536&title=&width=1920)
在接下来的一段时间，我们会主要完成以下三件事情：

- 提供 Egg 模版
- 【年后】提供 Open telemetry 的集成方案
- 【年后】阿里内部版本同步

​

# 一体化 3.0
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644475221260-998da023-6e57-4fdf-836b-a6f7b7e7d928.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u60af5d9c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=99017&status=done&style=none&taskId=u1cf0c03c-bba0-4d71-827b-c53c2b8b4b4&title=&width=1920)
在本次直面会中，我们也将为大家带来全新的一体化 3.0 内容。
​

Midway 一体化 2.0 于 2021 年的 3 月份发布，截止至发布会当日已经有差不多 9 个月，这段时间我们一方面是在内部做了大规模的落地实践，同时我们也在不断的探索，去研究社区的新方案，思考一体化未来的演讲方向。
​

在经过 9 个月的探索后，我们决定推出全新的一体化 3.0 版本，包含新语法、新路由设计、新全栈套件三部分功能。
​

## 现状
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644475408601-679b8327-c7f8-49be-91e1-d2677d512267.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1120&id=u58cd2737&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1120&originWidth=2437&originalType=binary&ratio=1&rotation=0&showTitle=false&size=190317&status=done&style=none&taskId=uf9ba5848-518d-48c3-9fde-9505305ce54&title=&width=2437)
Midway 一体化方案的想法诞生于 2020 年的 2 月份，并于同年的 4 月份在内部正式发布。
​

截止至发布会当日（2021.01），目前已经有超过 2800 个应用是基于 Midway 一体化方案开发的，目前一体化也已成为了阿里前端的主流研发模式之一。
​

## 新语法
一体化 3.0 的首要革新在于 API 语法。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644476536209-0641724c-7b2b-4388-ae4e-cfb3a78ee48b.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1196&id=u539fc3b3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1196&originWidth=2532&originalType=binary&ratio=1&rotation=0&showTitle=false&size=475570&status=done&style=none&taskId=u789093f6-dd6f-4c4d-abf1-7288c2c1b2f&title=&width=2532)
上图是 2.X 版本的语法，在 2.X 版本中，我们通过 `函数即接口`、`“零”API 调用`、`文件系统路由`三个理念设计了整套语法。
​

在 2.0 的语法中，我们牺牲一定的功能性，换取接口开发的便利性。以 `Http Method` 为例，上述的接口实际上只能描述出 `Get / Post` 两种 Method，对于 `Put / Delete` 等支持则无能为力。
​

### 3.0 语法
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644476526086-a04b4cd9-b327-4bb6-9371-cdb8070903ec.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1196&id=uef9cce48&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1196&originWidth=2550&originalType=binary&ratio=1&rotation=0&showTitle=false&size=367126&status=done&style=none&taskId=u9fd2fb35-3afe-40b1-8424-a56b541e13c&title=&width=2550)


在 3.0 中，我们则**重新设计了整套语法**，在保留`函数即接口`、`“零”API 调用`的特性之上，全面增强了功能性。


一个 API 接口由以下部分组成：

- `Api()`：定义接口函数
   - `Get(path?: string)`：指定 Http 触发器，此处指定请求方法为 GET
   - `Query<{ page: string }>()`：操作符，声明前端传参或执行自定义逻辑
   - `Handler: async (...args: any[]) => { ... }`：用户逻辑，处理请求并返回结果

​

同时我们也支持了`“零”API 调用`的特性，你依然可以在前端直接导入函数并调用，我们的 SDK 会自动将你的请求转换为正确的格式。
​

### Http 触发器
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644476775964-c29a0a78-5aad-4e50-814d-60252c0cff3a.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1204&id=ufdcf5abe&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1204&originWidth=1678&originalType=binary&ratio=1&rotation=0&showTitle=false&size=419495&status=done&style=none&taskId=u2dee286a-24fb-4f8d-a144-19203e4101c&title=&width=1678)


得益于新的语法设计，我们支持了全系列的 Http 触发器，同时也支持用户指定路径。


新功能下，对于类似 OAuth2 的场景是非常有用的，你可以非常方便的指定接口地址，并完成认证逻辑的开发。
​

### 更多触发器的支持
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644476812309-fe283073-4b32-49de-91cc-eee79b12f351.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1146&id=u1b7a07ef&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1146&originWidth=2473&originalType=binary&ratio=1&rotation=0&showTitle=false&size=285850&status=done&style=none&taskId=u3997a0bd-2bc6-4741-9f7d-8c319756a4b&title=&width=2473)
在新语法的加持下，我们也实现了更多触发器的支持，如上图展示的定时器、OSS 回调等，在 3.0 中都可以非常容易的实现。
### 操作符
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644476948755-213f56b3-c775-44ac-9187-ff48750f679b.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1152&id=ue6ad7415&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1152&originWidth=2517&originalType=binary&ratio=1&rotation=0&showTitle=false&size=260596&status=done&style=none&taskId=u186c3737-9c57-491c-91c9-7b5e35e21a6&title=&width=2517)
操作符（Operator）的设计是一体化 3.0 的核心，我们通过操作符的使用、组合来拓展 Api 的功能。
​

操作符一共支持以下 3 种功能：

- 声明：声明前端传参的类型，如 `Query/Params/Header`
- 定义：定义函数元信息，如 `Middleware`
- 执行：控制函数执行流程，如 `Validate/HttpCode/Redirect`

​

我们在上图中提供了一个复杂的例子，如果在传统的一体化中，要实现上述的功能会将逻辑写的非常复杂，容易出现面条式的代码。而在 3.0 中，你通过操作符的组合就可以实现了。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644477418686-f4d86bb4-c01d-4575-82d7-0dd1fc9cc281.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1165&id=uf921217b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1165&originWidth=2479&originalType=binary&ratio=1&rotation=0&showTitle=false&size=326568&status=done&style=none&taskId=u79241baa-1cea-4d31-8fab-4fc5fbdc124&title=&width=2479)


同时，我们依旧保留了简洁的`“零”API 调用`。
​

#### Request & Response
我们提供了一系列的内置操作符，来帮助开发者快速完成常见功能的开发。
​

以 Request 操作符为例，你可以通过 `Query / Params / Headers` 操作符来声明前端需要传入的类型，在使用`“零”API 调用`时，我们会将其转换为正确的结构体。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644477564078-645b27d8-a8f2-4cf0-b33a-fe10e9e74c97.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1240&id=u0337b112&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1240&originWidth=2485&originalType=binary&ratio=1&rotation=0&showTitle=false&size=376616&status=done&style=none&taskId=u3991431d-5a04-4838-afa2-35b0be104f8&title=&width=2485)


我们也提供了 Response 相关的操作符。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644477729016-a22e5e26-c8de-4306-9008-6589e0ce6a02.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1060&id=u6d48c9c0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1060&originWidth=2429&originalType=binary&ratio=1&rotation=0&showTitle=false&size=259330&status=done&style=none&taskId=ua7aa7a9b-69c9-4aa7-a28e-a1407ad5809&title=&width=2429)


#### Middleware
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644477825252-069a9e34-ffe4-4a62-9173-426c8f3d0005.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1201&id=uffc106a2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1201&originWidth=1503&originalType=binary&ratio=1&rotation=0&showTitle=false&size=250489&status=done&style=none&taskId=u65dc1997-8106-493b-a620-78d8e48dd0f&title=&width=1503)
我们也支持使用 `Middleware` 操作符来定义中间件。


#### Validate & ValidateHttp
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644478373212-7c87826d-0ee9-4792-8cc6-7bd31e48e5fa.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=977&id=u2dbc8c49&margin=%5Bobject%20Object%5D&name=image.png&originHeight=977&originWidth=2385&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219104&status=done&style=none&taskId=u67214f78-ab40-4441-8199-1418051ce7a&title=&width=2385)
参数校验是我们在 3.0 中着重实现的功能，其中一体化默认使用 [Zod](https://www.npmjs.com/package/zod) 作为校验库。你可以通过 `Validate(...schemas)` 来校验用户入参，如上图所示。


这是一种非常自由的用法，当你不使用 Validate 校验器时，你实现了静态类型安全，前后端基于 TypeScript 的类型系统，确保安全性。
​

而当你使用 Validate 校验器时，你实现了运行时安全，在不损失前后端调用体验的同时，校验器会校验用户入参是否正确。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644479873310-acca5ea3-7e49-4560-9b5b-a536065e17bb.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u88b09356&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=350507&status=done&style=none&taskId=u8d556dd0-0a53-4ebe-9d63-fcd31b0f90c&title=&width=1920)


如上图所示，同时我们也支持了 Http 结构的校验，
​

基于 [Zod](https://www.npmjs.com/package/zod) 对 TypeScript 的良好支持，你可以在编写 Schema 时直接获得推导的类型。
​

### Prisma ORM
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644479977737-296f4f08-d68b-4a00-aa42-94b17f6cc844.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1197&id=u6a678fde&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1197&originWidth=2554&originalType=binary&ratio=1&rotation=0&showTitle=false&size=351336&status=done&style=none&taskId=uf2e8c4a2-f4a6-4d45-835e-1725f2446e4&title=&width=2554)
[Prisma](https://www.prisma.io/) 是为 Node.js & TypeScript 而生的 ORM。简单来说就是，你可以通过编写数据库的 Schema（也可以基于当前数据库结构自动生成），来自动生成 ORM Client。
​

因为 ORM 是生成的，因此无需用户手动定义 Model，并可以获得完善的 TypeScript 支持。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644480171119-fc4fa7e5-6785-4d0b-b34e-240c1e66fbbb.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uf25edeb9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=365328&status=done&style=none&taskId=u88fced1f-6e94-425c-aae4-5ffe5bac871&title=&width=1920)
基于 Prisma 的特性与 Validate 校验器，我们可以实现类型安全 + 运行时安全的方案。
​

这个方案成本足够的低，不仅在编程时通过静态的类型信息确保安全性，也通过校验器在运行时保障安全性，并且带来了极其流畅的开发体验，前后端全链路紧密的联系在一起。
## 新路由
在 3.0 中，我们也设计了全新的路由机制。
​

### 2.X - 文件路由机制
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644480496386-89d8ddcf-4cff-4d74-b330-08129ca48e6f.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1240&id=ue639828d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1240&originWidth=1654&originalType=binary&ratio=1&rotation=0&showTitle=false&size=273169&status=done&style=none&taskId=u30ea32ba-70f3-4a2c-8d6a-2af226dc39c&title=&width=1654)
在 2.X 版本中，我们使用文件路由来作为默认的路由机制，文件系统路由是基于约定的，易于理解，但也存在强依赖于文件系统、规则较多的问题。


### API 路由
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644480621525-15d679c9-ac71-40ba-84da-e12cae371bde.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1221&id=u9eb8db0d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1221&originWidth=2375&originalType=binary&ratio=1&rotation=0&showTitle=false&size=295665&status=done&style=none&taskId=u74d636fc-f71d-4fc2-b280-61aa7402cb3&title=&width=2375)
在 3.0 中，我们极大的简化了整体的路由机制，分为以下两种策略：

- 不指定路径：使用函数名 / 文件名（默认导出的情况下）来生成路由
- 指定路径：使用指定的路径，支持动态传入 Params 的情况
## 新全栈套件
在 3.0 版本中，我们也提供了全新的全栈套件。
​

### 2.X - 全栈工程
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644480777877-0396ff80-16a3-44a8-b0cb-fd74ef328107.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1159&id=u620644d9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1159&originWidth=2414&originalType=binary&ratio=1&rotation=0&showTitle=false&size=327355&status=done&style=none&taskId=uec66adb0-ef27-4bd9-9a9b-f41e884cb9d&title=&width=2414)
在 2.0 版本中，我们更多的是将 Vite 和 Midway 拼接了起来，如上图的项目目录 & `npm scripts` 所示。
​

### 3.0 - 全栈套件
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644481164265-64c29fc9-0cbd-4700-9325-bac02bd03c51.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1170&id=ua9fea37d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1170&originWidth=2205&originalType=binary&ratio=1&rotation=0&showTitle=false&size=297134&status=done&style=none&taskId=uc849b89e-f247-4959-8f00-99339532aa6&title=&width=2205)
在 3.0 中，我们开发了新的全栈套件，提供统一的 dev/start/build & 工程配置功能，来简化用户的学习成本和认知成本。
​

### 新请求 SDK
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644481223913-b0fa0059-7ef5-4e97-b7b5-03f06c58216b.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1195&id=u0bc422b8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1195&originWidth=2462&originalType=binary&ratio=1&rotation=0&showTitle=false&size=198928&status=done&style=none&taskId=u40325216-d7fa-4485-ac9c-befbf13d430&title=&width=2462)
我们还开发了新的请求客户端 [@midwayjs/rpc](https://npmjs.com/package/@midwayjs/rpc)，作为`“零”API 调用`默认的请求客户端。
​

新的请求客户端对于原版本（基于 axios），体积减少了 64%（5.6kb -> 2kb），且支持 Browser & Node.js 环境，并且支持了配置中间件、替换请求客户端等新功能。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644481449435-115bf4e9-d478-4e30-9072-a85a31dccd26.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=607&id=u8c7b3149&margin=%5Bobject%20Object%5D&name=image.png&originHeight=607&originWidth=947&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103139&status=done&style=none&taskId=u08569926-78be-4b13-9b0a-2c3d3090b4f&title=&width=947)
上图是支持的配置项。
​

#### 自定义的请求客户端
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644481504072-cb6ddd91-c632-440e-889a-739af676e262.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u8bcc0e39&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=251152&status=done&style=none&taskId=u64b670a1-00f6-4306-b6bc-5955a335cef&title=&width=1920)


如上图所示，我们可以非常方便的替换为自己的请求客户端。
​

#### 请求中间件
我们参考 Koa 的洋葱机制实现了请求客户端的中间件，可以实现打印日志、统一错误处理等非常多实用的功能。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644482030271-a17160e5-31e6-4c72-8169-063645802c2e.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=Fowk6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=241710&status=done&style=none&taskId=ub7e299a8-b4bd-48fa-8ec3-19366cc15bd&title=&width=1920)


![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644482184770-f6197a8f-fc7d-4d1e-b58d-1d9815d8bb5e.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=u40c20685&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=224116&status=done&style=none&taskId=u027bdb60-eaa6-4f60-b6b0-5ea7e48843c&title=&width=1920)
### 前端构建器
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644482504734-36cbe416-38dd-4e49-922d-7271224bc1c5.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1145&id=u05e8d23e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1145&originWidth=2513&originalType=binary&ratio=1&rotation=0&showTitle=false&size=274704&status=done&style=none&taskId=ub27b1e01-15ab-4b62-bc91-d2adccb5172&title=&width=2513)
在 3.0 中，我们基于 [unplugin](https://github.com/unjs/unplugin) ，提供了 `Vite / Webpack` 的插件，用于快速接入前端工程。相比于 2.X 的接入方式，3.0 可以实现一行代码接入的效果。
## 预览
![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644482628470-0928a65a-5e2c-48b8-bc15-2d9fbbe9865c.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1206&id=u4cdb8474&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1206&originWidth=1910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=377891&status=done&style=none&taskId=u48110060-a4ba-4c72-8e19-df9f737f780&title=&width=1910)
目前一体化 3.0 已对外发布预览版，文档、试用可以访问我们的官网：[https://midwayjs.org/](https://midwayjs.org/)，也欢迎大家提交反馈。
​

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1644482681343-03db752b-7bb3-42c2-8fc8-d5909cdf6809.png#clientId=u967cffa8-04ab-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1080&id=uc6e87ea2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=435706&status=done&style=none&taskId=u16183f3d-3888-48c5-a1b0-67471d9aa2b&title=&width=1920)
