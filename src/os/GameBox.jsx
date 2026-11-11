import { motion } from 'motion/react'
import { statusLabels } from '../data/content'
import { art } from '../hooks'

const STATUS_COLOUR = { shipped: 'var(--mint)', progress: 'var(--sun)', academic: 'var(--lilac)', sketch: 'var(--pink)' }

export function GameBox({ p, onPick, selected, size = 1 }) {
  return (
    <motion.button
      onClick={() => onPick(p)}
      aria-pressed={selected}
      aria-label={`${p.title}, ${statusLabels[p.status]}`}
      whileHover={{ y: -8, rotate: -1.5 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 380, damping: 20 }}
      style={{
        position: 'relative', padding: 0, border: '3px solid var(--ink)', borderRadius: 12,
        background: p.cover.bg, color: p.cover.ink, overflow: 'hidden', aspectRatio: '3 / 4',
        boxShadow: selected ? '0 0 0 4px var(--sun), 6px 6px 0 var(--ink)' : '5px 5px 0 var(--ink)',
        display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%',
      }}
    >
      <div className="mono" style={{ background: 'var(--cream)', color: 'var(--ink)', borderBottom: '3px solid var(--ink)', padding: '4px 8px', fontSize: 10 * size, fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
        <span>PK GAMES</span><span>{p.status === 'sketch' ? 'IDEA' : 'PLAY'}</span>
      </div>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backgroundImage: 'radial-gradient(rgba(255,255,255,.25) 2px, transparent 2.2px)', backgroundSize: '12px 12px', minHeight: 0 }}>
        {p.cover.art
          ? <img src={art(p.cover.art)} alt="" style={{ maxHeight: '92%', maxWidth: '86%', objectFit: 'contain' }} />
          : <span className="comic" style={{ fontSize: 64 * size, opacity: 0.35, alignSelf: 'center' }}>AI</span>}
      </div>
      <div style={{ padding: '6px 10px 10px', background: 'rgba(20,20,20,.0)' }}>
        <div className="comic" style={{ fontSize: 24 * size, lineHeight: 1, textShadow: p.cover.ink === '#141414' ? 'none' : '2px 2px 0 #141414' }}>
          {/^\[/.test(p.title) ? <span className="ph" style={{ fontSize: 12 }}>{p.title}</span> : p.title}
        </div>
      </div>
      <span className="tag" style={{ position: 'absolute', top: 30 * size, right: 6, fontSize: 9, padding: '2px 7px', background: STATUS_COLOUR[p.status], color: 'var(--ink)', transform: 'rotate(6deg)' }}>{statusLabels[p.status]}</span>
    </motion.button>
  )
}

