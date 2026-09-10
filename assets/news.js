/* ============================================================
 * 星瀚财经渲染（消费 window.NEWS，缩略图用 window.makeThumb）
 * 渲染目标：左栏(导航/日历/外汇/基金) 中栏(头条/要闻/卡片/图集/栏目) 右栏(自选股/头条榜/专题)
 * 注：#stock-widget 由 stock.js 渲染。
 * ============================================================ */
(function () {
  'use strict';
  var N = window.NEWS;
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  /* 真实新闻图加载失败时回退到内联 SVG，避免裂图 */
  window.imgFallback = function (el) {
    el.onerror = null;
    var k = el.getAttribute('data-kind') || 'news';
    var l = el.getAttribute('data-label') || '资讯';
    el.src = window.makeThumb(205, k, l);
  };
  /* 缩略图：字符串=真实图(热链+绕过防盗链)，对象=内联SVG */
  function img(o) {
    if (!o || !o.img) return '';
    var im = o.img;
    if (typeof im === 'string') {
      var label = o.cat || o.title || '资讯';
      return '<img src="' + esc(im) + '" alt="' + esc(label) + '" referrerpolicy="no-referrer" loading="lazy"'
        + ' data-kind="news" data-label="' + esc(label) + '" onerror="window.imgFallback(this)">';
    }
    return '<img src="' + window.makeThumb(im.hue, im.kind, im.label) + '" alt="">';
  }

  /* ---------- 左栏：频道导航 ---------- */
  var navCh = ['首页', '财经', '股票', '新股', '基金', '期货', '外汇', '黄金', '理财', '银行', '保险', '房产', '汽车', '科技', '国际', '评论', '数据', '视频'];
  var navUrls = { '财经': 'https://finance.sina.com.cn', '股票': 'https://stockapp.finance.qq.com', '基金': 'https://fund.eastmoney.com', '外汇': 'https://www.chinamoney.com.cn', '理财': 'https://money.163.com', '房产': 'https://www.fang.com', '汽车': 'https://auto.qq.com', '科技': 'https://tech.qq.com', '国际': 'https://finance.sina.com.cn/usstock/', '期货': 'https://futures.qq.com', '黄金': 'https://gold.qq.com', '银行': 'https://money.163.com/bank/', '保险': 'https://money.163.com/insurance/', '数据': 'https://data.eastmoney.com', '视频': 'https://v.qq.com' };
  function renderLeftNav() {
    var el = document.getElementById('left-nav'); if (!el) return;
    el.innerHTML = navCh.map(function (c) {
      var u = navUrls[c] || '#';
      return '<a href="' + esc(u) + '"' + (u === '#' ? ' onclick="return false"' : ' target="_blank" rel="noopener"') + '>' + esc(c) + '</a>';
    }).join('');
  }

  /* ---------- 左栏：财经日历 ---------- */
  function renderCalendar() {
    var el = document.getElementById('left-calendar'); if (!el || !N.calendar) return;
    el.innerHTML = '<ul class="mini-list">' + N.calendar.map(function (c) {
      return '<li><span class="cal-d">' + esc(c.d) + '</span><span class="cal-t">' + esc(c.t) + '</span></li>';
    }).join('') + '</ul>';
  }

  /* ---------- 中栏：头条大图 + 要闻 ---------- */
  function renderCenter() {
    var col = document.getElementById('news-col'); if (!col || !N) return;
    var h = N.headline || {};
    var lead = '<div class="lead">';
    if (h.img) lead += '<a class="lead-img" href="#" onclick="return false">' + img(h) + '</a>';
    lead += '<div class="lead-main"><h1>' + esc(h.title || '') + '</h1>';
    if (h.summary) lead += '<div class="lead-sum">' + esc(h.summary) + '</div>';
    if (h.links && h.links.length) {
      lead += '<div class="lead-links">';
      h.links.forEach(function (l) { lead += '<a href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.t) + '</a>'; });
      lead += '</div>';
    }
    lead += '</div></div>';

    var yw = '<div class="yaowen"><div class="sec-hd"><span class="bt">要闻</span></div><ul>'
      + (N.yaowen || []).map(function (it) {
        return '<li><a href="' + esc(it.u || '#') + '" target="_blank" rel="noopener">' + esc(it.t) + '</a></li>';
      }).join('') + '</ul></div>';

    var cards = '<div class="cards"><div class="sec-hd"><span class="bt">焦点图览</span></div><div class="cards-row">'
      + (N.featured || []).map(function (c) {
        return '<a class="card" href="' + esc(c.u || '#') + '"' + (c.u ? ' target="_blank" rel="noopener"' : ' onclick="return false"') + '>'
          + img(c) + '<span class="card-cat">' + esc(c.cat || '') + '</span>'
          + '<span class="card-t">' + esc(c.t) + '</span></a>';
      }).join('') + '</div></div>';

    var gal = '<div class="gallery"><div class="sec-hd"><span class="bt">图片新闻</span></div><div class="gal-row">'
      + (N.gallery || []).map(function (c) {
        return '<a class="gal" href="' + esc(c.u || '#') + '"' + (c.u ? ' target="_blank" rel="noopener"' : ' onclick="return false"') + '>'
          + img(c) + '<span class="gal-t">' + esc(c.t) + '</span></a>';
      }).join('') + '</div></div>';

    /* 栏目文字列表：分两列排 */
    var blk = (N.blocks || []).map(function (b) {
      var lis = (b.items || []).map(function (it) {
        return '<li><span class="t"><a href="' + esc(it.u || '#') + '" target="_blank" rel="noopener">' + esc(it.t) + '</a></span>'
          + (it.d ? '<span class="date">' + esc(it.d) + '</span>' : '') + '</li>';
      }).join('');
      return '<div class="block"><div class="block-hd"><span class="bt">' + esc(b.cat) + '</span>'
        + '<span class="more"><a href="#" onclick="return false">更多&gt;</a></span></div>'
        + '<div class="block-bd"><ul>' + lis + '</ul></div></div>';
    }).join('');
    var blocksTwoCol = '<div class="blocks-2col">' + blk + '</div>';

    col.innerHTML = lead + yw + cards + gal + blocksTwoCol;
  }

  /* ---------- 右栏：头条榜 ---------- */
  function renderRanking() {
    var el = document.getElementById('rank-list'); if (!el || !N.ranking) return;
    el.innerHTML = '<ol class="rank">' + N.ranking.map(function (r, i) {
      var top = i < 3 ? ' top' : '';
      return '<li class="' + (i + 1) + top + '"><span class="rk">' + (i + 1) + '</span>'
        + '<a href="' + esc(r.u || '#') + '"' + (r.u ? ' target="_blank" rel="noopener"' : ' onclick="return false"') + '>' + esc(r.t) + '</a>'
        + (r.hot >= 85 ? '<span class="hot">热</span>' : '') + '</li>';
    }).join('') + '</ol>';
  }

  /* ---------- 右栏：热点专题（feed.js 实时覆盖，失败用静态兜底） ---------- */
  function renderTopic() {
    var el = document.getElementById('topic-list'); if (!el) return;
    var topics = (N.topics && N.topics.length) ? N.topics : [
      { t: '专题：中长期资金入市路线图', u: 'https://finance.sina.com.cn' },
      { t: '图解：一图读懂8月经济数据', u: 'https://www.stats.gov.cn' },
      { t: '专栏：星瀚财经 · 资产配置笔记', u: 'https://www.xhja.cn' },
      { t: '数据：北向资金持股变动榜', u: 'https://data.eastmoney.com/hsgt/' }
    ];
    el.innerHTML = '<ul class="mini-list">' + topics.map(function (t) {
      return '<li><span><a href="' + esc(t.u) + '" target="_blank" rel="noopener"'
        + (t.s ? ' title="来源：' + esc(t.s) + '"' : '') + '>' + esc(t.t) + '</a></span></li>';
    }).join('') + '</ul>';
  }

  function renderAll() {
    renderLeftNav();
    renderCalendar();
    renderCenter();
    renderRanking();
    renderTopic();
  }
  renderAll();
  /* 暴露给 feed.js：拉到真实新闻后重渲染（保留 window.NEWS 上的静态兜底） */
  window.renderNews = renderAll;
})();
