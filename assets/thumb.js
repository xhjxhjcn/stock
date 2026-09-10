/* ============================================================
 * 内联 SVG 缩略图生成器（零外部依赖，保证图片一定能显示）
 *   window.makeThumb(hue, kind, label)
 *     hue  : 色相 0~360
 *     kind : chart | building | globe | coin | tech | news
 *     label: 左下角小标签（栏目名，可空）
 * 返回 data:image/svg+xml 的 URI，直接当 <img src> 用。
 * ============================================================ */
(function () {
  'use strict';
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function body(kind, hue) {
    if (kind === 'chart') {
      return '<polyline points="12,128 64,108 110,118 168,78 226,96 288,52" fill="none" stroke="rgba(255,255,255,.92)" stroke-width="3" stroke-linejoin="round"/>'
        + '<line x1="12" y1="150" x2="288" y2="150" stroke="rgba(255,255,255,.30)" stroke-width="1"/>';
    }
    if (kind === 'building') {
      return '<g fill="rgba(255,255,255,.88)">'
        + '<rect x="28" y="72" width="42" height="98"/><rect x="86" y="42" width="52" height="128"/>'
        + '<rect x="158" y="92" width="40" height="78"/><rect x="216" y="58" width="48" height="112"/></g>';
    }
    if (kind === 'globe') {
      return '<circle cx="150" cy="90" r="60" fill="none" stroke="rgba(255,255,255,.92)" stroke-width="2.5"/>'
        + '<ellipse cx="150" cy="90" rx="26" ry="60" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/>'
        + '<line x1="88" y1="90" x2="212" y2="90" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/>'
        + '<line x1="92" y1="58" x2="208" y2="58" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>'
        + '<line x1="92" y1="122" x2="208" y2="122" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>';
    }
    if (kind === 'coin') {
      return '<circle cx="150" cy="90" r="54" fill="rgba(255,255,255,.94)"/>'
        + '<text x="150" y="110" font-size="50" font-family="Arial" font-weight="700" fill="hsl(' + hue + ',58%,38%)" text-anchor="middle">¥</text>';
    }
    if (kind === 'tech') {
      return '<g stroke="rgba(255,255,255,.92)" stroke-width="2" fill="none">'
        + '<rect x="104" y="54" width="92" height="72" rx="7"/>'
        + '<line x1="150" y1="54" x2="150" y2="34"/><line x1="150" y1="126" x2="150" y2="146"/>'
        + '<line x1="104" y1="90" x2="84" y2="90"/><line x1="196" y1="90" x2="216" y2="90"/></g>'
        + '<circle cx="150" cy="90" r="11" fill="rgba(255,255,255,.96)"/>';
    }
    // news（默认）：几条文本占位线
    return '<g fill="rgba(255,255,255,.82)"><rect x="24" y="58" width="172" height="11" rx="3"/>'
      + '<rect x="24" y="82" width="214" height="11" rx="3"/><rect x="24" y="106" width="150" height="11" rx="3"/>'
      + '<rect x="24" y="130" width="196" height="11" rx="3"/></g>';
  }
  window.makeThumb = function (hue, kind, label) {
    hue = (typeof hue === 'number') ? hue : 205;
    var h2 = (hue + 35) % 360;
    var defs = '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
      + '<stop offset="0" stop-color="hsl(' + hue + ',60%,57%)"/>'
      + '<stop offset="1" stop-color="hsl(' + h2 + ',66%,37%)"/></linearGradient></defs>';
    var labelSvg = label
      ? '<text x="14" y="168" font-size="15" font-family="Microsoft YaHei, sans-serif" font-weight="700" fill="rgba(255,255,255,.95)">' + esc(label) + '</text>'
      : '';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 180" width="300" height="180">'
      + defs + '<rect width="300" height="180" fill="url(#g)"/>' + body(kind, hue) + labelSvg + '</svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  };
})();
