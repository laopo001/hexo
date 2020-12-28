---
title: WebGLRenderingContext.getContextAttributes()
slug: webglrenderingcontext-getcontextattributes
date_published: 2018-11-25T17:28:49.000Z
date_updated: 2018-11-25T17:28:53.000Z
---

WebGL渲染，设置模板缓冲发现没有正确显示。即使gl.enable(gl.STENCIL_TEST)了。还有设置。

    var gl = canvas.getContext("webgl",{stencil:true});
    

getContext可以有两个参数。contextAttributes如下。

    alpha: 指示Canvas是否含有透明通道，若设置为false不透明，如果Canvas下叠加了其他元素时，可以在绘制时提升一些性能
    antialias: 绘制时是否开启抗锯齿功能
    depth: 是否开启深度缓冲功能
    failIfMajorPerformanceCaveat: true表示当系统性能较低时，将不允许创建context。也就是是getContext()返回null。
    powerPreference: 向用户代理提示，指示GPU的哪种配置适合WebGL上下文。
          "default" | "high-performance" | "low-power"
    premultipliedAlpha: 这个功能做图形渲染的应该很熟悉，将alpha通道预先乘入rgb通道内，以提高合成性能，一两句话说不清，具体自己谷歌一下吧。
    preserveDrawingBuffer: 是否保留缓冲区数据，如果你需要读取像素，或者复用绘制到主屏幕上的图像（实现脏矩形局部刷新），需要开启这个，否则浏览器在发生新的绘制操作的时候，有可能清空以前的数据。
    stencil: 是否开启模板缓冲功能
    

默认的参数

    { 
      alpha: true, 
      antialias: true, 
      depth: true, 
      failIfMajorPerformanceCaveat: false, 
      powerPreference: "default",
      premultipliedAlpha: true, 
      preserveDrawingBuffer: false, 
      stencil: false 
    }
    
