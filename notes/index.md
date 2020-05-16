<ul>
  {% for post in site.posts %}
    {% assign postfolder = post.url | split: "/" %}
    {{post}}
    {% if postfolder[1] == 'notes' %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
</ul>
