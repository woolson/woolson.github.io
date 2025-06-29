---
title: box-shadow属性细节
description: CSS属性box-shadow阴影颜色使用推荐
tags: [fe, css]
---

> - 📅 **日期**：2018年8月15日 星期三
> - 🌤 **天气**：晴朗

## 前言

如今PC或者移动端的UI设计中，常用阴影或色块进行模块的划分和提升界面的显示层次感。

![阴影和色块](https://gitlab.com/imgrs/pic/uploads/47ced46156dff4de859c3d220c85b53a/kxtsafu.png)

可能作为一名前端开发者，在日常逛网站的时候回注意一些页面细节问题。比如布局是否合理啊、功能实现方法等等。有一个比较细节的和出现次数比较多的一个问题，就是**box-shadow色值问题**。

## 问题描述

> 这里用[_lodash官网](https://lodash.com/docs/4.17.15)进行展示。

![](https://gitlab.com/imgrs/pic/uploads/7ab93680ace94c052f81d2b1d3660059/9tkbid9.png)

Lodash官网顶部导航菜单阴影样式，在内容区域背景色为白色的时候看上去还是正常的。当背景色非白色的时候呢？

![](https://gitlab.com/imgrs/pic/uploads/a80d258e98a64afe64b3ecb8714adaa7/c6mpco4.png)

阴影部分在深灰色的底色下显示出了难看的灰色阴影。**虽然不是非常影响视觉感受，但是这不是阴本来的样式**。打开开发者工具看了一下，Header部分样式为：

```css
header {
  box-shadow: 0 0 2.25rem #9da5ab;
}
```

色值`#9da5ab`颜色看上去如下，所以这个颜色是来自于设计稿吗？

![](https://gitlab.com/imgrs/pic/uploads/f25700848e7f81c3265185375cdf36e6/wc2m2tf.png)

现在我们把这个阴影颜色修改为`rgba(0, 0, 0, .3)`_（这里适用黑色透明色，亦可使用其他颜色）_，新的页面展示效果是这样的：

```css
header {
  box-shadow: 0 0 2.25rem rgba(0, 0, 0, .3);
}
```

![](https://gitlab.com/imgrs/pic/uploads/d86919bd44f75505470350991ebfc8aa/j3d6qbm.png)

## 结论

在阴影样式中使用`rgba`的透明通道，使阴影颜色对底部内容更好过渡，样式看上去更加协调一些。毕竟**交互**是前端重要的环节。
