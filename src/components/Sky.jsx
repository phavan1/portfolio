import { motion } from 'motion/react'

const SKIES = {
  dawn: ['#3B3F8F', '#F59BB8', '#FFD08A'],
  day: ['#3A7BFF', '#7FB2FF', '#CFE4FF'],
  golden: ['#5B3FA8', '#FF7A59', '#FFC75A'],
  night: ['#0B1030', '#1B2560', '#2C3A80'],
}

// A generic Melbourne-ish skyline: a tall needle-topped tower,
// a striped tower, chunky blocks. Drawn in a w×h box.
function Skyline({ w, h, night, id }) {
  const base = h
  const blocks = [
    [0.02, 0.42, 0.09], [0.1, 0.55, 0.07], [0.16, 0.32, 0.1], [0.27, 0.62, 0.06],
    [0.33, 0.47, 0.09], [0.42, 0.78, 0.07], // the tall one
    [0.5, 0.5, 0.08], [0.59, 0.36, 0.1], [0.7, 0.58, 0.07], [0.78, 0.44, 0.09], [0.88, 0.3, 0.12],
  ]
  const fill = night ? '#141a3d' : '#2B3270'
  const lit = night ? '#FFD447' : 'rgba(255,255,255,.35)'
  return (
    <g>
      {blocks.map(([x, hh, ww], i) => {
        const bx = x * w, bw = ww * w, bh = hh * h * 0.75, by = base - bh
        const rows = Math.floor(bh / 18), cols = Math.max(2, Math.floor(bw / 16))
        return (
          <g key={i}>
            <rect x={bx} y={by} width={bw} height={bh + 2} fill={fill} stroke="#141414" strokeWidth="2" />
            {i === 5 && <rect x={bx + bw / 2 - 2} y={by - h * 0.12} width="4" height={h * 0.12} fill={fill} stroke="#141414" strokeWidth="1.5" />}
            {Array.from({ length: rows * cols }).map((_, k) => {
              const r = Math.floor(k / cols), c = k % cols
              const on = (k * 7 + i * 13) % 5 === 0
              if (!on) return null
              return <rect key={k} x={bx + 5 + c * ((bw - 10) / cols)} y={by + 8 + r * 18} width="5" height="7" fill={lit} />
            })}
          </g>
        )
      })}
    </g>
  )
}

export default function Sky({ w = 1600, h = 900, phase = 'day', id = 'sky', tram = true }) {
  const [top, mid, low] = SKIES[phase] || SKIES.day
  const night = phase === 'night'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset=".6" stopColor={mid} />
          <stop offset="1" stopColor={low} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-g)`} />
      {night
        ? Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 97) % w} cy={((i * 53) % (h * 0.5)) + 6} r={i % 4 === 0 ? 2.2 : 1.2} fill="#FFF6E5" opacity={0.5 + (i % 3) * 0.2} />
          ))
        : null}
      {night
        ? <circle cx={w * 0.8} cy={h * 0.2} r={h * 0.07} fill="#FFF6E5" stroke="#141414" strokeWidth="2" />
        : <circle cx={w * 0.78} cy={phase === 'day' ? h * 0.2 : h * 0.5} r={h * 0.09} fill={phase === 'day' ? '#FFD447' : '#FFB347'} stroke="#141414" strokeWidth="2" />}
      {!night && (
        <g fill="#fff" stroke="#141414" strokeWidth="2" opacity=".95">
          <motion.g animate={{ x: [0, w * 0.06, 0] }} transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}>
            <ellipse cx={w * 0.2} cy={h * 0.18} rx={w * 0.06} ry={h * 0.04} />
            <ellipse cx={w * 0.25} cy={h * 0.15} rx={w * 0.05} ry={h * 0.045} />
          </motion.g>
        </g>
      )}
      <g transform={`translate(0 ${h * 0.12})`}>
        <Skyline w={w} h={h * 0.88} night={night} id={id} />
      </g>
      {tram && (
        <motion.g
          initial={{ x: -w * 0.35 }}
          animate={{ x: w * 1.1 }}
          transition={{ duration: 14, repeat: Infinity, repeatDelay: 9, ease: 'linear' }}
        >
          <rect x="0" y={h * 0.86} width={w * 0.26} height={h * 0.1} rx={h * 0.025} fill="#7FE0B5" stroke="#141414" strokeWidth="2.5" />
          <rect x="0" y={h * 0.86} width={w * 0.26} height={h * 0.025} rx="4" fill="#FFD447" stroke="#141414" strokeWidth="2" />
          {[0.02, 0.07, 0.12, 0.17, 0.22].map((p) => (
            <rect key={p} x={w * p} y={h * 0.895} width={w * 0.035} height={h * 0.035} rx="3" fill={night ? '#FFE9A8' : '#CFE4FF'} stroke="#141414" strokeWidth="1.5" />
          ))}
        </motion.g>
      )}
    </g>
  )
}
