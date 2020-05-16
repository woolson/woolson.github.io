---
description: 使用github登录自己的网站
date: 2018-03-11 15:32:18
---

# Github OAuth

> * 📅 **日期**：2018年3月11日 星期日
> * 🌤 **天气**：天晴

说起来真是糟心，国内的三方登录大部分都是比较规范的`oAuth`。但是恶心就恶心在如果正式使用，网站必须有备案。唉，算了，看来也只有国外的没这个变态的要求了。

## 在 [Github](https://github.com/) 上注册一个APP

之前名字是`Applications`后来改成`OAuth applications`了。 点进去新建一个app然后填写对应的信息，这里不再赘述。

## 在网站上配置授权登录

开始

### 1、进入授权链接构建

```bash
# 请求URL
https://github.com/login/oauth/authorize
```

| 参数名 | 类型 | 值 |
| :--- | :---: | :--- |
| client\_id | String | 注册App时官方分配的 |
| redirect\_uri | String | 用户授权后带着code跳转的链接地址\(如：[http://www.woolson.cn/github/callback](http://www.woolson.cn/github/callback)\) |
| scope | String | 控制需要获取权限的范围，具体看[API](https://developer.github.com/v3/oauth/#scopes)，第三方登录的这里就不用传这个参数就行了 |
| state | String | 这参数会在Github重定向的时候带着，用来判断获取信息请求是否被其他人拦截返回，可随机生成一段 |

```bash
# 构建下面这个样链接
https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}
```

可在前端放置一枚按钮，直接 `location.href` 到此链接，然后会跳转至Github的授权页授权

### 后端处理获取用户信息

用户授权后跳转至 `redirect_uri` 后端路由处理拿到的 `code` 换取 `access_token`\(获取用户信息关键\)

code会带在`redirect_uri`后面，使用路由中 `request.query.code` 获取

`http://www.woolson.cn/github/callback?code=*****&state=*****`

下面用 `code` 获取 `access_token`

> 我直接使用 NodeJS 的 [Request](https://github.com/request/request) 模块直接后端操作，so redirect\_uri就不用了

```bash
# 请求URL
https://github.com/login/oauth/access_token
```

| 参数名 | 类型 | 值 |
| :--- | :---: | :--- |
| client\_id | String | 注册App时官方分配的 |
| client\_secret | String | 注册App时官方分配的 |
| code | String | 刚刚那个code |
| state | String | 在第一步中带的state，现在继续带上\(其实不带入也可以的\) |

用 `Request` 发送请求拿 `token`

```javascript
const param = {
  url: "https://github.com/login/oauth/access_token",
  client_id: "{client_id}",
  client_secret: "{client_secret}",
  code: req.query.code,
}

request(fetchUrlwithParams(param), (err, response, body) => {
  body = JSON.parse(body)
  body.access_token // 这个就是需要拿到的token
})
```

> 用 `access_token` 获取 `user` 的信息 注意：需要在请求中加入请求头 `User-Agent` 并且值为你APP的名称

```text
# 请求URL
https://api.github.com/user
```

| 参数名 | 类型 | 值 |
| :--- | :---: | :--- |
| access\_token | String | 只需要带上上一步返回的access\_token即可 |

```javascript
if(body.access_token) {
  const param = {
    url: "https://api.github.com/user?access_token=" + body.access_token,
    headers: {
      "User-Agent": "app name",
    }
  }
  request(param, (err, response, body) => {
    body = JSON.parse(body)
    if(!body.message) insertGithub(req, res, body)
    else res.redirect("/study")
  })
}else res.redirect("/")
```

如上，如果获取用户信息失败，会在返回信息中带有 `message` 字段。获取正常，存储用户信息；获取失败，重定向到网站首页。

### 存储用户信息和种cookie

> 1、这一步是为啥呢，因为不可能每次打开网站都进行一次授权。小网站做登录有点矫情。 2、保存用户信息。怕保存数据量太大，对需要的信息保存一下。（本网站没保存任何敏感信息，只有名称和Github主页） 3、种植cookie，在浏览器中种上类似于ID的东西，用户访问就带上，类似于记住我的功能一样。等过期了，再让用户授权一次。

可以使用Mongodb，进行数据保存，这里不做赘述。 种植 `cookie` 就是在重定向到网站的时候在 `Response` 中带上 `cookie`

```javascript
const param = {
  domain: ".woolson.cn",
  maxAge: 5184000000,
  httpOnly: false,
  secure: false,
  path: "/",
}

user.save((err, docs) => {
  res.cookie("user", hashs.nameHash, param)
  res.redirect("/study")
})
```

种上cookie以后就是取 `cookie`, Nodejs 需要在App上使用 [`cookie-parser`](https://github.com/expressjs/cookie-parser) Like this:

```javascript
import cookieParser from "cookie-parser"
app.use(cookieParser())
```

然后在以后的请求中获取 `cookie`

> 在保存的时候种的cookie，里面带有你用户的ID用来取用户信息的。

```javascript
app.get("/oauth/login", (req, res) => {
  const userID = req.cookies.user
  if(userID) getLoginUser(req, res)
  else jsonWrite(res)
})
```

这样就能拿到信息啦……其实后面说的都比较简单，具体实现可以根据实际情况。

