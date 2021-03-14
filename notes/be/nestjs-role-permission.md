---
description: NestJS实现接口角色权限管理方案
date: {}
published: true
comment: true
title: NestJS权限管理实现
comments: true
---
## 权限方案

### 用户权限缓存

- 用户权限列表：用户登录成功后返回前端时将权限缓存到`Redis`里面
- 访问接口时根据`Redis`权限列表进行鉴权

### 接口权限限制

- 用户登录成功后，将该用户角色权限缓存到`Redis`（不同用户共享角色权限列表）
- 在全局守卫`Gurad`里面获取当前用户角色和角色权限列表
- 使用`Nestjs`的`SetMetadata`设置访问接口所需权限（可多个）
- 有权限则返回接口数据，无权限则抛出`UnAuthorizeException`异常

## 权限表设计

- 用户表 => 1:1 <= 角色表
- 角色表 => n:n <= 权限表

![权限表设计](https://user-images.githubusercontent.com/27878293/110765057-bf37bc80-828e-11eb-8935-f679a033a3b9.png)

## 代码逻辑

### 代码规范

#### 接口权限设置

- 在 common/decorators/permission 中导入 Permission 装饰器
- 在接口上设置具体的权限（类型为数组，支持多个权限），权限必须在 PermissionCodeEnum 中注明

```ts
// src/types/common.type
/** 通用元信息Key */
export enum MetadataKeyEnum {
  /** 鉴权 */
  Authentication = 'authentication',
  /** 权限 */
  Permissions = 'permissions'
}

// src/common/decorators/permission.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { MetadataKeyEnum } from 'src/types/common.type';
import { PermissionCodeEnum } from 'src/types/permission.type';

/** 设置接口访问权限列表 */
export const Permission = (permssions: PermissionCodeEnum[]) => SetMetadata(MetadataKeyEnum.Permissions, permssions);
```


#### 权限清单

在`src/types/permission.type.ts`中管理，书写注意规范：

- 权限按功能树部分（翻到最下面）进行排序分区书写以便阅读
- 权限命名：简洁明了，见名知意，命名方式使用帕斯卡命名法，禁止随意书写
- 权限注释：按功能层级注明该权限控制内容，可参考文件内容示例部分，禁止随意书写
- 权限码：按次序编排，与数据库保持一致，切勿随意更改

```ts
// src/types/permission.type.ts
/** 权限标识（提供给前端和接口判断权限） */
export enum PermissionCodeEnum {
  /** WARN: 用户 */
  User = '01',
  /** 用户 - 用户列表 */
  UserList = '0101',
  /** 用户 - 用户详情 */
  UserDetail = '0102',
  /** 用户 - 用户审核 */
  UserReviewer = '0103',
}
```

## 鉴权步骤

### 接口添加访问权限

- 明确需求 types/permission.type.ts 中的权限列表可以访问当前的接口
- 使用 Permission 装饰器将权限列表以数组的形式给接口添加权限

```ts
import { Permission } from 'src/common/decorators/permission.decorator'
import { PermissionCodeEnum } from 'src/types/permission.type.ts'

@Get('users')
@Permission([
	PermissionCodeEnum.UserList,
])
@ApiOperation({ summary: '获取用户列表' })
async getUserList() {}
```

### 登录获取用户权限

1. 根据 admin.role_id 查询 admin_role_permission_relationship（关联 admin_permission）获取用户所有权限的 code
2. 以 `role:${roleId}`的形式将角色的code存入Redis中（无限期有效）
3. 将code字符串化后传给前端，前端根据code判断展示界面元素

### 接口鉴权（AuthGuard）

1. 判断`Token`是否有效，无效则返回`401`
2. 获取当前接口所需要的权限（`@Permission`中指定的）
3. `AuthGuard`里根据`Token`去`Redis`获取用户信息（为了获取用户`roleId`）
4. 根据`roleId`查询当前角色所有权限的`code`
5. 判断当前用户拥有的权限和接口的权限是否存在交集，如果有正常返回数据，没有返回`403`


```ts
// src/common/guards/auth.guard.ts

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly redisPlusService: RedisPlusService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    /** 请求头部信息 */
    const { headers } = context.switchToHttp().getRequest();
    /**
     * 需要鉴权
     * @description 用作判读是否需要登录
     * @example @Metadata
     */
    const needAuth = this.reflector.get<boolean>(
      MetadataKeyEnum.Authentication,
      context.getHandler(),
    );
    if (needAuth !== false) {
      if (!headers[TOKEN_KEY]) {
        throw new AuthException('未登录', APICode.FAILED);
      }
      /** Redis用户信息 */
      const userInfo = await this.redisPlusService
        .getUserInfo(headers[TOKEN_KEY]);
      if (!userInfo) {
        throw new AuthException('未登录', APICode.FAILED);
      }
      /**
       * 接口所需权限
       * @description 调用此接口所需要的权限
       */
      const permissions = this.reflector.get<string[]>(
        MetadataKeyEnum.Permissions,
        context.getHandler(),
      );
      if (permissions && permissions.length > 0) {
        /** 当前用户角色的权限列表 */
        const rolePermission = await this.redisPlusService
          .getRolePermission(userInfo.roleId);
        if (permissions.some(o => rolePermission.includes(o))) {
          return true;
        } else {
          throw new PermissionException('无权访问', APICode.FAILED);
        }
      } else {
        throw new PermissionException('无权访问', APICode.FAILED);
      }
    } else {
      return true;
    }
  }
}
```

## 总结

总得来说，权限方面的管理蛮简单的，没有角色继承，权限分组等复杂的应用权限管理。本文重点是在接口层面的权限限制。
