---
title: 计算机加法原理
slug: bu-yong-jia-hao-de-jia-fa-yun-suan
date: 2016-02-19T01:10:01.000Z
date_updated: 2017-01-17T07:07:07.000Z
---

在二进制条件下，计算往往是采用逻辑计算的方法实现的，而非四则方法。js源码：

    var add=function(a,b){
    
    	if(!b){return a;}
    
    	var temp1=a^b;
    
    	var temp2=(a&b)<<1;
    
    	return add(temp1,temp2);
    
    }
    var c=add(1,2)
    

举例说明： 12 + 9 = 21

- 12的二进制数是 1100;9的二进制数是 1001
- 先1100和1001异或计算,temp1=0101;
- 逻辑与 然后 右移1位，1000 右移有一位后 temp2=10000;
- 继续异或计算， (temp1)0101与(temp2)10000的异或计算 10101
- 逻辑与运算结果是00000(不需要进位了)。
- 则计算结束。二进制10101就是最终的计算结果，即十进制的21.
