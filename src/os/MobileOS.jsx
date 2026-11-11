import { motion } from 'motion/react'
import { APPS } from './apps'
import { Icon, Monogram } from './OS'
import { me } from '../data/content'
import { art, go } from '../hooks'

// On phones the desk becomes a phone home screen: icons in a grid,
// each one opens its full page (pages scroll down, never sideways).
export default function MobileOS() {
  const clock = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', hour: 'numeric', minute: '2-digit' }).format(new Date())
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cobalt)', backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 2.6px, transparent 2.7px)', backgroundSize: '16px 16px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', right: -90, bottom: -60, width: 300, height: 300, borderRadius: '50%', background: 'var(--sun)', border: '5px solid var(--ink)' }} />
      <header style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'var(--cream)', borderBottom: '3px solid var(--ink)' }}>
        <Monogram size={30} />
        <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{clock.toUpperCase()} · MELBOURNE</span>
      </header>

      <div style={{ position: 'relative', padding: '18px 16px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ flex: '0 0 76px', height: 76, borderRadius: '50%', background: 'var(--pink)', border: '3px solid var(--ink)', overflow: 'hidden', boxShadow: '0 0 0 4px #fff, 0 0 0 7px var(--ink)' }}>
            <img src={art('talking')} alt="" style={{ width: '100%' }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 24, lineHeight: 1 }}>Hi, I’m {me.short}.</div>
            <div style={{ fontSize: 15, marginTop: 4 }}>{me.tagline}</div>
            <div className="mono" style={{ fontSize: 11, marginTop: 6, fontWeight: 700 }}>MASTER OF AI · RMIT · MELBOURNE</div>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 18, justifyItems: 'center' }}>
          {APPS.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i, type: 'spring' }}>
              <Icon app={a} size={64} onOpen={(id) => go(id)} />
            </motion.div>
          ))}
        </div>

        <a href="#resume" className="btn" style={{ alignSelf: 'center', background: 'var(--cream)', fontSize: 15 }}>Skip the tour: plain résumé</a>
      </div>
    </div>
  )
}
