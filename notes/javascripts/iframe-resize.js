window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'widget-resize') {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow === e.source) {
        iframes[i].style.height = e.data.height + 'px';
        break;
      }
    }
  }
});
