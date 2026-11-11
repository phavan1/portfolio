import { motion } from 'motion/react'
import { useEffect } from 'react'
import { appById } from '../os/apps'
import { me } from '../data/content'

const K = '#141414'

// A window-style card: yellow title bar with a .EXE name, then content.
export function Card({ title, children, bg = 'var(--cream)', bar = 'var(--sun)', delay = 0, style, pad = 'clamp(18px, 3vw, 32px)' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: 'spring', stiffness: 220, damping: 24 }}
      style={{ background: bg, border: `3px solid ${K}`, borderRadius: 16, boxShadow: `7px 7px 0 ${K}`, overflow: 'hidden', ...style }}
    >
      {title && (
        <header style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', background: bar, borderBottom: `3px solid ${K}` }}>
          <span className="mono" style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.06em' }}>{title}</span>
          <span aria-hidden="true" style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
            {['#FFF6E5', '#FFF6E5', 'var(--tomato)'].map((c, i) => <span key={i} style={{ width: 15, height: 15, border: `2.5px solid ${K}`, borderRadius: 4, background: c }} />)}
          </span>
        </header>
      )}
      <div style={{ padding: pad }}>{children}</div>
    </motion.section>
  )
}

export function H({ children, size = 'clamp(40px, 6vw, 76px)', style }) {
  return <h1 style={{ margin: 0, fontWeight: 800, fontSize: size, lineHeight: 0.92, letterSpacing: '-.02em', textTransform: 'uppercase', ...style }}>{children}</h1>
}

const barBtn = (extra) => ({ minHeight: 42, fontSize: 14, padding: '0 16px', boxShadow: `3px 3px 0 ${K}`, ...extra })

// Every full page: striped wall background, a top bar, and the content.
export default function Page({ id, crumbs = [], tip, children, wide = 1180 }) {
  const app = appById(id)
  useEffect(() => { window.scrollTo(0, 0) }, [id])
  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'repeating-linear-gradient(90deg, #FF7140 0 30px, #FF5B2E 30px 64px)' }}>
      {/* colour wipe that matches the icon you clicked */}
      <motion.div aria-hidden="true" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
        style={{ position: 'fixed', inset: 0, background: app?.tile || 'var(--cream)', zIndex: 60, pointerEvents: 'none' }} />

      <nav aria-label="Page" style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, padding: '10px clamp(12px, 2vw, 22px)', background: '#fff', borderBottom: `3px solid ${K}` }}>
        <a href="#" className="btn" style={barBtn({ background: '#fff' })}>← Desk</a>
        {crumbs.map(([label, href], i) => (
          <a key={label} href={href} className="btn" style={barBtn({ background: i === crumbs.length - 1 ? 'var(--lilac)' : '#fff', textTransform: 'uppercase' })}>{label}</a>
        ))}
        {tip && window.innerWidth > 700 && (
          <span className="tip" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 36, padding: '0 14px 0 18px', background: 'var(--sun)', border: `2.5px solid ${K}`, borderRadius: 8, fontWeight: 600, fontSize: 14, clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%)' }}>{tip}</span>
        )}
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <a href="#resume" className="btn" style={barBtn({ background: 'var(--mint)' })}>Résumé</a>
          {me.resumePdf
            ? <a href={me.resumePdf} download className="btn" style={barBtn({ background: 'var(--sun)' })}>↓ Download CV</a>
            : <a href="#resume-print" className="btn" style={barBtn({ background: 'var(--sun)' })}>↓ CV</a>}
        </span>
      </nav>

      <main style={{ maxWidth: wide, margin: '0 auto', padding: 'clamp(20px, 4vw, 44px) clamp(14px, 3vw, 28px) 80px', display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>
        {children}
      </main>
    </div>
  )
}
