---
title: 求最大公共子序列（动态规划）
slug: qiu-zui-da-gong-gong-zi-xu-lie
date: 2016-02-15T09:41:10.000Z
date_updated: 2017-01-17T07:17:00.000Z
tags: 算法
---

求[1, -2, 3, 5, -3, 2]的最大公共子序列

最直接的回溯

           function MaxSubString1(arr,n)
            {
                var  max = Number.NEGATIVE_INFINITY;  //初始值为负无穷大
                var  sum;
                for(var i = 0; i < n; i++)
                {
                    sum = 0;
                    for(var j = i; j < n; j++)
                    {
                        sum += arr[j];
                        if(sum > max)
                            max = sum;
                    }
                }
                return max;
            }
    

动态规划的解

      function MaxSubString(arr,n)
            {
                var  sum = arr[n - 1];
                var  max = arr[n - 1];
                for(var  i = n - 2; i >= 0; i--)??? //从后向前遍历，反之亦可。
                {
                    sum = Math.max( arr[i], arr[i] + sum);
                    max = Math.max(sum, max);
                }
                return max;?????????????????????? 
            }
            MaxSubString([1, -2, 3, 5, -3, 2],6)
    
