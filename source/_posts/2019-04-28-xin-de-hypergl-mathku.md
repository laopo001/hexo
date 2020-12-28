---
title: hypergl新的开始——wasm-math库
slug: xin-de-hypergl-mathku
date: 2019-04-28T05:50:42.000Z
date_updated: 2019-04-29T09:40:57.000Z
---

hypergl 的核心部分，打算用rust重写。如math，模型加载和渲染部分。

[wasm-math](https://github.com/laopo001/wasm-math)（还在开发中）。测试下，矩阵栈的计算大概有10倍多的性能提升。wasm2.0加入SIMD后，性能还会更高。
![](/source/images/2019/04/QQ--20190429172826.png)

以后还会使用opengl重写渲染部分，最后编译到webgl。这样更有利于跨平台。js只是作为脚本语言写逻辑。
