# vitepress-theme-bluearchive

BA主题博客，基于VitePress，绝赞画饼中

[在线预览](https://alittfre.github.io/)

![preview](./preview.webp)

## 功能
- [x] 首页横幅
- [x] 文章列表 
- [x] 标签页面
- [x] 搜索
- [x] gitalk 评论
- [x] 代码高亮
- [x] 手机端适配

## 画饼
- [ ] latex 公式
- [ ] RSS
- [ ] more...

## 快速开始

安装依赖，这里是`yarn`，你也可以选你喜欢的包管理器。

```
yarn install
```
运行项目
```
yarn run dev
```
打包项目
```
yarn run build
```

## 主题配置

配置文件在`.vitepress/config.mts`
```ts
export interface ThemeConfig {
  //banner
  name: string, // 首页名字
  banner: string, // 首页头图
  welcomeText: string, // 首页问候语
  avatar: string, // 首页头像
  motto: string, // 首页签名
  social: { icon: string, url: string }[] // 首页联系方式

  //gitalk配置
  clientID: string,
  clientSecret: string,
  repo: string,
  owner: string,
  admin: string[]
}
```

## 文章配置
```md
---
title: 标题
date: 日期
tags: [标签1, 标签2]
---

文章摘要，会在文章列表中显示

---

文章主体内容
```

## 感谢
- [vitepress-theme-sakura](https://github.com/flaribbit/vitepress-theme-sakura) 提供参考