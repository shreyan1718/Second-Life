import { Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { PATHWAYS } from '../../data/pathways.js'

export default function Pathways() {
  return (
    <section id="pathways" className="section section--tint pathways">
      <div className="container">
        <SectionHeading
          eyebrow="Four pathways"
          title="Every object deserves a second chance"
          lead="Depending on what an item is and the shape it’s in, Second Life points you to the smartest option — always with clear reasoning and safety notes."
        />

        <div className="pathways__grid">
          {PATHWAYS.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.key} delay={i * 90} className="reveal--full">
                <article className="pathway-card card card--hover">
                  <span className="tile tile--lg">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3>{p.label}</h3>
                  <p className="pathway-card__tagline">{p.tagline}</p>
                  <p className="pathway-card__desc">{p.description}</p>
                  <p className="pathway-card__best">
                    <Check size={15} aria-hidden="true" />
                    <span>
                      <strong>Best for:</strong> {p.bestFor}
                    </span>
                  </p>
                  <ul className="pathway-card__examples">
                    {p.examples.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
