---
title: js---Event Loop
slug: js-event-loop
date_published: 2017-05-26T09:06:42.000Z
date_updated: 2017-05-26T09:06:42.000Z
---

js是一门单线程语言。但不是简单的单线程，它还有异步任务机制。js引擎同步代码全部在 "执行栈" 跑，除了这个还有一个"任务队列"（task queue）。一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入下一个执行栈，开始执行。整个过程是无限循环的，这就是Event Loop（事件循环）。

> 定时器

在浏览器中，除了dom和网络异步任务外，剩下的就是定时器了。setTimeout()和setInterval()，HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。老版本的浏览器都将最短间隔设为10毫秒。因此，setTimeout(()=>{},0)，根本不是0秒。

> Node.js的Event Loop

node除了setTimeout和setInterval这两个方法,还有process.nextTick和setImmediate。

process.nextTick方法可以push到当前"执行栈"的尾部。setImmediate方法则是在当前"任务队列"的尾部添加事件，是在下一次Event Loop时执行。

    process.nextTick(function A() {
      console.log(1);
      process.nextTick(function B(){console.log(2);});
    });
    
    setTimeout(function timeout() {
      console.log('Next Event Loop');
    }, 0)
    // 1
    // 2
    // TIMEOUT FIRED
    

setTimeout和setImmediate这两个一样，都是在下一次Event Loop时执行。他们的先后顺序是不确定的。

在使用递归的时候，应该谨慎使用process.nextTick。因为process.nextTick总是在执行，主线程不会去读取"事件队列"！
