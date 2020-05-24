---
title: ES6的Iterator迭代器对象
date: 2019-10-12 10:29:11
comments: true
---

## 前言

在很多语言中都会存在`Iterator`迭代器对象，用来对可迭代变量对元素访问。`JS`在添加这个迭代器对象之前，我们遍历数组是这么干的：

```js
var simpleArr = [1, 2, 3, 4, 5]
for (var index = 0; i < simpleArr.length; i++) {
  console.log('Item is', simpleArr[index])
}
```

写起来比较繁琐，而且不够简洁。由此还引发一个行业级的面试题：

```js
for (var index = 0; i < 10; i++) {
}
console.log(index) // ?
```

扯远了……

那`Iterator`到底是什么？他是怎么运作的？

## 探索

### 是什么？

> 迭代器（Iterator）：它是一种接口，为各种不同的数据结构提供统一的访问机制。**任何数据结构只要部署 Iterator 接口，就可以完成遍历操作**，Iterator 接口主要供for...of消费。 ——[《ECMAScript 6 入门 — Iterator 和 for...of 循环](https://es6.ruanyifeng.com/#docs/iterator)

我们再看下[ECMA-25.1](https://ecma262.docschina.org/#sec-iteration)对`Iterator`的定义：

**Table 60: Iterable Interface Required Properties**
| Property|Value|Requirements|
|:--|:--|:--|
|@@iterator|A function that returns an Iterator object.|The returned object must conform to the Iterator interface.|

**Table 61: Iterator Interface Required Properties**

|Property|Value|Requirements|
|:--|:--|:--|
|next|A function that returns an IteratorResult object.| The returned object must conform to the IteratorResult interface. If a previous call to the next method of an Iterator has returned an IteratorResult object whose done property is true, then all subsequent calls to the next method of that object should also return an IteratorResult object whose done property is true. However, this requirement is not enforced. |

**Table 66: IteratorResult Interface Properties**
|Property|Value|Requirements|
|:--|:--|:--|
|done|Either true or false.|This is the result status of an iterator next method call. If the end of the iterator was reached done is true. If the end was not reached done is false and a value is available. If a done property (either own or inherited) does not exist, it is consider to have the value false.|
|value|Any ECMAScript language value.|If done is false, this is the current iteration element value. If done is true, this is the return value of the iterator, if it supplied one. If the iterator does not have a return value, value is undefined. In that case, the value property may be absent from the conforming object if it does not inherit an explicit value property.|

综合以上：

1. `Iterator`是一种接口，就是一个标准。你如果要使用，你就按我的标准实现一个这么个函数；
2. 如果要构建一个可迭代的数据(`iterable`)，可以用一个函数，函数需要返回一个`Iterator`对象；
3. 这个`Iterator`对象必须有一个函数叫`next`，每调用一次就返回集合中的下一个元素，并且这个函数返回值需要实现`IteratorResult`接口（需要是这个`IteratorResult`结构的）；
4. 这个`IteratorResult`结构必须包含两个字段`done` 和`value`；
5. `Iterator`接口主要供`for...of`消费。

文字写了这么多，我就以伪代码说明一下：

```js
// 1.实现一个函数
function iterable(data) {
  // 2.返回Iterator对象，有个属性叫next的函数
  return {
    next () {
      // 3.next函数返回值必须包括两个字段done和value
      return {
        // 如果遍历到了集合尾部没有下一个元素了，那么done为true
        done: boolean,
        // 当前元素的值
        value: any
      }
    }
  }
}
```

好，现在我们知道一个构造一个可迭代数据需要这些要求，那根据这个要求，我们怎么让他运作起来呢？

### 怎么实现的？

迭代器用来遍历整个数组，那么这里有两个问题：

1. 怎么获取结果？
   - 答：根据**Table 66**，如果`done`的值为`false`，则`value`的值为当前元素的值。
2. 什么时候结束？
   - 答：根据**Table 66**，如果到了结尾，那么`next`返回的`done`为`true`。当我们读到`done`为`true`的时候，则是遍历完成了。

现在，我们以上面写的`iterable`这个函数为基础。加上上面两个问题，再丰富一下这个函数，如下：

```js
function iterable(arrData) {
  var currentIndex = 0
  return {
    next () {
      const done = currentIndex === arrData.length
      return {
        done,
        value: done ? void 0 : arrData[currentIndex++]
      }
    }
  }
}

const myIterator = iterable(['h', 'i'])
```

我们运行一下：

![iterable运行](https://gitlab.com/imgrs/pic/uploads/900c4f19807b8f642af2f96d82387b5e/n1igojh.png)

到这里，我们根据迭代器接口，我们实现了`iterable`函数，并用它生成了一个可迭代(`iterable`)对象`myIterator`。

那现在`myIterator`是否可以提供给`for...of`进行消费了呢？很显然是不行的，我们要看`for...of`怎么和迭代器沟通的。

### 怎么运作的？

[ECMA-25.1.2](https://ecma262.docschina.org/#sec-iteration)中一段介绍：

> The following expression is one way that ECMAScript code can access the %IteratorPrototype% object:
>
>Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()))

说明了可以通过`Symbol.iterator`属性访问到`Iterator`接口。那么我们就在浏览器中测试一下：

![数组的迭代器接口](https://gitlab.com/imgrs/pic/uploads/cc05a89eb346d9eb0475775d65ba47a4/rlkgb6e.png)

是存在的，这个迭代器接口是部署在数组构造器的原型对象上的，即：`Array.prototype[Symbol.iterator]`。随即我们查看了一下，Object的原型对象上是没有的，那是否说明对象默认是不可迭代的呢？

![对象可迭代吗？](https://gitlab.com/imgrs/pic/uploads/7c814895a061df6d017f9b5c24786268/st8o7x6.png)

那如果我们手动给对象部署一个迭代接口呢，我们试一下：

![迭代器](https://gitlab.com/imgrs/pic/uploads/17dbac931d14be72f1239dec7fd52e0d/8owxn4j.png)

这时，这个对象可以为`for...of`进行使用了（页面也被玩死了，小伙伴们猜猜为啥？）。

之前说了“任何数据结构只要部署 Iterator 接口，就可以完成遍历操作”那除了对象，像字符串，数字，布尔值呢？

![](https://gitlab.com/imgrs/pic/uploads/1b8eefe3af546ff940b2021c4ec70d25/2vtovsf.png)

字符串是默认部署了迭代器接口的，像数字和布尔值在手动部署后亦可使用迭代了。

## 扩展

既然迭代器这么好用，那它除了给`for...of`使用，那还有其他的场景有它的身影？这里我们列举一下吧：

- 解构赋值；
- 扩展运算符；
- yield*
- for...of
- Array.from()
- Promise.all()
- Promise.race()
- Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）

## 结论

通过这篇文章，我了解了迭代器规范，迭代器实现，是日常使用的`for...of`的实现原理。加深了对技术的敬畏也增加了学习的乐趣。