---
description: 使用Charles抓包，配置都正确就是一直unknown
---

# Charles HTTPS抓包

> * 📅 **日期**：2019年10月02日 星期三
> * 🌤 **天气**：多云微风

![](/images/image%20%2817%29.png)

## 准备

* [Charles](https://www.charlesproxy.com/)软件下载安装；
* 同一局域网下，两个设备 PC & 需抓包设备；

## PC配置

打开软件，查看PC的IP和端口

### 查看PC的IP

**操作：**系统偏好设置 -&gt; 网络。**记住PC的IP！！！**

![&#x7CFB;&#x7EDF;&#x504F;&#x597D;&#x914D;&#x7F6E; -&amp;gt; &#x7F51;&#x7EDC;](/images/image%20%2864%29.png)

### 查看Charles端口

**操作：**菜单栏 -&gt; Proxy -&gt; Proxy Settings。**记住Charles的端口！！！**

![HTTP Proxy Port&#x4E3A;8888](/images/image%20%285%29.png)

### 安装Charles证书

**操作：**菜单栏 -&gt; Help -&gt; SSL Proxying -&gt; Install Charles Root Certificate。

![&#x5B89;&#x88C5;PC&#x7AEF;SSL&#x8BC1;&#x4E66;](/images/image%20%2847%29.png)

显示Charles Proxy CA这个证书不被信任。

![](/images/image%20%2812%29.png)

**操作：【**双击打开】列表中的Charles证书 -&gt; 【展开】信任 -&gt; 【修改】使用此证书时为【始终信任】，然后关闭此窗口即可。

**此时：**【此根证书不被信任】变为【此证书已标记为受此账户信任】**。**

![](/images/image%20%284%29.png)

### 配置Charles的SSL

**操作：**

1. 菜单栏 -&gt; Proxy -&gt; SSL Proxying Settings；
2. 勾选 Enable SSL Proxying；
3. 点击Add按钮，添加：\*.443；
4. 点击OK保存。

![](/images/image%20%2861%29.png)

## 设备配置（iPhone）

### 配置代理

**操作：**

1. 手机打开：设置 -&gt; 无线局域网 -&gt; \[所连接的无线网\] -&gt; 配置代理；
2. 选择【手动】；
3. 填写服务为PC的IP；
4. 填写端口为Charles的端口；
5. 保存。

### 安装Charles证书

**操作：**手机使用Safari浏览器打开[chls.pro/ssl](https://chls.pro/ssl)，并允许安装。

![](/images/image%20%2841%29.png)

### 信任Charles证书

**操作：**手机打开：设置 -&gt; 通用 -&gt; 关于本机 -&gt; 证书信任设置，**信任你安装的Charles证书**。

![](/images/image%20%2857%29.png)

## 开始抓包

![](/images/image%20%286%29.png)

打开手机并请求，然后就能看到HTTPS的响应明文，**微信小程序亦可。**

