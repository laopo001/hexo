---
title: 标签模板
slug: biao-qian-mo-ban
date: 2018-07-25T12:27:52.000Z
date_updated: 2018-07-25T12:27:55.000Z
---

    alert`123`
    // 等同于
    alert(123)
    

ES6 还为原生的 String 对象，提供了一个raw方法。

String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

String.raw`Hi\u000A!`;

// 返回 "Hi\u000A!"

    let a = 5;
    let b = 10;
    
    function tag(s, v1, v2) {
      console.log(s[0]);
      console.log(s[1]);
      console.log(s[2]);
      console.log(v1);
      console.log(v2);
    
      return "OK";
    }
    
    tag`Hello ${ a + b } world ${ a * b}`;
    // "Hello "
    // " world "
    // ""
    // 15
    // 50
    // "OK"
    
