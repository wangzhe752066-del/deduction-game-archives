/**
 * 游戏全部数据结构的类型定义。
 * 每个案件是一份 CaseData 数据包:界面文案、线索、监控片段、系统记录、
 * 消息、平面图、推理问题与结局全部数据驱动,新增案件只需再写一份数据。
 */

/** 调查界面标识(四个通用槽位,各案件可自定义名称) */
export type ScreenId = 'cctv' | 'receipts' | 'floorplan' | 'phone'

/** 线索定义 */
export interface ClueDef {
  id: string
  title: string
  detail: string
  /** 是否关键线索(部分结局的解锁条件) */
  isKey: boolean
  source: ScreenId
}

/* ---------------- 监控场景(数据驱动的 CSS 插画) ---------------- */

export type FigureSuit = 'customer' | 'rider' | 'worker' | 'courier'
export type FigureProp = 'bag' | 'cup' | 'parcel' | 'crate' | 'toolbox'
export type FigureAnim = 'inFromDoor' | 'outDoor' | 'away' | 'stand'

/** 场景中的人物 */
export interface SceneFigure {
  suit: FigureSuit
  /** 左手白色绷带(原案专用) */
  bandage?: boolean
  props?: FigureProp[]
  anim?: FigureAnim
}

/** 无人物时的静态道具 */
export type StaticProp = 'parcel' | 'printer' | 'painting' | 'paper'

/** 一个监控场景的完整描述 */
export interface SceneDef {
  /** 背景:hall 大厅(货架+门) / corridor 走廊(两扇门) / counter 台面前景 / none 空景 */
  bg: 'hall' | 'corridor' | 'counter' | 'none'
  /** hall/counter 背景右侧门的标签 */
  doorLabel?: string
  /** corridor 背景的两扇门标签 */
  roomLabels?: [string, string]
  /** counter 背景的台面标签(收银台/打印机/展柜/控制台…) */
  counterLabel?: string
  /** hall 背景是否画货架 */
  shelves?: boolean
  figure?: SceneFigure
  staticProp?: StaticProp
}

/** 监控片段 */
export interface CCTVClipDef {
  id: string
  cam: string
  time: string
  title: string
  scene: SceneDef
  desc: string
  /** 观看本片段可获得的线索 */
  clueId?: string
  /** 逐帧放大细节(可选) */
  zoom?: { label: string; text: string }
  /** 需要点击「逐帧放大」后才能获得的线索 */
  zoomClueId?: string
}

/* ---------------- 系统记录(收银/打印/对讲/授权等通用记录) ---------------- */

/** 记录条目(amount 字段为右侧状态文本,金额或状态) */
export interface TransactionDef {
  id: string
  time: string
  summary: string
  amount: string
  detail: string
  /** 展开详情可获得的线索 */
  clueId?: string
}

/** 流水日志行 */
export interface DeliveryLogLine {
  time: string
  text: string
}

/* ---------------- 消息 ---------------- */

export interface MessageDef {
  id: string
  from: string
  time: string
  text: string
  /** 系统提示(撤回/通知),居中灰字展示 */
  isSystem?: boolean
  /** 图片消息,渲染为截图卡片 */
  isImage?: boolean
  imageCaption?: string
}

export interface ThreadDef {
  id: string
  name: string
  tag: string
  preview: string
  messages: MessageDef[]
  /** 首次打开会话可获得的线索 */
  clueIds: string[]
}

/* ---------------- 平面图(数据驱动) ---------------- */

export interface HotspotDef {
  id: string
  label: string
  desc: string
  clueId?: string
  x: number
  y: number
  w: number
  h: number
}

export interface FloorRectDef {
  x: number
  y: number
  w: number
  h: number
  /** room 房间 / shelf 设施条 / accent 强调区域 */
  kind?: 'room' | 'shelf' | 'accent'
  label?: string
  /** 标签用小号字 */
  sub?: boolean
}

export interface FloorLineDef {
  x1: number
  y1: number
  x2: number
  y2: number
  kind?: 'wall' | 'door' | 'accent'
}

export interface FloorTextDef {
  x: number
  y: number
  text: string
  kind?: 'sub' | 'label' | 'danger'
  anchor?: 'start' | 'middle' | 'end'
}

export interface FloorDotDef {
  x: number
  y: number
  r: number
  kind?: 'you' | 'bin' | 'hot'
}

/** 一张平面图 */
export interface FloorPlanDef {
  w: number
  h: number
  rects: FloorRectDef[]
  lines: FloorLineDef[]
  texts: FloorTextDef[]
  dots?: FloorDotDef[]
  /** 红色斜纹强调区(如监控盲区) */
  blinds?: { x: number; y: number; w: number; h: number }[]
  legend?: string
}

/* ---------------- 推理与结局 ---------------- */

export interface OptionDef {
  id: string
  text: string
  correct?: boolean
  /** 选错时给出的提示(不揭晓答案);正确选项无需提供 */
  hint?: string
}

export interface QuestionDef {
  id: string
  prompt: string
  options: OptionDef[]
  /** 答对后的确认语 */
  confirmed: string
}

export interface EndingDef {
  id: string
  title: string
  subtitle: string
  body: string[]
  /** 需要集齐全部关键线索才可选 */
  needAllKeyClues?: boolean
}

export interface PrologueScene {
  time: string
  lines: string[]
}

/* ---------------- 案件包 ---------------- */

/** 档案选择页的展示信息(不含真相) */
export interface CaseMeta {
  order: number
  typeName: string
  oneLine: string
}

/** 调查界面页签配置 */
export interface CaseTabDef {
  id: ScreenId
  label: string
  sub: string
}

/** 「系统记录」界面的文案配置 */
export interface SystemViewLabels {
  header: string
  mainTab: string
  subTab: string
  subNote?: string
  /** 打开流水页签时记录的线索(如原案的外卖取餐记录) */
  subTabClueId?: string
}

export interface CaseData {
  id: string
  title: string
  meta: CaseMeta
  /** 调查阶段的任务提示 */
  objective: string
  cctvHeader: string
  /** 各阶段剧情时间(与消息、记录时间保持一致) */
  clocks: {
    investigate: string
    deduce: string
    choice: string
    ending: string
  }
  /** 结局选择页的情境文案 */
  choiceKicker: string
  tabs: CaseTabDef[]
  systemView: SystemViewLabels
  prologue: PrologueScene[]
  clues: ClueDef[]
  cctvClips: CCTVClipDef[]
  transactions: TransactionDef[]
  deliveryLog: DeliveryLogLine[]
  threads: ThreadDef[]
  hotspots: HotspotDef[]
  floorPlan: FloorPlanDef
  questions: QuestionDef[]
  endings: EndingDef[]
  /** 开启推理所需的最低线索数 */
  unlockDeductionAt: number
}

/* ---------------- 游戏状态(存档结构) ---------------- */

export type Phase = 'prologue' | 'investigate' | 'deduce' | 'choice' | 'ending'

export interface GameState {
  phase: Phase
  prologueStep: number
  foundClues: string[]
  /** questionId -> 已答对的选项 id */
  answers: Record<string, string>
  /** 答错过的选项记录(questionId:optionId) */
  wrongPicks: string[]
  endingId: string | null
  endingsSeen: string[]
}
