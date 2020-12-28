---
title: angular变化检测实现原理
slug: angularbian-hua-jian-ce-shi-xian-yuan-li
date: 2017-08-04T09:11:18.000Z
date_updated: 2017-08-04T09:11:18.000Z
---

# angular变化检测实现原理

## ViewFlags

ViewFlags视图更新方式与ChangeDetectionStrategy对应

    export const enum ViewFlags {
      None = 0,
      OnPush = 1 << 1,
    }
    

## ViewState

ViewState视图状态与ChangeDetectorStatus对应。使用位码做状态，好处是可以同一时间处于多个状态。

    export const enum ViewState {
      BeforeFirstCheck = 1 << 0,
      FirstCheck = 1 << 1,
      Attached = 1 << 2,
      ChecksEnabled = 1 << 3,
      IsProjectedView = 1 << 4,
      CheckProjectedView = 1 << 5,
      CheckProjectedViews = 1 << 6,
      Destroyed = 1 << 7,
    
      CatDetectChanges = Attached | ChecksEnabled,  //处于Attached（已添加）和ChecksEnabled（开启更新）都是true
      CatInit = BeforeFirstCheck | CatDetectChanges  //这个状态还加上了在第一检测之前的状态。
    }
    

## checkAndUpdateView

视图的变化检测与更新，这是检查模板上面绑定的新数据和以前的对比。若变化则更新。当视图是OnPush时，去掉ChecksEnabled状态。

    function callViewAction(view: ViewData, action: ViewAction) {
      const viewState = view.state;
      switch (action) {
    	...
        case ViewAction.CheckAndUpdate:
          if ((viewState & ViewState.Destroyed) === 0) {//组件不能处于Destroyed状态
            if ((viewState & ViewState.CatDetectChanges) === ViewState.CatDetectChanges) {//组件必须处于CatDetectChanges状态
              checkAndUpdateView(view);  //执行变化检测
            } else if (viewState & ViewState.CheckProjectedViews) {
              execProjectedViewsAction(view, ViewAction.CheckAndUpdateProjectedViews);
            }
          }
          break;
    	...
    
      }
    }
    
    export function checkAndUpdateView(view: ViewData) {
      if (view.state & ViewState.BeforeFirstCheck) {
        view.state &= ~ViewState.BeforeFirstCheck;
        view.state |= ViewState.FirstCheck;
      } else {
        view.state &= ~ViewState.FirstCheck;
      }
      markProjectedViewsForCheck(view);
      Services.updateDirectives(view, CheckType.CheckAndUpdate);
      execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
      execQueriesAction(
          view, NodeFlags.TypeContentQuery, NodeFlags.DynamicQuery, CheckType.CheckAndUpdate);
    
      callLifecycleHooksChildrenFirst(
          view, NodeFlags.AfterContentChecked |
              (view.state & ViewState.FirstCheck ? NodeFlags.AfterContentInit : 0));
    
      Services.updateRenderer(view, CheckType.CheckAndUpdate);
    
      execComponentViewsAction(view, ViewAction.CheckAndUpdate);
      execQueriesAction(
          view, NodeFlags.TypeViewQuery, NodeFlags.DynamicQuery, CheckType.CheckAndUpdate);
      callLifecycleHooksChildrenFirst(
          view, NodeFlags.AfterViewChecked |
              (view.state & ViewState.FirstCheck ? NodeFlags.AfterViewInit : 0));
    
      if (view.def.flags & ViewFlags.OnPush) {
        view.state &= ~ViewState.ChecksEnabled;  //当视图是OnPush时，去掉ChecksEnabled状态。
      }
      view.state &= ~(ViewState.CheckProjectedViews | ViewState.CheckProjectedView);
    }
    

## ViewRef

1. 
markForCheck(): void//从当前组件开始向上,当视图是OnPush时，添加ChecksEnabled状态,在进行一次变化检测后，会去掉ChecksEnabled状态。

    markForCheck(): void { markParentViewsForCheck(this._view); }
    export function markParentViewsForCheck(view: ViewData) {
      let currView: ViewData|null = view;
      while (currView) {
        if (currView.def.flags & ViewFlags.OnPush) {
          currView.state |= ViewState.ChecksEnabled;  //当视图是OnPush时，添加ChecksEnabled状态。
        }
        currView = currView.viewContainerParent || currView.parent;  //从当前组件开始向上。
      }
    }
    

2. 
​ detach(): void

    detach(): void { this._view.state &= ~ViewState.Attached; }  //去掉Attached状态
    

3. 
detectChanges(): void

      detectChanges(): void {
        const fs = this._view.root.rendererFactory;
        if (fs.begin) {
          fs.begin();
        }
        Services.checkAndUpdateView(this._view); //执行checkAndUpdateView函数
        if (fs.end) {
          fs.end();
        }
      }
    

1. 
​ detach(): void

    reattach(): void { this._view.state |= ViewState.Attached; } //添加Attached状态
    

## ApplicationRef

ApplicationRef是根组件。订阅了zone通知，对自己和子节点进行变化检测，调用view.detectChanges()。

    export class ApplicationRef_ extends ApplicationRef{
        constructor(private _zone: NgZone, private _console: Console, private _injector: Injector,
          private _exceptionHandler: ErrorHandler,
          private _componentFactoryResolver: ComponentFactoryResolver,
          private _initStatus: ApplicationInitStatus) {
          ...
          this._zone.onMicrotaskEmpty.subscribe(
              {next: () => { this._zone.run(() => { this.tick(); }); }});//订阅zone的通知，然后执行tick变化检测的函数。
          ...
        }
        tick(): void {
          if (this._runningTick) {
            throw new Error('ApplicationRef.tick is called recursively');
          }
    
          const scope = ApplicationRef_._tickScope();
          try {
            this._runningTick = true;
            this._views.forEach((view) => view.detectChanges());//对自己和子节点进行变化检测。
            if (this._enforceNoNewChanges) {
              this._views.forEach((view) => view.checkNoChanges());
            }
          } catch (e) {
            // Attention: Don't rethrow as it could cancel subscriptions to Observables!
            this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
          } finally {
            this._runningTick = false;
            wtfLeave(scope);
          }
      }
    }
    

## 触发事件

组件即使在ChangeDetectionStrategy.OnPush的模式下，在自己范围内触发事件也可以触发一次变化检测。

    export function dispatchEvent(
        view: ViewData, nodeIndex: number, eventName: string, event: any): boolean|undefined {
      try {
        const nodeDef = view.def.nodes[nodeIndex];
        const startView = nodeDef.flags & NodeFlags.ComponentView ?
            asElementData(view, nodeIndex).componentView :
            view;
        markParentViewsForCheck(startView);   //就是执行了markForCheck()。这样可以执行一次变化检测了。
        return Services.handleEvent(view, nodeIndex, eventName, event);
      } catch (e) {
        // Attention: Don't rethrow, as it would cancel Observable subscriptions!
        view.root.errorHandler.handleError(e);
      }
    }
    
