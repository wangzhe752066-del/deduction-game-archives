import type { GameApi } from '../hooks/useGameState'

/** 来源界面的中文名 */
const SOURCE_LABEL: Record<string, string> = {
  cctv: '监控录像',
  receipts: '系统记录',
  floorplan: '平面图',
  phone: '消息',
}

/** 线索板:全部线索清单(未发现的显示来源提示)+ 推理入口 */
export default function CluePanel({ game }: { game: GameApi }) {
  const { data, state, keyClueIds } = game
  if (!data) return null

  const found = data.clues.filter((c) => state.foundClues.includes(c.id))
  const keyFound = keyClueIds.filter((id) => state.foundClues.includes(id)).length
  const unlocked = found.length >= data.unlockDeductionAt
  const answeredAll = data.questions.every((q) => state.answers[q.id])

  // 各案件的界面名称可能不同,优先用案件自己的页签名
  const sourceLabel = (source: string) =>
    data.tabs.find((t) => t.id === source)?.label ?? SOURCE_LABEL[source] ?? source

  return (
    <div>
      <div className="section-title">线索板</div>
      <div className="clue-stats">
        已收集 <b data-testid="clue-count">{found.length}</b> / {data.clues.length} · 关键线索{' '}
        <b data-testid="key-count">{keyFound}</b> / {keyClueIds.length}
        <div className="clue-progress">
          <i style={{ width: `${(found.length / data.clues.length) * 100}%` }} />
        </div>
      </div>

      <div className="clue-list">
        {data.clues.map((c) => {
          if (!state.foundClues.includes(c.id)) {
            return (
              <div key={c.id} className="clue-locked">
                🔒 未发现 · 来自「{sourceLabel(c.source)}」
              </div>
            )
          }
          return (
            <details key={c.id} className={`clue-item ${c.isKey ? 'is-key' : ''}`} data-testid={`clue-${c.id}`}>
              <summary>
                {c.isKey && <span className="clue-key-tag">关键</span>}
                <span>{c.title}</span>
                <span className="clue-src">{sourceLabel(c.source)}</span>
              </summary>
              <div className="clue-detail">{c.detail}</div>
            </details>
          )
        })}
      </div>

      <div className="clue-actions">
        <button
          className={`btn ${unlocked ? 'btn-accent' : ''}`}
          disabled={!unlocked}
          onClick={() => game.setPhase(answeredAll ? 'choice' : 'deduce')}
          data-testid="btn-deduce-main"
        >
          {unlocked
            ? answeredAll
              ? '查看结局选择'
              : '开始推理'
            : `线索不足 · 还需 ${data.unlockDeductionAt - found.length} 条`}
        </button>
      </div>
    </div>
  )
}
