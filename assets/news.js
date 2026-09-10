/* ============================================================
 * 左侧财经头条渲染（消费 window.NEWS，数据见 news-data.js）
 * ============================================================ */
(function () {
  var col = document.getElementById('news-col');
  if (!col) return;
  var N = window.NEWS;
  if (!N) { col.innerHTML = '<div class="loading">未找到新闻数据，请检查 news-data.js</div>'; return; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var html = '';

  if (N.headline) {
    html += '<div class="headline">';
    html += '<h1>' + esc(N.headline.title) + '</h1>';
    if (N.headline.summary) html += '<div class="summary">' + esc(N.headline.summary) + '</div>';
    if (N.headline.links && N.headline.links.length) {
      html += '<div class="hl-links">';
      N.headline.links.forEach(function (l) {
        html += '<a href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.t) + '</a>';
      });
      html += '</div>';
    }
    html += '</div>';
  }

  (N.blocks || []).forEach(function (b) {
    html += '<div class="block">';
    html += '<div class="block-hd"><span class="bt">' + esc(b.cat) + '</span>'
      + '<span class="more"><a href="#" onclick="return false">更多&gt;</a></span></div>';
    html += '<div class="block-bd"><ul>';
    (b.items || []).forEach(function (it) {
      html += '<li><span class="t"><a href="' + esc(it.u || '#') + '" target="_blank" rel="noopener">' + esc(it.t) + '</a></span>';
      if (it.d) html += '<span class="date">' + esc(it.d) + '</span>';
      html += '</li>';
    });
    html += '</ul></div></div>';
  });

  col.innerHTML = html;
})();
