---
title: webpack+browser-sync
slug: webpack-browser-sync
date_published: 2016-08-17T09:47:59.000Z
date_updated: 2016-08-17T16:16:54.000Z
---

> browser-sync介绍

    Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。
    
    有了它，您不用在多个浏览器、多个设备间来回切换，频繁的刷新页面。更神奇的是您在一个浏览器中滚动页面、点击等行为也会同步到其他浏览器和设备中，这一切还可以通过可视化界面来控制。
    

> 配合webpack使用。

- npm install --save-dev browser-sync
- npm install --save-dev browser-sync-webpack-plugin

    var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
    plugins: [
    new BrowserSyncPlugin({
           // browse to http://localhost:3000/ during development
            host: 'localhost',
            port: 3000, //代理后访问的端口
            proxy: 'localhost:80',//要代理的端口
        },
          // plugin options
          {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: true
          })
    ]
    

- webpack --watch

成功后，访问localhost:3000

这是页面右上角显示
![](/source/images/2016/08/LHY-X3W-3-WY30O5P3GC--5.png)

访问localhost:3001

显示browser-sync后台,这里有很多选项。
![](/source/images/2016/08/TG0GBZ-Y-E-QP_DO51WG-PF.png)

> browser-sync 最嗨的是可以同步浏览器操作。
> ![](/source/images/2016/08/scroll-demo.gif)
> ![](/source/images/2016/08/2668106730-550a6d7e47f8c_articlex.gif)
