---
title: babel-polyfill使用
slug: babel-polyfillshi-yong
date: 2016-08-26T07:36:19.000Z
date_updated: 2016-08-26T07:36:19.000Z
---

Babel默认只转换新的JavaScript语法，而不转换新的API，比如Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的es5,es6的新方法（比如Object.assign,Array.from）都不会转码。这时就要安装babel-polyfill。

> install
> 
> npm install --save babel-polyfill

2 entry

    entry:['babel-polyfill','app.js']//单入口
    
    entry:{
       page1: ['babel-polyfill', "./js/page1.js"],   //多人口文件
       page2: ['babel-polyfill',"./js/page2.js"]
    },
    

3 在需要用新api的前面require("babel-polyfill");
