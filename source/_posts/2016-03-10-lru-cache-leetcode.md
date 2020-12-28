---
title: LRU Cache--LeetCode
slug: lru-cache-leetcode
date: 2016-03-10T06:38:55.000Z
date_updated: 2017-01-17T06:55:46.000Z
tags: LeetCode
---

Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.

`get(key)` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.

`set(key, value)` - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

这里直接用JS中的Map数据结构。Map是有顺序的，后加的在在后面。JS中的Map应该不是Hash_Map(unordered_map)，应该是TreeMap(红黑树)，因为它是有顺序。用Array会超时。这道题用JS实现没啥含量，数据结构不是自己写的。不过ES6的Map确实很有用。在LeetCode上，比很多的语言快。

            var LRUCache = function(capacity) {
                this.size=capacity;
                this.map=new Map();
    
            };
            LRUCache.prototype.get = function(key) {
                var value= this.map.get(key);
    
                if(value===undefined){return -1;}else{
                    this.map.delete(key)
                    this.map.set(key,value)
                    return value;
                }
            };
            LRUCache.prototype.set = function(key, value) {
                if(this.map.has(key)){
                    this.map.delete(key)
                }
    
                this.map.set(key, value);
                if(this.map.size>this.size){
                    for(var x of this.map.keys()){
                        this.map.delete(x);
                        return;
                    }
                }
            }//Runtime: 200 ms  94.12%
    
