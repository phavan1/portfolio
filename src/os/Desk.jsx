import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import OS, { SCREEN } from './OS'
import MobileOS from './MobileOS'
import { appById } from './apps'
import { sceneMarkup } from './sceneMarkup'
import { go, useIsNarrow, useSkyPhase } from '../hooks'
import './desk.css'

// The camera. "desk" shows the whole desk; "screen" glides in towards the
// monitor just before a page opens (and back out when you return).
function camFor(w, h, zoomed) {
  if (!zoomed) {
    const s = Math.min(w / 1440, h / 900) * 0.88
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

export default function Desk({ returning }) {
  const narrow = useIsNarrow(760)
  if (narrow) return <MobileOS />
  return <DeskScene returning={returning} />
}

function DeskScene({ returning }) {
  const phase = useSkyPhase()
  const vp = useViewport()
  const [zoomed, setZoomed] = useState(!!returning)
  const [wipe, setWipe] = useState(null)
  const [sip, setSip] = useState(false)
  const busy = useRef(false)
  const cam = camFor(vp.w, vp.h, zoomed)
  const markup = useMemo(() => sceneMarkup(phase, import.meta.env.BASE_URL), [phase])

  // Coming back from a page: start close to the screen, then pull back.
  useEffect(() => {
    if (!returning) return
    const t = setTimeout(() => setZoomed(false), 120)
    return () => clearTimeout(t)
  }, [returning])

  // Open a page: glide in to the screen, then the icon's colour floods the view.
  const launch = (appId, el) => {
    if (busy.current || !appById(appId)) return
    busy.current = true
    setZoomed(true)
    setTimeout(() => {
      const r = el?.getBoundingClientRect?.()
      const x = r ? r.left + r.width / 2 : window.innerWidth / 2
      const y = r ? r.top + r.height / 2 : window.innerHeight / 2
      setWipe({ x, y, colour: appById(appId).tile, appId })
    }, 650)
  }

  const hit = (el) => {
    const node = el?.closest?.('[data-hit]')
    const h = node?.dataset.hit
    if (!h) return false
    if (h === 'mug') { setSip(true); setTimeout(() => setSip(false), 1600); return true }
    launch(h, node)
    return true
  }
  const onSceneClick = (e) => hit(e.target)
  const onSceneKey = (e) => { if ((e.key === 'Enter' || e.key === ' ') && hit(e.target)) e.preventDefault() }

  const deskLine = cam.y + 690 * cam.s
  const far = Math.hypot(window.innerWidth, window.innerHeight)

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#FFD447' }}>
      {/* the wall and desk carry on past the edges of the drawing */}
      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: deskLine, background: `repeating-linear-gradient(90deg, #FF7140 0 ${30 * cam.s}px, #FF5B2E ${30 * cam.s}px ${64 * cam.s}px)`, backgroundPositionX: cam.x }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: deskLine - 3 * cam.s, bottom: 0, borderTop: `${6 * cam.s}px solid #141414`, backgroundImage: 'radial-gradient(rgba(20,20,20,.16) 26%, transparent 27%)', backgroundSize: `${12 * cam.s}px ${12 * cam.s}px`, backgroundPosition: `${cam.x}px ${cam.y}px` }} />

      <motion.div
        initial={returning ? false : { x: cam.x, y: cam.y + 40, scale: cam.s, opacity: 0 }}
        animate={{ x: cam.x, y: cam.y, scale: cam.s, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.6, 0, 0.2, 1] }}
        style={{ position: 'absolute', left: 0, top: 0, width: 1440, height: 900, originX: 0, originY: 0 }}
      >
        <div className={`scene-wrap${sip ? ' sip' : ''}${zoomed ? ' zoomed' : ''}`} onClick={onSceneClick} onKeyDown={onSceneKey} dangerouslySetInnerHTML={{ __html: markup }} />
        <div style={{ position: 'absolute', left: SCREEN.x, top: SCREEN.y, width: SCREEN.w, height: SCREEN.h, borderRadius: 14, overflow: 'hidden', boxShadow: '0 0 0 5px #141414' }}>
          <OS onLaunch={launch} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(125deg, rgba(255,255,255,.16) 0 12%, transparent 12% 100%)' }} />
        </div>
      </motion.div>

      <div aria-hidden="true" className="grain" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}grain.png)` }} />

      <a className="btn" href="#resume" style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 5, minHeight: 40, fontSize: 14, background: 'var(--cream)' }}>Skip the tour</a>
      {!zoomed && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="tag"
          style={{ position: 'fixed', left: '50%', bottom: 16, x: '-50%', background: 'var(--cream)', fontSize: 12, zIndex: 5, pointerEvents: 'none' }}>
          Click an icon on the screen · the phone, sticker, sticky note and poster work too
        </motion.div>
      )}

      {wipe && (
        <motion.div
          aria-hidden="true"
          initial={{ clipPath: `circle(0px at ${wipe.x}px ${wipe.y}px)` }}
          animate={{ clipPath: `circle(${far}px at ${wipe.x}px ${wipe.y}px)` }}
          transition={{ duration: 0.5, ease: [0.5, 0, 0.3, 1] }}
          onAnimationComplete={() => go(wipe.appId)}
          style={{ position: 'fixed', inset: 0, zIndex: 50, background: wipe.colour }}
        />
      )}
    </div>
  )
}
