---
title: 不安全的target="_blank"
slug: window-opener
date_published: 2016-09-05T03:28:50.000Z
date_updated: 2016-09-14T02:07:55.000Z
---

> 原理

点击有target="_blank"属性的超链接后，浏览器会单独新建一个标签页来显示该链接所指向的内容。但是请注意，在这一瞬间，浏览器会允许新建的标签页通过一个名为“window.opener”的浏览器API来与之前的网页进行短暂通信。这时候，在新的标签页执行了window.opener.location.href="xxx"。原标签页就会跳转到xxx。

> 如下

[qc](http://www.dadigua.win:8080/qc.html)

> 利用

可以把原来的网页，跳转到钓鱼网页，提示，登录过期，请重新登录。用户很容易就泄漏了自己的密码。

> 修复问题

这也就意味着，修复该问题的重担将落在网站管理员的身上了。实际上，修复该问题最简单的方法就是在网站所有的链接中加入rel=”noopener”属性。对于火狐浏览器而言，由于它并不完全支持该属性，所以开发人员应该使用rel=”noopenernoreferrer”属性作为代替。

请记住，当你每次使用window.open()接口来打开一个新的网页窗口时，你的安全性很有可能会受到这一API的影响，所以别忘了重置“opener”属性。

    var newWnd = window.open();
    newWnd.opener = null;
    

> 原文

[链接地址中的target=”_blank”属性，为钓鱼攻击打开了大门](http://www.freebuf.com/vuls/113634.html)
console.log(1)
