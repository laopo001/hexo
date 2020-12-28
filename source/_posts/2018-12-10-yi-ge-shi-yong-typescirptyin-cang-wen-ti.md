---
title: 一个使用js/typescirpt隐藏问题。
slug: yi-ge-shi-yong-typescirptyin-cang-wen-ti
date: 2018-12-10T09:50:57.000Z
date_updated: 2019-03-26T09:54:54.000Z
---

下面这段代码，看似没什么问题。但是会报错，如下`Uncaught TypeError: Cannot read property 'a' of undefined`,这里会执行两次speak函数。第一次执行的时候，在Animal的构造函数，`this.speak()`，执行的却是Snake中的speak()。但是abc这是还没有初始化。

    class Animal {
        constructor(public name: string) {
            this.speak();
        }
        speak() {
            
        }
    }
    class Snake extends Animal {
        abc={ 
            a:123
        }
        constructor(name: string) {
            super(name);
            this.speak();
        }
        speak() {
            console.log(this.abc.a);
        }
    }
    let sam = new Snake("Sammy the Python");
    
