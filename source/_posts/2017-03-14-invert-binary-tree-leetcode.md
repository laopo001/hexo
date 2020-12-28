---
title: Invert Binary Tree--leetcode
slug: invert-binary-tree-leetcode
date: 2017-03-14T02:20:41.000Z
date_updated: 2017-03-14T02:20:41.000Z
tags: 算法
---

简单递归

    func invertTree(root *TreeNode) *TreeNode {
    	if(root==nil){return nil}
        temp:=TreeNode{}
        temp.Val=root.Val
    	temp.Left=invertTree(root.Right)
    	temp.Right=invertTree(root.Left)
    	return &temp
    }
    
