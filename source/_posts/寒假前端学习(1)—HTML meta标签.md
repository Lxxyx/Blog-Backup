title: 寒假前端学习(1)——HTML meta标签总结
date: 2016-01-09 20:32:26
tags: 前端
---
之前学习前端中，对meta标签的了解仅仅只是这一句。
```
<meta charset="UTF-8">
```
但是打开任意的网站，其head标签内都有一列的meta标签。比如我博客的。
![Lxxyx博客的meta标签](http://7xoxxe.com1.z0.glb.clouddn.com/metas.jpg)

但是却自己很不熟悉，于是把meta标签加入了寒假学习计划的最前方。

## 简介
在查阅w3school中，第一句话中的“元数据”就让我开始了Google之旅。然后很顺利的在英文版的w3school找到了想要的结果。（中文w3school说的是元信息，Google和百度都没有相关的词条。但元数据在Google就有详细解释。所以这儿采用英文版W3school的解释。）
> The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.

不难看出，其中的关键是metadata，中文名叫元数据，是用于描述数据的数据。它不会显示在页面上，但是机器却可以识别。这么一来meta标签的作用方式就很好理解了。
### 用处
> Meta elements are typically used to specify page description, keywords, author of the document, last modified, and other metadata.
The metadata can be used by browsers (how to display content or reload page), search engines (keywords), or other web services

这句话对meta标签用处的介绍，简洁明了。
翻译过来就是：meta常用于定义页面的说明，关键字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。

## 组成
meta标签共有两个属性，分别是http-equiv属性和name属性。
### 1. name属性
name属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取。
meta标签中name属性语法格式是：
```
<meta name="参数"content="具体的描述">。 
```
其中name属性共有以下几种参数。<b>(A-C为常用属性)</b>
#### A. Keywords(关键字)
说明：用于告诉搜索引擎，你网页的关键字。
举例：
```
<meta name="keywords"content="Lxxyx,博客，文科生，前端">
```
#### B. description(网站内容的描述)
说明：用于告诉搜索引擎，你网站的主要内容。
举例：
```
<meta name="description"content="文科生，热爱前端与编程。目前大二，这是我的前端博客"> 
```
#### C. viewport(移动端的窗口)
说明：这个概念较为复杂，具体的会在下篇博文中讲述。
这个属性常用于设计移动端网页。在用bootstrap,AmazeUI等框架时候都有用过viewport。

举例（常用范例）：
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```
#### D. robots(定义搜索引擎爬虫的索引方式)
说明：robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。
content的参数有all,none,index,noindex,follow,nofollow。默认是all。

举例：
```
<meta name="robots" content="none"> 
```
具体参数如下：

1.none    : 搜索引擎将忽略此网页，等价于noindex，nofollow。
2.noindex : 搜索引擎不索引此网页。
3.nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。
4.all     : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。
5.index   : 搜索引擎索引此网页。
6.follow  : 搜索引擎继续通过此网页的链接索引搜索其它的网页。

#### E. author(作者)
说明：用于标注网页作者
举例：
```
<meta name="author"content="Lxxyx,841380530@qq.com"> 
```
#### F. generator(网页制作软件)
说明：用于标明网页是什么软件做的
举例(不知道能不能这样写)：
```
<meta name="generator"content="Sublime Text3"> 
```
#### G. copyright（版权）
说明：用于标注版权信息
举例：
```
<meta name="generator"content="Lxxyx"> //代表是Lxxyx版权所有 
```
#### H. revisit-after(搜索引擎爬虫重访时间)
说明：如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。

### 2. http-equiv属性