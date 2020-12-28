---
title: webpack正确使用wasm
slug: wasm-webpackshi-yong
date: 2018-10-03T03:19:41.000Z
date_updated: 2018-10-03T03:19:41.000Z
---

webpack版本

        "webpack": "4.20.2",
        "webpack-cli": "3.1.0",
        "webpack-dev-server": "3.1.5"
    

如果直接打包，会提示WebAssembly module is included in initial chunk.

This is not allowed, because WebAssembly download and compilation must happen asynchronous.wasm模块是要下载，然后编译才能使用。必须使用import()在使用分割wasm的模块中。

最简单办法。重新创建一个入口bootstrap.js，这入口用 import() 加载以前的入口文件。这样可以共享wasm模块实例。完全忽略wasm模块下载编译过程，和使用js模块一模一样。（内部由webpack实现了）

bootstrap.js

    import("./index")
      .catch(e => console.error("Error importing `index.js`:", e));
    

这样不需要使用fetch('simple.wasm')，下载一个wasm文件，然后编译，这样的用法很难使用。假如这wasm模块，在多处文件中使用。

    fetch('simple.wasm').then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, importObject)
    ).then(results => {
      results.instance.exports.exported_func();
    });
    

[https://github.com/laopo001/ts-template/tree/wasm](https://github.com/laopo001/ts-template/tree/wasm)
