---
title: 递归和迭代(循环)解决汉罗塔问题(javascript)
slug: di-gui-he-xun-huan-jie-jue-yi-luo-ta-wen-ti
date: 2016-01-21T09:16:00.000Z
date_updated: 2017-01-17T07:26:25.000Z
tags: 算法
---

递归和迭代都是循环的一种。网上很多都是用递归解决汉罗塔，。今天研究了下用迭代解决。 先贴出递归的javascript版。大家可以到chrome控制台直接调试。

    var j=0;  
            function Hanoi(n,a,b,c){
                if(n>=1){
                    Hanoi(n-1,a,c,b);
                    j++;
                    console.log('第'+j+'部从'+a+'移动到'+c);
                    Hanoi(n-1,b,a,c);
                }
            }
            Hanoi(7,'A','B','C')
    

大多数的递归都可以改写成循环，递归从上而下。循环从下往上；递归由系统压栈，循环则要自己存储。就是，用简单的循环来代替递归的话，有时必须要手工维护一个数据结构。

循环的解法

        Array.prototype.Run=function(to){
                if(to=='left'){
                    for(var i=0;i<this.length;i++){
                        if(this[i].from=='B'){this[i].from='C';}else{
                            if(this[i].from=='C'){this[i].from='B';}
                        }
                        if(this[i].to=='B'){this[i].to='C';}else{
                            if(this[i].to=='C'){this[i].to='B';}
                        }
                    }
                }
                if(to=='right'){
                    for(var i=0;i<this.length;i++){
                        if(this[i].from=='A'){this[i].from='B';}
                        else{
                            if(this[i].from=='B'){this[i].from='A';}
                        }
    
                        if(this[i].to=='A'){this[i].to='B';}else{
                            if(this[i].to=='B'){this[i].to='A';}
                        }
    
                    }
                }
                return this;
            }
            function hanoi3(n){
                var a='A';
                var b='B';
                var c='C';
                var temp=1;
                for(var i=0;i<n;i++){
                    temp = temp+temp+1;
                    if(i==0){ s.push(new to(a,c));continue;}
                    var temp =cloneObj(s);
                    var temp2=cloneObj(s);
                    s = temp.Run('left').concat([new to(a,c)],temp2.Run('right'));
                }
    
                for(var i=0;i< s.length;i++){
    
                    console.log('第'+(i+1)+'从'+s[i].from+'移动到'+s[i].to);
                }
    
            }
    
    
            var cloneObj = function(obj){
                var str, newobj = obj.constructor === Array ? [] : {};
                if(typeof obj !== 'object'){
                    return;
                } else if(window.JSON){
                    str = JSON.stringify(obj), //系列化对象
                            newobj = JSON.parse(str); //还原
                } else {
                    for(var i in obj){
                        newobj[i] = typeof obj[i] === 'object' ?
                                cloneObj(obj[i]) : obj[i];
                    }
                }
                return newobj;
            };
    
            hanoi3(7)
    
