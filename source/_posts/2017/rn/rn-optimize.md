---
title: React Native 性能优化
tags: 前端
date: 2017-09-09 12:40:18
---

## 起因

自己使用 RN 已经很长时间了，但是对于 RN 的了解却不够深入，接下来一段时间会多关注性能优化相关的知识

课程：https://www.youtube.com/watch?v=NdUg_hjI30w

### 加载方式

Native端：Native init 与 JS init
JS端：Fetch Data, JS Render
Native: Native Render

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-035325.jpg)

## 启动流程

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-035558.jpg)

问题：

1. ViewList

## Native端 优化

### 预加载

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-035717.jpg)

具体实现：

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-035929.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-040000.jpg)

### 增量更新

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-040015.jpg)

### 分包

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-040053.jpg)

具体架构：

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-040134.jpg) 

## JS端优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-043608.jpg)

### 加载速度快

本地缓存

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-043656.jpg)

缓存同时也能实现数据复用

非首屏异步加载

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-043823.jpg)

通过 Hack 的方式，使得原有需要5个节点的轮播图，改为只创建3个节点。
通过3个节点，模拟出轮播图的效果

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-043849.jpg)

### 滚动优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044031.jpg)

ListView配置

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044054.jpg)

### 体验优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044202.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044222.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044239.jpg)

目的是为了，点击时按钮先出现点击效果，然后在下一帧执行一些耗时的操作。
视觉优先

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044350.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044407.jpg)

性能与可控性强

### 组件划分

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044429.jpg)

### 其他优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-044518.jpg)