---
description: NodeJS使用markdown-js模块解析md文件。
date: 2016-10-22 21:12:49
comments: true
---

# MarkdownJS模块使用

> * 📅 **日期**：2016年10月22日 星期六
> * 🌤 **天气**：天晴

## 首先是安装markdown-js模块

```bash
npm install markdown-js
```

## 在路由文件中定义所要访问的文章路径

```javascript
var markdown = require("markdown-js")

app.param("article_name", (req, res, next, name) => {
  let filePath, content, html
  filePath = `/static/articles/${name}.md`

  // 判断文件是否存在（不存在的文件会报错，也可以用fs模块进行判断）
  try {
    content = fs.readFileSync(filePath, "utf8")
  } catch (e) {
    content = "Author had removed this article, Sorry!"
  }

  // 利用markdown-js模块将MD解析成HTML
  html = markdown.makeHtml(content)

  // 这里的formatHTML是用来加入header和一些自定义的脚本和CSS样式, 然后返回
  // 在header里面会加入Highlight.js将代码高亮
  res.send(formatHTML(name, html))
  next()
})

app.get("/articles/:article_name", (req, res) => {
  res.end()
})
```

现在如果运行正常，即可看出来是这样的

![](http://ww3.sinaimg.cn/large/708e7d29gw1fa8a28jp2sj21kw0msjuc.jpg)

## 使用Highlight.js格式化代码

* 这个是Highlight官网 [https://highlightjs.org/](https://highlightjs.org/)
* 该网站可能需要翻墙才能访问
* 我放了个在自己的服务器上 [Highlight.zip](http://www.woolson.cn/public/highlight.zip)

使用方法

> 在导出的HTML的head中引入下载的包中的CSS和JS，压缩包中都有的 引入JS是分析代码高亮的，CSS则是用来代码高亮的，里面有很多种主题可以选择使用

```markup
<link rel="stylesheet" href="./monokai.css">
<script src="./highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

这里我贴一个Monokai主题

![](http://ww3.sinaimg.cn/large/708e7d29gw1fa8a2rgs7hj21kw0nwwhz.jpg)

> 现在代码是好看了，细心的盆友会发现区块和其他部分还是无样式，挺难看的 所以我又引入了[马克飞象](https://maxiang.io/vip.html)的样式文件，也可以自己写。 CSS链接在此 [https://dn-maxiang.qbox.me/res-min/themes/marxico.css](https://dn-maxiang.qbox.me/res-min/themes/marxico.css)

所有现在好看多了\(还有很多东西，自己去发现吧\)……

![](http://ww3.sinaimg.cn/large/708e7d29gw1fa8a7agc5pj21kw0uu0xl.jpg)

> 对了推荐一个[丁老师](http://cjting.me/)写的图床chrome插件\(用过的都说好O\(∩\_∩\)O哈哈~\)[图床on微博](https://chrome.google.com/webstore/detail/%E5%9B%BE%E5%BA%8Aon%E5%BE%AE%E5%8D%9A/opblldeehobgiedgjgamaklagilmkagc)

