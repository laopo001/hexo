---
title: Hammer.js--移动端Web手势
slug: hammer-js-yi-dong-duan-webshou-shi
date_published: 2016-03-31T02:39:01.000Z
date_updated: 2017-01-17T06:47:42.000Z
---

Hammer.js是一个开源的，轻量级的javascript库，它可以在不需要依赖其他东西的情况下识别触摸，鼠标事件。

> API如下

默认设置下自动添加了，tap、press，pan与swipe的横向滑动。

pinch和rotate识别器在默认情况下都是禁用的,因为他们会有元素阻塞,但是我们可以手动开启：

    hammertime.get('pinch').set({ enable: true });  
    hammertime.get('rotate').set({ enable: true });  
    

当然，我们还可以为pan与swipe 开启纵向滑动

    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL }); //全方向  
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL }); //竖直方向  
    

我们能通过meta的标记，禁用doubletap/触控放大。但是新的浏览器支持touch-action属性所以可以不需要这个

还有一个[demo](http://www.dadigua.win:8080/show/phone/touch.html)。

- 轻触变红
- 长触变绿
- 单指拖动
- 双指缩放，旋转(需要触屏设备)
