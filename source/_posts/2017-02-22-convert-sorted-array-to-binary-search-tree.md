---
title: Convert Sorted Array to Binary Search Tree
slug: convert-sorted-array-to-binary-search-tree
date: 2017-02-22T10:14:16.000Z
date_updated: 2017-02-22T10:15:36.000Z
tags: 算法
---

有序数组创建高度最小的二叉查找树

    // class TreeNode{
    //     constructor(val) {
    //         this.val = val;
    //         this.left = null;
    //         this.right=null
    //       }
    // }
    var sortedArrayToBST = function(nums) {
                function build(arr){
    				if(arr.length===0){return null;}
                    var mid=Math.floor(arr.length/2);
    				var node=new TreeNode(arr[mid]);
    				node.left=build(arr.slice(0,mid))
    				node.right=build(arr.slice(mid+1,arr.length))
    				return node
                }
    
                return build(nums);
    };
    
