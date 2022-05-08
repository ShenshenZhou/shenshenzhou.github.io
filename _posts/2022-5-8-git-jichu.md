---

title: git基本操作
date: 2022-5-8 17:57:21 +0800
tags: [git,github,笔记]
categories: [笔记,git使用笔记]

---

### 连接远程仓库

连接命令（连接一次即可）：

```
git remote add origin git@github.com:yourName/repositoryname.git
git remote add origin https://github.com/yourName/repositoryname.git
```

如果连接中显示失败，可以通过`git remote -v` 查看远程库信息。`git remote rm origin`删除关联的origin远程库，然后再重新使用上述命令进行连接。

[fatal: remote origin already exists. (远程来源已存在 解决办法)](https://cloud.tencent.com/developer/article/1880265)

### add、commit、push三连

[git的add、commit、push的详细介绍 ](https://www.jianshu.com/p/2e1d551b8261)

### OpenSSL错误

[Git更新报错`OpenSSL SSL_read: Connection was reset, errno 10054`](https://blog.csdn.net/weixin_43705953/article/details/119959145#:~:text=OpenSSL SSL _ read%3A Connection was reset%2C errno,V er ify "fal se "，解除 ssl 验证..)

### 每次都要输入密码

[解决每次git pull、git push都需要输入账号密码的问题](https://blog.csdn.net/yinghuochong124/article/details/113860505)

### Failed connect to github.com:443

[git错误: Failed connect to github.com:443](https://blog.csdn.net/weixin_41010198/article/details/100095212#:~:text=在IDEA中，项目 com mit完后，需要Push到 GitHub 时，出现“ Failed to connect,git config --global --unset http.proxy git config --globa)

