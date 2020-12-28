---
title: Diameter of Binary Tree--leetcode
slug: diameter-of-binary-tree-leetcode
date_published: 2017-03-20T10:37:00.000Z
date_updated: 2017-03-27T10:58:27.000Z
---

> 解题思路

求2叉树的两节点的最长路径，可以不经过根节点。老套路递归，返回当前节点的左右子树的最长路径的解（res不经过当前节点），一条打算经过当前节点的最长路径，比较右边最大的解，左边最大的解，以及左右和起来的最大的解。

    
    /**
     * Definition for a binary tree node.
     * struct TreeNode {
     *     int val;
     *     TreeNode *left;
     *     TreeNode *right;
     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
     * };
     */
     
     struct Node{
         int res;
         int max;
         Node(int res,int max):res(res),max(max){}
     };
    class Solution {
    public:
        int diameterOfBinaryTree(TreeNode* root) {
            if(root= = NULL){return 0;}
            Node n=run(root);
            return n.res-1;
        }
        Node run(TreeNode* root){
            if(root==NULL){
                return Node(0,0);
            }
            Node a=run(root->left);
            Node b=run(root->right);
            return Node(max(max(a.res,b.res),a.max+b.max+1),max(a.max+1,b.max+1));
        }
    };
    
