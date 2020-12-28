---
title: event loop,macrotask机制,microtask机制 解释
slug: event-loop-macrotaskji-zhi-microtaskji-zhi-jie-shi
date_published: 2018-07-16T11:27:04.000Z
date_updated: 2018-07-17T06:01:11.000Z
---

macrotask:宏任务，setTimeout。

microtask:微任务，promise。

当js栈上为空，这是读取微任务队列，当microtask（微任务队）列call完清空（js栈上为空），再去读macrotask（宏任务）

> 如下面的[例子](https://stackblitz.com/edit/js-4uy9mh?embed=1&amp;file=index.js)

    <div class="outer-test">
      <div class="inner-test">test</div>
    </div>
    <div class="test">test2</div>
    
    var outer = document.querySelector('.outer-test');
    var inner = document.querySelector('.inner-test');
    var test = document.querySelector('.test');
    
    let log2 = console.log
    
    function onClick() {
      log2('click');
    
      setTimeout(function () {
        log2('timeout');
      }, 0);
    
      Promise.resolve().then(function () {
        log2('promise');
      });
    }
    
    inner.addEventListener('click', onClick);
    outer.addEventListener('click', onClick);
    
    test.addEventListener('click', () => {
      inner.click()
    })
    

点test 和 test2 的区别。点击test2,在第一次输出click后，js栈上不为空，因为它是 () => {

inner.click()

})调用的，因此不会立即调用microtask（微任务）。等到冒泡完成，然后去执行。

test2 输出如下

    click
    click
    promise
    promise
    setTimeout
    setTimeout
    

[https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
