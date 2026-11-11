import { useEffect, useState } from 'react'

// Tiny hash router with plain names: #room  #library  #project-prequel  #resume
export function useHashRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '')
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const on = () => setRoute(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export function go(name) {
  window.location.hash = name
}

// The room lives in Melbourne, so its sky follows Melbourne time.
export function melbourneHour() {
  const s = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', hour: 'numeric', minute: 'numeric', hour12: false }).format(new Date())
  const [h, m] = s.split(':').map(Number)
  return (h % 24) + m / 60
}

export function skyPhase(h) {
  if (h >= 5.5 && h < 8) return 'dawn'
  if (h >= 8 && h < 17) return 'day'
  if (h >= 17 && h < 19.5) return 'golden'
  return 'night'
}

export function useSkyPhase() {
  const [phase, setPhase] = useState(() => skyPhase(melbourneHour()))
  useEffect(() => {
    const t = setInterval(() => setPhase(skyPhase(melbourneHour())), 60000)
    return () => clearInterval(t)
  }, [])
  return phase
}

export function useIsNarrow(px = 760) {
  const q = `(max-width: ${px}px)`
  const [narrow, setNarrow] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setNarrow(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [q])
  return narrow
}

export const art = (name) => `${import.meta.env.BASE_URL}art/${name}.webp`
export const shot = (name) => `${import.meta.env.BASE_URL}shots/${name}.jpg`
