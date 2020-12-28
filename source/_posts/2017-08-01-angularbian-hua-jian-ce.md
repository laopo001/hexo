---
title: angular变化检测
slug: angularbian-hua-jian-ce
date: 2017-08-01T07:13:48.000Z
date_updated: 2017-08-04T09:10:32.000Z
---

# angular变化检测

## ChangeDetectionStrategy

[源码](https://github.com/angular/angular/blob/master/packages/core/src/change_detection/constants.ts)  描述使用哪种变化检测器。

- OnPush = 0   `OnPush` 检测一次`CheckOnce`(只有当@Input改变了，才进行变化检测并render。)
- Default = 1  `Default` 总是检测`CheckAlways  `

## ChangeDetectorStatus

[源码](https://github.com/angular/angular/blob/master/packages/core/src/change_detection/constants.ts)  描述监测器的状态

- CheckOnce = 0  意味着在执行变化检测后，状态将变成 `Checked`。
- Checked = 1  该状态下，变化检测总是跳过，除非它的状态变成`CheckOnce`。
- CheckAlways = 2  总是执行变化检测，执行后状态还是`CheckAlways  `。
- Detached = 3  表示检测器子树不是主树的一部分，应该跳过。应该是调用ChangeDetectorRef.detach。
- Errored = 4  意味着变化检测器遇到了一个错误，状态将变成`Errored`。此状态中的更改检测器将不再检测更改。
- Destroyed = 5  意味着变化检测器已经销毁。

## NgZone

api:[NgZone](https://angular.io/api/core/NgZone)

ngZone包装了大量的事件和异步函数，下面的函数执行完成，会自动告诉Angular去执行变化监测。当发生变化时则重新渲染。

NgZone有3个方法`runOutsideAngular``runGuarded``run`类型都是(fn: () => any): any;。

1. `runOutsideAngular`就是在fn中执行上面的方法，不会通知angular进行变化检测。
2. `runGuarded``run`差不多，fn执行后进行变化检测。`run`会重复抛出错误且不会上报onError。`runGuarded`则相反。`runGuarded`应该更安全一点。

## ChangeDetectorRef

api:[ChangeDetectorRef](https://angular.io/api/core/ChangeDetectorRef#detectChanges)

    class ChangeDetectorRef {
      markForCheck(): void
      detach(): void
      detectChanges(): void
      checkNoChanges(): void
      reattach(): void
    }
    

- markForCheck() - 从自己到根组件检测器为OnPush的组件， 设置状态为`CheckOnce`。
- detach() - 从变化检测树中分离，该组件将不再执行变化检测，除非手动调用 reattach() 方法。
- reattach() - 重新添加已分离的变化检测器。
- detectChanges() - 从该组件到各个子组件执行一次变化检测，一般是配合detach使用，会触发 `ApplicationRef.tick()`方法
- checkNoChanges() - 从该组件到各个子组件执行一次变化检测，若发生改变则抛出检测，一般用于debug。
