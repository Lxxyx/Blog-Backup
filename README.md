# Blog-Backup
博客基于hexo，这是所有程序的备份。

因为国内的网络原因，博客部署于Gitcafe。

然后为了保存博客的生成程序，所以选择备份到github上。

备份采取一键式命令。
```
hexo g && hexo d && rm backup.txt && git add * && git commit -m '博客程序自动备份' && git push && touch backup.txt
```

这样部署博客的同时也能自动上传最新程序至Github。

[lxxyx的前端乐园](http://www.lxxyx.win)
