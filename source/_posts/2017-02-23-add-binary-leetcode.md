---
title: Add Binary--leetcode
slug: add-binary-leetcode
date_published: 2017-02-23T08:42:08.000Z
date_updated: 2017-03-14T08:37:46.000Z
tags: 算法
---

给定两个二进制字符串，返回它们的和（也是一个二进制字符串）。

    var addBinary = function(a, b) {
        if (a.length===0) return b;
        if (b.length===0) return a;
        if(a[a.length-1] == '1'&&b[b.length-1] == '1'){
            return addBinary(addBinary(a.slice(0,a.length-1),b.slice(0,b.length-1)),'1')+'0';
        }
        else{
            return addBinary(a.slice(0,a.length-1),b.slice(0,b.length-1))+(parseInt(a[a.length-1])||parseInt(b[b.length-1])).toString();
        }
    };
    

    package main
    import "strconv"
    
    func addBinary(a,b string) string{
    	var lenA=len(a)
    	var lenB=len(b)
    	if(lenA==0){
    		return b
    	}
    	if(lenB==0){
    		return a
    	}
    	if(a[lenA-1:lenA]=="1"&&b[lenB-1:lenB]=="1"){
    		return addBinary(addBinary(a[0:lenA-1],b[0:lenB-1]),"1")+"0"
    	}else{
    		temp1,_:=strconv.Atoi(a[lenA-1:lenA])
    		temp2,_:=strconv.Atoi(b[lenB-1:lenB])
    		return addBinary(a[0:lenA-1],b[0:lenB-1])+strconv.Itoa(temp1+temp2)
    	}
    }
    
