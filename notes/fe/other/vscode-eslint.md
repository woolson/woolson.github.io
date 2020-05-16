---
description: 配置vscode插件配置和使用方式。
date: 2018-06-15 19:02:41
---

# VSCode ESLint

> * 📅 **日期**：2018年6月15日 星期五
> * 🌤 **天气**：晴朗

![](/assets/image/image%20%289%29.png)

### 什么是 eslint

任何两个程序猿代码风格不可能一模一样的（不抬杠）。例如：

```javascript
// 程序猿A
function getName ()
{

}
// 程序猿B
function get_name() {

}
```

    其实这两个代码都能够正常运行，不会有问题。但是如果是4个人、10个人呢。还可能出现更多的风格，这样对代码的可阅读性和可维护性都有很大的影响。最后可能导致项目无法维护（也就是维护起来费劲），所以我们需要对代码的格式进行检查。肯定不可能盯着每个人开发吧，我们需要一个工具帮我们“监视”。

这个工具进行代码检查，需要三点：

* 谁来检查 ？
* 以什么规则检查 ？
* 检查哪些文件 ？

#### 谁来检查 ？

目前代码检查这块有几个工具 `eslint`, `jscs`, `standardjs` 等等。我们将要说的是 `eslint`。

    其实使用vue官方的脚手架工具 `vue-cli` 生成项目是可以直接配置 好 `eslint` 这个工具，并且在开发时会实时的检测你的代码风格，在风格有问题的时候直接在页面 上显示错误信息。其实我觉得这个没太必要，想临时 `debug` 修改一下代码还要修改代码风格，着 实有点麻烦。如果已经生成了想禁用就修改下 `config/index.js` 配置文件的 `useEslint: false`。

#### 以什么规则检查 ？

在项目中执行 `eslint` 的命令的时候，会默认查找当前项目根目录下面有没有`.eslint.js/.eslint.json/.eslintrc` 这几个配置文件。可以在其中配置对应的规则，后面说。

#### 检查哪些文件 ？

其实项目中我们只需要检查业务逻辑代码，比如 `node_modules`、`build`、`dist`里面的代码是不需要检查的。我们可以在项目根目录新建 `.eslintignore` 文件。内容举例：

```bash
/build/
/config/
/dist/
/*.js
```

### 为啥用 eslint

    新开项目参与人数比较多（大约10人）。打开公司以前的老项 目，密密麻麻。看代码的心情都没了。大家有各自的代码风格可以理解，但是不好的风格还是不要了。 所以不希望项目越走越远而造成无法维护（至少不是因为代码风格）。

### 如何用 eslint

如何用 `eslint` 以达到以我们想要效果。配置 `eslint` 的规则（想要的结果）来进行代码检查。先看下 `eslint` 的配置文件：

```javascript
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
```

主要就是 `extends` 字段继承预置规则和 `plugins` 字段使用插件。配置文件上指明了两个规则:

#### Extends-&gt;standard

> 版本：11.0.0 npm: [eslint-config-standard](https://standardjs.com/readme-zhcn.html) 官方网站: [https://standardjs.com/readme-zhcn.html](https://standardjs.com/readme-zhcn.html)

除了 `standard` 预置配置还有:

* [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
* [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
* [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)等

    当然，如果预置的规则不适用或者单纯的不喜欢，那你可以在 `rule` 字段进行自定义配置。具体配置可参考，[官方文档](http://eslint.cn/docs/rules/)、[Eslint 从入门到放弃](https://www.jianshu.com/p/22e6197e5cff)

```javascript
// 自定义配置
module.exports = {
  rules: {
    // 关闭规则
    'no-debugger': 'off',
    // warn
    'no-debugger': 'warn',
    // error
    'no-debugger': 'error',
    // 如果有配置
    'tabs': [
      'error', // 检查类型
      'tab',   // 设置
      {
        SwitchCase: 1 // 相关配置
      }
    ]
  }
}
```

#### Plugins-&gt;vue

> 版本：4.5.0 npm: [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) 文档: [https://www.npmjs.com/package/eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)

**Extends** 字段只要设置后即可，但是 `eslint-plugin-vue` 设置 后面有个选项，是用来配置检查代码风格的严格度：

* `base`: 设置和规则以启用正确的ESLint分析
* `essential`: 同上，加上防止错误或意外行为的规则
* `strongly-recommended`: 同上，加上可以显着提高代码的可读性和开发体验的规则
* `recommended`: 同上，加上社区实践的规则，以保持统一性

此插件提供了4个等级代码风格检查，后一等级在前一等级的规则上添加更多的限制。具体添加了哪些 规则请查看[文档](https://www.npmjs.com/package/eslint-plugin-vue)。

**注意：**      `eslint-plugin-vue` 插件目前支持检查 `lang="html"` 的 `<template>`，也就是说 `lang="pug"` 检查就失效了。`<style>`标签目前也不支持。作者表示 会在未来版本中添加对 `<template lang="pug">` 和 `<style>` 的代码检查支持。

### eslint 跑起来

#### 边开发边检查

如果在 `vue-cli` 生成项目的时候选择了使用 `eslint` 的话，保证 `config/index.js` 文件中的 `dev.useEslint: true` 则在开发过程中一直会进行代码检查。

#### 单独检查

如果想单独运行代码检查在命令行中执行：

```text
npm run lint
```

`lint` 命令是定义在 `package.json` 文件中，这个是脚手架生成时配置好的。

```javascript
{
  "scripts": {
    "lint": "eslint --ext .js,.vue src"
  }
}
```

如果没有的话，手动配置一下。需要确定你已经安装了运行 `eslint` 的所有依赖。

#### Git 提交检查

    很多时候忙起来可能忘了检查，或者只做简单修改就不跑开发服务器了。提交前也没有用命令检查代码。那么就有可能把未检查的代码给提交到代码库中了，这个是不允许的。所以我们需要在提交代码的时候进行一下代码的检查，检查不通过则不允许提交。

`git` 提供了一系列的 `hook`，在进行 `git` 操作的时候的一些钩子：

```text
applypatch-msg.sample     pre-commit.sample         prepare-commit-msg.sample
commit-msg.sample         pre-push.sample           update.sample
post-update.sample        pre-rebase.sample
pre-applypatch.sample     pre-receive.sample
```

我们将使用的是 `pre-commit` 这个钩子，这个文件使用 `shell` 脚本写的。

**不会 `shell` 咋办？**

不着急。`npm` 上有个包叫[husky](https://www.npmjs.com/package/husky)专门添加钩子的，他在你 `commit` 或 `push` 的时候运行 `package.json` 中对应的`script`。如：

```javascript
{
  "scripts": {
    "precommit": "npm run test",
    "prepush": "npm run lint",
    "...": "..."
  }
}
```

比如 `precommit` 命令将在 `commit` 操作的时候运行，这样你只需要关心在 `commit` 的时候做什么。如果这个命令返回了 `error`, `commit` 动作将被终止。这就实现了代码检查不通过则不允许提交代码。

### VScode中的eslint

    既然代码中各种风格问题被检查出来了，我们要一一修复不然不能提交代码了啊。一个两个凭眼睛找得累死，如果十个百个呢，得被玩儿死啊。

    还好 `vscode` 里面有 `eslint` 插件帮我们做这些事，他会根据你当前打开文件夹下的配置文件来验证当前打开文件中有哪些错误。你还可以配置保存格式化代码。

```javascript
{
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    // vue需要添加此配置
    {
        "language": "vue",
        "autoFix": true
    }
  ]
}
```

这样就可以在 `vscode` 中实时看到错误（鼠标放到错误的红线上会显示对应的规则），并且可以保存修复错误（部分错误需要人工干预的）。使用愉快。

### 总结

    其实 `eslint` 的规则是符合大部分人的习惯和最佳实践。最好在写作过程中自己也养成一个良好的编码习惯，就算没有代码检查，你的代码也是看上去简洁有序，让人一目了然。这样不仅给别人一个好印象也能够相应的减少自己代码中的问题。你也不想别人维护你的代码的时候：“这tm谁写的，怎么看啊”……

