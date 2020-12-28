---
title: Angularx服务器渲染
slug: angularxfu-wu-qi-xuan-ran
date: 2017-12-11T06:37:13.000Z
date_updated: 2018-02-09T07:14:37.000Z
---

#### 一、vendor,polyfill打包

使用vendor抽出公共部分，如`angular/*`、`rxjs`。这些基本上都不变。加上hash[8]

#### 二、去掉不常用的库

如momentjs我们只用format()的功能。但是它是很大500+kb。还有jquery只使用了$.param() 它也是200+kb。

#### 三、懒加载

在经过一，二部后已经node_modules中出来jpush-ui外，基本没有了。没啥优化空间了。官网的页面是很多的，20多个页面。可以看到下图。这2.8M基本都是页面。

![image](/source/images/2017/11/webpack1.png)
大小备注15M+第一次23.6M(client.js)dll打包，分成3个文件，client、vendor、polyfill33.1M(client.js)去掉momentjs库42.8M(client.js)去掉jquery库
#### 工具

这里使用`BundleAnalyzerPlugin`分析工具。

            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8888,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            })
    
