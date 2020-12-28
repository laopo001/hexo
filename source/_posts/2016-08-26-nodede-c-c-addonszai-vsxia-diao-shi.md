---
title: Node的C/C++ Addons在VS下调试
slug: nodede-c-c-addonszai-vsxia-diao-shi
date_published: 2016-08-26T10:38:27.000Z
date_updated: 2016-09-02T10:38:20.000Z
---

> 下载

去GitHubs下载源码[nodejs](https://github.com/nodejs/node)，这是最新的node源码。其他的版本到[https://nodejs.org](https://nodejs.org)下载。

> 配置

- 在源码根目录(我放在D:\node-master)，打开命令行。输入`vcbuild.bat nosign Debug x64`，成功后会生成一些文件和文件夹。
- 在工作目录打开控制台。输入node-gyp clean configure --nodedir="D:\node-master"(nodejs源码根目录)
- 这时工作目录出现一个build文件夹，下面有个bind.sln。双击vs就打开了这个解决方案。

在打开项目的属性，如下图配置，确定。
![](/content/images/2016/08/KY-XVA--JG3KBY-OH40BC-4.png)
- 点击调试,出现node的命令行。这里调用方法，vs中打断点就能断点调试了。
![](/content/images/2016/08/PFXE9F-7KSN-W-U-L6HE2-Q.png)
