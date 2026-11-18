import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { SDGS } from '../../data/sdgs.js'
import { cn } from '../../utils/cn'

/**
 * UN Sustainable Development Goals band.
 * compact (home): short summaries on white.
 * detailed (about): longer contributions on tint.
 */
export default function SDGSection({ detailed = false }) {
  return (
    <section
      id="sdgs"
      className={cn('section sdg', detailed ? 'sdg--detailed section--tint' : 'section--white')}
    >
      <div className="container">
        <SectionHeading
          eyebrow="UN Global Goals"
          title="Built for the Sustainable Development Goals"
          lead="Every recommendation Second Life makes pushes toward these four global targets."
        />

        <div className="sdg__grid">
          {SDGS.map((s, i) => (
            <Reveal key={s.number} delay={i * 80} className="reveal--full">
              <article className="sdg-card card card--hover">
                <span className="sdg-card__number" style={{ background: s.color }}>
                  {s.number}
                </span>
                <div className="sdg-card__body">
                  <h3>{s.title}</h3>
                  <p>{detailed ? s.detail : s.summary}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
