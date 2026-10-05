import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CaseData, GameState } from '../types'
import { clearSave, createInitialState, loadSave, writeSave } from '../storage'

/**
 * 单个案件的游戏状态:状态 + 动作,自动按案件独立存档。
 * 传入 null(案件选择页)时为空壳,不读写存档。
 *
 * 说明:初始状态用惰性初始化直接读存档,并在保存时用快照比对,
 * 避免「先用初始状态覆盖存档」的竞态(StrictMode 双调用下尤为致命)。
 */
export function useGameState(data: CaseData | null) {
  const caseId = data?.id ?? null
  const [state, setState] = useState<GameState>(() =>
    caseId ? loadSave(caseId) : createInitialState(),
  )
  /** 当前 state 所属案件 + 装载时的存档快照(用于判断是否需要写盘) */
  const loadedRef = useRef<{ caseId: string | null; snapshot: string }>({
    caseId,
    snapshot: JSON.stringify(state),
  })

  // 切换案件时,装载对应案件的存档
  useEffect(() => {
    if (loadedRef.current.caseId === caseId) return
    const next = caseId ? loadSave(caseId) : createInitialState()
    loadedRef.current = { caseId, snapshot: JSON.stringify(next) }
    setState(next)
  }, [caseId])

  // 状态变化即自动保存(仅当 state 确属当前案件,且确实发生了变化)
  useEffect(() => {
    if (!caseId) return
    if (loadedRef.current.caseId !== caseId) return
    const snapshot = JSON.stringify(state)
    if (snapshot === loadedRef.current.snapshot) return
    writeSave(caseId, state)
  }, [caseId, state])

  /** 全部关键线索 id(部分结局的解锁条件) */
  const keyClueIds = useMemo(
    () => (data ? data.clues.filter((c) => c.isKey).map((c) => c.id) : []),
    [data],
  )

  const setPhase = useCallback((phase: GameState['phase']) => {
    setState((s) => ({ ...s, phase }))
  }, [])

  const setPrologueStep = useCallback((step: number) => {
    setState((s) => ({ ...s, prologueStep: step }))
  }, [])

  /** 记录一条线索(幂等) */
  const findClue = useCallback((clueId: string) => {
    setState((s) =>
      s.foundClues.includes(clueId) ? s : { ...s, foundClues: [...s.foundClues, clueId] },
    )
  }, [])

  /** 记录答对 */
  const answerCorrect = useCallback((questionId: string, optionId: string) => {
    setState((s) => ({ ...s, answers: { ...s.answers, [questionId]: optionId } }))
  }, [])

  /** 记录答错(用于统计,不惩罚) */
  const recordWrong = useCallback((key: string) => {
    setState((s) =>
      s.wrongPicks.includes(key) ? s : { ...s, wrongPicks: [...s.wrongPicks, key] },
    )
  }, [])

  /** 选定结局 */
  const chooseEnding = useCallback((endingId: string) => {
    setState((s) => ({
      ...s,
      endingId,
      phase: 'ending',
      endingsSeen: s.endingsSeen.includes(endingId) ? s.endingsSeen : [...s.endingsSeen, endingId],
    }))
  }, [])

  /** 从结局返回调查(便于尝试其他结局) */
  const backToInvestigate = useCallback(() => {
    setState((s) => ({ ...s, phase: 'investigate' }))
  }, [])

  /** 重新开始:清空本案存档并回到序幕 */
  const restart = useCallback(() => {
    if (caseId) clearSave(caseId)
    setState(createInitialState())
  }, [caseId])

  return {
    data,
    state,
    keyClueIds,
    setPhase,
    setPrologueStep,
    findClue,
    answerCorrect,
    recordWrong,
    chooseEnding,
    backToInvestigate,
    restart,
  }
}

export type GameApi = ReturnType<typeof useGameState>
