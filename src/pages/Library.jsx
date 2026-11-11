import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import Hud from '../components/Hud'
import T from '../components/Text'
import { projects, statusLabels } from '../data/content'
import { art, go, useIsNarrow } from '../hooks'

const STATUS_COLOUR = { shipped: 'var(--mint)', progress: 'var(--sun)', academic: 'var(--lilac)', sketch: 'var(--pink)' }

export function GameBox({ p, onPick, selected, size = 1 }) {
  return (
    <motion.button
      layout
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

function Details({ p, onClose }) {
  return (
    <motion.aside
      key={p.id}
      className="card"
      initial={{ opacity: 0, x: 30, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: 30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12, background: '#fff' }}
      aria-label={`${p.title} details`}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 64, height: 64, flex: '0 0 64px', borderRadius: 12, border: '3px solid var(--ink)', background: p.cover.bg, display: 'grid', placeItems: 'end center', overflow: 'hidden' }}>
          {p.cover.art && <img src={art(p.cover.art)} alt="" style={{ height: 58 }} />}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 26, lineHeight: 1 }}><T>{p.title}</T></div>
          <div style={{ fontSize: 15, marginTop: 4 }}>{p.kind}</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.45 }}><T>{p.blurb}</T></p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <span className="tag" style={{ background: STATUS_COLOUR[p.status] }}>{statusLabels[p.status]}</span>
        {(p.requirements[0]?.[1] && !/^\[/.test(p.requirements[0][1])) && <span className="tag">{p.requirements[0][1].split(',')[0]}</span>}
      </div>
      {p.shots.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {p.shots.slice(0, 3).map((s) => <img key={s} src={`${import.meta.env.BASE_URL}shots/${s}.jpg`} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', objectPosition: 'top', border: '2px solid var(--ink)', borderRadius: 6 }} />)}
        </div>
      )}
      <a className="btn" href={`#project-${p.id}`} style={{ background: 'var(--sun)', fontSize: 18 }}>Open</a>
      {p.play && <a className="btn" href={p.play} target="_blank" rel="noreferrer" style={{ fontSize: 15, minHeight: 42 }}>Play it live ↗</a>}
      <button className="btn" onClick={onClose} style={{ fontSize: 14, minHeight: 40, boxShadow: 'none' }}>Close</button>
    </motion.aside>
  )
}

export default function Library({ initialFilter }) {
  const narrow = useIsNarrow(860)
  const [filter, setFilter] = useState(initialFilter && statusLabels[initialFilter] ? initialFilter : 'all')
  const [sel, setSel] = useState(null)
  const list = filter === 'all' ? projects : projects.filter((p) => p.status === filter)
  const count = (k) => (k === 'all' ? projects.length : projects.filter((p) => p.status === k).length)

  return (
    <motion.div className="dots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} style={{ minHeight: '100vh', padding: narrow ? '84px 12px 32px' : '86px 28px 40px' }}>
      <Hud where="library" hint={narrow ? null : 'Pick a game box to see what’s inside'} />
      {/* the monitor */}
      <div style={{ maxWidth: 1240, margin: '0 auto', background: 'var(--cream)', border: '5px solid var(--ink)', borderRadius: narrow ? 22 : 36, padding: narrow ? 10 : 22, boxShadow: '10px 10px 0 var(--ink)' }}>
        <div style={{ border: '4px solid var(--ink)', borderRadius: 14, overflow: 'hidden', background: '#1B2560' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--sun)', borderBottom: '4px solid var(--ink)' }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: 18, letterSpacing: '.08em' }}>PHAVAN.EXE</span>
            <span className="mono" style={{ fontSize: 13, opacity: 0.8 }}>library</span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }} aria-hidden="true">
              {['#FFF6E5', '#FFF6E5', '#FF5B2E'].map((c, i) => <span key={i} style={{ width: 18, height: 18, border: '2.5px solid var(--ink)', borderRadius: 4, background: c }} />)}
            </span>
            <button onClick={() => go('room-back')} className="btn" style={{ minHeight: 36, fontSize: 14, padding: '0 12px', boxShadow: 'none' }}>← Back to the room</button>
          </div>
          <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', minHeight: narrow ? 0 : 620 }}>
            {/* sidebar */}
            <nav aria-label="Filter projects" style={{ flex: narrow ? 'none' : '0 0 230px', background: 'var(--cream)', borderRight: narrow ? 'none' : '4px solid var(--ink)', borderBottom: narrow ? '4px solid var(--ink)' : 'none', padding: narrow ? 10 : '16px 0' }}>
              {!narrow && <div className="mono" style={{ fontWeight: 700, padding: '0 18px 10px', fontSize: 14 }}>LIBRARY</div>}
              <div style={{ display: 'flex', flexDirection: narrow ? 'row' : 'column', flexWrap: 'wrap', gap: narrow ? 8 : 2 }}>
                {Object.keys(statusLabels).map((k) => {
                  const on = filter === k
                  return (
                    <button key={k} onClick={() => { setFilter(k); setSel(null) }} aria-pressed={on}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                        padding: narrow ? '6px 12px' : '10px 18px', border: narrow ? '2.5px solid var(--ink)' : 'none', borderRadius: narrow ? 999 : 0,
                        background: on ? 'var(--cobalt)' : 'transparent', color: on ? '#fff' : 'var(--cobalt)',
                        fontWeight: 800, fontSize: narrow ? 15 : 19, textTransform: 'uppercase', textAlign: 'left',
                      }}>
                      {statusLabels[k]}
                      <span className="mono" style={{ minWidth: 30, textAlign: 'center', border: '2.5px solid var(--ink)', borderRadius: 7, background: on ? 'var(--sun)' : '#fff', color: 'var(--ink)', fontSize: 14, padding: '0 6px' }}>{count(k)}</span>
                    </button>
                  )
                })}
              </div>
            </nav>
            {/* shelf of games */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: 18, padding: narrow ? 14 : 22, background: '#8FA0FF', backgroundImage: 'linear-gradient(transparent 0 calc(100% - 14px), #FF5B2E calc(100% - 14px))' }}>
              <motion.div layout style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${narrow ? 130 : 160}px, 1fr))`, gap: narrow ? 14 : 22, alignContent: 'start' }}>
                <AnimatePresence mode="popLayout">
                  {list.map((p) => (
                    <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                      <GameBox p={p} onPick={setSel} selected={sel?.id === p.id} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence mode="wait">
                {sel && (
                  <div style={{ flex: narrow ? 'none' : '0 0 300px' }}>
                    <Details p={sel} onClose={() => setSel(null)} />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: narrow ? 8 : 14 }} aria-hidden="true">
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--mint)', border: '3px solid var(--ink)' }} />
        </div>
      </div>
    </motion.div>
  )
}
