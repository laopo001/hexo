---
title: SyntaxHighlighter测试 ghost
slug: syntaxhighlighter
date_published: 2016-09-27T10:40:31.000Z
date_updated: 2016-10-17T02:56:55.000Z
---

ghost博客使用SyntaxHighlighter时写一些c++的代码时。在引入头文件是要加入`<>`符号。但是ghost会吧`<>`当成标签转义。所以应该用`&lt;&gt;`代替`<>`,如`#include <string.h>`改成`#include &lt;string.h&gt;`最后，就能完美显示了。

    
    #include "stdafx.h"
    #include 
    #include 
    #include 
    #include 
    
    using namespace std;
    
    int main(void) {
    
    	const char * image = "2.png";
    
    	tesseract::TessBaseAPI  api;
    
    //	api.Init("D:\\tesseract\\tessdata", "chi_sim", tesseract::OEM_DEFAULT);
    	api.Init("D:\\tesseract\\tessdata", "eng", tesseract::OEM_DEFAULT);
    	api.SetVariable("tessedit_char_whitelist", "0123456789.");
    
    	STRING text_out;
    	if (!api.ProcessPages(image, NULL, 0, &text_out))
    	{
    		system("pause");
    		return 0;
    	}
    	printf(text_out.string());
    	system("pause");
    }
    
