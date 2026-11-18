import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Recycle,
  Leaf,
  Shirt,
  BadgeCheck,
  Lightbulb,
  ScanLine,
} from 'lucide-react'
import Button from '../ui/Button.jsx'
import Badge from '../ui/Badge.jsx'
import { PATHWAY_MAP } from '../../data/pathways.js'

// Mock data for the product preview card (Phase 2+ will replace this with
// a real scan result — the card is labelled "Preview" for exactly that reason).
const RECOMMENDATIONS = [
  { key: 'reuse', value: 92 },
  { key: 'repair', value: 64 },
  { key: 'donate', value: 58 },
  { key: 'recycle', value: 22 },
]

const META = [
  { icon: ShieldCheck, label: 'Safety-first guidance' },
  { icon: Recycle, label: 'Circular by design' },
  { icon: Leaf, label: 'Supports 4 UN SDGs' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            AI-powered sustainability assistant
          </span>

          <h1 className="hero__title">
            Don’t throw it away.
            <br />
            <span className="text-gradient">Give it a second life.</span>
          </h1>

          <p className="hero__lead">
            Second Life looks at the things you no longer need and shows you the smartest way
            forward — <strong>repair</strong> it, <strong>reuse</strong> it,{' '}
            <strong>donate</strong> it or <strong>recycle</strong> it. One photo is all it takes.
          </p>

          <div className="hero__ctas">
            <Button to="/scan" size="lg">
              <ScanLine size={18} aria-hidden="true" />
              Scan an item
            </Button>
            <Button to="/explore" variant="secondary" size="lg">
              Explore Ideas <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>

          <ul className="hero__meta">
            {META.map((m) => (
              <li key={m.label}>
                <m.icon size={14} aria-hidden="true" />
                {m.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <div
            className="mock"
            role="img"
            aria-label="Preview of a future AI scan result for an old pair of jeans, recommending reuse as the top pathway."
          >
            <div className="mock__head">
              <span className="mock__dot" />
              <span className="mock__title">Scan result</span>
              <Badge variant="outline">Preview</Badge>
            </div>

            <div className="mock__item">
              <span className="tile tile--lg">
                <Shirt size={24} aria-hidden="true" />
              </span>
              <div>
                <span className="mock__item-name">Old denim jeans</span>
                <span className="mock__item-sub">Identified · Denim clothing</span>
              </div>
              <span className="mock__conf">96%</span>
            </div>

            <div className="mock__chips">
              <Badge>Intact</Badge>
              <Badge>Lightly worn</Badge>
              <Badge>Clean</Badge>
            </div>

            <div className="mock__divider" />
            <p className="mock__label">Recommended pathways</p>

            <div className="mock__rows">
              {RECOMMENDATIONS.map((r) => {
                const p = PATHWAY_MAP[r.key]
                const Icon = p.icon
                return (
                  <div key={r.key}>
                    <div className="mock__row-head">
                      <Icon size={15} aria-hidden="true" />
                      {p.label}
                      <span className="mock__row-value">{r.value}%</span>
                    </div>
                    <div className="mock__bar">
                      <span className="mock__bar-fill" style={{ width: `${r.value}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mock__foot">
              <Leaf size={15} aria-hidden="true" />
              Est. 0.8 kg kept out of landfill
            </div>
          </div>

          <span className="float-chip float-chip--a" aria-hidden="true">
            <BadgeCheck size={15} />
            Repairable
          </span>
          <span className="float-chip float-chip--b" aria-hidden="true">
            <Lightbulb size={15} />
            12 upcycle ideas
          </span>
        </div>
      </div>
    </section>
  )
}
