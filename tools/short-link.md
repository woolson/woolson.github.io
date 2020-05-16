---
description: Convert long link short with chinaz. 长连接转短连接。
date: 2020-01-10 19:55:08
---

# 🦎 Short Link 短连接

 [![](https://woolson.cn/npmer/npm/version/7454c65c-2678-4ea4-9192-54d46e449fa7?name=@woolson/short-link) ![](https://woolson.gitee.io/npmer-badge/Make%20with-ffffff-fb5656--heart-ee401f-right-ffffff-ededed-square-flat-plain.svg)](https://github.com/woolson/short-link)

> Does not guarantee the duration of short link. 不保证短连接有效时长。

## Install 安装

```bash
npm install -g @woolson/short-link
```

```text
npm --registry https://npm.pkg.github.com/woolson install -g @woolson/short-link
```

## Usage 使用

Command `short-link` with link. 直接粘贴链接在命令后面。

```text
➜  short-link https://www.npmjs.com/package/@woolson/short-link
❝ [Short Link]: Link has copied, press Ctrl/Cmd + C to paste.
❝ [Short Link]: https://url.cn/544g8YS
```

Command `short-link` with `-c`. 使用`-c` 选项从剪贴板读取链接。

```text
➜  short-link -c 
❝ [Short Link]: Clipboard content: https://github.com/woolson/short-link
❝ [Short Link]: Link has copied, press Ctrl/Cmd + C to paste.
❝ [Short Link]: https://url.cn/544g8YS
```

