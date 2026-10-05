import type { GameApi } from '../hooks/useGameState'

/** 开场剧情:按幕推进,最后一幕进入调查 */
export default function Prologue({ game }: { game: GameApi }) {
  const { data, state } = game
  if (!data) return null

  const max = data.prologue.length - 1
  const step = Math.min(state.prologueStep, max)
  const scene = data.prologue[step]
  const isLast = step === max

  return (
    <div className="prologue" data-testid="prologue">
      <div className="p-time" data-testid="prologue-time">
        {scene.time}
      </div>
      {scene.lines.map((line, i) => (
        <p key={i} className="p-line" style={{ animationDelay: `${i * 0.3}s` }}>
          {line}
        </p>
      ))}
      <div className="p-controls">
        {step > 0 && (
          <button className="btn btn-ghost" onClick={() => game.setPrologueStep(step - 1)}>
            上一步
          </button>
        )}
        {isLast ? (
          <button className="btn btn-accent" onClick={() => game.setPhase('investigate')} data-testid="btn-start">
            开始调查
          </button>
        ) : (
          <button className="btn btn-accent" onClick={() => game.setPrologueStep(step + 1)} data-testid="btn-next">
            下一步
          </button>
        )}
        {!isLast && (
          <button className="btn btn-ghost" onClick={() => game.setPhase('investigate')}>
            跳过
          </button>
        )}
      </div>
      <div className="p-dots">
        {data.prologue.map((_, i) => (
          <span key={i} className={`p-dot ${i === step ? 'on' : ''}`} />
        ))}
      </div>
    </div>
  )
}
