---
title: react学习
slug: reactxue-xi
date: 2018-03-12T03:31:34.000Z
date_updated: 2018-03-12T03:31:34.000Z
---

去年看了很多react底层实现的文章，写了一个mini版的react，还有svg渲染模式等没完善。今天过年来了把它完善了。主要实现react api，和其他类react的库对比，把合成事件加上了，兼容性很好（preact是没合成事件的)。

> GITHUB

- [learn-react](https://github.com/laopo001/learn-react) react
- [antd](https://github.com/laopo001/ant-design) fork的antd源码，改了下配置跑起来，基本完美。（除了有一个用了jq的地方表现形式不一样。我的react在diff的时候，是直接跳过非自己渲染的dom）
