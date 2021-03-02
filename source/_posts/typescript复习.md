---
title: ts复习
date: 2021-02-28
---

### typescript基础类型

Boolean | Number | String | Array | Tuple | Enum | Unknown | Any | Void | Null | Undefined | Never | Object

### Interfaces

```
interface Point {
  readonly id: number;
  readonly name?: string;
}
let p1: Point = { x: 10, y: undefined };
p1.x = 5; // error!
Cannot assign to 'x' because it is a read-only property.
```

### ClassName
```
class Point {
  readonly id: number;
  readonly name?: string;
  constructor(name: string, id: number)
  constructor(name: string)
  constructor(name?: any, id?: any) {
    if (id == null) {
      this.id = Math.random();
    } else {
      this.id = id;
    }
    this.name = name;
  }
}

let a = new Point("world");
let b = new Point("world", Math.random());
```

### 泛型 Generics
泛型是编程语言中可以大量减少代码的手段

```
interface HttpResponseA {
  data: {
    name: string;
  };
  code: number;
}
interface HttpResponseB {
  data: {
    age: number;
  };
  code: number;
}
```
优化
```
interface HttpResponse<T> {
  data: T;
  code: number;
}
type ResponseA = HttpResponse<{name: string}>;
type ResponseN = HttpResponse<{age: number}>;
```
类也可以加入泛型

### 联合类型 Union Types

```
type ENV = "production" | "development";
function run(e: ENV) {}
```

### 关键字


* typeof，typeof 操作符可以用来获取一个变量或对象的类型。
```
let x = {name : 1};
type X = typeof x; // X = {name : string}
```
* keyof, keyof 操作符提取其属性的名称
```
type X = { name: string, age: number };
type Y = keyof X; // Y = "name" | "age"
```

* extends + infer, **T extends U ? X : Y**  跟 JS 中的条件表达式一样，如果extends语句为真，则取X类型 ，反之得到Y类型 。我们这里把X称为条件类型的真分支，Y 称为假分支。表示在 extends 条件语句中待推断的类型变量。
```
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;

type Func = () => User;
type Test = ReturnType<Func>; // Test = User
```

### 类型推导

* 1.定义一个输入和输出一样的函数

```
declare const format: <T>(a: T) => T;
```
* 2.取出Promise返回的值

```
declare const getPromse: <T>(p: Promise<T>) => T;
```
* 3.定义一个函数，入参仅仅Promise<number|string> 返回值也是 对应的类型

```
// 一般写法
declare const getPromse: (p: Promise<number|string>) => number|string;

// 正确写法
declare const getPromse: <T extends string | number>(p: Promise<T>) => T;
```
* 4.取出函数第一个参数的类型
```
type Func = (a: number, ...args: any[]) => void
type GetFirstArgument<T extends (...args: any[]) => any> = T extends (a: infer P, ...args: any[]) => any ? P : any;
type FirstArgument = GetFirstArgument<Func>;
```
* 5.把一个类型全部属性变只读
```
export type ReadonlyObject<T> = { readonly [K in keyof T]: T[K] };
type A = { name: string };
let a = { name: "123" } as A;
a.name = "345";
let b: ReadonlyObject<A> = a as ReadonlyObject<A>;
b.name = "123"; //error
```
* 6.根据第一参数，限制第二个参数类型
```
function test<T>(value: T, padding: T extends string ? number : never) {}
test("Hello world", 1);

interface Obj {
  a: {
    q: number,
  };
  b: {
    w: number,
  }
}
function test2<T extends keyof Obj>(value: T, padding: Obj[T]) { }
test2('a', { q: 1 });
```
* 定义一个不可变的对象，和深度不可变的对象

```
type Primitive = undefined | null | boolean | string | number | Function;
export type Immutable<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<U>
  : /* T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : // es2015+ only */
  ReadonlyObject<T>;


export type DeepImmutable<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? DeepImmutableArray<U>
  : /* T extends Map<infer K, infer V> ? DeepImmutableMap<K, V> : // es2015+ only */
  DeepImmutableObject<T>;


interface DeepImmutableArray<T> extends ReadonlyArray<DeepImmutable<T>> { }

type DeepImmutableObject<T> = { readonly [K in keyof T]: DeepImmutable<T[K]> };

export type ReadonlyObject<T> = { readonly [K in keyof T]: T[K] };
```




