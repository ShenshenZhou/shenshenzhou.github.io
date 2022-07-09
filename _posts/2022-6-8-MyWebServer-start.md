---

title: WebServer项目启动
date: 2022-6-8 21:58:16 +0800
tags: [WebServer,项目,Linux,MySQL,make]
categories: [项目,MyWebServer]

---

## 项目启动

### 1、配置MySQL数据库

首先，需要在Linux上配置MySQL，可参考[Ubuntu18.04安装MySQL](https://segmentfault.com/a/1190000023081074)。

然后，进入MySQL，执行以下操作：

```bash
# 建立yourdb库
create database yourdb;

# 创建user表
USE yourdb;
CREATE TABLE user(
  username char(50) NULL,
  password char(50) NULL
)ENGINE=InnoDB;

# 插入数据
INSERT INTO user(username, password) VALUES('name','password');
```

### 2、生成可执行文件

```bash
make  # make执行Makefile文件 编译代码生成可执行文件
./bin/server  # 生成的可执行文件默认目录
```