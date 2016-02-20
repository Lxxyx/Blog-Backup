# Blog-Backup
该博客基于hexo，这是所有程序和文章的备份。

因为国内的网络原因，Github经常会登陆不上，所以博客部署于Gitcafe。
但是部署时只会部署生成的静态网页，别的文章和程序都不会被保存。
所以为了保存博客的生成程序，所以选择备份到github上。
<!-- 
备份采取一键式命令。输入`npm start`，即可部署博客的同时也能自动上传最新程序至Github。防止博客文章丢失。

这是一键备份的命令。
```
hexo g && hexo d && touch backup.txt && git add * && git commit -m '博客程序自动备份' && git push -u origin master && rm backup.txt
``` -->

[博客地址：lxxyx的前端乐园](http://www.lxxyx.win)
