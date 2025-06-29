import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Woolson',
  description: '道虽迩，不行不至，事虽小，不为不成。',
  
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.svg' }]
  ],

  // 构建输出目录
  outDir: '../docs',
  
  // 开发服务器配置
  // server: {
  //   port: 8080,
  //   host: 'localhost'
  // },

  // 主题配置
  themeConfig: {
    // 导航菜单
    nav: [
      { text: 'Home 首页', link: '/' },
      { text: 'OS 开源', link: '/tools/' },
      { text: 'Notes 笔记', link: '/notes/' },
      { text: 'Share 分享', link: '/share/' }
    ],

    // 侧边栏
    sidebar: {
      '/notes/': [
        {
          text: 'Notes 笔记',
          items: [
            { text: '介绍', link: '/notes/' },
            {
              text: 'Frontend 前端',
              collapsed: false,
              items: [
                { text: 'Box Shadow', link: '/notes/fe/box-shadow' },
                { text: 'ES6 Iterator', link: '/notes/fe/es6-iterator' },
                { text: 'Function Arguments', link: '/notes/fe/function-arguments' },
                { text: 'Git Commit Lint', link: '/notes/fe/git-commit-lint' },
                { text: 'TS Exclude 实现问题', link: '/notes/fe/ts-exclude-shi-xian-wen-ti' },
                {
                  text: 'Other',
                  collapsed: true,
                  items: [
                    { text: 'VSCode ESLint', link: '/notes/fe/other/vscode-eslint' },
                    { text: 'VSCode Plugin', link: '/notes/fe/other/vscode-plugin' }
                  ]
                }
              ]
            },
            {
              text: 'Backend 后端',
              collapsed: false,
              items: [
                { text: 'GitHub OAuth', link: '/notes/be/github-oauth' },
                { text: 'Markdown in Node.js', link: '/notes/be/markdown-in-nodejs' },
                { text: 'MySQL Data Recovery', link: '/notes/be/mysql-data-recovery' },
                { text: 'NestJS Apollo', link: '/notes/be/nestjs-apollo' },
                { text: 'NestJS Role Permission', link: '/notes/be/nestjs-role-permission' },
                {
                  text: 'Exception 异常处理',
                  collapsed: true,
                  items: [
                    { text: 'ENOTFOUND', link: '/notes/be/exception/enotfound' },
                    { text: 'ERR_CONTENT_DECODING_FAILED', link: '/notes/be/exception/err_content_decoding_failed' },
                    { text: 'Node.js TLS', link: '/notes/be/exception/nodejs_tls' }
                  ]
                }
              ]
            },
            {
              text: 'Other 其他',
              collapsed: false,
              items: [
                { text: 'Charles HTTPS', link: '/notes/other/charles-https' },
                { text: 'Git Submodule', link: '/notes/other/git-submodule' },
                { text: '加速 Electron 下载', link: '/notes/other/jia-su-electron-xia-zai' },
                { text: 'ZSH for macOS', link: '/notes/other/zsh-for-macos' }
              ]
            }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Tools 工具',
          items: [
            { text: '介绍', link: '/tools/' },
            { text: 'Npmer', link: '/tools/npmer' },
            { text: 'Send', link: '/tools/send' },
            { text: 'Short Link', link: '/tools/short-link' },
            { text: 'Todo for macOS', link: '/tools/todo-for-macos' }
          ]
        }
      ],
      '/share/': [
        {
          text: 'Share 分享',
          items: [
            { text: '介绍', link: '/share/' },
            { text: 'Home Assistant 小米', link: '/share/home-assistant-mijia' },
            { text: 'MacBook 初始化', link: '/share/macbook-init' },
            { text: 'Magic Keyboard 清洁', link: '/share/magic-keyboard-clean' },
            { text: '美区 Apple ID 充值', link: '/share/us-appleid-recharge' },
            { text: '美区 Apple ID 注册', link: '/share/us-appleid-register' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/woolson/woolson.github.io' }
    ],

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/woolson/woolson.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 上次更新时间
    lastUpdated: {
      text: '上次更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2019-${new Date().getFullYear()} Woolson`
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲
    outline: {
      label: '页面导航'
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',

    // 外部链接图标
    externalLinkIcon: true,

    // 深色模式切换
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',

    // 404 页面
    notFound: {
      title: '页面未找到',
      quote: '但是，如果你不改变方向，并且一直寻找，最终可能会到达你要去的地方。',
      linkLabel: '回到首页',
      linkText: '带我回家'
    }
  },

  // Markdown 配置
  markdown: {
    theme: {
      dark: 'github-dark',
      light: 'github-light'
    },
    lineNumbers: false
  },

  ignoreDeadLinks: true
})
