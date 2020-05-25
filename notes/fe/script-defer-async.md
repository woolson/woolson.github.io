# Script标签

## 中断DOM树构建和页面渲染

**如果放在`head`部分在`js`加载完之前页面都是空白的**（*浏览器为了更快的渲染内容，在`HTML`和所有`CSS`资源加载完成后开始渲染*）所以我们会把`script`标签放到页面底部。

> 加载CSS资源，不会阻塞DOM解析，会阻塞渲染。[👉 Link](https://zhuanlan.zhihu.com/p/36700206)

图像说明（原图地址）：

<img src="https://www.growingwiththeweb.com/images/2014/02/26/legend.svg" style="zoom:80%;" />



![](https://www.growingwiththeweb.com/images/2014/02/26/script.svg)

```html
<body>
  …content
  <script></script>
</body>
```

但是这样会导致页面所有资源加载完成才会执行这个`script`如果，网络比较慢的话，需要等待很久。

## `Defer`标签

> **`defer`**这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 `DOMContentLoaded` 事件前执行。 —— [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

![](https://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg)

- 不阻塞页面渲染
- 文档解析完成后，在content loaded事件之前，进行执行
- 多个`defer`并行加载，按页面引用顺序进行执行
- 如果`script`标签没有`src`属性，将忽略`defer`属性

## `Async`标签

> 对于普通脚本，如果存在 `async` 属性，那么普通脚本会被并行请求，并尽快解析和执行。 —— [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

![](https://www.growingwiththeweb.com/images/2014/02/26/script-async.svg)

- 不阻塞页面渲染
- 他所依赖的模板都会延缓请求
- `DOMContentLoaded`事件不会触发时机不受`<script async/>` 加载影响
- `<script async/>`标签互相不受影响
- `<script async/>`执行顺序不受页面引用顺序影响，加载完就执行

## 动态加载`Script`

```javascript
const script = document.createElement('script');
console.log(script.defer) // defer属性默认值为 false
console.log(script.async) // async属性默认值为 true
document.body.append(script);
```

所以他的特征和`async`保持一致。

## 同时添加两个属性

## 使用优先级

通常可以优先使用 `async` ，其次是`defer` 然后是不添加属性。可以按以下规则判断使用:

- 如果`script`是一个模块并且不依赖任何其他`scirpt`那就使用`async`
- 如果`script`依赖其他的或被其他所依赖，那么使用 `defer`
- 如果`script`很小并且被一个`async script`依赖，那么使用无属性`script`并放在`async script`上面

## 参考

- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script
- https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html#script
- https://javascript.info/script-async-defer#async
- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Optimizing_your_pages_for_speculative_parsing

