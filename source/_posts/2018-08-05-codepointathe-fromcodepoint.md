---
title: codePointAt和fromCodePoint
slug: codepointathe-fromcodepoint
date_published: 2018-08-04T16:22:19.000Z
date_updated: 2018-08-04T17:19:33.000Z
---

字符的 Unicode 表示法

JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。

    "\u0061" // "a"
    

但是只限于\u0000~\uFFFF的。如下，要使用两个才能代表大于\uFFFF的字符。

    "\ud83c\udf0f"  //  "🌏"
    "\u20BB7"  //  "₻7"
    

> charCodeAt <=> fromCharCode

都是ES5中提出的方法。charCodeAt 是UTF-16 字符转换成编号。String.fromCharCode 是通过编号转字符串。但是这两个不能识别 32 位的 UTF-16 字符（Unicode 编号大于0xFFFF,如`'🌏'(127759)`）,如图是不能识别的。js会识别'🌏'的长度为2.分成两部分。如下。

    '🌏'.length===2 //true
    '🌏'.charCodeAt(0)  // 55356
    '🌏'.charCodeAt(1)  // 57103
    '\ud83c\udf0f' // "🌏"
    

> codePointAt<=> fromCodePoint

这是es6的方法，能够正确处理 4 个字节储存的字符。
![](/content/images/2018/08/QQ--20180804230557.png)

而且es6还改进了，将码点放入大括号，就能正确解读该字符。

    "\u{20BB7}"
    // "𠮷"
    
    "\u{41}\u{42}\u{43}"
    // "ABC"
    
    let hello = 123;
    hell\u{6F} // 123
    
    '\u{1F680}' === '\uD83D\uDE80'
    // true
    

字符串遍历，因此在遍历大于\uffff的字符时，用for是bug的。 要用es6 Iterator（遍历器）。

    let text = "🌏";
    
    for (let i = 0; i < text.length; i++) {
      console.log(text[i]);
    }
    // �
    // �
    
    for (let i of text) {
      console.log(i);
    }
    

JavaScript 共有 6 种方法可以表示一个字符。

    '\z' === 'z'  // true
    '\172' === 'z' // true
    '\x7A' === 'z' // true
    '\u007A' === 'z' // true
    '\u{7A}' === 'z' // true
    

[字符串的扩展](http://es6.ruanyifeng.com/#docs/string)
