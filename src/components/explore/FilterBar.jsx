import { Search, X, ArrowDownWideNarrow } from 'lucide-react'
import { cn } from '../../utils/cn'
import { PATHWAYS } from '../../data/pathways.js'

const PATHWAY_CHIPS = [
  { key: 'All', label: 'All pathways' },
  ...PATHWAYS.map((p) => ({ key: p.key, label: p.label })),
]

/**
 * Search + category / pathway / difficulty filters and sorting for the
 * Explore Ideas library.
 */
export default function FilterBar({
  query,
  onQuery,
  categories,
  active,
  onCategory,
  activePathway,
  onPathway,
  levels,
  activeLevel,
  onLevel,
  sort,
  onSort,
}) {
  return (
    <div className="filter-bar">
      <label className="filter-bar__search">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search any item — “power bank”, “saree”, “mattress”…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label="Search ideas and items"
        />
        {query && (
          <button
            type="button"
            className="filter-bar__clear"
            onClick={() => onQuery('')}
            aria-label="Clear search"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </label>

      <div className="filter-bar__row">
        <div className="filter-bar__group">
          <span className="filter-bar__group-label" id="filter-category-label">
            Category
          </span>
          <div className="filter-bar__chips" role="group" aria-labelledby="filter-category-label">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={cn('chip', active === c && 'chip--active')}
                aria-pressed={active === c}
                onClick={() => onCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-bar__group">
          <span className="filter-bar__group-label" id="filter-pathway-label">
            Pathway
          </span>
          <div className="filter-bar__chips" role="group" aria-labelledby="filter-pathway-label">
            {PATHWAY_CHIPS.map((p) => (
              <button
                key={p.key}
                type="button"
                className={cn('chip', activePathway === p.key && 'chip--active')}
                aria-pressed={activePathway === p.key}
                onClick={() => onPathway(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-bar__group">
          <span className="filter-bar__group-label" id="filter-level-label">
            Level
          </span>
          <div className="filter-bar__chips" role="group" aria-labelledby="filter-level-label">
            {['All', ...levels].map((l) => (
              <button
                key={l}
                type="button"
                className={cn('chip', activeLevel === l && 'chip--active')}
                aria-pressed={activeLevel === l}
                onClick={() => onLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-bar__group filter-bar__group--sort">
          <span className="filter-bar__group-label" id="filter-sort-label">
            Sort
          </span>
          <label className="filter-bar__sort" htmlFor="sort-select">
            <ArrowDownWideNarrow size={15} aria-hidden="true" />
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => onSort(e.target.value)}
              aria-label="Sort ideas"
            >
              <option value="featured">Featured</option>
              <option value="quickest">Quickest first</option>
              <option value="easiest">Easiest first</option>
              <option value="az">A–Z</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}
