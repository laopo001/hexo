---
title: 从零写一个webgl游戏引擎（二）
slug: cong-ling-xie-yi-ge-webglyou-xi-yin-qing-2
date_published: 2018-09-12T17:40:47.000Z
date_updated: 2018-09-12T17:40:47.000Z
---

为什么需要测试，更具体的说，为什么合入代码前，一定要跑通测试用例？原因主要有三点：

- 确保本次 commit 不会影响其它部分的逻辑。
- 确保本次 commit 的功能代码无 bug。
- 还有以后重构时候不会出现bug。

使用持续集成自动测试代码，github有很多免费的持续集成工具。如`travis`,`appveyor`,

> jest

Jest 是 Facebook 出品的一个测试框架，相对其他测试框架，其一大特点就是就是内置了常用的测试工具，比如自带断言、测试覆盖率工具，实现了开箱即用，而且可以和typescirpt和好的一起使用。如果测试不需要浏览器的代码配合travis是很好用的。

> karma

使用karma是因为jest不能运行在浏览器，也就不能测试webgl相关的东西。因此这里使用了appveyor这个持续集成工具，它可以使用windows系统环境，可以在IE浏览器，，firefox，chrome上测试代码。

###### 总结

- 使用git commit钩子，每次commit必须测试通过才能提交。
- jest测试库的核心代码，配合travis。
- karma测试依赖浏览器的代码，使用appveyor工具。
