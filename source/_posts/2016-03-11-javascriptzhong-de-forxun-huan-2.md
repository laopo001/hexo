---
title: JavaScript——跳多层for循环
slug: javascriptzhong-de-forxun-huan-2
date: 2016-03-11T07:32:58.000Z
date_updated: 2017-01-17T06:52:44.000Z
---

科普常识：写一些算法的时候，蛮有用的。

           var num=0;
            for(var i=0;i<10;i++){
                for(var j=0;j<10;j++){
                    if(i==5&&j==5){
                        break;
                    }
                    num++
                }
            }
            console.log(num)  //num==95
    //这里代码等于
            var num=0;
            P:
                    for(var i=0;i<10;i++){
                        for(var j=0;j<10;j++){
                            if(i==5&&j==5){
                                continue P;     //continue到P；
                            }
                            num++
                        }
                    }
            console.log(num)  //num=95
    

             var num=0;
            P:
            for(var i=0;i<10;i++){
                for(var j=0;j<10;j++){
                    if(i==5&&j==5){
                          break P;         //break到P；
                    }
                    num++
                }
            }
            console.log(num)  //num=55
    
