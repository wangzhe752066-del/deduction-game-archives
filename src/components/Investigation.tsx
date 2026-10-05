import { useState } from 'react'
import type { GameApi } from '../hooks/useGameState'
import type { ScreenId } from '../types'
import CCTVView from './CCTVView'
import ReceiptView from './ReceiptView'
import FloorPlanView from './FloorPlanView'
import PhoneView from './PhoneView'
import CluePanel from './CluePanel'

/** 调查主界面:页签文案来自案件数据(电脑端侧栏 / 手机端底部导航共用) */
export default function Investigation({ game }: { game: GameApi }) {
  const { data, state } = game
  const [tab, setTab] = useState<ScreenId | 'clues'>('cctv')
  if (!data) return null

  const tabs = [...data.tabs, { id: 'clues' as const, label: '线索板', sub: 'LIST' }]
  const navSub = (id: string) =>
    id === 'clues' ? `${state.foundClues.length} 条` : (data.tabs.find((t) => t.id === id)?.sub ?? '')

  return (
    <div className="layout">
      {/* 电脑端侧栏导航 */}
      <nav className="sidenav">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
            data-testid={`nav-${t.id}`}
          >
            <span>{t.label}</span>
            <span className="nav-sub">{navSub(t.id)}</span>
          </button>
        ))}
        <div className="nav-tip">
          对不上的细节,
          <br />
         就是线索
        </div>
      </nav>

      <div className="content">
        <div className="objective">{data.objective}</div>
        {tab === 'cctv' && <CCTVView game={game} />}
        {tab === 'receipts' && <ReceiptView game={game} />}
        {tab === 'floorplan' && <FloorPlanView game={game} />}
        {tab === 'phone' && <PhoneView game={game} />}
        {tab === 'clues' && <CluePanel game={game} />}
      </div>

      {/* 手机端底部导航 */}
      <nav className="bottomnav">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`nav-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
            data-testid={`mnav-${t.id}`}
          >
            <span>{t.label}</span>
            <span className="nav-sub">{navSub(t.id)}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
