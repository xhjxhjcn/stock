/* ============================================================
 * 左侧财经头条数据
 * 纯静态示例，可自行替换为真实 RSS / 接口数据。
 * 结构：
 *   window.NEWS = {
 *     headline: { title, summary, links:[{t, u}] },
 *     blocks: [ { cat:'栏目名', items:[ {t:'标题', u:'链接', d:'日期'} ] }, ... ]
 *   }
 * 想接真实新闻：把本文件改成 fetch 某 RSS/JSONP 后给 window.NEWS 赋值即可。
 * ============================================================ */
window.NEWS = {
  headline: {
    title: "A股三大指数震荡收评，结构性行情延续",
    summary: "今日市场呈现板块快速轮动特征，资金围绕政策主线与业绩确定性展开博弈，成交量较前一交易日小幅放量。",
    links: [
      { t: "盘后机构观点汇总", u: "https://finance.sina.com.cn" },
      { t: "北向资金今日动向", u: "https://data.eastmoney.com/hsgt/" },
      { t: "明日申购新股一览", u: "https://data.eastmoney.com/xg/xg/default.html" }
    ]
  },
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
    }
  ]
};
