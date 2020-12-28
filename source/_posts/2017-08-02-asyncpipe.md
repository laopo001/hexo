---
title: AsyncPipe源码分析
slug: asyncpipe
date: 2017-08-02T11:13:00.000Z
date_updated: 2017-08-02T11:15:56.000Z
---

### AsyncPipe

在严格要求性能的环境下，使用ngZone更新视图，是不行的。这时我们可以使用 Observables 机制提升性能。先把组件设置` {changeDetection:ChangeDetectionStrategy.OnPush}` 这时不会触发ngZone来进行脏检查，这时我们可以通过AsyncPipe管道订阅 Observables 对象，在变化发生之后，进行视图更新。

源码链接[angular/AsyncPipe](https://github.com/angular/angular/blob/master/packages/common/src/pipes/async_pipe.ts)

### 用法

- AsyncPipe不仅仅支持Observable，还支持Promise。对于Observable，只要subscribe属性是一个function类型，和参数是一个对象有next属性就行。不一定要rx的Observable。可以自己实现一个迷你的Observable。

### 原理

     constructor(private _ref: ChangeDetectorRef) {}
     private _updateLatestValue(async: any, value: Object): void {
        if (async === this._obj) {
          this._latestValue = value;
          this._ref.markForCheck();
        }
      }//当接收数据的时候，利用this._ref.markForCheck();更新组件
      ngOnDestroy(): void {
        if (this._subscription) {
          this._dispose();//当组件销毁的时候，Observable会自动注销监听
        }
      }
    
