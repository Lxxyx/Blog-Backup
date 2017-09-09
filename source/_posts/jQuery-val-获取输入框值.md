---
layout: post
title: JS获取输入框的值，替代jQuery val()
date: 2015-12-11 21:54:09
tags: 前端
---
## 场景重现
项目中需要一个发表公告的框，于是就写了一个。
两个输入组件的代码如下。
一个是input,一个是textarea。
```html
<input type="text" id="noticeTitle" />
<textarea id="noticeContent" placeholder="请输入公告内容">
</textarea>
```
实际样子
> ![公告框](http://7xoxxe.com1.z0.glb.clouddn.com/2017-09-09-050019.jpg)

然后需要在点击发布时，把输入的内容通过ajax传送给后台。
之前习惯了jQuery，直接使用val()函数。

```javascript
var title = $("#noticeTitle").val();
var content = $("noticeContent").val();

$.ajax…………
```
但是项目中用到jQuery的地方的屈指可数，于是准备使用原生重写。

## JS重写
之前以为很困难来着，结果没想到这么简单。
通过javascript的value属性，就可以直接获得输入框的值。
```javascript
var title = document.getElementById("noticeTitle").value;
var content = document.getElementById("noticeContent").value;
```

于是完美解决。项目中也减少了jQuery的80k宝贵空间。

## 感想
关于jQuery，之前是用的很开心的。
这次的项目也有好几个地方，使用了jQuery。
但是总觉得有点臃肿和浪费，于是尝试着把jQuery慢慢替换掉。

这是最后一处了。（之前处理了四到五处，一个jQuery的插件也转成了原生javascript版）

总而言之，用原生写JS，也没有自己想的那么难。