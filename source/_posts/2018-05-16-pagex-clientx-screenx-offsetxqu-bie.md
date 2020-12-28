---
title: pageX,clientX,screenX,offsetX   区别
slug: pagex-clientx-screenx-offsetxqu-bie
date_published: 2018-05-16T10:58:35.000Z
date_updated: 2018-05-16T11:02:10.000Z
---

##### 鼠标事件上坐标

> pageX/pageY:

鼠标相对于整个页面的X/Y坐标。

注意，整个页面的意思就是你整个网页的全部，比如说网页很宽很长，宽2000px，高3000px，那pageX,pageY的最大值就是它们了。

特别说明：IE不支持！

> clientX/clientY：

事件发生时鼠标在浏览器内容区域的X/Y坐标（不包含滚动条）。

浏览器内容区域即浏览器窗口中用来显示网页的可视区域，注意这个可视，也就是说需要拖动滚动条才能看到的区域不算。

当你将浏览器窗口缩小时，clientX/clientY的最大值也会缩小，但始终，它们的最大值不会超过你浏览器可视区域。

特别说明：IE下此属性不规范，它们的最小值不是0而是2，也就是说IE下的clientX/clientY比火狐下始终大2px。

> screenX/screenY

鼠标在屏幕上的坐标。screenX,screenY的最大值不会超过屏幕分辨率。

> offsetX/offsetY:

得出的结果跟pageX/pageY一样，既然如此，它有什么存在价值？因为：

特别说明：只有IE支持！相当于IE下的pageX,pageY。

e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft = e.pageX

e.clientY + document.documentElement.scrollTop  - document.documentElement.clientTop = e.pageY

##### 滚动高度

为了跨浏览器兼容，请使用 window.pageYOffset 代替 window.scrollY;

IE（<9）两个属性都不支持;

safari不支持document.documentElement.scrollTop;

下面的兼容写法

let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
