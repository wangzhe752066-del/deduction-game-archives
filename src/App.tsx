import { useEffect, useRef, useState } from 'react'
import { allCases, caseById } from './data/cases'
import { useGameState } from './hooks/useGameState'
import { clearActiveCaseId, getActiveCaseId, loadSave, setActiveCaseId } from './storage'
import TopBar from './components/TopBar'
import MenuView from './components/MenuView'
import Prologue from './components/Prologue'
import Investigation from './components/Investigation'
import DeductionView from './components/DeductionView'
import ChoiceView from './components/ChoiceView'
import EndingView from './components/EndingView'

/** 应用根组件:案件选择页 ↔ 单案游戏(序幕/调查/推理/选择/结局) */
export default function App() {
  // 首次进入显示档案页;若上次正在玩某案(且已有进度),刷新后直接回到该案
  const [activeCaseId, setActiveCaseIdState] = useState<string | null>(() => {
    const id = getActiveCaseId()
    if (id && allCases.some((c) => c.id === id) && loadSave(id).phase !== 'prologue') return id
    return null
  })

  const game = useGameState(activeCaseId ? caseById(activeCaseId)! : null)
  const { state } = game
  const [toast, setToast] = useState<string | null>(null)
  const prevCount = useRef(0)

  const enterCase = (caseId: string) => {
    setActiveCaseId(caseId)
    setActiveCaseIdState(caseId)
  }

  const exitToMenu = () => {
    clearActiveCaseId()
    setActiveCaseIdState(null)
    setToast(null)
  }

  // 发现新线索时短暂弹出提示
  useEffect(() => {
    if (!activeCaseId) {
      prevCount.current = 0
      return
    }
    const grew = state.foundClues.length > prevCount.current
    prevCount.current = state.foundClues.length
    if (!grew) return
    const clue = game.data?.clues.find((c) => c.id === state.foundClues[state.foundClues.length - 1])
    if (!clue) return
    setToast(`新线索:${clue.title}`)
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [state.foundClues, activeCaseId, game.data])

  // 档案选择页
  if (!activeCaseId || !game.data) {
    return <MenuView onSelect={enterCase} />
  }

  // 单案游戏
  return (
    <div className="app">
      <TopBar game={game} onMenu={exitToMenu} />
      <main className="stage">
        {state.phase === 'prologue' && <Prologue game={game} />}
        {state.phase === 'investigate' && <Investigation game={game} />}
        {state.phase === 'deduce' && <DeductionView game={game} />}
        {state.phase === 'choice' && <ChoiceView game={game} />}
        {state.phase === 'ending' && <EndingView game={game} onMenu={exitToMenu} />}
      </main>
      {toast && (
        <div className="toast" data-testid="toast">
          {toast}
        </div>
      )}
    </div>
  )
}
