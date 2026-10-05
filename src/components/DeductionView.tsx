import { useState } from 'react'
import type { GameApi } from '../hooks/useGameState'
import type { OptionDef } from '../types'

/** 推理界面:依次回答三个问题;答错显示该选项的提示,不揭晓答案 */
export default function DeductionView({ game }: { game: GameApi }) {
  const { data, state } = game
  const [wrongKey, setWrongKey] = useState<string | null>(null)
  if (!data) return null

  const questions = data.questions
  const answeredCount = questions.filter((q) => state.answers[q.id]).length

  // 全部答对后的总结画面
  if (answeredCount >= questions.length) {
    return (
      <div className="page">
        <div className="panel">
          <div className="kicker">{data.clocks.deduce} · 推理完成</div>
          <h2 className="choice-title">三个问题,都有了答案</h2>
          <div className="deduce-recap">
            {questions.map((q) => (
              <div className="recap-item" key={q.id}>
                <div className="recap-q">{q.prompt}</div>
                <div className="recap-a">{q.confirmed}</div>
              </div>
            ))}
          </div>
          <p className="dim-text">{data.choiceKicker}——这一次,你要给出回应。</p>
          <div className="row-actions">
            <button className="btn btn-accent" onClick={() => game.setPhase('choice')} data-testid="btn-go-choice">
              做出选择
            </button>
            <button className="btn btn-ghost" onClick={() => game.setPhase('investigate')}>
              ← 再查查证据
            </button>
          </div>
        </div>
      </div>
    )
  }

  const idx = Math.min(answeredCount, questions.length - 1)
  const q = questions[idx]

  const pick = (opt: OptionDef) => {
    if (state.answers[q.id]) return
    if (opt.correct) {
      game.answerCorrect(q.id, opt.id)
      setWrongKey(null)
    } else {
      game.recordWrong(`${q.id}:${opt.id}`)
      setWrongKey(`${q.id}:${opt.id}`)
    }
  }

  return (
    <div className="page">
      <div className="panel question">
        <div className="q-progress" data-testid="q-progress">
          推理 {idx + 1} / {questions.length}
        </div>
        <h2 className="question-title">{q.prompt}</h2>
        <div className="options">
          {q.options.map((opt) => {
            const answered = state.answers[q.id] === opt.id
            const isWrongShown = wrongKey === `${q.id}:${opt.id}`
            return (
              <div key={opt.id}>
                <button
                  className={`option ${answered ? 'correct' : ''} ${isWrongShown ? 'wrong' : ''}`}
                  onClick={() => pick(opt)}
                  disabled={!!state.answers[q.id]}
                  data-testid={`opt-${q.id}-${opt.id}`}
                >
                  {opt.text}
                </button>
                {answered && <div className="hintbox ok">{q.confirmed}</div>}
                {isWrongShown && opt.hint && (
                  <div className="hintbox" data-testid="hintbox">
                    💡 {opt.hint}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="row-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => game.setPhase('investigate')}>
            ← 返回调查
          </button>
        </div>
      </div>
    </div>
  )
}
