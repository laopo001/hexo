---
title: webpack2--devServer
slug: webpack2-devserver
date: 2017-03-30T09:13:30.000Z
date_updated: 2017-03-30T09:13:30.000Z
---

> 用dev-server开发时代理，决解开发时跨域问题

包装一下fetch,让url前面自动加上 `'/test'`。devServer配置，如下。

        devServer: {
            contentBase: __dirname + "/src",  // New
            proxy: {
                '/test/*': {
                  target: 'http://192.168.99.106:5000',
                   pathRewrite: {'^/test' : ''},
                   changeOrigin: true,
                   secure: false
                }
             }
        },
    
