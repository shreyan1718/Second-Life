import { ScanLine, ArrowRight, Wrench, Lightbulb, HeartHandshake, Recycle } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import AppLink from '../layout/AppLink.jsx'

const CRITERIA = [
  {
    icon: HeartHandshake,
    pathway: 'Donate',
    when: 'It still works and it’s clean',
    what: 'Pass it to someone who needs it — the purest form of reuse.',
  },
  {
    icon: Wrench,
    pathway: 'Repair',
    when: 'It’s broken but the fault is specific',
    what: 'A loose joint, a dead battery, a frayed cable — most faults are single parts.',
  },
  {
    icon: Lightbulb,
    pathway: 'Reuse',
    when: 'The material is good but the purpose is gone',
    what: 'Jars, fabric, wood, tins — upcycle into something useful again.',
  },
  {
    icon: Recycle,
    pathway: 'Recycle',
    when: 'It’s truly dead, damaged or dangerous',
    what: 'Recover the materials responsibly — and never bin batteries or electronics.',
  },
]

/**
 * Universal decision framework — shown when a search matches neither a guide
 * nor a known item. No search ever dead-ends: this always gives the user a
 * reasonable way to decide.
 */
export default function NoMatchPanel({ query, categoryGuess }) {
  return (
    <div className="no-match card">
      <div className="no-match__head">
        <h2>No exact match for “{query}”</h2>
        <p>
          It’s not in our guide library or item book yet — but here’s the universal way to decide
          what deserves to happen to it.
        </p>
      </div>

      <ul className="no-match__criteria">
        {CRITERIA.map((c) => (
          <li key={c.pathway}>
            <span className="no-match__icon">
              <c.icon size={17} aria-hidden="true" />
            </span>
            <div>
              <span className="no-match__pathway">{c.pathway}</span>
              <span className="no-match__when">{c.when}</span>
              <p>{c.what}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="no-match__actions">
        <Button to="/scan" size="lg">
          <ScanLine size={18} aria-hidden="true" />
          Scan it — let the AI decide
        </Button>
        {categoryGuess && (
          <AppLink
            to={`/explore?category=${encodeURIComponent(categoryGuess)}`}
            className="no-match__guess"
          >
            <Badge>
              Sounds like {categoryGuess} — browse its guides <ArrowRight size={12} aria-hidden="true" />
            </Badge>
          </AppLink>
        )}
      </div>
    </div>
  )
}
