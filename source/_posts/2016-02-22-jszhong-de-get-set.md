---
title: js中的get;set;
slug: jszhong-de-get-set
date_published: 2016-02-22T05:39:36.000Z
date_updated: 2017-01-17T07:03:31.000Z
---

ES5之前：

    var pp = {  
            _name : "jeapedu",
            set name(v){
                    this._name = v;
            },
            get name(){
                    return this._name;
            }
    }
    pp.name = "China";  
    console.log(pp.name);  
    /////////////////////////////////或
    Object.prototype.__defineGetter__.call(obj, propName, getter);  
    Object.prototype.__defineSetter__.call(obj, propName, setter);  
    这样写也行
    pp.__defineGetter__('name', function(){return this._name});  
    pp.__defineSetter__('name', function(x){this._name=x});
    
    

ES5:

        Object.defineProperty( obj, "value", {
            // value: true,
            // writable: false,
            enumerable: true,
            configurable: true,
            get: function() {
                return value;
            },
            set: function(v) {
                value = v;
            }
        });
    

- configurable：默认false，表示此属性是否可用delete删除
- enumerable: 默认为false，表示此属性是否可被for...in、Object.keys遍历到
- value：默认undefined，此属性的值，可以是任何JavaScript类型
- writable：默认为false，此属性是否可被改写(为false时，不能和set在一起,有set时，默认为true。)
- get：默认undefined，指定一个函数，当属性被调用时，此函数也被调用，默认为返回属性值
- set：默认undefined，指定一个函数，当属性被赋值时，此函数也被调用，仅接受一个参数，参数为属性被赋的值
