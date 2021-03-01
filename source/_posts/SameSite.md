---
title: SameSite
date: 2021-02-28 15:56:24
---

> SameSite 是HTTP响应头 Set-Cookie 的属性之一。它允许您声明该Cookie是否仅限于第一方或者同一站点上下文。

SameSite 接受下面三个值：

* Lax 
Cookies允许与顶级导航一起发送，并将与第三方网站发起的GET请求一起发送。这是浏览器中的默认值。

* Strict 
Cookies只会在第一方上下文中发送，不会与第三方网站发起的请求一起发送。

* None
Cookie将在所有上下文中发送，即允许跨域发送。


chrome 2020年8月11日 全量一个新特性。https://www.chromium.org/updates/same-site 以前 None 是默认值，但最近的浏览器版本将 Lax 作为默认值，以便对某些类型的跨站请求伪造 （CSRF） 攻击具有相当强的防御能力。

> 以前跨域设置cookie

Set-Cookie: flavor=choco; 


>  现在跨域设置cookie

Set-Cookie: flavor=choco; SameSite=None; Secure, 

```
Secure cookie仅通过HTTPS协议加密发送到服务器。请注意，不安全站点（http:）无法使用 Secure 指令设置cookies。
```