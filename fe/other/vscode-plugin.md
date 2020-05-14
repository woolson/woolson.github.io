---
description: 个人使用的多个好用的插件
---

# VSCode插件推荐

> * 📅 **日期**：2018年6月10日 星期日
> * 🌤 **天气**：下雨 ☔️

![](../../.gitbook/assets/image%20%2862%29.png)

```text
U：“你用过最强大的编辑器是什么？” 
M：“Sublime Text” 
U：“你用过最好看的编辑器是什么？” 
M：“Atom” 
U：“你用过最方便的编辑器是什么？” 
M：“Visual Studio Code”
```

    曾经 `Atom` 的外观让我着迷，就算加载速度比较慢，我还是用了很 长一段时间。但是自从用上了 `VS-code`再也回不去 `Atom` 了，就算他看上去不是那么好看。但 是他的启动速度和插件的质量，相对来说有一定的优势的。还有一些细节上面的配置更友好。

下面就推荐一些我个人觉得不错的插件：

## ---2019-09-23更新---

![Git Graph](../../.gitbook/assets/image%20%2826%29.png)

### Git Graph

可以看当前工作区Git的分支图，可以选择看那些分支，非常方便

![&#x6837;&#x5F0F;&#x9884;&#x89C8;](../../.gitbook/assets/image%20%2814%29.png)

## ---2018-11-12更新--- 

![Insert date string](../../.gitbook/assets/image%20%2822%29.png)

### Insert Date String

用于在编辑器中插入当前的日期和时间，很方便

## ---2018-07-31更新---

![Todo Tree](https://gruntfuggly.gallerycdn.vsassets.io/extensions/gruntfuggly/todo-tree/0.0.73/1532952758588/Microsoft.VisualStudio.Services.Icons.Default)

### Todo Tree

列出项目中所有的TODO，侧面把握项目的完成度。点击可打开对应文件和TODO所在位置

![&#x5B98;&#x65B9;](https://raw.githubusercontent.com/Gruntfuggly/todo-tree/master/resources/screenshot.png)

![Todo Highlight](https://wayou.gallerycdn.vsassets.io/extensions/wayou/vscode-todo-highlight/1.0.4/1532254554587/Microsoft.VisualStudio.Services.Icons.Default)

### Todo Highlight

高亮打开的页面中所有TODO，看上去更清爽

![&#x6837;&#x5F0F;&#x9884;&#x89C8;](https://github.com/wayou/vscode-todo-highlight/raw/master/assets/material-night.png)

![Git Lens](../../.gitbook/assets/image%20%2827%29.png)

### Git Lens

丰富的Git信息插件，可以按行查看代码作者

![&#x884C;&#x7F16;&#x8F91;&#x5386;&#x53F2;](../../.gitbook/assets/image%20%2816%29.png)

![&#x884C;&#x4EE3;&#x7801;&#x4F5C;&#x8005;&#x548C;&#x4FEE;&#x6539;&#x8BB0;&#x5F55;](../../.gitbook/assets/image%20%2833%29.png)

![VS-Code Vim](../../.gitbook/assets/image%20%2813%29.png)

### VS-Code Vim

喜欢用vim编辑器的同学必须装的，挺不错的。推荐加一个插件 `line-jumper`

### Line-jumper

vim有翻半页和一页的快捷键。有时候vim的翻半页或者翻一页太多，但是一行一行翻又太慢。所以有个能介于半页和一行之间的跳行。就使用line-jumper这个插件，可配置一次跳多少行，我是5行

```javascript
// 行数设置
{
  "lineJumper.linesToJump": 5
}
```

```javascript
// 快捷键设置
[
  {
    "key": "ctrl+j",
    "command": "lineJumper.moveDown",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+cmd+j",
    "command": "lineJumper.selectDown",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+k",
    "command": "lineJumper.moveUp",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+cmd+k",
    "command": "lineJumper.selectUp",
    "when": "editorTextFocus"
  }
]
```

![EditorConfig for VS Code](https://editorconfig.gallerycdn.vsassets.io/extensions/editorconfig/editorconfig/0.12.4/1527781734664/Microsoft.VisualStudio.Services.Icons.Default)

### EditorConfig for VS Code

> 如果你打开的项目根目录存在 `editorconfig` 文件，则会用文件中的配置覆盖编辑器默认设置

```text
# editorconfig.org
root = true

[*]
indent_size = 2
indent_style = tab
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

 

![Guides](https://spywhere.gallerycdn.vsassets.io/extensions/spywhere/guides/0.9.1/1511022656558/Microsoft.VisualStudio.Services.Icons.Default)

### Guides

> 用来扩展编辑器缩进导航显示，可以自定义的样式也很多

![&#x5B98;&#x65B9;&#x6837;&#x5F0F;](https://github.com/spywhere/vscode-guides/raw/master/images/screenshot.png)

![&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F;](http://ww1.sinaimg.cn/large/708e7d29gy1fs6i2zird5j219o0kcjx5)

```javascript
{
  // 暗色系主题使用的活动状态引导线颜色
  "guides.active.color.dark": "rgba(120, 60, 60, 0.75)",
  // 明色系主题使用的活动状态引导线颜色
  "guides.active.color.light": "rgba(200, 100, 100, 0.75)",
  // 是否使用活动引导线
  "guides.active.enabled": true,
  // 是否在括号行展开活动引导线
  "guides.active.expandBrackets": true,
  // 水平引动引导线，这将会渲染出多余的引导线
  "guides.active.extraIndent": false,
  // 除正常引导线，在沟槽区启用活动引导线指示器
  "guides.active.gutter": false,
  // 选中文字隐藏引导线
  "guides.active.hideOnSelection": true,
  // 活动状态引导线样式
  "guides.active.style": "solid",
  // 活动状态引导线宽度
  "guides.active.width": 1,
  // 启用此插件
  "guides.enabled": true,
  // 缩进背景颜色
  "guides.indent.backgrounds": [],
  // 选中文字隐藏引导线背景
  "guides.indent.hideBackgroundOnSelection": true,
  // 是否显示第一列引导线
  "guides.indent.showFirstIndentGuides": true,
  // 基于当前光标位置最大渲染数. 设置-1为无限制. 使用浮点数0-1之间由文档大小来确定
  "guides.limit.maximum": 500,
  // 暗色系普通引导线颜色
  "guides.normal.color.dark": "rgba(60, 60, 60, 0.75)",
  // 明色系普通引导线颜色
  "guides.normal.color.light": "rgba(220, 220, 220, 0.75)",
  // 开启普通引导线
  "guides.normal.enabled": true,
  // 选中文字隐藏普通引导线
  "guides.normal.hideOnSelection": true,
  // 普通引导线样式
  "guides.normal.style": "solid",
  // 普通引导线宽度
  "guides.normal.width": 1,
  // 覆盖vs-code默认的行为(比如：缩进引导线和尺寸线)
  "guides.overrideDefault": false,
  // 发送匿名使用统计数据给开发者
  "guides.sendUsagesAndStats": true,
  // 暗色系主题缩进引导线堆栈颜色
  "guides.stack.color.dark": "rgba(80, 80, 80, 0.75)",
  // 明色系主题缩进引导线堆栈颜色
  "guides.stack.color.light": "rgba(180, 180, 180, 0.75)",
  // 除正常引导线外显示堆栈引导线
  "guides.stack.enabled": true,
  // 选中文字隐藏堆栈引导线
  "guides.stack.hideOnSelection": true,
  // 堆栈引导线样式(solid/dashed/dotted)
  "guides.stack.style": "solid",
  // 堆栈引导线宽度
  "guides.stack.width": 1,
  // 引导线间更新间隔(单位：秒)
  "guides.updateDelay": 0.1
}
```

![&#x7F29;&#x8FDB;&#x6837;&#x5F0F;](http://ww1.sinaimg.cn/large/708e7d29gy1fs3yfw1ojcj21860b8aby)

![Material Icon Theme](../../.gitbook/assets/image%20%282%29.png)

### Material Icon Theme

该插件提供了大量的图标，还可以自己自定义图标

```javascript
//  自定义文件夹图标
{
  "material-icon-theme.folders.associations": {
    // 文件夹名：图标名
    "store": "Redux-store"
  }
}
```

 

![Vetur](../../.gitbook/assets/image%20%2840%29.png)

### Vetur

> Vue技术栈开发插件合集，vue开发必备

 

![GitHub Plus](https://thenikso.gallerycdn.vsassets.io/extensions/thenikso/github-plus-theme/1.1.3/1526373532357/Microsoft.VisualStudio.Services.Icons.Default)

以前都是喜欢用暗色系的主题，久了后想换个亮一点的主题，然后找了一圈，这个主题真是超级喜欢

![&#x4E3B;&#x9898;&#x6837;&#x5F0F;&#x9884;&#x89C8;](https://github.com/thenikso/github-plus-theme/raw/master/screenshot.jpg)

## 完事

    插件暂时介绍到这，后面有好用的再做推荐。这里推一个自己开发的基于新浪微博上传图片软件（有mac和win），具体查看[这里](https://woolson.github.io/weibo-img/#/)。

