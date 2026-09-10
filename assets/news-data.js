/* ============================================================
 * 星瀚财经 — 新闻/聚合数据（纯静态示例，可自行接 RSS / 接口）
 * 渲染见 news.js；缩略图由 assets/thumb.js 的 makeThumb 生成。
 *
 * 字段说明：
 *   headline : 头条大图（img = {hue, kind, label}）
 *   yaowen   : 要闻（纯文字密集列表，无图）
 *   featured : 图文卡片（带图，3 个一排）
 *   gallery  : 图片新闻（带图，横排）
 *   blocks   : 栏目文字列表（左/中栏下部）
 *   ranking  : 头条榜（带热度）
 *   calendar : 财经日历
 * 想接真实新闻：把本文件改成 fetch 某 RSS/JSONP 后给 window.NEWS 赋值即可。
 * ============================================================ */
window.NEWS = {
  headline: {
    title: "A股三大指数震荡收评，结构性行情延续",
    summary: "今日市场呈现板块快速轮动特征，资金围绕政策主线与业绩确定性展开博弈，两市成交额较前一交易日小幅放量，北向资金午后回流。",
    img: 'https://n.sinaimg.cn/finance/transform/186/w702h284/20260910/cdcb-0b1cc8daf4616993594c2f6e668e39dc.png',
    links: [
      { t: "盘后机构观点汇总", u: "https://finance.sina.com.cn" },
      { t: "北向资金今日动向", u: "https://data.eastmoney.com/hsgt/" },
      { t: "明日申购新股一览", u: "https://data.eastmoney.com/xg/xg/default.html" }
    ]
  },

  /* 要闻：纯文字，密集两栏 */
  yaowen: [
    { t: "央行公开市场开展逆回购操作，维护流动性合理充裕", u: "https://www.pbc.gov.cn" },
    { t: "8月CPI、PPI数据点评：物价总体平稳，核心通胀温和", u: "https://www.stats.gov.cn" },
    { t: "国常会部署稳增长一揽子政策举措，强调靠前发力", u: "https://www.gov.cn" },
    { t: "证监会：持续强化上市公司信息披露监管与执法", u: "https://www.csrc.gov.cn" },
    { t: "两市成交额突破万亿，赚钱效应有所回暖", u: "https://stockapp.finance.qq.com" },
    { t: "ETF市场持续扩容，宽基产品受中长期资金青睐", u: "https://fund.eastmoney.com" },
    { t: "两融余额回升，杠杆资金风险偏好改善", u: "https://data.eastmoney.com" },
    { t: "个人养老金基金再扩容，Y份额选择增多", u: "https://fund.eastmoney.com" }
  ],

  /* 图文卡片：3 个一排 */
  featured: [
    { cat: "证券市场", t: "成交额重回万亿，结构性机会在哪", u: "https://stockapp.finance.qq.com", img: 'https://n.sinaimg.cn/finance/transform/162/w550h412/20260910/999e-fb8ce067ba961598bbb12389a7b9dc99.jpg' },
    { cat: "公司产业", t: "半导体国产化加速，设备材料迎机遇", u: "https://stock.finance.sina.com.cn", img: 'https://n.sinaimg.cn/finance/transform/162/w550h412/20260910/93c5-98b038b53727ca683031e45a0c303c90.jpg' },
    { cat: "基金理财", t: "权益基金发行回暖，主动管理受关注", u: "https://fund.eastmoney.com", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0910%2F9ae800d1p00tl4l8x003oc0007s003wc.png' },
    { cat: "宏观政策", t: "8月物价数据点评：温和复苏延续", u: "https://www.stats.gov.cn", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0910%2Fa4538f31j00tl3y8e00auc000s600e3c.jpg' },
    { cat: "国际财经", t: "美联储表态偏鹰，美债收益率上行", u: "https://finance.sina.com.cn/usstock/", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0909%2F0dc59eadp00tl3tky004yc000s600e3c.png' },
    { cat: "房产汽车", t: "新能源车8月交付亮眼，以旧换新加码", u: "https://auto.qq.com", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0909%2Ff8c595d3p00tl3bic0075c000s600e3c.png' }
  ],

  /* 图片新闻：横排缩略图 */
  gallery: [
    { t: "直击上市公司业绩说明会", u: "https://finance.sina.com.cn", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0910%2F20be9e43p00tl4p8c007kc000s600e3c.png' },
    { t: "交易所交易大厅见闻", u: "https://stockapp.finance.qq.com", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0909%2F2397ea8fj00tl2r2n01lcc000s600e3c.jpg' },
    { t: "产业调研：龙头工厂产线", u: "https://stock.finance.sina.com.cn", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0908%2F59c5c4ecp00tl19uj01a8c0009c0070c.png' },
    { t: "财富管理论坛聚焦长期资金", u: "https://fund.eastmoney.com", img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2026%2F0903%2Ff6196d03j00tks7k1001zd000zk00k0m.jpg' }
  ],

  /* 栏目文字列表 */
  blocks: [
    {
      cat: "宏观政策",
      items: [
        { t: "央行公开市场开展逆回购操作，维护流动性合理充裕", u: "https://www.pbc.gov.cn", d: "09-10" },
        { t: "8月CPI、PPI数据点评：物价总体平稳", u: "https://www.stats.gov.cn", d: "09-10" },
        { t: "国常会部署稳增长一揽子政策举措", u: "https://www.gov.cn", d: "09-09" },
        { t: "发改委：加快推进重大项目建设进度", u: "https://www.ndrc.gov.cn", d: "09-09" },
        { t: "多部门联合发文支持民营经济发展", u: "https://www.gov.cn", d: "09-08" }
      ]
    },
    {
      cat: "证券市场",
      items: [
        { t: "两市成交额突破万亿，赚钱效应有所回暖", u: "https://stockapp.finance.qq.com", d: "09-10" },
        { t: "证监会：持续强化上市公司信息披露监管", u: "https://www.csrc.gov.cn", d: "09-10" },
        { t: "新股申购提示：本周共x只新股发行", u: "https://data.eastmoney.com", d: "09-10" },
        { t: "ETF市场持续扩容，宽基产品受青睐", u: "https://fund.eastmoney.com", d: "09-09" },
        { t: "两融余额回升，杠杆资金情绪改善", u: "https://data.eastmoney.com", d: "09-09" }
      ]
    },
    {
      cat: "公司产业",
      items: [
        { t: "新能源产业链景气度分化，龙头业绩韧性强", u: "https://finance.sina.com.cn", d: "09-10" },
        { t: "半导体国产化进程加速，设备材料迎机遇", u: "https://stock.finance.sina.com.cn", d: "09-10" },
        { t: "白酒板块估值修复，次高端表现亮眼", u: "https://stockapp.finance.qq.com", d: "09-09" },
        { t: "医药集采常态化，创新药出海成看点", u: "https://stock.finance.sina.com.cn", d: "09-09" },
        { t: "地产链边际改善，建材家居需求回暖", u: "https://www.fang.com", d: "09-08" }
      ]
    },
    {
      cat: "基金理财",
      items: [
        { t: "权益基金发行回暖，主动管理受关注", u: "https://fund.eastmoney.com", d: "09-10" },
        { t: "债基稳健配置价值凸显，机构增配明显", u: "https://fund.eastmoney.com", d: "09-09" },
        { t: "ETF抄底资金持续净流入", u: "https://fund.eastmoney.com", d: "09-09" },
        { t: "个人养老金基金扩容，Y份额选择增多", u: "https://fund.eastmoney.com", d: "09-08" }
      ]
    },
    {
      cat: "国际财经",
      items: [
        { t: "美联储官员表态偏鹰，美债收益率上行", u: "https://finance.sina.com.cn/usstock/", d: "09-10" },
        { t: "国际油价震荡，地缘因素扰动供给预期", u: "https://finance.sina.com.cn", d: "09-10" },
        { t: "美元指数走强，新兴市场汇率承压", u: "https://www.chinamoney.com.cn", d: "09-09" },
        { t: "欧央行利率决议临近，市场观望情绪浓", u: "https://finance.sina.com.cn", d: "09-09" }
      ]
    },
    {
      cat: "房产汽车",
      items: [
        { t: "多地优化限购政策，楼市成交边际改善", u: "https://www.fang.com", d: "09-10" },
        { t: "新能源汽车8月交付数据亮眼", u: "https://auto.qq.com", d: "09-10" },
        { t: "以旧换新补贴加码，车市旺季可期", u: "https://auto.qq.com", d: "09-09" },
        { t: "保障性住房建设稳步推进", u: "https://www.fang.com", d: "09-08" }
      ]
    },
    {
      cat: "科技前沿",
      items: [
        { t: "AI大模型迭代加速，应用落地成竞争焦点", u: "https://tech.qq.com", d: "09-10" },
        { t: "算力基建投资升温，液冷方案受关注", u: "https://tech.qq.com", d: "09-09" },
        { t: "人形机器人量产预期升温，产业链受益", u: "https://tech.qq.com", d: "09-08" }
      ]
    },
    {
      cat: "理财观察",
      items: [
        { t: "银行理财净值修复，固收+策略受宠", u: "https://money.163.com", d: "09-10" },
        { t: "黄金高位震荡，避险需求仍存", u: "https://www.chinamoney.com.cn", d: "09-09" },
        { t: "同业存单指数基金成现金管理新选择", u: "https://fund.eastmoney.com", d: "09-08" }
      ]
    }
  ],

  /* 头条榜（带热度 0~100） */
  ranking: [
    { t: "A股三大指数震荡收评，结构性行情延续", u: "https://finance.sina.com.cn", hot: 98 },
    { t: "两市成交额重回万亿，增量资金从哪来", u: "https://stockapp.finance.qq.com", hot: 92 },
    { t: "半导体国产化加速，设备材料迎机遇", u: "https://stock.finance.sina.com.cn", hot: 88 },
    { t: "北向资金午后回流，加仓这些方向", u: "https://data.eastmoney.com/hsgt/", hot: 85 },
    { t: "央行逆回购呵护流动性，资金面平稳", u: "https://www.pbc.gov.cn", hot: 80 },
    { t: "新能源龙头业绩韧性强，估值待修复", u: "https://finance.sina.com.cn", hot: 76 },
    { t: "个人养老金基金扩容，长期资金入市提速", u: "https://fund.eastmoney.com", hot: 71 },
    { t: "美联储偏鹰表态，美债收益率上行", u: "https://finance.sina.com.cn/usstock/", hot: 66 },
    { t: "多地优化限购，楼市成交边际改善", u: "https://www.fang.com", hot: 60 },
    { t: "AI应用落地加速，算力基建投资升温", u: "https://tech.qq.com", hot: 55 }
  ],

  /* 财经日历 */
  calendar: [
    { d: "09-10", t: "8月社融、信贷数据公布" },
    { d: "09-11", t: "CPI、PPI 数据发布" },
    { d: "09-12", t: "央行 MLF 续作操作" },
    { d: "09-15", t: "8月工业增加值、固投、消费数据" },
    { d: "09-16", t: "70城房价指数发布" },
    { d: "09-19", t: "LPR 报价出炉" }
  ]
};
