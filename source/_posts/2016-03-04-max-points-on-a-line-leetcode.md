---
title: Max Points on a Line(leetcode)
slug: max-points-on-a-line-leetcode
date_published: 2016-03-04T06:43:12.000Z
date_updated: 2017-01-17T06:56:24.000Z
tags: LeetCode
---

Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

求二维平面上n个点中，最多共线的点数。

思路：选定一个点，分别计算其他点和它构成的直线的斜率，斜率相同的点肯定在同一条直线上。（1.这里可以利用对称性，减少一半的次数，a到b的斜率等于b到a的。2.自己和自己的斜率不用算，把结果的点数+1返回，即可。）

js中的Object和Map是Key-Value,表示映射关系。但是Object(本质为关联数组)的key只能为String(强制转换)。Value可以是Object。而Map（Object-Object)。虽然在key为String时，看起来一样，但是性能有差别，Map明显快。这里用Object要300ms。用Map只要150ms。

      var maxPoints = function(points) {
                if(points.length<3){return points.length;}
                    function getMost(arr){
               var j=0;
               var map = new Map()
               for(var i=0;i<arr.length;i++){
                   if(arr[i]==undefined){continue;}
                   if(isNaN(arr[i])){j++;continue;}
                   if(arr[i]==-0){x=0}
                   if(arr[i]==-Infinity){x=Infinity}
                   if(map.get(arr[i])===undefined){
                       map.set(arr[i],[arr[i]])
                   }else{
                       map.get(arr[i]).push(arr[i])
                   }
    
               }
               var temp=0;
               map.forEach(function(p){
                   if(temp<p.length){
                       temp=p.length;
                   }
               })
    
               return temp+j;
           }
                var ks=[]
                for(var x in points){
                    ks.push([]);
                }
                for(var i=0;i<points.length;i++){  //a：
                    for(var j=i+1;j<points.length;j++){
                        ks[i][j]=(points[i].y-points[j].y)/(points[i].x-points[j].x);
                        ks[j][i]=(points[i].y-points[j].y)/(points[i].x-points[j].x);
                    }
                }
                var sum=[]
                for(var i=0;i<points.length;i++){  //这里可以再优化，放到a：那里计算。
                    sum.push(getMost(ks[i]));
                }
                return (function(){
                    var max=-1;
                    for(var i=0;i<sum.length;i++) {
                        if (max < sum[i]) {
                            max = sum[i]
                        }
                    }
                    return max;
                })()+1;
            };//Runtime: 148 ms超过100%的javascript
    
