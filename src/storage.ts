import type { GameState } from './types'

/**
 * 存储层:每个案件一份独立存档。
 * - 新键:night-files-save-v1:<caseId>
 * - 原案(case-01)兼容旧键 last-order-2am-save-v1,首次读取时自动迁移,
 *   原「重新开始」会同时清掉旧键,避免旧档复活。
 */

const KEY_PREFIX = 'night-files-save-v1:'
const LEGACY_KEY = 'last-order-2am-save-v1'
const ACTIVE_KEY = 'night-files-active-v1'
/** 旧版单案存档归属的案件 id */
export const LEGACY_CASE_ID = 'case-01'

/** 初始存档 */
export const createInitialState = (): GameState => ({
  phase: 'prologue',
  prologueStep: 0,
  foundClues: [],
  answers: {},
  wrongPicks: [],
  endingId: null,
  endingsSeen: [],
})

function parseSave(raw: string | null): GameState | null {
  if (!raw) return null
  try {
    return { ...createInitialState(), ...(JSON.parse(raw) as Partial<GameState>) }
  } catch {
    return null // 存档损坏时当作没有存档
  }
}

/** 读取某案件存档;原案会尝试迁移旧版单案存档 */
export function loadSave(caseId: string): GameState {
  const own = parseSave(localStorage.getItem(KEY_PREFIX + caseId))
  if (own) return own
  // 迁移:case-01 的旧版单案存档 → 新键(旧键保留为备份)
  if (caseId === LEGACY_CASE_ID) {
    const legacy = parseSave(localStorage.getItem(LEGACY_KEY))
    if (legacy) {
      try {
        localStorage.setItem(KEY_PREFIX + caseId, JSON.stringify(legacy))
      } catch {
        // 写入失败不影响本次返回
      }
      return legacy
    }
  }
  return createInitialState()
}

export function writeSave(caseId: string, state: GameState): void {
  try {
    localStorage.setItem(KEY_PREFIX + caseId, JSON.stringify(state))
  } catch {
    // 隐私模式等场景下写入失败,忽略
  }
}

/** 清除某案件存档(重新开始);原案同时清旧键,防止旧档复活 */
export function clearSave(caseId: string): void {
  try {
    localStorage.removeItem(KEY_PREFIX + caseId)
    if (caseId === LEGACY_CASE_ID) localStorage.removeItem(LEGACY_KEY)
  } catch {
    // 忽略
  }
}

/* ---------------- 当前案件记忆(刷新后回到正在玩的案件) ---------------- */

export function getActiveCaseId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_KEY)
  } catch {
    return null
  }
}

export function setActiveCaseId(caseId: string): void {
  try {
    localStorage.setItem(ACTIVE_KEY, caseId)
  } catch {
    // 忽略
  }
}

export function clearActiveCaseId(): void {
  try {
    localStorage.removeItem(ACTIVE_KEY)
  } catch {
    // 忽略
  }
}
