title: 莫名其妙出现的jQuery与报错--一次奇妙的Debug旅程
date: 2015-12-10 16:46:49
tags: 前端
---
## 场景重现
项目是一个SPA，使用了Vue+Vue-Router+Webpack+jQuery。
报错的场景如下：
![报错](http://7xk109.com1.z0.glb.clouddn.com/blog-QQ截图20151210172045.jpg)
## 为何称之为莫名其妙？
项目虽然作为一个SPA，也引用了jQuery。
但是！！！我所有的JS文件全部用Webpack打包了呀！
不应该会有单独的jQuery文件啊……
把报错内容上百度一搜索，发现完全不搭架。
于是开始了苦思冥想和Debug。

## Debug
在Debug过程中，发现

1.jQuery的报错是在SPA中两个页面的无刷切换中出现的。
2.出错次数会不断叠加，但对页面任何功能都无影响。

于是尝试中从切换中去寻找答案。
后来发现页面切换部分的代码并没有任何问题。
于是开始思考，Webpack的锅？

仔细想了想后否定了，Webpack会把我用的所有JS文件全打包成一份。不应该有单独的jQuery文件出来。
于是想看看这个jQuery是存放在哪儿的。

把报错的jQuery文件在新页面打开。看向网址
![网址](http://7xk109.com1.z0.glb.clouddn.com/blog-QQ截图20151210173324.jpg)

等等！
网址的前缀是"chrome-extension://"，这个是谷歌浏览器插件的前缀。

难不成，这个jQuery文件是谷歌浏览器插件的？

于是看向了"chrome-extension://ikhdkkncnoglghljlkmcimlnlhkeamad/js/lib/jquery.js"中间的那一串神秘字符串。那是谷歌浏览器插件的“身份证”。

于是在插件管理页面寻找。
![寻找结果](http://7xk109.com1.z0.glb.clouddn.com/blog-QQ截图20151210173737.jpg)

然后把插件禁用后， 再也没报错。
## 感受
Debug完成后，感觉松了一口气的同时，也十分开心。因为开发中总会有各种各样的BUG，像这种莫名其妙的BUG，网上是没有解决方法的。于是只能自己一点一点去推断，去解决。

自己推断的过程，真的好爽~~~（来自文科生的感慨，逃）