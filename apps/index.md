<div>
{% for post in site.pages %}
  {% assign postfolder = post.url | split: "/" %}
  {% if postfolder[1] == 'apps' %}
    <p>{{post.date | date: "%Y-%m-%d %H:%M"}}</p>
    <p><a href="{{ post.url }}">{{ post.title }}</a></p>
  {% endif %}
{% endfor %}
</div>