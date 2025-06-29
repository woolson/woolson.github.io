---
description: 在项目中使用GitSubmodule复用通用代码
---

# Git Submodule应用

> * 📅 **日期**：2020年12月05日 星期六
> * 🌤 **天气**：多云

## 前言

微信小程序项目，用户端和管理后台。两个服务中存在较多的相同代码：

1. 项目中的实体是完全一样的（不同人书写存在差异）
2. 通用的类型，枚举值，接口
3. S3上传，服务健康检查，微信接口
4. 通用工具函数

## 对比方案

### 1. node package

这个是最常用方案，然后将包发布到npm进行版本管理（或者公司内部的npm私服）

#### 优点

- 版本清晰，npm管理包版本
- 使用灵活，方便跨项目使用
- 和业务代码完全隔离

#### 缺点

- 修改代码需要对应的发版
- 维护较麻烦：代码变更较频繁，每次都要发版
- 更新代码：每个成员都要执行npm install进行更新版本
- **不方便查看源码：和业务代码存在一定关系，需要不定时查看源码**

### 2. git submodule

#### 优点

- 代码维护方便：在开发中，将修改提交即可
- 代码更新，在父仓库拉取会直接拉取更新
- 方便查看源码（和正常的项目代码一致）

#### 缺点

- 对git操作有一定要求
- 容易混入业务代码，需要警惕
- 对版本不是很清晰

在对比后，git submodule更符合我们项目特性：

1. 需要快速迭代更新，快速提交
2. 方便查看源码
3. 版本要求没那么高

## 实践中问题

### 1. 通用代码耦合性太高

A项目在通用代码中混入了业务代码，需要引入一些在B项目不需要的依赖。为了满足通用代码，B项目引入了冗余依赖。

但这并不是我们想要的。所以，我们在通用代码中剔除了业务代码，保持通用代码的纯净。

### 2. 相同代码实现不一样

两个项目相同的代码，存在类型和部分实现不一样。导致在合并成统一仓库代码过程中需要将不同的部分进行统一。因涉及的面较广，测试覆盖要全，不然上线会有风险。

### 3. 与原文件夹相同名称的submodule

具体可参考官方文档：[子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)

这个没处理好的现象是：明明修改的是submodule里面的文件，父仓库却追踪到文件变动（正常的情况应该是父仓库表达子仓库有变动）

```shell
# 例如：项目根目录有个文件夹entities，现在需要把这个文件转化成submodule

# 1. 移除文件夹在父仓库中的追踪
git rm -rf --cache entities
rm -rf entities
# 2. 添加submodule
git submodule add <ssh:仓库地址> entities
# 3. 初始化submodule文件
git submodule update --init
# 4. 将对于父仓库子模块变动进行提交
git add . && git commit -m "feat: 使用子模块替换entities文件夹"
```

上面这个对应当前分支是没问题了。这时，你切换到一个还没有使用submodule的分支，将会出现**你的分支上面有很多文件变动，切换分支退出**，这时候你需要强制切换分支：

```shell
git checkout some_brach --force
```

好了。切换分支成功，是不是发现多了好多文件的修改变动，但是根本没有动过或添加这些文件。这是直接强制清除即可（也会清除其他忽略的文件）。

```shell
git clean -fdx
```

当你的分支都使用了submodule，就不会出现这样的问题了。

### 4. 有submodule的分支与没有的分支合并

如果转换成submodule的文件夹跟之前名称一致，在合并代码的时候git不知道这个文件夹到底是父仓库管理还是子模块管理的。这是后再父仓库将这个文件夹取消追踪，并使用submodule管理。需要进行以下步骤：

**在操作前，此子模块文件夹代码需要确认在子模块中都包含了。**

```shell
# 第一步取消父仓库追踪
git rm -rf --cache folder_name
# 移除此文件夹
rm -rf folder_name
# 将文件夹重新初始化成子模块
git submodule add <repo_url> folder_name
# 合并后提交代码即可
```

### 5. 都有Submodule的分支之间切换

切换分支后发现控制台显示有改动，如下：

```shell
➜ git status
位于分支 feature
您的分支与上游分支 'origin/feature' 一致。

尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
        修改：     src/entities (新提交)

子模组已修改但尚未更新：

* src/entities 0d36f2a...e873cc6 (3):
  < fix: 修改已知问题

修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）
```
因为切换分支的Submodule已经更新了，但是本地仓库的Submodule代码还未更新。使用已经命令更新即可：

```shell
# 如果当前分支已经使用Submodule并且已经初始化，--init可以不用
git submodule update --init
```

### 6. 提交子模块的修改无法推到远程

当我们修改的子模块代码然后进行提交，commit之后发现无法推送远程。表现为当前的HEAD为游离的。如下：

```shell
$ entities on master [!] 
➜ git add . && git commit -m "fix: 修改表名错误和字段统一"
[分离头指针 de0d1d2] fix: 修改表名错误和字段统一
 2 files changed, 3 insertions(+), 3 deletions(-)

$ entities on de0d1d2   
➜ gco master
警告：您正丢下 1 个提交，未和任何分支关联：

  de0d1d2 fix: 修改表名错误和字段统一
```
这时候因为本地父仓库的子模块未追踪远程最新，处在游离的提交中。我们切到master，并将刚刚的提交拿过来即可。

```shell
# 1. 将刚刚的commit hash复制
# 2. 切到master分支
git checkout master
# 3. 使用cherry-pick将刚刚的提交拿过来
git cherry-pick <commit_hash>
```

## 结论

目前，这个方案还在初始阶段。刚开始的时候由于团队对submodule的使用不熟悉，会出现一些问题，耐心帮助解决即可。大家熟练了后，后面将会把更多通用代码抽离出来。
