import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Info, RotateCcw } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import FilterBar from '../components/explore/FilterBar.jsx'
import IdeaCard from '../components/explore/IdeaCard.jsx'
import ItemAdviceCard from '../components/explore/ItemAdviceCard.jsx'
import NoMatchPanel from '../components/explore/NoMatchPanel.jsx'
import { IDEAS, CATEGORIES } from '../data/ideas.js'
import { PATHWAYS } from '../data/pathways.js'
import { searchItems, guessCategory } from '../services/itemSearch.js'
import usePageTitle from '../hooks/usePageTitle.js'

const PATHWAY_KEYS = PATHWAYS.map((p) => p.key)

const DIFF_RANK = { Beginner: 0, Intermediate: 1, Advanced: 2 }

/** '~45 min' → 45, '~2 hrs' → 120 — for the "quickest first" sort. */
function timeMinutes(time) {
  const m = time.match(/(\d+(?:\.\d+)?)\s*(min|hr)/i)
  if (!m) return 9999
  const n = parseFloat(m[1])
  return m[2].toLowerCase() === 'hr' ? n * 60 : n
}

export default function Explore() {
  usePageTitle('Explore Ideas · Second Life')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [pathway, setPathway] = useState('All')
  const [level, setLevel] = useState('All')
  const [sort, setSort] = useState('featured')
  const [searchParams] = useSearchParams()

  // Allow other pages to pre-filter via /explore?category=…&pathway=…
  useEffect(() => {
    const c = searchParams.get('category')
    if (c && CATEGORIES.includes(c)) setCategory(c)
    const p = searchParams.get('pathway')
    if (p && PATHWAY_KEYS.includes(p)) setPathway(p)
  }, [searchParams])

  const levels = useMemo(() => [...new Set(IDEAS.map((i) => i.difficulty))], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = IDEAS.filter((idea) => {
      if (category !== 'All' && idea.category !== category) return false
      if (pathway !== 'All' && !idea.pathways.includes(pathway)) return false
      if (level !== 'All' && idea.difficulty !== level) return false
      if (!q) return true
      const haystack = [
        idea.title,
        idea.blurb,
        idea.category,
        idea.difficulty,
        ...idea.pathways,
        ...idea.tags,
        ...idea.materials,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })

    // Sorting — featured keeps the curated order.
    if (sort === 'az') return [...matches].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'easiest')
      return [...matches].sort(
        (a, b) => DIFF_RANK[a.difficulty] - DIFF_RANK[b.difficulty] || a.title.localeCompare(b.title),
      )
    if (sort === 'quickest')
      return [...matches].sort((a, b) => timeMinutes(a.time) - timeMinutes(b.time))
    return matches
  }, [query, category, pathway, level, sort])

  // Universal search: also match the item knowledge base…
  const itemMatches = useMemo(() => (query.trim() ? searchItems(query) : []), [query])
  // …and when nothing at all matches, guess a category for the decision panel.
  const categoryGuess = useMemo(
    () => (query.trim() && filtered.length === 0 && itemMatches.length === 0 ? guessCategory(query) : null),
    [query, filtered.length, itemMatches.length],
  )

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
    setPathway('All')
    setLevel('All')
    setSort('featured')
  }

  const filtersActive =
    query.trim() !== '' ||
    category !== 'All' ||
    pathway !== 'All' ||
    level !== 'All' ||
    sort !== 'featured'

  return (
    <div className="page-explore">
      <header className="explore-hero">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Explore ideas"
            title="Search anything — get a sensible answer"
            lead="Type any item you own — “power bank”, “saree”, “mattress”. We match it against our step-by-step guides and an item-by-item advice book, and if we still don’t know it, we’ll show you exactly how to decide."
          />
          <div className="explore-hero__note">
            <Badge variant="outline">
              <Info size={13} aria-hidden="true" />
              {IDEAS.length} complete guides + an advisory for dozens of everyday items
            </Badge>
          </div>
        </div>
      </header>

      <section className="explore-body" aria-label="Idea library">
        <div className="container">
          <FilterBar
            query={query}
            onQuery={setQuery}
            categories={['All', ...CATEGORIES]}
            active={category}
            onCategory={setCategory}
            activePathway={pathway}
            onPathway={setPathway}
            levels={levels}
            activeLevel={level}
            onLevel={setLevel}
            sort={sort}
            onSort={setSort}
          />

          <div className="explore__countrow">
            <p className="explore__count" aria-live="polite">
              Showing {filtered.length} of {IDEAS.length} ideas
            </p>
            {filtersActive && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <RotateCcw size={13} aria-hidden="true" />
                Reset filters
              </Button>
            )}
          </div>

          {itemMatches.length > 0 && (
            <section className="item-advice" aria-label="Item advice">
              <h2 className="explore__subheading">
                Advice for “{query.trim()}”
              </h2>
              <div className="item-advice__grid">
                {itemMatches.map((item) => (
                  <Reveal key={item.name} className="reveal--full">
                    <ItemAdviceCard item={item} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {filtered.length > 0 ? (
            <section aria-label="Matching guides">
              <h2 className="explore__subheading">Step-by-step guides</h2>
              <div className="explore__grid">
                {filtered.map((idea, i) => (
                  <Reveal key={idea.id} delay={(i % 4) * 70} className="reveal--full">
                    <IdeaCard idea={idea} />
                  </Reveal>
                ))}
              </div>
            </section>
          ) : itemMatches.length > 0 ? (
            <p className="explore__guides-note">
              No step-by-step guides match — but the advice above covers it.{' '}
              <button type="button" className="link-btn" onClick={clearFilters}>
                Browse all guides
              </button>
            </p>
          ) : (
            <NoMatchPanel query={query.trim()} categoryGuess={categoryGuess} />
          )}
        </div>
      </section>
    </div>
  )
}
