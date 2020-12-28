---
title: Text Justification
slug: text-justification
date_published: 2016-03-12T19:47:51.000Z
date_updated: 2017-01-17T06:51:34.000Z
tags: LeetCode
---

Given an array of words and a length L, format the text such that each line has exactly L characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly L characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is inserted between words.

#######For example:

    words: ["This", "is", "an", "example", "of", "text", "justification."]
    L: 16.
    
    Return the formatted lines as:
    [
       "This    is    an",
       "example  of text",
       "justification.  "
    ]
    Note: Each word is guaranteed not to exceed L in length.
    

题意：把一个集合的单词按照每行L个字符放，每行要两端对齐，如果空格不能均匀分布在所有间隔中，那么左边的空格要多于右边的空格，最后一行靠左对齐。

           var fullJustify = function(words, maxWidth) {
                if(maxWidth===0){return [''];}
                function packSpace(size){
                    str='';
                    for(var i=0;i<size;i++){
                        str+=' ';
                    }
                    return str;
                }
                var result=[];
                var sum=0;
                var index=0;
                for(var i=0;i<words.length;i++){
                    sum=sum+words[i].length+1;
                    if(sum-1>maxWidth){
                        var size=i-index-1;
                        var l=sum-words[i].length-size-2    
                        var spaceSize = Math.floor((maxWidth-l)/(size));
                        var temp= (maxWidth-l)%(size)
                        var str='';
                        var k=0;
                        for(var j=index;j<i;j++){
                            if(j==i-1){
                                if(size===0){
                                    str +=words[j]+packSpace(maxWidth-words[j].length);
                                }else{
                                    str +=words[j];
                                }
    
                                break;
                            }
                            if(k<temp){
                                str +=words[j]+packSpace(spaceSize)+' ';
                            }else{
                                str +=words[j]+packSpace(spaceSize)
                            }
                            k++;
                        }
                        result.push(str);
                        index=i;
                        // if(i==words.length){break;}
                        sum=words[i].length+1;
                    }
                    ////
                    if(i==words.length-1){
                        i++;
                        var str='';
                        for(var j=index;j<i;j++){
                            if(j==i-1){
                             str +=words[j]
                             str+=packSpace(maxWidth-str.length);
                                break;
                            }
                            str+=words[j]+' ';
                        }
                        result.push(str);
                        index=i;
                        if(i==words.length){break;}
                        sum=words[i].length+1;
                    }
                }
                return result;
            };
    
