import { MotionConfig, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import OS, { SCREEN } from './OS'
import MobileOS from './MobileOS'
import { sceneMarkup } from './sceneMarkup'
import { useIsNarrow, useSkyPhase } from '../hooks'
import './desk.css'

// The camera. "desk" shows the whole desk; "screen" glides in until the
// monitor fills the view, so text inside the apps is easy to read.
function camFor(w, h, zoomed) {
  if (!zoomed) {
    const contain = Math.min(w / 1440, h / 900)
    const cover = Math.max(w / 1440, h / 900)
    const s = Math.min(cover, contain * 1.15)
    return { s, x: (w - 1440 * s) / 2, y: (h - 900 * s) / 2 }
  }
  const s = Math.min(w / 1000, h / 590)
  const cx = SCREEN.x + SCREEN.w / 2
  const cy = SCREEN.y + SCREEN.h / 2 + 18
  return { s, x: w / 2 - cx * s, y: h / 2 - cy * s }
}

function useViewport() {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return vp
}

export default function Desk({ initialApp, initialProject }) {
  const narrow = useIsNarrow(760)
  if (narrow) return <MobileOS initialApp={initialApp} initialProject={initialProject} />
  return <DeskScene initialApp={initialApp} initialProject={initialProject} />
}

function DeskScene({ initialApp, initialProject }) {
  const phase = useSkyPhase()
  const vp = useViewport()
  const [zoomed, setZoomed] = useState(!!initialApp)
  const [launch, setLaunch] = useState(() => ({ app: initialApp || 'projects', project: initialProject, zoom: !!initialApp }))
  const [sip, setSip] = useState(false)
  const cam = camFor(vp.w, vp.h, zoomed)
  const markup = useMemo(() => sceneMarkup(phase, import.meta.env.BASE_URL), [phase])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && zoomed && !document.querySelector('[data-lightbox]')) setZoomed(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  const hit = (el) => {
    const h = el?.closest?.('[data-hit]')?.dataset.hit
    if (!h) return false
    if (h === 'mug') { setSip(true); setTimeout(() => setSip(false), 1600); return true }
    setLaunch({ app: h, n: Date.now() })
    return true
  }
  const onSceneClick = (e) => { if (!hit(e.target) && zoomed) setZoomed(false) }
  const onSceneKey = (e) => { if ((e.key === 'Enter' || e.key === ' ') && hit(e.target)) e.preventDefault() }

  const deskLine = cam.y + 690 * cam.s

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: `linear-gradient(#FF6636 0 ${deskLine}px, #FFD447 ${deskLine}px)` }}>
      <MotionConfig transformPagePoint={(p) => ({ x: p.x / cam.s, y: p.y / cam.s })}>
        <motion.div
          initial={{ x: cam.x, y: cam.y + 40, scale: cam.s, opacity: 0 }}
          animate={{ x: cam.x, y: cam.y, scale: cam.s, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.6, 0, 0.2, 1] }}
          style={{ position: 'absolute', left: 0, top: 0, width: 1440, height: 900, originX: 0, originY: 0 }}
        >
          <div className={`scene-wrap${sip ? ' sip' : ''}${zoomed ? ' zoomed' : ''}`} onClick={onSceneClick} onKeyDown={onSceneKey} dangerouslySetInnerHTML={{ __html: markup }} />
          <div style={{ position: 'absolute', left: SCREEN.x, top: SCREEN.y, width: SCREEN.w, height: SCREEN.h, borderRadius: 14, overflow: 'hidden', boxShadow: '0 0 0 5px #141414' }}>
            <OS zoomed={zoomed} onWantZoom={() => setZoomed(true)} onDesk={() => setZoomed(false)} launch={launch} />
            {!zoomed && (
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(125deg, rgba(255,255,255,.18) 0 12%, transparent 12% 100%)' }} />
            )}
          </div>
        </motion.div>
      </MotionConfig>

      <div aria-hidden="true" className="grain" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}grain.png)` }} />

      <div style={{ position: 'fixed', right: 16, bottom: 16, display: 'flex', gap: 10, zIndex: 5 }}>
        <a className="btn" href="#resume" style={{ minHeight: 40, fontSize: 14, background: 'var(--cream)' }}>Skip the tour</a>
      </div>
      {zoomed && (
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="btn" onClick={() => setZoomed(false)}
          style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 5, minHeight: 40, fontSize: 14, background: 'var(--mint)' }}>↙ Back to the desk</motion.button>
      )}
      {!zoomed && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="tag"
          style={{ position: 'fixed', left: '50%', bottom: 16, x: '-50%', background: 'var(--cream)', fontSize: 12, zIndex: 5, pointerEvents: 'none' }}>
          Click the screen to sit down · the phone, sticker, sticky note and poster work too
        </motion.div>
      )}
    </div>
  )
}
