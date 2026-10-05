import type { CaseData } from '../../types'

/**
 * 档案 04《来自错误楼层的呼叫》——限时悬疑,核心机关:系统标签是否可信。
 * 真相(B2/B3 线路上周维修时插反、标签未更新;被困者是 B2 设备间的维修员)
 * 只出现在推理确认语与结局文案中。剧情保持紧迫感,但不做真实倒计时。
 */
export const caseIntercom: CaseData = {
  id: 'case-intercom',
  title: '来自错误楼层的呼叫',
  meta: {
    order: 4,
    typeName: '限时 · 说谎的标签',
    oneLine: '停电的车库里,对讲呼叫显示来自 B3——那里空无一人。',
  },
  objective: '任务:查清 ① 呼叫实际来自哪一层 ② 控制台为什么显示 B3 ③ 哪几条证据放在一起才能确认位置。',
  cctvHeader: '车库监控 · 2026-10-07',
  clocks: { investigate: '00:21', deduce: '00:27', choice: '00:31', ending: '00:36' },
  choiceKicker: '00:31 · 对讲可能还会响,也可能不会',
  tabs: [
    { id: 'cctv', label: '车库监控', sub: 'CAM' },
    { id: 'receipts', label: '对讲与门禁', sub: 'SYS' },
    { id: 'floorplan', label: '车库平面图', sub: 'MAP' },
    { id: 'phone', label: '消息', sub: 'MSG' },
  ],
  systemView: {
    header: '对讲与门禁系统',
    mainTab: '对讲记录',
    subTab: '系统流水',
    subNote: '※ 对讲录音与信号强度由系统自动记录;端口标签由人工张贴。',
  },
  unlockDeductionAt: 7,

  prologue: [
    {
      time: '00:12',
      lines: [
        '地下车库停电第七分钟。值班室里应急灯惨白。',
        '对讲台忽然响了。面板上跳着两个字符:B3。',
        '「门打不开……我在里面。」男声,喘息,背景里有规律的嗡鸣,像某种设备在一呼一吸。',
      ],
    },
    {
      time: '00:13',
      lines: [
        '你抓起手电呼叫备勤的老张:「B3 有人被困,快去!」',
        '监控切到 B3 通道:应急灯一排排灭着,画面里一个人影都没有。',
      ],
    },
    {
      time: '00:16',
      lines: [
        '对讲又响了。还是那个男声,声音发闷,混着金属敲击:',
        '「喂……听得到吗……」',
        '信号格比上一次,又低了一格。',
      ],
    },
    {
      time: '00:17',
      lines: [
        '老张在对讲里喊:「B3 我转了一圈,连个人影都没有!是不是系统抽风了?」',
        '面板上,「B3」两个字还固执地亮着。',
      ],
    },
    {
      time: '00:18',
      lines: [
        '你盯着那块小小的标签,忽然想起:上周,好像有人在配电井和对讲箱里施工过。',
        '停电、线路、标签——哪一环会撒谎?',
      ],
    },
    {
      time: '00:21',
      lines: [
        '第三次呼叫还没有来。',
        '在信号彻底消失之前,你得靠手上的记录,把这个人真正的位置找出来。',
      ],
    },
  ],

  clues: [
    { id: 'K1', title: '上周的维修单', isKey: true, source: 'phone',
      detail: '工单 #W-3341:上周三更换 B2/B3 对讲线路端子并「交叉测试」。跟进消息:「标签打印机坏了,新贴纸回头补。」——控制台沿用的仍是旧标签。' },
    { id: 'K2', title: '录音里的嗡鸣', isKey: true, source: 'receipts',
      detail: '00:12 呼叫录音背景:约每 3 秒一次的低频嗡鸣,节奏规律稳定——被困处附近有正在运行的设备。' },
    { id: 'K3', title: '风机的节拍', isKey: true, source: 'receipts',
      detail: 'B2 通风机房:2 号风机今晚 21:30 起间歇运行,启停周期约 3 秒;B3 风机房 23:00 起停机保养,今晚没有任何输出。' },
    { id: 'K4', title: '门禁不会说谎', isKey: true, source: 'receipts',
      detail: 'B3 今晚 23:00 后无任何门禁活动;B2 设备间 21:35 维修工牌 M-217 刷卡进入,至今没有外出记录。' },
    { id: 'K5', title: '第二次呼叫', isKey: true, source: 'receipts',
      detail: '00:16 呼叫:信号降至 -71dBm,声音发闷,混有金属敲击声——像是隔着很厚的门。被困者的状态在变差。' },
    { id: 'N1', title: '背工具包的人', isKey: false, source: 'cctv',
      detail: '监控 21:35:44:一名背着工具包的维修员刷卡打开 B2 设备间,进门后门在身后合拢。工牌:M-217。' },
    { id: 'N2', title: '计划停电', isKey: false, source: 'phone',
      detail: '停电通知群 23:55:「B1-B3 计划停电检修 00:00-01:00,请各岗位确认应急照明。」' },
    { id: 'N3', title: '没回来的工单', isKey: false, source: 'phone',
      detail: '派单:M-217 今夜 21:30 进入 B2 设备间巡检,预计 23:00 完成。系统已两次提醒:工单超时未确认收工。' },
    { id: 'N4', title: '空荡荡的 B3', isKey: false, source: 'cctv',
      detail: '监控 00:14:老张的手电扫过 B3 通道,车位空着,风机房铁门挂着「停机保养」的牌子。没有人。' },
    { id: 'N5', title: '不该有声音的机房', isKey: false, source: 'floorplan',
      detail: '平面图与现场一致:B3 风机房挂着「停机保养」牌——今晚它不该发出任何声音。录音里那阵嗡鸣,不是它。' },
    { id: 'N6', title: '很厚的门', isKey: false, source: 'floorplan',
      detail: 'B2 设备间是电磁隔离门,停电即自动落锁,门体很厚。隔着这样的门,声音会发闷,敲击声会迟一点传出来。' },
  ],

  cctvClips: [
    { id: 'duty-desk', cam: 'CAM-D 值班室', time: '00:12:07', title: '呼叫接入',
      scene: { bg: 'counter', counterLabel: '对讲控制台', figure: { suit: 'customer', anim: 'stand' } },
      desc: '你抓起话筒。面板上,「B3」两个字符闪着红光。听筒里是喘息声,和一阵规律的嗡鸣。',
      zoom: { label: '放大端口标签', text: 'CH-07 端口上贴着「B3」的打印贴纸,边缘翘起——像是贴过不止一层。' } },
    { id: 'maint-enter', cam: 'CAM-B2 走廊', time: '21:35:44', title: '进入设备间',
      scene: { bg: 'hall', doorLabel: '设备间', figure: { suit: 'worker', props: ['toolbox'], anim: 'inFromDoor' } },
      desc: '一名背着工具包的维修员刷卡打开 B2 设备间,进去后,门在身后合拢。',
      clueId: 'N1',
      zoom: { label: '放大工牌', text: '胸前工牌:外包维修 M-217。' } },
    { id: 'b3-empty', cam: 'CAM-B3 通道', time: '00:14:26', title: '搜索 B3',
      scene: { bg: 'hall', doorLabel: '风机房', figure: { suit: 'worker', anim: 'away' } },
      desc: '老张的手电扫过 B3 通道。车位列队沉默,风机房铁门上挂着「停机保养」的牌子。没有人。',
      clueId: 'N4' },
    { id: 'b2-quiet', cam: 'CAM-B2 走廊', time: '00:16 - 00:20', title: '无人经过的走廊',
      scene: { bg: 'hall', doorLabel: '设备间' },
      desc: 'B2 走廊的监控里,21:35 之后再也没有人影经过。设备间的门,从那时起一直关着。' },
  ],

  transactions: [
    { id: 't1', time: '00:12:07', summary: '呼叫接入 · 端口 CH-07', amount: '标签:B3',
      detail: '时长 21 秒。信号:-52dBm(良)。录音背景存在规律低频声,约每 3 秒一次。通话内容:「门打不开,我在里面。」',
      clueId: 'K2' },
    { id: 't2', time: '00:12:31', summary: '回拨 B3 分机', amount: '无人接听',
      detail: '值班室尝试回拨,振铃 30 秒无人接听。' },
    { id: 't3', time: '00:16:02', summary: '第二次呼叫 · 端口 CH-07', amount: '标签:B3',
      detail: '时长 9 秒。信号:-71dBm(弱),较上次下降近两格。声音发闷,混有金属敲击声。内容片段:「听得到吗……」',
      clueId: 'K5' },
    { id: 't4', time: '今晚', summary: '门禁摘要 · B3', amount: '23:00 后无活动',
      detail: 'B3 区域今晚最后一次门禁活动为 22:47(车主驶离)。此后再无任何刷卡或门磁记录。' },
    { id: 't5', time: '今晚', summary: '门禁摘要 · B2 设备间', amount: 'M-217 在内',
      detail: '21:35:44 维修工牌 M-217 刷卡进入 B2 设备间;截至目前无外出记录。设备间为电磁隔离门,停电自动落锁。',
      clueId: 'K4' },
    { id: 't6', time: '今晚', summary: '通风机房运行', amount: 'B2 运行 / B3 停机',
      detail: 'B2 通风机房:2 号风机自 21:30 起随设备间作业间歇运行,启停周期约 3 秒。B3 风机房:23:00 起停机保养,今晚无输出。',
      clueId: 'K3' },
  ],

  deliveryLog: [
    { time: '21:30:00', text: '派单:M-217 进入 B2 设备间巡检(预计 23:00 完成)' },
    { time: '21:35:44', text: '门禁:M-217 刷卡进入 B2 设备间' },
    { time: '23:00:00', text: 'B3 风机房:停机保养开始' },
    { time: '23:55:00', text: '群发:B1-B3 计划停电 00:00-01:00' },
    { time: '00:00:00', text: '停电开始;B2 设备间电磁门落锁' },
    { time: '00:12:07', text: '对讲:CH-07 呼叫接入(标签 B3)' },
    { time: '00:16:02', text: '对讲:CH-07 第二次呼叫,信号减弱' },
  ],

  threads: [
    {
      id: 'th-fix', name: '维修协作群', tag: '', preview: '贴纸回头补',
      clueIds: ['K1'],
      messages: [
        { id: 'f1', from: '系统', time: '上周三 10:02', text: '工单 #W-3341:B2/B3 对讲线路更换端子,完成后交叉测试。', isSystem: true },
        { id: 'f2', from: '技工·小陆', time: '上周三 12:40', text: '线路换好了,交叉测试正常。标签打印机坏了,新贴纸回头补。' },
        { id: 'f3', from: '物业·王哥', time: '上周三 12:41', text: '收到,记得补。' },
      ],
    },
    {
      id: 'th-power', name: '停电通知群', tag: '', preview: '00:00-01:00',
      clueIds: ['N2'],
      messages: [
        { id: 'p1', from: '物业', time: '23:55', text: 'B1-B3 计划停电检修 00:00-01:00,请各岗位提前确认应急照明。' },
        { id: 'p2', from: '老张', time: '00:10', text: 'B1 应急灯正常。' },
      ],
    },
    {
      id: 'th-dispatch', name: '派单系统', tag: '', preview: 'M-217 未收工',
      clueIds: ['N3'],
      messages: [
        { id: 'd1', from: '系统', time: '21:30', text: '新工单:设备间巡检(夜间),指派 M-217,预计 23:00 完成。', isSystem: true },
        { id: 'd2', from: '系统', time: '23:00', text: '提醒:工单超时未确认收工。', isSystem: true },
        { id: 'd3', from: '系统', time: '00:20', text: '提醒:工单超时未确认收工(第 2 次)。', isSystem: true },
      ],
    },
  ],

  hotspots: [
    { id: 'b3-fan', label: 'B3 风机房', x: 60, y: 8, w: 24, h: 18, clueId: 'N5',
      desc: 'B3 风机房的铁门上挂着「停机保养」的牌子,门锁落灰。今晚它不该发出任何声音——录音里那阵每 3 秒一次的嗡鸣,不是它。' },
    { id: 'b3-corridor', label: 'B3 通道', x: 8, y: 8, w: 48, h: 18,
      desc: 'B3 通道。老张搜过一整圈:车位空着,地面积灰上没有新的脚印。' },
    { id: 'b2-equip', label: 'B2 设备间', x: 12, y: 44, w: 24, h: 22, clueId: 'N6',
      desc: 'B2 设备间:电磁隔离门,停电即自动落锁,门体很厚。隔着这样的门,对讲的声音会发闷,敲击声会迟一点传出来。旁边就是通风机房。' },
    { id: 'b2-fan', label: 'B2 通风机房', x: 60, y: 48, w: 24, h: 20,
      desc: 'B2 通风机房。应急电源下,2 号风机的运行指示灯还在规律地明灭——一下,又一下,大概 3 秒一个来回。' },
  ],

  floorPlan: {
    w: 100,
    h: 76,
    rects: [
      { x: 5, y: 4, w: 90, h: 30, kind: 'room' },
      { x: 12, y: 10, w: 18, h: 6, kind: 'shelf' },
      { x: 34, y: 10, w: 18, h: 6, kind: 'shelf' },
      { x: 60, y: 8, w: 24, h: 18, kind: 'room', label: '风机房 · 保养', sub: true },
      { x: 5, y: 38, w: 90, h: 32, kind: 'room' },
      { x: 12, y: 44, w: 24, h: 22, kind: 'room', label: '设备间' },
      { x: 60, y: 48, w: 24, h: 20, kind: 'room', label: '通风机房' },
    ],
    lines: [
      { x1: 5, y1: 36, x2: 95, y2: 36, kind: 'wall' },
    ],
    texts: [
      { x: 8, y: 7.5, text: 'B3 层(通道与车位)', kind: 'sub' },
      { x: 8, y: 42.5, text: 'B2 层', kind: 'sub' },
      { x: 50, y: 35.4, text: '计划停电 00:00-01:00', kind: 'danger', anchor: 'middle' },
      { x: 44, y: 62, text: '你', kind: 'sub' },
    ],
    dots: [
      { x: 42, y: 60, r: 1.5, kind: 'you' },
    ],
    legend: '虚线框 = 可点击调查 · 上:B3 / 下:B2',
  },

  questions: [
    {
      id: 'q1', prompt: '推理一:呼叫实际来自哪一层?',
      options: [
        { id: 'a', text: '就是 B3,人可能躲起来了',
          hint: 'B3 今晚 23:00 后没有任何门禁活动,地面积灰上没有新脚印——活人进不去,也藏不住。' },
        { id: 'b', text: 'B2,设备间', correct: true },
        { id: 'c', text: '地面值班室,有人恶作剧',
          hint: '值班室里只有你,对讲分机也呼不到自己。' },
        { id: 'd', text: 'B1',
          hint: 'B1 的对讲线路今晚没有接入记录;接进来的是 CH-07 这一条线。' },
      ],
      confirmed: 'B3 进不去、B2 设备间里的人出不来——门禁、工单、监控,都指向同一扇落了锁的门。',
    },
    {
      id: 'q2', prompt: '推理二:控制台为什么显示 B3?',
      options: [
        { id: 'a', text: '被困者报错了自己的位置',
          hint: '他从头到尾只说过「门打不开,我在里面」——楼层是控制台显示的,不是他说的。' },
        { id: 'b', text: '线路接反了,标签没有更新', correct: true },
        { id: 'c', text: '系统随机分配的端口',
          hint: '对讲端口连着物理线路,不是随机分配;而这条线路,上周刚被人动过。' },
        { id: 'd', text: '停电导致显示错乱',
          hint: 'UPS 供电下,记录连续完整。错的不是屏幕,是贴在端口上的那张旧标签。' },
      ],
      confirmed: '上周的工单写着「更换端子、交叉测试」,跟进消息说「新贴纸回头补」——CH-07 这条线,早就不是「B3」了。',
    },
    {
      id: 'q3', prompt: '推理三:哪几条证据放在一起,才能确认位置?',
      options: [
        { id: 'a', text: '只看控制台标签就够了',
          hint: '标签是人工贴的,还停在维修之前。' },
        { id: 'b', text: '录音嗡鸣节拍 + 风机运行记录 + 门禁记录', correct: true },
        { id: 'c', text: '只听信号强弱的変化',
          hint: '信号强弱受隔门与线路影响,大小会骗人;节奏不会。' },
        { id: 'd', text: '等第三次呼叫,问他在哪',
          hint: '信号一次比一次弱。等下去,只会越来越难找。' },
      ],
      confirmed: '每 3 秒一次的嗡鸣,对上 B2 风机的启停节拍;B3 的风机整晚停着;门禁里只有 M-217 在 B2——三条线拧成一股,位置就锁死了。',
    },
  ],

  endings: [
    {
      id: 'report', title: '结局一 · 三分钟的核对', subtitle: '你把准确位置报给了老张',
      body: [
        '「别搜 B3 了——人在 B2 设备间,隔离门落了锁!」你把风机节拍、门禁和维修单一次性念给他。',
        '老张带人赶到 B2。门开的那一刻,手电光里,维修员正坐在配电柜旁保存体力,手里的手电还亮着。',
        '他出来的第一句话是:「对讲里那阵风机声,我自己都听见了,就是没法告诉你们我在哪。」',
        '一周后,控制台的贴纸全部换新。值班手册多了一行字:显示位置,须以录音、门禁与运行记录交叉确认。',
      ],
    },
    {
      id: 'label', title: '结局二 · 屏幕不会承认错误', subtitle: '你选择继续相信标签',
      body: [
        '你和老张把 B3 翻了三遍,连车位底下都照过了。第三次呼叫之后,对讲再没有响过。',
        '四十分钟后,有人想起 B2 那张没确认收工的工单。破门时,维修员已经虚脱,手里还攥着手电。',
        '复盘会上,那块翘着边的「B3」贴纸被拍在桌上。',
        '从那天起,再没有人说「系统不会说谎」——说谎的从来不是系统,是懒得更新标签的人。',
      ],
    },
    {
      id: 'chain', title: '结局三 · 先固化证据', subtitle: '你先整理记录,再去叫人',
      body: [
        '你花了十分钟,把录音节拍、风机运行、门禁记录和上周的维修单逐项对齐,确认无误才通知老张。',
        '人在 B2 设备间找到了,虚惊一场,虚脱但平安。',
        '复盘时,你那页整理好的证据链成了规程修订的附件一。',
        '只是队长在页脚批了一行字:「下次,先喊人,再补纸。」',
      ],
    },
  ],
}
