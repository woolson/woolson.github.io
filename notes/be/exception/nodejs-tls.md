---
description: Nodejs请求报unsupported protocol错误
date: 2020-11-17 22:12:32
comments: true
---

# unsupported protocol错误

> * 📅 **日期**：2020年11月17日 星期二
> * 🌤 **天气**：多云微风

## 问题描述

- Nodejs version: 12.19.0
- axios version: 0.21.0

目的是爬虫某个网站，每天自动获取想要的信息然后推送到个人微信上。爬取某个页面的时候报错，错误信息如下：
```http request
SSL routines:ssl_choose_client_version:unsupported protocol:...
```

## 问题分析

主要的错误信息如下：

1. SSL
2. unsupported protocol

基于`stackoverflow` 搜索一下，得到错误原因：**`Node.js 12's default TLS settings are stricter now.
The site doesn't handle TLS v1.2. Node 12 by default need 1.2.(Nodejs 12的 TSL 设置更加严格了，
默认使用1.2版本，如果网站不支持将出现以上错误：不被支持的协议).`**

所以，因为所爬取的网站不支持`TLS1.2`返回以上错误。

## 问题解决

在实际项目中有以下几种方式，目的就是设置Nodejs TLS最低版本：

### 代码中直接设置

在项目入口处进行设置

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('tls').DEFAULT_MIN_VERSION = 'TLSv1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
```

### 在命令行中设置

```shell script
node main.js --tls-min-v1.0
```

### 在`ts-node`中使用

```shell script
node --tls-min-v1.0 -r ts-node/register src/main.ts
```

### 在`pm2`中使用

```shell script
pm2 start dist/main.js --node-args \"--tls-min-v1.0\"
```
