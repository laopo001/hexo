---
title: leetcode ---Word Break
slug: leetcode-word-break
date: 2017-12-29T07:47:48.000Z
date_updated: 2017-12-29T07:47:48.000Z
---

> 给定一个非空字符串，以及一个非空字典的列表，是否可以确定字符串可以分割成一个或多个字典里的单词，你可以确定字典中不包含重复单词。

        var wordBreak = function (s, wordDict) {
            let result={};
            let obj = {};
            wordDict.forEach((x) => {
                obj[x] = x;
            })
            var run =function (s,obj) {
                if(s in result){return result[s];}
                let temp = '';
                let b = false;
                for (var i = 0; i < s.length; i++) {
                    temp += s[i];
                    if (obj[temp]) {
                        // console.log(1)
                        if (i === s.length - 1) {
                            return true;
                        }
                        b = b || run(s.slice(i + 1), obj)
                        if(b===true){break;}
                    }
    
                }
                result[s]=b;
                return b;
            }
            return run(s,obj);
        };
    
