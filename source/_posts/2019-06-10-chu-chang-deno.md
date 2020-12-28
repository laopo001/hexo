---
title: deno wsl下从源码安装
slug: chu-chang-deno
date: 2019-06-10T09:55:19.000Z
date_updated: 2019-06-10T09:58:00.000Z
---

deno从源码安装。[官方安装文档](https://deno.land/manual.html#buildfromsource)。推荐使用linux或wsl环境。

> fetch FAIL之类的错误，墙的问题。v8的依赖拉不下来。不过可以使用代理。

在用户目录创建一个.boto文件。然后用export NO_AUTH_BOTO_CONFIG="~/.boto"，脚本会读取这个`NO_AUTH_BOTO_CONFIG`的环境变量的配置。

    [Boto]
    proxy=127.0.0.1
    proxy_port=8123
    

注意：这里8123端口的代理要用http代理。不能用sock5。所以，要用[polipo](https://my.oschina.net/u/1249401/blog/1841607)，这是一个命令行代理工具。安装一下。

> [sccache](https://github.com/mozilla/sccache#installation)安装

这个又依赖`openssl`，又要安装`sudo apt-get install pkg-config libssl-dev`。

这样前置操作搞完后，应该可以。

还有一个坑是，vscode-remote 开发使用的时候。项目下的文件夹不能执行 mv copy 操作。会阻止构建。关闭vscode就行。
