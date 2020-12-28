---
title: nodejs多进程
slug: nodejsduo-jin-cheng
date_published: 2016-08-23T08:57:02.000Z
date_updated: 2016-08-23T08:57:02.000Z
---

node.js是单线程,异步架构，无法却利用多个核心。当然也有通过tagg，可以实现多线程。不过我还是觉得多进程+异步更好用，更简单地实现多核心编程。

> 子进程 child_process模块

这个可以创建子线程

- spawn函数用给定的命令发布一个子进程，只能运行指定的程序，参数需要在列表中给出,如下:

    var child_process = require('child_process');
    var child = child_process.spawn( command );
    child.stdout.on('data', function(data) {
    console.log(data);
    });
    

- exec也是一个创建子进程的函数，与spawn函数不同它可以直接接受一个回调函数作为参数，回调函数有三个参数，分别是err, stdout , stderr，基本使用方法如下：

    var child_process = require('child_process');
    child_process.exec( command , function(err, stdout , stderr ) {
    console.log( stdout );
    });
    

- execFileexecFile函数与exec函数类似，但execFile函数更显得精简，因为它可以直接执行所指定的文件，基本使用方法如下：

    var child_process = require('child_process');
    child_process.execFile( file , function(err, stdout , stderr ) {
    console.log( stdout );
    });
    

- forkfork函数可直接运行Node.js模块，所以我们可以直接通过指定模块路径而直接进行操作。使用方法如下:

    var child_process = require('child_process');
    child_process.fork( modulePath );
    

该方法实现ChildProcess实例所具有的所有方法，最主要的是他可以在进程间通信。

> cluster

cluster是Nodejs自带的多核处理模块。封装的child_process.fork方法。

官方[api](https://nodejs.org/api/cluster.html#cluster_cluster)

    const cluster = require('cluster');
    const http = require('http');
    const numCPUs = require('os').cpus().length;
    
    if (cluster.isMaster) {
      // Fork workers.
      for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      // Workers can share any TCP connection
      // In this case it is an HTTP server
      http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
      }).listen(8000);
    }
    //输出
    $ NODE_DEBUG=cluster node server.js
    23521,Master Worker 23524 online
    23521,Master Worker 23526 online
    23521,Master Worker 23523 online
    23521,Master Worker 23528 online
    
