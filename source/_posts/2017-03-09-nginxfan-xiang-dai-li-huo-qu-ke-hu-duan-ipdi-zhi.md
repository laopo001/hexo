---
title: nginx反向代理，获取客户端ip地址
slug: nginxfan-xiang-dai-li-huo-qu-ke-hu-duan-ipdi-zhi
date: 2017-03-09T03:31:07.000Z
date_updated: 2017-03-09T03:31:09.000Z
---

web服务器如nodejs获取客户端ip地址。一般使用req.connection.remoteAddress。但是当我们使用了nginx反向代理时候，这时req.connection.remoteAddress永远就是本机ip。因为web服务器3000端口永远是80端口代理过来的，可以把Nginx配置改下，可以解决。

    server {
    	listen 80 ;
    	server_name xss.dadigua.win;
    	location / {
    		proxy_pass http://localhost:3000;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $host;
    	}
    }
    

这时只需获取http头x-real-ip即可。如nodejs，req.headers['x-real-ip']。
