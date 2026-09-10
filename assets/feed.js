/* ============================================================
 * 小站财经 — 实时头条（新浪滚动新闻 JSONP，免 CORS，国内直连）
 * 加载后用真实数据覆盖 window.NEWS 的首屏区块；失败则保留 news-data.js 静态兜底。
 * 图片字段在 it.img.u（http://），统一转 https 避免混合内容拦截。
 * ============================================================ */
(function () {
  'use strict';
  var LID = '2510';   // 新浪「财经」滚动栏目
  var NUM = 30;

  function imgOf(it) {
    var im = it && it.img;
    if (im && typeof im === 'object' && im.u) return im.u.replace(/^http:/, 'https:');
    if (Array.isArray(im) && im[0] && im[0].u) return im[0].u.replace(/^http:/, 'https:');
    if (it && typeof it.images === 'string' && /^https?:/.test(it.images)) return it.images.replace(/^http:/, 'https:');
    return '';
  }

  function build(N, data) {
    var list = (data && data.result && data.result.data) || [];
    if (!list.length) return false;
    var withImg = list.filter(function (it) { return imgOf(it); });

    N.yaowen = list.slice(0, 10).map(function (it) {
      return { t: it.title || '', u: it.url || '#' };
    });

    if (withImg.length) {
      var h = withImg[0];
      N.headline = {
        title: h.title || (N.headline && N.headline.title) || '',
        summary: (h.intro || h.summary || '').slice(0, 90) || (N.headline && N.headline.summary) || '',
        img: imgOf(h),
        links: h.url ? [{ t: '查看原文', u: h.url }] : (N.headline && N.headline.links) || []
      };
    }

    N.featured = withImg.slice(0, 6).map(function (it) {
      return { cat: it.media_name || '财经', t: it.title || '', u: it.url || '#', img: imgOf(it) };
    });
    N.gallery = withImg.slice(6, 10).map(function (it) {
      return { t: it.title || '', u: it.url || '#', img: imgOf(it) };
    });
    N.ranking = list.slice(0, 10).map(function (it, n) {
      var c = it.comment_total ? Math.round(70 + Math.min(28, Math.log10((it.comment_total || 1) + 1) * 10)) : (98 - n * 4);
      return { t: it.title || '', u: it.url || '#', hot: c };
    });
    return true;
  }

  window.sinaFeedCB = function (data) {
    try {
      var N = window.NEWS;
      if (build(N, data) && window.renderNews) window.renderNews();
    } catch (e) { /* 静默：保留静态兜底 */ }
  };

  var s = document.createElement('script');
  s.src = 'https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=' + LID + '&num=' + NUM + '&page=1&callback=sinaFeedCB';
  s.onerror = function () { /* 网络失败：保留静态数据 */ };
  document.head.appendChild(s);
  setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 10000);
})();
