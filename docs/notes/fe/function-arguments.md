---
title: Function中的arguments对象
---

> **MDN**：arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。arguments对象不是一个 Array 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。

## 分析

从[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)的介绍中，`arguments`对象描述有以下关键词：

1. **非箭头函数**中的局部变量；
2. **引用**函数的参数；
3. 是**类数组**对象；

下面一一来确认及展开。

### 非箭头函数局部变量

ES6箭头函数内部没有`arguments`局部变量。

![箭头函数arguments](https://gitlab.com/imgrs/pic/uploads/8829907bf9a20d868e514729e6c7d7a8/ridfx2w.png)

ES6箭头函数最为熟知的属性之一是它没有自己的`this`，在它内部访问`this`时，访问的是上层作用域的`this`，这里的`arguments`变量也是。

![箭头函数arguments来源](https://gitlab.com/imgrs/pic/uploads/833d043723ef2b31c2055a1d921cc1ea/khwggq2.png)

### 引用函数的参数

如果函数参数是引用类型参数，在使用`arguments`变量时要小心。

![引用类型参数](https://gitlab.com/imgrs/pic/uploads/41f11ddc6e7e8a78c0b4f0fd6e957f41/l09miou.png)

### 类数组对象

虽然`arguments`元素访问的方式是按下标进行获取的，但这不能说明他就是一个数组，他的结构是这样的：

```js
(function ('args1', [200], {name: 'params'}) {})()
/** arguments是这样一个对象 */
{
  0: 'args1',
  1: [200],
  2: {name: 'params'},
  length: 3,
  callee,
  [Symbol.iterator],
}
```
`arguments`对象的属性由：
- 参数索引: 参数值
- length：参数个数
- callee：当前函数的引用
- [Symbol.iterator]：参数元素迭代器

它虽然可以按下标去获取数据，但是它的类型是个对象，所以不可使用数组方法。

```js
console.log(arguments[0]) // 'args1'
console.log(arguments[1]) // [200]

arguments.pop() // Uncaught TypeError: arguments.pop is not a function

// 由于 arguments 对象上有迭代器属性，所以其可以使用for循环
for (const key of arguments) {
  console.log(key)
}
```

类数组对象可转换成真正的数组：

```js
Array.prototype.slice.call(arguments) // ['args1', [200], {name: 'params'}]
// 或ES6数组方法
Array.from(arguments) // ['args1', [200], {name: 'params'}]
```

## 

综上，`arguments`对象的特性了解记录。
