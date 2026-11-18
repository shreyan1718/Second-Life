import { useState } from 'react'
import {
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Scale,
  CalendarDays,
  Trash2,
  ScanLine,
  Info,
  Hammer,
  Lightbulb,
  HeartHandshake,
  Recycle,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import DonutChart from '../components/dashboard/DonutChart.jsx'
import CategoryBars from '../components/dashboard/CategoryBars.jsx'
import ScanHistory from '../components/dashboard/ScanHistory.jsx'
import { getScans, setCompleted, deleteScan, clearScans } from '../services/scanStore.js'
import { totalDivertedKg, PATHWAY_COLORS } from '../data/impact.js'
import { PATHWAYS } from '../data/pathways.js'
import { CATEGORIES } from '../data/ideas.js'
import { cn } from '../utils/cn'
import usePageTitle from '../hooks/usePageTitle.js'

const PATHWAY_VERBS = {
  repair: { icon: Hammer, text: 'repaired' },
  reuse: { icon: Lightbulb, text: 'reused' },
  donate: { icon: HeartHandshake, text: 'donated' },
  recycle: { icon: Recycle, text: 'recycled' },
}

export default function Dashboard() {
  usePageTitle('My Impact · Second Life')
  // Re-reading the store after every mutation keeps this simple and
  // predictable (no subscription machinery for a local store).
  const [version, setVersion] = useState(0)
  const [confirmClear, setConfirmClear] = useState(false)
  const refresh = () => setVersion((v) => v + 1)

  const scans = getScans()
  const completed = scans.filter((s) => s.completed)
  const now = new Date()
  const thisMonth = scans.filter((s) => {
    const d = new Date(s.createdAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const byPathway = Object.fromEntries(
    PATHWAYS.map((p) => [p.key, completed.filter((s) => s.completed.pathway === p.key).length]),
  )
  const divertedKg = totalDivertedKg(scans)
  const topPathway = PATHWAYS.slice().sort((a, b) => byPathway[b.key] - byPathway[a.key])[0]
  const maxCompleted = Math.max(0, ...PATHWAYS.map((p) => byPathway[p.key]))

  // Referenced so lint doesn't complain about the refresh mechanism.
  void version

  const donutData = PATHWAYS.map((p) => ({
    key: p.key,
    label: p.label,
    count: scans.filter((s) => s.primary === p.key).length,
    color: PATHWAY_COLORS[p.key],
  }))

  const barData = CATEGORIES.map((c) => ({
    label: c,
    count: scans.filter((s) => s.category === c).length,
  }))

  function handleSetCompleted(id, pathway) {
    setCompleted(id, pathway)
    refresh()
  }

  function handleDelete(id) {
    deleteScan(id)
    refresh()
  }

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 4000)
      return
    }
    clearScans()
    setConfirmClear(false)
    refresh()
  }

  const empty = scans.length === 0

  const statCards = [
    {
      icon: ScanLine,
      label: 'Items analysed',
      value: String(scans.length),
      sub: thisMonth.length === scans.length ? 'all time' : `${thisMonth.length} this month`,
    },
    {
      icon: CheckCircle2,
      label: 'Actions completed',
      value: String(completed.length),
      sub:
        scans.length === 0
          ? 'confirm what you did'
          : `${Math.round((completed.length / scans.length) * 100)}% of analyses`,
    },
    {
      icon: Scale,
      label: 'Waste diverted',
      value: `≈ ${divertedKg} kg`,
      sub: 'estimated, confirmed items only',
    },
    {
      icon: TrendingUp,
      label: 'Top pathway',
      value: topPathway.label,
      sub: `${maxCompleted} completed`,
    },
  ]

  return (
    <div className="page-dashboard">
      <header className="dash-hero">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="My impact"
            title="Your second-life scoreboard"
            lead="Every item you scan, every action you confirm — tracked here so your progress feels as real as it is."
          />
          <div className="dash-hero__note">
            <Badge variant="outline">
              <ShieldCheck size={13} aria-hidden="true" />
              Stored only in this browser — nothing is uploaded anywhere
            </Badge>
          </div>
        </div>
      </header>

      {empty ? (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="dash-empty card">
                <span className="tile tile--lg">
                  <LayoutDashboard size={26} aria-hidden="true" />
                </span>
                <h2>No scans yet</h2>
                <p>
                  Scan your first item and this dashboard will fill up with your stats, charts and
                  completed actions.
                </p>
                <div className="dash-empty__actions">
                  <Button to="/scan" size="lg">
                    <ScanLine size={18} aria-hidden="true" />
                    Scan your first item
                  </Button>
                  <Button to="/explore" variant="secondary" size="lg">
                    Browse ideas
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        <div className="container dash-body">
          {/* Stat cards */}
          <div className="dash-stats">
            {statCards.map((c, i) => (
              <Reveal key={c.label} delay={i * 70} className="reveal--full">
                <article className="stat-card card card--hover">
                  <span className="tile">
                    <c.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="stat-card__label">{c.label}</span>
                    <span className="stat-card__value">{c.value}</span>
                    <span className="stat-card__sub">{c.sub}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Charts */}
          <div className="dash-charts">
            <Reveal className="reveal--full">
              <DonutChart data={donutData} title="Recommended pathways" />
            </Reveal>
            <Reveal delay={100} className="reveal--full">
              <CategoryBars data={barData} title="Items by category" />
            </Reveal>
          </div>

          {/* Completed by pathway */}
          <Reveal>
            <section className="dash-pathways" aria-label="Completed actions by pathway">
              <h2 className="dash-heading">
                <CheckCircle2 size={20} aria-hidden="true" />
                Actions you confirmed
              </h2>
              <div className="dash-pathway-grid">
                {PATHWAYS.map((p) => {
                  const meta = PATHWAY_VERBS[p.key]
                  const Icon = meta.icon
                  const count = byPathway[p.key]
                  return (
                    <article
                      key={p.key}
                      className={cn('pathway-stat', count === 0 && 'pathway-stat--empty')}
                      style={{ '--pathway-color': PATHWAY_COLORS[p.key] }}
                    >
                      <span className="pathway-stat__icon">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="pathway-stat__count">{count}</span>
                      <span className="pathway-stat__label">items {meta.text}</span>
                    </article>
                  )
                })}
              </div>
              <p className="dash-note">
                <Info size={14} aria-hidden="true" />
                Waste diverted is estimated from typical item weights per category — an honest
                approximation, not a measurement.
              </p>
            </section>
          </Reveal>

          {/* History */}
          <Reveal>
            <section className="dash-history" aria-label="Scan history">
              <div className="dash-history__head">
                <h2 className="dash-heading">
                  <CalendarDays size={20} aria-hidden="true" />
                  Activity history
                </h2>
                <Button
                  variant={confirmClear ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={handleClear}
                  className={confirmClear ? '' : 'dash-history__clear'}
                >
                  <Trash2 size={13} aria-hidden="true" />
                  {confirmClear ? 'Really clear all history?' : 'Clear all'}
                </Button>
              </div>
              <ScanHistory
                scans={scans}
                onSetCompleted={handleSetCompleted}
                onDelete={handleDelete}
              />
            </section>
          </Reveal>
        </div>
      )}
    </div>
  )
}
