---
title: Web 框架不是答案
tags: 前端
date: 2022-04-22 10:51:00
---

![image.png](https://cdn.nlark.com/yuque/0/2022/png/98602/1650595518919-10412d36-8186-430a-a95c-9a90db424e85.png#clientId=u4242e7ad-2ba4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=713&id=u4543a564&margin=%5Bobject%20Object%5D&name=image.png&originHeight=713&originWidth=1392&originalType=binary&ratio=1&rotation=0&showTitle=false&size=167415&status=done&style=none&taskId=ud37f7e1c-c241-43cc-9d2b-4c24429ad47&title=&width=1392)

晚上在看 [Deno Deploy](https://deno.com/deploy) 官网介绍时，脑海里突然蹦出了一句话：“Web 框架不是答案”。

我个人目前是 Node.js Web 框架 Midway 的开发者，日常也会造一些小轮子自娱自乐，我很清楚的知道 Web 框架在现代 Web 开发下的不可替代性与企业级应用下所产生的效用。但今天我却想说，Web 框架不是答案。

在恢弘的巨型软件工程中，我可能会惊讶于在框架的约束与规则下，这个项目仍然得以继续开发，而不是凌乱不堪难以维护。但巨石应用终究还是离大部分普通开发者太远了，这时候 Web 框架所设立的一系列有利于后续维护的规则，此时都会变成约束。

“世间安得两全法，不负如来不负卿”。这句话也适用于 Web 框架开发者的我。
## 从那段代码开始
这是 Deno Deploy 官网上，那段给我带来灵感的代码：
```tsx
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, ssr, tw } from "https://crux.land/nanossr@0.0.1";

const Hello = (props) => (
  <div class={tw`bg-white flex h-screen`}>
    <h1 class={tw`text-5xl text-gray-600 m-auto mt-20`}>
      Hello {props.name}!
    </h1>
  </div>
);

console.log("Listening on http://localhost:8000");
await serve((req) => {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? "world";
  return ssr(() => <Hello name={name} />);
});
```

代码很简单，在模块中，我们通过监听 Http 事件，调用 nanossr 渲染出 Html 并返回给客户端。
整个渲染流程看起来非常的清晰且简洁，代码是无状态的，输入输出也很确定，只要有足够多的容器，它在云上也可以以非常快的速度扩容并支撑服务。

而如果使用框架，以 Midway Hooks 为例（伪代码），用户代码是这样的。
```tsx
import { Api, Get, useContext, run } from '@midwayjs/hooks'
import { h, ssr, tw } from "https://crux.land/nanossr@0.0.1";

const Hello = (props) => (
  <div class={tw`bg-white flex h-screen`}>
    <h1 class={tw`text-5xl text-gray-600 m-auto mt-20`}>
      Hello {props.name}!
    </h1>
  </div>
);

const api = Api(
  Get('/'),
  async () => {
    const { query } = useContext()
    const name = query.name ?? "world"; 
    return ssr(() => <Hello name={name} />);
  }
)

await run(api)
console.log("Listening on http://localhost:8000");
```
相比较之下，因为使用了框架，你需要处理初始化、路由等工作，不可避免的加入了许多开销与理解成本。

在这之前，我会认为上面这种纯函数的代码是简单的，不足以覆盖后续迭代场景的，用哲学一点的说法就是，这种开发方式是不具备发展的眼光的与可持续性的。

但现在我觉得，或许一些简单的 Api 开发，就是应该这么简单的，只是写两行胶水代码，聚合后端 Api，又或者是渲染一段模版，此时框架设计是显得过重的。

此时再来重新思考，之前的我会觉得让每个可能场景都用上我的框架会是正确的答案。但现在我觉得，在简单的场景下，简单的框架或无框架的服务才是正确的。使用复杂的框架容易使用户代码出现过度设计与提早优化，从而适得其反。
## 自问自答
Q：你是做框架的，为什么突然出来唱反调，说起 “Web 框架不是答案”了？
A：正因为我是做框架的，所以我对框架的适用范围，用户遇到的问题理解的更为深刻一些，但也因为屁股思维，所以做事情都是朝着框架去的。而简单框架和无框架意味着更透明的使用方式，更低的心智负担。且“Web 框架不是答案”是我今晚在读代码时产生的灵感，给我打开了一个新的方向，所以我给它配了一篇文章。这不是唱反调，这是对思路的补充。

Q：简单框架或无框架开发模式下，代码架构、开发范式、可维护性都是问题，你怎么解决？
A：不解决。我认为开发人员在使用 Web 框架时，容易存在两大误区。a. 什么都想用框架实现，过度优化与提前设计 b. 不用框架，后续维护不过来了只能重构。建议开发者在第一时间就想好自己的功能要不要用框架，实在不行就重构吧（毕竟架构师都是一遍一遍的重构出来的）。

Q：后续有什么落地的 Action 吗？
A：会有。后续我将尝试简单框架或无框架的设计，尝试将 Web Api 开发的心智负担下降到尽可能的低。目标不是消灭框架，而是让开发者在使用时觉得简单且可信赖。

Q：这么做的价值在哪里？
A：简单框架和无框架的价值需要通过配套的平台 & 基建体现出来，单独拎出来说事情是不公平的。强大的基建 + 易用的平台 + 低心智负担的开发方式，配合极速启动 + 保存代码即上线等特性，开发者可以放心的开发和部署功能。BTW，我也觉得对一个初生的想法或者灵感询问价值，是会带来非常大压力的。

Q：现阶段有实际的产物吗？
A：就是这篇文章，梳理思路 & 阐述个人观点。

Q：这个过程中你觉得可能会遇到什么问题？
A：克制与做减法。框架设计随着时间迭代与功能完善，总是会做的越来越复杂，最终达到用户难以理解全貌，框架由开发者的工具转变为了开发者心中的黑匣子。所以我觉得在后续过程中，最难的问题不是我要加什么功能，而是知道我不要什么功能，我给用户提供的究竟是什么？能不能用一句话描述并概括出来。

Q：没看懂你想说什么和想做什么
A：正常，深夜灵感 + 随笔，只是描述个人的看法而已。
