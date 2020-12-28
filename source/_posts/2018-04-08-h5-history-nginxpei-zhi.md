---
title: h5 history nginx配置
slug: h5-history-nginxpei-zhi
date_published: 2018-04-08T07:25:23.000Z
date_updated: 2018-04-08T07:25:23.000Z
---

server {

listen 80;

server_name  www.m-example.com;

root   "xxx";

location / {

try_files $uri $uri/ /index.html =404;

}

}
