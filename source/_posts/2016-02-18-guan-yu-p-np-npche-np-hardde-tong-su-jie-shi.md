---
title: 关于P,NP,NPC和NP-hard的通俗解释
slug: guan-yu-p-np-npche-np-hardde-tong-su-jie-shi
date_published: 2016-02-18T06:35:35.000Z
date_updated: 2017-01-17T07:09:34.000Z
---

P: Polynomial Solvable

NP: Non-determinstic Polynomial Solvable

词语解释：

- Polynomial 【数】多项式的； 由平方，立方等常数次方或者更小的运算符和+,-,*,/等构成的式子及其这种式子的和
- Non-deterministic: 非确定性的（如：时间复杂度为O(n^logn)、O(n!)、O(2^n))

Turing-machine: 图灵机; 英国数学家图灵提出的计算模型, 一个两端无限长的由小格子组 成的带子，每个格子可以存储一个数，一个可以在带子左右移动的游标或者指针或者不如叫 磁头(head), 磁头可读或修改格子里的数。 下面默认说的是确定性图灵机，和非确定性图 灵机功能上等价
- Algorithm: 算法。 给定一个问题的描述作为输入，图灵机求解的过程。 此过程有可能无 限步长，则图灵机永远不会停止，除非被外部力量终止。
- Polynomial algorithm: 多项式算法。 如果给定问题输入的长度，常量n, 则如果图灵机 解答过程需要的是时间是以n为变量的多项式，则这个解法（也是个算法）是有多项式的时 间复杂度的。
- Decision question: 判定问题。 答案是yes或者no的问题

P问题和NP问题

- P问题 (Polynomial Solvable): 如果一个判定问题是P问题，则这个问题存在一个多项式解法。 即图灵机只需要多项式时间 就可以得到答案, 既回答yes或者no。
- NP问题(Nondeterminstic Polynomial Solvable): 如果一个判定问题是NP问题， 则这个问题的一个可能的解，可以在多项式时间内被验证是 否正确。 其实这不是本来的定义。 本来的定义是，NP问题是非确定性图灵机有多项式解。 但我们可以把非确定性图灵机多项多可解转化成确定性图灵机多项式可验证解。 确定性 图灵机更好好理解，所以用那个定义。
- P问题是确定性图灵机在多项式时间内求到解，NP问题是非确定性图灵机在多项式时间内求 到解，或者说NP问题是确定性图灵机在多项式时间内验证解.
- P 属于 NP。 就是说，一个问题如果属于P， 则一定属于NP。 (这里P, NP表示符合定义的 相关问题的集合) 反过来则不一定，7大数学世纪难题之一就是问 P是否等于NP。

NPC 和 NP-hard

- NPC, 即NP完全性问题(NP-complete)。 是指NP问题中的最难的问题。 即还没有找到多项式解法，但多项式可验证。 而且只要一个NPC问题有多项式解法，其它所有NP问题都会有一个多项式解法。
- NP-hard是指所有还没有找到多项式解法的问题, 并没有限定属于NP。 所以NP-hard比 NPC范围更大，也会更难。 NPC是NP-hard和NP的交集.
