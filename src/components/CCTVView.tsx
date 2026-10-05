import { useEffect, useRef, useState } from 'react'
import type { GameApi } from '../hooks/useGameState'
import type { CCTVClipDef } from '../types'
import CCTVScene from './CCTVScene'

/** 判断某片段的线索(观看即得 或 需放大)是否已记录 */
function clipClueFound(clip: CCTVClipDef, foundClues: string[]): boolean {
  const ids = [clip.clueId, clip.zoomClueId].filter(Boolean) as string[]
  return ids.length > 0 && ids.every((id) => foundClues.includes(id))
}

/** 监控录像界面:监视器画面在上、时间轴片段列表在下;观看/放大即记录线索 */
export default function CCTVView({ game }: { game: GameApi }) {
  const { data, state, findClue } = game
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [zoomOpen, setZoomOpen] = useState(false)
  const clip = data?.cctvClips.find((c) => c.id === selectedId) || null
  const monitorRef = useRef<HTMLDivElement>(null)

  // 选中片段后,把监视器画面滚动到可视区(手机上列表较长时尤其重要)
  useEffect(() => {
    if (selectedId && monitorRef.current) {
      monitorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedId])

  if (!data) return null

  const selectClip = (c: CCTVClipDef) => {
    setSelectedId(c.id)
    setZoomOpen(false)
    if (c.clueId) findClue(c.clueId)
  }

  const openZoom = () => {
    setZoomOpen(true)
    if (clip?.zoomClueId) findClue(clip.zoomClueId)
  }

  return (
    <div>
      <div className="section-title">{data.cctvHeader}</div>
      <div className="cctv-layout">
        {/* 监视器画面(置于列表上方,手机端优先可见) */}
        <div className="panel monitor-panel" ref={monitorRef} data-testid="monitor-panel">
          {clip ? (
            <>
              <div className="monitor" data-testid="monitor">
                {/* key 变化时重新触发人物行走动画 */}
                <CCTVScene key={clip.id} scene={clip.scene} />
                <div className="monitor-ui">
                  <div className="mu-cam">{clip.cam}</div>
                  <div className="mu-rec">
                    <i />
                    REC
                  </div>
                  <div className="mu-time">{clip.time}</div>
                  <div className="mu-quality">回放 · 1.0x</div>
                </div>
              </div>
              <p className="clip-desc">{clip.desc}</p>
              {clip.zoom &&
                (zoomOpen ? (
                  <div className="zoom-box" data-testid="zoom-text">
                    🔍 {clip.zoom.label}:{clip.zoom.text}
                  </div>
                ) : (
                  <button
                    className={`btn btn-sm ${clip.zoomClueId ? 'btn-pulse' : ''}`}
                    onClick={openZoom}
                    data-testid="btn-zoom"
                  >
                    🔍 {clip.zoom.label}
                  </button>
                ))}
              {clipClueFound(clip, state.foundClues) && (
                <div className="clue-noted">线索已记录到线索板</div>
              )}
            </>
          ) : (
            <div className="monitor-empty">从下方时间轴选择片段,回放今晚的录像</div>
          )}
        </div>

        {/* 时间轴片段列表 */}
        <div>
          {data.cctvClips.map((c) => {
            const found = clipClueFound(c, state.foundClues)
            return (
              <button
                key={c.id}
                className={`clip-card ${selectedId === c.id ? 'active' : ''}`}
                onClick={() => selectClip(c)}
                data-testid={`clip-${c.id}`}
              >
                <span className="cc-time">{c.time}</span>
                <span className="cc-cam"> · {c.cam}</span>
                {found && <span className="cc-found">✓ 已记录</span>}
                <div className="cc-title">{c.title}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
