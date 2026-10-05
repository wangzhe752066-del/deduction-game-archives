import { useState } from 'react'
import type { GameApi } from '../hooks/useGameState'

/** 手机消息界面:会话列表 → 聊天记录,首次打开记录线索 */
export default function PhoneView({ game }: { game: GameApi }) {
  const { data, state, findClue } = game
  const [openId, setOpenId] = useState<string | null>(null)
  if (!data) return null

  const thread = data.threads.find((t) => t.id === openId) || null
  // 群聊(存在多个不同发送者)时展示每条消息的昵称
  const isGroup = !!thread && new Set(thread.messages.filter((m) => !m.isSystem).map((m) => m.from)).size > 1

  const openThread = (id: string) => {
    setOpenId(id)
    const t = data.threads.find((x) => x.id === id)
    t?.clueIds.forEach((cid) => findClue(cid))
  }

  if (!thread) {
    return (
      <div className="panel">
        <div className="section-title">手机 · 消息</div>
        <div className="thread-list">
          {data.threads.map((t) => (
            <button key={t.id} className="thread-row" onClick={() => openThread(t.id)} data-testid={`thread-${t.id}`}>
              <div className="thread-avatar">{t.name.slice(0, 1)}</div>
              <div className="thread-main">
                <div className="thread-name">{t.name}</div>
                <div className="thread-preview">{t.preview}</div>
              </div>
              {t.tag && (
                <div className="thread-meta">
                  <span className="thread-tag">{t.tag}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="chat-header">
        <button className="btn btn-sm btn-ghost" onClick={() => setOpenId(null)} data-testid="btn-back-threads">
          ‹ 返回
        </button>
        <span className="chat-title">{thread.name}</span>
      </div>
      <div className="chat" data-testid="chat">
        {thread.messages.map((m) => {
          if (m.isSystem) {
            return (
              <div key={m.id} className="msg msg-sys">
                {m.text}
              </div>
            )
          }
          return (
            <div key={m.id} className="msg">
              {isGroup && <span className="msg-name">{m.from}</span>}
              {m.isImage ? (
                <div className="msg-img-card">
                  <div className="img-placeholder">🖼 {m.text}</div>
                  {m.imageCaption && <div className="img-caption">{m.imageCaption}</div>}
                </div>
              ) : (
                <div className="bubble">{m.text}</div>
              )}
              <span className="msg-meta">{m.time}</span>
            </div>
          )
        })}
      </div>
      {thread.clueIds.length > 0 && (
        <div className="clue-noted">
          线索已记录:{thread.clueIds.filter((id) => state.foundClues.includes(id)).length}/
          {thread.clueIds.length}
        </div>
      )}
    </div>
  )
}
