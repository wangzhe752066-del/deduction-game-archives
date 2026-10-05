import type { CaseData } from '../../types'

/**
 * 档案 05《午夜才消失的画》——盗窃悬疑,核心机关:发现时间≠案发时间。
 * 真相(21:48 维护期间调包、"旧灯箱"装着画框、00:00 冷光下反光才露馅)
 * 只出现在推理确认语与结局文案中。
 */
export const caseGallery: CaseData = {
  id: 'case-gallery',
  title: '午夜才消失的画',
  meta: {
    order: 5,
    typeName: '盗窃 · 迟到的反光',
    oneLine: '闭馆后的画廊万无一失,画却在午夜零点后变成了印刷品。',
  },
  objective: '任务:查清 ① 画最可能是在什么时候被换走的 ② 谁有机会接触展柜 ③ 哪条证据推翻了「午夜作案」。',
  cctvHeader: '展厅监控 · 2026-10-09',
  clocks: { investigate: '00:12', deduce: '00:21', choice: '00:26', ending: '00:33' },
  choiceKicker: '00:26 · 经理在电话那头等你表态',
  tabs: [
    { id: 'cctv', label: '展厅监控', sub: 'CAM' },
    { id: 'receipts', label: '授权与系统', sub: 'SYS' },
    { id: 'floorplan', label: '展厅平面图', sub: 'MAP' },
    { id: 'phone', label: '工作群', sub: 'MSG' },
  ],
  systemView: {
    header: '展柜授权与系统日志',
    mainTab: '授权与警报',
    subTab: '系统流水',
    subNote: '※ 展柜开启分「授权开启」与「非法开启」,仅后者触发警报;灯光计划按系统时间自动执行。',
  },
  unlockDeductionAt: 7,

  prologue: [
    {
      time: '00:03',
      lines: [
        '夜巡第二圈,主展厅。你在《雾中灯塔》前停下脚步——不对。',
        '画面还是那个画面:雾、礁石、灯塔的光。可反光不对:太匀、太平,像蒙了一层塑料。',
      ],
    },
    {
      time: '00:04',
      lines: [
        '你凑近展柜,屏住呼吸。',
        '颜料没有笔触,色彩过渡的边缘是一圈细密的网点。',
        '展柜里这一幅——是印刷品。',
      ],
    },
    {
      time: '00:05',
      lines: [
        '你后退半步,脑子嗡了一声。',
        '闭馆门禁无异常,展柜警报全天未触发——所有人都会以为,画是「刚刚」被偷的。',
        '你在工作群里敲下这句话的时候,手指有点抖。',
      ],
    },
    {
      time: '00:06',
      lines: [
        '维护组 21:52 报过「照明维护完成」。你调出那段记忆:',
        '遮光布、警示带、推着维护车进出的两个人。还有一只抬上车的大箱子,他们说那是旧灯箱。',
      ],
    },
    {
      time: '00:07',
      lines: [
        '安保经理的电话打了进来:「监控和门禁都干净,那就是午夜作案。先按盗窃上报?」',
        '你握着手机,看着展柜里那片过分平整的反光,没有立刻答应。',
      ],
    },
    {
      time: '00:12',
      lines: [
        '先别急着下结论。',
        '画是什么时候被换的、谁碰过展柜、哪条证据说了实话——你要亲手把它们排成一列。',
      ],
    },
  ],

  clues: [
    { id: 'K1', title: '21:47 的授权', isKey: true, source: 'receipts',
      detail: '展柜授权日志:21:47:52 工牌 T-088(照明维护)合法开启主展柜,21:51:20 关闭。闭馆之后,再无任何开启记录。' },
    { id: 'K2', title: '大得反常的「灯箱」', isKey: true, source: 'cctv',
      detail: '21:48 监控:维护人员从展柜方向抬出一只「旧灯箱」——尺寸比灯具包装大一圈,棱角坚挺,四角有支撑。那形状,装得下一副带框的画。' },
    { id: 'K3', title: '重了 24 公斤', isKey: true, source: 'receipts',
      detail: '货梯地磅:维护车 21:40 进场 128kg,21:58 出场 152kg。回收旧灯具,不该让车变重。' },
    { id: 'K4', title: '00:00 的反光', isKey: true, source: 'cctv',
      detail: '00:00 灯光按计划切换冷色温后,展柜画面的反光变得均匀平板——印刷品的反光。之前没人发现,是因为灯还没切。' },
    { id: 'K5', title: '网点与笔触', isKey: true, source: 'floorplan',
      detail: '展柜里的「画」:颜料没有笔触,放大是规则网点;对照早班交接照片里的真迹——笔触有厚度,堆叠清晰。' },
    { id: 'N1', title: '全天零警报', isKey: false, source: 'receipts',
      detail: '主展柜震动/开启传感器今日零触发。原因很简单:授权开启不属于警报事件。' },
    { id: 'N2', title: '闭馆后无异常', isKey: false, source: 'phone',
      detail: '22:00 闭馆交接:门禁布防完成,展厅无滞留人员。此后到 00:03,门禁无任何记录。' },
    { id: 'N3', title: '发现时间', isKey: false, source: 'cctv',
      detail: '00:03:41 你在主展柜前放慢脚步、俯身、退后——这是「发现」的时间。发现≠案发。' },
    { id: 'N4', title: '灯光计划', isKey: false, source: 'floorplan',
      detail: '值班台的灯光计划表:00:00 由 3500K 暖光切换 5000K 冷光(安保模式)。反光的异常,从这一刻才开始显现。' },
    { id: 'N5', title: '「旧灯箱已回收」', isKey: false, source: 'phone',
      detail: '工作群 21:52 维护组:「今日照明维护完成,主展厅 6 组灯更换,旧灯箱 3 只已随车回收。」' },
    { id: 'N6', title: 'T-088 是谁', isKey: false, source: 'phone',
      detail: '维护排班:T-088 为外包照明组工牌,持有展柜开启授权(照明维护需要);同组的 T-091 无展柜授权。' },
  ],

  cctvClips: [
    { id: 'maint-arrive', cam: 'CAM-H 主展厅', time: '21:46:10', title: '维护车进场',
      scene: { bg: 'hall', doorLabel: '货运门', figure: { suit: 'worker', props: ['toolbox'], anim: 'inFromDoor' } },
      desc: '两名维护人员推着维护车进入主展厅,在展柜前拉起警示带、搭起遮光布。动作熟练,一切照旧。' },
    { id: 'maint-crate', cam: 'CAM-H 主展厅', time: '21:48:37', title: '抬出「旧灯箱」',
      scene: { bg: 'counter', counterLabel: '主展柜', figure: { suit: 'worker', props: ['crate'], anim: 'stand' } },
      desc: '遮光布后,一人从展柜方向抬出一只扁平的大箱,放上维护车,固定,盖布。看上去,和平时回收灯箱没什么两样。',
      zoomClueId: 'K2',
      zoom: { label: '放大箱体', text: '箱体比灯具包装大一圈,棱角坚挺,四角有支撑——那形状,更像装着一副带框的画。' } },
    { id: 'maint-leave', cam: 'CAM-H 主展厅', time: '21:52:03', title: '撤场',
      scene: { bg: 'hall', doorLabel: '货运门', figure: { suit: 'worker', props: ['crate'], anim: 'outDoor' } },
      desc: '遮光布撤下,警示带收起,维护车推走货运门。21:52,维护组在工作群报了「完成」。展柜看起来完好如初。' },
    { id: 'lights-switch', cam: 'CAM-H 主展厅', time: '00:00:00', title: '灯光切换',
      scene: { bg: 'counter', counterLabel: '主展柜', staticProp: 'painting' },
      desc: '整点,展厅灯光按计划切换色温,画面色调冷了下来。展柜里的反光,忽然变得又匀又平。',
      zoomClueId: 'K4',
      zoom: { label: '放大反光', text: '冷光下,画面反光均匀无层次——颜料该有的起伏和颗粒,一点都没有。' } },
    { id: 'guard-find', cam: 'CAM-H 主展厅', time: '00:03:41', title: '发现异常',
      scene: { bg: 'counter', counterLabel: '主展柜', figure: { suit: 'customer', anim: 'stand' } },
      desc: '你在展柜前放慢脚步,俯身,又直起身退了半步。下一秒,你掏出了手电。',
      clueId: 'N3' },
    { id: 'empty-hall', cam: 'CAM-H 主展厅', time: '22:00 - 00:00', title: '闭馆后的展厅',
      scene: { bg: 'hall', doorLabel: '货运门' },
      desc: '两个小时,展厅无人进入。监控、门禁、警报,一片干净。' },
  ],

  transactions: [
    { id: 't1', time: '21:47:52', summary: '展柜授权开启 · T-088', amount: '合法',
      detail: '工牌 T-088(外包照明组)开启主展柜,授权范围:照明维护(当日有效)。21:51:20 关闭。今日全馆仅此一次展柜开启。',
      clueId: 'K1' },
    { id: 't2', time: '全天', summary: '展柜警报', amount: '0 次触发',
      detail: '主展柜震动/开启传感器今日无警报。授权开启不属于警报事件。',
      clueId: 'N1' },
    { id: 't3', time: '21:40 / 21:58', summary: '货梯地磅', amount: '128 → 152 kg',
      detail: '维护车 21:40:12 进场称重 128kg;21:58:47 出场称重 152kg。净增 24kg。回收的旧灯箱和工具,不该有这么重。',
      clueId: 'K3' },
    { id: 't4', time: '今晚', summary: '闭馆门禁', amount: '无异常',
      detail: '22:00 闭馆布防后至 00:03,展厅与货运门无任何门禁记录。' },
    { id: 't5', time: '00:00:00', summary: '灯光计划执行', amount: '3500K → 5000K',
      detail: '按闭馆安保模式,展厅照明自动切换冷色温。此后监控画面的对比度与反光特征发生变化。' },
  ],

  deliveryLog: [
    { time: '21:40:12', text: '货梯:B1 → 展厅,维护车(128kg)' },
    { time: '21:46:10', text: '主展厅:维护组进入(2 人,T-088 / T-091)' },
    { time: '21:47:52', text: '主展柜:授权开启(T-088)' },
    { time: '21:51:20', text: '主展柜:关闭' },
    { time: '21:52:03', text: '维护组:撤场' },
    { time: '21:58:47', text: '货梯:展厅 → B1,维护车(152kg)' },
    { time: '22:00:00', text: '闭馆,门禁布防' },
    { time: '00:00:00', text: '灯光计划:色温切换(安保模式)' },
    { time: '00:03:41', text: '值班员在主展柜前停留(行为识别)' },
  ],

  threads: [
    {
      id: 'th-group', name: '展馆工作群', tag: '', preview: '旧灯箱已回收',
      clueIds: ['N5', 'N2'],
      messages: [
        { id: 'g1', from: '维护组', time: '21:52', text: '今日照明维护完成,主展厅 6 组灯更换,旧灯箱 3 只已随车回收。' },
        { id: 'g2', from: '早班·陈姐', time: '22:00', text: '闭馆交接:门禁布防完成,展厅无滞留人员。' },
        { id: 'g3', from: '你', time: '00:05', text: '主展柜的画不对。反光很怪,像印刷品。已拍照,大家先不要动展柜。' },
        { id: 'g4', from: '安保经理', time: '00:06', text: '监控门禁都干净?那就是闭馆后的事。先按盗窃流程报?' },
      ],
    },
    {
      id: 'th-schedule', name: '维护排班', tag: '', preview: 'T-088 · 照明组',
      clueIds: ['N6'],
      messages: [
        { id: 's1', from: '系统', time: '本周', text: '本周照明维护:外包照明组 2 人。', isSystem: true },
        { id: 's2', from: '系统', time: '本周', text: 'T-088:持展柜开启授权(照明维护需要);T-091:无展柜授权。', isSystem: true },
      ],
    },
    {
      id: 'th-manager', name: '安保经理', tag: '', preview: '先按盗窃报?',
      clueIds: [],
      messages: [
        { id: 'm1', from: '安保经理', time: '00:07', text: '闭馆后门禁警报全干净,那就是午夜作案。先按盗窃上报?' },
        { id: 'm2', from: '安保经理', time: '00:10', text: '回收站的清运是每周五早上。要动什么,得赶在之前。' },
      ],
    },
  ],

  hotspots: [
    { id: 'main-case', label: '主展柜', x: 36, y: 10, w: 28, h: 16, clueId: 'K5',
      desc: '贴着玻璃看:颜料没有笔触,高光过渡的边缘是规则网点。对照早班交接照片里的真迹——笔触有厚度,堆叠清晰。柜里这幅,是印刷品。' },
    { id: 'duty-desk', label: '值班台', x: 36, y: 42, w: 24, h: 14, clueId: 'N4',
      desc: '值班台的灯光计划表:00:00,色温 3500K→5000K(安保模式)。反光的异常,是从这一刻才开始显现的。' },
    { id: 'freight', label: '货梯 · 地磅', x: 66, y: 42, w: 26, h: 14,
      desc: '货运门与货梯口。地磅数据在系统日志里:今晚进出,相差 24 公斤。' },
    { id: 'side-case', label: '侧展柜(临展)', x: 10, y: 10, w: 20, h: 16,
      desc: '侧展柜今晚未开启,展品完好。它们的灯,也一起换过了。' },
  ],

  floorPlan: {
    w: 100,
    h: 70,
    rects: [
      { x: 5, y: 5, w: 90, h: 60, kind: 'room' },
      { x: 36, y: 12, w: 26, h: 14, kind: 'accent', label: '主展柜' },
      { x: 10, y: 12, w: 20, h: 14, kind: 'room', label: '侧展柜', sub: true },
      { x: 68, y: 12, w: 20, h: 14, kind: 'room', label: '侧展柜', sub: true },
      { x: 28, y: 34, w: 12, h: 3, kind: 'shelf' },
      { x: 58, y: 34, w: 12, h: 3, kind: 'shelf' },
      { x: 10, y: 42, w: 22, h: 14, kind: 'room', label: '维护通道', sub: true },
      { x: 36, y: 42, w: 24, h: 14, kind: 'room', label: '值班台' },
      { x: 66, y: 42, w: 26, h: 14, kind: 'room', label: '货梯 · 地磅', sub: true },
    ],
    lines: [],
    texts: [
      { x: 50, y: 32, text: '观众区', kind: 'sub', anchor: 'middle' },
      { x: 49, y: 30, text: '你', kind: 'sub' },
    ],
    dots: [
      { x: 47, y: 29, r: 1.5, kind: 'you' },
    ],
    legend: '虚线框 = 可点击调查 · 橙色区 = 主展柜',
  },

  questions: [
    {
      id: 'q1', prompt: '推理一:画最可能是在什么时候被换走的?',
      options: [
        { id: 'a', text: '午夜前后,闭馆之后',
          hint: '闭馆后门禁、警报、监控三样全净——「午夜作案」恰恰是最说不通的一种可能。' },
        { id: 'b', text: '21:48 前后的照明维护期间', correct: true },
        { id: 'c', text: '闭馆前的最后一批观众里',
          hint: '观众动不了展柜:开启需要授权,而今天全馆只有一次授权开启记录。' },
        { id: 'd', text: '00:00 灯光切换的瞬间',
          hint: '灯光切换开不了展柜的门。00:00 只是「被看见」的时间。' },
      ],
      confirmed: '全馆唯一一次展柜开启在 21:47-21:51;抬出的「灯箱」装得下画框;出场时维护车重了 24 公斤——案发在维护,不在午夜。',
    },
    {
      id: 'q2', prompt: '推理二:谁有机会接触展柜?',
      options: [
        { id: 'a', text: '值班员(你)',
          hint: '你没有展柜授权,今天也没有你的开启记录。' },
        { id: 'b', text: '持授权的照明维护人员(T-088)', correct: true },
        { id: 'c', text: '早班保安',
          hint: '授权日志里今天只有一次开启,工牌是 T-088。' },
        { id: 'd', text: '混进观众里的高手',
          hint: '展柜开启是物理授权记录,不是谁都能碰——今天碰过的工牌只有一个。' },
      ],
      confirmed: 'T-088 持有合法授权,也只有他的工牌在 21:47 打开过展柜。「有机会」是证据说的;要不要「定罪」,还得看证据链闭不闭合。',
    },
    {
      id: 'q3', prompt: '推理三:哪条证据推翻了「午夜作案」的判断?',
      options: [
        { id: 'a', text: '闭馆门禁无异常',
          hint: '它只说明「午夜没人进来」,却解释不了画为什么在午夜之前就已是印刷品。' },
        { id: 'b', text: '00:00 色温切换后,反光才变', correct: true },
        { id: 'c', text: '展柜警报没有响',
          hint: '警报没响恰恰因为开启「合法」——它反而支持了白天调包。' },
        { id: 'd', text: '你在 00:03 才巡到主展柜',
          hint: '巡馆时间只说明「你什么时候看见」,不说明「画什么时候被换」。' },
      ],
      confirmed: '00:00 切换冷光,印刷品的反光才露出马脚——也就是说,午夜之前,画早就不是真迹了。「午夜失窃」这个前提,从光线上就被推翻了。',
    },
  ],

  endings: [
    {
      id: 'preserve', title: '结局一 · 完整的链条', subtitle: '你选择保全记录并报告',
      body: [
        '你封存了全套记录:授权日志、地磅数据、监控副本、灯光计划,外加展柜里那张印刷品的特写。报告里只有事实和时间。',
        '「午夜之前,画就已经不是真的了。」你把这句话放在第一行。',
        '警方按 21:47-21:58 的窗口精准布控。次日上午,回收站的三只「旧灯箱」被截获——其中一只的夹层里,是《雾中灯塔》。',
        '真迹回归那天,展厅换了新的灯光方案。冷光下,谁也藏不住。',
      ],
    },
    {
      id: 'midnight', title: '结局二 · 干净的午夜', subtitle: '你只盯住闭馆后的录像',
      body: [
        '你和同事把 22:00 到 00:03 的录像一帧帧翻完——空展厅,干净得让人发冷。',
        '天亮时你才想起白天的维护单和那只「旧灯箱」。回收站的清运车,已经按班次开走了。',
        '印刷品还躺在展柜里,反光平平的,像在嘲笑每一个只盯着午夜的人。',
        '案子最后挂了起来。报告的结论一行字:「闭馆后无入侵迹象。」——它没说错,只是什么也没说。',
      ],
    },
    {
      id: 'early', title: '结局三 · 太早的名字', subtitle: '你选择公开指认',
      body: [
        '你在工作群点名了照明组:「画是维护的时候换的,查 T-088。」',
        '半小时后,对方回了一个「?」,随即失联。',
        '次日,回收站的出入记录被「例行清理」,三只灯箱下落不明。你手里只剩系统日志可以慢慢磨。',
        '复盘会上,安保经理把你的报告推回来,指了指被划掉的那行名字:「证据钉死之前,名字留在心里。」',
      ],
    },
  ],
}
