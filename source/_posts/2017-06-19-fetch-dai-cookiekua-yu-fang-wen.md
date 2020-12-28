---
title: fetch 带cookie跨域访问
slug: fetch-dai-cookiekua-yu-fang-wen
date_published: 2017-06-19T08:28:41.000Z
date_updated: 2017-06-19T08:33:48.000Z
---

> fetch

今天,新项目，以前是自己用nginx反向代理，来解决开发跨越的问题。现在，后台设置`Header Access-Control-Allow-Origin:*`，在fetch上，遇到了一点困难。

    export async function get_companies(search = '') {
      return request(`/companies/`, {
        method: "get",
        credentials: 'include',
        mode: 'cors',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      });
    }
    

直接这样请求。会报错

    Fetch API cannot load http://dadigua.com/companies/. The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. Origin 'http://localhost:4000' is therefore not allowed access.
    

是因为后台只设置了`Header Access-Control-Allow-Origin:*`，此时可以进行跨越访问了。但是还能不带cookie，把`credentials: 'include'`,注释，就成功了。

要想带cookie，后台必须还要设置。`response.setHeader("Access-Control-Allow-Credentials","true");`

> ajax写法

- 
后台设置`Access-Control-Allow-Credentials: true;`

- 
前端`var xhr = new XMLHttpRequest();xhr.withCredentials = true;`
