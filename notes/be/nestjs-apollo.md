---
title: NodeJS使用Apollo
description: 封装Apollo接口为Node Package以方便使用
date: {}
comments: true
published: true
---

## 前言

`Java`官方提供了客户端代码，但是对于`NodeJS`没有提供（有第三方开源包，有的已经不再更新，有的不好使用）。所以使用官方提供的接口进行封装`NodeJS`+`TS`的包，方便使用。

## 实现方案

- 获取配置：通过接口将远程的配置下载下来
- 解析配置：将获取到的配置解析为对象
- 保存与分发：将获取到的配置，分类存储并配置类型，方便阅读和使用

实现注意点:

- 配置需要在所有引用之前加载完毕
- 依赖注入和类型推导
- 远程配置和项目类型准确对应

## 实现步骤

### 步骤一：获取配置

官方提供了两个接口（Apollo其他语言接入指南）：

1. 带缓存读取：读取结果为`Json`格式数据
2. 不带缓存读取：读取结果为`Apollo`平台配置的`dotenv`格式配置

**注意事项**：

- 根据需要选择是否使用缓存
- `Apollo 1.6.0`以后接口可以加`Token`进行鉴权，推荐使用（如果获取配置接口外网可访问则必须使用，防止重要配置泄露的安全问题）
- 使用`Token`的鉴权，注意鉴权参数的算法
- 两个接口返回数据类型不同，需要额外处理（使用`dotenv`解析不带缓存读取的配置）

```yaml
redis.host=redis.com
redis.port=0001
redis.db=1
db.host=dbhost.com
db.port=0001
```

### 步骤二：解析配置

将第一步获取到的配置统一解析为`Json`格式并结构化

#### 将YAML数据转成Json

```json
{
  "redis.host": "redis.com",
  "redis.port": "0001",
  "redis.db": "1",
  "db.host": "dbhost.com",
  "db.port": "0001"
}
```

#### 将Json数据结构化

```js
{
  redis: {
    host: "redis.com",
    port: "0001",
    db: "1"
  },
  db: {
    host: "dbhost.com",
    port: "0001"
  }
}
```

## 使用

### 配置管理

目前配置项入住Apollo，在项目中有各种配置，大致分为三种和修改形式：

1. `src/common/constants/common.ts`中的静态变量配置：注意统一命名规范
2. `src/config/env`中的按环境获取的配置：需要已废弃
3. 部分写在代码中的配置：需要废弃并迁入`src/common/constants/common.ts`

后续这些配置需要进行整理，对配置进行整理，整理的原则为：

1. 各个环境不变的配置：全部移动到`src/common/constants/common.ts`中去，注意命名规范；
2. 跟环境紧密相关的配置，需要添加到远程，按以下步骤：
3. 在`Apollo`中添加配置并填写完整的备注信息，字段命名规范见下文；
	1. 在项目代码中`Config`类型中添加该字段并添加与上一步完全相同的备注信息;
    
#### 配置样例

```yaml
redis.host=redis.com
redis.port=0001
redis.db=1
db.host=dbhost.com
db.port=0001
```

#### 配置规范

1. 只允许定义一层到两层，`e.g. keyName = value` 或者 `scopeName.keyName = value`，**名称使用驼峰命名法**
2. 在项目代码中增加：
	1. `ConfigKeyEnum`中增加一层配置的`keyName`或两层配置的`scopeName`（**注意必须和`Apollo`命名保持一致**）并在`Config`中添加该项
	2. 如果是两层的配置，必须在`Config`接口下添加子层级配置的类型约束，每个属性添加注释和类型（**注意必须和`Apollo`命名保持一致**）
    
```ts
export interface ConfigKeyEnum {
  /* Redis配置 */
  Redis = 'redis'
  /* 数据库配置 */
  DB = 'db'
}

export interface Config {
  [ConfigKeyEnum.Redis]: RedisConfig,
  [ConfigKeyEnum.DB]: DBConfig
}

export interface RedisConfig {
  /* Redis主机地址 */
  host: string
  port: number
  db: number
}

export interface DBConfig {
  host: string
  port: number
}
```

### 配置使用

#### NodeJS

```ts
import { getApolloConfig } from '@shinho-sh/node-apollo';
 
(async function() {
  const apolloConfig = await getApolloConfig({
    apolloConfig: {
      url: process.env.APOLLO_META,
      token: process.env.APOLLO_ACCESSKEY_SECRET,
      appId: APOLLO_APP_ID,
      cluster: 'default',
      namespace: ['application'],
      env: EnvEnum.Dev,
      useCache: true
    }
  });
 
  const app = await NestFactory.create(AppModule);
})();
```

#### NestJS

```ts
// config.helper.ts
// 将ConfigModule及配置注入到全局
export function registerConfig({ config, configEnum }: RegisterOptions) {
  const baseConfig = ConfigModule.forRoot(config);
  const configProviders = Object.keys(configEnum).map(item => {
    return {
      provide: configEnum[item],
      useFactory(configService: ConfigService) {
        return configService.get(configEnum[item]);
      },
      inject: [ConfigService],
    };
  });
  baseConfig.providers.push(...configProviders);
  baseConfig.exports.push(...configProviders.map(o => o.provide));
  return baseConfig;
}
 
 
export function setupConfig () {
  // ...做一下其他的预处理或处理环境变量
  const config = await setApolloIntoEnv({
    apolloConfig: {
      url: process.env.APOLLO_META,
      token: process.env.APOLLO_ACCESSKEY_SECRET,
      appId: APOLLO_APP_ID,
      cluster: 'default',
      namespace: ['application'],
    },
    coverValue: coverValue,
  });
  return config
}
 
 
// app.module.ts
@Global()
@Module({
  imports: [
    registerConfig({
      config: {
        isGlobal: true,
        load: [setupConfig],
      },
      configEnum: ConfigKeyEnum,
    })
  ],
})
export class AppModule {}
 
 
// some.service.ts
@Injectable()
export class SomeServie {
  constructor (
    /* 注入配置 */
    @Inject(ConfigKeyEnum.DB)
    private readonly dbConfig: Config[ConfigKeyEnum.DB]
  ) {
    /* 使用 */
    this.dbConfig.host
  }
}
```

### 覆盖配置

覆盖配置需要配置和远程，相同的配置结构，主要配合调试不同环境使用

```ts
// 远程配置
redis.host = redis.com
redis.port = 0001
redis.index = 1
 
 
// 项目代码
import { getApolloConfig } from '@shinho-sh/node-apollo';
 
(async function() {
  const apolloConfig = await getApolloConfig({
    apolloConfig: {
        ...// config
    },
    // 覆盖配置
    coverValue: {
      "redis.host": "<Custom Value>",
      "redis.port": "<Custom Value>",
    }
  });

  const app = await NestFactory.create(AppModule);
})();
```

## 综合

以上为目前方案，如有问题可按需求进行调整。
