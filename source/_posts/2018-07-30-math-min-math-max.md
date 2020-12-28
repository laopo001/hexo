---
title: Math.min(),Math.max()
slug: math-min-math-max
date: 2018-07-30T09:49:57.000Z
date_updated: 2018-07-30T09:50:02.000Z
---

Math.min()和Math.max()都可以不传参数运行的。

    Math.min() === Infinity
    Math.max() === -Infinity
    

Math.min 的参数是 0 个或者多个。如果是多个参数很容易理解，返回参数中最小的。内部实现的时候是用js最大的数Infinity对比的，因此没有参数，直接返回Infinity。同理Math.max() === -Infinity。
