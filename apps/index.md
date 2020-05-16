<ul>
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% assign postfolder = post.url | split: "/" %}
    {% if postfolder[1] == 'apps' %}
      <li>
        <p>{{post.date | date: "%Y-%m-%d %H:%M"}}</p>
        <p><a href="{{ post.url }}">{{ post.title }}</a></p>
      </li>
    {% endif %}
  {% endfor %}
</ul>
