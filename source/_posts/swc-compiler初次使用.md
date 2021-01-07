---
title: swc-compiler初次使用
date: 2021-01-07 20:06:26
tags:
---
> swc-compiler是一个用rust实现的js/ts编译器，类似babel 或者 typescript编译器

这个是deno中用的ts编辑成js工具，研究了下，它号称是babel编译速度是18倍。下面是一个项目babel改swc编译

>使用前

![](/source/images/F7DB7563-B710-4BD7-BA2C-2B2229F65571.png)

>使用后

![](/source/images/88ED41D9-5E3F-46E7-B753-56F8DD0170DF.png)

>总结

swc-compiler 性能有优化，但是没有官方说的那么明显。