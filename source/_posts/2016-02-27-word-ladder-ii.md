---
title: Word Ladder II--leetcode（javascript）
slug: word-ladder-ii
date_published: 2016-02-27T09:35:21.000Z
date_updated: 2017-01-17T06:59:06.000Z
tags: 算法, LeetCode
---

Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

Only one letter can be changed at a time

Each intermediate word must exist in the word list

For example,

Given:

beginWord = "hit"

endWord = "cog"

wordList = ["hot","dot","dog","lot","log"]

Return

[

["hit","hot","dot","dog","cog"],

["hit","hot","lot","log","cog"]

]

Note:

All words have the same length.

All words contain only lowercase alphabetic characters.

从beginWord开始经过wordList到endWord结束。一次只能变一个字母。注意：wordList所有的字母都相同的长度，都是小写。 这是一个无向图。["hot","dot","dog","lot","log"] 先来个邻接矩阵

         hit hot dot dog lot log cog
    hit   0   1   0   0   0   0   0
    hot   1   0   1   0   1   0   0
    dot   0   1   0   1   1   0   0
    dog   0   0   1   0   0   1   1
    lot   0   1   1   0   0   1   0
    log   0   0   0   1   1   0   1
    cog   0   0   0   1   0   1   0
    

            var findLadders = function(beginWord, endWord, wordList) {
                Array.prototype.indexOf = function(val) {    //数组处理
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] == val) return i;
                    }
                    return -1;
                };
                function compare(a,b){
                    var s=0;
                    for(var i=0;i< a.length;i++){
                       if(a.charAt(i) !=b.charAt(i)) {
                           s++;
                       }
                    }
                    if(s>1){
                        return false;
                    }
                    return true;
                }
                var arr=[];
                wordList.unshift(beginWord);
                wordList.push(endWord);
                for(var x in wordList){
                    arr[x]=[];
                }
                for(var i=0;i<wordList.length;i++){
                    arr[i][i]=0;
                    for(var j=i+1;j<wordList.length;j++){
                        if(compare(wordList[i],wordList[j])){
                            arr[i][j]=1;
                            arr[j][i]=1;   //利用无向图对称性
                        }else{
                            arr[i][j]=0;
                            arr[j][i]=0;    //利用无向图对称性
                        }
                    }
                }
                var open=[];
                var results=[]
    
                function to(a){
                    if(a==wordList.length-1){
                        var res=[]
                        for(var i=0;i<open.length;i++){                    
                            res.push(wordList[open[i]])
                        }
                        res.push(wordList[wordList.length-1])
                        results.push(res);
                        open.pop();
                        return;
                    }
                    for(var x in arr[a]){
                        if(arr[a][x]==1&&open.indexOf(x)<0){
                            open.push(a)
                          //      open.push(x)   //
                            to(x);
                        }
                    }
                    open.pop();
                }
                to(0);
               console.log(results)
                return results
            };
            findLadders("hit","cog",["hot","dot","dog","lot","log"])
    //主意leetcode给的wordList是set数据结构，不是Array。还有，这里求的是所有的解。不是最短的。但是可以在最后只留下最短的路径。用的DFS。
    

上面那个肯定是不行的。回报超时的错误。权值一样，下面的换了BFS+剪枝的思想。因为是求最短路径，把已经遍历的直接删除。没用邻接矩阵，必要时再计算。

               var findLadders = function(beginWord, endWord, wordList) {
                function compare(a, b) {
                    var s = 0;
                    for (var i = 0; i < a.length; i++) {
                        if (a.charAt(i) != b.charAt(i)) {
                            s++;
                        }
                    }
                    if (s > 1) {
                        return false;
                    }
                    return true;
                }
                wordList.add(beginWord)
                wordList.add(endWord)
    ///////////////////////////////////////////////////////
                var results = [];
                function to(p) {
                    for(var value in p){
                        wordList.delete(p[value])
                    }
                    var param= new Set();
                    var temps=[];
    
                    for (var q in p){
                        var  a=p[q];
                        if (a == endWord) {
                            return;
                        }
                        wordList.forEach(function(j) {
                                if (compare(a, j)) {
                                    for (var i in results) {
                                        if (results[i][results[i].length - 1] == a) {
                                            var temp = results[i].concat(j)
                                            temps.push(temp)
                                        }
                                    }
                                    param.add(j)
                                }
                        })
                        }
                    results=temps;
                    if(param.size==0){return false}
                    param=Array.from(param);
                    to(param);
                }
                results.push([beginWord])
                to([beginWord]);
                var tempResults=[]
                for(var h in results){
                    if(results[h][results[h].length-1]==endWord){
                        tempResults.push(results[h])
                    }
                }
               console.log(tempResults)
                return tempResults;
            };
        //   findLadders("hit","cog",["hot","dot","dog","lot","log"])
       
      
            findLadders("sand","acne",["slit",````(2853???),"lame"])
    

这个是修改版的，输入规模到了2855个时，还是会超时。虽然解如图。最少11步，一共11个解。用Chrome控制台运行要3秒多，出结果。

发现记录路径那里还是慢，因为从beginWord记录，用的数组+遍历。换成hash（js中的hash是ES6的Map，但是，这里用Object，Object（key为string，value为Array））记录反向的关系。从beginWord开始，由图生成树，然后，从endWord开始，反向遍历树，只要最短的路径。

      var findLadders = function(beginWord, endWord, wordList) {
                var solve={};
                solve.$set=function(property,value){
                    if( this[property]==undefined){
                        this[property]=value;
                    }else{
                        Array.prototype.push.apply(this[property], value);
                    }
                }
                function compare(a, b) {
                    var s = false;
                    for (var i = 0; i < a.length; i++) {
                        if (a.charAt(i) != b.charAt(i)) {
                            if(s){return false}
                            s=true;
                        }
                    }
                    return true;
                }
                wordList.add(beginWord)
                wordList.add(endWord)
                function to(p) {
                    for(var value in p){
                        wordList.delete(p[value])
                    }
                    var param= new Set();
                    var temps=[];
                    for (var q in p){
                        var child=[];
                        var  a=p[q];
                        if (a == endWord) {
                            return;
                        }
                        wordList.forEach(function(j) {
                                if (compare(a, j)) {
                                    solve.$set(j,[a]);
                                    param.add(j)
                                }
                        })
                    }
                    if(param.size==0){return 0}
                    param=Array.from(param);
                    to(param);
                }
                if(to([beginWord])==0){
                    return [];
                };
                var lu=[[endWord]]
                function change(endWords){
                    var param= new Set();
                    var  temps=[];
                    for(var p in endWords){
                        var endWord=endWords[p]
                        if(solve[endWord]!=undefined) {
                                for(var x in solve[endWord]){
                                    for (var i in lu) {
                                        if (lu[i][0] === endWord) {
                                            var temp = [solve[endWord][x]].concat(lu[i])
                                            temps.push(temp)
                                        }
                                    }
                                    param.add(solve[endWord][x])
                                }
                        }
    
                    }
                    if(param.size==0){
                        return lu;
                    }
                    lu=temps;
                  return  change(Array.from(param))
                }
                return  change([endWord])
            };//终于通过了。但还是很慢。leetcode用了1800+ms，不知道别人用js只花了300ms是怎么写的，和c++差不多速度了。以后再优化。用双BFS试试
    
