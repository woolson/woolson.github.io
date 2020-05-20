---
description: 使用ImgurAPI、AWS S3或GitLab，上传本地图片、网络图片或剪贴板图片获取图片链接。
date: 2019-05-06 20:41:14
comments: true
recommend: true
---

# 🐫 Send 图片转链接

![](https://woolson.cn/npmer/npm/version/7454c65c-2678-4ea4-9192-54d46e449fa7?name=@woolson/send) ![](https://woolson.gitee.io/npmer-badge/-555555-Star%20Me-46bc99-github-ffffff-left-square-flat-plain.svg) [![image](https://woolson.github.io/npmer-badge/badge/ilcr-none-none-To%20GitHub-ffffff-28a745-Star-ffffff-24292e-r-f-f.svg)](https://github.com/woolson/send)

> **Don't upload private pictures. 不要上传隐私图片！**

## Install 安装

```bash
# npm install 安装
npm install -g @woolson/send
```

## Source 资源

### Imgur

Use [imgur](https://imgur.com/) upload api to get image link. So use command `send-img`.使用imgur api上传图片并获取图片链接，使用命令`send-img.`

> **Maybe can not use with china IP address. 国内IP貌似无法使用。**
> **Config info before use. 使用前先配置。**

Public：1dfa83c47f8a089

```yaml
# Local file
send-img ~/Desktop/test.png

# Clipboard
send-img -c

# Web image
send-img https://web/link/image.png

# Config imgur client id
send-img -e
```

### GitLab

Use gitlab static resource to get image link. **You need to register a** [**gitlab**](https://gitlab.com/users/sign_in) **account first**.使用GitLab静态资源，**使用前需要先注册一个GitLab账号**。

> **Config info before use. 使用前先配置。**

```yaml
# Local file
send-gl ~/Desktop/test.png

# Clipboard
send-gl -c

# Web image
send-gl https://web/link/image.png

# Config gitlab account
send-gl -e
```

### AWS S3

Use AWS S3 to store image and get image public link. So use command `send-asw`. 使用AWS S3存储图片，并获取公开访问链接，使用命令`send-aws.`

> **Config info before use. 使用前先配置。**

```yaml
# Local file
send-aws ~/Desktop/test.png

# Clipboard
send-aws -c

# Web image
send-aws https://web/link/image.png

# Options
--hash                 add hash at end of filename 在文件名称后面加上Hash，长度为7         
-p, --path <path>      specific file storage path, default: temp/ 文件在S3桶中存储的目录，默认temp/
-c, --clipboard        get image file from clip board 上传剪贴板中的图片         
-n, --filename <name>  name the store file name 重命名图片存储名称
-h, --help             output usage information 帮助信息
-e, --edit             edit s3 config 修改S3配置
```

## Usage 使用

### Form file 上传本地图片

```bash
# [Local image file path 本地图片文件路径]
send-img path/to/file/demo.jpg
```

### From web 转存其他网络图片

```bash
# [Web image url 网络图片地址]
send-img http://file/link.jpg
```

### From clipboard 上传剪贴板图片

> Use electron clipboard to do this. 使用的`electron`的剪贴板实现，国内如果出现安装`electron`缓慢的情况，按以下处理：

```bash
# Add subline into .zshrc or .bashrc. 把下面一行加入.zshrc 或 .bashrc中
export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
```

```bash
# [From system clipboard 从剪贴板上传]
send-img [-c, --clipboard]
```

### Send history 上传历史记录

```shell
# List last 5 records. 列出最后5次上传记录
send-ls

# List last 5 records before <Index>. 列出<Index>之前的5条记录
send-ls -i,--index <Index>

# List last <Length> records. 列出最后<Length>条记录
send-ls -i,--index <Index>


# List last <Length> records before <Index>. 列出<Index>之前的<Length>条记录
send-ls -i,--index <Index> -l,--length <Length>
```

## Config 配置

> **All config save in your computer. 所有的配置都存储在你自己的计算机中。**

Config file locate at `~/.sendrc`. 配置文件在`~/.sendrc`，如下：

```yaml
# Imgur client ID
# Creat yourself 创建自己的：https://api.imgur.com/oauth2/addclient
# Or use default 或者使用：1dfa83c47f8a089
IMAGUR_CLIENT_ID: 1dfa83c47f8a089
```

```yaml
# GitLab config GitLab配置
# Create personal access token 创建自己Access Token: https://gitlab.com/help/user/profile/personal_access_tokens.md
GITLAB_TOKEN: <AccessToken>
```

```yaml
# AWS-S3 Config AWS-S3配置
S3_ACCESS_ID: <Id>          # Required 必填
S3_ACCESS_SECRET: <Secret>  # Required 必填
S3_BUCKET_NAME: <Bucket>    # Required 必填
S3_REGION: <Region>         # Required 必填
S3_PATH: <Path>             # Default value: temp/ 默认值：temp/
```

### Check Config 查看配置

```yaml
# Use this command to check all config 查看所有配置
send-config
```
