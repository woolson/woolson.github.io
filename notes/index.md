<style>
  .content-tabs {
    margin-top: -10px;
    margin-bottom: 30px !important;
  }
  .content-tabs .current {
    border-color: #1e6bb8;
  }
  .content-tabs span {
    cursor: pointer;
    transition: all .2s;
    color: #1e6bb8;
    border-bottom: 2px solid transparent;
  }
</style>

<p class="content-tabs">
  <span id="allHandler">All 全部</span>
  &nbsp;/&nbsp;
  <span id="feHandler">FE 前端</span>
  &nbsp;/&nbsp;
  <span id="beHandler">BE 后端</span>
  &nbsp;/&nbsp;
  <span id="otherHandler">Other 其他</span>
</p>

<ul id="allContent" style="display:none">
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% if post.path contains 'notes' and post.title %}
    <li>
      <p>{{post.date | date: "%Y-%m-%d %H:%M"}} - <a href="{{ post.url }}">{{ post.title }}</a></p>
    </li>
    {% endif %}
  {% endfor %}
</ul>

<ul id="feContent" style="display:none">
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% if post.path contains 'notes/fe' and post.title %}
    <li>
      <p>{{post.date | date: "%Y-%m-%d %H:%M"}} - <a href="{{ post.url }}">{{ post.title }}</a></p>
    </li>
    {% endif %}
  {% endfor %}
</ul>
<ul id="beContent" style="display:none">
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% if post.path contains 'notes/be' and post.title %}
    <li>
      <p>{{post.date | date: "%Y-%m-%d %H:%M"}} - <a href="{{ post.url }}">{{ post.title }}</a></p>
    </li>
    {% endif %}
  {% endfor %}
</ul>
<ul id="otherContent" style="display:none">
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% if post.path contains 'notes/other' and post.title %}
    <li>
      <p>{{post.date | date: "%Y-%m-%d %H:%M"}} - <a href="{{ post.url }}">{{ post.title }}</a></p>
    </li>
    {% endif %}
  {% endfor %}
</ul>

<script>
(function() {
  window.onload = function () {
    var $handler = {
      all: document.getElementById('allHandler'),
      fe: document.getElementById('feHandler'),
      be: document.getElementById('beHandler'),
      other: document.getElementById('otherHandler')
    }
    var $content = {
      all: document.getElementById('allContent'),
      fe: document.getElementById('feContent'),
      be: document.getElementById('beContent'),
      other: document.getElementById('otherContent')
    }
    var sections = ['all', 'fe', 'be', 'other'];

    function swithSection (name) {
      location.hash = name;
      var contents = sections.filter(function (item) {
        return !item.includes(name);
      });
      contents.forEach(function(item) {
        $handler[item].className = '';
        $content[item].style.display = 'none';
      })
      $handler[name].className = 'current';
      $content[name].style.display = 'block';
    };

    var hashSection = location.hash.replace('#', '');
    if (!sections.includes(hashSection)) {
      hashSection = 'all';
    }
    swithSection(hashSection);

    $handler.all.addEventListener('click', function () {
      swithSection('all')
    })
    $handler.fe.addEventListener('click', function () {
      swithSection('fe')
    })
    $handler.be.addEventListener('click', function () {
      swithSection('be')
    })
    $handler.other.addEventListener('click', function () {
      swithSection('other')
    })
  };
})();
</script>
