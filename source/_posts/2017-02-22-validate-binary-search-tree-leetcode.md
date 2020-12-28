---
title: Validate Binary Search Tree -- LeetCode
slug: validate-binary-search-tree-leetcode
date_published: 2017-02-22T10:09:30.000Z
date_updated: 2017-03-16T07:46:33.000Z
tags: 算法
---

判断二叉树是否二叉查找树

//先序遍历，利用区间判断

    bool run(struct TreeNode* root,long min,long max){
        if(root==NULL){
            return true;
        }
        if(root->val<=min||root->val>=max){
            return false;
        }
        return run(root->left,min,root->val)&&run(root->right,root->val,max);
    }
     
     
    bool isValidBST(struct TreeNode* root) {
        return run(root,LONG_MIN,LONG_MAX);
    }
    
    

//中序遍历验证（二叉搜索树，中序遍历是从小到大的一组数字）

    var pre *TreeNode
    func isValidBST(root *TreeNode) bool {
        pre=nil
        return run(root)
    }
    func run(root *TreeNode)bool{
        if(root==nil){
    		return true
    	}
    	b1:=run(root.Left)
    	if(pre!=nil&&pre.Val>=root.Val){
    		return false
    	}
    	pre=root
    	b2:=run(root.Right)
    	return b1&&b2
    }
    
