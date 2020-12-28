---
title: es6 装饰器-权限管理
slug: es6-zhuang-shi-qi-quan-xian-guan-li
date_published: 2016-07-20T10:08:36.000Z
date_updated: 2017-01-17T06:28:03.000Z
---

    var reduxStore={roles:['read']}  //redux-store存储用户的权限列表
    
    function log(target, name, descriptor) {  
      var oldValue = descriptor.value;
      descriptor.value = function() {
        console.log(`"Call ${name}" arguments`, arguments);
        return oldValue.apply(null, arguments);
      };
      return descriptor;
    }
    
    function checkRole(role){  //检查权限  
        return (target, property, descriptor)=>{
            if(reduxStore.roles.indexOf(role)==-1){
                descriptor.value=function(){
                    console.log('没有权限')
                };  //如果没有权限，改变方法。
            }
            return descriptor
        }
    }
    class Components{}
    
    class AComponents extends Components{  
      constructor(){
        super()
      }
      @log
      log(arg){
        console.log('我执行有log记录的')
      }
    
      @checkRole('read')  //需要read权限才执行read()
      read(){
       console.log('read')
      }
    
      @checkRole('write')  //需要write权限才执行read()
      write(){
       console.log('write')
      }
      render(){}
    }
    var a = new AComponents();  
    a.read();  
    a.write();  
    a.log('arg')  
    

上面的是一个模拟react的组件。并加入权限控制。在[babel](http://babeljs.cn/repl/)测试通过
