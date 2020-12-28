---
title: Generator妙用
slug: generatormiao-yong
date_published: 2016-11-18T10:40:13.000Z
date_updated: 2016-12-06T01:51:19.000Z
---

传统的编程语言，早有异步编程的解决方案。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）

    
    function* gen(x){
       var y = yield x + 2;
       var z = yield y + 2;
       return z
    }
    var g = gen(1);
    var a=g.next();//运行到,第一个yield处，交出函数的执行权，并返回x+2=3，
    var b=g.next(a.value);//要记得把a.value传进去，继续执行赋值语句，此时，yield x + 2 已经被替换成传入a.value,然后同上，运行到yield，交出函数的执行权，并返回yield后面的表达式
    var c=g.next();//这里要是不传入参数，则z等undefined,运行到最后，返回undefined
    

Generator 函数有这样的特效，因此可以把一些异步的函数改变成同步的执行。[co最简版实现](https://cnodejs.org/topic/53474cd19e21582e740117df)， yeild后面只支持thunk。

    
    function co(generator) {
      return function(fn) {
        var gen = generator();
        function next(err, result) {
            if(err){
                return fn(err);
            }
            var step = gen.next(result);
            if (!step.done) {
                step.value(next);
            } else {
                fn(null, step.value);
            }
        }
        next();
       }
    }
    // wrap the function to thunk
    function readFile(filename) {
        return function(callback) {
            require('fs').readFile(filename, 'utf8', callback);
        };
    }
    
    co(function * () {
        var file1 = yield readFile('./file/a.txt');
        var file2 = yield readFile('./file/b.txt');
    
        console.log(file1);
        console.log(file2);
        return 'done';
    })(function(err, result) {
        console.log(result)
    });
    
