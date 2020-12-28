---
title: typings使用
slug: typingsshi-yong
date: 2016-10-26T08:02:58.000Z
date_updated: 2016-10-26T08:02:58.000Z
---

> 介绍

typings是tsd的升级版。typings是一个智能代码提示插件。在VS CODE中使用，很方便。对于JS代码，提示是非强制的,只提示。对于ts就会在错误的地方标红。

> 安装

`npm install -g typings`

> 使用

- 初始化`typings init`会生成一个`typings.json`
- 搜索node提示`typings search node`
- 安装node提示`typings install dt~node --save --global`

> 启用智能提示功能

1.装好后一般都会提示了。jsconfig.json的exclude属性，不要乱加文件夹，这是一个排除文件的属性，一般把`"node_modules/"`排除就行。

2.要是不行，只需要在需要提示的文件最上行增加dt文件所在目录，，格式如下:
`/// <reference path="./typings/index.d.ts" />`

> 其他

*.d.ts文件就是typescript的各种声明。以前是ts专用的，现在可以用在js智能提示了。
