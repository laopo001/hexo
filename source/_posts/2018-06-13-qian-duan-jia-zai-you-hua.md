---
title: 前端加载优化2
slug: qian-duan-jia-zai-you-hua
date_published: 2018-06-13T15:40:33.000Z
date_updated: 2018-06-13T15:42:27.000Z
---

### DNS 预读取

DNS 作为互联网的基础协议，其解析的速度似乎很容易被网站优化人员忽视。现在大多数新浏览器已经针对DNS解析进行了优化，典型的一次DNS解析需要耗费 20-120 毫秒，减少DNS解析时间和次数是个很好的优化方式。DNS Prefetching 是让具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能 减少用户的等待时间，提升用户体验 。

- 
打开和关闭 DNS 预读取

- 
通过response header

`X-DNS-Prefetch-Control: on      X-DNS-Prefetch-Control: off`

- 
通过 标签
`<meta http-equiv="x-dns-prefetch-control" content="off">`

- 
强制查询特定主机名(`<link>` 元素也可以使用不完整的 URL 的主机名来标记预解析，但这些主机名前必需要有双斜线：)

`<link rel="dns-prefetch" href="http://www.spreadfirefox.com/">`

`<link rel="dns-prefetch" href="//www.spreadfirefox.com">`

### WebP图片格式

WebP是Google新推出的影像技术，它可让网页图档有效进行压缩，同时又不影响图片格式兼容与实际清晰度，进而让整体网页下载速度加快。
[gulp-webp](https://github.com/sindresorhus/gulp-webp)这个转WebP的gulp插件还是蛮好用的。

不过WebP的图像格式，在浏览器上面兼容还不够好。
![](/source/images/2018/06/QQ--20180613234153.png)
