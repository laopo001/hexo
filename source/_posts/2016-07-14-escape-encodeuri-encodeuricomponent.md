---
title: escape;encodeURI;encodeURIComponent
slug: escape-encodeuri-encodeuricomponent
date: 2016-07-14T09:17:32.000Z
date_updated: 2017-01-17T06:30:22.000Z
---

- escape
- unescape
- encodeURI
- decodeURI
- encodeURIComponent
- decodeURIComponent

encodeURI方法不会对下列字符编码`ASCII?????? ?????? ~!@#$&*()=:/,;?+'`

encodeURIComponent方法不会对下列字符编码`ASCII?????? ?????? ~!*()'`

首先，escape unescape 已经被w3c废弃，是非标准的，应当避免使用。 encodeURI和encodeURIComponent的区别在于转义的范围不一样。

encodeURI一般用在 URL 上。因为一般url是`https://www.baidu.com`这种。encodeURI不会对`: //`字符转义

encodeURIComponent用在URL的参数上（get/post）。参数一般形式`a=xxx&b=xxx`,这时`& =`两个特殊符号很重要，如果`xxx`中有`&`就会导致参数中断，发的数据不全。这时要用encodeURIComponent转义，把`xxx`中的`& =`转掉。

decodeURI；decodeURIComponent反之。
