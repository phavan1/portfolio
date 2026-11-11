import { useState } from 'react'
import Arrival from './scenes/Arrival'
import Desk from './os/Desk'
import Resume from './pages/Resume'
import { appById } from './os/apps'
import { go, useHashRoute } from './hooks'

function seen() {
  try { return sessionStorage.getItem('pk-arrived') === '1' } catch { return false }
}

// Routes (plain hashes): #desk, an app id (#projects, #story…),
// #project-prequel, #resume. Old #room / #library links still work.
export default function App() {
  const route = useHashRoute()
  const [arrived, setArrived] = useState(seen)
  const [deskKey] = useState(() => Date.now())

  const arrive = () => {
    try { sessionStorage.setItem('pk-arrived', '1') } catch { /* private mode */ }
    setArrived(true)
    window.scrollTo(0, 0)
    go('desk')
  }

  if (route.startsWith('resume')) return <Resume autoPrint={route === 'resume-print'} />
  if (!route) return arrived ? <Desk key={deskKey} /> : <Arrival onArrive={arrive} />
  if (route.startsWith('project-')) return <Desk key={deskKey} initialApp="projects" initialProject={route.slice('project-'.length)} />
  if (route === 'library') return <Desk key={deskKey} initialApp="projects" />
  if (appById(route)) return <Desk key={deskKey} initialApp={route} />
  return <Desk key={deskKey} />
}
