import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Sky from '../components/Sky'
import { useSkyPhase } from '../hooks'

// The street outside. Scrolling glides the camera up to the lit
// window in the middle of the building and through it into the room.
// The lit window is centred at (800, 450) so the zoom aims dead centre.
export default function Arrival({ onArrive }) {
  const phase = useSkyPhase()
  const night = phase === 'night'
  const box = useRef(null)
  const { scrollYProgress } = useScroll({ target: box, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 11])
  const flash = useTransform(scrollYProgress, [0.7, 0.92], [0, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const done = useRef(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.97 && !done.current) { done.current = true; onArrive() }
  })

  const facade = '#E9C9A3'
  const winRows = [150, 300, 450, 600]
  const winCols = [440, 620, 800, 980, 1160]

  return (
    <div ref={box} style={{ height: '320vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#141414' }}>
        <motion.svg
          viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"
          style={{ width: '100%', height: '100%', scale, transformOrigin: '50% 50%', display: 'block' }}
          role="img" aria-label="A Melbourne street with a building; one window is lit."
        >
          <Sky w={1600} h={900} phase={phase} id="street" tram={false} />
          {/* the building */}
          <rect x="340" y="60" width="920" height="900" fill={facade} stroke="#141414" strokeWidth="5" />
          <rect x="320" y="40" width="960" height="34" fill="#FF5B2E" stroke="#141414" strokeWidth="5" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="340" x2="1260" y1={95 + i * 75} y2={95 + i * 75} stroke="rgba(20,20,20,.12)" strokeWidth="3" />
          ))}
          {winRows.map((y) => winCols.map((x) => {
            const me = x === 800 && y === 450
            if (me) return null
            const on = night ? (x * 3 + y) % 7 === 0 : false
            return (
              <g key={`${x}-${y}`}>
                <rect x={x - 70} y={y - 42} width="140" height="84" fill={on ? '#C9B98A' : night ? '#2C3A80' : '#7FB2FF'} stroke="#141414" strokeWidth="5" />
                <line x1={x} x2={x} y1={y - 42} y2={y + 42} stroke="#141414" strokeWidth="4" />
                <rect x={x - 80} y={y + 42} width="160" height="10" fill="#fff" stroke="#141414" strokeWidth="3" />
              </g>
            )
          }))}
          {/* MY window: warm light, a plant, a little silhouette */}
          <rect x="730" y="411" width="140" height="78" fill="#FFD447" stroke="#141414" strokeWidth="5" />
          <rect x="740" y="455" width="40" height="24" fill="#2148E8" />
          <circle cx="760" cy="447" r="9" fill="#141414" />
          <rect x="820" y="444" width="36" height="22" fill="#141414" />
          <path d="M840 466v14" stroke="#141414" strokeWidth="4" />
          <rect x="722" y="489" width="156" height="10" fill="#FF7AC6" stroke="#141414" strokeWidth="3" />
          {/* door + street */}
          <rect x="740" y="700" width="120" height="200" fill="#2148E8" stroke="#141414" strokeWidth="5" />
          <circle cx="840" cy="800" r="6" fill="#FFD447" stroke="#141414" strokeWidth="2" />
          <rect x="0" y="860" width="1600" height="40" fill="#555" stroke="#141414" strokeWidth="4" />
          <motion.rect x="0" y="0" width="1600" height="900" fill="#FFF3C4" style={{ opacity: flash }} />
        </motion.svg>

        <motion.div style={{ opacity: hintOpacity, position: 'absolute', left: 0, right: 0, bottom: 'max(5vh, 28px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, pointerEvents: 'none', padding: '0 16px' }}>
          <div className="card" style={{ padding: '18px 26px', textAlign: 'center', transform: 'rotate(-1.5deg)', maxWidth: 520 }}>
            <div style={{ fontWeight: 800, fontSize: 'clamp(26px, 4vw, 40px)', lineHeight: 1 }}>Hi, I’m Phavan.</div>
            <div style={{ fontSize: 18, marginTop: 6 }}>That’s my window with the light on. Come on up.</div>
          </div>
          <motion.div className="tag" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ background: 'var(--sun)', fontSize: 13 }}>
            Scroll to come in ↓
          </motion.div>
        </motion.div>

        <button onClick={onArrive} className="btn" style={{ position: 'absolute', top: 16, right: 16, minHeight: 42, fontSize: 15, background: 'var(--cream)' }}>
          Skip the intro
        </button>
      </div>
    </div>
  )
}
