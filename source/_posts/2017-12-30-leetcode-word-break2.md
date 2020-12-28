---
title: leetcode ---Word Break2
slug: leetcode-word-break2
date_published: 2017-12-30T14:49:56.000Z
date_updated: 2017-12-30T14:49:56.000Z
---

Word Break的升级版，求出所有的组合。

Time Limit Exceeded

            var wordBreak = function (s, wordDict) {
                let result={};
                let obj = {};
                wordDict.forEach((x) => {
                    obj[x] = x;
                })
                let vals=[];
                let arr = [];
                var run =function (s,obj) {
                    // if(s in result){return result[s];}
                    let temp = '';
    
                    for (var i = 0; i < s.length; i++) {
                        temp += s[i];
                        if (obj[temp]) {
                            // console.log(1)
                            arr.push(temp)
                            if (i === s.length - 1) {
                                vals.push(arr.join(' '));
                            }
    
                            run(s.slice(i + 1), obj);
                            arr.pop();
    
                        }
    
                    }
                    // result[s]=res;
                }
                run(s,obj);
                return vals;
            };
    

不超时

            var wordBreak = function (s, wordDict) {
                let result = {};
                let obj = {};
                wordDict.forEach((x) => {
                    obj[x] = x;
                })
                var out = function (s, obj) {
                    if (s in result) { return result[s]; }
                    let vals = [];
                    let arr = [];
                    var run = function (s, obj) {
    
                        let temp = '';
    
                        for (var i = 0; i < s.length; i++) {
                            temp += s[i];
                            if (obj[temp]) {
                                // console.log(1)
                                arr.push(temp)
                                if (i === s.length - 1) {
                                    vals.push(arr);
                                } else {
                                    let res = out(s.slice(i + 1), obj);
                                    res.forEach((x) => {
                                        var tempArr = arr.concat(x);
                                        vals.push(tempArr);
                                        // arr.pop();
                                    });
                                    arr.pop();
                                }
                            }
    
                        }
    
                    }
                    run(s, obj);
                    result[s] = vals;
                    return vals;
                }
                return out(s, obj).map(x => x.join(' '));
                // run(s, obj);
                // return vals;
            };
    
