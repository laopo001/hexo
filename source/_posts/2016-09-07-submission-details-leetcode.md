---
title: generate-parentheses--LeetCode
slug: submission-details-leetcode
date: 2016-09-07T10:37:04.000Z
date_updated: 2016-09-27T10:40:05.000Z
---

试下node的C/C++ Addons的性能。

题目见[generate-parentheses](https://leetcode.com/problems/generate-parentheses/)

> js

    	"use strict";
            console.time();	
    	var generateParenthesis = function(n) {
    	var arr=[];
    	function run(left,right,str){
    		if(left>0){
    			run(left-1,right,str+"(");
    		}
    		if(right>0&&left<right){
    			run(left,right-1,str+")");
    		}
    		if(left===0&&right===0){
    			arr.push(str);
    		}
    		
    	}
    	run(n-1,n,"(");
    	return arr;
    	};
    	console.log(generateParenthesis(15).length)
    	console.timeEnd();
    

> node C/C++ Addons

    #ifdef WIN32
    #pragma execution_character_set("utf-8") //配合v8使用。
    #endif
    #include<iostream>
    #include <node.h>
    #include <vector>
    
    namespace demo {
    	//using namespace std;
    	using v8::Exception;
    	using v8::FunctionCallbackInfo;
    	using v8::Isolate;
    	using v8::Local;
    	using v8::Number;
    	using v8::Array;
    	using v8::Object;
    	using v8::String;
    	using v8::Value;
    	
    	class Solution {
    	public:
    		inline void run(int left, int right, std::string &str, std::vector<std::string> &arr) {
    			if (left>0) {
    				str.push_back('(');
    				run(left - 1, right, str, arr);
    				str.pop_back();
    			}
    			if (right>0 && left<right) {
    				str.push_back(')');
    				run(left, right - 1, str, arr);
    				str.pop_back();
    			}
    			if (left == 0 && right == 0) {
    				arr.push_back(str);
    			}
    		}
    		std::vector<std::string> generateParenthesis(int n) {
    			std::vector<std::string> arr;
    			arr.reserve(10000000);
    			std::string str = "(";
    			run(n - 1, n, str, arr);
    			return arr;
    		}
    	};
    	void Method(const FunctionCallbackInfo<Value>& args) {
    		Isolate* isolate = args.GetIsolate();
    		std::vector<std::string> arr;
    		int n = (int)args[0]->NumberValue();
    		Solution s;
    		arr= s.generateParenthesis(n);
    		Local<v8::Array> v8arr=	Array::New(isolate,arr.size());
    		//args.GetReturnValue().Set(v8arr);
    		for (size_t i = 0; i < arr.size(); i++)
    		{
    			v8arr->Set(i, v8::String::NewFromUtf8(isolate, arr[i].c_str()));
    		}
    		args.GetReturnValue().Set(v8arr);
    	}
    
    	void init(Local<Object> exports) {
    		NODE_SET_METHOD(exports, "hello", Method);
    	}
    
    	NODE_MODULE(addon, init)
    
    } 
    

> 结果

在输出n等于15时候，返回900W+条，字符串。这里一比发现，js主要4秒左右。C/C++ Addons要15秒。原来在

在把C++的vector对象转成js的Array时，耗了大量的时间。C++得到900W+条vector时，其实只花了2s+的时间。

> 注意

传引用，传值，性能差距还是蛮大的，这里C++代码string str传值，会比js慢。
