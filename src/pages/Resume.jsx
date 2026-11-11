import { useEffect } from 'react'
import Page, { Card, H } from './Page'
import T from '../components/Text'
import { education, experience, me, projects, skills } from '../data/content'

const K = '#141414'

// The résumé ("Skip the tour"): everything on one page, in the same style,
// and it prints as a clean black-and-white document.
export default function Resume({ autoPrint }) {
  useEffect(() => { if (autoPrint) setTimeout(() => window.print(), 700) }, [autoPrint])
  const shown = projects.filter((p) => p.status !== 'sketch')
  const row = { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4px 16px', padding: '12px 0', borderBottom: `2px dashed rgba(20,20,20,.25)` }
  return (
    <Page id="resume" crumbs={[['Résumé', '#resume']]} tip="Prefer paper? Grab the PDF on the right">
      <style>{`@media print {
        nav, .tip { display: none !important; }
        body, html, main, main > *, section { background: #fff !important; box-shadow: none !important; }
        div[style*="repeating-linear-gradient"] { background: #fff !important; }
        section { border: none !important; }
        section > header { background: #fff !important; border-bottom: 2px solid #141414 !important; }
        .no-print { display: none !important; }
      }`}</style>

      <Card title="RESUME.EXE">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <H size="clamp(44px, 7vw, 92px)">{me.name}</H>
          <span className="tag" style={{ alignSelf: 'flex-start', background: 'var(--cobalt)', color: '#fff', fontSize: 14 }}>AI ENGINEER · MASTER OF AI STUDENT</span>
          <p style={{ margin: 0, fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.55, maxWidth: 820 }}>
            AI master’s student at RMIT with a designer’s eye. I build complete, polished products end to end, from the idea and the visual design to a shipped app real people use, and I’m now focused on machine learning and AI engineering.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="tag" style={{ background: 'var(--sun)' }}>{me.location}</span>
            <span className="tag" style={{ background: 'var(--mint)' }}>{me.lookingFor}</span>
            <span className="tag"><T>{me.workRights}</T></span>
          </div>
          <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            {me.resumePdf
              ? <a className="btn" href={me.resumePdf} download style={{ background: 'var(--sun)' }}>↓ Download CV</a>
              : <button className="btn" onClick={() => window.print()} style={{ background: 'var(--sun)' }}>↓ Save as PDF</button>}
            <a className="btn" href="#contact">Email me</a>
            <a className="btn" href={me.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 32px)', alignItems: 'start' }}>
        <Card title="EDUCATION.DOC" delay={0.08}>
          {education.map((e) => (
            <div key={e.spine} style={row}>
              <div><strong style={{ fontSize: 18 }}><T>{e.title}</T></strong><div>{e.place}</div></div>
              <span className="mono" style={{ fontSize: 14, fontWeight: 700 }}><T>{e.years}</T></span>
            </div>
          ))}
        </Card>
        <Card title="EXPERIENCE.LOG" delay={0.14}>
          {experience.map((x, i) => (
            <div key={i} style={row}>
              <div><strong style={{ fontSize: 18 }}><T>{x.role}</T>, <T>{x.company}</T></strong><div><T>{x.did}</T></div></div>
              <span className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{x.kind} · <T>{x.dates}</T></span>
            </div>
          ))}
        </Card>
      </div>

      <Card title="PROJECTS.EXE" delay={0.2}>
        {shown.map((p) => (
          <div key={p.id} style={row}>
            <div style={{ maxWidth: 760 }}>
              <strong style={{ fontSize: 18 }}><T>{p.title}</T></strong> · {p.kind}
              <div><T>{p.blurb}</T></div>
            </div>
            <a className="mono no-print" href={`#project-${p.id}`} style={{ fontSize: 14, fontWeight: 700 }}>Read more →</a>
          </div>
        ))}
      </Card>

      <Card title="SKILLS.CFG" delay={0.26}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map((s) => <span key={s} className="tag" style={{ fontSize: 13, padding: '5px 12px', background: '#fff' }}><T>{s}</T></span>)}
        </div>
      </Card>
    </Page>
  )
}
