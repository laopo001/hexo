---
title: 面试准备+复习
slug: mian-shi-ti
date_published: 2017-03-31T00:25:47.000Z
date_updated: 2018-09-12T07:42:42.000Z
---

> 功能:停止事件冒泡

event.stopPropagation( );  // W3C,阻止事件冒泡

event.cancelBubble = true; //在IE下

> 功能：阻止事件默认行为

event.preventDefault();// W3C addEventListener

event.returnValue = false; //在IE下

return false;//通过on这种方式的绑定的，使用return false;

> 浏览器缓存控制机制

[https://juejin.im/entry/5ad86c16f265da505a77dca4](https://juejin.im/entry/5ad86c16f265da505a77dca4)

- Expires
- Cache-control：max-age策略
- Last-Modified/If-Modified-Since
- Etag

> AMD / CMD

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。AMD 是提前执行，依赖前置。

    define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好
        a.doSomething()
        // 此处略去 100 行
        b.doSomething()
        ...
    }) 
    

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。CMD 是延迟执行，依赖就近。

    define(function(require, exports, module) {
       var a = require('./a')
       a.doSomething()   // 此处略去 100 行
       var b = require('./b') // 依赖可以就近书写
       b.doSomething()   // ... 
    })
    

> js加载

默认情况javascript是同步加载的，也就是javascript的加载时阻塞的。因此js加载要放后最后。也可以加上defer/async,或者动态创建script标签。前端图片等资源，是等html下载完成后，发起多线程请求加载。

> dom渲染

- 浏览器会解析三个东西：一个是HTML/SVG/XHTML，事实上，Webkit有三个C++的类对应这三类文档。解析这三种文件会产生一个DOM Tree。CSS，解析CSS会产生CSS规则树。Javascript，脚本，主要是通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree.
- 解析完成后，浏览器引擎会通过DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。注意：Rendering Tree 渲染树并不等同于DOM树，因为一些像Header或display:none的东西就没必要放在渲染树中了。CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element。也就是DOM结点。也就是所谓的Frame。然后，计算每个Frame（也就是每个Element）的位置，这又叫layout和reflow过程。
- 最后通过调用操作系统Native GUI的API绘制。转自[知乎](https://www.zhihu.com/question/20117417/answer/22359160)
- 因此，要把css放head中。

> Reflow 和 Repaint

Repaint「重绘」改变 DOM 元素的视觉效果，如颜色，透明度，隐藏(visibility),outline 。一般自会递归自身和子元素。

Reflow「回流」，不仅会改变自己，还会影响别的元素。因此在要尽量避免这样的开销。比如一个元素大小改变了，一般会影响别的元素的布局。如display。

###### 减少回流

- 不要用 inline style 或 table 布局；
- 如果想设定元素的样式，通过改变元素的 class 名 (尽可能在 DOM 树的最里层)；
- 用于表现动画的元素，使用 position 属性的 fixed 值或 absolute 值（脱离文档流）；
- 减少不必要的 DOM 层级；
- 避免设置多项内联样；；

> HTTP协议 “无连接，无状态”

无连接

- HTTP/1.0 指的是每次连接只处理一个请求，服务端处理完客户端一次请求，等到客户端作出回应之后便断开连接；这种方式有利于节省服务器资源.明显，HTTP1.0，会在建立和断开连接上花费大部分时间；
- HTTP/1.1 Keep-Alive提出来解决上面的问题，且持久连接称为了默认的连接方式。但是线端阻塞(head-of-line blocking), 它是指一个连接(connection)一次只提交一个请求的效率比较高, 多了就会变慢。 HTTP/1.1 试过用流水线(pipelining)来解决这个问题, 但是效果并不理想(数据量较大或者速度较慢的响应, 会阻碍排在他后面的请求).
- HTTP/2是完全多路复用的，而非有序并阻塞的——只需一个连接即可实现并行

无状态

- 无状态是指协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态。即我们给服务器发送 HTTP 请求之后，服务器根据请求，会给我们发送数据过来，但是，发送完，不会记录任何信息。这样明显是不行的。Cookie+Session应运而生。

> HTTP 2.0与HTTP 1.1区别

- HTTP/2采用二进制格式而非文本格式
- HTTP/2是完全多路复用的，而非有序并阻塞的——只需一个连接即可实现并行
- 使用报头压缩，HTTP/2降低了开销
- HTTP/2让服务器可以将响应主动“推送”到客户端缓存中

> X-UA-Compatible

指定IE=edge来指示IE使用它支持的最高模式。

添加http头add_header "X-UA-Compatible" "IE=Edge";

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    

> Google PageSpeed

Google提供了 PageSpeed工具，这是一个浏览器插件，可以很好地应用上文中Google所提到的Web优化实践——帮助你轻松对网站的性能瓶颈进行分析，并为你提供优化建议。

> 301与302的区别

301 redirect: 301 代表永久性转移(Permanently Moved)。

302 redirect: 302 代表暂时性转移(Temporarily Moved )。

- 对用户来说没有区别，他们看到效果只是一个跳转
- 对于引擎及站长:302转向可能会有URL规范化及网址劫持的问题。可能被搜索引擎判为可疑转向，甚至认为是作弊。

> 字符串拼接

在Javascript中使用"+"号来拼接字符串效率是比较低的，因为每次运行都会开辟新的内存并生成新的字符串变量，然后将拼接结果赋值给新变量。与之相比更为高效的做法是使用数组的join方法，即将需要拼接的字符串放在数组中最后调用其join方法得到结果。

> css关系选择符

- E F 选择所有被E元素包含的F元素。
- E>F 选择所有作为E元素的子元素F。
- E+F 选择紧贴在E元素之后F元素。
- E~F 选择E元素后面的所有兄弟元素F。

> 事件触发器

- fireEvent  IE
- dispatchEvent 其他高级浏览器

    var fireEvent = function(element,event){  
            if (document.createEventObject){  
                // IE浏览器支持fireEvent方法  
                var evt = document.createEventObject();  
                return element.fireEvent('on'+event,evt)  
            }  
            else{  
                // 其他标准浏览器使用dispatchEvent方法  
                var evt = document.createEvent( 'HTMLEvents' );  
                evt.initEvent(event, true, true);  
                return !element.dispatchEvent(evt);  
            }  
    }; 
    

> 事件监听/取消

- attachevent detachEvent IE下事件名称+on
- addeventlistener removeEventListener

> Javascript内存泄露

- 循环引用 一个 DOM 对象被一个 Javascript 对象引用，与此同时又引用同一个或其它的 Javascript 对象，这个 DOM 对象可能会引发内存泄露。IE 6, 7中有一部分对象并不是原生js对象。例如，其DOM和BOM中的对象就是使用C++以COM对象的形式实现的，而COM对象的垃圾回收机制采用的就是引用计数策略。这样就会触发循环引用，引起内存泄露
- Javascript闭包
- DOM插入

> JavaScript 垃圾回收机制

- 引用计数法 早期IE采用的。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1。如果同一个值又被赋给另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减1。当这个值的引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾回收器下次再运行时，它就会释放那些引用次数为0的值所占用的内存。
- 标记清除法 当变量进入环境时，例如，在函数中声明一个变量，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。更新的更好的方法。

> text-overflow: clip|ellipsis|string;

    clip 修剪文本。	
    ellipsis 显示省略符号来代表被修剪的文本。
    string 使用给定的字符串来代表被修剪的文本。
    

> whiteSpace: normal|pre|nowrap|pre-wrap|pre-line|inherit

    normal	默认。空白会被浏览器忽略。
    pre	空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。
    nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
    pre-wrap	保留空白符序列，但是正常地进行换行。
    pre-line	合并空白符序列，但是保留换行符。
    inherit	规定应该从父元素继承 white-space 属性的值。
    

> box-sizing content-box|border-box

- content-box W3C盒模型
- border-box 和IE盒模型一样（新的盒模型）

> link和@import区别

- link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用;而@import是CSS提供的，只能用于加载CSS;
- 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
- import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;

> HTML5为什么只需要写?

Html5不基于SGML,因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照他们应该的方式来运行）而HTML4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

> Margin垂直塌陷(collapse)问题

折叠的产生情况：

1.必须是处于常规文档流（非float和绝对定位）的块级盒子,并且处于同一个BFC当中。

2.没有线盒，没有空隙（clearance，下面会讲到），没有padding和border将他们分隔开(ps

:所以解决办法中有padding或者border两种办法)

3.都属于垂直方向上相邻的外边距，

解决办法：

加border|padding|overflow:hidden

> 对BFC规范(块级格式化上下文：block formatting context)的理解？

BFC (Block Formatting Contexts) 即块级格式化上下文，从样式上看，它与普通的容器没有什么区别，但是从功能上，BFC 可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器没有的一些特性，例如可以包含浮动元素，（如 overflow 方法）就是触发了父元素的 BFC ，使到它可以包含浮动元素，从而防止出现高度塌陷的问题。(在IE6-7中没有BFC，但是有hasLayout和BFC有相似的功能，*zoom: 1 触发 hasLayout)

> 移动端最小触控区域是多大?

MIT的一项研究指出，大多数成年人的食指宽度为16-20mm，换算后大约为45-57px。Apple的44px*44px操作起来就很舒适了。

> 页面编码和被请求的资源编码(如js)如果不一致如何处理?

    http://www.yyy.com/a.html 中嵌入了一个http://www.xxx.com/test.js
    a.html 的编码是gbk或gb2312的。 而引入的js编码为utf-8的 ，那就需要在引入的时候
    <script src="http://www.xxx.com/test.js" charset="utf-8"></script>
    同理，如果你的页面是utf-8的，引入的js是gbk的，那么就需要加上charset="gbk".
    

> javascript里面的继承怎么实现，如何避免原型链上面的对象共享

利用原型来继承,通过增加一个空的函数来避免原型链上的对象共享

    function Cat(name){  
    Animal.call(this);  
    this.name = name || 'Tom';
    }
    (function(){  // 创建一个没有实例方法的类  
    var Super = function(){};  
    Super.prototype = Animal.prototype;  
    //将实例作为子类的原型  Cat.prototype = new Super();
    })();
    

> 如何保证一致性的代码风格

JSLint|JSHint|ESLint|JSCS。在团队开发中，这些工具对于编写代码非常的有帮助，能够帮助团队开发者强制执行规定的风格指南，还能够通过静态分析捕获常见的错误。

> CSS Hack

IE6：_

IE7：+

IE6 & IE7：*

IE6 & IE7 & IE8 & IE9 & IE10：\9

IE8 & IE9 & IE10:\0

IE9 & IE10：\9\0

> createDocumentFragment

createDocumentFragment方法用来创建一个DocumentFragment。在前面我们说到DocumentFragment表示一种轻量级的文档，它的作用主要是存储临时的节点用来准备添加到文档中，解决添加大量节点时的性能问题。

(今天，面试被问了。)
