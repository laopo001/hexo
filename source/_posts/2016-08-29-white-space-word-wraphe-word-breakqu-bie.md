---
title: white-space、word-wrap和word-break区别
slug: white-space-word-wraphe-word-breakqu-bie
date: 2016-08-29T03:34:25.000Z
date_updated: 2016-09-05T03:26:33.000Z
---

> word-wrap: normal | break-word;

- normal :会换行，但是单词长度超过width时不折行，产生溢出
- break-word :单词超长时，会折行把剩余的单词折行显示。

> word-break:normal | break-all | keep-all (词内换行)

- normal:如果是中文则到边界处的汉字换行,如果是英文整个词换行,注意:如果出现某个英文字符串长度超过边界,则后面的部分将撑开边框,如果边框为固定属性,则后面部分将无法显示.
- break-all :强行换行,将截断英文单词
- keep-all :不允许字断开。如果是中文将把前后标点符号内的一个汉字短语整个换行,英文单词也整个换行,注意:如果出现某个英文.字符串长度超过边界,则后面的部分将撑开边框,如果边框为固定属性,则后面部分将无法显示.

> white-space（优先级最高）

- inherit :指其值继承父元素对应属性的计算值。
- initial :指其值为原始的值。
- normal　：默认，浏览器忽略空白符
- nowrap　：文本不会换行，文本会在在同一行上继续，直到遇到 
 标签为止。
- pre-line：合并空白符，但是保留换行符。
- pre-wrap：保留空白符，但是正常地进行换行。

> text-overflow ： clip | ellipsis

- clip:而只是简单的裁切，需要在一定的高度范围内配合overflow:hidden属性使用．
- ellipsis：对象文本溢出时将显示省略标记(...)，需要配合overflow:hidden；white-space:nowrap起使用才会有效果。
