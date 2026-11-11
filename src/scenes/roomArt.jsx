import { motion } from 'motion/react'
import Sky from '../components/Sky'
import { art } from '../hooks'

// Every object in the room, drawn in the room's 1600×900 space.
// Each has a bbox so the phone layout can show it on its own.
const K = '#141414'
const S = { stroke: K, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' }

export const WALL = '#FFD447'
export const FLOOR = '#E8743B'

export function Backdrop({ night }) {
  return (
    <g>
      <defs>
        <pattern id="wallStripes" width="56" height="56" patternUnits="userSpaceOnUse">
          <rect width="56" height="56" fill={WALL} />
          <rect width="20" height="56" fill="#FFE07A" />
        </pattern>
        <pattern id="planks" width="200" height="60" patternUnits="userSpaceOnUse">
          <rect width="200" height="60" fill={FLOOR} />
          <path d="M0 59h200M140 0v59" stroke="#B9531F" strokeWidth="3" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="1600" height="650" fill="url(#wallStripes)" />
      <rect x="0" y="650" width="1600" height="250" fill="url(#planks)" />
      <rect x="0" y="628" width="1600" height="24" fill="#FFF6E5" {...S} />
      <ellipse cx="600" cy="800" rx="340" ry="82" fill="#FF7AC6" {...S} />
      <ellipse cx="600" cy="800" rx="270" ry="60" fill="none" stroke="#FFF6E5" strokeWidth="8" />
      <ellipse cx="600" cy="800" rx="190" ry="40" fill="none" stroke="#C2185B" strokeWidth="6" />
      {night && <rect width="1600" height="900" fill="#0B1030" opacity="0" />}
    </g>
  )
}

export function Desk() {
  return (
    <g>
      <rect x="500" y="540" width="26" height="230" fill="#8A4B2A" {...S} />
      <rect x="960" y="548" width="170" height="210" rx="6" fill="#B9673A" {...S} />
      <rect x="980" y="575" width="130" height="60" rx="6" fill="#D98652" {...S} />
      <rect x="980" y="655" width="130" height="80" rx="6" fill="#D98652" {...S} />
      <path d="M1030 605h30M1030 695h30" {...S} strokeWidth="6" />
      <rect x="480" y="518" width="680" height="32" rx="8" fill="#D98652" {...S} />
    </g>
  )
}

/* ── Window: real Melbourne sky ───────────────────────────── */
export const windowBox = [60, 50, 440, 400]
export function Window({ phase }) {
  return (
    <g>
      <rect x="62" y="56" width="440" height="20" fill="#FF7AC6" {...S} />
      <svg x="90" y="80" width="390" height="320" viewBox="0 0 390 320" overflow="hidden">
        <Sky w={390} h={320} phase={phase} id="win" />
      </svg>
      <rect x="80" y="70" width="410" height="340" fill="none" stroke="#FFF6E5" strokeWidth="18" />
      <rect x="71" y="61" width="428" height="358" fill="none" {...S} />
      <rect x="89" y="79" width="392" height="322" fill="none" {...S} />
      <path d="M285 79v322M89 240h392" stroke="#FFF6E5" strokeWidth="12" />
      <path d="M285 79v322M89 240h392" fill="none" stroke={K} strokeWidth="2" />
      <rect x="64" y="410" width="442" height="22" rx="4" fill="#FFF6E5" {...S} />
      {/* curtains */}
      <path d="M60 60 C 90 160, 70 300, 100 430 L 60 430 Z" fill="#2148E8" {...S} />
      <path d="M505 60 C 475 160, 495 300, 465 430 L 505 430 Z" fill="#2148E8" {...S} />
      {/* a tiny plant on the sill */}
      <rect x="410" y="378" width="40" height="34" rx="4" fill="#FF5B2E" {...S} />
      <path d="M430 378c-20-30-6-48 0-56M430 378c16-22 26-30 34-30M430 378c-10-16-26-20-36-18" fill="none" stroke="#0E8A5F" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

/* ── Record player on a crate → Story ─────────────────────── */
export const recordBox = [80, 440, 330, 230]
export function RecordPlayer() {
  const spines = ['#2148E8', '#FF5B2E', '#7FE0B5', '#FF7AC6', '#141414', '#B9A4FF', '#FFF6E5', '#2148E8', '#FF5B2E', '#7FE0B5']
  return (
    <g>
      <rect x="92" y="505" width="300" height="148" rx="6" fill="#C98B4B" {...S} />
      {spines.map((c, i) => (
        <rect key={i} x={108 + i * 27} y={522} width="22" height="116" rx="3" fill={c} {...S} strokeWidth="3" />
      ))}
      <rect x="92" y="560" width="300" height="10" fill="#A86A33" opacity=".4" />
      <rect x="104" y="458" width="276" height="50" rx="8" fill="#FFF6E5" {...S} />
      <ellipse cx="220" cy="470" rx="96" ry="16" fill={K} />
      <motion.g style={{ originX: '220px', originY: '470px' }} animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
        <ellipse cx="220" cy="470" rx="34" ry="7" fill="#FF5B2E" />
        <rect x="216" y="466" width="8" height="2" fill="#FFF6E5" />
      </motion.g>
      <path d="M350 466 L 330 480 L 262 474" fill="none" {...S} strokeWidth="5" />
      <circle cx="350" cy="466" r="9" fill="#2148E8" {...S} strokeWidth="3" />
      <text x="135" y="499" fontFamily="Space Mono, monospace" fontWeight="700" fontSize="12" fill={K}>SIDE A · SIDE B</text>
      {/* music notes */}
      <motion.g animate={{ y: [0, -14, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
        <path d="M150 440v-26l18-4v24" fill="none" {...S} strokeWidth="3" /><circle cx="146" cy="440" r="5" fill={K} /><circle cx="164" cy="434" r="5" fill={K} />
      </motion.g>
    </g>
  )
}

/* ── Corkboard → Experience ───────────────────────────────── */
export const corkBox = [530, 60, 270, 240]
export function Corkboard() {
  const pin = (x, y, c) => <circle cx={x} cy={y} r="7" fill={c} {...S} strokeWidth="2.5" />
  return (
    <g>
      <rect x="540" y="70" width="250" height="215" rx="6" fill="#C98B4B" {...S} />
      <rect x="552" y="82" width="226" height="191" fill="#D9A066" />
      {[[580, 100, -6, '#FFF6E5'], [670, 96, 4, '#FFF6E5'], [600, 186, 3, '#FFF6E5']].map(([x, y, r, c], i) => (
        <g key={i} transform={`rotate(${r} ${x + 40} ${y + 45})`}>
          <rect x={x} y={y} width="80" height="90" fill={c} {...S} strokeWidth="3" />
          <rect x={x + 8} y={y + 8} width="64" height="56" fill={['#2148E8', '#FF7AC6', '#7FE0B5'][i]} {...S} strokeWidth="2.5" />
          <path d={`M${x + 14} ${y + 76}h40`} {...S} strokeWidth="3" />
        </g>
      ))}
      <g transform="rotate(-8 730 220)">
        <rect x="690" y="196" width="78" height="44" rx="4" fill="#FFD447" {...S} strokeWidth="3" />
        <path d="M712 196v44" stroke={K} strokeWidth="2" strokeDasharray="4 4" />
        <text x="718" y="224" fontFamily="Space Mono, monospace" fontSize="12" fontWeight="700" fill={K}>WORK</text>
      </g>
      {pin(620, 102, '#FF5B2E')}{pin(710, 98, '#2148E8')}{pin(640, 190, '#FFD447')}{pin(728, 196, '#FF7AC6')}
    </g>
  )
}

/* ── Monitor → Project library ────────────────────────────── */
export const monitorBox = [640, 230, 390, 300]
export function Monitor({ screenRef }) {
  return (
    <g>
      <rect x="806" y="488" width="44" height="34" fill="#E5DCCB" {...S} />
      <ellipse cx="828" cy="520" rx="70" ry="10" fill="#E5DCCB" {...S} />
      <rect x="650" y="244" width="356" height="248" rx="22" fill="#FFF6E5" {...S} strokeWidth="5" />
      <g ref={screenRef}>
        <rect x="670" y="262" width="316" height="204" rx="8" fill="#1B2560" {...S} />
      </g>
      <rect x="670" y="262" width="316" height="24" rx="8" fill="#FFD447" {...S} strokeWidth="3" />
      <text x="682" y="279" fontFamily="Space Mono, monospace" fontWeight="700" fontSize="13" fill={K}>PHAVAN.EXE</text>
      <rect x="682" y="296" width="70" height="158" rx="4" fill="#FFF6E5" opacity=".9" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="690" y={306 + i * 22} width="54" height="10" rx="3" fill={i === 0 ? '#2148E8' : '#B9A4FF'} />)}
      {[['#2148E8', 766, 300], ['#FF5B2E', 838, 300], ['#7FE0B5', 910, 300], ['#141414', 766, 380], ['#FF7AC6', 838, 380], ['#FFD447', 910, 380]].map(([c, x, y], i) => (
        <motion.g key={i} animate={{ y: [0, i % 2 ? -3 : 3, 0] }} transition={{ duration: 2.4 + i * 0.3, repeat: Infinity }}>
          <rect x={x} y={y} width="62" height="72" rx="5" fill={c} stroke="#FFF6E5" strokeWidth="3" />
          <rect x={x} y={y} width="62" height="12" rx="4" fill="#FFF6E5" />
        </motion.g>
      ))}
      <circle cx="828" cy="480" r="5" fill="#7FE0B5" {...S} strokeWidth="2" />
      {/* keyboard */}
      <rect x="700" y="502" width="220" height="18" rx="5" fill="#E5DCCB" {...S} strokeWidth="3" />
      <path d="M714 511h192" stroke={K} strokeWidth="2" strokeDasharray="8 5" />
    </g>
  )
}

/* ── Sticky notes on the bezel → Now ──────────────────────── */
export const stickyBox = [980, 220, 100, 120]
export function Stickies() {
  return (
    <g>
      <g transform="rotate(8 1030 290)">
        <rect x="992" y="252" width="74" height="74" fill="#FF7AC6" {...S} strokeWidth="3" />
        <path d="M1002 276h52M1002 292h40" {...S} strokeWidth="3" />
      </g>
      <g transform="rotate(-6 1020 250)">
        <rect x="986" y="226" width="74" height="74" fill="#FFF07A" {...S} strokeWidth="3" />
        <text x="996" y="256" fontFamily="Bangers, Impact, sans-serif" fontSize="22" fill={K}>NOW!</text>
        <path d="M996 272h48M996 286h34" {...S} strokeWidth="3" />
      </g>
    </g>
  )
}

/* ── Lamp → day / night ───────────────────────────────────── */
export const lampBox = [490, 360, 130, 165]
export function Lamp({ on }) {
  return (
    <g>
      <ellipse cx="540" cy="516" rx="38" ry="9" fill="#2148E8" {...S} />
      <path d="M540 512 L 520 440 L 576 390" fill="none" {...S} strokeWidth="8" />
      <path d="M540 512 L 520 440 L 576 390" fill="none" stroke="#2148E8" strokeWidth="3" />
      <circle cx="520" cy="440" r="8" fill="#FFD447" {...S} strokeWidth="3" />
      <path d="M560 372 L 612 390 L 596 432 L 548 404 Z" fill="#FF5B2E" {...S} />
      <ellipse cx="604" cy="412" rx="9" ry="20" transform="rotate(25 604 412)" fill={on ? '#FFF3C4' : '#8A8170'} {...S} strokeWidth="3" />
    </g>
  )
}

/* ── Phone on its dock → Contact ──────────────────────────── */
export const phoneBox = [590, 420, 60, 105]
export function Phone({ buzz }) {
  return (
    <motion.g animate={buzz ? { x: [0, -3, 3, -3, 3, 0] } : { x: 0 }} transition={{ duration: 0.5 }}>
      <rect x="596" y="500" width="52" height="20" rx="5" fill={K} />
      <rect x="602" y="432" width="40" height="78" rx="8" fill="#FF5B2E" {...S} />
      <rect x="607" y="440" width="30" height="56" rx="4" fill={buzz ? '#FFF07A' : '#7FE0B5'} {...S} strokeWidth="2.5" />
      {buzz && <text x="610" y="472" fontFamily="Space Mono, monospace" fontWeight="700" fontSize="9" fill={K}>HI!</text>}
      <circle cx="622" cy="503" r="3" fill={K} />
    </motion.g>
  )
}

/* ── Printer → Résumé ─────────────────────────────────────── */
export const printerBox = [1030, 380, 130, 145]
export function Printer({ printing }) {
  return (
    <g>
      <rect x="1056" y="418" width="78" height="40" fill="#FFF" {...S} strokeWidth="3" />
      <rect x="1040" y="452" width="112" height="66" rx="10" fill="#B9A4FF" {...S} />
      <rect x="1052" y="470" width="88" height="10" rx="4" fill={K} />
      <circle cx="1136" cy="500" r="5" fill={printing ? '#7FE0B5' : '#FF5B2E'} {...S} strokeWidth="2" />
      <motion.g initial={false} animate={{ y: printing ? 62 : 0 }} transition={{ duration: 1.1, ease: 'easeOut' }}>
        <rect x="1060" y="420" width="70" height="56" fill="#FFF6E5" {...S} strokeWidth="2.5" />
        <path d="M1068 434h40M1068 446h54M1068 458h46" stroke={K} strokeWidth="2.5" />
        <text x="1070" y="430" fontFamily="Space Mono, monospace" fontWeight="700" fontSize="8" fill={K}>CV</text>
      </motion.g>
      <rect x="1040" y="476" width="112" height="14" fill="#B9A4FF" stroke="none" />
      <path d="M1040 476h112" {...S} strokeWidth="3" />
    </g>
  )
}

/* ── Bookshelf → Education ────────────────────────────────── */
export const shelfBox = [1210, 90, 320, 560]
export function Bookshelf() {
  const shelf = (y) => <rect x="1222" y={y} width="292" height="14" fill="#B9673A" {...S} strokeWidth="3" />
  const book = (x, y, w, h, c, label, lean = 0) => (
    <g transform={lean ? `rotate(${lean} ${x + w / 2} ${y + h})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={c} {...S} strokeWidth="3" />
      {label && (
        <text x={x + w / 2} y={y + h / 2} transform={`rotate(-90 ${x + w / 2} ${y + h / 2})`} textAnchor="middle" dominantBaseline="middle" fontFamily="Bangers, Impact, sans-serif" fontSize={Math.min(w * 0.7, 28)} fill="#FFF6E5" letterSpacing="2">{label}</text>
      )}
      {!label && <path d={`M${x + 5} ${y + 14}h${w - 10}M${x + 5} ${y + h - 14}h${w - 10}`} stroke={K} strokeWidth="2" />}
    </g>
  )
  return (
    <g>
      <rect x="1210" y="96" width="316" height="548" rx="8" fill="#D98652" {...S} strokeWidth="5" />
      <rect x="1226" y="112" width="284" height="516" fill="#8A4B2A" />
      {shelf(230)}{shelf(370)}{shelf(500)}{shelf(626)}
      {/* top shelf: trophy, plant, small books */}
      {book(1240, 150, 22, 80, '#FF7AC6')}{book(1264, 160, 18, 70, '#7FE0B5')}{book(1284, 146, 24, 84, '#FFF6E5')}
      <path d="M1360 230 l8-30 h40 l8 30z" fill="#FFD447" {...S} strokeWidth="3" />
      <path d="M1372 200c-14 0-16-26 2-24M1404 200c14 0 16-26-2-24M1366 176h44v-8h-44z" fill="#FFD447" {...S} strokeWidth="3" />
      <rect x="1440" y="196" width="44" height="34" rx="4" fill="#2148E8" {...S} strokeWidth="3" />
      <path d="M1462 196c-10-24 0-40 12-44M1462 196c-18-14-28-12-32-8" fill="none" stroke="#0E8A5F" strokeWidth="6" strokeLinecap="round" />
      {/* the education books, big and labelled */}
      {book(1244, 258, 52, 112, '#E2231A', 'RMIT')}
      {book(1300, 270, 46, 100, '#2148E8', 'VIT')}
      {book(1350, 266, 46, 104, '#0E8A5F', 'SRM')}
      {book(1404, 290, 22, 80, '#FFD447', null, 14)}
      <rect x="1446" y="300" width="50" height="70" rx="4" fill="#FFF6E5" {...S} strokeWidth="3" />
      <text x="1471" y="342" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="10" fontWeight="700" fill={K}>2026</text>
      {/* third shelf: notebooks + a little skateboard */}
      {book(1240, 410, 20, 90, '#141414')}{book(1262, 420, 20, 80, '#FF5B2E')}{book(1284, 404, 26, 96, '#B9A4FF')}{book(1312, 416, 18, 84, '#7FE0B5')}
      <rect x="1360" y="478" width="120" height="12" rx="6" fill="#FFD447" {...S} strokeWidth="3" />
      <circle cx="1380" cy="494" r="6" fill="#FFF6E5" {...S} strokeWidth="2.5" /><circle cx="1460" cy="494" r="6" fill="#FFF6E5" {...S} strokeWidth="2.5" />
      {/* bottom shelf: boxes */}
      <rect x="1240" y="548" width="120" height="78" rx="4" fill="#FFF6E5" {...S} strokeWidth="3" />
      <rect x="1370" y="560" width="120" height="66" rx="4" fill="#FF7AC6" {...S} strokeWidth="3" />
      <text x="1300" y="594" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="12" fontWeight="700" fill={K}>NOTES</text>
    </g>
  )
}

/* ── Gym bag + dumbbell → Off the clock ───────────────────── */
export const bagBox = [1130, 690, 380, 160]
export function GymBag() {
  return (
    <g>
      <ellipse cx="1340" cy="836" rx="170" ry="16" fill="rgba(20,20,20,.18)" />
      <path d="M1260 730c0-40 160-40 160 0" fill="none" {...S} strokeWidth="9" />
      <path d="M1260 730c0-40 160-40 160 0" fill="none" stroke="#FFD447" strokeWidth="3" />
      <rect x="1220" y="726" width="240" height="106" rx="48" fill="#2148E8" {...S} strokeWidth="5" />
      <rect x="1220" y="764" width="240" height="18" fill="#FFF6E5" {...S} strokeWidth="3" />
      <circle cx="1250" cy="779" r="24" fill="#FF5B2E" {...S} />
      <text x="1340" y="814" textAnchor="middle" fontFamily="Bangers, Impact, sans-serif" fontSize="26" fill="#FFD447" letterSpacing="2">LEG DAY</text>
      {/* dumbbell */}
      <rect x="1146" y="808" width="70" height="10" fill="#8A8170" {...S} strokeWidth="3" />
      <rect x="1140" y="792" width="18" height="42" rx="4" fill={K} />
      <rect x="1204" y="792" width="18" height="42" rx="4" fill={K} />
    </g>
  )
}

/* ── Sketchbook on the rug → Ideas ────────────────────────── */
export const sketchBox = [760, 770, 200, 100]
export function Sketchbook() {
  return (
    <g>
      <path d="M780 800 L 870 784 L 940 812 L 850 832 Z" fill="#FFF6E5" {...S} />
      <path d="M870 784 L 850 832" {...S} strokeWidth="3" />
      <path d="M795 803c14-10 28 4 40-6M800 814c18-6 22 2 34-2" fill="none" stroke="#2148E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="900" cy="808" r="9" fill="#FF7AC6" stroke={K} strokeWidth="2.5" />
      <path d="M884 818 l20 4" stroke="#FF5B2E" strokeWidth="3" strokeLinecap="round" />
      <g transform="rotate(-24 900 840)">
        <rect x="860" y="836" width="80" height="10" rx="3" fill="#FFD447" {...S} strokeWidth="2.5" />
        <path d="M940 836 l14 5 -14 5z" fill="#E8C49A" {...S} strokeWidth="2" />
      </g>
    </g>
  )
}

/* ── Me ───────────────────────────────────────────────────── */
export const meBox = [450, 500, 280, 360]
export function Me({ pose }) {
  return (
    <g>
      <ellipse cx="590" cy="842" rx="120" ry="14" fill="rgba(20,20,20,.18)" />
      <image href={art(pose)} x="470" y="520" width="240" height="320" preserveAspectRatio="xMidYMax meet" />
    </g>
  )
}
