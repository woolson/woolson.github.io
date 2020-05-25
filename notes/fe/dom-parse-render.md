# DOM Parse & Render

- 网络（network）JS解释器（JS interpreter） 呈现引擎（render engine）
- 渲染DOM树（Document Object Model），与JS的交互接口
- HTML => DOM Tree + CSS Rules  => Render Tree => Layout  => Paint
- 渲染过程
  - 树形DOM结构
  - 必须元素，自动添加，比如head，tbody
  - 标签嵌套层级错误的处理
  - Script标签会立即执行，并且阻止文档解析和DOM构建 [👉 Link](./script-defer-async.md)
  - 

参考：

- https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#The_browsers_we_will_talk_about
- https://javascript.info/script-async-defer
- https://zhuanlan.zhihu.com/p/36700206
