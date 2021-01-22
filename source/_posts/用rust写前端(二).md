---
title: 用rust写前端(二)
date: 2021-01-22 15:56:24
tags:
---

rust 过程宏使用



> 设计

html虚拟节点的枚举类型

```
pub enum HtmlVNode {
    Element(Box<HtmlElement>),  // <div>1</div>
    HtmlString(Box<HtmlString>), // "asdf"
    Block(Box<HtmlBlock>), // {} 作用域
    Empty,  // 空
}
pub struct HtmlElement {
    name: String,
    props: ElementProps,
    children: HtmlElementChildren,
}
pub struct HtmlElementChildren(Vec<HtmlVNode>);
```


> 

```
let a = react!(<div>asf</div>);
dbg!(react!(<div>123<div>qwr{ "asdf" }{{a}}</div></div>));
```
=> 
```
Node(
    VNode {
        name: "div",
        children: [
            Text(
                "123",
            ),
            Node(
                VNode {
                    name: "div",
                    children: [
                        Text(
                            "qwr",
                        ),
                        Text(
                            "asdf",
                        ),
                        Node(
                            VNode {
                                name: "div",
                                children: [
                                    Text(
                                        "asf",
                                    ),
                                ],
                            },
                        ),
                    ],
                },
            ),
        ],
    },
)
```