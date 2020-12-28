---
title: leetcode --- String to Integer (atoi)
slug: leetcode-string-to-integer-atoi
date: 2018-01-08T08:43:19.000Z
date_updated: 2018-01-08T08:43:30.000Z
---

1.需要考虑数字、符号和空格的情况。因为数字前面是可以有空格的。

2.非上面的直接返回0.

3.考虑边界问题32位有符号。 `2147483647  ～  -2147483648`

    var myAtoi = function(str) {
        var n = str.length;
        var sign = 1;
        var num = 0;
        var isBegin = false;
        var end = 0;
        for(var i=0;i<n;i++){
            var c = str[i];
            if(c===' '){
                if(isBegin){
                    break;
                }
            } else if(c>='0'&&c<='9'){
                var end = c - '0';
                num = num  * 10 + end;
    
                isBegin = true;
            } else {
            
                if((c==='+'||c==='-')&&!isBegin){
                    sign = c === '-' ? -1 : 1;
                    isBegin = true;
                    
                } else {
                    break;
                }
            }
        }
        var result = sign * num
        if(result>2147483647){
            result=2147483647;
        }
        if(result<-2147483648){
            result=-2147483648;
        }
        return result;
    };
    
