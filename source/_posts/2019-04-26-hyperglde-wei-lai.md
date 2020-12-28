---
title: WebAssembly未来
slug: hyperglde-wei-lai
date_published: 2019-04-26T13:31:10.000Z
date_updated: 2019-04-26T13:39:51.000Z
---

这段时间再次研究了下wasm，这次应该不是狼来了。

> 什么是WASM

WebAssembly是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如C / C ++等语言提供一个编译目标，以便它们可以在Web上运行。它也被设计为可以与JavaScript共存，允许两者一起工作。

这是MDN的解释，它原本的目标是在web中运行的，和js一样。不过后来js也有了node，拥有跨平台的能力。但是，就算js能写native，js的弱点是不能避免的。比如，性能问题，多线程，就算是在浏览器环境，它的问题也很大，webgl这么多年都没发展起来，它的性能问题也是原因之一（强行让js背下锅）。

因此，这一切为啥不用wasm，在浏览器环境，js优势还是很明显的。在wasm2.0还未实现前。如果wasm2.0出来，wasm和js都是浏览器的一等公民了，甚至比js地位更高。

1.比如直接操作dom，调用浏览器的api。现在都是绑定到js，还要转换成js值类型，虽然wasm快，但是这么一来性能优势没那么明显了。

2.wasm2.0支持SIMD，这个在矩阵运算等方面。有2-4倍的提升。

3.wasm2.0支持多线程。

> 什么是[WASI](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/)

上面说了，wasm在浏览器未来对比js的优势。还没说native。现在，一些大佬已经看中了WebAssembly的优势（性能高，安全，可移植性），如rust团队，开发WebAssembly的native接口，未来wasm可以运行在native。WASI将覆盖与POSIX相同的接口，包括文件，网络，时钟和随机数，Opengl等内容。与POSIX不用的是，WebAssembly是沙箱。这意味着代码无法直接与操作系统通信。这一点类似浏览器。

Promise<WebAssembly.Instance> WebAssembly.instantiate(module, importObject); importObject这个是声明需要导入函数。在wasi中，声明 需要请求网络，读写文件等权限。这样一个wasi程序执行需要的权限一目了然。类似苹果，安卓的权限管理。这一点其实也和deno很像，看来大佬都想到一块去了。

wasm作为一种抽象的汇编码，可移植性，高性能不用说了。
