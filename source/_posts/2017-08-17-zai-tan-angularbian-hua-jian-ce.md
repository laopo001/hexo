---
title: 再谈Angular变化检测
slug: zai-tan-angularbian-hua-jian-ce
date: 2017-08-17T07:37:50.000Z
date_updated: 2018-02-09T07:16:28.000Z
---

## 什么是变化检测？

angular，react等前端mvvm框架，都是读取组件内部状态渲染页面。但是，当运行时组件状态变化时，页面已经被渲染了，我们必须弄清每个组件的状态发生了什么变化。访问DOM是很昂贵的，因此，必须找出需要更新的位置，尽可能小的访问。

## 什么是angular变化检测

    @Component({
      template: `
        <h1>{{firstname}} {{lastname}}</h1>
        <button (click)="changeName()">Change name</button>
      `
    })
    class MyApp {
    
      firstname:string = 'Pascal';
      lastname:string = 'Precht';
    
      changeName() {
        this.firstname = 'Brad';
        this.lastname = 'Green';
      }
    }
    

这个组件模板就绑定了两个属性`firstname``lastname`，当这个两个属性没改变时，这里就不需要更新。

## 什么时候进行变化检测

`angular`中包含了一个`zonejs`，zone.js采用猴子补丁（Monkey-patched）的暴力方式将JavaScript中的异步任务都包裹了一层，使得这些异步任务都将运行在zone的上下文中。

- **EVENT** - `click`，`submit`，...
- **XHR** - `AJAX``Fetch`
- **计时器** - `setTimeout()`，`setInterval()`
- **Promise**- `async`

基本上每当执行一些异步操作时，我们的应用程序状态**可能**已经改变。这时需要有人告诉Angular来更新视图。

以下是缩略版本的源码,ApplicationRef就是angular程序的根，它是监听了`NgZone`的`onMicrotaskEmpty`，无论什么异步操作都会通知angular执行变化检测。

    class ApplicationRef {
    
      changeDetectorRefs:ChangeDetectorRef[] = [];
    
      constructor(private zone: NgZone) {
          this._zone.onMicrotaskEmpty.subscribe(
              {next: () => { this._zone.run(() => { this.tick(); }); }});//订阅zone的通知，然后执行tick变化检测的函数。
      }
    
      tick() {
        this.changeDetectorRefs
          .forEach((ref) => ref.detectChanges());
      }
    }
    

## Angular变更检测方式

Angular变更检测是一个单向数据流，总是从根部开始到每个组件。如下面两种图。

![](/source/images/2017/08/QQ--20170817112553.png)j

![](/source/images/2017/08/QQ--20170817130813.png)

## 优化变化检测

Angular变化检测是非常快的。它可以在几毫秒内执行数十万次检查。这主要是由于Angular生成VM友好的代码。但是，它还是可能造成性能问题。比如大量列表，或者在IE浏览器上面，IE的js `runtime`比不上V8的速度的。

### 一.手动变化检测

上面都是Angular自动的。Angular每个组件都可以注入`ChangeDetectorRef`，就能手动变化检测了。首先改变changeDetection设置为`OnPush`

#### OnPush

当组件changeDetection设置为`OnPush`时，Angular变化检测除了在第一次，其他时候将跳过这个组件和子组件（在ng2中有些不同）。除非`@Input()`属性变化了。

    @Component({
      template: `
     <h2>{{vData.name}}</h2>
     <span>{{vData.email}}</span>
      `,
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    class VCardCmp {
      @Input() vData;
    }
    

![](/source/images/2017/08/QQ--20170828151707.png)

#### markForCheck

在父组件或者自己设置`OnPush`后，这时使用`setTimeout`改变绑定数据，发现没有变化。我们需要使用`ChangeDetectorRef`的`markForCheck`，告诉Angular进行**一次**检测。运行一次`markForCheck`只能检测一次。

      constructor(private cdRef: ChangeDetectorRef) {
      }
     click(){
       this.xxxx=123;
       //this.cdRef.markForCheck();这里可以不需要，事件会自动执行markForCheck方法。
       	setTimeout(()=>{
          this.xxxx=456;
          this.cdRef.markForCheck(); //必须在回调函数中再次执行markForCheck。
    	})
     }
    

#### ChangeDetectorRef其他

- **detectChanges** - 从该组件到各个子组件执行一次变化检测。就是Angular程序根部(ApplicationRef)绑定的东西。
- **detach** - 从变化检测树中分离，该组件将不再执行变化检测，除非手动调用 reattach() 方法。
- **reattach** - 重新添加已分离的变化检测器。

### 二.可观察的数据

使用Angular自带的Async管道。AsyncPipe不仅仅支持Observable，还支持Promise。

     constructor(private _ref: ChangeDetectorRef) {}
     private _updateLatestValue(async: any, value: Object): void {
        if (async === this._obj) {
          this._latestValue = value;
          this._ref.markForCheck();//当改变数据的时候，call markForCheck方法;
        }
      }
      ngOnDestroy(): void {
        if (this._subscription) {
          this._dispose();//当组件销毁的时候，Observable会自动注销监听
        }
      }
    

### 三.不可变的数据

[Immutable](https://facebook.github.io/immutable-js/) 主要Angular已经自带Rxjs。Immutable和Rxjs一样都是很大的。一般在Angular中很少使用Immutable。
