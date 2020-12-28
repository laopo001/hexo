---
title: 八皇后（javascript）
slug: ba-huang-hou-wen-ti-javascript
date_published: 2016-01-25T15:31:21.000Z
date_updated: 2017-01-17T07:21:43.000Z
tags: 算法
---

八皇后是一道很具典型性的题目。它的基本要求是这样的：在一个8*8的矩阵上面放置8个物体，一个矩阵点只允许放置一个物体，任意两个点不能在一行上，也不能在一列上，不能在一条左斜线上，当然也不能在一条右斜线上。

准备模型,打印方法，检测方法。

              var cloneObj = function(obj){    //深拷贝
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
            var QSS=[];   //棋盘解的集合
            Array.prototype.indexOf = function(val) {   //数组处理
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                }
                return -1;
            };
            var nQueens = [   //棋盘
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ];
            function printQ(queens) {  //打印棋盘
                for (var row=0; row<queens.length; row++) {
                    var rowText = '';
                    for (var col=0; col<queens.length; col++) {
                        if (queens[row][col]===undefined||queens[row][col]==null) {
                            queens[row][col] = 0;
                        }
                        rowText = rowText + queens[row][col] + '  ';
                    }
                    console.log(rowText);
                }
            }
            function isTrue(nQueens,row,col){   //检测该位置是否满足
                for(var i=1;i<row+1;i++){
                    if(nQueens[row-i][col]==1|| nQueens[row-i][col+i]|| nQueens[row-i][col-i]){return false}
                }
                return true;
            }
    

回溯法。一行只能有一个棋子。从第一行第一个格子放起。放了以后。再从第二排开始第一个格子检测，如果为true，则放下。然后，下一行第一个格子检测。如果其中有一排都为false且不是最后一排。则退后一行（row=row-2）。继续上一行检测.如果上一行的最后一个为1，退后2排（row=row-3）。

    
        function NQueens(order){
                var tempCol=0;
                rowLoop:
                for(var row=0;row<order;row++){
                    for(var col=tempCol;col<order;col++){
                        tempCol=0;
                        if(isTrue(nQueens,row,col)){
                            nQueens[row][col]=1;
                            if(row==7){
                                QSS.push(cloneObj(nQueens));
                                var mIndex=nQueens[row].indexOf(1);
                                nQueens[row][mIndex]=0;
                                if(col==7){
                                    var mIndex=nQueens[row-1].indexOf(1);
                                    nQueens[row-1][mIndex]=0;
                                    row= row-2;
                                    tempCol=mIndex+1;
                                    continue rowLoop;
                                }
                                continue;
                            }
                            continue rowLoop;
    
                        }else{//next
                            if(col==7){
                                var mIndex=nQueens[row-1].indexOf(1);
                                nQueens[row-1][mIndex]=0;
                                if(mIndex==7){
                                    if(row==1){   alert('????????????'); break rowLoop;}
                                    mIndex=nQueens[row-2].indexOf(1);
                                    nQueens[row-2][mIndex]=0;
                                    row = row-3;
                                    tempCol=mIndex+1;
                                }
                                else{
                                    row= row-2;
                                    tempCol=mIndex+1;
                                }
                                continue rowLoop;
                            }
                        }
                    }
                }
            }
    
            NQueens(8);
    
            console.log(QSS.length)
            for(var x in QSS){
                console.log('///////////////////////')
                printQ(QSS[x])
            }
    

结果如下
![](/images/2016/01/IF-HW--G4-2--U-----S615.png)

一共92个解。

该题可以利用左右对称。只需求出46个解。就可以得出92个解。在这里两种情况都要考虑到。 如果其中有一排都为false且不是最后一排。则退后一行（row=row-2）。继续上一行检测.如果上一行的最后一个为1，退后2排（row=row-3）。
![](/images/2016/02/QDJ0YM7-K0-T-YUK-G-OFKA.png)

            function NQueens(order){
                var tempCol=0;
                rowLoop:
                for(var row=0;row<order;row++){
                    for(var col=tempCol;col<order;col++){
                        tempCol=0;
                        if(isTrue(nQueens,row,col)){
                            nQueens[row][col]=1;
                            if(row==7){
                                QSS.push(cloneObj(nQueens));
                                var mIndex=nQueens[row].indexOf(1);
                                nQueens[row][mIndex]=0;
                                if(col==7){
                                    var mIndex=nQueens[row-1].indexOf(1);
                                    nQueens[row-2][mIndex]=0;
                                    row= row-2;
                                    tempCol=mIndex+1;
                                    continue rowLoop;
                                }
                                continue;
                            }
                            continue rowLoop;
    
                        }else{//next
                            if(col==7){
                                var mIndex=nQueens[row-1].indexOf(1);
                                nQueens[row-1][mIndex]=0;
                                if(mIndex==3&&row==1){
                                    alert('完成一半');  //在此跳出循环
                                }
                                if(mIndex==7){
                                    if(row==1){   alert('回溯完成'); break rowLoop;}
                                    mIndex=nQueens[row-2].indexOf(1);
                                    nQueens[row-2][mIndex]=0;
                                    if(mIndex==3&&row==2){
                                        console.log(QSS.length)
                                        alert('完成一半');   //在此跳出循环(真)
                                    }
                                    row = row-3;
                                    tempCol=mIndex+1;
                                }
                                else{
                                    row= row-2;
                                    tempCol=mIndex+1;
                                }
                                continue rowLoop;
                            }
                        }
                    }
                }
            }
    
            NQueens(8);
    
            console.log(QSS.length)
            for(var x in QSS){
                console.log('/////////////')
                printQ(QSS[x])
            }
    
