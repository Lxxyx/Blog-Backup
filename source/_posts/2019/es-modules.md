---
title: ECMAScript Modules 在 Node.js 中的支持与使用
tags: 前端
date: 2019-08-11 16:37:04
---

2019 年的 4 月份，Node.js 官方团队在发布 Node.js 12 时，也给我们带来了最新的  [ECMAScript Modules 支持](https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff)。

首先我们需要明确的是，**ECMAScript Modules 在现在已经不是什么新鲜事了**。<br />早在 ES6 规范推出时，我们通过 Babel/TypeScript 等工具便已能在项目中使用该 Feature，那为什么我们还需要关注该 Feature 在 Node.js 上的实现与具体使用呢？

答案是明确的，因为  ECMAScript Modules 在 Node.js 规范中的实现与使用，实际上与现今 Babel/TypeScript 的使用是有较大的区别的。

关于这一点，我想从  Babel/TypeScript 当时的设计思路上去分析。

<a name="D39y2"></a>

## Babel/TypeScript 的设计思路

首先我们看一下 Babel/TypeScript 的 Slogan：

- Babel：Babel is a JavaScript compiler：Use next generation JavaScript, today.
- TypeScript：TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

从两个产品的 Slogan 上不难看出，Babel 专注于通过编译，在现在的 JS 引擎中使用最新的 JS Feature。而 TS 则是通过编译，实现静态类型的校验等。

而这两者的最终产物都受限于当前 JS 引擎的能力，也就是说 Babel 和 TypeScript 并不能凭空模拟出之前 JS 引擎尚未支持的 Feature。

这一点非常重要，因为在 Babel 与 TypeScript 对  ECMAScript Modules 时，实际上是编译成 Node.js 所支持的 [CommonJS ](https://nodejs.org/docs/latest/api/modules.html)规范，从而使得最终产物可以在 Node.js 上运行。

也就是说，当时我们的使用方式，其实是遵循了 CommonJS 的规范的，只是写法上是  ECMAScript Modules 而已。且由于底层缺失对于  ECMAScript Modules 的强约束（因为还不存在），所以大家的写法上也都是五花八门的，只能最终编译成 CommonJS 时能运行即可。

而 Node.js 12 的这个 Feature，则对  ECMAScript Modules 的开发与使用做了强约束，所以在正式开始使用该规范前，我们还是需要对其有一定的了解的。

<a name="i0OA3"></a>

## 启用 Feature

通过  --experimental-modules ，我们可以在 Node.js 中启用该 Feature。

当设置该选项时，Node.js 便会以 ECMAScript Modules 的方式去解析 JS 并运行，在这儿值得注意的是，在新模式下，文件的后缀与解析规则也发生了变更。

在该 Feature 下，文件分为了以下几种后缀：

- .mjs：ECMAScript Modules 模式，使用 import/export
- .cjs：CommonJS 模式，也就是原有的 Node.js 模块解析方式
- .js：在  ECMAScript Modules 模式下，如果 package.json 中 的 type 字段为 module 时（后文会提及），则该文件会被认为是符合 ES Module 规范的文件。

<a name="5pUeI"></a>

## 通过 package.json 区分模块类型

ECMAScript Modules 由于具体实现上与之前的 CommonJS 有较大区别，因此在使用时是需要对两种情况进行区分的。而官方则提供了一种简单有效的方式，那就是通过 package.json 中的 type 字段。

该字段主要影响该 package 下 .js 后缀的解析，而新增的 .cjs/.mjs 后缀则从文件名上已经做了类型区分，Node 会根据后缀切换不同的解析方式。

在规范中，package.json 的 type 字段一共有两种值，"module" 与 "commonjs"，而当 type 字段不存在时则默认使用 "commonjs" 来适应原有规范。

```json
// package.json
{
  "type": "module" | "commonjs"
}
```

而在具体使用时，当导入项目中的 js 时，根据 type 的值，会有以下两种情况：

- module：以  ECMAScript Modules 模式解析
- commonjs：以 commonjs 的方式解析

通过这种设计，我们可以非常方便的实现对原有代码的兼容，且 CommonJS 与 ES Modules 之间也能互相引用，Node.js 会处理好运行时的一切。

至于解析的例子，大家可以看下面的代码：

```javascript
// package.json 中 "type" 为 "module".

// 以 ECMAScript Modules 解析与加载
import './startup/init.js';

// 以 CommonJS 加载，因为 ./node_modules/commonjs-package/package.json
// 缺乏 "type" 字段或者 "type" 为 "commonjs".
import 'commonjs-package';

// 以 CommonJS 加载，因为 ./node_modules/commonjs-package/package.json
// 缺乏 "type" 字段或者 "type" 为 "commonjs".
import './node_modules/commonjs-package/index.js';

// 以 CommonJS 加载，因为 .cjs 后缀即代表该模块遵循 CommonJS 规范.
import './legacy-file.cjs';

// 以 ECMAScript Modules 加载，因为 .mjs 后缀即代表该模块遵循 ECMAScript Modules 规范.
import 'commonjs-package/src/index.mjs';
```

<a name="azkwO"></a>

## ES Modules 与 CommonJS 的区别

在 Node.js 的实现中，ES Modules 实际上与 CommonJS 的规范在部分细节上已有了较大的区别。这部分差异直接影响到我们书写代码的方式，因此我会具体贴出部分重要改动。

<a name="29Ar8"></a>

### 导入模块时需要提供文件拓展名

在 CommonJS 时代，我们在导入模块时无需书写文件后缀，而是由 Node.js 自行通过 extensions 来加载指定文件。如  import 'index'  在 Node.js 中实际上会加载 index.js，Node 会帮忙自动尝试加载该文江。<br />而在 ES Modules 规范下，导入一个模块时，我们需要提供确切的文件拓展名。

这一点虽然对比现在的方案缺失了灵活性，但却使得整体模块的依赖关系可以在编译时就确定，而不需要等到运行时。这是符合  ES Modules 的设计初衷的。

<a name="I2w7X"></a>

### require, exports, module.exports, **filename, **dirname

Node 在实现  CommonJS 规范时，实际上给每一个文件都做了包裹，传入了以上的这些变量，从而使得在代码中可以使用 require/exports 等方式实现模块化。

而**在 ES Modules 规范下，这些都将不复存在**。这一点对于原有的代码而言，是一个非常大的变更。<br />这也就是为什么在 Babel/TypeScript 等工具体系下，明明可以使用 ES Modules 进行开发了，还需要关注 Node 具体实现的原因，因为之前的代码强依赖于这些变量，在新规范下必须进行修改才能继续使用。

然而这些都是 Node 运行的基础，总不能一下子就没有了吧？答案是确定的，这些变量在 ES Modules 规范下的使用方式，Node 官方也给出了具体的方案：

比如 require，可以通过 [module.createRequire()](https://nodejs.org/dist/latest-v12.x/docs/api/modules.html#modules_module_createrequire_filename) 方法使用。

又比如  **filename 与 **dirname：

```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

<a name="p3HpY"></a>

#### import.meta

这儿其实有一个小知识，那就是关于 import.meta 的。<br />在 [MDN 的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import.meta)中，解释如下：

> `import.meta`是一个给 JavaScript 模块暴露特定上下文的元数据属性的对象。它包含了这个模块的信息，比如说这个模块的 URL。

```javascript
console.log(import.meta);

// 输出
{
  url: 'file:///home/user/my-module.mjs';
}
```

<a name="1uQEF"></a>

### 没有 require.extensions 与 require.cache

在 ES Modules 规范中，require.extensions 与 require.cache 将不再被使用。

<a name="EmNei"></a>

### 基于 URL 的文件路径

在文件路径上，ES Modules 的解析与缓存是基于 [URL ](https://url.spec.whatwg.org/)规范的。<br />这也就意味着，模块实际上是可以携带查询参数的，且当查询参数不同时，Node 会重新加载该模块。

```javascript
import './foo.mjs?query=1'; // loads ./foo.mjs with query of "?query=1"
import './foo.mjs?query=2'; // loads ./foo.mjs with query of "?query=2"
```

<a name="OiFhK"></a>

## 总结

在此需要特别提及的是，目前 Node.js 所提供的  ECMAScript Modules 规范并非是最终解，其具体实现与诸多技术细节未来也可能进行一定的调整。<br />比如关于 CommonJS 与 ES Modules 的互相调用，实际上是还没有完全确定下来的（因此我这儿也没有特别去阐述如何使用）。也因此在 Node.js 的文档中，ECMAScript Modules 规范的稳定性等级还是 1，属于  Experimental 。

而个人对于  ECMAScript Modules 规范态度，总体是看好的。强有力的约束有利于 Node.js 去做更多的优化，统一的模块规范则避免了浏览器与 Node.js 生态的进一步割裂。虽然过程是曲折，但前途却充满了光明。

<a name="hf4hP"></a>

### 参考文档

- [ECMAScript Modules](https://nodejs.org/dist/latest-v12.x/docs/api/esm.html) - Node.js 官方文档
- [Plan for New Modules Implementation](https://github.com/nodejs/modules/blob/master/doc/plan-for-new-modules-implementation.md) - Node.js 规划
- [The new ECMAScript module support in Node.js 12](https://2ality.com/2019/04/nodejs-esm-impl.html) - 2ality
- [import.meta](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import.meta) - MDN
