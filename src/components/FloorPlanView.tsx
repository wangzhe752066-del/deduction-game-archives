import { useState } from 'react'
import type { GameApi } from '../hooks/useGameState'
import type { HotspotDef } from '../types'

/** 场景平面图:SVG 线稿由案件数据驱动,点击热点即调查并记录线索 */
export default function FloorPlanView({ game }: { game: GameApi }) {
  const { data, state, findClue } = game
  const [open, setOpen] = useState<HotspotDef | null>(null)
  if (!data) return null

  const fp = data.floorPlan

  const clickHotspot = (h: HotspotDef) => {
    setOpen(h)
    if (h.clueId) findClue(h.clueId)
  }

  const isFound = (id?: string) => !!id && state.foundClues.includes(id)

  return (
    <div>
      <div className="section-title">{data.tabs.find((t) => t.id === 'floorplan')?.label ?? '平面图'}</div>
      <svg className="floorplan" viewBox={`0 0 ${fp.w} ${fp.h}`} data-testid="floorplan">
        <defs>
          {/* 强调区斜纹(监控盲区等) */}
          <pattern id="hatch" width="2.4" height="2.4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="2.4" height="2.4" fill="rgba(226,96,106,.06)" />
            <line x1="0" y1="0" x2="0" y2="2.4" stroke="rgba(226,96,106,.55)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* 房间与设施 */}
        {fp.rects.map((r, i) => (
          <g key={`r${i}`}>
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              className={
                r.kind === 'shelf' ? 'fp-shelf' : r.kind === 'accent' ? 'fp-accent' : 'fp-room'
              }
            />
            {r.label && (
              <text
                x={r.x + r.w / 2}
                y={r.y + r.h / 2 + 1}
                textAnchor="middle"
                className={r.sub ? 'fp-sub' : 'fp-label'}
              >
                {r.label}
              </text>
            )}
          </g>
        ))}

        {/* 墙线与门 */}
        {fp.lines.map((l, i) => (
          <line
            key={`l${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            className={
              l.kind === 'wall' ? 'fp-wall' : l.kind === 'accent' ? 'fp-accent-line' : 'fp-doorline'
            }
          />
        ))}

        {/* 强调区(斜纹) */}
        {(fp.blinds ?? []).map((b, i) => (
          <rect key={`b${i}`} x={b.x} y={b.y} width={b.w} height={b.h} className="fp-blind" />
        ))}

        {/* 标注文字 */}
        {fp.texts.map((t, i) => (
          <text
            key={`t${i}`}
            x={t.x}
            y={t.y}
            textAnchor={t.anchor ?? 'start'}
            className={
              t.kind === 'danger' ? 'fp-sub fp-danger' : t.kind === 'label' ? 'fp-label' : 'fp-sub'
            }
          >
            {t.text}
          </text>
        ))}

        {/* 圆点标记(你/垃圾篓等) */}
        {(fp.dots ?? []).map((d, i) => (
          <circle
            key={`d${i}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            className={d.kind === 'bin' ? 'fp-bin' : 'fp-you'}
          />
        ))}

        {/* 可点击热点(置于最上层) */}
        {data.hotspots.map((h) => (
          <rect
            key={h.id}
            x={h.x}
            y={h.y}
            width={h.w}
            height={h.h}
            className={`fp-hot ${isFound(h.clueId) ? 'found' : ''}`}
            onClick={() => clickHotspot(h)}
            data-testid={`hot-${h.id}`}
          />
        ))}
      </svg>
      {fp.legend && <div className="fp-legend">{fp.legend}</div>}

      {open ? (
        <div className="hotspot-panel" data-testid="hotspot-panel">
          <div className="hp-title">
            {open.label}
            {isFound(open.clueId) && <span className="clue-key-tag">线索</span>}
          </div>
          <p>{open.desc}</p>
        </div>
      ) : (
        <div className="fp-empty">点击图上的虚线区域,检查每个角落。</div>
      )}
    </div>
  )
}
