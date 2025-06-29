/** 如果图片有Alt则添加一个元素进行显示 */
function convertImgAtlToSubText () {
  var $imgs = document.querySelectorAll('#content img');
  for (var i = 0; i < $imgs.length; i++) {
    var $img = $imgs[i];
    var alt = $img.getAttribute('alt');
    if (alt) {
      var $span = document.createElement('span');
      $span.className = 'common-img-alt';
      $span.innerText = alt;
      $img.parentNode.appendChild($span);
    }
  };
};

window.addEventListener('DOMContentLoaded', function() {
  convertImgAtlToSubText();
  window.onscroll = _.debounce(function () {
    var toc = document.querySelector('.main_toc')
    var content = document.querySelector('#content')
    var contentPosition = content.getBoundingClientRect()
    if (contentPosition.top <= 0) {
      toc.classList.add('fixed')
      content.classList.remove('relative')
    } else {
      content.classList.add('relative')
      toc.classList.remove('fixed')
    }
  })
});
