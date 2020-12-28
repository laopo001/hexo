---
title: js笔记4
slug: domshi-jian-2
date: 2017-12-06T03:07:40.000Z
date_updated: 2018-03-01T07:11:38.000Z
---

focus, blur不支持事件冒泡，支持事件捕获。使用focusin，focusout代替。

    const events = {
        focus: 'focusin',
        blur: 'focusout'
    };
    

console.log打印的对象是不会被垃圾回收器回收的。因此最好不要在页面中console.log任何大对象，这样可能会影响页面的整体性能，特别在生产环境中。除了console.log外，另外还有console.dir、console.error、console.warn等都存在类似的问题，这些细节需要特别的关注。

![](/source/images/2018/03/z-index.png)

![](/source/images/2018/03/5AAyW.png)
