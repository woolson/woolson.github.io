<ul>
  {% for post in site.pages %}
    {% assign postfolder = post.url | split: "/" %}
    {% if postfolder[1] == 'share' %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
</ul>
