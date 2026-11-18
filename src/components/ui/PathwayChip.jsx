import Badge from './Badge.jsx'
import { PATHWAY_MAP } from '../../data/pathways.js'
import { cn } from '../../utils/cn'

/** Compact pill showing one of the four pathways with its icon. */
export default function PathwayChip({ pathway, className }) {
  const p = PATHWAY_MAP[pathway]
  if (!p) return null
  const Icon = p.icon
  return (
    <Badge className={cn('pathway-chip', className)}>
      <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
      {p.label}
    </Badge>
  )
}
