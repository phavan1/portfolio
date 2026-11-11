// The desk scene (Look 1), drawn as SVG. Parts with data-hit are clickable.
// The monitor's screen is left empty: PHAVAN OS is laid on top in HTML.
const PHASES = {
  night: { top: '#0B1030', bottom: '#3B3F8F', orb: '#FFF6E5', orbY: 140, stars: 1, lit: '#FFD447' },
  dawn: { top: '#3B3F8F', bottom: '#F59BB8', orb: '#FFD08A', orbY: 200, stars: 0.3, lit: '#FFE9A8' },
  day: { top: '#3A7BFF', bottom: '#CFE4FF', orb: '#FFD447', orbY: 130, stars: 0, lit: '#CFE4FF' },
  golden: { top: '#5B3FA8', bottom: '#FFC75A', orb: '#FF9E4A', orbY: 190, stars: 0, lit: '#FFE9A8' },
}

export function sceneMarkup(phase, base) {
  const P = PHASES[phase] || PHASES.day
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" width="1440" height="900" class="scene">
<defs>
  <filter id="c-grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" result="n"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.08  0 0 0 0 0.08  0 0 0 .55 -.18"/>
  </filter>
  <pattern id="c-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.6" fill="#141414"/></pattern>
  <pattern id="c-dotsW" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="2.6" fill="#fff" opacity=".22"/></pattern>
  <pattern id="c-stripes" width="64" height="64" patternUnits="userSpaceOnUse"><rect width="64" height="64" fill="#FF5B2E"/><rect width="30" height="64" fill="#FF7140"/></pattern>
  <linearGradient id="c-fadeDown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="c-fadeUp" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="c-mShadowDesk"><rect x="0" y="690" width="1440" height="140" fill="url(#c-fadeDown)"/></mask>
  <mask id="c-mWallTop"><rect x="0" y="0" width="1440" height="220" fill="url(#c-fadeDown)"/></mask>
  <linearGradient id="c-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.top}"/><stop offset="1" stop-color="${P.bottom}"/></linearGradient>
  <clipPath id="c-win"><rect x="40" y="70" width="230" height="330"/></clipPath>
  <clipPath id="c-screen"><rect x="282" y="96" width="876" height="458" rx="14"/></clipPath>
</defs>

<!-- WALL -->
<rect width="1440" height="700" fill="url(#c-stripes)"/>


<!-- WINDOW peeking left -->
<g>
  <g clip-path="url(#c-win)">
    <rect x="40" y="70" width="230" height="330" fill="url(#c-sky)"/>
    <circle cx="120" cy="${P.orbY}" r="26" fill="${P.orb}" stroke="#141414" stroke-width="4"/>
    <g fill="#FFF6E5" opacity="${P.stars}"><circle cx="70" cy="110" r="2"/><circle cx="200" cy="100" r="2.5"/><circle cx="230" cy="170" r="2"/><circle cx="170" cy="200" r="1.6"/></g>
    <g fill="#1B2560" stroke="#141414" stroke-width="3">
      <rect x="40" y="290" width="50" height="120"/><rect x="88" y="250" width="38" height="160"/>
      <rect x="124" y="200" width="30" height="210"/><rect x="137" y="160" width="4" height="40"/>
      <rect x="152" y="270" width="56" height="140"/><rect x="206" y="230" width="44" height="180"/>
    </g>
    <g fill="${P.lit}"><rect x="98" y="270" width="6" height="8"/><rect x="132" y="230" width="6" height="8"/><rect x="132" y="300" width="6" height="8"/><rect x="162" y="300" width="6" height="8"/><rect x="216" y="260" width="6" height="8"/><rect x="50" y="320" width="6" height="8"/></g>
    <g class="tram">
      <rect x="60" y="360" width="150" height="34" rx="8" fill="#7FE0B5" stroke="#141414" stroke-width="4"/>
      <g fill="#FFE9A8" stroke="#141414" stroke-width="2.5"><rect x="72" y="368" width="22" height="14" rx="3"/><rect x="102" y="368" width="22" height="14" rx="3"/><rect x="132" y="368" width="22" height="14" rx="3"/><rect x="162" y="368" width="22" height="14" rx="3"/></g>
    </g>
  </g>
  <rect x="40" y="70" width="230" height="330" fill="none" stroke="#FFF6E5" stroke-width="16"/>
  <rect x="32" y="62" width="246" height="346" fill="none" stroke="#141414" stroke-width="5"/>
  <rect x="48" y="78" width="214" height="314" fill="none" stroke="#141414" stroke-width="4"/>
  <path d="M155 78v314M48 235h214" stroke="#FFF6E5" stroke-width="10"/>
  <path d="M155 78v314M48 235h214" stroke="#141414" stroke-width="2"/>
  <rect x="26" y="404" width="260" height="20" rx="4" fill="#FFF6E5" stroke="#141414" stroke-width="5"/>
</g>

<!-- POSTER right -->
<g class="hit" data-hit="ideas" tabindex="0" role="button" aria-label="Poster: open my sketchbook of ideas">
<g transform="rotate(4 1330 230)">
  <rect x="1250" y="110" width="160" height="220" fill="#2148E8" stroke="#141414" stroke-width="5"/>
  <rect x="1250" y="110" width="160" height="220" fill="url(#c-dotsW)"/>
  <text x="1330" y="200" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="46" fill="#FFD447" stroke="#141414" stroke-width="2" letter-spacing="2">MAKE</text>
  <text x="1330" y="245" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="46" fill="#FFD447" stroke="#141414" stroke-width="2" letter-spacing="2">THINGS</text>
  <text x="1330" y="300" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="14" fill="#FFF6E5">MELB · 2026</text>
  <circle cx="1330" cy="122" r="7" fill="#FF7AC6" stroke="#141414" stroke-width="3"/>
</g>

</g>
<!-- DESK -->
<rect x="0" y="690" width="1440" height="210" fill="#FFD447"/>
<rect x="0" y="690" width="1440" height="210" fill="url(#c-dots)" opacity=".16"/>

<path d="M0 690H1440" stroke="#141414" stroke-width="6"/>


<!-- MONITOR: hard shadow, stand, body -->
<path d="M690 640 L 750 640 L 770 712 L 670 712 Z" fill="#E5DCCB" stroke="#141414" stroke-width="6" stroke-linejoin="round"/>
<ellipse cx="720" cy="714" rx="170" ry="22" fill="#E5DCCB" stroke="#141414" stroke-width="6"/>
<rect x="230" y="54" width="1000" height="602" rx="44" fill="#141414"/>
<rect x="216" y="40" width="1000" height="602" rx="44" fill="#FFF6E5" stroke="#141414" stroke-width="7"/>
<rect x="216" y="520" width="1000" height="122" rx="44" fill="url(#c-dots)" opacity=".12"/>
<rect x="268" y="84" width="904" height="484" rx="20" fill="#141414"/>

<!-- bezel details -->
<text x="716" y="610" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="30" letter-spacing="4" fill="#141414">PK·98</text>
<circle cx="1150" cy="600" r="9" fill="#7FE0B5" stroke="#141414" stroke-width="4"/>
<g stroke="#141414" stroke-width="4"><rect x="1060" y="592" width="60" height="16" rx="8" fill="#E5DCCB"/></g>
<!-- sticker of me on the bezel -->
<g class="hit" data-hit="about" tabindex="0" role="button" aria-label="Sticker of me: about me">
<g transform="rotate(-8 330 600)">
  <circle cx="330" cy="598" r="58" fill="#fff" stroke="#141414" stroke-width="5"/>
  <circle cx="330" cy="598" r="48" fill="#FF7AC6" stroke="#141414" stroke-width="3"/>
  <circle cx="330" cy="598" r="48" fill="url(#c-dotsW)"/>
  <clipPath id="c-stk"><circle cx="330" cy="598" r="47"/></clipPath>
  <image href="${base}art/talking.webp" x="282" y="556" width="96" height="96" clip-path="url(#c-stk)" preserveAspectRatio="xMidYMin slice"/>
</g>
</g>
<!-- sticky notes on the bezel -->
<g class="hit" data-hit="resume" tabindex="0" role="button" aria-label="Sticky note: hire me, open my résumé">
<g transform="rotate(7 1200 120)">
  <rect x="1150" y="60" width="104" height="104" fill="#FFF07A" stroke="#141414" stroke-width="4"/>
  <rect x="1150" y="60" width="104" height="22" fill="#F5DE4A" stroke="#141414" stroke-width="4"/>
  <text x="1162" y="116" font-family="Bangers, Impact, sans-serif" font-size="30" fill="#141414">HIRE ME</text>
  <text x="1162" y="146" font-family="Space Mono, monospace" font-weight="700" font-size="13" fill="#141414">(AI roles!)</text>
</g>

</g>
<!-- DESK PROPS -->
<!-- keyboard -->
<g>
  <path d="M470 760 L 970 760 L 1000 830 L 440 830 Z" fill="#141414"/>
  <path d="M460 750 L 960 750 L 990 820 L 430 820 Z" fill="#E5DCCB" stroke="#141414" stroke-width="6" stroke-linejoin="round"/>
  <g stroke="#141414" stroke-width="2.5" fill="#FFF6E5"><rect x="476.0" y="758" width="25.5" height="12" rx="3"/><rect x="505.5" y="758" width="25.5" height="12" rx="3"/><rect x="535.0" y="758" width="25.5" height="12" rx="3"/><rect x="564.5" y="758" width="25.5" height="12" rx="3"/><rect x="594.0" y="758" width="25.5" height="12" rx="3"/><rect x="623.5" y="758" width="25.5" height="12" rx="3"/><rect x="653.0" y="758" width="25.5" height="12" rx="3"/><rect x="682.5" y="758" width="25.5" height="12" rx="3"/><rect x="712.0" y="758" width="25.5" height="12" rx="3"/><rect x="741.5" y="758" width="25.5" height="12" rx="3"/><rect x="771.0" y="758" width="25.5" height="12" rx="3"/><rect x="800.5" y="758" width="25.5" height="12" rx="3"/><rect x="830.0" y="758" width="25.5" height="12" rx="3"/><rect x="859.5" y="758" width="25.5" height="12" rx="3"/><rect x="889.0" y="758" width="25.5" height="12" rx="3"/><rect x="918.5" y="758" width="25.5" height="12" rx="3"/><rect x="470.0" y="774" width="24.5" height="12" rx="3"/><rect x="498.5" y="774" width="24.5" height="12" rx="3"/><rect x="526.9" y="774" width="24.5" height="12" rx="3"/><rect x="555.4" y="774" width="24.5" height="12" rx="3"/><rect x="583.9" y="774" width="24.5" height="12" rx="3"/><rect x="612.4" y="774" width="24.5" height="12" rx="3"/><rect x="640.8" y="774" width="24.5" height="12" rx="3"/><rect x="669.3" y="774" width="24.5" height="12" rx="3"/><rect x="697.8" y="774" width="24.5" height="12" rx="3"/><rect x="726.2" y="774" width="24.5" height="12" rx="3"/><rect x="754.7" y="774" width="24.5" height="12" rx="3"/><rect x="783.2" y="774" width="24.5" height="12" rx="3"/><rect x="811.6" y="774" width="24.5" height="12" rx="3"/><rect x="840.1" y="774" width="24.5" height="12" rx="3"/><rect x="868.6" y="774" width="24.5" height="12" rx="3"/><rect x="897.1" y="774" width="24.5" height="12" rx="3"/><rect x="925.5" y="774" width="24.5" height="12" rx="3"/><rect x="464.0" y="790" width="23.6" height="12" rx="3"/><rect x="491.6" y="790" width="23.6" height="12" rx="3"/><rect x="519.1" y="790" width="23.6" height="12" rx="3"/><rect x="546.7" y="790" width="23.6" height="12" rx="3"/><rect x="574.2" y="790" width="23.6" height="12" rx="3"/><rect x="601.8" y="790" width="23.6" height="12" rx="3"/><rect x="629.3" y="790" width="23.6" height="12" rx="3"/><rect x="656.9" y="790" width="23.6" height="12" rx="3"/><rect x="684.4" y="790" width="23.6" height="12" rx="3"/><rect x="712.0" y="790" width="23.6" height="12" rx="3"/><rect x="739.6" y="790" width="23.6" height="12" rx="3"/><rect x="767.1" y="790" width="23.6" height="12" rx="3"/><rect x="794.7" y="790" width="23.6" height="12" rx="3"/><rect x="822.2" y="790" width="23.6" height="12" rx="3"/><rect x="849.8" y="790" width="23.6" height="12" rx="3"/><rect x="877.3" y="790" width="23.6" height="12" rx="3"/><rect x="904.9" y="790" width="23.6" height="12" rx="3"/><rect x="932.4" y="790" width="23.6" height="12" rx="3"/><rect x="560" y="806" width="300" height="10" rx="4"/></g>
</g>
<!-- mug -->
<g class="hit" data-hit="mug" tabindex="0" role="button" aria-label="Mug of coffee">
<g>
  <path class="steam" d="M120 690c0-30 30-40 10-70" fill="none" stroke="#FFF6E5" stroke-width="7" stroke-linecap="round" opacity=".9"/>
  <path class="steam s2" d="M160 690c0-30 30-40 10-70" fill="none" stroke="#FFF6E5" stroke-width="7" stroke-linecap="round" opacity=".7"/>
  <ellipse cx="150" cy="812" rx="82" ry="14" fill="#141414" opacity=".28"/>
  <path d="M206 730c50-4 50 66 0 60" fill="none" stroke="#141414" stroke-width="20"/>
  <path d="M206 730c50-4 50 66 0 60" fill="none" stroke="#2148E8" stroke-width="10"/>
  <path d="M86 700h130v96c0 14-12 20-24 20h-82c-12 0-24-6-24-20z" fill="#2148E8" stroke="#141414" stroke-width="6" stroke-linejoin="round"/>
  <ellipse cx="151" cy="700" rx="65" ry="12" fill="#5A3A22" stroke="#141414" stroke-width="5"/>
  <text x="151" y="772" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="36" fill="#FFD447" stroke="#141414" stroke-width="1.5">AI</text>
</g>
</g>
<!-- phone on a stand --><g class="hit" data-hit="contact" tabindex="0" role="button" aria-label="Phone: say hi, contact me">
<g>
  <ellipse cx="1290" cy="818" rx="80" ry="12" fill="#141414" opacity=".28"/>
  <path d="M1240 806 L 1340 806 L 1326 780 L 1254 780 Z" fill="#141414"/>
  <g transform="rotate(6 1290 690)">
    <rect x="1236" y="590" width="118" height="210" rx="22" fill="#141414"/>
    <rect x="1228" y="580" width="118" height="210" rx="22" fill="#7FE0B5" stroke="#141414" stroke-width="6"/>
    <rect x="1242" y="596" width="90" height="170" rx="12" fill="#FFF6E5" stroke="#141414" stroke-width="4"/>
    <text x="1287" y="640" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="11" fill="#141414">INCOMING</text>
    <text x="1287" y="676" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="30" fill="#2148E8">SAY HI</text>
    <circle cx="1263" cy="728" r="16" fill="#7FE0B5" stroke="#141414" stroke-width="3.5"/>
    <circle cx="1311" cy="728" r="16" fill="#FF5B2E" stroke="#141414" stroke-width="3.5"/>
    <path d="M1256 728 l5 5 9-10" fill="none" stroke="#141414" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round"><path d="M1372 600c14 10 14 30 0 40"/><path d="M1388 588c22 18 22 46 0 64"/></g>
</g>

</g>
</svg>`
}
