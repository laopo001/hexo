---
title: angular/cdk/portal实现
slug: angular-cdk-portal
date_published: 2017-09-21T11:43:03.000Z
date_updated: 2017-09-21T11:43:03.000Z
---

#### Portal和PortalHost

这些是angular封装好的动态渲染的工具。PortalHost可以看成一个容器，Portal是需要动态渲染的`（如模板或组件）`。PortalHost和Portal是一对一关系，每个PortalHost只能插入一个Portal。

PortalHost

- `attach(portal: Portal<any>)`  PortalHost绑定Portal
- `detach(): void` 取消绑定
- `dispose(): void` 销毁
- `hasAttached(): boolean` 是否已经绑定

Portal有个两个实现TemplatePortal和ComponentPortal

- `attach(PortalHost): Promise<T>` 绑定
- `detach(): Promise<void>` 取消绑定
- `isAttached: boolean` 是否已经绑定

#### 实现

portal最终都是通过viewContainerRef的createComponent和createEmbeddedView动态创建的。

- createEmbeddedView类型如下，必须的参数只有一个TemplateRef,返回值是ViewRef类型,要使它立即显示执行`ViewRef.detectChanges()`,使用后要记得执行`viewContainer.remove(viewContainer.indexOf(viewRef));`销毁。

    createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
    

- createComponent类型如下，必须的参数只有一个ComponentFactory。返回值是componentRef，不使用了要记得执行`componentRef.destroy()`销毁。

index是插入的位置，injector是注入器，projectableNodes要是插入到组件中viewRef的rootNodes节点。

    createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;
    
