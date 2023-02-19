---
description: 使用HomeAssistant方案将不支持HomeKit米家设备和HomeKit进行连接，方便使用Siri控制
date: 2022-06-04T23:10:39.000Z
comments: true
published: true
title: 使用HomeAssistant连接米家和HomeKit
---

作为一名数码爱好者，家里很多电器买的都是智能产品，这块的产品选择米家最经济实惠，但是自己使用的电脑和手机都是苹果的。最近买了个HomePod Mini，想通过Siri来控制家里的电器。

在之前有找过怎么在iOS家庭中控制米家生态设备，找到了很火的 [Home Assistant](https://www.home-assistant.io/) 就简单了解过
，这次动手来实现他。

HomeAssistant支持各种设备，条件好的用树莓派，家里有旧电脑也可以实现，对设备性能要求不高。我家里有个台常年不关机的MacBookPro，所以就在Mac上安装了HomeAssistant服务。

这里不说教程网上一大堆（可以参考这个教程来将米家设备接入到 HomeAssistant：https://zhuanlan.zhihu.com/p/392587917），主要来说在过程中遇到的问题。

## ⭐️ 完整的流程步骤
1. 配置环境安装Python
2. 安装Home Assistant并启动
3. 安装集成（integration）：HACS
4. 通过HACS安装集成：XiaoMi Miot Auto
5. 在XiaoMi Miot Auto中登录米家账号并选择需要接入的设备（这里会把米家App中的设备列表同步过来）
6. 在Home Assistant中加入HomeKit同步到苹果家庭App中

##  环境问题 - Python

- `Python`版本：按官方建议安装相对较新的版本，我装了最新的版本`3.10.1`
-  `Pip3`版本：按推荐也装了最新版本，我装了当前（2022.06.04）`22.1.2`
- 安装切换Python源，**在过程中需要安装大量依赖，防止等待时间过长**

## 启动HomeAssistant

```shell
启动命令
→ hass
```
第一次启动会安装很多的依赖资源，并且看教程其中会遇到各种问题，我这边只遇到了一个问题，就是由于权限问题无法自动安装依赖，报错后需要手动去安装。安装依赖注意一个问题，就是部分依赖是指定版本的。

```shell
# 示例错误信息
Unable to install package getmac==0.8.2: ERROR: Could not install packages due to OSError:...

# getmac==0.8.2 就是指定版本，新开终端执行
→ pip3 install getmac==0.8.2

# getmac>=0.8.2需要大于这个版本，可以去GitHub搜这个包的版本列表选个指定版本的最后的fix版本或当前版本
→ pip3 install getmac==0.8.2
→ pip3 install getmac==0.8.8
```

## 安装HACS

这个就是类似第三方应用商店，安装注意以下问题：

- HomeAssistant平台搜不到HACS的话就手动安装
- 如果手动安装的话，选择HACS最新的版本下载
- HomeAssistant在启动时报找不到HACS integration，需要在HACS配置文件（.homeassistant/custom_components/hacs/manifest.json）中加入版本，例如：`"version": "1.6.2"`
- 给HACS配置GitHub Token，**创建Token的时候填名字和选择有效期即可，其他的不用勾选**

```yaml
# 文本编辑器打开 ~/.homeassistant/configuration.yaml，上面是其他的配置，在最下面添加新行输入

hacs:
  token: ghp_123123……
```

## 进程守护及开机自启

```shell
# 安装自启
→ hass --script macos install

# 卸载自启
→ hass --script macos uninstall
```
如果安装自启的时候遇到以下问题，就**先执行一下卸载自启再执行安装自启即可**。
```
Load failed: 5: input/output error
Try running `launchctl bootstrap` as root for richer errors
```

## 连接HomeAssistant和家庭App

在配置文件`~/.homeassistant/configuration.yaml` 最下面新行输入

```yaml
hacs:
  token: ghp_123123……

homekit:
```

添加好配置，重启Home Assistant后，在HomeAssistant的通知里面会有HomeKit的连接二维码，使用家庭App扫码添加即可。

## HomeAssistant可以控制设备，但家庭中设备显示**未响应**

在网上找了很多问题原因后，基本上问题原因都是指向路由器问题，例如：https://bbs.hassbian.com/thread-1561-1-1.html
我家里的路由器是华为AX3Pro，经过一番查找后发现路由器有个设置叫**WiFi5备用网络（提升网络兼容性的）**，打开后问题立马解决了。
