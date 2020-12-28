---
title: performance
slug: performance
date: 2018-07-09T02:36:31.000Z
date_updated: 2018-07-09T03:30:32.000Z
---

这个一个性能分析的对象。

> performance.timing

    / 计算加载时间
    function getPerformanceTiming () {  
        var performance = window.performance;
     
        if (!performance) {
            // 当前浏览器不支持
            console.log('你的浏览器不支持 performance 接口');
            return;
        }
     
        var t = performance.timing;
        var times = {};
     
        //【重要】页面加载完成的时间
        //【原因】这几乎代表了用户等待页面可用的时间
        times.loadPage = t.loadEventEnd - t.navigationStart;
     
        //【重要】解析 DOM 树结构的时间
        //【原因】反省下你的 DOM 树嵌套是不是太多了！
        times.domReady = t.domComplete - t.responseEnd;
     
        //【重要】重定向的时间
        //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
        times.redirect = t.redirectEnd - t.redirectStart;
     
        //【重要】DNS 查询时间
        //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
        // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)            
        times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
     
        //【重要】读取页面第一个字节的时间
        //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
        // TTFB 即 Time To First Byte 的意思
        // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
        times.ttfb = t.responseStart - t.navigationStart;
     
        //【重要】内容加载完成的时间
        //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
        times.request = t.responseEnd - t.requestStart;
     
        //【重要】执行 onload 回调函数的时间
        //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
        times.loadEvent = t.loadEventEnd - t.loadEventStart;
     
        // DNS 缓存时间
        times.appcache = t.domainLookupStart - t.fetchStart;
     
        // 卸载页面的时间
        times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
     
        // TCP 建立连接完成握手的时间
        times.connect = t.connectEnd - t.connectStart;
     
        return times;
    }
    

> performance.now()

performance.now() 与 Date.now() 不同的是，返回了以微秒（百万分之一秒）为单位的时间，更加精准。注意 Date.now() 输出的是 UNIX 时间，即距离 1970 的时间，而 performance.now() 输出的是相对于 performance.timing.navigationStart(页面初始化) 的时间。

> performance.mark(name)  performance.measure(name, startMark, endMark);

使用 performance.mark() 标记各种时间戳（就像在地图上打点），保存为各种测量值（测量地图上的点之间的距离），便可以批量地分析这些数据了。performance.measure()是测量mark点的间隔。使用完成后可以清楚。

window.performance.clearMarks();window.performance.clearMeasures();

> performance.getEntries()

getEntries() 对于给定的filter,此方法返回 PerformanceEntry 对象数组. 数组成员（入口）可以在显式的时间点用 performance marks或measures 来创建(例如调用mark() 方法)。

> 重要

performance.getEntries({ entryType: "resource"});这个是获取页面静态资源加载的情况，可以用来做前端监控。如果某个js或图标加载不出来，则立马告警。

[转载自AlloyTeam](http://www.alloyteam.com/2015/09/explore-performance/)
