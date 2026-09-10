/* ============================================================
 * 股票自选小窗
 * 纯前端、零后端：行情通过「script 标签注入」绕过 CORS
 *   主源：腾讯 qt.gtimg.cn（读全局变量 v_<code>，无需 Referer）
 *   兜底：东方财富 push2 JSONP（secid 批量，仅主源缺失时触发）
 * 自选股存 localStorage，可自定义编辑。红涨绿跌。
 * ============================================================ */
(function () {
  'use strict';
  var KEY = 'stock_watchlist_v1';
  var DEFAULT = ['sh000001', 'sz399001', 'sz399006', 'sh600519', 'sz300750', 'sz002594', 'hk00700'];
  var body = document.getElementById('stock-body');
  var statusEl = document.getElementById('stock-status');

  function getCodes() {
    try {
      var s = localStorage.getItem(KEY);
      if (s) { var a = JSON.parse(s); if (Array.isArray(a) && a.length) return a; }
    } catch (e) {}
    return DEFAULT.slice();
  }
  function setCodes(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }

  function isIndex(code) { return /^(sh000001|sz399001|sz399006|sh000300|sz399905)$/.test(code); }

  /* 主源：腾讯 script 注入 */
  function fetchTx(codes) {
    return new Promise(function (res) {
      var done = false, s = document.createElement('script');
      s.src = 'https://qt.gtimg.cn/q=' + codes.join(',');
      function finish(ok, missing) {
        if (done) return; done = true;
        if (s.parentNode) s.parentNode.removeChild(s);
        res({ ok: ok, missing: missing });
      }
      s.onload = function () {
        var ok = [], missing = [];
        codes.forEach(function (c) {
          var raw = window['v_' + c];
          if (raw && raw.indexOf('~') > 0) {
            var f = raw.split('~');
            var price = parseFloat(f[3]), prev = parseFloat(f[4]);
            if (price > 0 && prev > 0) ok.push({ code: c, name: f[1] || c, price: price, prevClose: prev });
            else missing.push(c);
          } else missing.push(c);
        });
        finish(ok, missing);
      };
      s.onerror = function () { finish([], codes.slice()); };
      document.head.appendChild(s);
      setTimeout(function () { finish([], codes.slice()); }, 6000);
    });
  }

  /* 兜底：东方财富 JSONP 批量 */
  function toSecid(code) {
    var m = code.match(/^(sh|sz|bj|hk)(\d+)$/i);
    if (!m) return null;
    var p = m[1].toLowerCase(), num = m[2];
    if (p === 'sh') return '1.' + num;
    if (p === 'sz' || p === 'bj') return '0.' + num;
    if (p === 'hk') return '116.' + num;
    return null;
  }
  function fetchEm(codes) {
    return new Promise(function (res) {
      var secids = codes.map(toSecid).filter(Boolean);
      if (!secids.length) { res([]); return; }
      var done = false;
      var cb = '_emcb' + Date.now() + Math.floor(Math.random() * 1e5);
      var s = document.createElement('script');
      var url = 'https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f43,f57,f58,f60,f169&secids=' + secids.join(',') + '&cb=' + cb;
      window[cb] = function (data) {
        if (done) return; done = true;
        var diff = (data && data.data && data.data.diff) || [];
        var out = diff.map(function (d) {
          var num = String(d.f57);
          var code = codes.filter(function (c) { return c.slice(2) === num; })[0] || ('sh' + num);
          return { code: code, name: d.f58 || code, price: +(d.f43 || 0), prevClose: +(d.f60 || 0) };
        }).filter(function (x) { return x.price > 0; });
        delete window[cb];
        if (s.parentNode) s.parentNode.removeChild(s);
        res(out);
      };
      s.onerror = function () { if (done) return; done = true; delete window[cb]; if (s.parentNode) s.parentNode.removeChild(s); res([]); };
      s.src = url;
      document.head.appendChild(s);
      setTimeout(function () { if (done) return; done = true; delete window[cb]; if (s.parentNode) s.parentNode.removeChild(s); res([]); }, 6000);
    });
  }

  function fmtTime(d) {
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }

  function render(stocks) {
    if (!stocks.length) { body.innerHTML = '<div class="loading">暂无数据，点「编辑」添加股票代码</div>'; return; }
    var html = '<table class="stock-table"><thead><tr><th>名称 / 代码</th><th>最新价</th><th>涨跌幅</th></tr></thead><tbody>';
    stocks.forEach(function (s) {
      var chg = (s.price - s.prevClose) / s.prevClose * 100;
      var cls = chg > 0 ? 'up' : (chg < 0 ? 'down' : 'flat');
      var arrow = chg > 0 ? '▲' : (chg < 0 ? '▼' : '—');
      var idxCls = isIndex(s.code) ? ' idx' : '';
      html += '<tr class="' + idxCls + '">'
        + '<td class="name"><b>' + esc(s.name) + '</b> <small>' + s.code.toUpperCase() + '</small></td>'
        + '<td class="' + cls + '">' + s.price.toFixed(2) + '</td>'
        + '<td class="' + cls + '">' + arrow + ' ' + Math.abs(chg).toFixed(2) + '%</td>'
        + '</tr>';
    });
    html += '</tbody></table>';
    body.innerHTML = html;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function setStatus(t) { if (statusEl) statusEl.textContent = t; }

  function refresh() {
    setStatus('刷新中…');
    var codes = getCodes();
    fetchTx(codes).then(function (r) {
      if (r.missing.length) return fetchEm(r.missing).then(function (em) { return r.ok.concat(em); });
      return r.ok;
    }).then(function (merged) {
      merged.sort(function (a, b) { return codes.indexOf(a.code) - codes.indexOf(b.code); });
      var finalList = merged.filter(function (s) { return codes.indexOf(s.code) >= 0; });
      render(finalList);
      setStatus('更新于 ' + fmtTime(new Date()) + (isTrading() ? '（交易中）' : '（非交易时段）'));
    }).catch(function (e) {
      setStatus('刷新失败：' + (e && e.message || e));
    });
  }

  function isTrading() {
    var n = new Date(), d = n.getDay(), h = n.getHours(), m = n.getMinutes();
    if (d === 0 || d === 6) return false;
    var t = h * 60 + m;
    return (t >= 9 * 60 + 15 && t <= 11 * 60 + 30) || (t >= 13 * 60 && t <= 15 * 60);
  }
  function loop() {
    refresh();
    setTimeout(loop, isTrading() ? 8000 : 60000);
  }

  /* 编辑弹窗 */
  function openEdit() {
    document.getElementById('edit-codes').value = getCodes().join('\n');
    document.getElementById('edit-modal').style.display = 'flex';
  }
  function closeEdit() { document.getElementById('edit-modal').style.display = 'none'; }
  function saveEdit() {
    var v = document.getElementById('edit-codes').value || '';
    var codes = v.split(/[\s,，;；]+/).map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean)
      .filter(function (c) { return /^(sh|sz|bj|hk)\d{4,6}$/.test(c); });
    if (!codes.length) { alert('没有有效代码，格式如 sh600519 / sz300750 / hk00700'); return; }
    codes = Array.from(new Set(codes));
    setCodes(codes);
    closeEdit();
    refresh();
  }

  window.doSearch = function () {
    var q = document.getElementById('search-input').value.trim();
    if (!q) return false;
    var m = q.match(/\b\d{6}\b/);
    var url = m
      ? 'https://finance.sina.com.cn/realstock/company/sh' + m[0] + '/nc.shtml'
      : 'https://finance.sina.com.cn/realstock/search?q=' + encodeURIComponent(q);
    window.open(url, '_blank');
    return false;
  };

  document.getElementById('btn-edit').addEventListener('click', openEdit);
  document.getElementById('btn-refresh').addEventListener('click', refresh);
  document.getElementById('btn-save').addEventListener('click', saveEdit);
  document.getElementById('btn-cancel').addEventListener('click', closeEdit);
  document.getElementById('edit-modal').addEventListener('click', function (e) { if (e.target === this) closeEdit(); });

  (function () {
    var d = new Date();
    var wk = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    var el = document.getElementById('today-date');
    if (el) el.textContent = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 星期' + wk;
  })();

  loop();
})();
