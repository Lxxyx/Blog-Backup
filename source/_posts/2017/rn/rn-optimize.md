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

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045820.jpg)

## 启动流程

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-45821.jpg)

问题：

1. ViewList

## Native端 优化

### 预加载

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045823.jpg)

具体实现：

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045826.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045829.jpg)

### 增量更新

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045838.jpg)

### 分包

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045840.jpg)

具体架构：

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045841.jpg) 

## JS端优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045842.jpg)

### 加载速度快

本地缓存

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045844.jpg)

缓存同时也能实现数据复用

非首屏异步加载

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045845.jpg)

通过 Hack 的方式，使得原有需要5个节点的轮播图，改为只创建3个节点。
通过3个节点，模拟出轮播图的效果

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045846.jpg)

### 滚动优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045847.jpg)

ListView配置

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045849.jpg)

### 体验优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045851.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045852.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045854.jpg)

目的是为了，点击时按钮先出现点击效果，然后在下一帧执行一些耗时的操作。
视觉优先

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045855.jpg)

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045856.jpg)

性能与可控性强

### 组件划分

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-045858.jpg)

### 其他优化

![](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-45859.jpg)