---
title: Add Digits--LeetCode
slug: add-digits
date: 2016-02-19T06:48:04.000Z
date_updated: 2017-01-17T07:04:12.000Z
tags: LeetCode
---

Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

For example:

Given `num = 38`, the process is like: `3 + 8 = 11`, `1 + 1 = 2`. Since 2 has only one digit, return it.

Follow up:

Could you do it without any loop/recursion in O(1) runtime?

有一个非负整数num，重复这样的操作：对它的各位数字求和，……直到这结果只有一个数字。

例如：num=38，3+8=11,1+1=2。因为2小于10，因此返回2。

要求时间复杂度为O(1)

先写个简单的：

    var addDigits = function(num) {  
        var numStr = num.toString();
        var result=0;
        for(var i=0;i<numStr.length;i++){
            result+=Number(numStr.charAt(i));//注意Number比parseInt快（我的测试快 10+ms，一个90+ms，一个100+ms）。
        }
        if(result<10){
            return result;
        }else{
            return addDigits(result);
        }
    };
    

O（1）:

    38=3*10+8;  
    38=(3+8)+3*9   (由这个3*(1+9)+8推出)  
    38=(11)+3*9  
    38=((1+1)+1*9)+3*9  
    除（1+1）都能被9整除=>  result=num-9*n。即result=n/9;但是当n=99时，result=0；实际为9。
    因为99=((0+1*9)+1*9)+9*9。
    
    var addDigits = function(num) {  
       if(num===0){return 0;}
       var result=num%9;
       if(result===0){result=9}
       return result;
    };
    

最完美的:

    function addDigits(num) {  
            return 1 + (num-1)%9;  //return 2+(num-2)%9
        }  
    
