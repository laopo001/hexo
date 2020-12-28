---
title: Nim Game(尼姆游戏)--LeetCode
slug: nim-game-ni-mu-you-xi
date_published: 2016-02-19T03:59:07.000Z
date_updated: 2017-01-17T07:05:52.000Z
tags: LeetCode
---

You are playing the following Nim Game with your friend: There is a heap of stones on the table, each time one of you take turns to remove 1 to 3 stones. The one who removes the last stone will be the winner. You will take the first turn to remove the stones.

Both of you are very clever and have optimal strategies for the game. Write a function to determine whether you can win the game given the number of stones in the heap.

For example, if there are 4 stones in the heap, then you will never win the game: no matter 1, 2, or 3 stones you remove, the last stone will always be removed by your friend.

博弈论中极为经典的尼姆游戏。有总数为n的石头，每个人可以拿1~3(m)个石头，两个人交替拿，拿到最后一个的人获胜。究竟是先手有利，还是后手有利？

    function Nim(n){    //对于先手来说。  
       if(n%4===0){return "输";}
       else{return "赢";}
    }
    

先手有利。只有n被4整除时，才会输。

- 假设有1颗石头。 先手赢
- 假设有2颗石头。 先手赢
- 假设有3颗石头。 先手赢
- 假设有4颗石头。 后手赢
- 假设有5颗石头。 先手赢（5=1+4，先拿1个，不管别人拿1~3个,总会留下3~1个。）

得出结论，要赢就要留4个给对手选择。这样必赢。

递推：要赢就要留`4*N`个给对手选择。这样必赢。（不管对手选q`[1-3]{1}`个，自己选`4-q`个就行，保证留下最后`4`个。）

因此，先手，在`4*N+1`或`4*N+2`或`4*N+3`颗石头时，必赢。在`4N`时，输。所以，先手优势。
