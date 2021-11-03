---
title: Jamstack - 理念、误区、思考
tags: 前端
date: 2021-07-27 18:25:39
---

## ![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1627198825385-b5f978df-3945-423b-b914-7c9e1c220c72.png#clientId=u369d6ad1-291c-4&from=paste&id=ud0453b99&margin=%5Bobject%20Object%5D&name=image.png&originHeight=394&originWidth=850&originalType=binary&ratio=1&size=52330&status=done&style=none&taskId=uf7388108-1efc-4f82-a69b-aa155aa7312)

> 如果你之前从未了解过 Jamstack，我推荐先阅读文章：[《Jamstack，下一代 Web 建站技术栈？》](https://zhuanlan.zhihu.com/p/281085404)。

## Jamstack 是什么

Jamstack 是一套用于构建现代 Web 站点的技术栈，拥有高性能、安全性、易扩展的特性。
​

> Jamstack 技术栈 & 生态

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1627199006775-18392a5a-c7fb-43fe-a30c-4a00159a6d3d.png#clientId=u369d6ad1-291c-4&from=paste&id=u9576f13a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=720&originWidth=1280&originalType=binary&ratio=1&size=673800&status=done&style=none&taskId=ubb2a3f21-f7e8-4bc9-8e86-d6511d70658)
​

Jamstack 聚合了现代前端开发所需要的脚手架，框架，工作流等，从而最大化的提高工程师的生产力。
​

> 工作流

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1627199078527-85ca7b79-35d5-423f-8f4b-caf05dc052f5.png#clientId=u369d6ad1-291c-4&from=paste&id=u18842002&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1001&originWidth=1351&originalType=binary&ratio=1&size=114465&status=done&style=stroke&taskId=uac593987-5fb1-4afd-8da3-d263d8a3019)
​

在这里，Jamstack 的核心理念是预渲染、使用 JavaScript 实现动态功能、使用 HTTP Api 连接第三方服务。
​

### 举个例子

当你要开发一个博客，在这之前你可能会使用 Wordpress 去搭建你的博客站点，但与此同时，你也需要负责维护 Wordpress 的服务与数据库等。
​

而如果你使用 Jamstack，你可以使用诸如 strapi 的 headless cms 服务(意为只提供 API 而不提供页面渲染)，用来存放你的文章数据，你在前端可以使用类似 Next.js 的框架去构造站点，通过请求 headless cms 的 Api 来渲染页面。
而在发布时，你将在构建时生成静态页面，并发布至 CDN。因为是静态页面，所以性能好，而托管至 CDN 意味着该页面是只读的，安全性高，且 CDN 是全球部署的话，那么页面也能实现全球部署，拓展性非常好。

## 误区

Jamstack 在国内落地时，总是会有同学认为这是新瓶装旧酒，或者是前端炒出来的新概念，但实际上忽略了 Jamstack 自身架构的特性与优势。

### Jamstack 是不是新瓶装旧酒

Q：Jamstack 和之前的手动发布页面到 CDN 有什么区别，是不是新瓶装旧酒？
A：这里我可以很明确的给一个答案：不是。

首先在我看来，Jamstack 虽然表现的都是页面和资源托管至 CDN，是实际上背后的工作流与过往是截然不同的。相较于以往手动开发和发布的模式，Jamstack 是聚合了现代前端框架、工作流、发布平台的，这一点非常的重要。
​

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1627199129311-16b1d27b-0bdc-4956-89a8-6965301efd60.png#clientId=u369d6ad1-291c-4&from=paste&id=uad6b83b4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=577&originWidth=836&originalType=binary&ratio=1&size=264100&status=done&style=none&taskId=uf9723511-de07-4d5e-9b35-96cbc1c3d1b)
​

对于工程师而言，效率就是生产力，之前的页面不一定是基于现代工程的，每次生成静态页面也依赖于自己写的脚本，每次页面更新还需要手动发布，效率偏低。而使用 Jamstack，你可以利用你最熟悉的框架，通过框架去批量生成静态页面，并且聚合 Git 等服务，实现推送即发布的全自动工作流。效率会高很多。
​

举个相似的例子：使用 React/Vue/Angular 和使用 jQuery 写页面，最终都是操作 DOM，所以 React/Vue/Angular 和 jQuery 是一样的，新瓶装旧酒？
​

先进的工具带来先进的生产力，即使最终的表现是前端页面和十年前一样，部署至 CDN。但实际上生产效率与质量还有可生产的页面已经发生了很大的进步。
​

不论是什么前端页面，能打开的更快终究是更好的，因此如果只关注到部署的结果，而没有注意到生产流程与生产效率的变革，便会落入“Jamstack 是新瓶装旧酒”这个论点的坑中。顺带一提，近几年的前端工具基本上也是朝着“性能更好”、“更易用”等方向去前进的。
​

### Jamstack 能适应所有的场景

Q：那是不是什么网站都上 Jamstack 就对了？
A：明确的回复，不对，Jamstack 的优势非常明显，所以劣势也很明显。
​

如果只关注到 Jamstack 的性能优势，希望将 Jamstack 用于所有场景，其实是不正确的。Jamstack 的站点为了获得性能、安全、可拓展性的优势，需要将页面托管至类似 CDN 的服务中，这个过程中，一个页面需要经过以下两步才会真正的发布到线上。
​

1. 预渲染
   1. 需要提前渲染出最终的页面
2. 发布
   1. 托管服务刷新缓存后展示新页面

​

针对预渲染，由于往往需要在构建时或者运行时实现功能，那么会存在一定的限制。构建时生成无法实现千人千面，运行时生成则需要考虑生成的数量与成本的考虑。假定将每一条微博都生成一个静态页面，诚然性能是好了，但所带来的成本也是不可估量了，且许多微博往往访问的人极少，那么运行时生成的性能可能还不如之前，
​

在 Jamstack 架构下，CDN 是最常见的托管服务，但 CDN 为了保证性能也存在着缓存的机制，这意味着页面的实时性无法保障。现有的 Jamstack 框架也会添加定时生成的功能，比如每 10S 就刷新一个页面并推送至 CDN，但不论怎么做，在实时性上还是不如实时服务的。

> Jamstack 最适合一些**内容更新不太频繁的网站**（比如新闻、电商、文档）。它不适合 Feeds 流、聊天室、论坛、个性化推荐这样高度动态化的网站，以及邮箱、编辑器这样偏重型的 Web 应用。

## Jamstack 会是企业级框架的核心特性而非唯一，混合渲染是未来方向

这个观点是我个人的想法。
​

在我看来，之所以 Jamstack 在国内难以落地，除去老生常谈的工作流、部署平台、底层依赖的限制外，其实还存在着适用范围单一的问题。
​

这里我抛出我的观点：在国内的市场下，Jamstack 将会成为企业级框架的核心特性，但并非唯一的特性，混合渲染才是未来的方向。
​

诚然，Jamstack 的优势非常明显，用过的同学都说省事都说好，但我在前文也提到了 Jamstack 的劣势，这决定了在企业内部错综复杂的场景中，Jamstack 不是那么万能的。
​

此外，Jamstack 作为一种现代 Web 站点的开发理念，其是易于被框架实现的。这也意味着，在企业级的场景中，往往会是框架去实现 Jamstack 特性，这个过程是新增而不是替换。因此 Jamstack 会是企业级框架的核心特性而非唯一特性。
​

至于后一句提到的混合渲染，Idea 实际上是源于 Next.js 10。在 Next.js 中，框架配合 Vercel 云服务平台，实现了纯静态页面托管、增量生成、服务端渲染等多种渲染策略的聚合。从这个角度来看，Next.js 相较其他的 Jamstack 框架是更有优势的。
​

> 静态生成

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1627199329426-c07335b1-92bb-4fa8-bcd5-0f13a05be9ce.png#clientId=udc9f227a-db2b-4&from=paste&id=ucbee6077&margin=%5Bobject%20Object%5D&name=image.png&originHeight=472&originWidth=880&originalType=binary&ratio=1&size=40914&status=done&style=stroke&taskId=u85897e04-3265-4dd8-8d65-970e596f5ce)

> 增量生成策略

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1627199295157-370f3146-df20-4c85-ba03-a9c62725b7b8.png#clientId=udc9f227a-db2b-4&from=paste&height=450&id=u7d8a9c56&margin=%5Bobject%20Object%5D&name=image.png&originHeight=900&originWidth=1600&originalType=binary&ratio=1&size=84712&status=done&style=none&taskId=udc3cfca0-4bd3-4709-a6be-7a27718c2a9&width=800)
​

先进的框架 + 先进的工作流 + 更多渲染场景的适配，我认为这才会是企业级框架进步的方向。

## 总结

Jamstack 是一套优秀的现代 Web 站点开发技术栈，在现代前端工程的加持下解决了开发效率与性能的难题。但由于其劣势也非常明显，所以在企业级框架中，Jamstack 会是一种核心的特性，但不是唯一的特性，企业级是需要支持类似混合渲染的开发模式的。
​

BTW，本文没有提及到使用 JavaScript 与连接第三方服务这两个特性，理由是：构建现代站点，完全脱离 JavaScript 不现实，故略过；预渲染页面时，往往就包含使用第三方服务（当然我觉得这一点的商业价值实际更大），故也略过。
​

## 推荐阅读

- [Jamstack，下一代 Web 建站技术栈？](https://zhuanlan.zhihu.com/p/281085404)
- [https://jamstack.org/](https://jamstack.org/)
- [Next.js - Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
