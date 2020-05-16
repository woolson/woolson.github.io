<style>
  .content-tabs {
    margin-top: -10px;
    margin-bottom: 30px !important;
  }
  .content-tabs .current {
    font-weight: bold;
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
  <span id="feHandler" class="current">FE 前端</span>
  &nbsp;/&nbsp;
  <span id="beHandler">BE 后端</span>
  &nbsp;/&nbsp;
  <span id="otherHandler">Other 其他</span>
</p>

<ul id="feContent">
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% if post.path contains 'notes/fe' %}
      <li>
        <p>{{post.date | date: "%Y-%m-%d %H:%M"}}</p>
        <p><a href="{{ post.url }}">{{ post.title }}</a></p>
      </li>
    {% endif %}
  {% endfor %}
</ul>
<ul id="beContent" style="display:none">
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% if post.path contains 'notes/be' %}
      <li>
        <p>{{post.date | date: "%Y-%m-%d %H:%M"}}</p>
        <p><a href="{{ post.url }}">{{ post.title }}</a></p>
      </li>
    {% endif %}
  {% endfor %}
</ul>
<ul id="otherContent" style="display:none">
  {% assign sorted = (site.pages | sort: 'date') | reverse %}
  {% for post in sorted %}
    {% if post.path contains 'notes/other' %}
      <li>
        <p>{{post.date | date: "%Y-%m-%d %H:%M"}}</p>
        <p><a href="{{ post.url }}">{{ post.title }}</a></p>
      </li>
    {% endif %}
  {% endfor %}
</ul>

<script>
(function() {
  window.onload = function () {
    var $handler = {
      fe: document.getElementById('feHandler'),
      be: document.getElementById('beHandler'),
      other: document.getElementById('otherHandler')
    }
    var $content = {
      fe: document.getElementById('feContent'),
      be: document.getElementById('beContent'),
      other: document.getElementById('otherContent')
    }

    function swithSection (name) {
      var contents = ['fe', 'be', 'other'].filter(function (item) {
        return item.includes(name);
      });
      contents.forEach(function(item) {
        $handler[name].className = '';
        $content[name].style.display = 'none';
      })
      $handler[name].className = 'current';
      $content[name].style.display = 'block';
    };

    console.log($handler, $content)

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
