---
title: React-Router使用
slug: react-router
date_published: 2016-06-01T10:54:22.000Z
date_updated: 2017-01-17T06:20:39.000Z
---

百度搜出来的都是过时api。现在"react-router": "^2.4.0"了。

> 1.activeClassName

以前的active是默认添加是active。 现在要手动开启了。

    <Link activeClassName="link_active" to="/home" >首页</Link>  
    <Link activeClassName="link_active" to="/addcase" >添加案例</Link>  
    <Link activeClassName="link_active" to="/casequery" >ZZZZ</Link>  
    

> 2.默认路由

    IndexRoute component={Home} /> 这个不能用了
    
    <IndexRedirect to="home" /> 最新。
    
    <Redirect from="/" to="home" />可以跳转，但是，不会为Link增加activeClassName。  
    
    
