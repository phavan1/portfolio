import { useEffect, useState } from 'react'
import Arrival from './scenes/Arrival'
import Room from './scenes/Room'
import Library from './pages/Library'
import Project from './pages/Project'
import Resume from './pages/Resume'
import { go, useHashRoute } from './hooks'

function seen() {
  try { return sessionStorage.getItem('pk-arrived') === '1' } catch { return false }
}

export default function App() {
  const route = useHashRoute()
  const [arrived, setArrived] = useState(seen)

  useEffect(() => { if (route) window.scrollTo(0, 0) }, [route])

  const arrive = () => {
    try { sessionStorage.setItem('pk-arrived', '1') } catch { /* private mode */ }
    setArrived(true)
    window.scrollTo(0, 0)
    go('room')
  }

  if (!route) return arrived ? <Room /> : <Arrival onArrive={arrive} />
  if (route === 'room' || route === 'room-back') return <Room key={route} fromMonitor={route === 'room-back'} />
  if (route.startsWith('library')) return <Library initialFilter={route.split('-')[1]} />
  if (route.startsWith('project-')) return <Project key={route} id={route.slice('project-'.length)} />
  if (route.startsWith('resume')) return <Resume autoPrint={route === 'resume-print'} />
  return <Room />
}
