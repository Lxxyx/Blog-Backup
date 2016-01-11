title: 寒假前端学习(2)——HTML语义化标签探析
date: 2016-01-10 20:18:24
tags: 前端
---
## 什么是HTML语义化
HTML语义化就是根据具体内容，选择合适的标签进行代码的编写。便于开发者阅读和写出更优雅的代码，同时让搜索引擎的爬虫能更好的识别。
## 为什么要语义化
1. 有利于SEO:搜索引擎的爬虫是读不懂无语义的span和div的，因此语义化标签能使爬虫抓取更多的有效信息。
2. CSS文件读取失败的准备：万一CSS文件挂了，语义化的HTML也能呈现较好的内容结构与代码结构。
3. 方便其它设备的解析(如屏幕阅读器、盲人阅读器、移动设备)。
4. 便于团队开发和维护。

## 具体的语义化标签探析
本文主要是为了探析部分HTML标签在语义化中的差别。同时也探索HTML5新加入的语义化标签。
### 1. ul/ol(列表标签)
ul和ol虽然都是列表项，但是具体使用时，差别还是很大的。

#### A. ul(无序列表)
说明: ul的英文全称为`unordered list`，翻译成中文就是无序列表。表示列表中的项目。是没有先后顺序的。网页中大部分列表均为无序列表。
```
<ul>
  <li>Lxxyx的博客</li>
  <li>Lxxyx的评论</li>
  <li>联系Lxxyx</li>
</ul>
<!-- 列表中的三个项目，均没有前后顺序的分别。 -->
```
#### B. ol(有序列表)
说明: ol的英文全称为`ordered list`，表示列表中的项目。是有先后顺序的。这一点是ol和ul的本质区别。
```
<ol>
  <li>1. Lxxyx的第一篇文章</li>
  <li>2. Lxxyx的第二篇文章</li>
  <li>3. Lxxyx的第三篇文章</li>
</ol>
<!-- 列表中的三个项目，有前后顺序的分别。 -->
```

### 2. dl,dt,dd(定义列表)
说明: dl,dt,dd是自定义列表，但是使用上又与前面的ul/ol有所不同。自定义列表不仅仅是一列项目，而是项目及其注释的组合。

1. dl: 英文意思为`definition list`，作用是定义列表。
2. dt: 英文意思为`defines terms`，作用是定义列表中的项目。
3. dd: 英文意思为`defines description`，作用是定义列表中项目的注释。

举例:
```
<dl>
   <dt>计算机</dt>
   <dd>用来计算的仪器 ... ...</dd>
   <dt>显示器</dt>
   <dd>以视觉方式显示信息的装置 ... ...</dd>
</dl>
```
效果图: 
> ![dldtdd效果图](http://7xoxxe.com1.z0.glb.clouddn.com/dldtdd.png)

### C. b/strong , i/em(强调标签)
说明: 在HTML中，b和strong都是加粗，i和em都是斜体。但是从HTML4到HTML5中，又发生了转变。所以有必要写下来。
#### 1. b/strong(加粗)
说明:虽然b和strong的展示效果一样，都是将字体加粗表示。但是b在HTML5中又发生了变化。
1. b标签(bold):

> HTML4的定义:
The `<b>` tag is for "offset text conventionally styled in bold,without conveying any extra emphasis or importance.
<!-- 意思为b标签仅仅表示加粗，不带有任何强调的意味。(只是为了排版或者好看) -->
<hr/>
> HTML5的定义:
The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood.
<!-- 意思为表示“文体突出”文字，通俗讲就是突出不安分的文字。像概要中的关键字，产品名。或者代表强调的排版方式 -->

2.strong标签(全称是stronger emphasis):
> `<strong>` represents a span of text with strong importance.a <strong> tag within another <strong> tag has even more importance. 
<!-- 意思为strong标签是语气加重，更为重要的强调，如果两个strong标签嵌套还表示极度重要。strong的重要程度是要大于em标签的 -->

总结：b仅仅只是加粗，并没有任何语义。但是strong标签则有语气加重的强调的意思。
#### 2. i/em(斜体)
说明:就像b和strong的关系一样。i和em的对应关系也很容易理解。
1. i标签(全称是italic):

> HTML4的定义:
The `<i>` tag is for "text conventionally styled in italic". There is no semantic meaning.
<!-- HTML4意思为i标签仅仅只是将字体显示为斜体，无任何语义化意思 -->
<hr/>
> HTML5的定义:
The i element now represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose.
<!-- 意思为i元素现在表现为在文章中突出不同意见或语气或的一段文本,例如外语，科技术语、或者是排版用的斜体文字 -->

2. em(全称是emphasis):

> The `<em>` represents a span of text with emphatic stress.
<!-- 意思是说em有强调的意思 -->

总结:i仅仅只是斜体显示，并没有任何语义。但是em标签则有加强的语义在内。

#### 3.em/strong(强调标签)
说明:在上面的介绍中，已经介绍了em和strong，个中差别，看英文既能分辨。
em的全称是:`emphasis`,意思为强调。
strong的全称是:`stronger emphasis`，意思就是<strong>语气更强</strong>的强调。
总结:em和strong标签均带有强调的语义，但是strong标签所表现的强调语气要大于em的。

#### 总结与参考链接
这一部分，查阅的文档和资料太多了，看完了html4发现html5又更改了意思，只能跑去w3c去看规范。
总结:i和b在Html5中被赋予语义，不同于html4。em和strong的差别在于强调的程度。

参考链接：
> [Using <b> and <i> elements](http://www.w3.org/International/questions/qa-b-and-i-tags)
> [HTML5: The Semantic Difference Between Bold and Strong](http://engineeredweb.com/blog/2013/html5-semantic-diff-bold-strong/)