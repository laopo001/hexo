---
title: js数组笔记
slug: jsshu-zu-shen-ru
date_published: 2016-02-16T02:05:07.000Z
date_updated: 2017-01-17T07:15:52.000Z
---

- concat：合并数组(不会改变a。合并成一个新数组return的)

    var a=[1];
    var b=[2];
    var c= a.concat(b);
    
    

可以使用Array.prototype.push.apply(a,b) 这样就改变的a。

- 
slice(start,end):从已有的数组中返回选定的元素。不会改变原数组

- 
splice(index,length,item1,.....,itemX):从数组中添加/删除项目，然后返回被删除的项目。

    参数	描述
    index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
    length	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
    item1, ..., itemX	可选。向数组添加的新项目。
    

> 以下是w3school上面的其它的api

    
    方法	描述
    join()	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
    pop()	删除并返回数组的最后一个元素
    push()	向数组的末尾添加一个或更多元素，并返回新的长度。
    reverse()	颠倒数组中元素的顺序。
    shift()	删除并返回数组的第一个元素
    sort()	对数组的元素进行排序
    toString()	把数组转换为字符串，并返回结果。
    toLocaleString()	把数组转换为本地数组，并返回结果。
    unshift()	向数组的开头添加一个或更多元素，并返回新的长度。
    valueOf()	返回数组对象的原始值
    

    Array.from()//可以将Set，Map转Array。  
    
