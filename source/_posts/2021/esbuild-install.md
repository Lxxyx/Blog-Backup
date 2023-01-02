---
title: esbuild 二进制下载提速 3 倍的秘密
tags: 前端
date: 2021-09-29 12:01:55
---

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1632885482713-4be205ee-f80b-4564-b8a9-5372d1de0f3e.png#clientId=ucf0fa086-a4ed-4&from=paste&height=340&id=oo85y&margin=%5Bobject%20Object%5D&name=image.png&originHeight=340&originWidth=680&originalType=binary&ratio=1&size=130834&status=done&style=stroke&taskId=u0cd531c2-c18c-4716-b393-dd344786340&width=680)

<a name="RHki8"></a>
## esbuild 原有下载机制的问题

最近有用户在 esbuild 的 Github 仓库提了一个 Issue：[Different strategy for installing platform-specific binaries](https://github.com/evanw/esbuild/issues/789)，报告了部分用户在安装 esbuild 依赖时出现的权限错误。

```bash
> esbuild@0.8.43 postinstall /usr/local/lib/node_modules/netlify-cli/node_modules/esbuild
> node install.js
Trying to install "esbuild-linux-64" using npm
Failed to install "esbuild-linux-64" using npm: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/netlify-cli/node_modules/esbuild/esbuild-r63cli2pgpi'
Trying to download "https://registry.npmjs.org/esbuild-linux-64/-/esbuild-linux-64-0.8.43.tgz"
/usr/local/lib/node_modules/netlify-cli/node_modules/esbuild/install.js:217
      throw e;
      ^
Error: EACCES: permission denied, open '/usr/local/lib/node_modules/netlify-cli/node_modules/esbuild/bin/esbuild'
  errno: -13,
  syscall: 'open',
  code: 'EACCES',
  path: '/usr/local/lib/node_modules/netlify-cli/node_modules/esbuild/bin/esbuild'
}
```

背后的原因也很简单，因为 esbuild 是使用 Go 语言开发的，因此如果要使用 esbuild ，那么在安装时就必须下载各自平台对应的二进制包。

而在之前的 esbuild 版本中，这段逻辑是利用 npm  `postinstall` 的 hooks 去实现的，在安装时会通过 node 判断系统平台，并下载对应的二进制包。

这样做也带来一些问题：

- 权限问题，动态下载可能会报错
- 二进制包是从 npm 下载的，不支持内网、自定义 npm 源、代理等情况，速度也慢

在 Issue 中，也提到了可以使用 npm 的 `optionalDependencies + cpu` 来解决多平台二进制包分发的难题。

随后 esbuild 实现了该逻辑，并提交了 PR。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1632886317011-0bd6b9d9-57c0-4edd-a496-3670f19f6b8f.png#clientId=ucf0fa086-a4ed-4&from=paste&height=340&id=u19f1168d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=340&originWidth=680&originalType=binary&ratio=1&size=123399&status=done&style=stroke&taskId=uc1c0d1ba-bb28-4375-9468-bb4097b7b63&width=680)

测试数据的结果也非常喜人，安装时间从 5.4s 减少到了 1.5s，提速了大约 3 倍。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1632886245827-644e160d-0624-4923-9e5a-fbd3c6a242fc.png#clientId=ucf0fa086-a4ed-4&from=paste&height=136&id=u339f3012&margin=%5Bobject%20Object%5D&name=image.png&originHeight=136&originWidth=834&originalType=binary&ratio=1&size=21943&status=done&style=none&taskId=u5ce01928-2d69-47ca-8f47-48d099bdd08&width=834)

在仔细查看相关 PR 后，我觉得这是一个非常巧妙的解决方案。
<a name="PS908"></a>
## npm 的 optionalDependencies 与 cpu
长话短说。

在 npm 中，optionalDependencies 意味着是可选依赖，此类依赖在安装时，即使是安装失败了也不会中断安装的过程，而是交由 npm 包自行去判断。

而 cpu 字段则代表这个 npm 包只能在指定的 cpu 架构上运行。比如你指定了` "cpu": [ "arm" ]`，那么 npm 在安装时会通过 `process.arch` 来判断，这个包是否可以安装。

而 esbuild，正是通过 `optionalDependencies` 与 `cpu` 字段的配合，实现了下载提速 3 倍的效果。
<a name="KczoJ"></a>
## 下载提速的原理
在 PR 中，esbuild 将所有的二进制包都加入了 `optionalDependencies` 中。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/98602/1632892927240-c22a28b3-8a45-4c40-a6e2-f7d252ff9a50.png#clientId=ucf0fa086-a4ed-4&from=paste&height=1108&id=ub7a98115&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1108&originWidth=2144&originalType=binary&ratio=1&size=209124&status=done&style=none&taskId=u5a53ddfd-4880-4b9c-b424-8995622c3f5&width=2144)
而同时在每个二进制包的 package.json 中，指定了 `cpu` 字段，也就是将原来的匹配平台，下载对应二进制包的工作交由了 npm 去实现。

尝试通过 `npm i esbuild --verbose` 来输出日志，可以清晰的看到：

```bash
npm verb reify failed optional dependency esbuild/node_modules/esbuild-windows-arm64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-windows-64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-windows-32
npm verb reify failed optional dependency esbuild/node_modules/esbuild-sunos-64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-openbsd-64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-linux-ppc64le
npm verb reify failed optional dependency esbuild/node_modules/esbuild-linux-mips64le
npm verb reify failed optional dependency esbuild/node_modules/esbuild-linux-arm64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-linux-arm
npm verb reify failed optional dependency esbuild/node_modules/esbuild-linux-64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-linux-32
npm verb reify failed optional dependency esbuild/node_modules/esbuild-freebsd-arm64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-freebsd-64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-darwin-64
npm verb reify failed optional dependency esbuild/node_modules/esbuild-android-arm64

npm http fetch GET 200 https://registry.npmjs.org/esbuild-darwin-arm64/-/esbuild-darwin-arm64-0.13.3.tgz 3635ms (cache miss)
npm timing reifyNode:node_modules/esbuild-darwin-arm64 Completed in 3641ms
```
因为我的系统是 m1 的 mac，因此只有 `esbuild-darwin-arm64` 这个包被安装了下来，其他的包则失败了。

这么做的好处在于：

- 不用动态去 npm 拉取包，对于使用自定义 npm 源的用户是友好的（特别是使用 npm 镜像源做反代的情况）
- 安装全程由 npm 完成，最大程度的避免了权限的问题

原理很简单，但是思路很巧妙，值得学习。
