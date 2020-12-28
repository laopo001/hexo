---
title: 65. Valid Number--LeetCode
slug: 65-valid-number-leetcode
date: 2016-02-24T07:49:00.000Z
date_updated: 2017-01-17T07:00:56.000Z
tags: LeetCode
---

Validate if a given string is numeric.

Some examples:

"0" => true

" 0.1 " => true

"abc" => false

"1 a" => false

"2e10" => true

Note: It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.

    符合规则的 [".1","01","1."  ,"-.1","+.8","46.e3",".2e81","1.431352e7"," 005047e+6","32.e-80123"]
    不符合["e9","2e"," . " ," "]
    

正则表达式的解：

    var isNumber = function(s) {
       return  !!s.match(/^\s*-?\d+\s*$|^\s*-?\d+\.\d*\s*$|^\s*-?\.\d+\s*$|^\s*-?\d*\.?\d+e-?\+?\d+\s*$|^\s*-?\d+\.?e-?\+?\d+\s*$|^\s*\+\d+\s*$|^\s*\+\d+\.\d*\s*$|^\s*\+\.\d+\s*$|^\s*\+\d*\.?\d+e-?\+?\d+\s*$|^\s*\+\d+\.?e-?\+?\d+\s*$/)
    };//Runtime: 182 ms??????94.12%
    

[LeetCode-Valid Number - 有限状态机](http://blog.csdn.net/suwei19870312/article/details/12094233)

      var isNumber = function(s) {
                var state={
                    value:0,
                    "0":[0,1,2,3],    //0 space start 开始的空白，后面可以接[0,1,2,3]种字符。开始的空白、正负、点前面的数字、点 
                    "1":[2,3],        //1 +-          正负
                    "2":[2,3,5,8],    //2 shuzi dot   点前面的数字
                    "3":[4,5,8],      //3 dian        点
                    "4":[4,5,8],      //4 dot shuzi   点后面的数字
                    "5":[6,7],        //5 e           e
                    "6":[7],          //6 e +-        e后面的正负
                    "7":[7,8],        //7 e shuzi     e后面的数字
                    "8":[8],          //8 space end   结尾的空白
                    change:function(x){
                        for(var i in this[this.value]){
                            if(this[this.value][i]==x){
                                this.value=x;
                                return true;
                            }
                        }
                        return false;
                    }
                };
                var isDian=false;
                var isE=false;
                var isStart=false;
                var   Num=0;
               for(var i=0;i< s.length;i++){
                   if(s.charAt(i)==" "){
                       if(!isStart){
                           if(state.change(0)){continue}else{return false};
                       }else{
                           if(state.change(8)){continue}else{return false};
                       }
                   }
                   isStart=true;
                   if(!!s.charAt(i).match(/\+|-/)){
                       if(isE){
                           if(state.change(6)){continue}else{return false};
                       }
                       if(state.change(1)){continue}else{return false};
                   }
                   if(!!s.charAt(i).match(/[0-9]{1}/)){
                       if(isE){
                           if(state.change(7)){continue}else{return false};
                       }
                       if(isDian){
                           Num++;
                           if(state.change(4)){continue}else{return false};
                       }
                       Num++;
                       if(state.change(2)){continue}else{return false};
                   }
                   if(s.charAt(i)=="."){
                       isDian=true;
                       if(state.change(3)){continue}else{return false};
                   }
                   if(s.charAt(i)=="e"){
                       isE=true;
                       if(state.change(5)){continue}else{return false};
                   }else{
                       return false;
                   }
               }
                if(Num<1){return false;}
               if( state[state.value][state[state.value].length-1]==8){
                   return true;
               }
                else{return false;}
            };   //Runtime: 216 ms 76.47%
    

突然记起来一个js中自带的方法

    var isNumber = function(s) {  
        if(s.match(/^\s*$/)){ return false;}
            return  !isNaN(s);
    };   //Runtime: 180 ms超过94.12%
    
