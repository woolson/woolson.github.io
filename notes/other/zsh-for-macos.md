# macOS上使用zsh

> * 📅 **日期**：2017年5月12日 星期五
> * 🌤 **天气**：下雨

![](/assets/image/image%20%287%29.png)

mac自带的 `terminal.app` 默认使用的是 `bash` 在使用起来不太舒服，比如：自动大小写转换、跳转目录、git仓库的信息...等等。`zsh` 能在各方面上对其碾压（后面细说）。再说mac自带的`termianl.app`虽然用上去还可以，推荐一款软件`iTerm.app` 来搭配 `zsh` 使用。这款软件对比`terminal`软件上，优势在于他的分屏功能、插件和主题\(oh-my-zsh更优秀\)。

## zsh介绍

zsh 是一款功能强大的 shell 软件，它可以兼容 bash，并且提供了很多高效的改进：

* 更好的自动补全
* 更好的文件名展开
* 强大的定制性

首先先看看当前系统中有哪些可以使用的终端：`cat /etc/shells` 我的电脑中显示如下：

```text
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

## zsh安装

Mac系统自带了zsh, 一般不是最新版。使用 [`homebrew`](https://brew.sh/) 安装最新版，执行命令:

```bash
# 安装zsh
brew install zsh
# 把zsh设为默认
chsh -s /bin/zsh
```

## oh-my-zsh

> Oh My Zsh是一个令人愉快的开源社区驱动框架，用于管理您的`zsh`配置。它捆绑了大量有用的功能，助手，插件，主题以及一些让你惊叹的东西。

### 安装 oh-my-zsh

```bash
# curl/wget 二选一即可
# via curl
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# via wget
$ sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"


# 安装过程输出
Cloning Oh My Zsh...
Cloning into '/root/.oh-my-zsh'...
remote: Counting objects: 712, done.
remote: Compressing objects: 100% (584/584), done.
remote: Total 712 (delta 15), reused 522 (delta 4), pack-reused 0
Receiving objects: 100% (712/712), 443.58 KiB | 27.00 KiB/s, done.
Resolving deltas: 100% (15/15), done.
Checking connectivity... done.
Looking for an existing zsh config...
Using the Oh My Zsh template file and adding it to ~/.zshrc
Copying your current PATH and adding it to the end of ~/.zshrc for you.
Time to change your default shell to zsh!
        __                                     __
 ____  / /_     ____ ___  __  __   ____  _____/ /_
/ __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / /
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/
                       /____/                       ....is now installed!

Please look over the ~/.zshrc file to select plugins, themes, and options.
p.s. Follow us at https://twitter.com/ohmyzsh.
```

这样，oh-my-zsh安装成功了，可以打开一个新的命令行标签页查看效果。

![terminal](http://ww1.sinaimg.cn/large/708e7d29gy1fss1i8rtk3j20ln0fmt95)

### 设置

#### 配置设置

配置文件在 `~/.zshrc` \(当前登录用户根目录\) 使用vim或其他编辑器打开。

```bash
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="robbyrussell"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
...
# 更多默认设置 ~/.oh-my-zsh/templates/zshrc.zsh-template
```

#### 主题设置

`~/.zshrc` 文件中修改 `ZSH_THEME="robbyrussell"` 默认使用的是 `robbyrussell`。主题文件放在 `~/.oh-my-zsh/themes` 文件夹下面。

![themes](http://ww1.sinaimg.cn/large/708e7d29gy1fss1pkujf4j20ln0ei40q)

**主题样式可见：** [https://github.com/robbyrussell/oh-my-zsh/wiki/Themes](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)

可以网上下载别人的主题文件放入 `~/.oh-my-zsh/themes/hello.zsh-theme`。然后启用主题 `ZSH_THEME="hello"`。

#### 插件设置

`~/.zshrc` 文件中修改 `plugins=(git)` 默认启用 `git`。如需启用更多插件，可加入需启用插件的名称，如下: `plugins=(rails git textmate ruby lighthouse)`。

**推荐一款插件**

zsh-syntax-highlighting（命令语法高亮\)

[https://github.com/zsh-users/zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

![zsh-syntax-highlighting](http://ww1.sinaimg.cn/large/708e7d29gy1fss217akkkj20ln08edg9)

**更多插件**

* [https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)
* [https://github.com/unixorn/awesome-zsh-plugins](https://github.com/unixorn/awesome-zsh-plugins)
* [https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview)

#### 目录别名/命令别名（alias）

**目录别名**

如果我想在命令行中用`sublime text`打开某个文件:

```bash
# sublime text
alias st="/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl"
# vscode
alias vs="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"

# 打开文件
$ st ./index.js
# 打开文件夹
$ st ./src/
```

组合命令，可以为git各种命令行操作配置别名。

```bash
# 配置sthost
alias sthost="st /etc/hosts"
# 输入sthost即可完成使用sublime打开host文件
$ sthost

# git·命令
alias gl="git clone"
alias ga="git add"
alias gac="ga . && gcm"
```

**目录别名**

```bash
# 配置目录别名
alias projects="/Users/hello/Documents/Files/projects"
# 不管你在任何目录，cd projects 即可到达
$ cd projects
```

目录跳转有个更出名的插件：autojump。【强大的一批】

```bash
# 安装autojump
$ brew install autojump
# 配置别名
alias j="autojump"

# 使用
$ autojump some-folder
$ j some-folder
```

## 卸载 oh-my-zsh

直接在终端中，运行 `uninstall_oh_my_zsh` 即卸载。

```bash
# 卸载
$ uninstall_oh_my_zsh
```

## 完事

到这就差不多了，后面有好东西再做更新。

