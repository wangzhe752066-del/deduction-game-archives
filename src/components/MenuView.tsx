import { allCases } from '../data/cases'
import { loadSave } from '../storage'

/** 案件状态徽标 */
function statusOf(caseId: string): { text: string; tone: 'new' | 'doing' | 'done' } {
  const save = loadSave(caseId)
  if (save.endingsSeen.length > 0) return { text: `已通关 · 见过 ${save.endingsSeen.length} 个结局`, tone: 'done' }
  if (save.phase === 'deduce' || save.phase === 'choice' || save.phase === 'ending')
    return { text: '推理中', tone: 'doing' }
  if (save.phase === 'investigate') return { text: '调查中', tone: 'doing' }
  return { text: '未开始', tone: 'new' }
}

/** 案件选择页《夜班档案》 */
export default function MenuView({ onSelect }: { onSelect: (caseId: string) => void }) {
  const cases = [...allCases].sort((a, b) => a.meta.order - b.meta.order)

  return (
    <div className="menu">
      <header className="menu-head">
        <div className="menu-kicker">便利店的深夜,总有对不上的细节</div>
        <h1 className="menu-title">夜班档案</h1>
        <div className="menu-sub">五份档案 · 每案 10~15 分钟 · 一晚一案,查清再下班</div>
      </header>

      <div className="menu-grid">
        {cases.map((c) => {
          const save = loadSave(c.id)
          const status = statusOf(c.id)
          const keyFound = c.clues.filter((x) => x.isKey && save.foundClues.includes(x.id)).length
          const keyTotal = c.clues.filter((x) => x.isKey).length
          return (
            <button key={c.id} className="menu-card" onClick={() => onSelect(c.id)} data-testid={`menu-case-${c.id}`}>
              <div className="mc-top">
                <span className="mc-order">档案 {String(c.meta.order).padStart(2, '0')}</span>
                <span className={`mc-status tone-${status.tone}`}>{status.text}</span>
              </div>
              <h2 className="mc-title">{c.title}</h2>
              <div className="mc-type">{c.meta.typeName}</div>
              <p className="mc-line">{c.meta.oneLine}</p>
              <div className="mc-progress">
                线索 {save.foundClues.length}/{c.clues.length} · 关键 {keyFound}/{keyTotal} · 结局{' '}
                {save.endingsSeen.length}/{c.endings.length}
              </div>
              <div className="mc-enter">{save.phase === 'prologue' ? '开始调查 →' : '继续 →'}</div>
            </button>
          )
        })}
      </div>

      <footer className="menu-foot">进度按案件分别保存在本机浏览器;案件内可随时「重新开始」。</footer>
    </div>
  )
}
