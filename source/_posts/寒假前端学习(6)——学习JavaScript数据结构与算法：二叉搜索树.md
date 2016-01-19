title: 寒假前端学习(6)——学习JavaScript数据结构与算法（四）：二叉搜索树
date: 2016-01-19 17:58:57
tags: 前端
---
> 本系列的第一篇文章: [学习JavaScript数据结构与算法（一）：栈与队列](http://t.cn/R4Ybrs0)
> 第二篇文章：[学习JavaScript数据结构与算法（二）：链表](http://t.cn/R4W3y3X)
> 第三篇文章: [学习JavaScript数据结构与算法（三）：集合](http://t.cn/R4jLf0o)
> 第四篇文章: [学习JavaScript数据结构与算法（四）：二叉搜索树](http://t.cn/R4QbVOg)

## 我与二叉树的前尘往事
在刚学编程时，就知道有一种数据结构叫“树”，树中的翘楚是“二叉树”，“红黑树”等。
据说“树”构在编程界呼风唤雨无所不能。让无数程序员闻风丧胆。甚至在面试时，更是有“手写二叉树”，“翻转二叉树”等题目坐镇。

好吧，我承认这些在当时都把我吓住了。

但是当我颤抖着打开《学习JavaScript数据结构与算法》，开始敲下关于“树”的代码时，突然觉得，好像也没有那么难呢。
于是心怀激动，一口气敲完了书上的例子，中途也思考了很久，不断的在纸上演算等。但总的来说，还是学的很开心的。
## 树の简介
之前学的栈、队列、链表等数据结构，都是顺序数据结构。而树，将会是我们学的第一种非顺序数据结构。

放在现实里呢，有个很生动的例子，公司组织架构图。长这样:
![公司组织架构图](http://7xoxxe.com1.z0.glb.clouddn.com/tree1.png)

而我们要学的树，长这样:
![树の图示](http://7xoxxe.com1.z0.glb.clouddn.com/tree.png)

### 节点简介
其中，树中的每个元素，都叫做`节点`。从节点延伸而下的，叫`子节点`。
树顶部的节点叫根节点。每棵树只有一个根节点。（图中15就是根节点）
在节点中，有子节点的节点也称为内部节点，没有的话则被称为外部节点或者叶节点。
同时在节点中是有祖先和后代关系的，比如节点9的祖先就有13,7,6,15四个。
### 节点属性
深度: 节点的深度取决于其祖先的数量，节点9的深度就是4。
树的高度，树的高度体现为节点深度的最大值。
比如上图，节点深度最大值为4，则树的高度为4。
### 二叉树与二叉搜索树
二叉树的最大特点就在于，它的节点最多只有两个子节点:左侧子节点和右侧子节点。
二叉搜索树则是二叉树的一种，但它只允许你在左侧节点储存比父节点小的值，右侧只允许储存比父节点大的值。
像刚才的这幅图，就是二叉搜索树。
![二叉搜索树](http://7xoxxe.com1.z0.glb.clouddn.com/tree.png)

而我们本文要学习的内容，就是如何写一个二叉搜索树。
### JavaScipt中二叉搜索树的实现
首先，创建一个构造函数。
```
/**
 * 二叉搜索树的构造函数
 */
function BinarySearchTree() {
  /**
   * 二叉搜索树键的构造函数
   * @param {Number} key 要生成的键值
   */
  var Node = function(key) {
    // 键值
    this.key = key;
    // 左子节点
    this.left = null;
    // 右子节点
    this.right = null;
  }

  /**
   * 二叉树的根节点，不存在时表示为Null
   * @type {Null or Number}
   */
  var root = null;
}
```

在之前提到过的双向链表中，每个节点包含两个指针，一个指向左侧节点，一个指向右侧节点。在二叉搜索树中，每个节点也有两个指针，一个指向左侧子节点，一个指向右侧子节点。但在二叉搜索树中，我们把节点成为`键`，这是术语。

二叉搜索树需要有如下的方法:

* insert(key): 向树中插入一个新的键
* inOrderTraverse(): 通过中序遍历方式，遍历所有节点
* preOrderTranverse(): 通过先序遍历方式，遍历所有节点
* postOrderTranverse(): 通过后序遍历方式，遍历所有节点
* min(): 返回树中最小的值
* max(): 返回树中最大的值
* search(key): 搜索某个值，在树中则返回true
* remove(key): 从树中移除某个键

二叉搜索树的实现，基本都与递归有关（对我来说递归很绕，花了很久才理解）。如果不清楚递归相关概念，可以看看下面的参考链接。
> [什么是递归](https://www.zhihu.com/question/20507130)

#### insert方法:
说明:向树中插入一个新的键
实现:
```
/**
 * 插入某个键到二叉树中
 * @param  {Number} key 要插入的键值
 */
this.insert = function(key) {
  // 用传入的值生成二叉树的键
  var newNode = new Node(key);

  // 根节点为Null时，传入的键则为根节点
  // 否则调用insertNode函数来插入子节点
  if (root === null) {
    root = newNode;
  } else {
    insertNode(root, newNode)
  }
};

/**
 * 用于插入子节点。
 * @param  {Node} node    根节点
 * @param  {Node} newNode 要插入的节点
 */
var insertNode = function(node, newNode) {
  //由于二叉搜索树的性质，所以当键值小于当前所在节点的键值
  //则使得左子结点成为新的要比较的节点，进行递归调用
  //如果左子结点为null，则将键值赋值给左子结点。
  //如果键值大于当前所在节点的键值，原理同上。
  if (newNode.key < node.key) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      insertNode(node.left, newNode)
    }
  } else {
    if (node.right === null) {
      node.right = newNode
    } else {
      insertNode(node.right, newNode)
    }
  }
};
```
#### inOrderTraverse方法:
说明:通过中序遍历方式，遍历所有节点
实现:
```
/**
 * 中序遍历操作，常用于排序。会把树中元素从小到大的打印出来。
 * 因为在javascript的递归中，遇到递归是，会优先调用递归的函数。直到递归不再进行。
 * 然后会在递归调用的最后一个函数中执行其它语句。再一层层的升上去。
 * 所以中序遍历会有从小到大的输出结果。
 * 后续的先序和后续遍历和这个原理差不多，取决于callback放在哪儿。
 * 
 * @param  {Function} callback 获取到节点后的回调函数
 */
this.inOrderTraverse = function(callback) {
  inOrderTraverseNode(root, callback);
};


/**
 * 中序遍历的辅助函数，用于遍历节点
 * @param  {Node}   node     遍历开始的节点，默认为root
 * @param  {Function} callback 获取到节点后的回调函数
 * @return {[type]}            [description]
 */
var inOrderTraverseNode = function(node, callback) {
  // 当前节点不为NULL则继续递归调用
  if (node != null) {
    inOrderTraverseNode(node.left, callback);
    // 获取到节点后，调用的函数
    callback(node.key);
    inOrderTraverseNode(node.right, callback);
  }
};
```
假如我们这儿加入打印节点值的函数:
```
var printNode = function(value) {
  console.log(value);
};

inOrderTraverse(printNode) // 输出排序后树的值
```
#### preOrderTranverse方法:
说明:通过先序遍历方式，遍历所有节点
实现:
```
/**
 * 前序遍历操作，常用于打印一个结构化的文档
 * @param  {Function} callback 获取到节点后的回调函数
 */
this.preOrderTranverse = function(callback) {
  preOrderTranverseNode(root, callback);
};

/**
 * 前序遍历的辅助函数，用于遍历节点
 * @param  {Node}   node     遍历开始的节点，默认为root
 * @param  {Function} callback 获取到节点后的回调函数
 */
var preOrderTranverseNode = function(node, callback) {
  if (node != null) {
    callback(node.key);
    preOrderTranverseNode(node.left, callback);
    preOrderTranverseNode(node.right, callback);
  }
};
```
#### postOrderTranverse方法:
说明:通过后序遍历方式，遍历所有节点
实现:
```
/**
 * 后序遍历操作，常用于计算所占空间
 * @param  {Function} callback 获取到节点后的回调函数
 */
this.postOrderTranverse = function(callback) {
  postOrderTranverseNode(root, callback);
};

/**
 * 后序遍历的辅助函数，用于遍历节点
 * @param  {Node}   node     遍历开始的节点，默认为root
 * @param  {Function} callback 获取到节点后的回调函数
 */
var postOrderTranverseNode = function(node, callback) {
  postOrderTranverseNode(node.left, callback);
  postOrderTranverseNode(node.right, callback);
  callback(node.key);
};
```
#### min方法:
说明:返回树中最小的值，由二叉搜索树的性质易知，最左侧的为最小值。则只需取得最左侧的值即可。
实现:
```
/**
 * 返回树中最小的值
 * @return {Function} min函数的辅助函数
 */
this.min = function() {
  return minNode(root);
};

/**
 * min函数的辅助函数
 * @param  {Node} node 查找开始的节点，默认为root
 */
var minNode = function(node) {
  // 如果node存在，则开始搜索。能避免树的根节点为Null的情况
  if (node) {
    // 只要树的左侧子节点不为null，则把左子节点赋值给当前节点。
    // 若左子节点为null，则该节点肯定为最小值。
    while (node && node.left !== null) {
      node = node.left;
    }
    return node.key;
  }
  return null;
};
```
#### max方法:
说明:返回树中最大的值，由min函数易知，最大值在最右侧。
实现:
```
/**
 * 返回树中最大的值
 * @return {Function} max函数的辅助函数
 */
this.max = function() {
  return maxNode(root);
};

/**
 * max函数的辅助函数
 * @param  {Node} node 查找开始的节点，默认为root
 * @return {Key}      节点的值
 */
var maxNode = function(node) {
  if (node) {
    while (node && node.right !== null) {
      node = node.right;
    }
    return node.key;
  }
  return null;
};
```
#### search方法:
说明: 搜索某个值，在树中则返回true
实现: 
```
/**
 * 搜索某个值是否存在于树中
 * @param  {Node} key 搜索开始的节点，默认为root
 * @return {Function}     search函数的辅助函数
 */
this.search = function(key) {
  return searchNode(root, key);
};

/**
 * search函数的辅助函数
 * @param  {Node} node 搜索开始的节点，默认为root
 * @param  {Key} key  要搜索的键值
 * @return {Boolean}      找到节点则返回true，否则返回false
 */
var searchNode = function(node, key) {
  // 如果根节点不存在，则直接返回null
  if (node === null) {
    return false;
  } else if (key < node.key) {
    searchNode(node.left, key)
  } else if (key > node.key) {
    searchNode(node.right, key)
  } else {
    // 如果该节点值等于传入的值，返回true
    return true;
  }
};
```
#### remove方法:
说明:从树中移除某个键，要应对的场景:
1. 只是一个叶节点
2. 有一个子节点
3. 有两个子节点的节点
因为要应付不同的场景，所以这是最麻烦的方法了。让我思考了好久才理解。如果你觉得看不懂的话，可以下载源代码把这一段写一遍。
实现: 
```
/**
 * 从树中移除某个键
 * @param  {Key} key 要移除的键值
 * @return {Function}     remove函数的辅助函数
 */
this.remove = function(key) {
  root = removeNode(root, key);
};

/**
 * remove函数的辅助函数
 * @param  {Node} node 搜索开始的节点，默认为root
 * @param  {Key} key   要移除的键值
 * @return {Boolean}   移除成功则返回true，否则返回false
 */
var removeNode = function(node, key) {
  // 如果根节点不存在，则直接返回null
  if (node === root) {
    return null;
  }
  // 未找到节点前，继续递归调用。
  if (key < node.key) {
    node.left = removeNode(node.left, key)
    return node;
  } else if (key > node.key) {
    node.right = removeNode(node.right, key)
    return node;
  } else {
    // 第一种场景：只是一个叶节点
    // 这种情况只需要直接把节点赋值为null即可
    if (node.left === null && node.right === null) {
      node = null;
      // 处理完直接return节点
      return node;
    }
    // 第二种场景：有一个子节点
    // 如果左节点为null，则代表右节点存在。
    // 于是把当前节点赋值为存在的那个子节点
    if (node.left === null) {
      node = node.right;
      // 处理完直接return节点
      return node;
    } else if (node.right == null) {
      node = node.left;
      // 处理完直接return节点
      return node;
    }
    // 第三种场景：有两个子节点
    // 首先加入辅助节点，同时找寻右子节点中的最小节点
    // 并把当前节点替换为右子节点中的最小节点
    // 同时为了避免节点重复，移除右子节点中的最小节点
    var aux = findMinNode(node.right);
    node.key = aux.key;

    node.right = removeNode(node.right, aux.key);
    // 处理完直接return节点
    return node;
  }
};

/**
 * remove函数的辅助函数
 * @param  {Node} node 查找开始的节点，默认为root
 * @return {Node}      最小的节点
 */
var findMinNode = function(node) {
  // 如果node存在，则开始搜索。能避免树的根节点为Null的情况
  if (node) {
    // 只要树的左侧子节点不为null，则把左子节点赋值给当前节点。
    // 若左子节点为null，则该节点肯定为最小值。
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }
  return null;
};
```
#### 源代码:
源代码在此~
> [二叉搜索树-源代码](https://github.com/Lxxyx/LearnDataStructrue/blob/master/BinarySearchTree.js)

## 感想
写文章的时候，人有点感冒，晕晕乎乎的。不过写完之后就好多了，脑子清醒了许多。
二叉树这一章，就我而言感慨万分，也算是暂时满足了自己对数据结构中“树”的向往与愿望，也不是之前看数据结构中那种迷茫的感觉。
能用JavaScript亲手实现，还是非常开心的。

前端路漫漫，且行且歌~