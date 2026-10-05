import { useState } from 'react'
import type { GameApi } from '../hooks/useGameState'

/** 顶栏:返回档案、案件标题、剧情时间、线索计数、推理入口、重新开始(两步确认) */
export default function TopBar({ game, onMenu }: { game: GameApi; onMenu: () => void }) {
  const { data, state, keyClueIds: keyIds } = game
  const [confirmRestart, setConfirmRestart] = useState(false)
  if (!data) return null
  const total = data.clues.length
  const found = state.foundClues.length
  const keyFound = keyIds.filter((id) => state.foundClues.includes(id)).length
  const unlocked = found >= data.unlockDeductionAt
  const answeredAll = data.questions.every((q) => state.answers[q.id])
  const clock =
    state.phase === 'prologue'
      ? data.prologue[Math.min(state.prologueStep, data.prologue.length - 1)].time
      : (data.clocks as Record<string, string>)[state.phase] ?? data.clocks.investigate

  return (
    <header className="topbar">
      <button className="btn btn-sm btn-ghost tb-menu" onClick={onMenu} data-testid="btn-menu">
        ◂ 档案
      </button>
      <div className="tb-title" data-testid="case-title">
        {data.title}
      </div>
      <span className="tb-clock" data-testid="clock">
        {clock}
      </span>
      <div className="tb-spacer" />
      {state.phase === 'investigate' && (
        <span className="tb-chip" data-testid="clue-chip">
          线索 {found}/{total} · 关键 {keyFound}/{keyIds.length}
        </span>
      )}
      {state.phase === 'investigate' && (
        <button
          className={`btn btn-sm ${unlocked ? 'btn-accent btn-pulse' : ''}`}
          disabled={!unlocked}
          onClick={() => game.setPhase(answeredAll ? 'choice' : 'deduce')}
          data-testid="btn-deduce"
        >
          {unlocked ? '开始推理' : `推理 ${found}/${data.unlockDeductionAt}`}
        </button>
      )}
      {confirmRestart ? (
        <>
          <button
            className="btn btn-sm btn-danger"
            data-testid="btn-restart-confirm"
            onClick={() => {
              setConfirmRestart(false)
              game.restart()
            }}
          >
            确定重开?
          </button>
          <button className="btn btn-sm btn-ghost" onClick={() => setConfirmRestart(false)}>
            取消
          </button>
        </>
      ) : (
        <button
          className="btn btn-sm btn-ghost"
          data-testid="btn-restart"
          onClick={() => setConfirmRestart(true)}
        >
          重新开始
        </button>
      )}
    </header>
  )
}
