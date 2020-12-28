---
title: Recover Binary Search Tree--leetcode
slug: recover-binary-search-tree-leetcode
date: 2016-12-07T07:05:00.000Z
date_updated: 2017-03-26T05:13:04.000Z
---

中序遍历二叉搜索树，是一串从小到大的数字，这里的树，两个个数字交换了位置。只需找出错误的节点，交换回来即可。

    var err1 *TreeNode
    var err2 *TreeNode
    var pre *TreeNode
    func run(root *TreeNode) {
    	if root == nil {
    		return
    	}
    
    	run(root.Left)
    	if(pre!=nil&&pre.Val>root.Val){
    		if(err1==nil){
    			err1=pre
    			err2=root
    		}else {
    			err2=root
    		}
    	}
    	pre=root
    	run(root.Right)
    }
    
    func recoverTree(root *TreeNode) {
        pre=nil
    	err1=nil
    	err2=nil
    	run(root)
        
    	temp:=err1.Val;
    	err1.Val=err2.Val
    	err2.Val=temp
    
    }
    
