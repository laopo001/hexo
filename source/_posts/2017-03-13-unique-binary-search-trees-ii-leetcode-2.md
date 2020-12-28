---
title: Unique Binary Search Trees II--leetcode
slug: unique-binary-search-trees-ii-leetcode-2
date: 2017-03-13T08:58:47.000Z
date_updated: 2017-03-13T10:07:30.000Z
tags: 算法
---

    /**
     * Definition for a binary tree node.
     * type TreeNode struct {
     *     Val int
     *     Left *TreeNode
     *     Right *TreeNode
     * }
     */
    var m=make(map[string][]*TreeNode)
    func createTree(start,end int)[]*TreeNode {
        elem,ok:=m[string(start)+string(end)]
        if(ok){
            return elem
        }
    	res:=[]*TreeNode{}
    	if start>end {  
            res=append(res,nil)
            return res;
        }  
    	for i:=start;i<=end;i++{
    		 lefts:=createTree(start,i-1)
    		 rights:=createTree(i+1,end)
    		 for j:=0;j<len(lefts);j++{
    			 for k:=0;k<len(rights);k++{
    				 var temp=TreeNode{i,nil,nil}
    				 temp.Left=lefts[j]
    				 temp.Right=rights[k]
    				 res=append(res,&temp)
    			 }
    		 }
    	} 
    	m[string(start)+string(end)]=res
    	return res
    }
    
    func generateTrees(n int) []*TreeNode {
        if(n<=0){
            res:=[]*TreeNode{}
            return res
        }else{
            return createTree(1,n)
        }
        
    }
    
