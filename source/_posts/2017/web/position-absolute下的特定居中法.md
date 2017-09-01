---
layout: post
title: position absolute下的特定居中法--挤！
date: 2015-12-10 16:47:24
tags: 前端
---
## 场景重现
使用了Vue+Vue-loader+Webpack，所以是组件化开发的网页。
其中，网页需要实现的效果是点击按钮，弹出照片墙这个div和遮罩。

```html
<template>
	<div class="photowall">
		<pmask></pmask>
		<div class="pcontainer">
			<pheader></pheader>
			<pmain></pmain>
			<pfooter></pfooter>
		</div>
	</div>
</template>
```
遮罩组件的代码如下：
```html
<template>
	<div class="pmask"></div>
</template>

<style type="text/css">
	.pmask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.7;
		z-index: 10;
	}
</style>
```
照片墙主体的代码如下：

```css
.pcontainer {
	width: 1080px;
	min-height: 768px;
	margin: 0 auto;
}
```

为了覆盖，所以才用了position:absolute的方式。
于是很高兴的保存，合并，编译。

但是编译完成后，一点开照片墙，傻眼了。
所有东西都被mask遮罩给覆盖了。
仔细想想，是因为没有设置z-index的缘故。

于是高兴的加上了z-index.

```css
.pcontainer {
	width: 1080px;
	min-height: 768px;
	margin: 0 auto;
	z-index: 999;
}
```

但是发现z-index无效，于是想起来
> 定义的CSS中有position属性值为absolute、relative或fixed，z-index属性才起作用。

于是修改后

```css
.pcontainer {
	width: 1080px;
	min-height: 768px;
	margin: 0 auto;
	z-index: 999;
	position:absolute;
}
```

继续查看修改后的效果。

嗯，整个照片墙显示正常了，但是居中却不起作用了。原因是设置position:absolute后，margin的值就不起作用了。

但是项目要求我们要居中。

## 解决方法

一开始想了一回儿，决定用一个方法，把position:absolute挤到中间去。
因为定位为absolute的元素，会根据最近的父级元素定位。

于是我们在外面套上一个div photomain。
```html
<template>
	<div class="photowall">
		<pmask></pmask>
		<div class="photomain">
			<div class="pcontainer">
				<pheader></pheader>
				<pmain></pmain>
				<pfooter></pfooter>
			</div>
		</div>
	</div>
</template>
```
给photomain加上position:relative，使其成为pcontainer的父元素。
```css
.photomain {
	position: relative;
}
```
同时，给photomain设定和pcontainer一样的宽度，再加上margin:0 auto。
```css
.photomain {
	position: relative;
	width: 1080px;
	margin: 0 auto;
}
```
那么，最后的效果是。pcontainer完美居中。

原因是因为pcontainer跟着photomain一块移动，且宽度一致。

所以相当于photomain的位置就是pcontainer的位置。这样既能达到居中的效果，也能设定z-index值。

## 结语
这应该算小弟的第一篇技术文章，起因是今天下午项目中遇到的BUG，居中的方法也是自己摸索出来的。所以并不清楚这算不算好方法。

不过还是很开心，第一次自己不看百度解决CSS的BUG。
