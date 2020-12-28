---
title: DungeonGame一道动态规划的题--LeetCode
slug: dungeongame
date_published: 2016-02-15T09:32:02.000Z
date_updated: 2017-01-17T07:18:53.000Z
tags: LeetCode
---

**Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.**

**For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the optimal path RIGHT-> RIGHT -> DOWN -> DOWN.**

    -2(K)	-3	   3
     -5	 -10	 1
     10	  30	-5 (P)
    

> ###### Notes:

The knight's health has no upper bound.

Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

题目大意： 有一个2D方格，每个方格有个数字，要求从左上角走到右下角，没次走的方向只能是右边和下面，如果格子的数字大于0，表示可以在这个格子加hp，如果小于0就要减掉相应数字的hp.如果到达任何一个格子时，hp为0，表示不能达到这个位置。求刚开始需要初始化多少hp才能保证走到右下角的格子。

这是一个动态规划的题。用BFS，从(2,2)到(0,0)

          var calculateMinimumHP = function(dungeon) {
                var colSize=dungeon[0].length;
                var rowSize=dungeon.length;
                var dp=[];
                for(var i=0;i<rowSize;i++){
                    dp.push([])
                }
                dp[rowSize-1][colSize-1] = Math.max(1 - dungeon[rowSize-1][colSize-1], 1);
                 if(colSize===1&&rowSize===1){return dp[rowSize-1][colSize-1];}
                function move(arr){
                    var tempArr=[];
                    for(var x of arr){
                        if(x[0]-1>=0){   //左移
                            if(dp[x[1]][x[0]-1]===undefined){
                                dp[x[1]][x[0]-1]=Math.max(1, dp[x[1]][x[0]]-dungeon[x[1]][x[0]-1])
                                tempArr.push([x[0]-1,x[1]])
                            }else{
                                dp[x[1]][x[0]-1]= Math.min(dp[x[1]][x[0]-1] ,Math.max(1, dp[x[1]][x[0]]-dungeon[x[1]][x[0]-1]))
    
                            }
                        }
                        if(x[1]-1>=0){   //上移
                            if(dp[x[1]-1][x[0]]===undefined){
                                dp[x[1]-1][x[0]]=Math.max(1, dp[x[1]][x[0]]-dungeon[x[1]-1][x[0]])
                                tempArr.push([x[0],x[1]-1])
                            }else{
                                dp[x[1]-1][x[0]]= Math.min(dp[x[1]-1][x[0]] ,Math.max(1, dp[x[1]][x[0]]-dungeon[x[1]-1][x[0]]))
                            }
                        }
                    }
                    if(tempArr.length===1){
                        if(tempArr[0][0]===0&&tempArr[0][1]===0){
                            return dp[0][0]
                        }
                    }
                    return move(tempArr);
                }
                return  move([[colSize-1,rowSize-1]])
            };//Runtime: 160 ms
    

最优的解，用的是类似Floyd算法的思想：

            var calculateMinimumHP = function(dungeon) {
                var colSize=dungeon[0].length;
                var rowSize=dungeon.length;
                function move(XY) {
                    if(XY[0]==colSize-1&&XY[1]==rowSize-1){return Math.max(1,1-dungeon[rowSize-1][colSize-1]);}
                    if(XY[0]>=colSize){return Infinity}
                    if(XY[1]>=rowSize){return Infinity}
                    var right = Math.max(1,move([XY[0]+1,XY[1]])-dungeon[XY[1]][XY[0]]);
                    var down =  Math.max(1,move([XY[0],XY[1]+1])-dungeon[XY[1]][XY[0]]);
                    return Math.min(right,down);
                }
                return  move([0,0])
            };
    

?????????????????????????????Floyd??????????????????

         var calculateMinimumHP = function(dungeon) {
                var m = dungeon.length;
                var n = dungeon[0].length;
                var dp=[];
                for(var i=0;i<m;i++){
                    dp.push([]);
                }
                dp[m-1][n-1] = Math.max(1 - dungeon[m-1][n-1], 1);
                for(var i = m-2; i >= 0; i--){
                    dp[i][n-1] = Math.max(dp[i+1][n-1] - dungeon[i][n-1], 1);
                }
                for(var i = n-2; i >= 0; i--){
                    dp[m-1][i] = Math.max(dp[m-1][i+1] - dungeon[m-1][i], 1);
                }
                for(var i = m-2; i >= 0; i--){
                    for(var j = n-2; j >= 0; j--){
                        dp[i][j] = Math.max(Math.min(dp[i][j+1], dp[i+1][j]) - dungeon[i][j], 1);
                    }
                }
                return dp[0][0] ;
            };//Runtime: 100 ms
    
