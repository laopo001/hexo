---
title: ES6--Proxy
slug: es6-proxy-dai-li
date_published: 2016-03-31T12:16:22.000Z
date_updated: 2017-01-17T06:45:42.000Z
---

Proxy 对象用来为基础操作（例如：属性查找、赋值、枚举、方法调用等）定义用户自定义行为。

> 用法

var p = new Proxy(target, handler);

    var p = new Proxy({}, {  
        set: function(target, key, value, receiver) {
        console.log('method:set oldValue: '+target[key]+' newValue '+ value);
        target[key]=value;
        },
        get:function(target, key, receiver){
        console.log('method:get value '+target[key]);
        return target[key];
        },
        has:function(obj,key){
        return true;
        }
    })
        p.name='123'  //调用set
            p.name  //调用set
            'aa' in p //调用has
    

这里只举了`set,get,has`这三种常用trap的例子,其实还有其他十几种trap，可以在MDN上查。

还有一种特殊的、针对函数的`apply`。

    var p = new Proxy(function(){}, {  
      apply: function(target, thisArg, argumentsList) {
         console.log('apply',argumentsList)//argumentsList函数的参数
      }
    });
    p('a','b')//执行apply  
    

利用这个可以写一些特殊函数，看起来很hack：

    	   var restfulize=function(str){
            var temp=function(){}
            temp.path=str;
            return new Proxy(temp,{
            get:function(target, name){
                 target.path+='/'+name;
                 return restfulize(temp.path);
            },
            apply:function(target, that, args){
                return target.path
            }
           })
         }
    
         var q= restfulize('https://api.github.com') 
         q.name
         q.abc
        console.log(q.abc.qwe());//https://api.github.com/name/abc/abc/qwe
    

还可以加上一句`console.log(arguments.callee.caller)`，可以看到各种行为是被那个函数调用的。

    var p = new Proxy({}, {  
        set: function(target, key, value, receiver) {
             console.log(arguments.callee.caller)
        },
        get:function(target, key, receiver){
              console.log(arguments.callee.caller)
        }
    })
    function abc(){  
    p.name='99999';  
    }
    abc();  //输出abc函数=》在abc中，p被赋值了。用来调试，一下就是找到问题所在。
    

注意：如果在全局被调用则输出null;
