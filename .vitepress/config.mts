import { defineConfigWithTheme } from 'vitepress'
export interface ThemeConfig {
  //banner
  name: string
  banner: string
  welcomeText: string
  avatar: string
  motto: string
  social: { icon: string; url: string }[]

  //gitalk
  clientID: string
  clientSecret: string
  repo: string
  owner: string
  admin: string[]
}

export default defineConfigWithTheme<ThemeConfig>({
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    // gitalk
    ['link', { rel: 'stylesheet', href: 'https://unpkg.com/gitalk/dist/gitalk.css' }],
    ['script', { src: 'https://unpkg.com/gitalk/dist/gitalk.min.js' }],
  ],
  title: "Sensei's 部落格",
  description: "Sensei's 部落格",
  themeConfig: {
    //banner区配置
    name: "Sensei's 部落格",
    banner: '/banner.jpg',
    welcomeText: 'Hello, VitePress',
    avatar: '/avatar.jpg',
    motto: '何気ない日常で、ほんの少しの奇跡を見つける物語。',
    social: [
      { icon: '/github.svg', url: 'https://github.com/' },
      { icon: '/bilibili.svg', url: 'https://www.bilibili.com/' },
    ],

    //gitalk配置
    clientID: '',
    clientSecret: '',
    repo: '',
    owner: '',
    admin: [''],
  },
  markdown: {
    theme: 'github-light',
    lineNumbers: true,
  },
})
