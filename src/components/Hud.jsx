import { go, useIsNarrow } from '../hooks'

const Icon = ({ d }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)

// The bar along the top of every screen.
export default function Hud({ where, hint }) {
  const tiny = useIsNarrow(600)
  const link = (path, label, active) => (
    <a href={`#${path}`} className="btn" style={{ minHeight: 42, fontSize: 15, padding: '0 16px', background: active ? 'var(--lilac)' : '#fff' }} aria-current={active ? 'page' : undefined}>{label}</a>
  )
  return (
    <nav aria-label="Main" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, padding: '12px 16px', pointerEvents: 'none' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', pointerEvents: 'auto' }}>
        <a href="#room" aria-label="Back to the room" className="btn comic" style={{ minHeight: 42, width: 46, padding: 0, background: 'var(--cobalt)', color: 'var(--sun)', fontSize: 20 }}>PK</a>
        {!tiny && link('room', 'Room', where === 'room')}
        {link('library', 'Projects', where === 'library' || where === 'project')}
        {hint && !tiny && (
          <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 36, padding: '0 14px', borderRadius: 10, border: '2px solid var(--ink)', background: 'var(--cream)', fontSize: 13, fontWeight: 700 }}>{hint}</span>
        )}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: tiny ? 6 : 10, pointerEvents: 'auto' }}>
        <a href="#resume" className="btn" style={{ minHeight: 42, fontSize: 15, padding: '0 16px', background: where === 'resume' ? 'var(--lilac)' : 'var(--mint)' }}>
          {where === 'room' && !tiny ? 'Skip the tour' : 'Résumé'}
        </a>
        <button onClick={() => go('resume-print')} className="btn" style={{ minHeight: 42, fontSize: 15, padding: '0 16px', background: 'var(--sun)' }}>
          <Icon d="M12 3v12M7 10l5 5 5-5M5 21h14" /> CV
        </button>
      </div>
    </nav>
  )
}
