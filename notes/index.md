<ul>
  {% for post in site.pages %}
    <li>
      {{post}}
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
