---
title: Palindrome Pairs--leetcode
slug: palindrome-pairs
date_published: 2016-03-12T09:28:54.000Z
date_updated: 2017-01-17T06:52:09.000Z
tags: LeetCode
---

Given a list of unique words. Find all pairs of distinct indices (i, j) in the given list, so that the concatenation of the two words, i.e. words[i] + words[j] is a palindrome.

##### Example 1:

Given words = ["bat", "tab", "cat"]

Return [[0, 1], [1, 0]]

The palindromes are ["battab", "tabbat"]

##### Example 2:

Given words = ["abcd", "dcba", "lls", "s", "sssll"]

Return [[0, 1], [1, 0], [3, 2], [2, 4]]

The palindromes are ["dcbaabcd", "abcddcba", "slls", "llssssll"]

求一组单词中是一对回文(对称的单词)的下标.

            var palindromePairs1 = function(words) {
                var result=[];
                for(var i=0;i<words.length;i++){
                    // words[i].CharAt(0)
                    loop:
                            for(var j=0;j<words.length;j++){
                                if(i===j){continue;}
                                var str=words[i]+words[j];
                                for(var k=0;k<Math.floor(str.length/2);k++)
                                {
                                    if(str.charAt(k)!=str.charAt(str.length-1-k)){
                                        continue loop;
                                    }
                                }
                                result.push([i,j]);
                            }
                }
                return result;
            };
    

上面的答案，是超时的。可能原因是，charAt(n)。时间复杂度为O(n)。这里要循环遍历整个字符串。所有以时间复杂度为O(n!)。n越大，操作越多。这里把var str=words[i]+words[j];加大了操作次数。

            var palindromePairs = function(words) {
                var result=[];
                for(var i=0;i<words.length;i++){
                    // words[i].CharAt(0)
                    loop:
                            for(var j=0;j<words.length;j++){
                                if(i===j){continue;}
                 //               var str=words[i]+words[j];
                                var LongStr;
                                var length;
                                var left;
                                if(words[i].length<words[j].length){
                                    length =  words[i].length;
                                    LongStr=words[j];
                                    left=j;
                                }else{
                                    length =  words[j].length;
                                    LongStr = words[i];
                                    left=i;
                                }
    
                                for(var k=0;k<length;k++)
                                {
                                    if(words[i].charAt(k)!=words[j].charAt(words[j].length-1-k)){
                                        continue loop;
                                    }
                                }
                                if(left==j){
                                    for(var k=0;k<Math.floor((LongStr.length-length)/2);k++)
                                    {
                                        if(LongStr.charAt(k)!=LongStr.charAt(LongStr.length-length-1-k)){
                                            continue loop;
                                        }
                                    }
                                }else{
                                    for(var k=length;k<Math.floor((LongStr.length-length)/2)+length;k++)
                                    {
                                        if(LongStr.charAt(k)!=LongStr.charAt(LongStr.length+length-k-1)){
                                            continue loop;
                                        }
                                    }
                                }
    
                                result.push([i,j]);
                            }
                }
                return result;
            };//Runtime: 1473 ms
    
    

这次通过了。
