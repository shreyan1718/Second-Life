import { Link } from 'react-router-dom'
import { Clock, Leaf, Package, ListOrdered, ArrowRight } from 'lucide-react'
import PathwayChip from '../ui/PathwayChip.jsx'
import { CATEGORY_META } from '../../data/ideas.js'
import { cn } from '../../utils/cn'

/** Card for a single second-life idea — links to its full step-by-step guide. */
export default function IdeaCard({ idea }) {
  const Icon = (CATEGORY_META[idea.category] || {}).icon || Package
  const difficulty = idea.difficulty.toLowerCase()

  return (
    <Link
      to={`/explore/${idea.id}`}
      className="idea-card card card--hover"
      aria-label={`View the full guide: ${idea.title}`}
    >
      <div className="idea-card__top">
        <span className="tile" title={idea.category}>
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className={cn('difficulty', `difficulty--${difficulty}`)}>
          <span className="difficulty__dot" />
          {idea.difficulty}
        </span>
      </div>

      <h3 className="idea-card__title">{idea.title}</h3>
      <span className="idea-card__cat">{idea.category}</span>
      <p className="idea-card__blurb">{idea.blurb}</p>

      <ul className="idea-card__meta">
        <li>
          <ListOrdered size={14} aria-hidden="true" />
          {idea.steps.length} steps
        </li>
        <li>
          <Clock size={14} aria-hidden="true" />
          {idea.time}
        </li>
        <li>
          <Leaf size={14} aria-hidden="true" />
          {idea.impact}
        </li>
      </ul>

      <div className="idea-card__pathways">
        {idea.pathways.map((p) => (
          <PathwayChip key={p} pathway={p} />
        ))}
      </div>

      <span className="idea-card__cta">
        View guide <ArrowRight size={14} aria-hidden="true" />
      </span>
    </Link>
  )
}
