// The apps on the desktop: icon, colour and the page each one opens.
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

export const APPS = [
  { id: 'projects', label: 'Projects', title: 'PROJECTS.EXE', tile: 'var(--sun)' },
  { id: 'school', label: 'School', title: 'EDUCATION.DOC', tile: 'var(--mint)' },
  { id: 'work', label: 'Work', title: 'WORK.CORK', tile: '#D9A066' },
  { id: 'story', label: 'My story', title: 'MY_STORY.MP3', tile: 'var(--pink)' },
  { id: 'now', label: 'Now', title: 'NOW.TXT', tile: '#FFF07A' },
  { id: 'ideas', label: 'Ideas', title: 'SKETCHBOOK', tile: '#fff' },
  { id: 'offclock', label: 'Off clock', title: 'OFF_THE_CLOCK.JPG', tile: 'var(--tomato)' },
  { id: 'resume', label: 'Résumé', title: 'RESUME.EXE', tile: 'var(--cream)' },
  { id: 'contact', label: 'Say hi', title: 'MESSAGES', tile: 'var(--lilac)' },
  { id: 'about', label: 'About me', title: 'ABOUT_ME.TXT', tile: 'var(--cobalt)', hidden: true },
]

export const appById = (id) => APPS.find((a) => a.id === id)
export { glyphs }
