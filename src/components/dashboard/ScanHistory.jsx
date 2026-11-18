import { useState } from 'react'
import { Trash2, Check, Undo2, Pencil, Package } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import { PATHWAY_MAP } from '../../data/pathways.js'
import { CATEGORY_META } from '../../data/ideas.js'
import { cn } from '../../utils/cn'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

const SOURCE_LABELS = { ai: 'AI-identified', corrected: 'AI + corrected', manual: 'Manual' }

/**
 * Activity history with user-confirmed completions.
 * Each row: thumbnail, item info, recommendation, and controls to mark /
 * change / undo what was actually done with the item.
 */
export default function ScanHistory({ scans, onSetCompleted, onDelete }) {
  const [editingId, setEditingId] = useState(null)

  return (
    <ul className="history">
      {scans.map((s) => {
        const rec = PATHWAY_MAP[s.primary]
        const RecIcon = rec?.icon
        const done = s.completed ? PATHWAY_MAP[s.completed.pathway] : null
        const DoneIcon = done?.icon
        const CatIcon = (CATEGORY_META[s.category] || {}).icon || Package
        const editing = editingId === s.id

        return (
          <li key={s.id} className="history__item card">
            <div className="history__thumb">
              {s.thumbnail ? (
                <img src={s.thumbnail} alt="" />
              ) : (
                <CatIcon size={20} aria-hidden="true" />
              )}
            </div>

            <div className="history__main">
              <span className="history__name">{s.name}</span>
              <span className="history__meta">
                {s.category} · {formatDate(s.createdAt)} · {SOURCE_LABELS[s.source] || 'Scanned'}
                {s.confidence != null && s.source !== 'manual' ? ` · ${s.confidence}% match` : ''}
              </span>
              <div className="history__tags">
                <Badge>
                  <RecIcon size={12} aria-hidden="true" />
                  {rec?.label} · {s.conditionLabel}
                </Badge>
                {done ? (
                  <Badge className="history__done-badge">
                    <DoneIcon size={12} aria-hidden="true" />
                    You {done.label === 'Donate' ? 'donated it' : done.label === 'Repair' ? 'repaired it' : done.label === 'Reuse' ? 'reused it' : 'recycled it'}
                  </Badge>
                ) : (
                  <Badge variant="outline">Not confirmed yet</Badge>
                )}
              </div>

              {(editing || !s.completed) && (
                <div className="history__confirm" role="group" aria-label="What did you do with this item?">
                  {!s.completed && !editing && (
                    <span className="history__confirm-hint">What did you do with it?</span>
                  )}
                  <div className="history__confirm-chips">
                    {Object.values(PATHWAY_MAP).map((p) => {
                      const Icon = p.icon
                      const isRec = p.key === s.primary
                      const isDone = s.completed?.pathway === p.key
                      return (
                        <button
                          key={p.key}
                          type="button"
                          className={cn(
                            'confirm-chip',
                            isRec && 'confirm-chip--rec',
                            isDone && 'confirm-chip--done',
                          )}
                          onClick={() => {
                            onSetCompleted(s.id, p.key)
                            setEditingId(null)
                          }}
                          title={isRec ? `${p.label} — recommended` : p.label}
                        >
                          <Icon size={13} aria-hidden="true" />
                          {p.label}
                          {isRec && <span className="confirm-chip__rec">recommended</span>}
                          {isDone && <Check size={12} aria-hidden="true" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="history__actions">
              {s.completed && !editing && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(s.id)}
                    aria-label="Change the recorded action"
                  >
                    <Pencil size={13} aria-hidden="true" />
                    Change
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetCompleted(s.id, null)}
                    aria-label="Undo the recorded action"
                  >
                    <Undo2 size={13} aria-hidden="true" />
                    Undo
                  </Button>
                </>
              )}
              {editing && (
                <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="history__delete"
                onClick={() => onDelete(s.id)}
                aria-label={`Remove ${s.name} from history`}
              >
                <Trash2 size={13} aria-hidden="true" />
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
