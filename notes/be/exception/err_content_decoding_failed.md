---
description: 服务器正确响应，浏览器或Postman无法正确获取响应
---

# ERR\_CONTENT\_DECODING\_FAILED

> * 📅 **日期**：2019年11月13日 星期三
> * 🌤 **天气**：小雨

## 问题描述

在本地`Debug`，服务器已经正确返回响应内容。部署开发环境后浏览器或`PostMan`无法正确获取响应内容。浏览器会在控制台输出以下错误。

![net::ERR\_CONTENT\_DECODING\_FAILED 201](assets/image%20%2832%29.png)

## 问题解决

因公司使用的是AWS统一的中台进行服务部署的应该不会有问题，然后就开始面向Google编程。找到Stack Overflow一篇文章[AJAX returning ERR\_CONTENT\_DECODING\_FAILED 200 using Codeigniter](https://stackoverflow.com/questions/52464671/ajax-returning-err-content-decoding-failed-200-using-codeigniter)。

```typescript
const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ServerLogger(),
    cors: true,
});
app.useGlobalInterceptors(new TransformInterceptor());
app.use(compression()); // <- 问题出在这
```

问题出在我服务器使用了压缩中间件，并且`nginx`也开启了`gzip`。**然后移除了这个压缩中间件后，就正常了。**

## Q&A

是使用 `nginx` 还是使用[`compression`](https://www.npmjs.com/package/compression)呢？[参考这里](https://github.com/expressjs/compression/issues/131)

