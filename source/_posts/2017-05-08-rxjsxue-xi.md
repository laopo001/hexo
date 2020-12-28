---
title: Rxjs学习
slug: rxjsxue-xi
date: 2017-05-08T14:28:58.000Z
date_updated: 2017-05-08T14:28:58.000Z
---

我们在用canvas画图的时候。一般实现

    var isDown=false;
    dom.addEventListen('mousedown',function(){
         isDown=true;
    },false)
    dom.addEventListen('mouseup',function(){
         isDown=false;
    },false)
    dom.addEventListen('mousemove',function(){
         if(isDown){
         //xxxxxx
         }
    },false)
    

最近发现一个Rxjs的库。实现很巧妙。

    		const down$ = Rx.Observable.fromEvent(dom , 'mousedown').map(()=>'down')
    		const up$ = Rx.Observable.fromEvent(dom, 'mouseup').map(() => 'up')
    		var move$ = Rx.Observable.fromEvent(dom, 'mousemove')
    
    		const upAndDown$ = up$.merge(down$)
    		upAndDown$.switchMap(action => 
                        action==='down'?move$:Rx.Observable.empty() 
    		).subscribe(value => {
    			console.log(value)
    		})
    

不过我也要mousedown按下的事件，稍微改下代码就行,实现如下：

    	
    		const down$ = Rx.Observable.fromEvent(dom , 'mousedown')
    		const up$ = Rx.Observable.fromEvent(dom , 'mouseup').map(() => 'up')
    		var move$ = Rx.Observable.fromEvent(dom, 'mousemove')
    
    		const upAndDown$ = up$.merge(down$)
    		upAndDown$.switchMap(action => {
    			if (action != 'up') {
    				return move$.startWith(action);
    			} else {return Rx.Observable.empty() }
    		}).subscribe(value => {
    			console.log(value)
    		})
    
