---
title: Rax Hooks 原理
tags: 前端
date: 2019-01-17 14:00:44
---

# 起因

随着 React 版本的更迭，越来越多的新 Feature 加入到了 React 当中，其中需要 Api，在社区都引起了极大的反响与相当的争议。

而 React Hooks ，则是社区最近热议的话题，个人也对其十分的感兴趣。<br />比如下面的例子，便能实现一个简单的计数器。

```jsx
import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

# 简洁而不简单

正如上面的例子说是，Hooks 的代码看上去非常的简洁易懂，然而背后原理却不简单。看似是纯函数，却自身拥有状态。这种“黑魔法”让我着了迷，不自觉的想去了解其中的原理。

在查看源代码与相关文章之前，凭借着自己的编程知识，我做了如下几个假设：

- 使用 Hooks 的函数式组件，看似函数内部并没有保存状态，但其状态一定存在于某个地方，只是我们看不见。
- 由于内部状态依赖于外部调用，因此这种关系是非常脆弱，且容易被更改的，所以使用 Hooks 的组件，需要准备某种强规范才能确保运行时不出问题。

# Rax 与 Hooks

Rax 是阿里巴巴的淘宝前端团队开源的类 React 框架，拥有速度快，体积小，适配多种容器等诸多优点。

官方介绍如下：

> 「Rax 基于 React 的标准，支持在不同容器中渲染，当前最重要的容器即 Weex 和 Web」

<br /><br />而自己在校招时，有幸加入了淘宝前端团队，并且与 Rax 的核心开发者们有过一段时间的讨论与交流，收益颇多。

在 React 甩出 Hooks 这个重磅 Feature 时，我有幸与 Rax 之父元彦讨论过 React Hooks 的实现机制与原理。我当时的想法是 Hooks 是基于 React Fiber 的，没有 Fiber 就没有 Hooks。而元彦则认为目前 Rax 基于递归的方式，也可以做出 React Hooks 的效果。

过了几天，在我日常浏览 Github 获取第一手知识与信息的时候，我看到 Rax 的仓库里多了个 PR：

![image.png](https://cdn.nlark.com/yuque/0/2019/png/98602/1547053973452-a6789e51-7d69-4533-839e-a2e23e817dec.png#align=left&display=inline&height=424&linkTarget=_blank&name=image.png&originHeight=933&originWidth=2287&size=245658&width=1040)

仔细看了一下，不太相信自己的眼睛，随后又认真的看了几遍，确认是 Hooks 相关的 PR。<br />元彦实现了自己的想法，而我在知道自身想法不足之余，也想看看不基于 Fiber 的 Rax，是如何实现 Hooks 的这个 feature。

## 关于 Hooks 的疑惑

首先，看一个上文提到过的 Demo：

```jsx
import { useState, useEffect } from 'rax';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'Count: ' + count;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

这是一个大家都能轻易看懂的 Demo，而从上述的代码中，可以得到三点信息：

- 这个函数式组件会被 Rax 调用
- 函数式组件内部调用了 Rax  内置的  `useState`  方法，来获得最新状态与修改的方法。
- 在调用 `setCount`  改变 `count`  时，也会触发 `useEffect`  所定义的回调

我个人的疑惑如下：

- 函数内部不保存状态，那么这个状态究竟是保存在哪儿，怎么样确保每次重新渲染组件，都能拿到正确的值？
- 在调用修改状态的方法后，为何能触发组件更新？
- 在状态改变后，为何  `useEffect`  也能够被调用？

而在这儿，首先要介绍一下 Rax 是如何渲染函数式组件的。

# Rax Hooks 原理解析

## 函数式组件的渲染

在 Rax 这儿，并没有直接去调用函数式组件，来获取生成的 Elements（created by createElement），而是将函数式组件做了一层包裹，简化后的代码如下：

```jsx
// 函数式组件
if (typeof Component === 'function') {
  // Functional reactive component with hooks
  instance = new ReactiveComponent(Component);
}
```

在代码中，可以看出如果是函数式组件，函数式组件会被   ReactiveComponent  包裹一层。而注释中也明确的写着："Functional reactive component with hooks"。此处不难看出，这个  `ReactiveComponent`  就是 Hooks 的运行时的核心了，并且与  `useState` 、`useEffect`  等 Api 共同组成了 Hooks 这个功能。

首先，让我们来看一看，`useState`  作为核心的 Api，在运行期都做了什么？

## useState 的实现

useState 的 API 如下，传入  initialState，便可以获得两个返回值，state 与 setState，第一个代表当前值，第二个则是函数，可以更新当前值，属于非常简洁易懂的 Api。

```jsx
// 初始化 state
const [state, setState] = useState(initialState);

// 更新状态
setState(newState);
```

> 在这儿其实还有一段小插曲，Hooks 用的是数组解构的方式来传递当前值与更新的函数，有人则在 React RFC 中提出为何不用对象的结构方式，对此官方给出的解释是：对象结构需要指定名字，而基于数组的结构不用，你可以随意命名。

```jsx
// 初始化 state
const [state, setState] = useState(initialState);

// 更新状态
setState(newState);
```

在这儿，我们看向 Rax 中，`useState`   的具体实现方式（为方便理解，精简部分代码）：

```jsx
// 获取当前正在渲染的组件，设置时机如下：
// 此处 Component 为当前正在处理中的组件
// 1. currentInstance = Component
// 2. Component.render() 【也就是说在组件 render 期间，currentInstance 是组件自身】
// 3. currentInstance = null
function getCurrentRenderingInstance() {
  const currentInstance = Host.component._instance;
  return currentInstance;
}

function useState(initialState) {
  const currentInstance = getCurrentRenderingInstance();
  const hookId = currentInstance.getCurrentHookId();
  const hooks = currentInstance.hooks;

  if (!hooks[hookId]) {
    const setState = (newState) => {
      const current = hooks[hookId][0];
      if (newState !== current) {
        hooks[hookId][0] = newState;
        currentInstance.update();
      }
    };

    hooks[hookId] = [initialState, setState];
  }

  return hooks[hookId];
}
```

在 `useState`  函数中，第一步便是取得当前正在渲染中的组件。而 `currentInstance`  这个值，是在组件调用 render 前被设置的，render 结束后便会被设置为 null。

而这也就意味着：组件在 `render`  期间调用 `useState`  ，`useState`  函数是可以知道当前渲染的组件的，同一个函数式组件的调用，拿到的  `currentInstance`  永远是其自身。

我们的疑惑点在于：函数内部不保存状态，那么这个状态究竟是保存在哪儿，怎么样确保每次重新渲染组件，都能拿到正确的值？

现在看来，一切仿佛都有了头绪，既然我能在调用  `useState`  时，拿到当前的实例且同一个函数式组件，每次调用  `useState`  都能获取到当前实例。那么**当前实例将会是一个保存与隐藏组件状态的最佳地点。**

原因如下：

- 同一组件，获取到  `currentInstance`    始终是其自身，储存其中的数据，并不受 Rax 的更新影响
- 不同组件，获取到的实例也不一样，通过  `useState`  获取到的状态，也互不影响

这样一来，所有的函数式组件，调用的同一个  `useState`  方法，却互不影响，既保证了代码的整洁性，又保证了功能的完善性，该处理方法不可谓不巧妙。

而在前面我们提到过，Rax 的函数式组件，是被 `ReactiveComponent`  所包裹着的，而在  `useState`  的具体实现中，也出现了 `getCurrentHookId`  等属于  `ReactiveComponent`  的方法调用，因此想要理解透彻 Rax 的 Hooks 机制，我们需要看  ReactiveComponent 的实现。

## ReactiveComponent 的实现

首先，看源代码（为方便理解，精简部分代码）：

核心参数解释如下：

- pureRender：传入的函数式组件，调用方式如下：

```jsx
// 函数式组件
function Component() {
  return <h1>Hello Hooks</h1>;
}

// 函数式组件的初始化
if (typeof Component === 'function') {
  // Functional reactive component with hooks
  instance = new ReactiveComponent(Component);
}
```

ReactiveComponent 源码：

```jsx
function scheduleImmediateCallback(callback) {
  setTimeout(callback, 99);
}

class ReactiveComponent extends Component {
  constructor(pureRender) {
    super();
    // A pure function
    this.pureRender = pureRender;
    this.hooksIndex = 0;
    this.hooks = {};
  }

  getCurrentHookId() {
    return ++this.hooksIndex;
  }

  // Async update
  update() {
    scheduleImmediateCallback(() => this.forceUpdate());
  }

  render() {
    this.hooksIndex = 0;
    let children = this.pureRender(this.props);
    return children;
  }
}

export default ReactiveComponent;
```

而此时再看  useState 的源码，一切都清晰了起来。

```jsx
// useState 源码

// 获取当前实例，此处指的是 ReactiveComponent
const currentInstance = getCurrentRenderingInstance();
// 获取当前调用的 Hooks 下标，用于解决函数式组件内调用多个 Hooks 的问题
const hookId = currentInstance.getCurrentHookId();
// 之前存放的 Hooks，
const hooks = currentInstance.hooks;

// 如果是首次渲染，则创建这个 Hooks 的值与对应的更新函数
// hooks[hookId] 指代当前调用的 Hooks 所对应的 [state, setState]
if (!hooks[hookId]) {
  // 更新函数
  const setState = (newState) => {
    // 上一次的 state 值
    const current = hooks[hookId][0];
    if (newState !== current) {
      // 如果值更新了则更新 State
      hooks[hookId][0] = newState;
      // 调用 ReactiveComponent 的 update 方法
      // 而 update 方法会在 99ms 后调用 forceUpdate 来更新组件
      currentInstance.update();
    }
  };

  hooks[hookId] = [initialState, setState];
}

// 返回当前调用的 Hooks 所对应的 [state, setState]
return hooks[hookId];
```

> 引申出一个小话题
> Q：Why ReactiveComponent 在调用 update 方法时，需要延迟 99ms 执行？
> A：Rax 中 forceUpdate 是同步执行的，如果  update 方法同步执行，则会造成 Hooks 下标的错乱问题。

大家有注意到，在这儿，我们提起了一个之前未曾提起的概念：当前执行 Hooks 的下标。由于函数内部可能会不止一次调用 Hooks ，因此需要实现一个多次调用钩子的解决方案。

## 多次调用 Hooks 的实现方式

首先，看一段代码：

```jsx
// useState.js
const hookId = currentInstance.getCurrentHookId();

// ReactiveComponent
getCurrentHookId() {
  return ++this.hooksIndex;
}

render() {
  this.hooksIndex = 0;
  let children = this.pureRender(this.props);
  return children;
}
```

在组件 Render 前，ReactiveComponent 会把  hooksIndex 设置为 0，而在后续的过程中，每次调用  useState 等 Hook 时，都会将  hooksIndex 执行 +1 操作。而这样则保证了，同一个组件内部，不同的 Hooks 调用，相互之间是不影响的。

这样一来，便允许函数内部存在多个 Hooks，且相互之间不影响。因为每次调用时，都会获取到一个独一无二的下标。

但是这样做，也带来了另外一个问题，那就是函数内部的 Hooks 调用是强依赖于执行顺序的。

## Hooks 所带来的问题

具体原因可以看下面一段伪代码：

```jsx
function Example(props) {
  let count, setCount;

  if ((props.useCounter = true)) {
    [count, setCount] = useState(0);
  }

  const [name, setName] = useState('Hello');

  return (
    <div
      onClick={() => {
        setCount && setCount((count += 1));
      }}
    >
      {name}： {count}
    </div>
  );
}

Example({ useCounter: true });
Example({ useCounter: false });
```

我们知道，hooks[hookId] 代表着对应 Hooks 存放数据的地方，而在此处，第一次渲染时，Props 中的 useCounter 为 True，此时：

```jsx
hooks[0] = [count, setCount];
hooks[1] = [name, setName];
```

而第二次渲染时，Props 中的 useCounter 为 False，而 Hooks 是不会重复创建的，因此：

```jsx
// example.js
const [name, setName] = useState('Hello');

// useState.js
// 调用 useState('Hello') 时
hookId = 0;
hooks[0] = [count, setCount];
return hooks[0];
```

你调用的明明是 `useState('Hello')` ，但返回的却是 `hooks[0] = [count, setCount]` ，这就会引发未知的 BUG。

而这恰恰也是 Hooks 所带来的问题与争议，React 开始变的不那么明确，或多或少的有了一些隐式规则，对于这个问题，Facebook 官方提出的解决方案是引入一个 ESLint 插件，来确保 Hooks 的正确书写。

插件地址如下：[https://github.com/facebook/react/blob/ab03e3d6518ae3c68feca8d5debf2ef69a91a38c/packages/eslint-plugin-react-hooks/README.md](https://github.com/facebook/react/blob/ab03e3d6518ae3c68feca8d5debf2ef69a91a38c/packages/eslint-plugin-react-hooks/README.md)

解决了一个问题，引入了新的问题，打上了新的补丁。

## useEffect 的实现

在上文中，我们解答了最开始的两个疑惑：

- 函数内部不保存状态，那么这个状态究竟是保存在哪儿，怎么样确保每次重新渲染组件，都能拿到正确的值？
- 在调用修改状态的方法后，为何能触发组件更新？

我们还剩下最后一个疑惑：“在状态改变后，为何  `useEffect`  也能够被调用？”。

如下面的例子：

```jsx
function Example() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return <p>Window width is {width}</p>;
}
```

就实现了以下的效果：

- 状态改变后， `useEffect`  也能够被正确调用
- useEffect 可以返回一个函数，在组件取消订阅时使用

这儿需要再次看向  ReactiveComponent 的源代码（精简部分逻辑）：

```jsx
class ReactiveComponent extends Component {
  constructor(pureRender) {
    super();
    // A pure function
    this.pureRender = pureRender;
    this.hooksIndex = 0;
    this.hooks = {};
    this.didMountHandlers = [];
    this.didUpdateHandlers = [];
    this.willUnmountHandlers = [];
  }

  componentDidMount() {
    this.didMountHandlers.forEach((handler) => handler());
  }

  componentDidUpdate() {
    this.didUpdateHandlers.forEach((handler) => handler());
  }

  componentWillUnmount() {
    this.willUnmountHandlers.forEach((handler) => handler());
  }

  getCurrentHookId() {
    return ++this.hooksIndex;
  }

  // Async update
  update() {
    scheduleImmediateCallback(() => this.forceUpdate());
  }

  render() {
    this.hooksIndex = 0;
    let children = this.pureRender(this.props, this.forwardRef ? this.forwardRef : this.context);
    return children;
  }
}

export default ReactiveComponent;
```

在  ReactiveComponent 中，与之前的代码对比，主要是增加了 Handlers 这个概念。Handlers 是数组，里面会存放函数，并且在对应的生命周期执行时，执行该函数。

主要涉及以下几个生命周期：

- componentDidMount
- componentDidUpdate
- componentWillUnmount

包括了组件的初次挂载，升级，卸载这三个步骤。

让我们继续看一下 useEffect 的源码（为方便理解，精简部分代码）：

```jsx
function useEffect(effect) {
  useEffectImpl(effect);
}

function useEffectImpl(effect) {
  const currentInstance = getCurrentRenderingInstance();
  const hookId = currentInstance.getCurrentHookId();
  const hooks = currentInstance.hooks;

  if (!hooks[hookId]) {
    const create = () => {
      const { current } = create;
      if (current) {
        destory.current = current();
        create.current = null;
      }
    };

    const destory = () => {
      const { current } = destory;
      if (current) {
        current();
        destory.current = null;
      }
    };

    create.current = effect;

    currentInstance.hooks[hookId] = {
      create,
      destory,
    };

    currentInstance.didMountHandlers.push(create);
    currentInstance.willUnmountHandlers.push(destory);
    currentInstance.didUpdateHandlers.push(() => {
      const { destory, create } = hooks[hookId];
      destory();
      create();
    });
  } else {
    const hook = hooks[hookId];
    const { create } = hook;
    create.current = effect;
  }
}
```

通过分析源代码，我们可以得知，useEffect 会在初次挂载时，创建两个函数，create 与 destory。并且订阅了  ReactiveComponent 组件的生命周期。

也就是这一段：

```jsx
currentInstance.didMountHandlers.push(create);
currentInstance.willUnmountHandlers.push(destory);
currentInstance.didUpdateHandlers.push(() => {
  const { destory, create } = hooks[hookId];
  destory();
  create();
});
```

### create 函数

在组件触发  componentDidMount 时，会触发  create 函数，用于初始化钩子，而 create 函数会调用 useEffect 中传入的回调。

```jsx
function useEffectImpl(effect) {
  const create = () => {
    const { current } = create;
    if (current) {
      // 如果有返回值，则将 destory.current 设置为 返回值
      destory.current = current();
      create.current = null;
    }
  };

  create.current = effect;
}
```

这儿需要注意的是，由于 useEffect 通常会用来处理一些副作用，比如订阅某些事件，所以 useEffect 在设计 Api 时，是支持传入的 effect ，在调用后有一个函数的返回值，用于在组件更新或者销毁时，取消订阅的。

如下面的代码所示：

```jsx
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});
```

### destory 函数

destory 函数在此处的作用比较单纯，就是在触发该函数时，会触发 effect 的回调值。用于取消事件订阅。

### 组件更新触发 useEffect

在这儿，我们之前提出的第三个问题：“在状态改变后，为何  `useEffect`  也能够被调用？” 也能够得到解答。

在 useEffect 钩子第一次在组件内部使用时，它会订阅组件的  componentDidUpdate 事件，在组件升级后，它将依次调用  destory 与  create 函数。

```jsx
currentInstance.didUpdateHandlers.push(() => {
  const { destory, create } = hooks[hookId];
  destory();
  create();
});
```

而之所以先调用  destory 的原因，是需要先取消之前的订阅，然后再执行订阅的流程。<br />这样也就避免了，多次订阅所带来的问题，确保每次只会订阅一次。

## 那些没有提到的

在写这篇文章时，贴出源代码的部分，我都会加上“为方便理解，精简部分代码”这句话。因为随着 Rax 的能力增强，其项目整体的复杂度也在逐渐的提高。

在文章中，为了能让读者清晰的了解到 Hooks 是什么，与 Rax 的实现方式，我精简了许多代码。包括异步更新/Ref 的处理/重复循环的检测。<br />而这些东西，也同样的有价值，具有其闪光之处，建议有兴趣进一步了解 Rax Hooks 实现的同学，自行前往 Rax 的仓库中阅读源代码，你会收获的更多。

Rax 仓库地址：[https://github.com/alibaba/rax/tree/master/packages/rax](https://github.com/alibaba/rax/tree/master/packages/rax)

# Hooks 将给我们带来什么

在 Hooks 出现之前，React 在实现部分功能时，因为涉及到生命周期等操作，是略微繁琐的。<br />而这时候的解决方法是 HOC，将组件包裹一层，但是组件包裹多了也不好呀，看起来整个层级就会特别的深。<br />而 Hooks 的出现，以其简洁的 API，解决了这个问题。<br />Hooks 将给我们带来的，首先是代码量上的减少。

当函数具有生命周期，可以通过 Hooks 做很多 Class Component 才可以做到的事情，也预示了 Class Component 在将来很长的一段时间内，不再是唯一推荐的范式。又随着 Memo 等 Api 的出现，函数式组件第一次可以尝试与  Class Component 做一番较量。<br />Hooks 将给我们带来的，是 React 编程范式的变更。

# 总结

纵观 React 发布这几年，官方推荐的编程范式随着时代不断的变更着。万变不离其宗的，是 React 希望做好 View 层框架的基础理念。Mixins/HOC/Class Component/Hooks，概念总是在增加，在变化。

在学习 Hooks 过程中，比起 Api 与具体的实现，我更为关注的是 Why Hooks？<br />把握 React 这一类框架在技术选型， Api 设计上的思考，可以很好的让自己了解到整个前端框架界，遇到的实际问题，大家的想法与最后的解决方案。

很多时候，选择做不做一件事情，比起把所有功能都提供给用户，是一件更难的事情。这意味着你需要在万千种范式中选择出最合适的几种，融入自己的思考，形成一套新的体系。在功能完善的同时还需要足够好用。

如果说自己想要什么的话，大概就是上面提到的，希望自己可以有一双智慧的双眼，可以指引自己做出正确的选择。

# 附录

## Rax 1.0 思考

随着前几天 [Rax 1.0 Api PR](https://github.com/alibaba/rax/pull/856)  的提出，Rax 正式确定了自己在新版本中的方向。<br />有一个比较大的改动是，Rax 将原有属于 JSX 的 Component/PropTypes/isValidElement 等 Api 抽离出来，打成了一个单独的包。<br />单独看可能还不是很理解意义何在，但是在这之前，Rax 还做了一波改动，使其能够支持 3 种 DSL：<br /><br />

- JSX（React Style）
- SFC（Vue Style）
- 小程序

这样看来，将原有属于 JSX 的一些 Api 抽离出来，单独打包的意义也就凸显了出来：

- 精简 Rax，减少 Bundle Size（12kb -> 8kb）
- Core 的 Api 更为精简，可以支持多种 DSL
- 业务的选择与定制性更强，只需要引入自己需要的 Api 对应的 package，就可以实现部分功能。

当然这种拆成多个 Package 的方式也并非没有缺陷，比如业务使用起来需要引入多个  Package，同时也需要管理多个 Package 的版本。<br />就像那天和元彦聊 React 一样，他说过一个技术有优势肯定也有其劣势，并没有什么技术是完美无缺可以 Cover 到所有 Case 的。而 Rax 1.0 的升级也一样，有优势也有缺点。

期待后续 Rax 的升级与改进，想知道 Rax  如何将 1.0 拆分多个 Package 所带来的影响降低到最小，也想了解在引入 Hooks 后会产生如何的化学反应。
