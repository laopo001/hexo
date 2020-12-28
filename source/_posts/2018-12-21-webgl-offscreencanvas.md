---
title: chrome OffscreenCanvas
slug: webgl-offscreencanvas
date_published: 2018-12-21T10:34:18.000Z
date_updated: 2018-12-21T10:35:21.000Z
---

最近在，写hypergl例子的时候，发现webgl不能稳定60fps。明明每帧的计算时间约2ms，远远小于16ms。用chrome分析，发现主线程中，很多chrome插件注入页面，都在主线程中执行，浪费了时间，而且主线程还管理页面各种渲染，css加载。导致帧数浮动。上次看chrome 更新日志，发现了这个[OffscreenCanvas](https://developers.google.com/web/updates/2018/08/offscreen-canvas)。使用webworker更新canvas，这个真的有用。

> 使用难点

- 
因为在webworker不能访问dom，window等。需要用postMessage通信才能解决。不过我觉得还是值得的。因为，webgl项目，只会用到一个canvas dom对象。不过事件需要通过postMessage传递。

- 
webworker中Image不能用。用fetch。这样加载图片。

       fetch(url).then(b => b.blob()).then(blob => {
                return createImageBitmap(blob); // ImageBitmap
       });
    
