import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { me } from '../data/content'
import { art } from '../hooks'

// The arrival: a full-screen comic book cover. Scroll, swipe, click or
// press a key and it swings open like a real cover, revealing the desk.
const K = '#141414'

function Burst() {
  // sun-ray burst behind the hero
  const rays = Array.from({ length: 24 })
  return (
    <svg viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {rays.map((_, i) => {
        const a1 = (i / rays.length) * Math.PI * 2
        const a2 = ((i + 0.5) / rays.length) * Math.PI * 2
        return <path key={i} d={`M0 0 L${Math.cos(a1) * 200} ${Math.sin(a1) * 200} L${Math.cos(a2) * 200} ${Math.sin(a2) * 200}Z`} fill={i % 2 ? '#2148E8' : '#1B3BC4'} />
      })}
    </svg>
  )
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2]
  let x = 0
  return (
    <svg width="96" height="54" viewBox="0 0 96 54" aria-hidden="true" style={{ display: 'block' }}>
      <rect width="96" height="54" fill="#fff" />
      {bars.map((w, i) => { const r = <rect key={i} x={4 + x} y="4" width={w} height="36" fill={i % 2 ? '#fff' : K} />; x += w + 0.6; return r })}
      <text x="48" y="50" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="8" fontWeight="700" fill={K}>0 26 1126 0001</text>
    </svg>
  )
}

function Face({ children, back }) {
  return (
    <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: back ? 'rotateY(180deg)' : 'none', overflow: 'hidden' }}>
      {children}
    </div>
  )
}

export default function Cover({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const [gone, setGone] = useState(false)

  const open = () => { if (!opening) setOpening(true) }

  useEffect(() => {
    let startY = null
    const onWheel = (e) => { if (e.deltaY > 8) open() }
    const onKey = (e) => { if (['Enter', ' ', 'ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); open() } }
    const onTouchStart = (e) => { startY = e.touches[0].clientY }
    const onTouchMove = (e) => { if (startY !== null && startY - e.touches[0].clientY > 30) open() }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  })

  if (gone) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, perspective: '2200px', pointerEvents: opening ? 'none' : 'auto' }}>
      {/* page shadow that sweeps across the desk as the cover opens */}
      <motion.div aria-hidden="true" initial={false} animate={{ opacity: opening ? 0 : 0.35 }} transition={{ duration: 1.1 }} style={{ position: 'absolute', inset: 0, background: '#141414' }} />
      <motion.div
        role="dialog" aria-label="Comic cover: Phavan, issue one. Press Enter to open."
        initial={{ rotateY: 0, scale: 0.96, opacity: 0 }}
        animate={opening ? { rotateY: -165, scale: 1, opacity: 1 } : { rotateY: 0, scale: 1, opacity: 1 }}
        transition={opening ? { duration: 1.25, ease: [0.55, 0, 0.25, 1] } : { duration: 0.6 }}
        onAnimationComplete={() => { if (opening) { setGone(true); onOpen() } }}
        onClick={open}
        style={{ position: 'absolute', inset: 0, transformOrigin: 'left center', transformStyle: 'preserve-3d', cursor: 'pointer' }}
      >
        <Face>
          <div style={{ position: 'absolute', inset: 0, background: '#2148E8', border: `6px solid ${K}` }}>
            <Burst />
            {/* halftone wash */}
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.18) 2.4px, transparent 2.6px)', backgroundSize: '16px 16px' }} />

            {/* masthead */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, padding: 'clamp(10px, 2vh, 22px) clamp(14px, 3vw, 36px) 0', display: 'flex', alignItems: 'flex-start', gap: 'clamp(10px, 2vw, 24px)' }}>
              <div style={{ flex: '0 0 auto', background: '#fff', border: `4px solid ${K}`, padding: 6, boxShadow: `5px 5px 0 ${K}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 'clamp(54px, 7vw, 84px)', height: 'clamp(54px, 7vw, 84px)', background: 'var(--pink)', border: `3px solid ${K}`, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                  <img src={art('talking')} alt="" style={{ width: '120%', marginTop: -2 }} />
                </div>
                <div className="mono" style={{ fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 700, marginTop: 4 }}>No. 1</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <motion.h1 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 14 }}
                  className="comic"
                  style={{ margin: 0, fontSize: 'clamp(64px, 15vw, 200px)', lineHeight: 0.82, color: 'var(--sun)', WebkitTextStroke: `clamp(2px, .45vw, 6px) ${K}`, paintOrder: 'stroke fill', textShadow: `clamp(4px, .7vw, 10px) clamp(4px, .7vw, 10px) 0 ${K}`, letterSpacing: '.02em' }}>
                  PHAVAN
                </motion.h1>
                <div className="mono" style={{ display: 'inline-block', marginTop: 'clamp(6px, 1vh, 10px)', background: K, color: '#FFF6E5', fontWeight: 700, fontSize: 'clamp(10px, 1.2vw, 14px)', padding: '4px 10px', letterSpacing: '.08em' }}>
                  ISSUE #1 · NOVEMBER 2026 · MELBOURNE
                </div>
              </div>
              <div style={{ flex: '0 0 auto', transform: 'rotate(8deg)', background: 'var(--sun)', border: `4px solid ${K}`, borderRadius: '50%', width: 'clamp(70px, 9vw, 112px)', height: 'clamp(70px, 9vw, 112px)', display: 'grid', placeItems: 'center', textAlign: 'center', boxShadow: `4px 4px 0 ${K}` }}>
                <div className="comic" style={{ fontSize: 'clamp(14px, 1.8vw, 22px)', lineHeight: 0.95 }}>FREE!<br /><span style={{ fontSize: '.7em' }}>$0.00 AUD</span></div>
              </div>
            </div>

            {/* the hero */}
            <motion.img
              src={art('waving')} alt="Phavan, drawn as a cartoon, waving hello"
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, type: 'spring', stiffness: 160, damping: 16 }}
              style={{ position: 'absolute', left: '50%', bottom: 0, x: '-50%', height: 'min(64vh, 120vw)', filter: `drop-shadow(8px 0 0 ${K}) drop-shadow(-3px 0 0 ${K}) drop-shadow(0 -3px 0 ${K})` }}
            />

            {/* speech bubble */}
            <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: -4 }} transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 14 }}
              style={{ position: 'absolute', left: 'min(calc(50% + min(14vh, 26vw)), calc(100% - 200px))', top: 'min(38vh, 52vw)', background: '#fff', border: `4px solid ${K}`, borderRadius: '50% / 45%', padding: 'clamp(10px, 1.6vh, 18px) clamp(14px, 2vw, 26px)', boxShadow: `5px 5px 0 ${K}` }}>
              <span className="comic" style={{ fontSize: 'clamp(18px, 2.6vw, 34px)', whiteSpace: 'nowrap' }}>COME ON IN!</span>
              <span aria-hidden="true" style={{ position: 'absolute', left: 6, bottom: -18, width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '18px solid transparent', borderTop: `22px solid ${K}`, transform: 'rotate(20deg)' }} />
            </motion.div>

            {/* tagline banner */}
            <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.55, type: 'spring' }}
              style={{ position: 'absolute', left: 'clamp(12px, 3vw, 40px)', top: 'min(34vh, 60vw)', maxWidth: 'min(40vw, 420px)', background: 'var(--tomato)', border: `4px solid ${K}`, padding: 'clamp(8px, 1.4vh, 14px) clamp(12px, 1.6vw, 20px)', transform: 'rotate(-3deg)', boxShadow: `6px 6px 0 ${K}` }}>
              <div className="comic" style={{ fontSize: 'clamp(20px, 3vw, 40px)', lineHeight: 0.95, color: '#FFF6E5', WebkitTextStroke: `1.5px ${K}`, paintOrder: 'stroke fill' }}>{me.tagline.toUpperCase()}</div>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.75, type: 'spring' }}
              className="mono"
              style={{ position: 'absolute', left: 'clamp(18px, 3.4vw, 46px)', top: 'calc(min(34vh, 60vw) + clamp(96px, 15vh, 150px))', background: 'var(--mint)', border: `3px solid ${K}`, padding: '5px 10px', fontWeight: 700, fontSize: 'clamp(10px, 1.1vw, 13px)', transform: 'rotate(2deg)' }}>
              MASTER OF AI · RMIT
            </motion.div>

            {/* bottom strip */}
            <div style={{ position: 'absolute', left: 'clamp(12px, 3vw, 36px)', bottom: 'clamp(12px, 2.4vh, 26px)', border: `4px solid ${K}`, boxShadow: `4px 4px 0 ${K}` }}>
              <Barcode />
            </div>
            <motion.button
              onClick={(e) => { e.stopPropagation(); open() }}
              animate={{ x: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
              className="btn"
              style={{ position: 'absolute', right: 'clamp(12px, 3vw, 36px)', bottom: 'clamp(12px, 2.4vh, 26px)', background: 'var(--sun)', fontSize: 'clamp(15px, 1.6vw, 19px)', minHeight: 52, boxShadow: `5px 5px 0 ${K}` }}
            >
              Open the cover →
            </motion.button>
          </div>
        </Face>
        {/* inside of the cover */}
        <Face back>
          <div style={{ position: 'absolute', inset: 0, background: '#FFF6E5', border: `6px solid ${K}`, backgroundImage: 'radial-gradient(rgba(20,20,20,.08) 2px, transparent 2.2px)', backgroundSize: '14px 14px' }}>
            <div className="mono" style={{ position: 'absolute', right: 30, bottom: 30, fontSize: 13, fontWeight: 700 }}>INSIDE: PAGE 1 · THE DESK</div>
          </div>
        </Face>
      </motion.div>

      <AnimatePresence>
        {!opening && window.innerWidth > 640 && (
          <motion.div exit={{ opacity: 0 }} className="mono" aria-hidden="true"
            style={{ position: 'absolute', left: '50%', bottom: 6, x: '-50%', fontSize: 11, fontWeight: 700, color: '#FFF6E5', letterSpacing: '.12em', pointerEvents: 'none', textShadow: '1px 1px 0 #141414' }}>
            SCROLL · CLICK · OR PRESS ENTER
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
