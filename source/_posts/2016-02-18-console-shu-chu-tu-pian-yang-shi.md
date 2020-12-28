---
title: console--输出图片，样式
slug: console-shu-chu-tu-pian-yang-shi
date: 2016-02-18T14:41:00.000Z
date_updated: 2017-01-17T07:07:59.000Z
---

Color文字 

Color文字 

3D文字 

**Format Specifier**

**Description**

%s

Formats the value as a string.

%d or %i

Formats the value as an integer.

%f

Formats the value as a floating point value.

%o

Formats the value as an expandable DOM element (as in the Elements panel).

%O

Formats the value as an expandable JavaScript object.

%c

Formats the output string according to CSS styles you provide.

> 输出图片

`console.log("%c", "padding:50px 300px;line-height:120px;background:url('http://www.dadigua.win:8080/show/book/img/grasslight-big.jpg') no-repeat;");`

> 输出文字

`console.log("%c3D Text"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em")`

console.log("%c", "padding:300px 300px;line-height:120px;background:url('http://www.dadigua.win:8080/show/book/img/grasslight-big.jpg') no-repeat;");
console.log("%c3D Text"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em")
