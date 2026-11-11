import { useState } from 'react'
import Cover from './scenes/Cover'
import Desk from './os/Desk'
import Resume from './pages/Resume'
import { appById } from './os/apps'
import { useHashRoute } from './hooks'

// Routes (plain hashes): none = the desk (with the comic cover on first
// arrival), an app id (#projects, #story…), #project-prequel, #resume.
export default function App() {
  const route = useHashRoute()
  const [coverDone, setCoverDone] = useState(() => route !== '' && route !== 'desk')

  if (route.startsWith('resume')) return <Resume autoPrint={route === 'resume-print'} />

  let desk
  if (route.startsWith('project-')) desk = <Desk key="desk" initialApp="projects" initialProject={route.slice('project-'.length)} />
  else if (route === 'library') desk = <Desk key="desk" initialApp="projects" />
  else if (appById(route)) desk = <Desk key="desk" initialApp={route} />
  else desk = <Desk key="desk" />

  return (
    <>
      {desk}
      {!coverDone && <Cover onOpen={() => setCoverDone(true)} />}
    </>
  )
}
