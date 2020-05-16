---
title: Woolson Blog
---

## Recommend 推荐

<ul>
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% assign filted = sorted | where: "recommend","true" %}
  {% assign sliced = filted | slice:0, 3 %}
  {% for post in sliced %}
    <li file-path="{{ post.path }}">
      <p>{{post.date | date: "%Y-%m-%d %H:%M"}}</p>
      <p><a href="{{ post.url }}">{{ post.title }}</a></p>
    </li>
  {% endfor %}
</ul>

## RECENT 最近更新

<ul>
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% assign sliced = sorted | slice:0, 6 %}
  {% for post in sliced %}
    <li>
      <p>{{post.date | date: "%Y-%m-%d %H:%M"}}</p>
      <p><a href="{{ post.url }}">{{ post.title }}</a></p>
    </li>
  {% endfor %}
</ul>
