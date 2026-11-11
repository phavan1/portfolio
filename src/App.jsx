import { useEffect, useRef, useState } from 'react'
import Cover from './scenes/Cover'
import Desk from './os/Desk'
import Resume from './pages/Resume'
import { AboutPage, ContactPage, IdeasPage, NowPage, OffClockPage, ProjectPage, ProjectsPage, SchoolPage, StoryPage, WorkPage } from './pages/sections'
import { useHashRoute } from './hooks'

const PAGES = {
  projects: ProjectsPage, school: SchoolPage, work: WorkPage, story: StoryPage, now: NowPage,
  ideas: IdeasPage, offclock: OffClockPage, contact: ContactPage, about: AboutPage,
}

// Routes (plain hashes): none = the desk (the comic cover shows on arrival),
// a page (#projects, #story…), #project-prequel, #resume.
export default function App() {
  const route = useHashRoute()
  const [coverDone, setCoverDone] = useState(() => route !== '' && route !== 'desk')
  const last = useRef(route) // the route shown before this one
  const cameFromPage = last.current !== route && last.current !== '' && last.current !== 'desk'
  useEffect(() => { last.current = route }, [route])

  let page = null
  if (route.startsWith('resume')) page = <Resume autoPrint={route === 'resume-print'} />
  else if (route.startsWith('project-')) page = <ProjectPage key={route} id={route.slice('project-'.length)} />
  else if (route === 'library') page = <ProjectsPage />
  else if (PAGES[route]) { const P = PAGES[route]; page = <P /> }
  if (page) return page

  return (
    <>
      <Desk returning={cameFromPage} />
      {!coverDone && <Cover onOpen={() => setCoverDone(true)} />}
    </>
  )
}
