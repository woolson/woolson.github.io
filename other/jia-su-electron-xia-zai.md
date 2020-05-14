---
description: 由于国内网络原因，electron包下载速度很慢。
---

# 加速Electron下载

> * 📅 **日期**：2018年8月9日 星期四
> * 🌤 **天气**：我顶大太阳，只想为你撑伞...热

## Electron镜像地址

修改electron的镜像地址为淘宝镜像即可：

{% tabs %}
{% tab title="macOS" %}
{% code title="~/.zshrc 或 ~/.bashrc" %}
```bash
export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
```
{% endcode %}
{% endtab %}

{% tab title="Windows" %}
```
参考地址：https://jingyan.baidu.com/article/8ebacdf02d3c2949f65cd5d0.html
```
{% endtab %}
{% endtabs %}



