---
title: 用rust写前端(一)
date: 2021-01-22 15:56:24
tags:
---

> 背景

看了下yew的源码，想学习下。顺便探究下，实现更高性能react，虽然知道，把js换成wasm性能可能不会太大提升，主要是dom操作影响性能。想到的优化是，直接跑在native环境，直接调用servo渲染引擎渲染。

> 步骤

* 实现一个过程宏，解决jsx语法解析如 

```
    react!(<div>asf</div>)
```
嵌套
```
    let a = react!(<div>asf</div>);
    dbg!(react!(<div>123<div>qwr{ "asdf" }{a}</div></div>));
```
插入attribute
```
    dbg!(react!(<div style={{width:"120px"}}>123<div>qwr{ "asdf" }</div></div>));
```

* 实现解析vdom，通过dom渲染
* 优化

[github](https://github.com/laopo001/kelake.git)