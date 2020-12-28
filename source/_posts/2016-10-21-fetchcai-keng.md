---
title: fetch踩坑
slug: fetchcai-keng
date: 2016-10-21T07:54:37.000Z
date_updated: 2016-10-21T07:54:37.000Z
---

今天在用fetch发请求的时候，发现session获取不到，以为express配置问题。检查之后，发现服务器获取不到cookie，在fetch请求中也不能设置cookie，当然session出问题。fetch要加配置`credentials: 'include'`

。如下：

    
    fetch('/users/login', {
        method: "post",
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        }, 
        credentials: 'include',
        body: parseParam(userObj)
      });
    fetch('/users/checkLogin',{method:'get',credentials: 'include'});
    
