---
title: 从零写一个webgl游戏引擎（一）
slug: cong-ling-xie-yi-ge-webglyou-xi-yin-qing
date_published: 2018-09-04T05:49:56.000Z
date_updated: 2018-09-12T11:03:01.000Z
---

webgl3d的引擎（类库），常见的有threejs,playcanvas,babylonjs。以及unity3d可以用llvm转asmjs 导出webgl。它们都很好用的，自己写一个是为了学习一下webgl原理。github地址 [hypergl](https://github.com/laopo001/hypergl)，主要从上面的3个js webgl框架吸收灵感，还有[从零开始手敲次世代游戏引擎](https://zhuanlan.zhihu.com/c_119702958)的文章。

功能

- 使用语言typescript，ts是javascirpt的超集，它的类型系统，可以让我在编译就可以排查出大部分bug。
- 使用handlebars和handlebars-loader，生成webgl中shader代码，还可以预编译。
- 使用webworker多线程，主线程主要是用来gpu渲染，后台线程用来 加载模型，格式化，物理碰撞。（一帧的时间是16ms。在16ms中既要完成js运算，又要完成gpu渲染，数据大了是很难完成的）。
- 使用flatbufferjs。在webworker线程给主线程中传递渲染数据。直接移动Arraybuffer，实现高性能传递数据。
