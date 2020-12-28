---
title: Minimum Height Trees--LeetCode
slug: minimum-height-trees-leetcode
date_published: 2017-04-06T06:46:00.000Z
date_updated: 2017-04-06T06:56:27.000Z
---

问题：给定一个拥有树性质的无向图，图的每一个节点都可以视为一棵树的根节点。在所有可能的树中，找出高度最小的树，并返回他们的树根。

###### Given n = 6, edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]

         0  1  2
          \ | /
            3
            |
            4
            |
            5
    

###### return [3, 4]

这个是无向图，建立邻接矩阵，使用Floyd算法，算出每个点到任意的点的距离，也就是树高度。 结果Time Limit Exceeded，仔细想下，Floyd算法会把每个点到任意的点的距离都求出来，这是没必要的。Dijkstra算法+减枝，应该更快。

    
    #define Infinity 99999999
    class Solution {
    public:
    	vector findMinHeightTrees(int n, vector>& edges) {
    		vector> V;
    		for (int i = 0;i < n; ++i) {
    			vector vec(n, Infinity);
    			vec[i] = 0;
    			V.push_back(vec);
    		}
    		for (int i = 0;i < edges.size();++i) {
    			V[edges[i].first][edges[i].second] = 1;
    			V[edges[i].second][edges[i].first] = 1;
    		}
    		for (int i = 0;i < n;++i)
    			for (int j = 0;j < n;j++)
    				for (int k = 0;k < n;k++)
    					if (V[j][k]>V[j][i] + V[i][k])
    						V[j][k] = V[j][i] + V[i][k];
    
    		int Min = INT_MAX;
    		vector res;
    		for (int i = 0;i < n;++i) {
    			int Max = 0;
    			for (int j = 0;j < n;++j) {
    				if (Max < V[i][j]) {
    					Max = V[i][j];
    				}
    			}
    			//		printf("%d\n", Max);
    			if (Min > Max) {
    				res.clear();
    				res.push_back(i);
    				Min = Max;
    			}
    			else {
    				if (Min == Max) {
    					res.push_back(i);
    				}
    			}
    
    		}
    		return res;
    	}
    };
    
