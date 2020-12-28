---
title: 大数乘法
slug: da-shu-cheng-fa
date_published: 2016-10-14T09:02:37.000Z
date_updated: 2016-10-14T09:05:49.000Z
---

在计算机中，int只有32位，long long也就64位。

    #define INT_MIN     (-2147483647 - 1) // minimum (signed) int value
    #define INT_MAX       2147483647    // maximum (signed) int value
    
    #define LLONG_MAX     9223372036854775807i64       // maximum signed long long int value
    #define LLONG_MIN   (-9223372036854775807i64 - 1)  // minimum signed long long int value
    

这时碰见更大数怎么办。这里有一种方法，逐位相乘处理进位法.

    
    class Solution2 {
    public:
    	string multiply(string num1, string num2) {
    
    		reverse(num1.begin(), num1.end());
    		reverse(num2.begin(), num2.end());
    
    		int l1 = num1.size();
    		int l2 = num2.size();
    		string res(l1 + l2 + 1, '0');
    		int carr = 0, t, idx;
    		for (int i = 0; i < l1; ++i)
    		{
    			int n1 = num1[i] - '0';
    			carr = 0;
    			for (int j = 0; j < l2; ++j)
    			{
    				t = carr + n1 * (num2[j] - '0') + (res[i + j] - '0');
    				carr = t / 10;
    				res[i + j] = t % 10 + '0';
    			}
    			idx = l2;
    			while (carr != 0)
    				if (carr != 0) {
    					t = carr + (res[i + idx] - '0');
    					carr = t / 10;
    					res[i + idx++] = t % 10 + '0';
    				}
    		}
    		while (!res.empty() && res.back() == '0') res.pop_back();
    		if (res.empty()) return "0";
    		reverse(res.begin(), res.end());
    		return res;
    	}
    };
    
