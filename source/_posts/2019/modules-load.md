---
title: 从改变加载路径开始，一探 Node 的模块加载机制
tags: 前端
date: 2019-07-30 24:54:25
---
<a name="968aa9a1"></a>
## 起因

最近因为工作等原因，开始接触到 ncc 这样的 Node 打包方案，而在阅读其源代码的时候，看到了如下的一段代码，用来引入 Typescript 模块的，代码不长，但是很有意思。

代码如下：

```typescript
const { Module } = require('module');

const m = new Module('', null);
m.paths = Module._nodeModulePaths(process.cwd() + '/');

let typescript;
try {
  typescript = m.require('typescript');
  console.log("ncc: Using typescript@" + typescript.version + " (local user-provided)");
} catch (e) {
  typescript = require('typescript');
  console.log("ncc: Using typescript@" + typescript.version + " (ncc built-in)");
}

module.exports = typescript;
```

整个代码的运行规则比较简单，当本地存在 TypeScript 模块时，则引入本地的，否则引用当前项目中内置的 TypeScript。<br />仔细想想，这其实在开发工具时是一个非常常见的需求，部分涉及到运行时的依赖，框架在调用时希望优先引用用户本地的版本，本地不存在则引用内置或者全局安装的版本。

而我则对其原理产生了好奇，自己之前也没有见过 module 模块，更没有见过这种可以自由改变模块加载时搜索路径的用法。

本文则是本人的探秘之旅，也仅仅专注于这一个问题上，并不扩散。

<a name="e2f8bf5c"></a>
## module 模块的实现

Node 中，关于 Module 部分的源代码在 [lib/internal/modules/cjs/loader.js](https://github.com/nodejs/node/blob/b04de23afa6da18d7b81b70c1a4bb53476f125c7/lib/internal/modules/cjs/loader.js) 中。整个文件的“分量”还是有些重的，代码量高达 1000+ 行。

直奔主题，从代码中我们不难发现，我们首先初始化了一个 Module 的实例，并通过调用 `_nodeModulePaths` 的静态方法，设置实例的 paths 为当前目录。

那么，通过对以下几个要点的探索，我们应该就可以得出想要的答案：

- `_nodeModulePaths` 方法内部的实现
- Module 实例中，paths 变量的作用
- 调用 Module 实例的 require 方法，是怎么样引入模块的

<a name="41fc29c7"></a>
## _nodeModulePaths，引用模块时，逐级查找 node_modules 的秘密

在代码中，我们通过 `Module._nodeModulePaths(process.cwd() + '/')` 的方式，来设置 Module 的 `paths` 变量。

而这也是一段非常有趣的代码，大家都知道 Node 在定位模块时，是会逐级的向上查找的。而向上查找路径的生成代码，就是这个 `_nodeModulePaths` 函数。

代码如下：

```typescript
const CHAR_FORWARD_SLASH = 47;
const nmChars = [115, 101, 108, 117, 100, 111, 109, 95, 101, 100, 111, 110];
const nmLen = nmChars.length;

function _nodeModulePaths(from) {
  // Guarantee that 'from' is absolute.
  // Return early not only to avoid unnecessary work, but to *avoid* returning
  // an array of two items for a root: [ '//node_modules', '/node_modules' ]
  if (from === "/") return ["/node_modules"];

  // note: this approach *only* works when the path is guaranteed
  // to be absolute.  Doing a fully-edge-case-correct path.split
  // that works on both Windows and Posix is non-trivial.
  const paths = [];
  var p = 0;
  var last = from.length;
  for (var i = from.length - 1; i >= 0; --i) {
    const code = from.charCodeAt(i);
    if (code === CHAR_FORWARD_SLASH) {
      if (p !== nmLen) paths.push(from.slice(0, last) + "/node_modules");
      last = i;
      p = 0;
    } else if (p !== -1) {
      if (nmChars[p] === code) {
        ++p;
      } else {
        p = -1;
      }
    }
  }

  // Append /node_modules to handle root paths.
  paths.push("/node_modules");

  return paths;
}
```

> [Online Demo](https://codesandbox.io/s/ecstatic-ganguly-m1n9f)


调用如下：

```typescript
console.log(_nodeModulePaths("/Users/lxxyx/playground/node"));

// output
["/Users/lxxyx/playground/node/node_modules", "/Users/lxxyx/playground/node_modules", "/Users/lxxyx/node_modules", "/Users/node_modules", "/node_modules"]
```

可以看到，这个路径是由传入的目录决定，并逐级生成的。

因此，在此我们可以明确我们的两个疑惑：

- `_nodeModulePaths` 方法内部的实现：通过对传入路径的处理，生成 Node 引用模块时逐级引用的目录，**由于是根据用户传入的变量生成的，因此也会改变引用模块的初始路径**
- Module 实例中，paths 变量的作用： Node 引用模块时逐级引用的目录路径

<a name="a223feb0"></a>
### require 方法，引入模块的具体实现

require 方法应该是每个接触 Node 同学最为熟悉的函数之一，其核心作用便是引用模块。

> 而之前的我却也只是知其然而不知其所以然，只是看些文章，未曾深入的学习与理解，似懂非懂的。


首先我们看像 require 的源代码：

```typescript
// Loads a module at the given file path. Returns that module's
// `exports` property.
Module.prototype.require = function(id) {
  validateString(id, 'id');
  if (id === '') {
    throw new ERR_INVALID_ARG_VALUE('id', id,
                                    'must be a non-empty string');
  }
  requireDepth++;
  try {
    return Module._load(id, this, /* isMain */ false);
  } finally {
    requireDepth--;
  }
};
```

代码相对简单，核心逻辑都在 `Module._load` 方法中实现了。

<a name="848f15da"></a>
## Module._load，引入模块的内部实现

`Module._load` 方法是一段较长的函数，有五六十行，里面包括了模块的加载、缓存、解析等机制，可以说是引入模块的核心逻辑。

而 Node 的开发者们，也非常贴心的留下了注释供我们参考：

> // Check the cache for the requested file.
> // 1. If a module already exists in the cache: return its exports object.
> // 2. If the module is native: call
> //    `NativeModule.prototype.compileForPublicLoader()` and return the exports.
> // 3. Otherwise, create a new module for the file and save it to the cache.
> //    Then have it load  the file contents before returning its exports
> //    object.


由于内部逻辑较多，且许多与本次探讨的内容无关，因此关于该方法，我会着重于探索以下几个问题（也是个人比较感兴趣的）：

- 缓存逻辑是怎么实现的
- Node 如何加载一个模块，模块中调用的 `exports/require` 等对象又是从哪儿来的
- 加载模块时，如何通过 `paths` 变量改变引入模块时查找的 node_modules 目录

<a name="b89974c5"></a>
### 缓存逻辑的实现

Node 中关于 require 的缓存逻辑比我想的要简单许多。<br />缓存仅仅是一个对象，通过：`Module._cache = Object.create(null);` 来创建。

每次加载文件时，当发现这是一个新文件时，则通过唯一的文件名作为 Key，存入该模块的实例。<br />而当重复加载某文件时，则会先检查缓存中是否已存在，有的话则返回已存在的实例。

代码：

```typescript
// 设置缓存
Module._cache[filename] = module;

// 从缓冲中取出
const cachedModule = Module._cache[filename];
if (cachedModule !== undefined) {
   return cachedModule.exports;
}
```

通过这也不难发现，如果一个文件被缓存起来了，那么在整个生命周期内，它都是在缓存中的。

想要更新也很简单，清空一下 cache 对象即可，而我们常用的清除 require.cache 方式，实际上是清空的 Module 的 _cache，这一点在代码中也有所表示：

```typescript
require.cache = Module._cache;
```

<a name="5318d5d0"></a>
### 如何加载一个 JS 模块

在 Node 中，加载某个具体的文件是通过 `module.load(filename);` 方法实现的。

`load` 方法源码如下：

```typescript
// Given a file name, pass it to the proper extension handler.
Module.prototype.load = function (filename) {
  debug('load %j for module %j', filename, this.id);

  assert(!this.loaded);
  this.filename = filename;
  this.paths = Module._nodeModulePaths(path.dirname(filename));

  const extension = findLongestRegisteredExtension(filename);
  Module._extensions[extension](this, filename);
  this.loaded = true;
};
```

在源码中有一行关键的代码：`Module._extensions[extension](this, filename);`。而这行代码负责引入文件的编译与执行，这也是我们本次想了解地方。

`Module._extensions` 实际上是一种模块加载的机制，通过定义后缀名与处理方法，来去支持某个文件在 Node 代码中的直接引入。

JS 代码的处理如下：

```typescript
// Native extension for .js
Module._extensions['.js'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  module._compile(content, filename);
};
```

<a name="29269923"></a>
### 模块的编译与执行

从代码中不难看出，此处先读取了代码的内容，并且 JS 代码进行了编译操作。

而在 `module._compile` 的[实现](https://github.com/nodejs/node/blob/b04de23afa6da18d7b81b70c1a4bb53476f125c7/src/node_contextify.cc#L986)中，调用了 C++ ，将其包裹为一个函数：

比如你书写的代码：

```typescript
const fs = require('fs');

fs.readFile('./file.txt', 'utf-8', (err, data) => {
  console.log('data: ', data);
});
```

将在 compile 后变为：

```typescript
(function (exports, require, module, __filename, __dirname) {
    const fs = require('fs');
    fs.readFile('./file.txt', 'utf-8', (err, data) => {
      console.log('data: ', data);
    });
});
```

这其中就包括了运行时的一些关键变量，exports/require/__filename 等。<br />执行时则是通过传入这些预先定义或者生成好的变量，[来执行并拿到结果](https://github.com/nodejs/node/blob/b04de23afa6da18d7b81b70c1a4bb53476f125c7/lib/internal/modules/cjs/loader.js#L867-L868)：

而执行结果，就包括 module.exports 变量，可以通过这个变量拿到这个模块导出的所有内容。<br />至此，我们就可以将整个 require 的链路完整的串起来了。

<a name="c09bb1dd"></a>
### paths 变量对于引用模块的影响

回到我们一开始的问题，我们通过定义 paths ，使得 require 的查找路径可以从我们指定的目录开始。<br />那么自然我们也想知道这部分在代码中是如何实现的。

在代码中，关于这部分的代码有这么几段：

- 基于传入的 paths 生成最终需要查找的目录：[链接](https://github.com/nodejs/node/blob/b04de23afa6da18d7b81b70c1a4bb53476f125c7/lib/internal/modules/cjs/loader.js#L692)
- 依据 paths ，逐级查找 npm 包：[链接](https://github.com/nodejs/node/blob/b04de23afa6da18d7b81b70c1a4bb53476f125c7/lib/internal/modules/cjs/loader.js#L413)
- 根据 npm 包中的 main 字段，定位到最终 require 的文件：[链接](https://github.com/nodejs/node/blob/b04de23afa6da18d7b81b70c1a4bb53476f125c7/lib/internal/modules/cjs/loader.js#L212)

那么关于这个问题，我想也有明确的答案了。

<a name="7a0a21d5"></a>
## 后记

而此次对于 Node 模块加载机制的深入学习与了解，于我而言是更了解底层实现的一个过程，除此之外感受最深的则是：代码虽然很多，但读起来完全不会觉得累或者绕弯子。看似冗长的变量名，恰到好处的注释，一点也不“优雅”的代码组织方式，恰恰让这段代码比许多代码都要好读。

现在想想，ES201X / TypeScript / ESLint 等诸多工具，其实与能不能写出好的代码关系不大，从道术器的理论来探讨，工具也只是“器”而已，具体还是要看使用者的道行。

希望自己将来也可以写出这种“容易看懂”的代码吧~
