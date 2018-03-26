---
layout: post
title: 迁移至Ubuntu的折腾之旅
date: 2016-01-27 18:33:04
tags: 随笔
---
## 前因 
之前一直有装Win10和Deepin的双系统，本打算装了Deepin15后，就安心的在Linux下学习和工作。
但无奈的是，Deepin15基于Debian而非Ubuntu，所以为了装一个shadowsocks的Gui客户端，还得专门去编译。这也就算了，在装上SS后，又安装了Sublime，但Sublime在Linux下有不能输入中文的BUG。 这个问题算是致命问题了，因为我平常90%的开发，都只使用Sublime Text。
于是去找解决方法。一番谷歌之下，告诉我得去新建个c文件啥的。或者去Github上使用一键包。 
我当然用一键包啊，于是很开心的打开了修复包的Github地址，开头第一句话就让我懵逼了。 
``` There still some problems with Debian. ``` 
翻译成中文就是：“Debian用户还是洗洗睡吧。”
再加上Deepin15桌面经常会冒出别的文件夹的新文件，于是心灰意冷的我，开始继续使用Windows做开发。 
<!-- more -->
## 向Ubuntu转移
本来Windows用的也还可以，但是由于自身CPU性能跟不太上(i5-4200u)，用webpack编译个文件要花上40多秒，运行过程中也各种降频，简直不能忍。于是决定上Liunx，同时又因为有Deepin的前车之鉴，所以决定上Ubuntu Kylin。 
嗯，不是Ubuntu，是中国的麒麟版。原因很简单：壁纸好看+内置Chrome和搜狗输入法。 于是在折腾中，开始了Ubuntu Kylin的安装。
## 安装与配置
安装过程倒是稀疏平常，一路next就开始了安装。安装速度很快。不一会儿就提示我安装完成了。
至于分区，当然是用Ubuntu安装界面的一键分区啦。（逃） 配置过程就一帆风顺的多了。

开机，安装更新，git和Shadowsocks，然后就是安装oh-my-zsh。

装上新款的oh-my-zsh后，继续安装nvm用于管理node版本。如果先装nvm再装zsh的话，zsh启动时会读取不到nvm。虽然可以自己去配置文件改，但终究比较麻烦。 接下来用nvm安装node 5.5（版本号更新的好快……），安装国内源的cnpm。也都一下子就过去了。

最难配置的地方，还是在Sublime，下了修复文件修复Sublime不能输入中文的问题后，发现只有在命令行输入`subl`才能启动输入中文的Sublime,于是又深入`/usr/share/applications`去修改`sublime_text.desktop`，把`exec`改为`subl`。顺带还在`default.list`中把默认编辑软件从gedit换成了Sublime。于是耗时好几个小时的Ubuntu，终于完成了。
## 感想 
果然做开发，还是Linux好，不说别的。感觉Linux的幺蛾子比windows要少上很多。用的时候也没用怎么卡顿，编译速度超过windows n+1倍。 不管咋样，寒假就靠ubuntu过啦～