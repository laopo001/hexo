---
title: JS笔记2
slug: jsde-shi-yong
date_published: 2016-07-24T16:17:27.000Z
date_updated: 2017-02-21T07:35:38.000Z
---

    var a;
    a||1+1 //2
    1+a||1 //1[object Object]"  //1+(a||1)
    

    (function() {
          var a = b = 5;   //b=5;var a=b;
      })();   
    console.log(b);  //b=5  
    console.log(a);  //a undefined
    

    
    let命令下面一行的圆括号是必须的,否则会报错。因为解析器会将起首的大括号,理解成一个代码块,而不是赋值语句
    let obj = {};
    let arr = [];
    ({foo:obj.prop, bar:arr[0] } = {foo:123, bar:true})
    ////////////////
    var {name}= obj;
    

    js unicode编码
    一种是"\u6d4b"，还有一种是'\x68'
    '\\u'+('0000' + '测'.charCodeAt(0).toString(16)).slice(-4)
    '\\x'+'h'.charCodeAt(0).toString(16)
    
    '\x'只能表示（0x20~0x7E）英文数字等特殊符号
    '\u'是标准的unicode
    

`npm config set unsafe-perm true`

`export NODE_ENV=production`

    x-requested-with:XMLHttpRequest  //表明是AJax异步
    
