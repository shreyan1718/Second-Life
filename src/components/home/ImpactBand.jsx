import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { IMPACT_STATS } from '../../data/stats.js'

export default function ImpactBand() {
  return (
    <section className="impact">
      <div className="container">
        <div className="impact__grid">
          <div className="impact__intro">
            <span className="eyebrow eyebrow--dark">Why it matters</span>
            <h2>Most of what we throw away isn’t waste at all.</h2>
            <p>
              A huge share of household discards could be repaired, reused or recycled — if only we
              knew how. Second Life exists to close that knowledge gap, one object at a time.
            </p>
            <Button to="/about" variant="light">
              Our mission <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </div>

          <div className="impact__stats">
            {IMPACT_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="reveal--full">
                <article className="impact-stat">
                  <span className="impact-stat__value">
                    {s.value}
                    {s.unit && <small>{s.unit}</small>}
                  </span>
                  <span className="impact-stat__label">{s.label}</span>
                  <span className="impact-stat__source">{s.source}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
