/* ============================================================
 * 实时大盘指数：顶部滚动条(#idx-track) + 右栏列表(#idx-list)
 * 纯前端零后端：腾讯 qt.gtimg.cn script 注入取实时值，原地更新文本避免动画跳变。
 * 交易时段 8s 轮询，非交易时段 60s。
 * ============================================================ */
(function () {
  'use strict';
  var codes = ['sh000001', 'sz399001', 'sz399006', 'sh000300', 'sh000688', 'sz399905', 'sh000016'];
  var names = { sh000001: '上证指数', sz399001: '深证成指', sz399006: '创业板指', sh000300: '沪深300', sh000688: '科创50', sz399905: '中证500', sh000016: '上证50' };
  var refs = {};   // code -> [{priceEl, pctEl}, ...]（滚动条含两份副本 + 列表一份）

  function fmtTime(d) { function p(n) { return (n < 10 ? '0' : '') + n; } return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()); }

  /* 构建顶部滚动条（复制两份做无缝循环） */
  function buildTicker() {
    var track = document.getElementById('idx-track'); if (!track) return;
    function item(c) {
      var wrap = document.createElement('span'); wrap.className = 't-item';
      var n = document.createElement('span'); n.className = 't-name'; n.textContent = names[c] || c;
      var p = document.createElement('span'); p.className = 't-price'; p.textContent = '—';
      var pc = document.createElement('span'); pc.className = 't-pct flat'; pc.textContent = '—';
      wrap.appendChild(n); wrap.appendChild(p); wrap.appendChild(pc);
      track.appendChild(wrap);
      refs[c] = refs[c] || []; refs[c].push({ priceEl: p, pctEl: pc });
    }
    codes.concat(codes).forEach(item);   // 复制一份
  }

  /* 构建右栏指数列表 */
  function buildList() {
    var el = document.getElementById('idx-list'); if (!el) return;
    el.innerHTML = codes.map(function (c) {
      return '<li><span class="ix-name">' + (names[c] || c) + '</span>'
        + '<span class="ix-price" id="ix-p-' + c + '">—</span>'
        + '<span class="ix-pct flat" id="ix-r-' + c + '">—</span></li>';
    }).join('');
    codes.forEach(function (c) {
      refs[c] = refs[c] || [];
      refs[c].push({ priceEl: document.getElementById('ix-p-' + c), pctEl: document.getElementById('ix-r-' + c) });
    });
  }

  /* 腾讯 script 注入取数 */
  function fetchTx(cb) {
    var s = document.createElement('script');
    s.src = 'https://qt.gtimg.cn/q=' + codes.join(',');
    var done = false;
    function parse() {
      if (done) return; done = true;
      var out = {};
      codes.forEach(function (c) {
        var raw = window['v_' + c];
        if (raw && raw.indexOf('~') > 0) {
          var f = raw.split('~');
          var price = parseFloat(f[3]), prev = parseFloat(f[4]);
          if (price > 0 && prev > 0) out[c] = { price: price, prev: prev };
        }
      });
      if (s.parentNode) s.parentNode.removeChild(s);
      cb(out);
    }
    s.onload = parse; s.onerror = parse;
    document.head.appendChild(s);
    setTimeout(parse, 6000);
  }

  function update(vals) {
    codes.forEach(function (c) {
      var v = vals[c]; if (!v) return;
      var chg = (v.price - v.prev) / v.prev * 100;
      var cls = chg > 0 ? 'up' : (chg < 0 ? 'down' : 'flat');
      var arrow = chg > 0 ? '▲' : (chg < 0 ? '▼' : '—');
      (refs[c] || []).forEach(function (r) {
        if (!r.priceEl) return;
        r.priceEl.textContent = v.price.toFixed(2);
        r.pctEl.textContent = arrow + ' ' + Math.abs(chg).toFixed(2) + '%';
        r.pctEl.className = (r.pctEl.classList.contains('t-pct') ? 't-pct ' : 'ix-pct ') + cls;
      });
    });
    var st = document.getElementById('idx-status');
    if (st) st.textContent = '更新 ' + fmtTime(new Date());
  }

  function isTrading() {
    var n = new Date(), d = n.getDay(), h = n.getHours(), m = n.getMinutes();
    if (d === 0 || d === 6) return false;
    var t = h * 60 + m;
    return (t >= 9 * 60 + 15 && t <= 11 * 60 + 30) || (t >= 13 * 60 && t <= 15 * 60);
  }

  function loop() {
    fetchTx(update);
    setTimeout(loop, isTrading() ? 8000 : 60000);
  }

  buildTicker();
  buildList();
  loop();
})();
