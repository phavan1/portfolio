import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { APPS, glyphs } from './apps'
import { me } from '../data/content'
import { art } from '../hooks'

export const SCREEN = { x: 282, y: 96, w: 876, h: 458 }
const BAR = 30
const K = '#141414'

function useMelbourneClock() {
  const fmt = () => new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date()).replace(',', '').toUpperCase()
  const [t, setT] = useState(fmt)
  useEffect(() => { const i = setInterval(() => setT(fmt()), 15000); return () => clearInterval(i) }, [])
  return t
}

// The PK monogram: a little round badge, like a logo on a real computer.
export function Monogram({ size = 22 }) {
  return (
    <span className="comic" aria-hidden="true" style={{ display: 'inline-grid', placeItems: 'center', width: size, height: size, borderRadius: '50%', background: 'var(--cobalt)', color: 'var(--sun)', border: `2px solid ${K}`, fontSize: size * 0.52, lineHeight: 1 }}>PK</span>
  )
}

export function Icon({ app, onOpen, size = 58, labelColour = '#FFF6E5' }) {
  return (
    <motion.button
      onClick={(e) => onOpen(app.id, e.currentTarget)}
      whileHover={{ y: -4, rotate: -2 }} whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      aria-label={`Open ${app.label}`}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 0, border: 'none', background: 'none' }}
    >
      <span style={{ width: size, height: size * 0.88, display: 'grid', placeItems: 'center', background: app.tile, border: `3px solid ${K}`, borderRadius: 12, boxShadow: `3px 3px 0 ${K}` }}>{glyphs[app.id]}</span>
      <span className="mono" style={{ fontSize: 10.5, fontWeight: 700, color: labelColour, background: K, borderRadius: 5, padding: '1px 7px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{app.label}</span>
    </motion.button>
  )
}

// The desktop drawn inside the monitor. It's a menu: every icon opens a
// full page (the reading happens there, never in tiny windows).
export default function OS({ onLaunch }) {
  const clock = useMelbourneClock()
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--cobalt)', backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 2.6px, transparent 2.7px)', backgroundSize: '16px 16px', fontFamily: 'var(--display)', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: 600, top: 210, width: 320, height: 320, borderRadius: '50%', background: 'var(--sun)', border: `5px solid ${K}`, backgroundImage: 'radial-gradient(rgba(20,20,20,.16) 2.4px, transparent 2.5px)', backgroundSize: '12px 12px' }} />

      {/* menu bar */}
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: BAR, display: 'flex', alignItems: 'center', gap: 14, padding: '0 12px', background: 'var(--cream)', borderBottom: `3px solid ${K}`, zIndex: 2 }}>
        <button onClick={(e) => onLaunch('about', e.currentTarget)} aria-label="About me" style={{ border: 'none', background: 'none', padding: 0, display: 'flex' }}><Monogram /></button>
        <nav aria-label="Quick links" style={{ display: 'flex', gap: 12 }}>
          {[['projects', 'Projects'], ['resume', 'Résumé'], ['contact', 'Say hi']].map(([id, l]) => (
            <button key={id} onClick={(e) => onLaunch(id, e.currentTarget)} style={{ border: 'none', background: 'none', padding: 0, fontFamily: 'var(--mono)', fontSize: 12 }}>{l}</button>
          ))}
        </nav>
        <span className="mono" style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 12 }}>{clock} · MELBOURNE</span>
      </div>

      {/* icons */}
      <div style={{ position: 'absolute', left: 22, top: BAR + 18, display: 'grid', gridTemplateColumns: 'repeat(3, 84px)', rowGap: 16, justifyItems: 'center' }}>
        {APPS.filter((a) => !a.hidden).map((a) => <Icon key={a.id} app={a} onOpen={onLaunch} />)}
      </div>

      {/* welcome note on the desktop */}
      <motion.div
        initial={{ opacity: 0, y: 14, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ delay: 0.9, type: 'spring' }}
        style={{ position: 'absolute', left: 372, top: 70, width: 300, background: '#FFF6E5', border: `3px solid ${K}`, borderRadius: 12, boxShadow: `5px 5px 0 ${K}`, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}
      >
        <div style={{ flex: '0 0 64px', height: 64, borderRadius: '50%', background: 'var(--pink)', border: `3px solid ${K}`, overflow: 'hidden' }}>
          <img src={art('talking')} alt="" style={{ width: '100%' }} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 22, lineHeight: 1 }}>Hi, I’m {me.short}.</div>
          <div style={{ fontSize: 13, marginTop: 4, lineHeight: 1.3 }}>Pick an icon to open it. Start with <strong>Projects</strong>.</div>
        </div>
      </motion.div>
    </div>
  )
}
