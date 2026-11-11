import { AnimatePresence, motion, useDragControls, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { APPS, appById, glyphs } from './apps'

export const SCREEN = { x: 282, y: 96, w: 876, h: 458 }
const BAR = 30
const AREA = { w: SCREEN.w, h: SCREEN.h - BAR }

function useMelbourneClock() {
  const fmt = () => new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date()).replace(',', '').toUpperCase()
  const [t, setT] = useState(fmt)
  useEffect(() => { const i = setInterval(() => setT(fmt()), 15000); return () => clearInterval(i) }, [])
  return t
}

/* One draggable app window. */
function Win({ win, top, onFocus, onClose, onToggleMax, areaRef }) {
  const app = appById(win.app)
  const controls = useDragControls()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => { if (win.max) { x.set(0); y.set(0) } }, [win.max, x, y])
  const box = win.max ? { left: 0, top: 0, width: AREA.w, height: AREA.h } : { left: win.x, top: win.y, width: win.w, height: win.h }
  const Body = app.Body
  return (
    <motion.section
      role="dialog" aria-label={app.title}
      drag={!win.max} dragListener={false} dragControls={controls} dragConstraints={areaRef} dragMomentum={false} dragElastic={0}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{ position: 'absolute', ...box, x, y, zIndex: win.z, display: 'flex', flexDirection: 'column', background: 'var(--cream)', border: '3px solid var(--ink)', borderRadius: win.max ? 0 : 10, boxShadow: win.max ? 'none' : `${top ? 7 : 4}px ${top ? 7 : 4}px 0 var(--ink)`, overflow: 'hidden' }}
    >
      <header
        onPointerDown={(e) => !win.max && controls.start(e)}
        onDoubleClick={onToggleMax}
        style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 0 12px', height: 30, background: top ? 'var(--sun)' : '#E5DCCB', borderBottom: '3px solid var(--ink)', cursor: win.max ? 'default' : 'grab', touchAction: 'none', userSelect: 'none' }}
      >
        <span className="mono" style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.title}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
          <button onPointerDown={(e) => e.stopPropagation()} onClick={onToggleMax} aria-label={win.max ? 'Restore window' : 'Maximise window'} style={{ width: 20, height: 20, padding: 0, border: '2.5px solid var(--ink)', borderRadius: 4, background: '#FFF6E5', display: 'grid', placeItems: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="1" width="8" height="8" fill="none" stroke="#141414" strokeWidth="2" /></svg>
          </button>
          <button onPointerDown={(e) => e.stopPropagation()} onClick={onClose} aria-label={`Close ${app.label}`} style={{ width: 20, height: 20, padding: 0, border: '2.5px solid var(--ink)', borderRadius: 4, background: 'var(--tomato)', display: 'grid', placeItems: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2 2 8" stroke="#141414" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </span>
      </header>
      <div style={{ flex: 1, overflow: 'auto', overscrollBehavior: 'contain' }}>
        <Body initial={win.project} />
      </div>
    </motion.section>
  )
}

export function Icon({ app, onOpen, size = 58, labelColour = '#FFF6E5' }) {
  return (
    <motion.button
      onClick={() => onOpen(app.id)}
      whileHover={{ y: -4, rotate: -2 }} whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      aria-label={`Open ${app.label}`}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 0, border: 'none', background: 'none' }}
    >
      <span style={{ width: size, height: size * 0.88, display: 'grid', placeItems: 'center', background: app.tile, border: '3px solid var(--ink)', borderRadius: 12, boxShadow: '3px 3px 0 var(--ink)' }}>{glyphs[app.id]}</span>
      <span className="mono" style={{ fontSize: 10.5, fontWeight: 700, color: labelColour, background: 'var(--ink)', borderRadius: 5, padding: '1px 7px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{app.label}</span>
    </motion.button>
  )
}

/* The whole operating system, drawn inside the monitor's screen. */
export default function OS({ zoomed, onWantZoom, onDesk, launch }) {
  const clock = useMelbourneClock()
  const area = useRef(null)
  const zTop = useRef(10)
  const [wins, setWins] = useState([])

  const open = (appId, project, zoom = true) => {
    const app = appById(appId)
    if (!app) return
    if (zoom) onWantZoom()
    setWins((ws) => {
      const z = ++zTop.current
      const found = ws.find((w) => w.app === appId)
      if (found) return ws.map((w) => (w.app === appId ? { ...w, z, project: project ?? w.project, key: project ? `${appId}-${project}-${z}` : w.key } : w))
      const n = ws.length
      const x = Math.max(0, Math.min(270 + n * 26, AREA.w - Math.min(app.w, AREA.w)))
      const yy = Math.max(0, Math.min(10 + n * 20, AREA.h - app.h))
      return [...ws, { key: `${appId}-${z}`, app: appId, project, x, y: yy, w: Math.min(app.w, AREA.w), h: Math.min(app.h, AREA.h), z, max: !!project }]
    })
  }

  // Launch requests from outside (desk props, deep links).
  useEffect(() => {
    if (launch) open(launch.app, launch.project, launch.zoom !== false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launch])

  // Keep the address bar in step with the front window (no reload).
  useEffect(() => {
    const top = [...wins].sort((a, b) => b.z - a.z)[0]
    const name = !zoomed || !top ? 'desk' : top.project ? `project-${top.project}` : top.app
    if (window.location.hash !== `#${name}`) history.replaceState(null, '', `#${name}`)
  }, [wins, zoomed])

  const focus = (key) => setWins((ws) => {
    const w0 = ws.find((w) => w.key === key)
    if (!w0 || w0.z === zTop.current) return ws // already in front: no re-render
    return ws.map((w) => (w.key === key ? { ...w, z: ++zTop.current } : w))
  })
  const close = (key) => setWins((ws) => ws.filter((w) => w.key !== key))
  const toggleMax = (key) => setWins((ws) => ws.map((w) => (w.key === key ? { ...w, max: !w.max } : w)))
  const topKey = wins.length ? [...wins].sort((a, b) => b.z - a.z)[0].key : null

  return (
    <div
      onPointerDownCapture={() => !zoomed && onWantZoom()}
      style={{ position: 'absolute', inset: 0, background: 'var(--cobalt)', backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 2.6px, transparent 2.7px)', backgroundSize: '16px 16px', fontFamily: 'var(--display)', overflow: 'hidden' }}
    >
      {/* wallpaper sun */}
      <div aria-hidden="true" style={{ position: 'absolute', left: 648, top: 224, width: 300, height: 300, borderRadius: '50%', background: 'var(--sun)', border: '5px solid var(--ink)', backgroundImage: 'radial-gradient(rgba(20,20,20,.16) 2.4px, transparent 2.5px)', backgroundSize: '12px 12px' }} />

      {/* menu bar */}
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: BAR, display: 'flex', alignItems: 'center', gap: 14, padding: '0 12px', background: 'var(--cream)', borderBottom: '3px solid var(--ink)', zIndex: 1000 }}>
        <button onClick={() => open('about')} className="comic" style={{ border: 'none', background: 'none', padding: 0, fontSize: 21, lineHeight: 1 }}>PHAVAN OS</button>
        <nav aria-label="Quick links" className="mono" style={{ display: 'flex', gap: 12, fontSize: 12 }}>
          {[['projects', 'Projects'], ['resume', 'Résumé'], ['contact', 'Say hi']].map(([id, l]) => (
            <button key={id} onClick={() => open(id)} style={{ border: 'none', background: 'none', padding: 0, fontFamily: 'var(--mono)', fontSize: 12 }}>{l}</button>
          ))}
        </nav>
        <span className="mono" style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 12 }}>{clock} · MELBOURNE</span>
        {zoomed && (
          <button onClick={(e) => { e.stopPropagation(); onDesk() }} className="mono" style={{ border: '2px solid var(--ink)', borderRadius: 6, background: 'var(--mint)', fontWeight: 700, fontSize: 11, padding: '1px 8px' }}>
            ↙ DESK
          </button>
        )}
      </div>

      {/* icons */}
      <div style={{ position: 'absolute', left: 18, top: BAR + 16, display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', rowGap: 14, justifyItems: 'center' }}>
        {APPS.filter((a) => !a.hidden).map((a) => <Icon key={a.id} app={a} onOpen={(id) => open(id)} />)}
      </div>

      {/* windows */}
      <div ref={area} style={{ position: 'absolute', left: 0, top: BAR, width: AREA.w, height: AREA.h, pointerEvents: 'none' }}>
        <AnimatePresence>
          {wins.map((w) => (
            <div key={w.key} style={{ pointerEvents: 'auto' }}>
              <Win win={w} top={w.key === topKey} areaRef={area} onFocus={() => focus(w.key)} onClose={() => close(w.key)} onToggleMax={() => toggleMax(w.key)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
