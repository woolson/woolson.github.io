---
description: 记一次同事问的问题
date: 2019-11-04 21:22:38
---

# TS Exclude实现问题

> * 📅 **日期**：2019年11月4日 星期一
> * 🌤 **天气**：阴天

## 前言

起源是同事写`TS`的时候使用`Exclude` ，其他类型没什么问题。但是在对联合类型或字面量类型进行类型推导有点问题。

```typescript
/** Exclude 类型实现 */
type Exclude<T, U> = T extends U ? never : T
```

## 描述

问题如代码所示，期望与实际并不相符。怎么去理解这个呢？

```typescript
type Exclude<T, U> = T extends U ? never : T

type FakeExclude<T, U> = T extends U ? T : U

type BaseAccountKey = 'name' | 'avatar'

type OtherAccountKey = 'name' | 'avatar' | 'openId'

type FakeResult = FakeExclude<WxAccountKey, BaseAccountKey>
// 实际 => "name" | "avatar"

type Result = Exclude<WxAccountKey, BaseAccountKey>
// 期望 => "name" | "avatar" | "openId" (WxAccountKey)
// 实际 => "openId"
```

没问题，但是确实是这样的，虽然知道结果肯定是`"openId"` 但是怎么来的呢？然后就去翻资料找。

## 验证

`Exclude` 在推导字面量类型或者联合类型的时候，有点不一样的。如下🌰：

```typescript
type Result = Exclude<WxAccountKey, BaseAccountKey>

// 实际的推导逻辑为
type Result = Exclude<'name', BaseAccountKey> | Exclude<'avatar', BaseAccountKey> | Exclude<'openId', BaseAccountKey>
// 实际 => never | never | "openId" 即 "openId"
```

字面量类型推导这么理解没问题，那再看下联合类型的表现，如下🌰：

```typescript
interface a {
  name: string
}

interface b {
  name: string
  age: number
}

interface B {
  age: number
}

type Result = Exclude<a | b, B>
// 期望 => a | nerver => a
// 实际 => a
```

## 结果

原来`TS`是这样处理这里的，这个问题最后也没找到官方的解释。就先这样吧🙈。

