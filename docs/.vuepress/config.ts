import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import path from 'path'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Woolson',
  description: '道虽迩，不行不至，事虽小，不为不成。',
  
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.svg' }]
  ],

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: 'Home 首页',
        link: '/',
      },
      {
        text: 'OS 开源',
        link: '/tools/',
      },
      {
        text: 'Notes 笔记',
        link: '/notes/',
      },
      {
        text: 'Share 分享',
        link: '/share/',
      },
    ],

    sidebar: {
      '/notes/': [
        {
          text: 'Notes 笔记',
          children: [
            '/notes/README.md',
            {
              text: 'Frontend 前端',
              children: [
                '/notes/fe/box-shadow.md',
                '/notes/fe/es6-iterator.md',
                '/notes/fe/function-arguments.md',
                '/notes/fe/git-commit-lint.md',
                '/notes/fe/ts-exclude-shi-xian-wen-ti.md',
                {
                  text: 'Other',
                  children: [
                    '/notes/fe/other/vscode-eslint.md',
                    '/notes/fe/other/vscode-plugin.md',
                  ]
                }
              ]
            },
            {
              text: 'Backend 后端',
              children: [
                '/notes/be/github-oauth.md',
                '/notes/be/markdown-in-nodejs.md',
                '/notes/be/mysql-data-recovery.md',
                '/notes/be/nestjs-apollo.md',
                '/notes/be/nestjs-role-permission.md',
                {
                  text: 'Exception 异常处理',
                  children: [
                    '/notes/be/exception/enotfound.md',
                    '/notes/be/exception/err_content_decoding_failed.md',
                    '/notes/be/exception/nodejs_tls.md',
                  ]
                }
              ]
            },
            {
              text: 'Other 其他',
              children: [
                '/notes/other/charles-https.md',
                '/notes/other/git-submodule.md',
                '/notes/other/jia-su-electron-xia-zai.md',
                '/notes/other/zsh-for-macos.md',
              ]
            }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Tools 工具',
          children: [
            '/tools/README.md',
            '/tools/npmer.md',
            '/tools/send.md',
            '/tools/short-link.md',
            '/tools/todo-for-macos.md',
          ]
        }
      ],
      '/share/': [
        {
          text: 'Share 分享',
          children: [
            '/share/README.md',
            '/share/home-assistant-mijia.md',
            '/share/macbook-init.md',
            '/share/magic-keyboard-clean.md',
            '/share/us-appleid-recharge.md',
            '/share/us-appleid-register.md',
          ]
        }
      ]
    },

    // 仓库配置
    repo: 'woolson/woolson.github.io',
    repoLabel: 'GitHub',

    // 编辑链接
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页',
    editLinkPattern: ':repo/edit/:branch/:path',

    // 更新时间
    lastUpdated: true,
    lastUpdatedText: '上次更新',

    // 贡献者
    contributors: true,
    contributorsText: '贡献者',

    // 404页面
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',

    // 切换颜色模式
    colorMode: 'auto',
    colorModeSwitch: true,
  }),

  // 构建配置
  dest: 'dist',
  
  // 开发服务器配置
  port: 8080,
  host: 'localhost',

  // Markdown配置
  markdown: {
    // lineNumbers: true,
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@/, path.resolve(__dirname, '..')),
    },
  },
})
