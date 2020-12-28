---
title: Convert Sorted List to Binary Search Tree--leetcode
slug: convert-sorted-list-to-binary-search-tree-leetcode
date: 2017-03-21T10:54:00.000Z
date_updated: 2017-03-21T11:01:04.000Z
tags: 算法
---

    
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode(int x) : val(x), next(NULL) {}
     * };
     */
    /**
     * Definition for a binary tree node.
     * struct TreeNode {
     *     int val;
     *     TreeNode *left;
     *     TreeNode *right;
     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
     * };
     */
    //中序递归
    class Solution {
    public:
    	TreeNode* sortedListToBST(ListNode* head) {
    		int len = 0;
    		ListNode* temp = head;
    		while (temp != NULL) {
    			len++;
    			temp = temp->next;
    		}
    		TreeNode* tree = buildTree(head, len);
    		return tree;
    	}
    	TreeNode* buildTree(ListNode* &head, int len) {
    		TreeNode* root;
    		if (len val);
    		head = head->next;
    		root->left = left;
    		root->right = buildTree(head, len - mid - 1);
    		return root;
    	}
    };
    
