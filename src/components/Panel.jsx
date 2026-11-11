import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

// A comic-card pop-up used by every object in the room.
export default function Panel({ title, kicker, colour = 'var(--cream)', onClose, children, wide }) {
  const ref = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    ref.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [onClose])

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'grid', placeItems: 'center', padding: 16, background: 'rgba(20,20,20,.45)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="card"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, scale: 0.9, rotate: -2, opacity: 0 }}
        animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
        exit={{ y: 30, scale: 0.94, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        style={{ width: wide ? 'min(900px, 100%)' : 'min(620px, 100%)', maxHeight: 'calc(100vh - 32px)', overflow: 'auto', background: colour, outline: 'none' }}
      >
        <header style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 14px 12px 22px', background: 'var(--ink)', color: 'var(--sun)', zIndex: 1 }}>
          <span className="mono" style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase' }}>{kicker}</span>
          <button onClick={onClose} aria-label="Close" style={{ width: 40, height: 40, borderRadius: 10, border: '2px solid var(--sun)', background: 'transparent', color: 'var(--sun)', display: 'grid', placeItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>
        <div style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(30px, 5vw, 44px)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-.01em' }}>{title}</h2>
          {children}
        </div>
      </motion.section>
    </motion.div>
  )
}
