---
title: DOM Api-insertAdjacent 系列
tags: 前端
date: 2017-09-25 00:33:41
---

## 起因

看朋友圈时候，有看到一个自己从来没有发现过的Api。

![](https://cdn.lxxyx.cn/2018-03-26-085550.jpg)

名字是 insertAdjacentHTML。

觉得很好奇，就试着看了看这个Api，发现在某些场景下，出奇的好用。
<!-- more -->
## 概述

> insertAdjacentElement() 方法将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置。

其他几个 Api 效果类似

## 语法与使用

[element.insertAdjacentHTML](
https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)

直接看这个就行了。

## 兼容性

<p class="ciu_embed" data-feature="insert-adjacent" data-periods="future_1,current,past_1,past_2">
  <a href="http://caniuse.com/#feat=insert-adjacent">Can I Use insert-adjacent?</a> Data on support for the insert-adjacent feature across the major browsers from caniuse.com.
</p>

不难看出这是一套基础的 Api。

## 相应的其他 Api

- Element.insertAdjacentHTML()
- Element.insertAdjacentText()
- Node.insertBefore()
- Node.appendChild() (same effect as beforeend)
