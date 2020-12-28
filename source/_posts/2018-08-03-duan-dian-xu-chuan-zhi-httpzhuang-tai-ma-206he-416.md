---
title: 断点续传 之 HTTP状态码206和416
slug: duan-dian-xu-chuan-zhi-httpzhuang-tai-ma-206he-416
date: 2018-08-03T13:21:19.000Z
date_updated: 2018-10-03T08:27:06.000Z
---

HTTP/1.1 206状态码表示 服务器已经成功处理了部分GET请求。类似于FlashGet或者迅雷这类的HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。可以解决大文件下载问题，更快的下载速度。

416状态码表示是由于读取文件时设置的Range有误造成的，RANGE start不能超出文件的size.

> 判断服务器是否支持range。如果http头有Accept-Ranges: bytes，状态码206

    Origin: http://localhost:5000
    Range: bytes=0-0
    Referer: http://localhost:5000/
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36
    
    Accept-Ranges: bytes
    Access-Control-Allow-Methods: GET
    Access-Control-Allow-Origin: *
    Access-Control-Expose-Headers: Content-Range, Content-Type
    Access-Control-Max-Age: 0
    Connection: keep-alive
    Content-Length: 1
    Content-Range: bytes 0-0/69101328
    Content-Type: application/x-msdownload
    

服务器返回了Content-Range: bytes 0-0/69101328，这个69101328就是全部的大小。这样可以使用Range:头分段下载。
![](/source/images/2018/08/QQ--20180803211723.png)

如图分段下载可断点续传，可以暂停，然后继续下载。

最后用Blob合并所有的ArrayBuffer,用Url api下载下来。

> ArrayBuffer => Blob 下载

          var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            var filename = 'dd_3.4.8.exe';
            a.href = url;
            a.download = filename;
            a.click();
    

> 注意

我们在分段下载的时候，可能在下载的过程中，文件修改了。这是合成的文件就出了问题。下载完后可以使用[If-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Match)（If-Range）通过判断Etag是否相等，来判断文件版本。如果Etag变化了，返回416的状态码。需要重新下载。
