---
title: Wildcard Matching--LeetCode
slug: wildcard-matching-leetcode
date_published: 2016-03-15T14:22:02.000Z
date_updated: 2017-04-06T01:52:09.000Z
tags: LeetCode
---

Implement wildcard pattern matching with support for '?' and '*'.

    '?' Matches any single character.
    '*' Matches any sequence of characters (including the empty sequence).
    
    The matching should cover the entire input string (not partial).
    
    The function prototype should be:
    bool isMatch(const char *s, const char *p)
    
    Some examples:
    isMatch("aa","a") ??? false
    isMatch("aa","aa") ??? true
    isMatch("aaa","aa") ??? false
    isMatch("aa", "*") ??? true
    isMatch("aa", "a*") ??? true
    isMatch("ab", "?*") ??? true
    isMatch("aab", "c*a*b") ??? false
    

题意：通配符匹配

`?`表示：任意字符。`*`表示：0个或者n个`?` 先自己写。用的循环。

            var isMatch = function(s, p) {
                if(p==='*'){return true;}
                var j=0;
                var next;
                var isXin=false;
                var isSuccess=false;
                var toI;
                var toJ;
                var begin;
                for(var i=0;i<s.length;i++){
                    var charI= s.charAt(i);
                    var charJ= p.charAt(j)
                    if(charI===charJ||charJ==='?'){
                        if(charI!=next&&next!==undefined&&next!='?'){
                            toI=toI+1;
                        }else{
                            if(charI==next||next=='?'){
                                begin=toI;
                            }
                        }
                        j++;
                        isSuccess=true;
                        continue;
                    }else{
                        if(charJ==='*'){
                            isXin=true;
                            var toJ=j;
                            var toI=i;
                            next= p.charAt(j+1)
                            while(next==='*'){
                                j++;
                                next=p.charAt(j+1);
                            }
                            if(next==''){return true;}
                            if(charI===next||next==='?'){
                                isSuccess=true;
                                j=j+2;
                                begin=toI;
                            }else{
                                isSuccess=false;
                            }
                            continue;
                        }
    
                        if(isXin){
                            if(isSuccess){
                                j=toJ;
                                i=toI;
                                if(begin!=null){
                                    i=begin;
                                    begin=null;
                                }
                                isXin=false;
                            }
                        }else{
                            return false;
                        }
                    }
                }
                var str= p.slice(j, p.length)
                if(str==''){return true;}
                if(!!str.match(/^\*+$/)&&isSuccess){return true}else{
                    return false;
                }
            };Runtime: 236 ms
    

在网上看到一个C语言的版本，C语言还是快，11ms运行时间.

    	bool isMatch(const char *s, const char *p) {
    		const char* star = NULL;
    		const char* ss = s;
    		while (*s) {
    			if ((*p == '?') || (*p == *s)) { s++;p++;continue; }
    			if (*p == '*') { star = p++; ss = s;continue; }
    			if (star) { p = star + 1; s = ++ss;continue; }
    			return false;
    		}
    		while (*p == '*') { p++; }
    		return !*p;
    	}Runtime: 11 ms
    

改成javascript，思想和自己写的差不多。

            var isMatch = function(s, p) {
                var i=0;var j=0;var k=0;var l=0;
                var star;
                var ss=s;
                while (s.charAt(i)){
                    if ((p.charAt(j)=='?')||(p.charAt(j)==s.charAt(i))){i++;j++;continue;}
                    if (p.charAt(j)=='*'){
                        star=p.slice(j, p.length);
                        j++;
                        ss= s.slice(i, s.length);
                        k=0;l=0;continue;
                    }
                    if (star){
                        p= star.slice(k+1,star.length);
                        j=0;
                        l++;
                        s=ss.slice(l,ss.length);
                        i=0;
                        continue;            
                    }
                    return false;
                }
                while (p.charAt(j)=='*'){j++;}
                return !p.charAt(j);
            };Runtime: 264 ms 
    

第一个版本太乱了，虽然通过了。看了别人的解，这个题只需4个变量记录就可以了，修改如下：

          var isMatch = function(s, p) {
                var toI=-1        //保存 出现*时，i的值。要是s.charAt(toI)未匹配成功，则从下一位开始匹配(toI++;)，因为*可以为[0-n]个任意字符
                var toJ=-1;       //保存 出现*时，j的值，用于*后面匹配不成功时，回溯。
                var j=0;
                for(var i=0;i< s.length;i++){
                    var CharI=s.charAt(i)
                    var CharJ=p.charAt(j)
                    if ((CharJ=='?')||(CharJ==CharI)){j++;continue;}
                    if (CharJ=='*'){
                        toJ=j;
                        j++;
                        toI=i;
                        i--;
                        continue;
                    }
                    if (toJ>=0){
                        toI++
                        i=toI;
                        i--;
                        j=toJ;
                        j++;
                        continue;            //        p = star+1; s=++ss;continue;
                    }
                    return false;
                }
                while (p.charAt(j)=='*'){j++;} //p最后的*全不要。
                return !p.charAt(j);    //j=p.lenght  P全部匹配完成。则return !""
            };Runtime: 256 ms
    
