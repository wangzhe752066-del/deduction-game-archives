import type { GameApi } from '../hooks/useGameState'

/** 结局展示:结局文案 + 本案统计;可返回调查尝试其他结局、返回档案或重新开始 */
export default function EndingView({ game, onMenu }: { game: GameApi; onMenu: () => void }) {
  const { data, state, keyClueIds } = game
  if (!data) return null

  const ending = data.endings.find((e) => e.id === state.endingId)
  if (!ending) return null
  const keyFound = keyClueIds.filter((id) => state.foundClues.includes(id)).length

  return (
    <div className="page">
      <div className="ending">
        <div className="ending-kicker">— 结局 —</div>
        <h2 className="ending-title" data-testid="ending-title">
          {ending.title}
        </h2>
        <div className="ending-sub">{ending.subtitle}</div>
        <div className="ending-body">
          {ending.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="ending-stats" data-testid="ending-stats">
          线索 {state.foundClues.length}/{data.clues.length} · 关键线索 {keyFound}/{keyClueIds.length} ·
          已见证结局 {state.endingsSeen.length}/{data.endings.length}
        </div>
        <div className="ending-actions">
          <button className="btn" onClick={game.backToInvestigate} data-testid="btn-back-investigate">
            ← 返回调查(尝试其他结局)
          </button>
          <button className="btn btn-ghost" onClick={onMenu} data-testid="btn-back-menu">
            返回档案
          </button>
          <button className="btn btn-danger" onClick={game.restart} data-testid="btn-restart-game">
            重新开始
          </button>
        </div>
      </div>
    </div>
  )
}
