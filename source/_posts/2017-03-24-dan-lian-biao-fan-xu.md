---
title: 单链表反序。
slug: dan-lian-biao-fan-xu
date: 2017-03-24T07:21:54.000Z
date_updated: 2017-03-24T08:07:58.000Z
---

这是一道常见的笔试题，leetcode上有两道题。Reverse Linked List和Reverse Linked List II。

> Reverse Linked List

    class Solution {
    public:
    	ListNode* reverseList(ListNode* head) {
    	    if(head==NULL)  {return head;}
    		ListNode *p1,*p2,*p3;
    		
    		p1 = head;
    		p2 = head->next;
    		while (p2!=NULL)
    		{
    			p3 = p2->next;
    			p2->next = p1;
    			p1 = p2;
    			p2 = p3;
    		}
    		head->next = NULL;
    		head = p1;
    		return p1;
    	}
    };
    

> Reverse Linked List II 反序从m至n区间中的链表。

    class Solution {
    public:
    	ListNode* reverseBetween(ListNode* head, int m, int n) {
    		int index = 1;
    		ListNode *temp = head;
    		ListNode *temp2 = temp;
    		bool is = false;
    		while (index<m) {
    			is = true;
    			temp2 = temp;
    			temp = temp->next;
    			index++;
    		}
    		ListNode *p1, *p2, *p3;
    
    		p1 = temp;
    		p2 = temp->next;
    
    		while (p2 != NULL&&index<n) {
    			p3 = p2->next;
    			p2->next = p1;
    			p1 = p2;
    			p2 = p3;
    			index++;
    		}
    		temp->next = p2;
    		if (is) {
    			temp2->next = p1;
    			return head;
    		}
    		else {
    			return p1;
    		}
    	}
    };
    
