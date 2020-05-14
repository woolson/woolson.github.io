# 前言

起源是同事写TS的时候使用Exclude ，其他类型没什么问题。但是在对联合类型或字面量类型进行类型推导有点问题。

```typescript
/** Exclude 类型实现 */
type Exclude<T, U> = T extends U ? never : T
```
