---
title: HTML5 <iframe> 的 sandbox 属性以及 X-Frame-Options
slug: html5-iframe-de-sandbox-shu-xing
date: 2016-05-21T08:59:42.000Z
date_updated: 2017-01-17T06:19:26.000Z
---

> HTML5 `<iframe> sandbox`

    值	描述
    ""(为空)	应用以下所有的限制。
    allow-same-origin	允许 iframe 内容被视为与包含文档有相同的来源。
    allow-top-navigation	允许 iframe 内容从包含文档导航（加载）内容。
    allow-forms	允许表单提交。
    allow-scripts	允许脚本执行。
    

`<iframe src="xxxx" sandbox="value">`

当别人要frame你的网页时候，只要用sandbox不写"allow-script"时，即使页面写了下面代码，也不能防止别人frame。因为js根本不会执行。但是，css，html，form行为还是可以用的。

    if(top.location!=self.location){
       top.location=self.location;
    }
    

> 解决办法`X-Frame-Options`

好在可以采用 HTTP头`X-Frame-Options`解决问题。可以设置以下3个值。

- DENY:---------------浏览器会拒绝当前页面加载任何 frame 页面
- SAMEORIGIN:---------frame页面的地址只能为同源域名下的页面
- ALLOW-FROM origin:--则可以定义允许 frame 加载的页面地址

IE8+都支持。一般设置成`SAMEORIGIN`就OK
