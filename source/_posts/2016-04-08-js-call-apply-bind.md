---
title: js--call、apply、bind
slug: js-call-apply-bind
date: 2016-04-08T07:52:25.000Z
date_updated: 2017-01-17T06:39:21.000Z
---

先科普一下

    var A = function(){  
    console.log(this===window)  
    }
    A() // true this是window  
    new A()//false 这里this是A的一个实例this instanceof A  :true  
    

一个函数执行和把它当构造函数执行是完全不同的，比如A()和new A()一样。

一个函数的上下文this从外层拿，外层没有就到更外层，反正在全局环境中this=window。

> 1.call和apply

call:改变上下文this，并执行函数，apply也是一样。
`var fn=function(arg1,arg2){} fn.call(obj,arg1,arg2)`

把obj这个对象，当做fn函数的this。并执行fn()

    function add(a,b)  
    {  
      alert(this.name);  
    }  
    var obj={name:'我是obj'}  
    add.call(obj,3,1);//等于add.apply(obj,[3,1]);  
    

同理apply只是把fn参数，放在一个数组中。

这样可以用来实现继承：

    function Animal(name){  
      this.name = name;      
      this.showName = function(){      
        alert(this.name);      
      }      
    }      
    function Cat(name){  
      Animal.call(this, name);  //把Animal中的this换成Cat的实例(this)。并执行Animal。    
    }      
    var cat = new Cat("Black Cat");  
    cat.showName();  
    

> 2.bind

bind和call只有一点区别，都改变上下文this，但是bind不执行，而是返回改变this后的函数。

    var temp=(function add(a,b)  
    {  
      alert(this.name);  
    }).bind({name:'我是obj'}) 
    temp();  
    

bind不仅可以改变this。还可以绑定参数。

    var add=function(a,b){ console.log(a,b); alert(this.name); }  
    var temp=add.bind({name:'我是obj'},1);  
    temp(3);    //输出1,3  
    var temp2=add.bind({name:'我是obj'},8,9);  
    temp2(1,3)  //输出8,9  
    

总结，call、apply、bind这些改变一个函数this的用法，还是很有用的。不然，就要把this用变量保存，利用函数作用域来，把this传入函数。

    function Cat(name){  
        this.name=name;
        this.age=0;
        setInterval(function(){
             this.age++
        },1000)
    }
    var cat=new Cat('花花');  
    

乍一看，这个实例cat的年龄是一秒加1；但是setInterval(function(){this.age++},1000)中的this是指window。不是cat（匿名函数的this一般指向window,setInterval=window.setInterval）。

    function Cat(name){  
        this.name=name;
        this.age=0;
        setInterval(function(){
             this.age++
        }.bind(this),1000)
    }
    var cat=new Cat('花花');这只猫的年龄，终于随时间增长了  
    /////////
    function Cat(name){  
        this.name=name;
        this.age=0;
        var that=this;
        setInterval(function(){  
             that.age++
        },1000)
    }
    var cat=new Cat('花花')//这样也行  
    /////////
    function Cat(name){  
        this.name=name;
        this.age=0;
        var that=this;
        setInterval(()=>{  
             that.age++
        },1000)
    }
    var cat=new Cat('花花')//箭头函数自动绑定了this  
    
