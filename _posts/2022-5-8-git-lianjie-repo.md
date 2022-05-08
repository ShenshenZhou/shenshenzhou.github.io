---

title: git连接远程仓库
date: 2022-5-8 17:57:21 +0800
tags: [git,github,笔记]
categories: [笔记，git使用笔记]

---

### 连接远程仓库

连接命令（连接一次即可）：

```
git remote add origin git@github.com:yourName/repositoryname.git
git remote add origin https://github.com/yourName/repositoryname.git
```

如果连接中显示失败，可以通过`git remote -v` 查看远程库信息。`git remote rm origin`删除关联的origin远程库，然后再重新使用上述命令进行连接。

[fatal: remote origin already exists. (远程来源已存在 解决办法)](https://cloud.tencent.com/developer/article/1880265)

