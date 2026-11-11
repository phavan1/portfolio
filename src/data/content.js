// ─────────────────────────────────────────────────────────────
// ALL THE WORDS ON THE SITE LIVE HERE.
// Edit this file to update anything; the design reads from it.
// Anything in [BRACKETS] is a placeholder still to fill in.
// ─────────────────────────────────────────────────────────────

export const me = {
  name: 'Phavan Kumaar',
  short: 'Phavan',
  role: 'AI engineer in the making',
  tagline: 'An AI engineer who builds like an artist.',
  location: 'Melbourne, Australia',
  from: 'Chennai, Tamil Nadu, India',
  lookingFor: 'Open to AI engineering roles in Australia',
  workRights: '[WORK RIGHTS LINE: check the wording against your visa]',
  email: '[YOUR EMAIL]',
  github: 'https://github.com/phavan1',
  githubHandle: 'phavan1',
  instagram: 'https://instagram.com/phavankumaar',
  instagramHandle: '@phavankumaar',
  linkedin: null, // add the URL once the account exists
  resumePdf: null, // e.g. '/Phavan-Kumaar-Resume.pdf' once it exists
}

export const story = {
  sideA: {
    title: 'Side A · Chennai',
    text: "I grew up in Chennai as the kid who was always making something. Colours, drawings, designs, then apps and websites. Creativity is the biggest part of me and what makes me me.",
  },
  sideB: {
    title: 'Side B · Melbourne',
    text: "Now I'm in Melbourne doing a Master of Artificial Intelligence at RMIT, learning to build models and products that feel like a person made them, not a machine.",
  },
  extra: '[ONE LINE: what kind of AI work excites you most]',
  onRepeat: '[SONG · ARTIST]',
}

export const education = [
  { spine: 'RMIT', colour: '#E2231A', title: 'Master of Artificial Intelligence', place: 'RMIT University, Melbourne', years: '2025 – 2027 (expected)', note: '[Subjects or projects you loved]' },
  { spine: 'VIT', colour: '#2148E8', title: 'Postgraduate Certificate in Artificial Intelligence', place: 'VIT Bangalore', years: '2024 – 2025', note: '[Exact programme name]' },
  { spine: 'SRM', colour: '#0E8A5F', title: 'Bachelor of Technology in Mechanical Engineering', place: 'SRM Institute of Science and Technology, Chennai', years: '2019 – 2023', note: '' },
]

export const experience = [
  { kind: 'Web development', role: '[ROLE]', company: '[COMPANY]', dates: '[DATES]', did: '[One line on what you built]' },
  { kind: 'Computer science', role: '[ROLE]', company: '[COMPANY]', dates: '[DATES]', did: '[One line]' },
  { kind: 'Mechanical engineering', role: '[ROLE]', company: '[COMPANY]', dates: '[DATES]', did: '[One line]' },
]

export const skills = ['Python', 'Machine learning', 'Building AI models', 'HTML · CSS · JavaScript', 'React', 'Web & app design', 'Digital art', 'Shipping with AI tools', 'Git & GitHub', '[MORE]']

export const now = {
  month: '[MONTH YEAR]',
  items: [
    ['Learning', 'AI and ML, properly, from the maths up'],
    ['Building', 'this room, and the next version of Prequel'],
    ['Studying', '[this semester’s subjects]'],
    ['On repeat', '[song · artist]'],
  ],
}

export const ideas = [
  { title: 'Music memoir', text: 'Re-rate songs over the years and watch how your relationship with music changes.' },
  { title: 'Parallel presence', text: 'Quiet company from real people while you do boring tasks. AI only as a fallback, never a stand-in for people.' },
  { title: 'Ask my room', text: 'A little AI assistant in this room that answers questions about me from my résumé and projects. Coming soon.' },
]

export const offClock = [
  { title: 'Gym', text: 'Leg day included. Mostly.', art: 'legday' },
  { title: 'Music', text: 'Always something on repeat.', art: 'onrepeat' },
  { title: 'PC games', text: 'Story games and web-slinging.', art: null },
  { title: 'Animation', text: 'Where the colour obsession started.', art: 'cheer' },
]

// status: 'shipped' | 'progress' | 'academic' | 'sketch'
export const projects = [
  {
    id: 'prequel',
    title: 'Prequel',
    status: 'shipped',
    cover: { bg: '#2148E8', art: 'sitting', ink: '#FFD447' },
    kind: 'iPhone web app',
    blurb: 'A warm, no-pressure life tracker. No streaks, no zeros, nothing graded.',
    play: 'https://phavan1.github.io/prequel/',
    code: 'https://github.com/phavan1/prequel',
    quote: '“The behind-the-scenes of everything I’m becoming.”',
    about: [
      'Prequel tracks food, sleep, moving and tiny wins, but it refuses to grade you. There are no streaks, no rates and no zeros. Instead, a jar fills with paper stars, a quilt grows a patch a day, and when you need it there is a soft day, with a blanket and a few calm games.',
      'I designed and built it for myself, then friends started using it. Their feedback shaped a lot of it: kg or lb, every kind of sport, saving on Android, and an optional cycle tracker.',
    ],
    shots: ['home', 'move', 'rest', 'quilt'],
    requirements: [
      ['Built with', 'HTML, CSS and JavaScript modules, no framework'],
      ['Storage', 'IndexedDB on the phone, with JSON backups'],
      ['Offline', 'Service worker; fonts and food data bundled'],
      ['Food data', '≈1,000 Indian recipes + ≈8,000 USDA foods'],
      ['Extras', 'PDF reports drawn on canvas, share cards, mini games'],
    ],
    patchNotes: [
      ['v20', 'Share cards you can post to your story'],
      ['v24', 'Sleep diary and food reports as PDFs'],
      ['v31', 'A hanging quilt for every month'],
      ['v41', 'Jars that screw shut and celebrate when full'],
      ['v45', 'Gentler nights: breathe with me, notes for your doctor'],
      ['v48', 'Move for every kind of moving, after friends asked'],
      ['v68', 'Slow ride: an endless, calm bike ride'],
      ['v71', 'kg or lb, for a friend in the US'],
      ['v92', 'Laptop layout with a sidebar'],
      ['v99', 'Move reports a doctor or coach can read'],
    ],
    achievements: [
      ['99 versions', 'Shipped and iterated over about a month'],
      ['Used by friends', 'Real people, real feedback, real fixes'],
      ['Works offline', 'No account, no server, no tracking'],
      ['Kind by design', 'Not a single zero anywhere in the app'],
    ],
    reviews: ['[A REAL QUOTE FROM A FRIEND, with permission]', '[ANOTHER REAL QUOTE]'],
  },
  {
    id: 'revyou',
    title: 'RevYou',
    status: 'shipped',
    cover: { bg: '#FF5B2E', art: 'stickynote', ink: '#141414' },
    kind: 'Social web app',
    blurb: 'A social-media-style site where you can review anything and everything.',
    play: 'https://revyou--wireit.web.app/',
    code: null,
    about: ['A social-media-style site where you can review anything and everything. [WHAT IT DOES, YOUR ROLE, YEAR]', 'Note: sign-up is paused for now. Firebase stopped free file storage in 2026, so profile-picture uploads fail until it’s fixed.'],
    shots: [],
    requirements: [['Built with', 'React'], ['Hosting', 'Firebase'], ['More', '[DATABASE, AUTH…]']],
    patchNotes: [],
    achievements: [],
    reviews: [],
  },
  {
    id: 'this-room',
    title: 'This room',
    status: 'progress',
    cover: { bg: '#7FE0B5', art: 'waving', ink: '#141414' },
    kind: 'Portfolio website',
    blurb: 'The site you’re in: a room you can click around, built with React and Motion.',
    play: null,
    code: null,
    about: ['A résumé you’d actually want to explore. Every object in the room opens a part of my story.'],
    shots: [],
    requirements: [['Built with', 'React, Vite and Motion'], ['Art', 'Hand-drawn SVG scene + my character']],
    patchNotes: [['v1', 'The room, the launcher and this page']],
    achievements: [],
    reviews: [],
  },
  { id: 'case-001', title: '[AI PROJECT 1]', status: 'academic', cover: { bg: '#141414', art: null, ink: '#FFD447' }, kind: 'RMIT · Case file 001', blurb: '[The problem, what you built, what came out of it]', play: null, code: null, about: ['[PROBLEM]', '[WHAT I DID: model, data, my role]', '[RESULT]'], shots: [], requirements: [['Model', '[MODEL]'], ['Data', '[DATASET]'], ['Tools', '[PYTHON, PYTORCH…]']], patchNotes: [], achievements: [], reviews: [] },
  { id: 'case-002', title: '[AI PROJECT 2]', status: 'academic', cover: { bg: '#FF7AC6', art: null, ink: '#141414' }, kind: 'VIT · Case file 002', blurb: '[The problem, what you built, what came out of it]', play: null, code: null, about: ['[PROBLEM]', '[WHAT I DID]', '[RESULT]'], shots: [], requirements: [['Model', '[MODEL]'], ['Data', '[DATASET]']], patchNotes: [], achievements: [], reviews: [] },
  { id: 'music-memoir', title: 'Music memoir', status: 'sketch', cover: { bg: '#FFD447', art: 'onrepeat', ink: '#141414' }, kind: 'Idea · not built yet', blurb: 'Re-rate songs over the years to see how your relationship with music changes.', play: null, code: null, about: ['Re-rate songs over the years to see how your relationship with music changes.'], shots: [], requirements: [], patchNotes: [], achievements: [], reviews: [] },
  { id: 'parallel-presence', title: 'Parallel presence', status: 'sketch', cover: { bg: '#B9A4FF', art: 'letter', ink: '#141414' }, kind: 'Idea · not built yet', blurb: 'Quiet company from real people while you do boring tasks.', play: null, code: null, about: ['Quiet company from real people while you do boring tasks. AI only as a fallback, never a stand-in for people.'], shots: [], requirements: [], patchNotes: [], achievements: [], reviews: [] },
]

export const statusLabels = {
  all: 'All',
  shipped: 'Shipped',
  progress: 'In progress',
  academic: 'Academic',
  sketch: 'Sketchbook',
}
