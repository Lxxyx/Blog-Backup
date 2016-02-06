title: 寒假前端学习(8)——深入理解CSS之Float.md
date: 2016-02-06 12:49:01
tags: 前端
---


Float的历史

初衷：
文字环绕效果，不让文字一行，图片一行。

包裹与破坏：增强浮动的感性认知

包裹？
1. 收缩 水平方向，尺寸与身体一样
2. 坚挺 高度与身高一致
3. 隔绝 里面发生任何的事情，对外部无任何一样。
也称之为BFC，既block formatting context


display:inline-block
overflow:hidden

破坏？
父元素高度塌陷
如display:none;
position:absolute;

被误解的浮动
浮动使父元素高度塌陷是标准
原本作用仅仅是为了文字环绕

要点：父元素高度被破坏（因为浮动元素脱离文档流），但是图片宽度还在。所以其它元素会上去。文档流，高度不在，宽度还在。

.clearfix:after {
    content:"";
    display:block;
    clear:both;
    visibility:hidden;
    line-height: 0;
    height:0;
    font-size:0;
  }

  .clearfix:after {
    display: table;
    clear: both;
  }

```  .clearfix {
    *zoom: 1;
  }
  ```

  只应该应用与包含浮动子元素的父及元素

  浮动特性：
  1. 元素block块状化
  2. 破坏性造成的紧密排列特性（去空格化）

  问题：砌砖需要元素固定尺寸，很难重用

  不同浏览器display属性值的获取

var display = this.currentStyle? this.currentStyle.display: window.getComputedStyle(this, null).display;

不同浏览器float属性值的设置

btnShow.style["cssFloat" in this.style? "cssFloat": "styleFloat"] = "left";

应用：单侧固定
如果为0，则图片下方文字按文字左边环绕
width+float ,padding-left/margin-left
