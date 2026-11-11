import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import T from '../components/Text'
import { GameBox } from './GameBox'
import ProjectBody from './ProjectBody'
import { education, experience, ideas, me, now, offClock, projects, skills, statusLabels, story } from '../data/content'
import { art } from '../hooks'

/* ── Icon glyphs (drawn inside the coloured tiles) ─────────── */
const G = ({ children }) => <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="#141414" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">{children}</svg>
const glyphs = {
  projects: <G><rect x="4" y="11" width="32" height="20" rx="9" fill="#141414" /><path d="M12 17v8M8 21h8" stroke="#FFD447" /><circle cx="27" cy="18" r="2.6" fill="#FF5B2E" stroke="none" /><circle cx="30" cy="24" r="2.6" fill="#7FE0B5" stroke="none" /></G>,
  school: <G><path d="M3 16l17-8 17 8-17 8z" fill="#141414" /><path d="M10 19v8c6 5 14 5 20 0v-8" /><path d="M37 16v10" /></G>,
  work: <G><rect x="5" y="13" width="30" height="20" rx="3" fill="#FFF6E5" /><path d="M14 13v-4h12v4M5 21h30" /></G>,
  story: <G><circle cx="20" cy="20" r="16" fill="#141414" /><circle cx="20" cy="20" r="10" stroke="#3a3a3a" strokeWidth="2" /><circle cx="20" cy="20" r="5" fill="#FF5B2E" stroke="none" /></G>,
  now: <G><path d="M8 5h24v30H8z" fill="#FFF6E5" /><path d="M13 13h14M13 20h14M13 27h9" /></G>,
  ideas: <G><path d="M7 7h26v26H7z" fill="#FFF6E5" /><path d="M12 25c4-8 8 2 12-6s4 4 6 0" stroke="#2148E8" /><path d="M7 7v26" strokeWidth="5" /></G>,
  offclock: <G><rect x="5" y="11" width="30" height="22" rx="5" fill="#FFF6E5" /><circle cx="20" cy="22" r="6" fill="#2148E8" /><rect x="11" y="7" width="9" height="5" fill="#141414" /></G>,
  resume: <G><path d="M10 4h15l7 7v25H10z" fill="#fff" /><path d="M15 18h12M15 24h12M15 30h8" /></G>,
  contact: <G><rect x="12" y="4" width="17" height="32" rx="4" fill="#FFF6E5" /><path d="M18 31h5" /><path d="M33 12c3 3 3 8 0 11M36 9c5 5 5 12 0 17" strokeWidth="2.5" /></G>,
  about: <G><circle cx="20" cy="15" r="8" fill="#FFF6E5" /><path d="M6 36c2-9 26-9 28 0" fill="#FFF6E5" /></G>,
}

/* ── Small shared bits ─────────────────────────────────────── */
const H = ({ children, size = 30 }) => <h2 style={{ margin: 0, fontWeight: 800, fontSize: size, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-.01em' }}>{children}</h2>
const Pad = ({ children, bg = 'var(--cream)', gap = 14 }) => <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap, background: bg, minHeight: '100%' }}>{children}</div>
const Kicker = ({ children }) => <div className="mono" style={{ fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase' }}>{children}</div>

/* ── Projects: the game library ────────────────────────────── */
function ProjectsApp({ initial, phone }) {
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(initial || null)
  const [sel, setSel] = useState(null)
  const list = filter === 'all' ? projects : projects.filter((p) => p.status === filter)
  const count = (k) => (k === 'all' ? projects.length : projects.filter((p) => p.status === k).length)

  if (open) return <ProjectBody id={open} onBack={() => setOpen(null)} />

  return (
    <div style={{ display: 'flex', flexDirection: phone ? 'column' : 'row', minHeight: '100%' }}>
      <nav aria-label="Filter projects" style={{ flex: phone ? 'none' : '0 0 150px', background: '#F3E3C4', borderRight: phone ? 'none' : '3px solid var(--ink)', borderBottom: phone ? '3px solid var(--ink)' : 'none', padding: phone ? 8 : '10px 0 0' }}>
        {!phone && <Kicker><span style={{ padding: '0 12px' }}>Library</span></Kicker>}
        <div style={{ display: 'flex', flexDirection: phone ? 'row' : 'column', flexWrap: 'wrap', gap: phone ? 6 : 0, marginTop: phone ? 0 : 6 }}>
          {Object.keys(statusLabels).map((k) => {
            const on = filter === k
            return (
              <button key={k} onClick={() => { setFilter(k); setSel(null) }} aria-pressed={on}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, padding: '7px 12px', border: phone ? '2px solid var(--ink)' : 'none', borderRadius: phone ? 999 : 0, background: on ? 'var(--cobalt)' : 'transparent', color: on ? '#fff' : 'var(--cobalt)', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', textAlign: 'left' }}>
                {statusLabels[k]}
                <span className="mono" style={{ minWidth: 22, textAlign: 'center', border: '2px solid var(--ink)', borderRadius: 5, background: on ? 'var(--sun)' : '#fff', color: 'var(--ink)', fontSize: 11 }}>{count(k)}</span>
              </button>
            )
          })}
        </div>
      </nav>
      <div style={{ flex: 1, minWidth: 0, position: 'relative', padding: 14, background: '#8FA0FF' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 14 }}>
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <GameBox p={p} onPick={setSel} selected={sel?.id === p.id} size={0.62} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {sel && (
            <motion.aside key={sel.id} initial={{ opacity: 0, y: 16, rotate: 1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 16 }}
              className="card" aria-label={`${sel.title} details`}
              style={{ position: 'absolute', right: 12, top: 12, width: 230, padding: 12, background: '#fff', display: 'flex', flexDirection: 'column', gap: 8, borderRadius: 14, boxShadow: '5px 5px 0 var(--ink)', zIndex: 2 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, flex: '0 0 44px', borderRadius: 9, border: '2.5px solid var(--ink)', background: sel.cover.bg, display: 'grid', placeItems: 'end center', overflow: 'hidden' }}>
                  {sel.cover.art && <img src={art(sel.cover.art)} alt="" style={{ height: 40 }} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.05 }}><T>{sel.title}</T></div>
                  <div style={{ fontSize: 12 }}>{sel.kind}</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.4 }}><T>{sel.blurb}</T></p>
              <button className="btn" onClick={() => setOpen(sel.id)} style={{ minHeight: 34, fontSize: 14, background: 'var(--sun)', boxShadow: '3px 3px 0 var(--ink)' }}>Open</button>
              {sel.play && <a className="btn" href={sel.play} target="_blank" rel="noreferrer" style={{ minHeight: 30, fontSize: 12, boxShadow: '3px 3px 0 var(--ink)' }}>Play it live ↗</a>}
              <button onClick={() => setSel(null)} className="mono" style={{ border: 'none', background: 'none', fontSize: 11, fontWeight: 700, textDecoration: 'underline' }}>close</button>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── School: a folder of certificates ─────────────────────── */
function SchoolApp() {
  return (
    <Pad>
      <H>Where I learned</H>
      {education.map((e, i) => (
        <motion.div key={e.spine} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          style={{ display: 'flex', alignItems: 'stretch', border: '3px solid var(--ink)', borderRadius: 12, background: '#fff', overflow: 'hidden', boxShadow: '4px 4px 0 var(--ink)' }}>
          <div className="comic" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', background: e.colour, color: '#FFF6E5', fontSize: 20, padding: '8px 6px', borderLeft: '3px solid var(--ink)', textAlign: 'center' }}>{e.spine}</div>
          <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <strong style={{ fontSize: 16 }}><T>{e.title}</T></strong>
            <span style={{ fontSize: 13 }}>{e.place} · <T>{e.years}</T></span>
            <span style={{ fontSize: 12 }}><T>{e.note}</T></span>
          </div>
        </motion.div>
      ))}
    </Pad>
  )
}

/* ── Work: a corkboard ─────────────────────────────────────── */
function WorkApp() {
  return (
    <Pad bg="#D9A066">
      <H>Where I’ve worked</H>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
        {experience.map((x, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: -20, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: [-2, 1.5, -1][i % 3] }} transition={{ delay: i * 0.1, type: 'spring' }}
            style={{ position: 'relative', background: '#fff', border: '3px solid var(--ink)', padding: '14px 10px 10px', boxShadow: '4px 4px 0 var(--ink)', display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span aria-hidden="true" style={{ position: 'absolute', top: -8, left: '50%', width: 14, height: 14, borderRadius: '50%', background: ['var(--tomato)', 'var(--cobalt)', 'var(--sun)'][i % 3], border: '2.5px solid var(--ink)' }} />
            <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--sun)', fontSize: 9.5 }}>{x.kind}</span>
            <strong style={{ fontSize: 14 }}><T>{x.role}</T> · <T>{x.company}</T></strong>
            <span style={{ fontSize: 12 }}><T>{x.dates}</T></span>
            <span style={{ fontSize: 12 }}><T>{x.did}</T></span>
          </motion.div>
        ))}
      </div>
    </Pad>
  )
}

/* ── My story: a record player ────────────────────────────── */
function StoryApp() {
  const sides = [story.sideA, story.sideB]
  const [side, setSide] = useState(0)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100%', background: 'var(--pink)' }}>
      <div style={{ flex: '1 0 170px', minHeight: 170, display: 'grid', placeItems: 'center', borderRight: '3px solid var(--ink)', background: 'var(--cobalt)', backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 2px, transparent 2.2px)', backgroundSize: '14px 14px' }}>
        <motion.div key={side} animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ width: 130, height: 130, borderRadius: '50%', background: 'repeating-radial-gradient(#141414 0 3px, #262626 3px 5px)', border: '3px solid var(--ink)', display: 'grid', placeItems: 'center' }} aria-hidden="true">
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: side ? 'var(--sun)' : 'var(--tomato)', border: '2.5px solid var(--ink)', display: 'grid', placeItems: 'center' }}>
            <span className="comic" style={{ fontSize: 15 }}>{side ? 'B' : 'A'}</span>
          </div>
        </motion.div>
      </div>
      <div style={{ flex: '999 1 280px', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--cream)' }}>
        <Kicker>Now spinning</Kicker>
        <div style={{ display: 'flex', gap: 8 }}>
          {sides.map((s, i) => (
            <button key={i} onClick={() => setSide(i)} className="btn" aria-pressed={side === i}
              style={{ minHeight: 32, fontSize: 13, padding: '0 12px', background: side === i ? 'var(--sun)' : '#fff', boxShadow: '3px 3px 0 var(--ink)' }}>{s.title}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={side} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>{sides[side].text}</motion.p>
        </AnimatePresence>
        <p style={{ margin: 0, fontSize: 13 }}><T>{story.extra}</T></p>
        <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--pink)', fontSize: 10 }}>On repeat: <T>{story.onRepeat}</T></span>
      </div>
    </div>
  )
}

/* ── Now: a notes app ──────────────────────────────────────── */
function NowApp() {
  return (
    <div style={{ minHeight: '100%', padding: '14px 18px', background: '#FFF7B8', backgroundImage: 'repeating-linear-gradient(transparent 0 27px, #B9D3FF 27px 29px)', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Kicker>Updated <T>{now.month}</T></Kicker>
      <H size={26}>What I’m up to</H>
      {now.items.map(([k, v]) => (
        <div key={k} style={{ fontSize: 14, lineHeight: '29px' }}><strong>{k}:</strong> <T>{v}</T></div>
      ))}
    </div>
  )
}

/* ── Ideas: a sketchbook ───────────────────────────────────── */
function IdeasApp() {
  return (
    <Pad bg="#FFFDF5">
      <H>Ideas I can’t stop thinking about</H>
      {ideas.map((x, i) => (
        <motion.div key={x.title} initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: 1, rotate: i % 2 ? 1 : -1 }} transition={{ delay: i * 0.08 }}
          style={{ background: ['var(--sun)', 'var(--pink)', 'var(--mint)'][i % 3], border: '3px solid var(--ink)', padding: '10px 14px', boxShadow: '4px 4px 0 var(--ink)' }}>
          <strong style={{ fontSize: 16 }}>{x.title}</strong>
          <p style={{ margin: '3px 0 0', fontSize: 13, lineHeight: 1.45 }}>{x.text}</p>
        </motion.div>
      ))}
    </Pad>
  )
}

/* ── Off the clock: a photo gallery ───────────────────────── */
function OffClockApp() {
  return (
    <Pad bg="var(--mint)">
      <H>Off the clock</H>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 14 }}>
        {offClock.map((x, i) => (
          <motion.div key={x.title} whileHover={{ rotate: 0, y: -4 }} initial={{ rotate: [-3, 2, -1.5, 2.5][i % 4] }} animate={{ rotate: [-3, 2, -1.5, 2.5][i % 4] }}
            style={{ background: '#fff', border: '3px solid var(--ink)', padding: 8, boxShadow: '4px 4px 0 var(--ink)', display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center' }}>
            <div style={{ height: 96, background: ['var(--cobalt)', 'var(--pink)', 'var(--sun)', 'var(--tomato)'][i % 4], border: '2.5px solid var(--ink)', display: 'grid', placeItems: 'end center', overflow: 'hidden' }}>
              {x.art ? <img src={art(x.art)} alt="" style={{ maxHeight: 92, maxWidth: '100%' }} /> : (
                <svg width="90" height="70" viewBox="0 0 120 90" aria-hidden="true" style={{ alignSelf: 'center' }}><rect x="6" y="18" width="108" height="54" rx="27" fill="#2148E8" stroke="#141414" strokeWidth="4" /><path d="M30 37v16M22 45h16" stroke="#fff" strokeWidth="5" strokeLinecap="round" /><circle cx="84" cy="38" r="5" fill="#FF5B2E" stroke="#141414" strokeWidth="2" /><circle cx="96" cy="50" r="5" fill="#FF7AC6" stroke="#141414" strokeWidth="2" /></svg>
              )}
            </div>
            <strong style={{ fontSize: 14 }}>{x.title}</strong>
            <span style={{ fontSize: 11.5 }}>{x.text}</span>
          </motion.div>
        ))}
      </div>
    </Pad>
  )
}

/* ── Résumé: a document viewer ─────────────────────────────── */
function ResumeApp() {
  const shown = projects.filter((p) => p.status !== 'sketch')
  const h = { margin: '0 0 6px', fontSize: 11, fontFamily: 'var(--mono)', letterSpacing: '.12em', textTransform: 'uppercase', borderBottom: '2px solid var(--ink)', paddingBottom: 4 }
  return (
    <div style={{ minHeight: '100%', background: '#9AA0AE', padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <a className="btn" href="#resume" style={{ minHeight: 32, fontSize: 13, background: 'var(--sun)', boxShadow: '3px 3px 0 var(--ink)' }}>Open full page</a>
        {me.resumePdf
          ? <a className="btn" href={me.resumePdf} download style={{ minHeight: 32, fontSize: 13, boxShadow: '3px 3px 0 var(--ink)' }}>Download PDF</a>
          : <a className="btn" href="#resume-print" style={{ minHeight: 32, fontSize: 13, boxShadow: '3px 3px 0 var(--ink)' }}>Save as PDF</a>}
      </div>
      <article style={{ background: '#fff', border: '3px solid var(--ink)', boxShadow: '5px 5px 0 var(--ink)', padding: 22, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 12.5, lineHeight: 1.45 }}>
        <header>
          <div style={{ fontWeight: 800, fontSize: 28, lineHeight: 1 }}>{me.name}</div>
          <div style={{ fontSize: 13 }}>Master of AI student · {me.location} · <T>{me.email}</T></div>
        </header>
        <section><h3 style={h}>Summary</h3>AI master’s student at RMIT with a designer’s eye. I build complete, polished products end to end, and I’m now focused on machine learning and AI engineering. {me.lookingFor}.</section>
        <section><h3 style={h}>Education</h3>{education.map((e) => <div key={e.spine}><strong><T>{e.title}</T></strong>, {e.place} · <T>{e.years}</T></div>)}</section>
        <section><h3 style={h}>Projects</h3>{shown.map((p) => <div key={p.id}><strong><T>{p.title}</T></strong> · <T>{p.blurb}</T></div>)}</section>
        <section><h3 style={h}>Experience</h3>{experience.map((x, i) => <div key={i}><strong><T>{x.role}</T>, <T>{x.company}</T></strong> · <T>{x.dates}</T></div>)}</section>
        <section><h3 style={h}>Skills</h3>{skills.map((s, i) => <span key={s}>{i ? ' · ' : ''}<T>{s}</T></span>)}</section>
      </article>
    </div>
  )
}

/* ── Contact: a chat ───────────────────────────────────────── */
function ContactApp() {
  const bubble = (mine, children, i) => (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.15 + i * 0.25 }}
      style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '85%', background: mine ? 'var(--cobalt)' : '#fff', color: mine ? '#fff' : 'var(--ink)', border: '3px solid var(--ink)', borderRadius: 16, borderBottomRightRadius: mine ? 4 : 16, borderBottomLeftRadius: mine ? 16 : 4, padding: '8px 12px', fontSize: 14, lineHeight: 1.4 }}>{children}</motion.div>
  )
  const line = (label, href, value) => (
    <a className="btn" href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ minHeight: 34, fontSize: 13, justifyContent: 'space-between', boxShadow: '3px 3px 0 var(--ink)' }}>
      <span>{label}</span><span className="mono" style={{ fontSize: 12 }}>{value}</span>
    </a>
  )
  return (
    <div style={{ minHeight: '100%', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--cream)' }}>
      {bubble(false, 'Hey! I’m Phavan.', 0)}
      {bubble(false, <>Hiring for AI engineering, got a project, or just want to talk AI and design? I’d love to hear from you.</>, 1)}
      {bubble(true, <>{me.lookingFor}. <T>{me.workRights}</T></>, 2)}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
        {line('Email', me.email.startsWith('[') ? undefined : `mailto:${me.email}`, <T>{me.email}</T>)}
        {line('GitHub', me.github, me.githubHandle)}
        {line('Instagram', me.instagram, me.instagramHandle)}
        <span className="btn" aria-disabled="true" style={{ minHeight: 34, fontSize: 13, justifyContent: 'space-between', borderStyle: 'dashed', boxShadow: 'none' }}><span>LinkedIn</span><span className="mono" style={{ fontSize: 12 }}>coming soon</span></span>
      </motion.div>
    </div>
  )
}

/* ── About ─────────────────────────────────────────────────── */
function AboutApp() {
  return (
    <Pad>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ flex: '0 0 110px', height: 110, borderRadius: '50%', background: 'var(--pink)', border: '3px solid var(--ink)', overflow: 'hidden', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', boxShadow: '0 0 0 5px #fff, 0 0 0 8px var(--ink)' }}>
          <img src={art('talking')} alt="Phavan's character (stand-in art)" style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <H size={30}>{me.name}</H>
          <strong style={{ fontSize: 15 }}>{me.tagline}</strong>
          <span style={{ fontSize: 13 }}>Master of AI at RMIT · from Chennai, now in Melbourne</span>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>Creativity is the biggest part of me. I love colour, design and art, and I love building apps and websites. Now I’m learning to build AI that feels like someone made it.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {skills.map((s, i) => <span key={s} className="tag" style={{ fontSize: 10, background: ['var(--sun)', 'var(--pink)', '#fff', 'var(--mint)', 'var(--lilac)'][i % 5], transform: `rotate(${(i % 3) - 1}deg)` }}><T>{s}</T></span>)}
      </div>
    </Pad>
  )
}

/* ── The app list: icon order on the desktop ──────────────── */
export const APPS = [
  { id: 'projects', label: 'Projects', title: 'PROJECTS.EXE', tile: 'var(--sun)', w: 596, h: 400, Body: ProjectsApp },
  { id: 'school', label: 'School', title: 'SCHOOL', tile: 'var(--mint)', w: 520, h: 360, Body: SchoolApp },
  { id: 'work', label: 'Work', title: 'WORK.CORK', tile: '#D9A066', w: 560, h: 360, Body: WorkApp },
  { id: 'story', label: 'My story', title: 'MY STORY · NOW SPINNING', tile: 'var(--pink)', w: 560, h: 300, Body: StoryApp },
  { id: 'now', label: 'Now', title: 'NOW.TXT', tile: '#FFF07A', w: 400, h: 300, Body: NowApp },
  { id: 'ideas', label: 'Ideas', title: 'SKETCHBOOK', tile: '#fff', w: 520, h: 360, Body: IdeasApp },
  { id: 'offclock', label: 'Off clock', title: 'OFF THE CLOCK', tile: 'var(--tomato)', w: 596, h: 370, Body: OffClockApp },
  { id: 'resume', label: 'Résumé', title: 'RESUME.PDF', tile: 'var(--cream)', w: 596, h: 400, Body: ResumeApp },
  { id: 'contact', label: 'Say hi', title: 'MESSAGES', tile: 'var(--lilac)', w: 420, h: 380, Body: ContactApp },
  { id: 'about', label: 'About me', title: 'ABOUT ME', tile: 'var(--cobalt)', w: 560, h: 330, Body: AboutApp, hidden: true },
]

export const appById = (id) => APPS.find((a) => a.id === id)
export { glyphs }
