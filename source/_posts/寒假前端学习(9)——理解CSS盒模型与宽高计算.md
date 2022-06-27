---
layout: post
title: 寒假前端学习(9)——理解CSS盒模型与宽高计算
date: 2016-02-09 19:46:17
tags: 前端
---
## 起因
盒模型是CSS的核心知识，属于那种不掌握好，在实际工作中就容易犯迷糊的知识。
至于本篇文章，主要解决一个问题，那就是CSS盒模型的计算方法。至于别的知识，也算是自己回忆和复习一次。
<!-- more -->
## 盒模型的构成
关于盒模型的构成，算是前端的基础知识了。网络上关于这方面的知识也是多如牛毛。所以这儿我就用Chrome浏览器控制台的盒模型图。（毕竟最贴近实际开发环境）
![盒模型构成图](/images/2018-03-26-85833.png)
可以看到盒模型由`margin`,`border`,`padding`,`content（中心部分0x0的那个框）`四部分组成。
如果要形象化的理解呢，我们举个栗子~

这儿有一个仓库，仓库里是各式各样的箱子。仓库代表网页，箱子代表独立的div。
两个箱子之间的空隙，就是margin。
箱子当然有自己边框了，每个箱子边框的厚度不一。这个边框，就是border。厚度呢就是border的大小。
箱子里面当然也装着各式各样的货物，箱子里面所有的货物，就是content。
但是货物也有可能没把箱子堆满，那么箱子内除去货物的空白部分，就是padding了。

这就是我对盒模型在现实中的理解。
## 盒模型的宽度计算
盒模型的宽度计算，不复杂但也不好玩。因为一个盒模型的宽度，不只是计算其content的宽度，还会加上元素的边框与内边距。

用个demo，就很好理解了。在demo中，两个div的宽度是一致的。(demo出处在底部)
```html
.simple {
  width: 500px;
  margin: 20px auto;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border-width: 10px;
}
```
但实际情况，却是这样的:
![盒模型demo](/images/2018-03-26-085835.png)
这是因为盒模型计算宽度时，加上了padding和border的宽度。所以第二个元素看起来要比第一个元素大。

这样对于计算盒模型宽度是不利的，因为比较繁琐。于是后来人为了解决这个问题，在CSS3中给盒模型加入了新属性：`box-sizing`。
## CSS3的box-sizing
`box-sizing`共两个属性，一个是`content-box`，一个是`border-box`。
设置为`content-box`则盒模型宽度计算方法同CSS2.1，计算内边距和边框。所以这儿我们着重讲解`border-box`。

当设置一个盒模型为`box-sizing: border-box`时，这个盒子的内边距和边框都不会再增加它的宽度。

继续看第二个demo。在这儿，我们给所有盒模型统一设置`box-sizing: border-box`。
```css
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
.simple {
  width: 500px;
  margin: 20px auto;
}

.fancy {
  width: 500px;
  margin: 20px auto;
  padding: 50px;
  border: solid blue 10px;
}
```
那么，出来的效果会是这样的。
![box-sizing demo](/images/2018-03-26-085838.png)

可以看到两个盒模型的宽度一致了。
这是因为之前设置的宽度，是元素的宽度。而内边距和边框在元素宽度外绘制。
而设置`border-box`时，内边距和边框都在设定的宽度内进行绘制。元素宽度需要由设定宽度减去内边距和边框得到。

怎么样，是不是很容易理解呢？至于高度，计算原理同上。这儿就不赘述啦。
### 小tips
算是个自己写网页时经常碰到的问题，那就是如果给一个元素设置`background`时，背景颜色的范围将包括内边距。
## 总结
要说总结的话，这节应该是自己学的最轻松的一部分。之前都是盲点和难点，这里却只是似懂非懂。看了看文档就瞬间明白了。然后想了想，还是写篇博客出来，因为好记性不如烂笔头~

然后再放上参考链接，有兴趣多了解的同学，也可以点开看看。

前端路漫漫，且行且歌~
---
参考链接：
> [CSS - 盒模型（也是demo来源）](http://zh.learnlayout.com/box-model.html)
> [CSS - 盒模型 - box-sizing](http://zh.learnlayout.com/box-sizing.html)
> [CSS3 box-sizing 属性](http://www.w3school.com.cn/cssref/pr_box-sizing.asp)
