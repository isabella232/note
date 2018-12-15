# git 语法简要

[document](https://git-scm.com/book/zh/v2)

## git 本地仓库

### 初始化本地仓库

```git
git init    //初始化一个本地git仓库
```

### 添加记录到暂存区

```git
git add file   //添加单条记录记录
git add *      //添加全部修改的记录
```

### 提交记录到版本库

==此处操作版本库生成一个版本 id== 【commitid】

```git
git commit -m 'the message'  // -m 为此次提交的记录信息
```

### 撤销文件的修改

```git
/**
 * 撤销在工作区的修改，即在本地文件的修改
 * 只针对已经add过的文件，没有add过的文件是没有效果的
 **/
git checkout -- file

/**
 * 撤销暂存区的修改，已经add，没有commit的
 * HEAD 表示的是最新的版本 HEAD~再上一个版本
 **/
git reset HEAD -- file
```

### 查看状态和历史记录

```git
git log     // 查看历史记录 即【commit】每次都会生成一个记录
git status  // 查看当前工作区和暂存区的状态，尚未add，已经add，尚未commit都会有记录
```

### 删除文件

```git
rm file // 工作区中删除文件
git rm file   // 从版本库中删除文件 相当于 add 操作 ，操作同步更新到暂存区

/**
 *  恢复删除的文件
 **/
git checkout -- file

//  如果先执行 rm file，后又执行 git rm file ,则需要两步才能回到之前的工作区
git reset HEAD -- file
git checkout -- file  //恢复到删除前的工作区
```

## 远程仓库

### 添加远程仓库

a. 在 github 上创建一个新的项目，生成一个项目地址

> 项目地址【https://github.com/ltw9527/git】

b. 在本地仓库下运行命令

```git

//  建立远程连接
//  github.com:username/project.git
git remote add origin git@github.com:ltw9527/git.git

//  推送本地服务到远程仓库
git push -u origin master
```

#### Permission denied (publickey).

> 这是因为 ssh 可以过期或者没有 ssh key，需要重新生成一个 ssh key 放在 github 账户上

1. 查找本地是否有 ssh 的文件
   1. id_rsa.pub 里面的字符拷贝到 github 里面的 setting 的 ssh 里面
2. 本地没有这个文件，需要新建一个

#### Threre is no tracking information for the current branch . Please specify which branch you want to merge with

> 这是因为需要指定本地仓库的分支，跟远程仓库项目分支的关系，如果我们需要本地的 master 对应远程的 master,指定了之后就可以使用了

```git
git branch --set-upstream-to=origin/master master

//  如果是别人的远程仓库，需要先pull，并且把meger的原因说上
git pull

//  linux 操作指令
i  insert
esc 失去编辑焦点
:w write 写入文件
:q exit 退出编辑
```

#### 当本地版本落后关联版本时候，好像不能提交，提示是需要拉去最新的版本下来

```git
your branch is behind 'origin/master' ,
you should 'git pull' the newest.
```

#### 当本地版本落后关联版本，但是本地版本又做了修改，并且和关联不一致

```git
error: Your local changes to the following files would be overwritten by merge:
        test.txt
Please, commit your changes or stash them before you can merge.
Aborting
```

> 针对上面的问题，需要先 commit 或者隐藏掉本地的修改，才可以 git pull 最新的 version。当 commit 之后，git pull，会自动的合并，并且本地的修改和关联库的修改都会体现

### unable to auto-detect email address

> 找到 config 文件加入

```git
[user]
  email=xxx@163.com
  name=xxxx
```
