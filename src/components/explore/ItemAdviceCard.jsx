import { Lightbulb, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import AppLink from '../layout/AppLink.jsx'
import { PATHWAY_MAP } from '../../data/pathways.js'
import { CATEGORY_META, IDEAS } from '../../data/ideas.js'
import { cn } from '../../utils/cn'

/** Advice card for a searched item — best pathway, options, tips, related guides. */
export default function ItemAdviceCard({ item }) {
  const CatIcon = (CATEGORY_META[item.category] || {}).icon
  const best = PATHWAY_MAP[item.best.pathway]
  const BestIcon = best.icon

  return (
    <article className="item-card card card--hover">
      <header className="item-card__head">
        <span className="tile tile--lg">
          <CatIcon size={22} aria-hidden="true" />
        </span>
        <div>
          <span className="item-card__name">{item.name}</span>
          <span className="item-card__cat">{item.category}</span>
        </div>
        <span className="item-card__best">
          <span className="item-card__best-label">
            <Sparkles size={13} aria-hidden="true" />
            Best bet
          </span>
          <span className="item-card__best-pathway">
            <BestIcon size={15} aria-hidden="true" />
            {best.label}
          </span>
        </span>
      </header>

      <p className="item-card__why">{item.best.why}</p>

      <div className="item-card__options">
        {item.options.map((o) => {
          const P = PATHWAY_MAP[o.pathway]
          const Icon = P.icon
          return (
            <div key={o.pathway} className={cn('item-option', o.pathway === item.best.pathway && 'item-option--best')}>
              <span className="item-option__head">
                <Icon size={15} aria-hidden="true" />
                {P.label}
              </span>
              <p>{o.text}</p>
            </div>
          )
        })}
      </div>

      <div className="item-card__foot">
        <div className="item-card__tips">
          <h4>
            <Lightbulb size={14} aria-hidden="true" />
            Tips
          </h4>
          <ul>
            {item.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        {item.safety && (
          <p className="item-card__safety">
            <ShieldAlert size={14} aria-hidden="true" />
            {item.safety}
          </p>
        )}
        {item.related?.length > 0 && (
          <div className="item-card__guides">
            <h4>Step-by-step guides</h4>
            <div className="item-card__guide-links">
              {item.related
                .map((id) => IDEAS.find((g) => g.id === id))
                .filter(Boolean)
                .map((g) => (
                  <AppLink key={g.id} to={`/explore/${g.id}`} className="item-card__guide-link">
                    {g.title} <ArrowRight size={12} aria-hidden="true" />
                  </AppLink>
                ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
