<ul>
  {% for post in site.posts %}
    {% assign postfolder = post.url | split: "/" %}
    {% if postfolder[1] == 'share' %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
</ul>