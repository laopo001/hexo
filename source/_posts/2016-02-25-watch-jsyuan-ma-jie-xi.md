---
title: Watch.js源码解析
slug: watch-jsyuan-ma-jie-xi
date_published: 2016-02-25T09:31:30.000Z
date_updated: 2017-01-17T06:59:42.000Z
---

一个简化的watch.js代码。

        var a={name:'ad',age:18};
        var stu={stuName:a};
    
    
    
        function Watch(x,prop,callback){
            Array.prototype.indexOf = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) {
                    return i;
                }
            }
            return -1;
        };
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    
            function removeFrom(x,arr){
                for(var j in arr){
                    if(arr[j]==x){
                        arr.splice(j, 1);
                    }
                }
            }
            var value=x[prop];
            if(x.watchers==null){
                x.watchers={};
            }
    
            if(x.watchers[prop]==null){
                x.watchers[prop]=[];
            }
            x.watchers[prop].push(callback)
            if(value instanceof  Object){
                for(var i in value){
                    if(i!='watchers'){
                        Watch(value,i,callback);
                    }
                }
            }
    
            Object.defineProperty( x, prop, {
                enumerable: true,
                configurable: true,
                get: function() {
                    return value;
                },
                set: function(v){setter(v)}
            });
            x.__defineGetter__(prop, function() {
                return value;
            })
            x.__defineSetter__(prop,function(v){setter(v)})
            var setter=function(v){
    
                    if(value instanceof  Object){
                        for(var j in value['watchers']) {
                            //    value['watchers'][j].remove(callback)
                            removeFrom(callback,value['watchers'][j]);
                        }
                    }
                    for(var i in x.watchers[prop]){
                        x.watchers[prop][i](v,value);
                    }
                    value = v;
                    if(v instanceof  Object){
                        for(var j in v) {
                            Watch(v,j,callback);
                        }
                    }
                    //    callback(v);
                    //     callbacks.push(callback(v));
                }
    
        }
    
    
        Watch(a,'name',function(newValue){alert("a我被改变了"+newValue )});
        Watch(stu,'stuName',function(newValue,oldValue){alert("stu我被改变了"+newValue+","+ oldValue)});
    
        a.name='ap';
    
    
