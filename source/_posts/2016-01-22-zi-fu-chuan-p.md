---
title: 字符串匹配
slug: zi-fu-chuan-p
date_published: 2016-01-22T02:59:52.000Z
date_updated: 2017-01-17T07:24:46.000Z
tags: 算法
---

本人想找前端的工作。因此，算法语言都是用的javascript。

先介绍一种人人都能写出的匹配方法。

            function strMatch(a,b){
                for(var i=0;i< a.length;i++){
                    if(a.substr(i,1)==b.substr(0,1)){
                        for(var j=0;j< b.length;j++){
                            if(a.substr(i+j,1)!=b.substr(j,1)){break;}
                            if(j == b.length-1){console.log(i);}
                        }
                    }
                }
            }
    

再来介绍大名鼎鼎KMP算法（Knuth-Morris-Pratt，起头的那个K就是著名科学家Donald Knuth。写过《计算机程序设计艺术》一书，当时被誉为计算机学的圣经。）：

> 转的[字符串匹配的KMP算法知识库博客园](http://kb.cnblogs.com/page/176818/)

1.先得出《部分匹配表》

　　首先，要了解两个概念："前缀"和"后缀"。 "前缀"指除了最后一个字符以外，一个字符串的全部头部组合；"后缀"指除了第一个字符以外，一个字符串的全部尾部组合。"部分匹配值"就是"前缀"和"后缀"的最长的共有元素的长度。

    　　－　"A"的前缀和后缀都为空集，共有元素的长度为0；
    　　－　"AB"的前缀为[A]，后缀为[B]，共有元素的长度为0；
    　　－　"ABC"的前缀为[A, AB]，后缀为[BC, C]，共有元素的长度0；
    　　－　"ABCD"的前缀为[A, AB, ABC]，后缀为[BCD, CD, D]，共有元素的长度为0；
    　　－　"ABCDA"的前缀为[A, AB, ABC, ABCD]，后缀为[BCDA, CDA, DA, A]，共有元素为"A"，长度为1；
    　　－　"ABCDAB"的前缀为[A, AB, ABC, ABCD, ABCDA]，后缀为[BCDAB, CDAB, DAB, AB, B]，共有元素为"AB"，长度为2；
    　　－　"ABCDABD"的前缀为[A, AB, ABC, ABCD, ABCDA, ABCDAB]，后缀为[BCDABD, CDABD, DABD, ABD, BD, D]，共有元素的长度为0。
    

代码：

        function retunB(pre,next){
                var temp=[];
                for(var i=0;i<pre.length;i++){
                    if(pre[i]==next[i]){
                        temp.push(pre[i]);
                    }
                }
                if(temp.length==0){return 0;}
                else{return temp[temp.length-1].length;}
            }
            function getB(b){
                var B=[];
                for(var i=1;i<b.length+1;i++){
                    if(i==1){B.push(0);continue}
                    var tempStr = b.substring(0,i);
                    var pre=[];
                    var next=[];
                    for(var j=1;j<tempStr.length;j++){
                        pre.push(tempStr.substring(0,j));
                   next.push(tempStr.substring(tempStr.length-j,tempStr.length))
                    }
                    B.push( retunB(pre,next)) ;
                }
                return B;
            }
    

2.开始KMP匹配:

          function KMP(a,b){
                var B = getB(b);
                for(var i=0;i< a.length;i++){
                    if(a.substr(i,1)==b.substr(0,1)){
                        for(var j=0;j< b.length;j++){
                            if(a.substr(i+j,1)!=b.substr(j,1)){
                                var y=j-B[j-1];
                                i = i+y-1;
                                break;
                            }
                            if(j == b.length-1){console.log(i);}
                        }
                    }
                }
            }
    
