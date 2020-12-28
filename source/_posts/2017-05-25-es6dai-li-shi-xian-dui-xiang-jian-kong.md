---
title: ES6代理实现对象监控
slug: es6dai-li-shi-xian-dui-xiang-jian-kong
date: 2017-05-25T11:19:35.000Z
date_updated: 2017-05-25T11:19:35.000Z
---

以前写过一个es6代理的博客，但是只简单讲了。可以当对象监控使用。但是在下面这样的情况，就无效了

比如一个对象obj={name:{first:'小',last:'明'}},把obj设置set代理，假如我这样obj.name.last='红'，并不会触发set。这样不是我们要结果，当我们改变obj时，我可以知道对象改变了。下面利用闭包保存变量实现。

> 实现

            function runProxy(state,key='this') {
                if (typeof state != 'object'||state==null) {
                    return state
                }
                let prototype={}
                for (let x in state) {
                        prototype[x]=runProxy(state[x],key+'.'+x);
                }
                return new Proxy(state, {
                    set(target, property, value, receiver) {
                        let  oldValue=target[property]
                        let  newValue=value
                        console.log("change property:%s --- %coldValue:%o ---%c> newValue:%o",key+'.'+property.toString(),"color:red",oldValue,"color:green",newValue)
                        prototype[property]=runProxy(value,key+'.'+property.toString());
                        return Reflect.set(target, property, value);
                    },
                    get(target, property){
                        return Reflect.get(prototype, property);
                    }
                })
            }
    

运行如下代码, 如图。在ngDva中把state监控。触发一个action，改变了state中什么属性，全部打印到控制台了。

            obj={name:{first:'小',last:'明'}}
            let Pobj=runProxy(obj)
            Pobj.name.first='刘'
            Pobj.name.last='红'
            Pobj.name.first={};
            Pobj.name.first.hhh='大地瓜'
            Pobj.name.first=[];
            Pobj.name.first[1]='大地瓜'
    

![](/source/images/2017/05/QQ--20170523193406.png)

最近发现上面的方法还是有bug，如下代码，obj.name最后变成了代理对象。

            obj={name:{first:'小',last:'明'}}
            let Pobj=runProxy(obj)
            Pobj.name.first='刘'
            Pobj.name.last='红'
            Pobj.name.first={};
            Pobj.name=Pobj.name.first
    

最终版:

            function runProxy(state, key = 'this', callback=()=>{}) {
                if (typeof state != 'object' || state == null || Array.isArray(state)) {
                    return state
                }
                let prototype = {}
                prototype['getgetgetgetgetgetgetgetgetgetgetget'] = function () {
                    return state;
                }
                for (let x in state) {
    
                    prototype[x] = runProxy(state[x], key + '.' + x, callback);
    
                }
                let p = new Proxy(state, {
                    set(target, property, value, receiver) {
    
                        let oldValue = target[property]
    
    
                        let newValue = value;
    
                        try {
                            if (typeof newValue['getgetgetgetgetgetgetgetgetgetgetget'] == "function") {
                                newValue = newValue['getgetgetgetgetgetgetgetgetgetgetget']();
                            }
    
                        } catch (e) {
                            console.log(e)
                        }
    
                        callback(key + '.' + property.toString(), oldValue, newValue)
                        // console.log("change property:%s --- %coldValue:%o ---%c> newValue:%o", key + '.' + property.toString(), "color:red", oldValue, "color:green", newValue)
    
                        prototype[property] = runProxy(value, key + '.' + property.toString(), callback);
    
                        return Reflect.set(target, property, newValue);
                    },
                    get(target, property) {
                        return Reflect.get(prototype, property);
                    }
                })
    
                return p;
            }
    
