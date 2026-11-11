import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import Panel from '../components/Panel'
import T from '../components/Text'
import Hud from '../components/Hud'
import { art, go, melbourneHour, useIsNarrow, useSkyPhase } from '../hooks'
import { education, experience, ideas, me, now, offClock, skills, story } from '../data/content'
import {
  Backdrop, Bookshelf, Corkboard, Desk, GymBag, Lamp, Me, Monitor, Phone, Printer, RecordPlayer, Sketchbook, Stickies, Window,
  bagBox, corkBox, lampBox, meBox, monitorBox, phoneBox, printerBox, recordBox, shelfBox, sketchBox, stickyBox, WALL, FLOOR,
} from './roomArt'

const OBJECTS = [
  { id: 'monitor', label: 'Projects', sub: 'the monitor', box: monitorBox },
  { id: 'shelf', label: 'Education', sub: 'the bookshelf', box: shelfBox },
  { id: 'cork', label: 'Experience', sub: 'the corkboard', box: corkBox },
  { id: 'record', label: 'My story', sub: 'the record player', box: recordBox },
  { id: 'me', label: 'About me', sub: 'me', box: meBox },
  { id: 'printer', label: 'Résumé', sub: 'the printer', box: printerBox },
  { id: 'phone', label: 'Contact', sub: 'the phone', box: phoneBox },
  { id: 'stickies', label: 'Now', sub: 'the sticky notes', box: stickyBox },
  { id: 'sketch', label: 'Ideas', sub: 'the sketchbook', box: sketchBox },
  { id: 'bag', label: 'Off the clock', sub: 'the gym bag', box: bagBox },
  { id: 'lamp', label: 'Lights', sub: 'the lamp', box: lampBox },
]

function poseFor(night) {
  if (night) return 'nightwatch'
  const h = melbourneHour()
  return h < 12 ? 'sitting' : 'afternoon'
}

function Clickable({ obj, onPick, onHover, children }) {
  return (
    <motion.g
      className="obj"
      role="button"
      tabIndex={0}
      aria-label={`${obj.label}: ${obj.sub}`}
      whileHover={{ y: -6 }}
      whileFocus={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      onClick={() => onPick(obj.id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onPick(obj.id))}
      onHoverStart={() => onHover(obj.id)}
      onHoverEnd={() => onHover(null)}
      onFocus={() => onHover(obj.id)}
      onBlur={() => onHover(null)}
    >
      <rect className="obj-ring" x={obj.box[0]} y={obj.box[1]} width={obj.box[2]} height={obj.box[3]} rx="16" fill="transparent" stroke="transparent" />
      {children}
    </motion.g>
  )
}

function Label({ obj }) {
  const [x, y, w] = obj.box
  const cx = x + w / 2
  const top = Math.max(y - 16, 40)
  const text = obj.label.toUpperCase()
  const tw = text.length * 13 + 34
  return (
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} pointerEvents="none">
      <rect x={cx - tw / 2} y={top - 40} width={tw} height="40" rx="12" fill="#141414" />
      <path d={`M${cx - 9} ${top} l9 11 9-11z`} fill="#141414" />
      <text x={cx} y={top - 14} textAnchor="middle" fontFamily="Bangers, Impact, sans-serif" fontSize="24" letterSpacing="1.5" fill="#FFD447">{text}</text>
    </motion.g>
  )
}

// A little twinkle that says "you can click this".
function Sparkle({ x, y, delay }) {
  return (
    <motion.path
      d={`M${x} ${y - 12} L${x + 3} ${y - 3} L${x + 12} ${y} L${x + 3} ${y + 3} L${x} ${y + 12} L${x - 3} ${y + 3} L${x - 12} ${y} L${x - 3} ${y - 3} Z`}
      fill="#FFF6E5" stroke="#141414" strokeWidth="2.5" pointerEvents="none"
      animate={{ scale: [0.4, 1, 0.4], opacity: [0, 1, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, repeatDelay: 2 }}
      style={{ originX: `${x}px`, originY: `${y}px` }}
    />
  )
}

/* ── Panels ───────────────────────────────────────────────── */
function Contents({ id, onClose }) {
  switch (id) {
    case 'shelf':
      return (
        <Panel title="Where I learned" kicker="The bookshelf · Education" onClose={onClose}>
          {education.map((e) => (
            <div key={e.spine} style={{ display: 'flex', gap: 16, alignItems: 'stretch', border: '3px solid var(--ink)', borderRadius: 16, background: '#fff', overflow: 'hidden' }}>
              <div className="comic" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', background: e.colour, color: '#FFF6E5', fontSize: 26, padding: '12px 10px', borderLeft: '3px solid var(--ink)', textAlign: 'center' }}>{e.spine}</div>
              <div style={{ padding: '14px 14px 14px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <strong style={{ fontSize: 21 }}><T>{e.title}</T></strong>
                <span style={{ fontSize: 16 }}>{e.place} · <T>{e.years}</T></span>
                <span style={{ fontSize: 15 }}><T>{e.note}</T></span>
              </div>
            </div>
          ))}
        </Panel>
      )
    case 'cork':
      return (
        <Panel title="Where I’ve worked" kicker="The corkboard · Experience" onClose={onClose} colour="#F3D3A8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 18 }}>
            {experience.map((x, i) => (
              <div key={i} style={{ background: '#fff', border: '3px solid var(--ink)', padding: 12, transform: `rotate(${[-2, 1.5, -1][i % 3]}deg)`, boxShadow: '4px 4px 0 var(--ink)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--sun)' }}>{x.kind}</span>
                <strong style={{ fontSize: 18 }}><T>{x.role}</T> · <T>{x.company}</T></strong>
                <span style={{ fontSize: 14 }}><T>{x.dates}</T></span>
                <span style={{ fontSize: 15 }}><T>{x.did}</T></span>
              </div>
            ))}
          </div>
        </Panel>
      )
    case 'record':
      return (
        <Panel title="My story" kicker="The record player · Now spinning" onClose={onClose}>
          {[story.sideA, story.sideB].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div aria-hidden="true" style={{ flex: '0 0 64px', height: 64, borderRadius: '50%', background: '#141414', border: '3px solid var(--ink)', display: 'grid', placeItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: i ? 'var(--cobalt)' : 'var(--tomato)' }} />
              </div>
              <div>
                <div className="mono" style={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}>{s.title}</div>
                <p style={{ margin: '6px 0 0', fontSize: 18, lineHeight: 1.5 }}>{s.text}</p>
              </div>
            </div>
          ))}
          <p style={{ margin: 0, fontSize: 17 }}><T>{story.extra}</T></p>
          <div className="tag" style={{ alignSelf: 'flex-start', background: 'var(--pink)' }}>On repeat: <T>{story.onRepeat}</T></div>
        </Panel>
      )
    case 'me':
      return (
        <Panel title={me.name} kicker="About me" onClose={onClose} colour="var(--cream)">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
            <div style={{ flex: '0 0 150px', height: 150, borderRadius: 20, background: 'var(--cobalt)', border: '3px solid var(--ink)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <img src={art('talking')} alt="Phavan's character (stand-in art)" style={{ width: '95%' }} />
            </div>
            <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <strong style={{ fontSize: 24, lineHeight: 1.15 }}>{me.tagline}</strong>
              <span style={{ fontSize: 17 }}>Master of AI at RMIT · from {me.from.split(',')[0]}, now in Melbourne.</span>
              <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--mint)' }}>{me.lookingFor}</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5 }}>Creativity is the biggest part of me. I love colour, design and art, and I love building apps and websites. Now I’m learning to build AI that feels like someone made it.</p>
          <div>
            <div className="mono" style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>THE TOOLBOX</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map((s, i) => <span key={s} className="tag" style={{ fontSize: 13, background: ['var(--sun)', 'var(--pink)', '#fff', 'var(--mint)', 'var(--lilac)'][i % 5], transform: `rotate(${(i % 3) - 1}deg)` }}><T>{s}</T></span>)}
            </div>
          </div>
        </Panel>
      )
    case 'printer':
      return (
        <Panel title="Your copy is ready" kicker="The printer · Résumé" onClose={onClose} colour="#EDE6FF">
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5 }}>The quick version of everything in this room, on one page.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a className="btn" href="#resume" style={{ background: 'var(--sun)' }}>Read it here</a>
            {me.resumePdf
              ? <a className="btn" href={me.resumePdf} download>Download PDF</a>
              : <a className="btn" href="#resume-print">Save as PDF</a>}
          </div>
          {!me.resumePdf && <span style={{ fontSize: 14 }}><span className="ph">[Add your real résumé PDF in content.js → me.resumePdf]</span></span>}
        </Panel>
      )
    case 'phone':
      return (
        <Panel title="Let’s talk" kicker="The phone · Contact" onClose={onClose} colour="#FFE8DF">
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5 }}>Hiring for AI engineering, have a project, or just want to talk AI and design? Pick a line.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a className="btn" href={me.email.startsWith('[') ? undefined : `mailto:${me.email}`} style={{ background: 'var(--cobalt)', color: '#fff', justifyContent: 'flex-start' }}>Email · <T>{me.email}</T></a>
            <a className="btn" href={me.github} target="_blank" rel="noreferrer" style={{ justifyContent: 'flex-start' }}>GitHub · {me.githubHandle}</a>
            <a className="btn" href={me.instagram} target="_blank" rel="noreferrer" style={{ justifyContent: 'flex-start' }}>Instagram · {me.instagramHandle}</a>
            <span className="btn" aria-disabled="true" style={{ justifyContent: 'flex-start', borderStyle: 'dashed' }}>LinkedIn · coming soon</span>
          </div>
          <span className="mono" style={{ fontSize: 14 }}>{me.lookingFor} · <T>{me.workRights}</T></span>
        </Panel>
      )
    case 'stickies':
      return (
        <Panel title="What I’m up to" kicker={`Sticky notes · Now`} onClose={onClose} colour="#FFF7B8">
          <span className="mono" style={{ fontWeight: 700 }}>Updated <T>{now.month}</T></span>
          {now.items.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 12, fontSize: 18, lineHeight: 1.45 }}>
              <strong style={{ flex: '0 0 96px' }}>{k}</strong><span><T>{v}</T></span>
            </div>
          ))}
        </Panel>
      )
    case 'sketch':
      return (
        <Panel title="Ideas I can’t stop thinking about" kicker="The sketchbook · Not built yet" onClose={onClose} colour="#FFFDF5">
          {ideas.map((x, i) => (
            <div key={x.title} style={{ background: ['var(--sun)', 'var(--pink)', 'var(--mint)'][i % 3], border: '3px solid var(--ink)', padding: '14px 16px', transform: `rotate(${i % 2 ? 1 : -1}deg)`, boxShadow: '4px 4px 0 var(--ink)' }}>
              <strong style={{ fontSize: 20 }}>{x.title}</strong>
              <p style={{ margin: '4px 0 0', fontSize: 17, lineHeight: 1.45 }}>{x.text}</p>
            </div>
          ))}
          <a className="btn" href="#library-sketch" style={{ alignSelf: 'flex-start' }}>See them in the library</a>
        </Panel>
      )
    case 'bag':
      return (
        <Panel title="Off the clock" kicker="The gym bag · Life outside work" onClose={onClose} wide>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
            {offClock.map((x) => (
              <div key={x.title} style={{ border: '3px solid var(--ink)', borderRadius: 16, background: '#fff', padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
                <div style={{ height: 110, display: 'grid', placeItems: 'center' }}>
                  {x.art ? <img src={art(x.art)} alt="" style={{ maxHeight: 110, maxWidth: '100%' }} /> : (
                    <svg width="110" height="80" viewBox="0 0 120 90" aria-hidden="true"><rect x="6" y="18" width="108" height="54" rx="27" fill="#2148E8" stroke="#141414" strokeWidth="4" /><path d="M30 37v16M22 45h16" stroke="#fff" strokeWidth="5" strokeLinecap="round" /><circle cx="84" cy="38" r="5" fill="#FF5B2E" stroke="#141414" strokeWidth="2" /><circle cx="96" cy="50" r="5" fill="#FF7AC6" stroke="#141414" strokeWidth="2" /></svg>
                  )}
                </div>
                <strong style={{ fontSize: 20 }}>{x.title}</strong>
                <span style={{ fontSize: 15 }}>{x.text}</span>
              </div>
            ))}
          </div>
        </Panel>
      )
    default:
      return null
  }
}

/* ── The room ─────────────────────────────────────────────── */
export default function Room({ fromMonitor }) {
  const narrow = useIsNarrow()
  const realPhase = useSkyPhase()
  const [night, setNight] = useState(realPhase === 'night')
  const [hover, setHover] = useState(null)
  const [open, setOpen] = useState(null)
  const [printing, setPrinting] = useState(false)
  const [buzz, setBuzz] = useState(false)
  const [zoom, setZoom] = useState(null)
  const stage = useRef(null)
  const screen = useRef(null)
  const phase = night ? 'night' : realPhase === 'night' ? 'day' : realPhase

  // The phone buzzes every so often.
  useEffect(() => {
    const t = setInterval(() => { setBuzz(true); setTimeout(() => setBuzz(false), 2200) }, 11000)
    return () => clearInterval(t)
  }, [])

  const pick = (id) => {
    if (id === 'lamp') return setNight((n) => !n)
    if (id === 'monitor') {
      const s = screen.current?.getBoundingClientRect()
      const b = stage.current?.getBoundingClientRect()
      if (s && b && !narrow) {
        const ox = ((s.left + s.width / 2 - b.left) / b.width) * 100
        const oy = ((s.top + s.height / 2 - b.top) / b.height) * 100
        setZoom({ ox, oy, scale: Math.min(b.width / s.width, b.height / s.height) * 1.05 })
        return
      }
      return go('library')
    }
    if (id === 'printer') {
      setPrinting(true)
      setTimeout(() => setOpen('printer'), 1000)
      return
    }
    setOpen(id)
  }
  const close = () => { setOpen(null); setPrinting(false) }

  const pose = poseFor(night)
  const objFor = (id) => OBJECTS.find((o) => o.id === id)
  const C = (id, el) => <Clickable key={id} obj={objFor(id)} onPick={pick} onHover={setHover}>{el}</Clickable>

  const scene = (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }} role="group" aria-label="Phavan's room. Each object opens part of his story.">
      <defs>
        <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFE9A8" stopOpacity=".6" />
          <stop offset="1" stopColor="#FFE9A8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Backdrop />
      <Window phase={phase} />
      {C('cork', <Corkboard />)}
      {C('shelf', <Bookshelf />)}
      {C('record', <RecordPlayer />)}
      <Desk />
      {C('lamp', <Lamp on={night} />)}
      {C('monitor', <Monitor screenRef={screen} />)}
      {C('stickies', <Stickies />)}
      {C('phone', <Phone buzz={buzz} />)}
      {C('printer', <Printer printing={printing} />)}
      {C('bag', <GymBag />)}
      {C('sketch', <Sketchbook />)}
      {C('me', <Me pose={pose} />)}

      {/* night: darken the room, light up the lamp and the screen */}
      <motion.g initial={false} animate={{ opacity: night ? 1 : 0 }} transition={{ duration: 0.6 }} pointerEvents="none">
        <rect width="1600" height="900" fill="#0B1030" opacity=".3" />
        <ellipse cx="610" cy="470" rx="360" ry="300" fill="url(#lampGlow)" style={{ mixBlendMode: 'screen' }} />
        <rect x="670" y="262" width="316" height="204" rx="8" fill="#7FB2FF" opacity=".22" />
      </motion.g>

      {!hover && !open && [[828, 228, 0], [1365, 82, 0.6], [665, 58, 1.2], [240, 432, 1.8], [1095, 372, 2.4], [622, 420, 3], [1450, 700, 3.6], [890, 774, 4.2]].map(([x, y, d], i) => <Sparkle key={i} x={x} y={y} delay={d} />)}
      <AnimatePresence>{hover && !open && <Label key={hover} obj={objFor(hover)} />}</AnimatePresence>
    </svg>
  )

  if (narrow) return <MobileRoom pick={pick} open={open} close={close} pose={pose} phase={phase} night={night} />

  return (
    <motion.div
      initial={{ opacity: 0, scale: fromMonitor ? 3 : 1.12 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: fromMonitor ? 0.7 : 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ position: 'fixed', inset: 0, background: `linear-gradient(${WALL} 0 72%, ${FLOOR} 72%)` }}
    >
      <Hud where="room" hint={night ? 'Night in Melbourne · click anything (the lamp brings the daylight)' : 'Click anything in the room'} />
      <motion.div
        ref={stage}
        style={{ position: 'absolute', inset: 0, transformOrigin: zoom ? `${zoom.ox}% ${zoom.oy}%` : '50% 50%' }}
        animate={zoom ? { scale: zoom.scale } : { scale: 1 }}
        transition={{ duration: 0.85, ease: [0.6, 0, 0.2, 1] }}
        onAnimationComplete={() => zoom && go('library')}
      >
        {scene}
      </motion.div>
      <AnimatePresence>{open && <Contents key={open} id={open} onClose={close} />}</AnimatePresence>
    </motion.div>
  )
}

/* ── Phones: the camera moves down through the room ───────── */
function MobileRoom({ pick, open, close, pose, phase, night }) {
  const piece = (box, children) => (
    <svg viewBox={box.join(' ')} style={{ width: '100%', maxHeight: 220 }} aria-hidden="true">{children}</svg>
  )
  const rows = [
    ['monitor', 'Projects', 'Everything I’ve built, as a game library', piece(monitorBox, <Monitor />), 'var(--cobalt)', '#fff'],
    ['me', 'About me', 'Who’s this guy?', piece([450, 500, 280, 360], <Me pose={pose} />), 'var(--cream)'],
    ['shelf', 'Education', 'RMIT, VIT and SRM', piece(shelfBox, <Bookshelf />), '#F3D3A8'],
    ['cork', 'Experience', 'Internships and work', piece(corkBox, <Corkboard />), 'var(--cream)'],
    ['record', 'My story', 'Side A: Chennai · Side B: Melbourne', piece(recordBox, <RecordPlayer />), 'var(--pink)'],
    ['stickies', 'Now', 'What I’m up to this month', piece(stickyBox, <Stickies />), '#FFF7B8'],
    ['sketch', 'Ideas', 'The sketchbook', piece(sketchBox, <Sketchbook />), 'var(--cream)'],
    ['bag', 'Off the clock', 'Gym, music, games, animation', piece(bagBox, <GymBag />), 'var(--mint)'],
    ['printer', 'Résumé', 'Print my CV', piece(printerBox, <Printer />), 'var(--lilac)'],
    ['phone', 'Contact', 'Say hi', piece(phoneBox, <Phone />), 'var(--tomato)'],
  ]
  return (
    <div className="dots" style={{ minHeight: '100vh', padding: '84px 16px 40px' }}>
      <Hud where="room" />
      <div className="card" style={{ overflow: 'hidden', marginBottom: 20 }}>
        <svg viewBox="60 50 450 390" style={{ width: '100%', display: 'block' }} aria-hidden="true"><Window phase={phase} /></svg>
        <div style={{ padding: '16px 18px', borderTop: '3px solid var(--ink)' }}>
          <div style={{ fontWeight: 800, fontSize: 30, lineHeight: 1 }}>Come on in.</div>
          <div style={{ fontSize: 16, marginTop: 6 }}>This is my room. Tap anything to look closer.</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {rows.map(([id, title, sub, pic, bg, fg]) => (
          <motion.button
            key={id}
            onClick={() => pick(id)}
            className="card"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: 0, overflow: 'hidden', background: bg, color: fg || 'var(--ink)', textAlign: 'left' }}
          >
            <div style={{ padding: '14px 14px 0', display: 'grid', placeItems: 'center' }}>{pic}</div>
            <div style={{ padding: '12px 18px 16px', borderTop: '3px solid var(--ink)', background: 'var(--cream)', color: 'var(--ink)' }}>
              <div className="comic" style={{ fontSize: 28 }}>{title}</div>
              <div style={{ fontSize: 15 }}>{sub}</div>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>{open && <Contents key={open} id={open} onClose={close} />}</AnimatePresence>
    </div>
  )
}
