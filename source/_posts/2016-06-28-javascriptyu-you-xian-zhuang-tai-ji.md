---
title: JavaScript与有限状态机
slug: javascriptyu-you-xian-zhuang-tai-ji
date_published: 2016-06-28T09:24:03.000Z
date_updated: 2017-01-17T06:23:22.000Z
---

简单介绍一个有限状态机的函数库[Javascript Finite State Machine](https://github.com/jakesgordon/javascript-state-machine)。

> 生成实例

`var fsm = StateMachine.create();`

> 创建

    var state = StateMachine.create({  
        initial: 'null', //初始状态
        events: [
            { name: 'to_scene',  from: 'null',  to: 'scene' },
            { name: 'to_scene2', from: 'scene', to: 'scene2'},
    
        ],
        callbacks: {
            onto_scene:  function(event, from, to, msg) { console.log('to_scene ' + msg);               },
            onto_scene2:  function(event, from, to, msg) { console.log('to_scene2 ' + msg);            },
            onnull:  function(event, from, to, msg)      { console.log(to)    },
            onscene:    function(event, from, to)      { console.log(to)     },
            onscene2:    function(event, from, to)      { console.log(to)     },
        }
    });
    
    export default state  
    

> 触发

    state.to_scene(1)  
    state.to_scene2(2)  
    

> 触发

![](/images/2016/06/038EBQON--2FIS2M2-J---H.png)

注意，onscene在onto_scene前面执行的。

> 其他API

- fsm.current ：返回当前状态。
- fsm.is(s) ：返回一个布尔值，表示状态s是否为当前状态。
- fsm.can(e) ：返回一个布尔值，表示事件e是否能在当前状态触发。
- fsm.cannot(e) ：返回一个布尔值，表示事件e是否不能在当前状态触发。
