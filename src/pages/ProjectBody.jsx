import { motion } from 'motion/react'
import { useState } from 'react'
import T from '../components/Text'
import { projects, statusLabels } from '../data/content'
import { art, shot } from '../hooks'

const Section = ({ title, children, tint = '#fff', delay = 0 }) => (
  <motion.section
    className="card"
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay }}
    style={{ padding: 'clamp(18px, 3vw, 28px)', background: tint, display: 'flex', flexDirection: 'column', gap: 14 }}
  >
    <h2 className="mono" style={{ margin: 0, fontSize: 15, letterSpacing: '.1em', textTransform: 'uppercase' }}>// {title}</h2>
    {children}
  </motion.section>
)

const Empty = ({ what }) => <span className="ph">[{what}]</span>

export default function ProjectBody({ id }) {
  const p = projects.find((x) => x.id === id)
  const [big, setBig] = useState(null)
  if (!p) return <div style={{ padding: 40, textAlign: 'center' }}>That game isn’t in the library.</div>

  return (
    <div>

      {/* hero banner */}
      <motion.header
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{}}
      >
        <div className="card" style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', background: p.cover.bg }}>
          <div style={{ flex: '1 1 320px', minHeight: 340, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backgroundImage: 'radial-gradient(rgba(255,255,255,.25) 2px, transparent 2.2px)', backgroundSize: '14px 14px', borderRight: '3px solid var(--ink)', paddingTop: 24 }}>
            {p.cover.art
              ? <motion.img src={art(p.cover.art)} alt="" initial={{ y: 40 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }} style={{ maxHeight: 330, maxWidth: '80%' }} />
              : <span className="comic" style={{ fontSize: 140, color: p.cover.ink, opacity: 0.4, alignSelf: 'center' }}>AI</span>}
          </div>
          <div style={{ flex: '999 1 440px', minWidth: 0, background: 'var(--cream)', padding: 'clamp(22px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="tag" style={{ background: 'var(--sun)' }}>{statusLabels[p.status]}</span>
              <span className="tag">{p.kind}</span>
            </div>
            <h1 style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-.02em' }}><T>{p.title}</T></h1>
            {p.quote && <p style={{ margin: 0, fontSize: 21, fontStyle: 'italic' }}>{p.quote}</p>}
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5 }}><T>{p.blurb}</T></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
              {p.play
                ? <a className="btn" href={p.play} target="_blank" rel="noreferrer" style={{ background: 'var(--mint)', fontSize: 19 }}>▶ Play now</a>
                : <span className="btn" aria-disabled="true" style={{ fontSize: 17 }}>{p.status === 'sketch' ? 'Not built yet' : <><span className="ph">[LIVE LINK]</span></>}</span>}
              {p.code && <a className="btn" href={p.code} target="_blank" rel="noreferrer">Code on GitHub</a>}
              <a className="btn" href="#projects" style={{ background: 'var(--lilac)' }}>← All projects</a>
            </div>
          </div>
        </div>
      </motion.header>

      <div style={{ padding: '28px 0 0', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        {/* main column */}
        <div style={{ flex: '999 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Section title="Screenshots" tint="#1B2560">
            {p.shots.length ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
                {p.shots.map((s, i) => (
                  <motion.button key={s} onClick={() => setBig(s)} whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
                    aria-label={`Open screenshot ${i + 1}`}
                    style={{ padding: 6, borderRadius: 22, border: '3px solid var(--ink)', background: '#141414', boxShadow: '4px 4px 0 var(--sun)' }}>
                    <img src={shot(s)} alt={`${p.title} screenshot ${i + 1}`} style={{ width: '100%', borderRadius: 16 }} />
                  </motion.button>
                ))}
              </div>
            ) : <div style={{ color: '#fff' }}><Empty what="SCREENSHOTS" /></div>}
          </Section>

          <Section title="About this game">
            {p.about.map((t, i) => <p key={i} style={{ margin: 0, fontSize: 18, lineHeight: 1.6 }}><T>{t}</T></p>)}
          </Section>

          <Section title={`Patch notes${p.patchNotes.length ? ` · ${p.patchNotes.length} highlights` : ''}`} tint="#141414">
            {p.patchNotes.length ? (
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {p.patchNotes.map(([v, t], i) => (
                  <motion.li key={v} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 12, padding: '8px 0', borderBottom: '1px dashed rgba(255,246,229,.25)', color: 'var(--cream)', fontSize: 17 }}>
                    <span className="mono" style={{ color: 'var(--sun)', fontWeight: 700 }}>{v}</span><span>{t}</span>
                  </motion.li>
                ))}
              </ol>
            ) : <div><Empty what="VERSION HISTORY" /></div>}
          </Section>

          <Section title="Player reviews" tint="var(--pink)">
            {p.reviews.length ? p.reviews.map((r, i) => (
              <blockquote key={i} style={{ margin: 0, background: '#fff', border: '3px solid var(--ink)', borderRadius: 18, padding: '14px 18px', fontSize: 18, position: 'relative', boxShadow: '4px 4px 0 var(--ink)' }}><T>{r}</T></blockquote>
            )) : <div><Empty what="REAL QUOTES FROM PEOPLE WHO USED IT" /></div>}
          </Section>
        </div>

        {/* side column */}
        <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Section title="System requirements" tint="var(--cream)">
            {p.requirements.length ? (
              <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 14px', fontSize: 16 }}>
                {p.requirements.map(([k, v]) => (
                  <div key={k} style={{ display: 'contents' }}>
                    <dt className="mono" style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', paddingTop: 2 }}>{k}</dt>
                    <dd style={{ margin: 0 }}><T>{v}</T></dd>
                  </div>
                ))}
              </dl>
            ) : <div><Empty what="TECH STACK" /></div>}
          </Section>

          <Section title="Achievements unlocked" tint="var(--sun)">
            {p.achievements.length ? p.achievements.map(([t, d], i) => (
              <motion.div key={t} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: i * 0.08 }}
                style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', border: '3px solid var(--ink)', borderRadius: 14, padding: '10px 12px' }}>
                <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true" style={{ flex: '0 0 38px' }}>
                  <path d="M20 3l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill={['#2148E8', '#FF5B2E', '#7FE0B5', '#FF7AC6'][i % 4]} stroke="#141414" strokeWidth="3" strokeLinejoin="round" />
                </svg>
                <div><strong style={{ fontSize: 17 }}>{t}</strong><div style={{ fontSize: 14 }}>{d}</div></div>
              </motion.div>
            )) : <div><Empty what="OUTCOMES: what it achieved" /></div>}
          </Section>
        </div>
      </div>

      {big && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setBig(null)} role="dialog" aria-label="Screenshot"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(20,20,20,.75)', display: 'grid', placeItems: 'center', padding: 20 }}>
          <motion.img initial={{ scale: 0.85 }} animate={{ scale: 1 }} src={shot(big)} alt="" style={{ maxHeight: '90vh', maxWidth: '92vw', borderRadius: 24, border: '6px solid #141414' }} />
        </motion.div>
      )}
    </div>
  )
}
