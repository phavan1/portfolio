import { useEffect } from 'react'
import Hud from '../components/Hud'
import T from '../components/Text'
import { education, experience, me, projects, skills } from '../data/content'

// "Skip the tour": everything on one plain page for busy recruiters.
// Prints cleanly to PDF (the ?print=1 link opens the print dialog).
export default function Resume({ autoPrint }) {
  useEffect(() => {
    if (autoPrint) setTimeout(() => window.print(), 400)
  }, [autoPrint])

  const h2 = { margin: '0 0 10px', fontSize: 14, fontFamily: 'var(--mono)', letterSpacing: '.12em', textTransform: 'uppercase', borderBottom: '2px solid var(--ink)', paddingBottom: 6 }
  const shown = projects.filter((p) => p.status !== 'sketch')

  return (
    <div style={{ minHeight: '100vh', background: '#EDEAE3', padding: '84px 16px 48px' }}>
      <style>{`@media print { nav { display: none !important } body, html { background: #fff } .sheet { box-shadow: none !important; border: none !important; margin: 0 !important; padding: 0 !important } .ph { border-width: 1px } }`}</style>
      <Hud where="resume" />
      <article className="sheet" style={{ maxWidth: 820, margin: '0 auto', background: '#fff', border: '3px solid var(--ink)', borderRadius: 6, boxShadow: '8px 8px 0 var(--ink)', padding: 'clamp(24px, 5vw, 56px)', display: 'flex', flexDirection: 'column', gap: 28, fontSize: 16, lineHeight: 1.5 }}>
        <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(36px, 6vw, 52px)', lineHeight: 1, fontWeight: 800 }}>{me.name}</h1>
            <div style={{ fontSize: 19, marginTop: 6 }}>Master of AI student · {me.location}</div>
          </div>
          <div className="mono" style={{ fontSize: 13, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span><T>{me.email}</T></span>
            <a href={me.github}>github.com/{me.githubHandle}</a>
            <span>LinkedIn: <span className="ph">[coming soon]</span></span>
          </div>
        </header>

        <section>
          <h2 style={h2}>Summary</h2>
          <p style={{ margin: 0 }}>AI master’s student at RMIT with a designer’s eye. I build complete, polished products end to end, from idea and visual design to a shipped app real people use, and I’m now focused on machine learning and AI engineering. {me.lookingFor}. <T>{me.workRights}</T></p>
        </section>

        <section>
          <h2 style={h2}>Education</h2>
          {education.map((e) => (
            <div key={e.spine} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
              <div><strong><T>{e.title}</T></strong><div>{e.place}</div></div>
              <span className="mono" style={{ fontSize: 13 }}><T>{e.years}</T></span>
            </div>
          ))}
        </section>

        <section>
          <h2 style={h2}>Projects</h2>
          {shown.map((p) => (
            <div key={p.id} style={{ marginBottom: 12 }}>
              <strong><T>{p.title}</T></strong> · <span>{p.kind}</span>
              <div><T>{p.blurb}</T></div>
              {p.requirements[0] && <div className="mono" style={{ fontSize: 12 }}>{p.requirements[0][0]}: <T>{p.requirements[0][1]}</T></div>}
            </div>
          ))}
        </section>

        <section>
          <h2 style={h2}>Experience</h2>
          {experience.map((x, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong><T>{x.role}</T>, <T>{x.company}</T></strong> <span className="mono" style={{ fontSize: 13 }}>· {x.kind} · <T>{x.dates}</T></span>
              <div><T>{x.did}</T></div>
            </div>
          ))}
        </section>

        <section>
          <h2 style={h2}>Skills</h2>
          <p style={{ margin: 0 }}>{skills.map((s, i) => <span key={s}>{i ? ' · ' : ''}<T>{s}</T></span>)}</p>
        </section>

        <footer className="mono" style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>The fun version: phavankumaar.com</span>
          <button className="btn" onClick={() => window.print()} style={{ minHeight: 40, fontSize: 14 }}>Save as PDF</button>
        </footer>
      </article>
    </div>
  )
}
