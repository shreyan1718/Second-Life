import { AlertTriangle, Lightbulb, ArrowRight, Info, LayoutDashboard } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { PATHWAY_MAP } from '../../data/pathways.js'

/** Phase 4 output: primary pathway, reasoning, alternatives, safety, next steps. */
export default function Recommendation({ category, result }) {
  const primary = PATHWAY_MAP[result.primary]
  const PrimaryIcon = primary.icon

  return (
    <div className="rec">
      {result.safety.length > 0 && (
        <div className="rec-safety" role="alert">
          <AlertTriangle size={20} aria-hidden="true" />
          <div>
            <h3>Safety first</h3>
            <ul>
              {result.safety.map((s) => (
                <li key={s.id}>{s.message}</li>
              ))}
            </ul>
            {result.enforcedRule && (
              <p className="rec-safety__note">
                For safety reasons, this overrides the usual ranking.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="rec-hero">
        <span className="rec-hero__icon">
          <PrimaryIcon size={28} aria-hidden="true" />
        </span>
        <div className="rec-hero__main">
          <span className="rec-hero__label">Recommended pathway</span>
          <h2>{primary.label}</h2>
          <p>{primary.tagline}</p>
        </div>
        <div className="rec-hero__side">
          <span className="rec-hero__condition">{result.conditionLabel} condition</span>
          <span className="rec-hero__score">{result.conditionScore}/100</span>
        </div>
      </div>

      <section className="rec-reasons" aria-label="Reasoning">
        <h3>
          <Lightbulb size={18} aria-hidden="true" />
          Why this recommendation
        </h3>
        <ul>
          {result.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="rec-alts-wrap" aria-label="Alternative options">
        <h3>Other options, ranked</h3>
        <div className="rec-alts">
          {result.alternatives.map((a) => {
            const AltIcon = PATHWAY_MAP[a.key].icon
            return (
              <div key={a.key} className="rec-alt">
                <div className="rec-alt__head">
                  <AltIcon size={16} aria-hidden="true" />
                  {a.label}
                  <span className="rec-alt__pct">{a.pct}%</span>
                </div>
                <div className="rec-bar">
                  <span className="rec-bar__fill" style={{ width: `${a.pct}%` }} />
                </div>
                <span className="rec-alt__tag">{PATHWAY_MAP[a.key].tagline}</span>
              </div>
            )
          })}
        </div>
      </section>

      <div className="rec-actions">
        <Button
          to={`/explore?category=${encodeURIComponent(category)}&pathway=${result.primary}`}
        >
          Browse {primary.label.toLowerCase()} ideas <ArrowRight size={16} aria-hidden="true" />
        </Button>
        {(result.primary === 'donate' || result.primary === 'recycle') && (
          <Button variant="secondary" to="/dispose">
            {result.primary === 'donate' ? 'Where to donate it' : 'How to recycle it'}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        )}
        <Button variant="ghost" to="/dashboard">
          <LayoutDashboard size={16} aria-hidden="true" />
          View my impact
        </Button>
      </div>

      <p className="rec-next">
        <Info size={14} aria-hidden="true" />
        This scan is saved to your impact dashboard — confirm there once you’ve acted on it.
      </p>
    </div>
  )
}
