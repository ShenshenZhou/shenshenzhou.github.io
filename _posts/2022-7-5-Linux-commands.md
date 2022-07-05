---

title: Linux常用命令
date: 2022-7-5 16:49:57 +0800
tags: [笔记,Linux]
categories: [笔记,Linux]

---

说明：很难也没必要记住所有命令，常用的熟练，不常用的可以搜索使用文档或者在terminal使用一下两种方法：

* command --help

* man command

### cd

用于切换当前目录，参数为要切换到的目录的路径（绝对路径或相对路径）。

```c++
cd			// 进入个人的主目录
cd /Linux	// 进入"/Linux"目录
cd .. 		// 返回上一级目录
cd ../..	// 返回上两级目录（）
cd Linux    // 切换到当前目录下的Linux文件
```

### touch

后接文件名，如果文件不存在，则新建文件（常用来新建一个文件）。

### mkdir

后接目录名，创建目录；rmdir删除指定的目录

### clear

清屏

### pwd

显示工作路径

### ls

查看文件与目录的命令，list的意思：

```c++
ls		// 查看目录中的文件（非隐藏文件的文件名）
ls -l	// 显示文件与目录的详细资料（时间、权限、大小等）
ls -a   // 列出所有文件 包括隐藏文件
```

### cp

```c++
cp [options] source dest
cp -r test/ newtest  // 将当前目录test/的所有文件复制到newtest
```

### mv

用于移动文件、文件夹（在不同工作目录中移动）或更名（如果文件或文件夹存在于当前工作目录），move的意思：

```c++
mv oldNameFile newNameFile  // 重命名文件
```

### rm

用于删除文件或目录，remove的意思：

### find

```c++
find / -name filename.txt // 据name查找/目录下的filename.txt
find . -name "*.xml"  // 递归查找所有的xml文件
```

### ps

显示进程运行情况，process的意思：

```c++
ps aux	// 查看系统所有的进程数据
ps ax	// 查看不与terminal有关的所有进程
ps -lA  // 查看系统所有的进程数据
```

### kill

```c++
kill -9 2525  // 终止PID2525
```

### top

Linux下常用的性能分析工作，能够实时显示系统中各个进程的资源占用情况，类似于windows的任务管理器

### su

```c++
su -usename  // 切换用户
```

### tree

```c++
tree a  // 以树状图列出目录a的内容
```

### ping

网络检测

### vi

随意写文件命令，后接文件名，以编辑方式打开文件

### echo

向屏幕输出带空格的字符串：echo hello world

### cat

```
cat 文件名：显示全部文件内容
more 文件名：分页显示文件内容
less 文件名：与more类似，更好地是可以往前翻页
tail 文件名：仅查看尾部，还可以指定行数tail -n 文件名
head 文件名：仅查看头部，还可以指定行数head -n 文件名
```

### grep

在给定的文件中搜寻指定的字符串

```c++
grep 1 test.txt  // test.txt文件中搜索1
grep -i ""  // 忽略大小写
grep -r ""  // 在当前工作目录的文件中递归搜索指定的字符串
```

### ifconfig

查看ip地址及接口信息

### exit

结束当前的终端会话

### shutdown 

用于关闭计算机，shutdown -r用于重启计算机

### tar

压缩文件、查看压缩文件、解压

### chmod

改变文件的权限：r读、w写、x执行

