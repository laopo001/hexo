---
title: Web Notification+Web socket+express实践
slug: web-notification-web-socket-expressshi-jian
date: 2017-02-24T10:59:14.000Z
date_updated: 2017-02-24T11:05:57.000Z
---

> socket.io

在express4+中，使用socket.io库

    //app.js
    var io = require('socket.io')();
    var allSocket={};
    var receive = require('./routes/receive')(io,allSocket); //利用高阶函数，向router中传递socket
    app.io = io;
    io.on('connection', function (socket) {
        console.log('socket连接成功');
        socket.on('join', function(data) {
            console.log(data.userName+'  join');
            allSocket[data.userName]=socket; //利用用户名做唯一标识，做私信时使用
        });
        socket.on('disconnect', function() {
            console.log('断开连接');
        });
    });
    
    

    // bin/www加上
    app.io.attach(server)
    

    // routes/receive.js
    module.exports=function(io,allSocket){
        router.post('/login', function (req, res) {
        req.models.users.find({ userName: req.body.userName }, function (err, rows) {
            if (rows.length > 0 && rows[0].password == req.body.password) {
                io.sockets.emit('receive', {});
            }
        });
    });
    
        return router;
    }
    
    

> 浏览器端实现

    Notification.requestPermission( function(status) {}); //请求权限
    
    
    //socket.io-client.js
    function RunSocket(data) {
      var socket = io('/');
      socket.on('connect', function () {
        console.log('connect');
        socket.emit("join", { userName: data.data.userName })
      });
      socket.on('receive', function (data) {
        console.log('receive')
        var n = new Notification(data.userName + "---通知来了", { body: data.xssProjectName + "---项目更新了" ,icon:"img/message.jpg"});
      });
      socket.on('disconnect', function () { console.log('disconnect') });
    }
    

> 效果如下
> ![](/source/images/2017/02/QQ--20170224190449.png)
