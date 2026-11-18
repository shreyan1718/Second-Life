import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import IdeaCard from '../explore/IdeaCard.jsx'
import { IDEAS } from '../../data/ideas.js'

const FEATURED_IDS = ['denim-tote', 'laptop-revival', 'bottle-planters']

export default function ExploreTeaser() {
  const featured = FEATURED_IDS.map((id) => IDEAS.find((idea) => idea.id === id)).filter(Boolean)

  return (
    <section className="section section--tint teaser">
      <div className="container">
        <SectionHeading
          eyebrow="Explore ideas"
          title="One item, many second lives"
          lead="A taste of what’s possible — everyday items rescued from landfill with a little know-how."
        />

        <div className="teaser__grid">
          {featured.map((idea) => (
            <Reveal key={idea.id} className="reveal--full">
              <IdeaCard idea={idea} />
            </Reveal>
          ))}
        </div>

        <div className="teaser__more">
          <Button to="/explore" size="lg">
            Browse all ideas <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
