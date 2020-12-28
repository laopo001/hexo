---
title: leetcode--Non-negative Integers without Consecutive Ones
slug: leetcode-non-negative-integers-without-consecutive-ones
date_published: 2018-01-02T09:10:31.000Z
date_updated: 2018-01-02T09:18:57.000Z
---

这道题给了我们一个数字，让我们求不大于这个数字的所有数字中，其二进制的表示形式中没有连续1的个数。

这里可以先做个简单的题目，长度为n的二进制的表示形式中没有连续1的个数。

    输入：N = 1
    输出：2
    // 3个字符串是0,1  （1+1）
    
    输入：N = 2
    输出：3
    // 3个字符串是00,01,10 （2+1）
    
    输入：N = 3
    输出：5
    // 5个字符串是000,001,010,100,101 （3+2）
    
    输入：N = 4
    输出：8
    // 5个字符串是0000,0001,0010,0100,0101,1000,1001,1010 （5+3）
    

这个问题可以用动态规划来解决。假设a [i]是长度为i的二进制串的数目，它不包含任何两个连续的1并且以0结尾。同样，让b [i]是以1结尾的这样的串的数目。我们可以追加0或1到以0结尾的字符串，但是我们只能将0附加到以1结尾的字符串。这产生递归关系：

如当k=5时，二进制数的范围是00000-11111，我们可以将其分为两个部分，00000-01111和10000-10111，因为任何大于11000的数字都是不成立的，因为有开头已经有了两个连续1。而我们发现其实00000-01111就是f(4)，而10000-10111就是f(3)，所以f(5) = f(4) + f(3)，这就是一个斐波那契数列啦.

    var findIntegers = function(num) {
        let numStr=Array.from(num.toString(2)).reverse().join('');
        let n=numStr.length;
        let a=[1];
        let b=[1];
        for(var i=1;i<n;i++){
            a[i]=a[i-1]+b[i-1];
            b[i]=a[i-1];
        }
        var res=a[n-1]+b[n-1];
        for(var i=n-2;i>=0;i--){
            if(numStr[i]==='1'&&numStr[i+1]==='1') break;
            if(numStr[i]==='0'&&numStr[i+1]==='0') res-=b[i];
        }
        return res;
    };
    

- `if(numStr[i]==='1'&&numStr[i+1]==='1') break;`因为11xxxx内等于111111内，没有连续1的个数是一样的。
- '00'减去fn(i)的个数。100xxx不能大于101111，去到1111内没有连续1的个数即可。
