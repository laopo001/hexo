---
title: 如何写出高性能的js代码一
slug: ru-he-xie-chu-gao-xing-neng-de-jsdai-ma
date_published: 2018-08-10T09:24:28.000Z
date_updated: 2018-08-10T09:31:53.000Z
---

### 如何写出高性能的js代码

下面是v8引擎优化js性能的

#### 快速访问属性

js是一门动态语言，属性是可以动态添加，动态删除的。大部分js引擎使用字典式数据结构作为对象属性的存储。每个属性访问都需要动态查找来解决该属性在内存中的位置，这样是很慢的。在其他静态语言中，在编译时，已经确定了偏移，属性在内存中按照偏移直接获取。只需一个指令。

v8为了减少对象访问属性的时间。不使用动态查找访问属性，而是，动态地在幕后创建隐藏类。在V8中，一个对象当一个新的属性添加时会改变它的隐藏类。

如下一个函数：

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    

当执行 `new Point(1,2)` 时，会创建一个对应Point的隐藏类C0。这时还是一个空对象。

![map_trans_a](https://github.com/v8/v8/wiki/source/images/map_trans_a.png)

当执行 `this.x = x;` 时,这时对象上面添加了`x`属性，v8会基于隐藏类C0创建隐藏类C1。这时`Point`对应的隐藏类是C1。

![](https://github.com/v8/v8/wiki/source/images/map_trans_b.png)

当执行 `this.y = y;` 时,这时对象上面又添加了`y`属性，v8会基于隐藏类C1创建隐藏类C2。并对应隐藏类C2。

v8这样做有两个好处。1.属性访问不需要查字典，V8使用经典的基于类的优化，2.内联缓存。有关内联缓存的更多信息，请参见[Efficient Implementation of the Smalltalk-80 System](http://portal.acm.org/citation.cfm?id=800017.800542)。

根据如上分析，我们创建对象的时候，不要随意添加删除属性。

    // 慢
    var a={};
    a.name=123;
    a.age=11;
    // 快
    var a={name:123,age,123}
    

在某些情况下，如大量的添加属性，删除属性。 Fast mode（快速模式）会转成 Dictionary mode（字典模式）。这种情况是可以通过黑魔法转换的，如下

1. Dictionary mode（字典模式）：字典模式也成为哈希表模式，V8 引擎使用哈希表来存储对象。
2. Fast mode（快速模式）：快速模式使用类似 C 语言的 struct 来表示对象。

如下代码

    function toFastProperties(obj) {
        /*jshint -W027*/
        function f() {}
        f.prototype = obj;
        ASSERT("%HasFastProperties", true, obj);
        return f;
        eval(obj);
    }
    

Bluebird 代码中 f.prototype = obj 是使属性访问变快的关键。当把一个对象设置为另一个对象的 prototype 时，V8 引擎对对象的结构重新进行了优化。

    var a={name:123};
    toFastProperties(a);
    

[Design-Elements](https://github.com/v8/v8/wiki/Design-Elements)

[开启 V8 对象属性的“fast”模式](https://zhuanlan.zhihu.com/p/25069272)

[JavaScript 引擎基础：Shapes 和 Inline Caches](https://zhuanlan.zhihu.com/p/38202123)
