---
description: 环境配置推荐配置、问题及解决方式
date: {}
comments: true
published: true
---

# MacBook初始化

![macos-bigsur](https://cdn.vox-cdn.com/thumbor/hFqCK9VhE8YFcuw3RJt59HM8heM=/0x0:1080x607/1200x800/filters:focal(454x218:626x390)/cdn.vox-cdn.com/uploads/chorus_image/image/67766925/macos.0.png)

## 软件

### 效率
- [Alfred - 工作流效率神器](https://www.alfredapp.com/)
- [Bartender - 菜单栏图标管理](https://www.macbartender.com/)
- [Dropover - 文件拖放效率](https://apps.apple.com/cn/app/dropover-%E6%9B%B4%E5%8A%A0%E5%AE%B9%E6%98%93%E6%8B%96%E6%94%BE%E6%96%87%E4%BB%B6/id1355679052?mt=12)
- [Magnet - 窗口管理神器](https://apps.apple.com/cn/app/magnet/id441258766?mt=12)

### 网络
- [ClashX - 好用的VPN链接软件](https://github.com/yichengchen/clashX)

### 开发
- [VScode - 开发编辑器](https://code.visualstudio.com/)
- [Datagrip - 数据库可视化界面](https://www.jetbrains.com/datagrip/)
  - 破解和无限期试用
- [Postman - 接口开发测试](https://www.postman.com/downloads/)
- [Chrome - 网上冲浪和前端开发必备](https://www.google.com/chrome/?brand=CHBD&brand=BNSD&gclid=EAIaIQobChMI1MPhu_ad7wIViX4rCh0EsQCtEAAYASABEgJ9GfD_BwE&gclsrc=aw.ds)，插件：
  - [Dark Reader - 让网页变黑暗模式晚上贼舒服](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh)
  - [Google 翻译](https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb)
  - [JSONView - JSON数据结构化展示](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)
  - [Vimium - 网页支持vim操作](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)

## 环境

### Homebrew

> mac软件管理工具，[网站]()

#### 安装

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Homebrew加速

> 因国内网络问题，更换Homebrew镜像，使用清华大学镜像地址。

在命令行`Terminal`中执行以下命令以进行修改：

```shell
# 修改homebrew
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

# 修改homebrew/core
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# 修改homebrew/cask
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

brew update

# 修改bottles，添加以下环节变量（添加到你正在使用的shell配置文件中）。
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

### zsh和oh-my-zsh

安装步骤[在这](https://blog.woolson.cn/notes/other/zsh-for-macos.html)。

#### spaceship-prompt

好看、实用、方便的命令行美化插件，[网站](https://github.com/denysdovhan/spaceship-prompt)。

### nvm

Nodejs版本管理工具，方便切换版本（如果觉得自己不经常切换版本则可不安装）[网站](https://github.com/nvm-sh/nvm)。

#### 安装

```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

### 其他

- [nrm - npm镜像管理](https://www.npmjs.com/package/nrm)
- [pnpm](https://www.npmjs.com/package/pnpm)
- [http-server - 命令行快速启动静态资源服务](https://www.npmjs.com/package/http-server)
- [ngrok - 映射本地服务到公网](https://www.npmjs.com/package/ngrok)
- [tree - 命令行生成文件夹目录树]：`brew install tree`

#### electron加速配置

在`shell`配置文件添加以下配置：

```shell
export ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```

## 字体

### Firacode

超好用好看的开发字体，[官网](https://github.com/tonsky/FiraCode)，下载后右击字体册打开然后安装即可。
