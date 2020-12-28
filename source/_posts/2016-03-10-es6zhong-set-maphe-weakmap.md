---
title: ES6中Set、Map和WeakSet、WeakMap
slug: es6zhong-set-maphe-weakmap
date_published: 2016-03-10T09:10:17.000Z
date_updated: 2017-01-17T06:55:12.000Z
tags: javascript
---

ES6 新增了几种集合类型，Set、Map 和WeakSet、WeakMap。

> ##### Set

Set 是 ES6 新增的有序列表集合，它不会包含重复项。数组可以存放任何类型的数据，不过数据除重需要自己实现。

    var set = new Set();
    set.add(window);
    set.has(window); // true
    set.size; // 1
    set.add(window);
    set.add(1);
    set.size; // 2
    set.delete(window);
    set.has(window); // false
    set.clear();
    set.size; // 0
    

    注意：
    Set 调用 add、has、delete 等方法时对 key 进行的比较，不做类型转换。可以认为使用 === 进行比较，当然也不全是 ===：  
    1.Set 中，NaN 只能添加一次（虽然NaN === NaN 返回 false）；  
    2.Set 中，「-0」和「0 或 +0」可以同时存在，因为符号不一样（虽然 -0 === 0 或 -0 === +0 返回 true）；  
    

> ##### Map

Map 是 ES6 新增的有序键值对集合。键值对的 key 和 value 都可以是任何类型的元素。而Object对象会对 key 进行 toString() 操作，这会导致某些 key 会意外覆盖之前的数据；如果 key 本身是一个对象，toString() 也得不到想要的结果，如下：

    var o = {};
    var key1 = 2;
    var key2 = { toString : function() { return 2 } };
    var key3 = { x : 1 };
    var key4 = { y : 2 };
    
    o[key1] = 1;
    o[key2] = 2;
    o[key3] = 3;
    o[key4] = 4;
    

![](/content/images/2016/03/P6M-W6W150-1-7N9990EGEI.png)

最后，对象o只有两个属性。应为会调用toString()方法，或者说String强制转换。

    String(key1)==='2'  
    String(key2)==='2'  //虽然key2为对象，但是它有toString()方法。因此为'2'。  
    String(key3)==='[object Object]'  
    String(key4)==='[object Object]'  
    String([])===''  
    String([2])==='2'  
    String([2,3])==='2,3'  
    String(NaN)==='NaN'  
    String(new Map())==='[object Map]'  
    String(new Set())==='[object Set]'  
    String(new WeakSet())==='[object WeakSet]'  
    //////////////////////////////////////////
    typeof (new Set())===  
    typeof (new Object())===  
    typeof (new Array())===      //其实Array就是Object。是关联数组。  
    typeof (new Map())==="object"//都是'Object'  
    new Set().constructor===Set  //true  
    new Map().constructor===Map  //true  
    

使用方法：

    var map = new Map();  
    var key1 = {toString : function() { return 2}};  
    var key2 = 2;  
    map.set(key1, 1);  
    map.set(key2, 2);
    
    map.has(key1); // true  
    map.has('2'); // false，类型不同  
    map.delete(2);  
    map.size; // 1  
    map.get(key2); // undefined 
    

> ##### WeakSet

WeakSet 对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 正因为这样, WeakSet 对象是无法被枚举的, 没有办法拿到它包含的所有元素。WeakSet主要用来储存DOM节点，当这些节点从文档移除时，不会引发内存泄漏。

- 只存储对象类型元素。new WeakSet().add(1)//错误
- 有add/delete/clear/has三个方法，不能遍历，没有size属性等.

> ##### WeakMap

WeakMap 相对于普通的 Map，也是键值对集合，只不过 WeakMap 的 key 只能是非空对象（non-null object）。WeakMap 对它的 key 仅保持弱引用，也就是说它不阻止垃圾回收器回收它所引用的 key。WeakMap 最大的好处是可以避免内存泄漏。一个仅被 WeakMap 作为 key 而引用的对象，会被垃圾回收器回收掉。

WeakMap 拥有和 Map 类似的 set(key, value) 、get(key)、has(key)、delete(key) 和 clear() 方法，但没有 size 属性，也没有任何与迭代有关的方法。
