---
title: dom事件
slug: domshi-jian
date_published: 2016-02-15T09:25:00.000Z
date_updated: 2017-01-17T07:19:47.000Z
tags: html
---

原生js有两种事件注册的方法

var cc=   document.getElementById('cc');

    第一种：
        cc.onmousedown=function(){
           console.log(cc)
           alert('123')
       };
    第二种：
        cc.addEventListener('mousedown',function(){
           alert('456')
        },false)
    

第一种会覆盖第一种的事件注册。而第二种不会覆盖。

jq的事件注册不能与原生的共存。只会注册原生的。

事件移除（不能使用匿名函数）

      原生js：
     function asd(){     
         alert('asd')
     }
      cc.addEventListener('mousedown',asd,false)
      cc.removeEventListener('mousedown',asd,false)
      JQ：
     $('#cc').click(asd)
    // $('#cc').on('click',asd)
     $('#cc').unbind('click',asd)
    
