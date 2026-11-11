import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import Page, { Card, H } from './Page'
import ProjectBody from './ProjectBody'
import T from '../components/Text'
import { GameBox } from '../os/GameBox'
import { education, experience, ideas, me, now, offClock, projects, skills, statusLabels, story } from '../data/content'
import { art } from '../hooks'

const K = '#141414'
const lead = { margin: 0, fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: 1.55 }

/* ── Projects: the game shelf ──────────────────────────────── */
export function ProjectsPage() {
  const [filter, setFilter] = useState('all')
  const [sel, setSel] = useState(null)
  const list = filter === 'all' ? projects : projects.filter((p) => p.status === filter)
  const count = (k) => (k === 'all' ? projects.length : projects.filter((p) => p.status === k).length)
  return (
    <Page id="projects" crumbs={[['Projects', '#projects']]} tip="Pick a game box to see what’s inside">
      <Card title="PROJECTS.EXE">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <H>Things I’ve built</H>
            <p style={{ ...lead, marginTop: 10, maxWidth: 620 }}>Shipped apps, AI work from uni and ideas still in the sketchbook. Every one is a game in my library.</p>
          </div>
          <div role="group" aria-label="Filter" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.keys(statusLabels).map((k) => (
              <button key={k} onClick={() => { setFilter(k); setSel(null) }} aria-pressed={filter === k} className="btn"
                style={{ minHeight: 40, fontSize: 14, padding: '0 14px', textTransform: 'uppercase', background: filter === k ? 'var(--cobalt)' : '#fff', color: filter === k ? '#fff' : K, boxShadow: `3px 3px 0 ${K}` }}>
                {statusLabels[k]} <span className="mono" style={{ fontSize: 12, background: filter === k ? 'var(--sun)' : 'var(--cream)', color: K, border: `2px solid ${K}`, borderRadius: 6, padding: '0 6px' }}>{count(k)}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div style={{ position: 'relative', background: '#8FA0FF', border: `3px solid ${K}`, borderRadius: 16, boxShadow: `7px 7px 0 ${K}`, padding: 'clamp(16px, 3vw, 32px)' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(190px, 38vw), 1fr))', gap: 'clamp(16px, 2.4vw, 28px)' }}>
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: i * 0.04 }}>
                <GameBox p={p} onPick={setSel} selected={sel?.id === p.id} size={1} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(20,20,20,.35)', display: 'grid', placeItems: 'center', padding: 16 }}>
            <motion.aside
              onClick={(e) => e.stopPropagation()}
              role="dialog" aria-label={`${sel.title} preview`}
              initial={{ y: 40, scale: 0.9, rotate: -2 }} animate={{ y: 0, scale: 1, rotate: 0 }} exit={{ y: 30, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              style={{ width: 'min(440px, 100%)', background: '#fff', border: `3px solid ${K}`, borderRadius: 18, boxShadow: `8px 8px 0 ${K}`, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 72, height: 72, flex: '0 0 72px', borderRadius: 12, border: `3px solid ${K}`, background: sel.cover.bg, display: 'grid', placeItems: 'end center', overflow: 'hidden' }}>
                  {sel.cover.art && <img src={art(sel.cover.art)} alt="" style={{ height: 66 }} />}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 28, lineHeight: 1 }}><T>{sel.title}</T></div>
                  <div style={{ fontSize: 16, marginTop: 4 }}>{sel.kind}</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5 }}><T>{sel.blurb}</T></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <span className="tag" style={{ background: 'var(--mint)' }}>{statusLabels[sel.status]}</span>
                {sel.requirements.slice(0, 2).map(([, v]) => !/^\[/.test(v) && <span key={v} className="tag">{v.split(',')[0]}</span>)}
              </div>
              <a className="btn" href={`#project-${sel.id}`} style={{ background: 'var(--sun)', fontSize: 18, minHeight: 52 }}>Open</a>
              {sel.play && <a className="btn" href={sel.play} target="_blank" rel="noreferrer">Play it live ↗</a>}
              <button className="mono" onClick={() => setSel(null)} style={{ border: 'none', background: 'none', fontWeight: 700, textDecoration: 'underline', fontSize: 13 }}>close</button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  )
}

/* ── One project: the store page ───────────────────────────── */
export function ProjectPage({ id }) {
  const p = projects.find((x) => x.id === id)
  return (
    <Page id="projects" crumbs={[['Projects', '#projects'], [p ? p.title.replace(/[[\]]/g, '') : 'Not found', `#project-${id}`]]} tip="Scroll for the whole story">
      <ProjectBody id={id} />
    </Page>
  )
}

/* ── School ────────────────────────────────────────────────── */
export function SchoolPage() {
  return (
    <Page id="school" crumbs={[['School', '#school']]}>
      <Card title="EDUCATION.DOC"><H>Where I learned</H><p style={{ ...lead, marginTop: 10 }}>From engineering in Chennai to artificial intelligence in Melbourne.</p></Card>
      {education.map((e, i) => (
        <Card key={e.spine} delay={0.1 + i * 0.08} bar={e.colour} title={<span style={{ color: '#FFF6E5' }}>{e.spine}.CERT</span>}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
            <div className="comic" aria-hidden="true" style={{ flex: '0 0 auto', width: 120, height: 120, borderRadius: '50%', border: `4px solid ${K}`, background: e.colour, color: '#FFF6E5', display: 'grid', placeItems: 'center', fontSize: 34, boxShadow: `0 0 0 6px #fff, 0 0 0 9px ${K}`, transform: `rotate(${[-8, 6, -4][i]}deg)` }}>{e.spine}</div>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.05 }}><T>{e.title}</T></div>
              <div style={{ fontSize: 19 }}>{e.place}</div>
              <div className="mono" style={{ fontWeight: 700 }}><T>{e.years}</T></div>
              <div style={{ fontSize: 17 }}><T>{e.note}</T></div>
            </div>
          </div>
        </Card>
      ))}
    </Page>
  )
}

/* ── Work ──────────────────────────────────────────────────── */
export function WorkPage() {
  return (
    <Page id="work" crumbs={[['Work', '#work']]}>
      <Card title="WORK.CORK"><H>Where I’ve worked</H><p style={{ ...lead, marginTop: 10 }}>Internships across mechanical engineering, computer science and web development.</p></Card>
      <div style={{ background: '#D9A066', border: `3px solid ${K}`, borderRadius: 16, boxShadow: `7px 7px 0 ${K}`, padding: 'clamp(20px, 4vw, 44px)', backgroundImage: 'radial-gradient(rgba(20,20,20,.12) 1.5px, transparent 1.6px)', backgroundSize: '10px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(22px, 3vw, 36px)' }}>
          {experience.map((x, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0, rotate: [-2, 1.5, -1][i % 3] }} transition={{ delay: 0.15 + i * 0.1, type: 'spring' }}
              style={{ position: 'relative', background: '#fff', border: `3px solid ${K}`, padding: '26px 20px 20px', boxShadow: `5px 5px 0 ${K}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span aria-hidden="true" style={{ position: 'absolute', top: -11, left: '50%', width: 20, height: 20, borderRadius: '50%', background: ['var(--tomato)', 'var(--cobalt)', 'var(--sun)'][i % 3], border: `3px solid ${K}` }} />
              <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--sun)' }}>{x.kind}</span>
              <strong style={{ fontSize: 22 }}><T>{x.role}</T></strong>
              <span style={{ fontSize: 18 }}><T>{x.company}</T> · <T>{x.dates}</T></span>
              <span style={{ fontSize: 17, lineHeight: 1.5 }}><T>{x.did}</T></span>
            </motion.div>
          ))}
        </div>
      </div>
    </Page>
  )
}

/* ── My story ──────────────────────────────────────────────── */
export function StoryPage() {
  const sides = [story.sideA, story.sideB]
  const [side, setSide] = useState(0)
  return (
    <Page id="story" crumbs={[['My story', '#story']]} tip="Flip the record">
      <Card title="MY_STORY.MP3" pad={0}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 340px', minHeight: 360, display: 'grid', placeItems: 'center', background: 'var(--cobalt)', backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 2.4px, transparent 2.6px)', backgroundSize: '16px 16px', borderRight: `3px solid ${K}`, padding: 24 }}>
            <motion.button key={side} onClick={() => setSide(side ? 0 : 1)} aria-label={`Flip to ${sides[side ? 0 : 1].title}`}
              initial={{ rotateY: 90 }} animate={{ rotateY: 0, rotate: 360 }} transition={{ rotateY: { duration: 0.4 }, rotate: { duration: 4, repeat: Infinity, ease: 'linear' } }}
              style={{ width: 'min(300px, 70vw)', aspectRatio: '1', borderRadius: '50%', background: 'repeating-radial-gradient(#141414 0 4px, #262626 4px 7px)', border: `4px solid ${K}`, display: 'grid', placeItems: 'center', boxShadow: `8px 8px 0 ${K}`, padding: 0 }}>
              <span style={{ width: '34%', aspectRatio: '1', borderRadius: '50%', background: side ? 'var(--sun)' : 'var(--tomato)', border: `3px solid ${K}`, display: 'grid', placeItems: 'center' }}>
                <span className="comic" style={{ fontSize: 34 }}>{side ? 'B' : 'A'}</span>
              </span>
            </motion.button>
          </div>
          <div style={{ flex: '999 1 400px', padding: 'clamp(22px, 4vw, 44px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <H>My story</H>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {sides.map((s, i) => (
                <button key={i} onClick={() => setSide(i)} aria-pressed={side === i} className="btn" style={{ background: side === i ? 'var(--sun)' : '#fff' }}>{s.title}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={side} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} style={{ ...lead, fontSize: 'clamp(19px, 1.9vw, 24px)' }}>{sides[side].text}</motion.p>
            </AnimatePresence>
            <p style={lead}><T>{story.extra}</T></p>
            <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--pink)', fontSize: 13 }}>On repeat: <T>{story.onRepeat}</T></span>
          </div>
        </div>
      </Card>
    </Page>
  )
}

/* ── Now ───────────────────────────────────────────────────── */
export function NowPage() {
  return (
    <Page id="now" crumbs={[['Now', '#now']]} wide={900}>
      <Card title="NOW.TXT" bg="#FFF7B8" pad={0}>
        <div style={{ padding: 'clamp(22px, 4vw, 44px)', backgroundImage: 'repeating-linear-gradient(transparent 0 46px, #B9D3FF 46px 48px)', display: 'flex', flexDirection: 'column' }}>
          <div className="mono" style={{ fontWeight: 700, lineHeight: '48px' }}>Updated <T>{now.month}</T></div>
          <H style={{ lineHeight: '96px' }}>What I’m up to</H>
          {now.items.map(([k, v]) => <div key={k} style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '48px' }}><strong>{k}:</strong> <T>{v}</T></div>)}
        </div>
      </Card>
    </Page>
  )
}

/* ── Ideas ─────────────────────────────────────────────────── */
export function IdeasPage() {
  return (
    <Page id="ideas" crumbs={[['Ideas', '#ideas']]}>
      <Card title="SKETCHBOOK"><H>Ideas I can’t stop thinking about</H><p style={{ ...lead, marginTop: 10 }}>Not built yet. Some of them will be.</p></Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
        {ideas.map((x, i) => (
          <motion.div key={x.title} initial={{ opacity: 0, y: 30, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }} transition={{ delay: 0.1 + i * 0.1, type: 'spring' }}
            style={{ background: ['var(--sun)', 'var(--pink)', 'var(--mint)'][i % 3], border: `3px solid ${K}`, padding: 'clamp(20px, 3vw, 30px)', boxShadow: `6px 6px 0 ${K}` }}>
            <div className="comic" style={{ fontSize: 'clamp(30px, 3.4vw, 42px)', lineHeight: 1 }}>{x.title}</div>
            <p style={{ ...lead, marginTop: 10 }}>{x.text}</p>
          </motion.div>
        ))}
      </div>
    </Page>
  )
}

/* ── Off the clock ─────────────────────────────────────────── */
export function OffClockPage() {
  return (
    <Page id="offclock" crumbs={[['Off the clock', '#offclock']]}>
      <Card title="OFF_THE_CLOCK.JPG"><H>Off the clock</H><p style={{ ...lead, marginTop: 10 }}>What I’m into when I’m not training models.</p></Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 30 }}>
        {offClock.map((x, i) => (
          <motion.div key={x.title} initial={{ opacity: 0, y: 40, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: [-3, 2, -1.5, 2.5][i % 4] }} whileHover={{ rotate: 0, y: -6 }} transition={{ delay: 0.1 + i * 0.08, type: 'spring' }}
            style={{ background: '#fff', border: `3px solid ${K}`, padding: 14, boxShadow: `6px 6px 0 ${K}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ height: 220, background: ['var(--cobalt)', 'var(--pink)', 'var(--sun)', 'var(--tomato)'][i % 4], border: `3px solid ${K}`, display: 'grid', placeItems: 'end center', overflow: 'hidden', backgroundImage: 'radial-gradient(rgba(255,255,255,.22) 2px, transparent 2.2px)', backgroundSize: '14px 14px' }}>
              {x.art ? <img src={art(x.art)} alt="" style={{ maxHeight: 210, maxWidth: '100%' }} /> : (
                <svg width="160" height="120" viewBox="0 0 120 90" aria-hidden="true" style={{ alignSelf: 'center' }}><rect x="6" y="18" width="108" height="54" rx="27" fill="#2148E8" stroke="#141414" strokeWidth="4" /><path d="M30 37v16M22 45h16" stroke="#fff" strokeWidth="5" strokeLinecap="round" /><circle cx="84" cy="38" r="5" fill="#FF5B2E" stroke="#141414" strokeWidth="2" /><circle cx="96" cy="50" r="5" fill="#FF7AC6" stroke="#141414" strokeWidth="2" /></svg>
              )}
            </div>
            <div className="comic" style={{ fontSize: 30, textAlign: 'center' }}>{x.title}</div>
            <div style={{ fontSize: 16, textAlign: 'center' }}>{x.text}</div>
          </motion.div>
        ))}
      </div>
    </Page>
  )
}

/* ── Say hi ────────────────────────────────────────────────── */
export function ContactPage() {
  const bubble = (mine, children, i) => (
    <motion.div initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.25 + i * 0.35 }}
      style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '85%', background: mine ? 'var(--cobalt)' : '#fff', color: mine ? '#fff' : K, border: `3px solid ${K}`, borderRadius: 22, borderBottomRightRadius: mine ? 6 : 22, borderBottomLeftRadius: mine ? 22 : 6, padding: '12px 18px', fontSize: 'clamp(17px, 1.7vw, 21px)', lineHeight: 1.45, boxShadow: `4px 4px 0 ${K}` }}>{children}</motion.div>
  )
  const line = (label, href, value, bg = '#fff') => (
    <a className="btn" href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ justifyContent: 'space-between', minHeight: 60, fontSize: 19, background: bg }}>
      <span>{label}</span><span className="mono" style={{ fontSize: 15 }}>{value}</span>
    </a>
  )
  return (
    <Page id="contact" crumbs={[['Say hi', '#contact']]} wide={860}>
      <Card title="MESSAGES">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <H>Let’s talk</H>
          {bubble(false, 'Hey! I’m Phavan.', 0)}
          {bubble(false, 'Hiring for AI engineering, got a project, or just want to talk AI and design? I’d love to hear from you.', 1)}
          {bubble(true, <>{me.lookingFor}. <T>{me.workRights}</T></>, 2)}
        </div>
      </Card>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {line('Email', me.email.startsWith('[') ? undefined : `mailto:${me.email}`, <T>{me.email}</T>, 'var(--sun)')}
        {line('GitHub', me.github, me.githubHandle)}
        {line('Instagram', me.instagram, me.instagramHandle)}
        <span className="btn" aria-disabled="true" style={{ justifyContent: 'space-between', minHeight: 60, fontSize: 19, borderStyle: 'dashed' }}><span>LinkedIn</span><span className="mono" style={{ fontSize: 15 }}>coming soon</span></span>
      </motion.div>
    </Page>
  )
}

/* ── About me ──────────────────────────────────────────────── */
export function AboutPage() {
  const stats = [
    ['99', 'versions of Prequel shipped'],
    ['2', 'apps live on the web'],
    ['3', 'places I’ve studied'],
    ['1', 'Master of AI in progress'],
  ]
  return (
    <Page id="about" crumbs={[['About me', '#about']]}>
      <Card title="ABOUT_ME.TXT">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 4vw, 44px)', alignItems: 'center' }}>
          <div style={{ flex: '0 0 auto', width: 'clamp(150px, 20vw, 220px)', aspectRatio: '1', borderRadius: '50%', background: 'var(--pink)', border: `4px solid ${K}`, overflow: 'hidden', boxShadow: `0 0 0 8px #fff, 0 0 0 12px ${K}` }}>
            <img src={art('talking')} alt="Phavan's character (stand-in art)" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <H>{me.name}</H>
            <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--cobalt)', color: '#fff', fontSize: 14 }}>{me.role}</span>
            <p style={lead}>{me.tagline} Master of AI at RMIT. From Chennai, now in Melbourne.</p>
            <p style={lead}>Creativity is the biggest part of me. I love colour, design and art, and I love building apps and websites. Now I’m learning to build AI that feels like someone made it.</p>
          </div>
        </div>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 22 }}>
        {stats.map(([n, l], i) => (
          <motion.div key={l} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, rotate: [-1.5, 1, -1, 1.5][i] }} transition={{ delay: 0.15 + i * 0.07, type: 'spring' }}
            style={{ background: ['var(--sun)', '#fff', 'var(--lilac)', 'var(--mint)'][i], border: `3px solid ${K}`, borderRadius: 14, boxShadow: `6px 6px 0 ${K}`, padding: '18px 22px' }}>
            <div style={{ fontWeight: 800, fontSize: 'clamp(48px, 5vw, 64px)', lineHeight: 1 }}>{n}</div>
            <div className="mono" style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', marginTop: 6 }}>{l}</div>
          </motion.div>
        ))}
      </div>
      <Card title="SKILLS.CFG" delay={0.3}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map((s, i) => <span key={s} className="tag" style={{ fontSize: 14, padding: '6px 14px', background: ['var(--sun)', 'var(--pink)', '#fff', 'var(--mint)', 'var(--lilac)'][i % 5], transform: `rotate(${(i % 3) - 1}deg)` }}><T>{s}</T></span>)}
        </div>
      </Card>
    </Page>
  )
}
