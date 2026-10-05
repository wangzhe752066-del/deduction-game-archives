import type { SceneDef } from '../types'

/**
 * 监控画面场景:纯 CSS 插画(背景 + 人物剪影 + 雨丝/扫描线/噪点)。
 * 全部由 SceneDef 数据驱动,各案件共用。
 */
export default function CCTVScene({ scene }: { scene: SceneDef }) {
  const f = scene.figure
  return (
    <div
      className={`cctv-scene bg-${scene.bg} anim-${f?.anim ?? 'none'}`}
      data-testid="cctv-scene"
      aria-hidden
    >
      <div className="scene-bg">
        {scene.bg === 'corridor' && (
          <>
            <div className="sc-door-room d-stor">
              <span>{scene.roomLabels?.[0] ?? ''}</span>
            </div>
            <div className="sc-door-room d-wc">
              <span>{scene.roomLabels?.[1] ?? ''}</span>
            </div>
          </>
        )}
        {(scene.bg === 'hall' || scene.bg === 'counter') && (
          <>
            {scene.shelves && (
              <>
                <div className="sc-shelf sh1" />
                <div className="sc-shelf sh2" />
              </>
            )}
            {scene.bg === 'counter' && (
              <div className="sc-counter">
                <span>{scene.counterLabel}</span>
              </div>
            )}
            <div className="sc-door">
              <span>{scene.doorLabel ?? ''}</span>
            </div>
          </>
        )}
        {scene.staticProp === 'parcel' && <div className="sp-parcel" />}
        {scene.staticProp === 'printer' && (
          <div className="sp-printer">
            <i className="sp-paper" />
            <i className="sp-led" />
          </div>
        )}
        {scene.staticProp === 'painting' && <div className="sp-painting" />}
        {scene.staticProp === 'paper' && <div className="sp-paper-floor" />}
      </div>
      {f && (
        <div className={`figure v-${f.suit}`}>
          <div className="fg-inner">
            <div className="fg-head" />
            <div className="fg-body" />
            <div className="fg-arm fg-arm-l">{f.bandage && <span className="bandage" />}</div>
            <div className="fg-arm fg-arm-r" />
            <div className="fg-legs">
              <i className="fg-leg l1" />
              <i className="fg-leg l2" />
            </div>
            {f.props?.includes('bag') && <span className="fg-bag" />}
            {f.props?.includes('cup') && <span className="fg-cup" />}
            {f.props?.includes('parcel') && <span className="fg-parcel" />}
            {f.props?.includes('crate') && <span className="fg-crate" />}
            {f.props?.includes('toolbox') && <span className="fg-toolbox" />}
          </div>
        </div>
      )}
      <div className="rain" />
      <div className="scanlines" />
      <div className="noise" />
    </div>
  )
}
