---
title: Binary Tree Level Order Traversal--leetcode
slug: binary-tree-level-order-traversal-leetcode
date_published: 2016-09-22T09:44:00.000Z
date_updated: 2017-03-22T09:47:32.000Z
tags: 算法
---

    
    /**
     * Definition for a binary tree node.
     * struct TreeNode {
     *     int val;
     *     TreeNode *left;
     *     TreeNode *right;
     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
     * };
     */
    class Solution {
    public:
    	vector> levelOrder(TreeNode* root) {
    		vector> res;
    		if (root == NULL) { return res; }
    		vector list;
    		list.push_back(root);
    		vector temp2;
    		temp2.push_back(root->val);
    		res.push_back(temp2);
    		while (list.size()!=0)
    		{
    			vector temp;
    			vector temp2;
    			for (size_t i = 0; i < list.size(); i++)
    			{
    				if (list[i]->left!=NULL) {
    					temp.push_back(list[i]->left);
    					temp2.push_back(list[i]->left->val);
    				}
    				if (list[i]->right != NULL) {
    					temp.push_back(list[i]->right);
    					temp2.push_back(list[i]->right->val);
    				}
    			}
    			list = temp;
    			if(temp.size()!=0){
    			    res.push_back(temp2);
    			}
    			
    		}
    		return res;
    	}
    };
    
