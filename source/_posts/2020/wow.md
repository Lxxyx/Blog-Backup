---
title: 千万级流量业务的 Serverless 实践，看 FaaS 给前端带来的变化
tags: 前端
date: 2020-02-19 11:19:46
---

2019 年初，淘系技术部启动了 Serverless 研发模式升级计划。而哇哦视频作为首个落地的业务，迄今已有半年。

本次则会为大家分享哇哦视频在这半年中发生的故事，与大家一起看看在一线业务同学的眼中，Serverless 会给前端同学带来什么，而我们又能收获什么？

## 分享内容
本次分享我会从以下三个部分出发：

- 业务落地
- 从零到一
- 未来抉择

![image.png](https://img.alicdn.com/tfs/TB13P29vEz1gK0jSZLeXXb9kVXa-1920-1080.png)

<a name="NHXgc"></a>
## 业务落地
哇哦视频是在手淘首页的短视频导购业务。

![image.png](https://img.alicdn.com/tfs/TB1UKUcvAT2gK0jSZFkXXcIQFXa-1920-1080.png)

<a name="fUibs"></a>
### “三高”业务
而其作为手淘的导购业务，其具有“三高”的特点：

- 流量高
- 稳定性要求高
- 迭代频率高

流量高指的是哇哦视频业务体量大，日常流量高，随着高流量所带来的，就是稳定性要求高的特点，且作为导购业务，其迭代频率也是非常高的。

![image.png](https://img.alicdn.com/tfs/TB17XsfvBr0gK0jSZFnXXbRRXXa-1920-1080.png)

<a name="1eqrC"></a>
### 开发痛点
在长达一年的开发实践中，我逐渐发现了业务在开发中遇到的一些痛点。

在这里我以最近三次首页改版的时间为例。通过下图这个时间轴，我发现整个业务迭代的过程中开发联调时间较长，从而导致需求完成时间往往会超过 10 天。

![image.png](https://img.alicdn.com/tfs/TB171EcvAT2gK0jSZFkXXcIQFXa-1920-1080.png)

基于此我也开始在思考业务研发模式中存在的一些痛点。

首先站在整个业务的大背景来看，有两个特点：

- 淘系大力推行中台化战略，业务能力实现了中台化，日常需求基本可以通过中台能力组装实现
- 导购业务一直处于高速迭代期，从未停歇。

基于以上的背景，我们会发现在目前业务的研发模式中有着诸多的痛点。

<a name="PniMe"></a>
#### 联调
首当其冲的痛点则是联调。在联调期中前后端需要不断对数据字段、业务逻辑进行确认，从而确保需求实现的正确性，而这种密集的沟通所带来的成本是非常高的。在哇哦视频这儿，我们发现联调成本一般要占到开发成本的 30% 左右。

居高不下的联调成本，一方面使得工程师们精疲力尽，另一方面也不利于业务的快速迭代。

<a name="AjOyx"></a>
#### 业务开发的枯燥
对于业务开发来说，日常工作就是取数据调接口，枯燥且重复。

<a name="SyxCj"></a>
#### 前端资源化
值得一提还有前端资源化的痛点。

在目前前后端的分工模式中，前端只负责交互逻辑与相对应的 UI 实现，对于业务核心逻辑无需过多了解。虽然这使得前端团队可以快速完成某些业务，但同样也带来了前端资源化的隐患。而在强调前端要深入业务，具有商业化思考能力的今天，前端资源化实际上是不利于前端的自身发展的。

因为很多时候前端想去深入业务，想进一步升级自己的能力，但往往会苦于没有相关场景。至于说介入后端的工作领域，毕竟术业有专攻，很多事情也掺和不进去。

![image.png](https://img.alicdn.com/tfs/TB1rfz_vpP7gK0jSZFjXXc5aXXa-1920-1080.png)


<a name="fV5WP"></a>
### 研发模式升级战役
恰好 2019 年的 4 月份，淘系前端开启了研发模式升级的战役。而我也参与进去负责导购体系 Node FaaS 相关建设的工作。基于 Node FaaS 提供的能力，我开始重新思考上面碰到的业务痛点，并认为研发模式升级是可以解决以上的痛点问题的。

对于为什么研发模式升级可以解决上述提到的痛点，我个人认为主要有以下三点：

- 单人负责前后端，且均使用 JS，能极大的**减少沟通与联调成本，满足业务高速迭代需求**
- 离用户最近，熟悉业务规则，**业务方沟通成本低。**
- **前端对于自身能力升级的渴望。**对于身为前端的我来说，我不想也只是作为一个资源，每次被调配，我也希望自己可以去对业务负责，也希望可以有机会去赋能业务，去做更多的事情。

而对于后端同学来说，当前端负责前后端，后端同学则可以从业务中释放出来，从而选择去开辟更多的新战场，去做更多更有挑战性的事情。

![image.png](https://img.alicdn.com/tfs/TB1Hz69vEz1gK0jSZLeXXb9kVXa-1920-1080.png)

<a name="KSWAU"></a>
### 业务迁移
带着以上这些思考，我仔细阅读了业务的后端代码并梳理整体的业务逻辑，发现其具有以下的特点：

- 后端无状态
- 复杂度适中

这两个特点使得业务非常适合使用 Serverless 技术来承接。<br />而在正式进行迁移前，我和业务方沟通了这个事情对于业务可能产生的影响以及后续规划。业务方对于技术侧的改造是没有意见的，只有一个诉求，那就是业务不受影响。

整个诉求看似简单，拆解下来包括以下三部分：

- 不会为技术侧改造预留时间，原定需求要按时完成
- 迁移后线上不能出任何问题，线上对迁移无感知
- 后端工作交接至前端后，对后续需求推进无影响

说起来就是既要快，又要稳，还要能扛住后续需求。而在充分梳理和分析后，我确认我可以在“不坑业务”的基础下，完成整个迁移。

![image.png](https://img.alicdn.com/tfs/TB1par_vxD1gK0jSZFsXXbldVXa-1920-1080.png)


在开始迁移后，事情进展比我们想象中的要顺利很多。下面是我们研发过程中的一些数据。

![image.png](https://img.alicdn.com/tfs/TB1IIr_vEH1gK0jSZSyXXXtlpXa-1920-1080.png)

在迁移完成后，我又尝试接了几个需求，并对前后所用的时间做了一个对比。

可以看到在之前完成一个业务迭代，前端总共需要投入 10 天，整体投入人数是 2 人。<br />而在研发模式升级后，前端总投入时间增加到12天，虽然看起来投入时间增加了，但是却减少了一个人的投入。总的来看还是节约成本的。

![image.png](https://img.alicdn.com/tfs/TB13W_.vxn1gK0jSZKPXXXvUXXa-1920-1080.png)

<a name="8Wz6X"></a>
## 从零到一
这部分我主要我想讲清楚一个问题，那就是业务从开始迁移，到研发完成上线，这个过程中都发生了什么？

在这里我把它主要分为以下4个部分来讲述：

- 需求承接
- 本地研发
- 部署与调用
- 运维

![image.png](https://img.alicdn.com/tfs/TB1rhz.vrr1gK0jSZR0XXbP8XXa-1920-1080.png)
<a name="97ymY"></a>
### 
<a name="JPTI8"></a>
### 需求承接
迁移的基础是原有需求的承接，而需求承接的核心就在于需求评估。在业务方提出需求时，我们会按照如下的节奏开始需求工作流：

- 召开需求评审会，确认需求与具体内容
- 召开技术评审会，确认实现方式与涉及到的二方平台
- 需求开发、发布等
- 经验积累总结

而在需求承接的过程中其实会遇到一个难题，那就是如何确认需求是可实现的？<br />这是一个前期困扰我许久的问题，然而答案却也简单，那就是：如果需求的实现不涉及三方平台的，那么依据自身能力评估即可。如果是涉及到三方的需求，则需要让业务方组织技术评审会，会上确认是否该需求是可实现。

![image.png](https://img.alicdn.com/tfs/TB1NGQdvrj1gK0jSZFuXXcrHpXa-1920-1080.png)

<a name="tYuXW"></a>
### 研发流程
这部分是关于函数研发流程相关，会按以下四部分去阐述：

- 函数开发
- 服务调用
- 单元测试
- 函数发布

![image.png](https://img.alicdn.com/tfs/TB10aMdvrj1gK0jSZFuXXcrHpXa-1920-1080.png)

<a name="npMFT"></a>
### 本地研发
整个本地研发，按照时间顺序主要分为以下四个步骤：

- 函数开发
- 服务调用
- 单元测试
- 函数发布

![image.png](https://img.alicdn.com/tfs/TB1XpP_vAL0gK0jSZFtXXXQCXXa-1920-1080.png)

值得一提的是，在之前我提到过：“哇哦视频作为淘系首个落地 Node FaaS 技术的项目，其开发的整个过程，也与 Serverless 体系的成长密不可分。”

所以这部分即会讲述到本地开发，也会讲述到哇哦视频从迁移伊始到上线这段时间内，给 Node FaaS 带来的一些改变。

<a name="CsBoY"></a>
#### 多函数的目录结构
在这之前，主流 FaaS 项目结构如我图中所画的那样。每个函数间是相互隔离的，这样虽然比较干净，但其实也带来了非常多的一些痛点。比如跨函数逻辑复用困难，重复的依赖安装和重复的文件。

因此我们在思考，既然 FaaS 的优势在于零运维，那我们不应该为了运维的优势而强行降低开发者的效率。

因此我们提出了新的目录结构方案。在新的目录结构中，我们使得多函数可以复用同一依赖，避免重复的文件与依赖。且我们也提出了新的打包方案，每个函数入口文件都会被打包为一个函数单独部署。

至此，我们获得了应用级的开发体验，也获得了 FaaS 零运维的优势，从而达到开发者提效，专注业务逻辑开发的目标。

![image.png](https://img.alicdn.com/tfs/TB1wq2.vAP2gK0jSZPxXXacQpXa-1920-1080.png)

<a name="UtBT2"></a>
#### 整洁架构的探索
在开发过程中，哇哦视频也对业务的架构做了一些新的探索。在此我参考了整洁架构的一个实践，事后证明配合 IoC 与依赖倒置，有效的减少了业务的迭代难度。

同时关于这个架构与具体的落地实践，外部有非常多的案例，有兴趣的同学可以自行查阅。

![image.png](https://img.alicdn.com/tfs/TB1iLH_vpP7gK0jSZFjXXc5aXXa-1920-1080.png)

<a name="kykPM"></a>
#### 服务市场 - HSF 调用一站式解决方案
在业务开发的过程中，一定会遇到的就是 HSF 的服务调用。为了简化开发工作量，尽可能的提升研发效率，对此我们也提供了对应的解决方案：服务市场。

服务市场囊括了HSF服务，从调用到测试的全流程支持。是我们在开发业务时的一把利器。

![image.png](https://img.alicdn.com/tfs/TB1fq2.vAP2gK0jSZPxXXacQpXa-1920-1080.png)

<a name="18zxS"></a>
#### 单元测试
在之前的 Midway 项目中，是默认支持使用 Mocha 测试的。

而正好在今年的 [JavaScript 开发者报告](https://2019.stateofjs.com/)中，关于测试框架一项，Mocha 的人气在持续的走低，而 Jest 作为近两年的新起之秀，人气在不断的升高。因此我们在原有的Mocha支持上，又新增了Jest的支持。

同时哇哦视频有着通过单测保障代码质量的需求，因此我们也打通了 FaaS 函数在内部 Ci 系统单元测试的链路。

![image.png](https://img.alicdn.com/tfs/TB1DuIcvAT2gK0jSZFkXXcIQFXa-1920-1080.png)

<a name="6ariA"></a>
#### 错误处理
其实这部分与实际的代码书写风格相关，虽然说是战时盯着屏幕看监控，但是如何第一时间发现错误源于何处，是否需要处理其实是值得琢磨的问题。毕竟无效的监控一多，人就会陷入到报警疲劳中。

在这儿，哇哦视频采取对于错误采取了以下的几个小策略，确保线上可以快速定位问题：

- 错误分级：将错误分为 忽略/警告/重视 3 种等级，方便一眼确认重要错误
- 自定义错误名：将错误自定义名称，而非是笼统的 Error，方便迅速确认具体错误
- 携带关键信息：针对不同错误，携带不同关键信息，方便快速定位与复现问题

简单示例如下：

![image.png](https://img.alicdn.com/tfs/TB1bI_yvp67gK0jSZPfXXahhFXa-798-528.png)<br />
<br />而在实际业务中的监控中，实际上会较容易的区分与定位错误：这样最终是对于线上问题的排查与修复是有帮助的。

<a name="KZ8TD"></a>
#### Java 兜底
对于 Java 兜底，我现在就一个感觉，真香！<br />虽然这是一个临时性的方案，但是在你出问题时还有兜底的服务可以帮忙扛着，无比安心呀。<br />
<br />具体实现上非常简单，实际上就是在请求自己接口失败时，再去请求一次 Java 接口，确保可以提供服务。毕竟两个应用同时都宕机的几率是非常低的。<br />
<br />![image.png](https://img.alicdn.com/tfs/TB1Y2L_vpP7gK0jSZFjXXc5aXXa-1920-1080.png)

<a name="AIxah"></a>
### 发布流程
这部分主要与代码的发布，我们提供了一站式的研发平台，来帮助你管理函数，实现版本管理与回滚等功能。

![image.png](https://img.alicdn.com/tfs/TB1ONP9vvb2gK0jSZK9XXaEgFXa-1920-1080.png)

<a name="MUit9"></a>
### 调试闭环
对于现代化的开发而言，调试是必不可少的一项能力。在此 Sandbox 平台 提供了一站式的调试闭环服务。我们可以在函数中启用远程调试，然后在预发去调试代码，从而帮助我们更快的去定位问题。

![image.png](https://img.alicdn.com/tfs/TB1P.EbvxD1gK0jSZFyXXciOVXa-1920-1080.png)

<a name="xCqdw"></a>
### 函数监控
关于函数监控，在此我们也提供了一站式全功能的Node.js治理平台，Sandbox。包括运维数据、链路分析、监控告警、白屏化日志四大功能。

![image.png](https://img.alicdn.com/tfs/TB1gDAcvuH2gK0jSZJnXXaT1FXa-1920-1080.png)

<a name="kDABc"></a>
#### 运维数据
在此，我们可以通过 Sandbox 提供的功能，清楚的看到当前函数的运行数据。功能也非常简洁明了。

<a name="uRWVG"></a>
#### 链路分析
在阿里做后端，怎么能缺少全链路分析的辅助。

在此，Sandbox 也对全链路分析做了支持。<br />对于函数的每个请求，我们可以查看到其链路的详情与对应的链路，帮助我们快速定位到链路问题。而针对于错误链路，在这里也能看到其对应的链路分析与错误的日志。

<a name="RbKih"></a>
#### 白屏化日志
Sandbox 也提供了白屏化日志的功能，通过查看实时日志，可以有效的了解函数情况。

<a name="LfcMT"></a>
#### 监控报警
Sandbox 提供了监控报警的功能，在这里我们可以设定自己的报警项。在报警触发时，会通过短信电话等方式实时通知到同学。

配合之前提到的那些功能，可以使得快速发现并定位修复故障。

<a name="VCblw"></a>
### FaaS 的业务能力
基于以上的这些功能，与哇哦视频业务长达半年的实践与踩坑，我们可以说：
> “**FaaS 函数工具完备，完成业务就像是搭积木一样！**”


如果有相关业务需求的同学，可以大胆的放心的使用 FaaS 去完成。

![image.png](https://img.alicdn.com/tfs/TB1_Twbvrj1gK0jSZFOXXc7GpXa-1920-1080.png)

<a name="uyZMw"></a>
## 未来抉择
这部分是业务迁移 FaaS 半年后，个人的一些思考与总结。

<a name="zJzt5"></a>
### 研发模式升级推论
首先先看一个研发模式升级的推论。

1. 因为：我们在技术上使用 Serverless
2. 所以：实现前端能力升级
3. 结果：助力业务先赢

这个推论听起来好像是很正确的一件事情，但却让我想起我之前听到的一个故事。

![image.png](https://img.alicdn.com/tfs/TB12robvxv1gK0jSZFFXXb0sXXa-1920-1080.png)

<a name="Q9vAl"></a>
#### 故事：科技改变生活

都说科技改变生活，以前我们遇到不懂的问题，要去图书馆查资料。<br />而现在，遇到不懂的问题，我们只需要掏出手机，然后，你就会忘记这个问题。

![image.png](https://img.alicdn.com/tfs/TB1Dqv_vxD1gK0jSZFsXXbldVXa-1920-1080.png)

而这个故事和之前研发模式升级的推论，在我看来是差不多的。虽然我们有了新的方式去解决问题，但最后的结果可能天差地别。

在这里我就发现前端能力升级，并不一定能助力业务先赢，这也是困扰我长达半年之久的问题。

![image.png](https://img.alicdn.com/tfs/TB12ij_vxz1gK0jSZSgXXavwpXa-1920-1080.png)

<a name="s0qTJ"></a>
### 我在哇哦视频的选择
“研发模式升级究竟能否助力业务先赢？”

这个问题就像心魔一样在我心头萦绕，但遇到问题就要解决问题。总得试试看，因此在半年内，分为 3 个阶段，我做了如下的一些尝试。

<a name="rTCTP"></a>
#### 支撑（19.06 - 19.09）
第 1 个阶段我称为支撑，时间是19年的6月份到19年的9月份。

在这期间我对自己的要求就只有一个，那就是“活下来”。因为首先要能做业务，才有后续与业务谈价值的可能性。否则都只是空中楼阁罢了。

<a name="BYmXx"></a>
#### 对话（19.10 - 19.11）
第 2 个阶段我称为对话。

在能做业务的基础上，我开始尝试去理解业务数据，主动去沟通、学习、了解相关业务领域知识。并且在遇到问题时会习惯性与业务方进行沟通，看看这个问题，从业务视角出发是如何理解的。

<a name="4yKCG"></a>
#### 助力（19.12 - 至今）
第3个阶段我称为助力。

在逐渐理解业务规划、与业务方也有了一定的信任后，我开始尝试参与部分业务规划，与业务方一同去挖掘痛点。同时同时站在技术的角度上做一些技术预研，尝试为业务带去更多的发挥空间。

![image.png](https://img.alicdn.com/tfs/TB1mYMbvrH1gK0jSZFwXXc7aXXa-1920-1080.png)

<a name="EyRWR"></a>
#### 抉择
在我刚提到的第一阶段“支撑期”时，我经历了非常长一段时间的思想抉择。

在我可以支撑业务时，当时的我面临着两个选择：

1. 做一辈子的业务工具人：业务说什么我做什么，承接需求就好
1. 尝试做一次业务合伙人：试着给自己提出的问题（研发模式升级究竟能否助力业务先赢？）找一个答案

当时的纠结在现在看来，主要是以下几点：

- 作为一名技术同学，尝试着做非常多看起来与技术不相关的事情，风险高难落地拿不到结果
- 受非技术因素影响多，业务的走向与起起落落，并非是技术可解的问题
- 做成了可能与技术无关，做不成却一定有自己的问题

但最终我还是选择尝试做一次“业务合伙人”，因为我觉得如果研发模式升级如果不能证明它能助力业务先赢，那么整个战役实际上是失败的。对于自己而言，也只是简单的完成了一次业务迁移的过程，而没有真正的去解决问题。

![image.png](https://img.alicdn.com/tfs/TB1wdbyvp67gK0jSZPfXXahhFXa-1920-1080.png)

比起拿到迁移的结果，我更想知道研发模式升级的答案。

<a name="zxpJq"></a>
### 业务对话
在下决定后，我开始按自己的思路去做这一切的事情。

首先是对既有经验的一个学习。正好最近阿里经济体前端委员会在阿里技术论坛出品了《技术与业务同行》这个专题，里面有非常多业务思考的文章，细细拜读后收获颇多。

在拜读相关文章后，我开始主动去了解业务的数据，目标与未来的规划，且在此基础上，我开始主动要求与产品经理，去做一个沟通，希望能去与业务方，共同了解整个产品业务的规划与交流。

在这之后，我被邀请去参与哇哦视频用户调研活动。这也是我第一次面对面的去与用户对话，了解用户的真实需求。<br />而在与用户面对面沟通后，我发现自己业务思考上的诸多盲区。这件事情也是一个警醒，虽然我自诩为前端是离用户最近的岗位，但实际上与用户面对面之后，才知道实际上相差甚远，比起自嗨，我们仍然需要更多的去倾听用户的声音。

![image.png](https://img.alicdn.com/tfs/TB1pOH_vBv0gK0jSZKbXXbK2FXa-1920-1080.png)


<a name="f8WZN"></a>
### 例子：承接手淘 Push
哇哦视频的业务方之前一直存在一个痛点，那就是业务入口流量不足。在与业务频繁对话的那段时间，这个问题时常会被提起。

针对这个问题，我开始尝试与业务方讨论有没有相应的解法，最终将目标锁定在使用手淘 Push 消息的能力来为业务导流。<br />与业务方沟通并达成一致后，技术侧迅速开始了改造，为哇哦视频新增了承接手淘 Push 的能力，且随着消息的推送，不断进行相应的调整与优化。<br />在多日的持续优化下，哇哦视频通过手淘 Push 实现 UV 单日最高提升 20%+的结果。

而在经过这件事情后，我想我找到了“研发模式升级究竟能否助力业务先赢”这个问题的答案：Serverless 是前端撬动业务场景的一把利剑。

![image.png](https://img.alicdn.com/tfs/TB14Wv_vuL2gK0jSZPhXXahvXXa-1920-1080.png)

<a name="43Bd9"></a>
## 总结：FaaS 给前端带来的变化
在我之前写的文章《哇哦视频 ❤️ FaaS - 迁移前后的那些事儿》中，公司的同事留了一句评论：

![image.png](https://img.alicdn.com/tfs/TB1Jfv_vpP7gK0jSZFjXXc5aXXa-1920-1080.png)

而对于我来说，后续的目标则是希望在助力业务成长上去探寻到更多的可能性。基于 FaaS 的研发模式升级，实际上是为了助力业务先赢。

我们不要因为走得太远，而忘记为什么出发。

![image.png](https://img.alicdn.com/tfs/TB1Y4Y.vrr1gK0jSZR0XXbP8XXa-1920-1080.png)


![image.png](https://img.alicdn.com/tfs/TB148T.vET1gK0jSZFhXXaAtVXa-1920-1080.png)