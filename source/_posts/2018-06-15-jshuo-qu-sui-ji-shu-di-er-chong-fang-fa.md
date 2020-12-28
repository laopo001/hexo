---
title: js获取安全的随机数
slug: jshuo-qu-sui-ji-shu-di-er-chong-fang-fa
date: 2018-06-15T03:00:20.000Z
date_updated: 2018-06-15T03:01:29.000Z
---

常见的获取随机数是Math.random(),生成[0，1)中间浮点数，包括0，但是不能提供像密码一样安全的随机数字，不能使用它们来处理有关安全加密的事情。

如果需要处理加密的问题（如RSA算法），使用Web Crypto API 来代替, 和更精确的window.crypto.getRandomValues() 方法。这个api可以在IE11，firefox,chrome等浏览器上。如果需要兼容低版本IE，使用Math.random()模拟，只是不太安全。

> window.crypto.getRandomValues

    var array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    
    console.log("Your lucky numbers:");
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
    
