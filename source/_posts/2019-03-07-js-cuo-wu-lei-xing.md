---
title: js 错误类型
slug: js-cuo-wu-lei-xing
date_published: 2019-03-06T16:35:21.000Z
date_updated: 2019-03-06T17:04:44.000Z
---

- [EvalError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/EvalError) 本对象代表了一个关于 eval 函数的错误.此异常不再会被JavaScript抛出，但是EvalError对象仍然保持兼容性.
`EvalError 不在当前ECMAScript规范中使用，因此不会被运行时抛出. 但是对象本身仍然与规范的早期版本向后兼容`
- [InternalError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/InternalError) 对象表示出现在JavaScript引擎内部的错误。 例如：

"InternalError: too much recursion"（内部错误：递归过深）。
- [RangeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError) 对象标明一个错误，当一个值不在其所允许的范围或者集合中。
- [ReferenceError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)（引用错误） 对象代表当一个不存在的变量被引用时发生的错误。

    try {
      var a = undefinedVariable;
    } catch (e) {
      console.log(e); // ReferenceError: undefinedVariable is not defined
      console.log(e instanceof ReferenceError); // true
    }
    

- [SyntaxError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 对象代表尝试解析语法上不合法的代码的错误。

    try {
      eval('hoo bar');
    } catch (e) {
      console.log(e);   // SyntaxError: Unexpected identifier
      console.log(e instanceof SyntaxError); // true
    }
    

- [TypeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)（类型错误） 对象用来表示值的类型非预期类型时发生的错误。

    try {
      var a={}
      a.asd()
    } catch (e) {
      console.log(e); // TypeError: a.asd is not a function
      console.log(e instanceof TypeError); // true
    }
    

- [URIError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError) 对象用来表示以一种错误的方式使用全局URI处理函数而产生的错误。

    try {
      decodeURIComponent('%');
    } catch (e) {
      console.log(e);  // URIError: URI malformed
      console.log(e instanceof URIError); // true
    }
    
