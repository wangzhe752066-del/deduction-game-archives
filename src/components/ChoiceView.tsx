import type { GameApi } from '../hooks/useGameState'

/** 结局选择:标注 needAllKeyClues 的结局需集齐全部关键线索才解锁 */
export default function ChoiceView({ game }: { game: GameApi }) {
  const { data, state, keyClueIds } = game
  if (!data) return null

  const missing = keyClueIds.filter((id) => !state.foundClues.includes(id))

  return (
    <div className="page">
      <div className="panel">
        <div className="kicker">{data.choiceKicker}</div>
        <h2 className="choice-title">你打算怎么做?</h2>
        <div className="choice-grid">
          {data.endings.map((e) => {
            const locked = !!e.needAllKeyClues && missing.length > 0
            return (
              <button
                key={e.id}
                className={`choice-card ${locked ? '' : 'unlocked'}`}
                disabled={locked}
                onClick={() => game.chooseEnding(e.id)}
                data-testid={`choice-${e.id}`}
              >
                <h3>{e.title}</h3>
                <div className="cc-desc">{e.subtitle}</div>
                <div className="cc-cond">
                  {e.needAllKeyClues
                    ? locked
                      ? `🔒 解锁条件:集齐全部 ${keyClueIds.length} 条关键线索(还差 ${missing.length} 条)`
                      : '✓ 关键证据齐全 · 已解锁'
                    : '随时可选'}
                </div>
              </button>
            )
          })}
        </div>
        <div className="choice-back">
          <button className="btn btn-ghost btn-sm" onClick={() => game.setPhase('investigate')}>
            ← 返回继续调查
          </button>
        </div>
      </div>
    </div>
  )
}
