title: Webpack新手入门指南
date: 2015-12-05 19:10:02
tags: 前端
---
最近在学习Webpack，但学习过后，感觉适合新手的教程很少，但是Webpack用起来却是很简单的。所以决定自己动手写一个Webpack入门教程，分享给大家。
## 什么是Webpack?
Webpack一个新颖的模块加载器，能把所有的JS+CSS资源以模块的方式，打包成一个单独的JS文件并且自动压缩。
举个实际例子，这是我之前一个页面中引用的JS和CSS文件。
![之前的](http://7xk109.com1.z0.glb.clouddn.com/blog-webpack2.jpg)
这个是使用Webpack打包后的。
![之后的](http://7xk109.com1.z0.glb.clouddn.com/blog-webpack1.jpg)
非常的简洁大方。
## Webpack的安装
三步走，就可以完成Webpack的安装
第一步，全局安装Webpack插件

```
npm install webpack -g
```
第二步，建立package.json

```
npm init
```
第三步,在本地文件夹内安装Webpack

```
npm install webpack --save-dev
```
所有都完成后，我们的Webpack就安装完成了，是不是很简单呢？
## Webpack的配置
1.先在本地新建webpack的配置文件

```
webpack.config.js
```
2.在配置文件输入以下的几行代码，确定根路径与代码编译后的路径

```
var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH,'webpack_js');
```
第一行的代码，意思是请求webpack这个组件。
二三四行的代码是确定根路径与代码编译后的路径。
3.确立路径后，添加我们的

```
module.exports = {
	entry:{
		index:'./index/js/index.js',
	},
	output:{
		path:BUILD_PATH,
		filename:'[name].js'
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style!css'
			},
			{
				test:/.(png|jpg)$/,
				loader:'url?limit=40000'
			},
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
	]
}
```

## Webpack的js处理
	