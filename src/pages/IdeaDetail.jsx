import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  ChevronRight,
  Clock,
  Leaf,
  ListOrdered,
  ListChecks,
  ShieldAlert,
  ScanLine,
  MapPin,
  Printer,
  SearchX,
} from 'lucide-react'
import AppLink from '../components/layout/AppLink.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import IdeaCard from '../components/explore/IdeaCard.jsx'
import PathwayChip from '../components/ui/PathwayChip.jsx'
import { IDEAS } from '../data/ideas.js'
import { cn } from '../utils/cn'
import usePageTitle from '../hooks/usePageTitle.js'

export default function IdeaDetail() {
  const { id } = useParams()
  const idea = useMemo(() => IDEAS.find((i) => i.id === id), [id])
  usePageTitle(idea ? `${idea.title} · Second Life` : 'Idea not found · Second Life')

  if (!idea) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state card">
            <span className="tile tile--lg">
              <SearchX size={24} aria-hidden="true" />
            </span>
            <h1>That guide doesn’t exist</h1>
            <p>The idea you’re looking for may have been renamed or removed.</p>
            <Button to="/explore">Back to Explore Ideas</Button>
          </div>
        </div>
      </section>
    )
  }

  const related = useMemo(
    () =>
      [
        ...IDEAS.filter((i) => i.id !== idea.id && i.category === idea.category),
        ...IDEAS.filter((i) => i.id !== idea.id && i.category !== idea.category),
      ].slice(0, 3),
    [idea],
  )

  const difficulty = idea.difficulty.toLowerCase()

  return (
    <div className="page-idea-detail">
      <article className="idea-detail">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <AppLink to="/explore">Explore Ideas</AppLink>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{idea.category}</span>
          </nav>

          <header className="idea-detail__header">
            <span className="eyebrow">{idea.category}</span>
            <h1 className="idea-detail__title">{idea.title}</h1>
            <p className="idea-detail__lead">{idea.blurb}</p>

            <div className="idea-detail__meta">
              <span className={cn('difficulty', `difficulty--${difficulty}`)}>
                <span className="difficulty__dot" />
                {idea.difficulty}
              </span>
              <Badge variant="outline">
                <Clock size={13} aria-hidden="true" />
                {idea.time}
              </Badge>
              <Badge variant="outline">
                <Leaf size={13} aria-hidden="true" />
                {idea.impact}
              </Badge>
              <Badge variant="outline">
                <ListOrdered size={13} aria-hidden="true" />
                {idea.steps.length} steps
              </Badge>
            </div>

            <div className="idea-detail__pathways">
              {idea.pathways.map((p) => (
                <PathwayChip key={p} pathway={p} />
              ))}
            </div>
          </header>

          <div className="idea-detail__grid">
            <div className="idea-detail__main">
              <h2 className="idea-detail__heading">Step by step</h2>
              <ol className="steps-timeline">
                {idea.steps.map((s, i) => (
                  <li key={i} className="step-row">
                    <span className="step-row__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="step-row__body">
                      <h3>{s.title}</h3>
                      <p>{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="idea-detail__aside">
              <section className="detail-panel card">
                <h3>
                  <ListChecks size={19} aria-hidden="true" />
                  What you need
                </h3>
                <ul className="materials-list">
                  {idea.materials.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </section>

              <section className="detail-panel detail-panel--safety">
                <h3>
                  <ShieldAlert size={19} aria-hidden="true" />
                  Safety precautions
                </h3>
                <ul>
                  {idea.safety.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>

              <section className="detail-panel detail-panel--cta card">
                <h3>
                  <ScanLine size={19} aria-hidden="true" />
                  Have one of these to spare?
                </h3>
                <p>
                  Scan it and see whether repairing, reusing, donating or recycling makes the most
                  sense.
                </p>
                <div className="detail-panel__actions">
                  <Button to="/scan">
                    Scan your item <ScanLine size={15} aria-hidden="true" />
                  </Button>
                  <Button variant="secondary" onClick={() => window.print()}>
                    <Printer size={15} aria-hidden="true" />
                    Print this guide
                  </Button>
                </div>
              </section>

              {(idea.pathways.includes('donate') || idea.pathways.includes('recycle')) && (
                <section className="detail-panel detail-panel--cta card">
                  <h3>
                    <MapPin size={19} aria-hidden="true" />
                    Need somewhere to take it?
                  </h3>
                  <p>
                    Find charity shops, recycling points and authorised collectors near you — plus
                    guidance on preparing this kind of item.
                  </p>
                  <div className="detail-panel__actions">
                    <Button variant="secondary" to="/dispose">
                      Donate &amp; recycle guidance <ArrowRight size={15} aria-hidden="true" />
                    </Button>
                  </div>
                </section>
              )}
            </aside>
          </div>

          <section className="related">
            <h2 className="idea-detail__heading">More ideas like this</h2>
            <div className="explore__grid">
              {related.map((r) => (
                <Reveal key={r.id} className="reveal--full">
                  <IdeaCard idea={r} />
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  )
}
