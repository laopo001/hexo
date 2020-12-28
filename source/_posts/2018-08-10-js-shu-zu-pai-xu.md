---
title: JS 数组排序
slug: js-shu-zu-pai-xu
date_published: 2018-08-10T09:06:06.000Z
date_updated: 2018-08-10T09:06:06.000Z
---

    var data = [
      {value: 4}, 
      {value: 2}, 
      {value: undefined}, 
      {value: undefined}, 
      {value: 1}, 
      {value: undefined}, 
      {value: undefined}, 
      {value: 7}, 
      {value: undefined}, 
      {value: 4}
    ];
    

data 是个数组，数组的每一项都是一个拥有 value 作为 key 的对象，值为数字或者 undefined。

    data
      .sort((x, y) => x.value - y.value)
      .map(x => x.value);
    
    data
      .map(x => x.value)
      .sort((x, y) => x - y)
    

在 ES6 规范 22.1.3.24 节写道：

    Calling comparefn(a,b) always returns the same value v when given a specific pair of values a and b as its two arguments. Furthermore, Type(v) is Number, and v is not NaN. Note that this implies that exactly one of a < b, a = b, and a > b will be true for a given pair of a and b.
    

简单翻译一下就是：第二个参数 comparefn 返回一个数字，并且不是 NaN。一个注意事项是，对于参与比较的两个数 a 小于 b、a 等于 b、a 大于 b 这三种情况必须有一个为 true。

所以严格意义上来说，这段代码是有 bug 的，因为比较的结果出现了 NaN。

在 MDN 文档上还有一个细节：

    如果 comparefn(a, b) 等于 0， a 和 b 的相对位置不变。备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守。
    翻译成编程术语就是：sort 排序算法是不稳定排序。
    

    // %RemoveArrayHoles returns -1 if fast removal is not supported.
    var num_non_undefined = %RemoveArrayHoles(array, length);
    
    if (num_non_undefined == -1) {
      // There were indexed accessors in the array.
      // Move array holes and undefineds to the end using a Javascript function
      // that is safe in the presence of accessors.
      num_non_undefined = SafeRemoveArrayHoles(array);
    }
    

中间的注释：Move array holes and undefineds to the end using a Javascript function。排序之前会把数组里面的 undefined 移动到最后。因此第二个排序算法会把 undefined 移动到最后，然后对剩余的数据 [4,2,1,7,4] 进行排序。

而在第一种写法时，数组的每一项都是一个 Object，然后最 Object 调用 x.value - y.value 进行计算，当 undefined 参与运算时比较的结果是 NaN。当返回 NaN 时 V8 怎么处理的呢？我前面标注过，再贴一次：

    var order = comparefn(tmp, element);
    if (order > 0) {  // <---- 这里
      a[j + 1] = tmp;
    } else {
      break; // 
    }
    

    [1, 23, 2, 3].sort() 
    // [1,2,23,3] js默认排序是字典序。
    

[从 V8 源码看 JS 数组排序的诡异问题](https://zhuanlan.zhihu.com/p/28482937)
