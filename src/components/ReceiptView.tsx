import { useEffect, useState } from 'react'
import type { GameApi } from '../hooks/useGameState'

/** 系统记录界面:主记录列表(交易/队列/授权等)+ 流水日志页签,文案来自案件数据 */
export default function ReceiptView({ game }: { game: GameApi }) {
  const { data, state, findClue } = game
  const [tab, setTab] = useState<'pos' | 'delivery'>('pos')
  const [openTx, setOpenTx] = useState<string | null>(null)

  // 打开流水页签时,记录该页签绑定的线索(如外卖取餐记录、门铃记录)
  useEffect(() => {
    if (tab === 'delivery' && data?.systemView.subTabClueId) findClue(data.systemView.subTabClueId)
  }, [tab, data?.systemView.subTabClueId, findClue])

  if (!data) return null

  return (
    <div>
      <div className="section-title">{data.systemView.header}</div>
      <div className="tabbar">
        <button
          className={`tab ${tab === 'pos' ? 'active' : ''}`}
          onClick={() => setTab('pos')}
          data-testid="tab-pos"
        >
          {data.systemView.mainTab}
        </button>
        <button
          className={`tab ${tab === 'delivery' ? 'active' : ''}`}
          onClick={() => setTab('delivery')}
          data-testid="tab-delivery"
        >
          {data.systemView.subTab}
        </button>
      </div>

      {tab === 'pos' && (
        <div>
          {data.transactions.map((tx) => {
            const open = openTx === tx.id
            const found = tx.clueId ? state.foundClues.includes(tx.clueId) : false
            return (
              <div key={tx.id} className="tx-item">
                <button
                  className="tx-row"
                  onClick={() => {
                    setOpenTx(open ? null : tx.id)
                    if (tx.clueId) findClue(tx.clueId)
                  }}
                  data-testid={`tx-${tx.id}`}
                >
                  <span className="tx-time">{tx.time}</span>
                  <span className="tx-summary">{tx.summary}</span>
                  <span className="tx-amount">{tx.amount}</span>
                </button>
                {open && (
                  <div className="tx-detail-panel">
                    <div className="tx-detail">{tx.detail}</div>
                    {found && <div className="clue-noted">线索已记录到线索板</div>}
                    {/* 原案的购物小票纸样(案件特色展示) */}
                    {data.id === 'case-01' && tx.id === 't4' && <ReceiptPaper />}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === 'delivery' && (
        <div className="panel">
          <div className="log-list">
            {data.deliveryLog.map((l, i) => (
              <div className="log-line" key={i}>
                <span className="log-time">{l.time}</span>
                <span>{l.text}</span>
              </div>
            ))}
          </div>
          {data.systemView.subNote && <p className="log-note">{data.systemView.subNote}</p>}
        </div>
      )}
    </div>
  )
}

/** 原案 02:03 那笔交易的购物小票(纸质小票样式) */
function ReceiptPaper() {
  return (
    <div className="receipt-paper" data-testid="receipt-paper">
      <div className="r-shop">不眠便利店 NO.0137</div>
      <div className="r-sub">机号 02 · 收银员:夜班</div>
      <div className="r-sep">******************************</div>
      <div>时间:2026-10-01 02:03:26</div>
      <div className="r-row">
        <span>黑咖啡(热/大)</span>
        <span>¥6.00</span>
      </div>
      <div className="r-row">
        <span>一次性雨衣</span>
        <span>¥9.00</span>
      </div>
      <div className="r-sep">******************************</div>
      <div className="r-row r-bold">
        <span>合计</span>
        <span>¥15.00</span>
      </div>
      <div>支付方式:微信支付(已支付)</div>
      <div className="r-sep">******************************</div>
      <div className="r-sub">小票号 S-2026…2571 · 雨衣库存 -1</div>
      <div className="r-sub">谢谢惠顾,雨夜慢走</div>
    </div>
  )
}
