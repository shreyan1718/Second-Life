import { cn } from '../../utils/cn'

/**
 * Standard section heading: eyebrow pill + title + lead paragraph.
 * align: center | left    tone: light | dark    as: h1 | h2 (heading level)
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'light',
  as: Tag = 'h2',
  className,
}) {
  return (
    <div
      className={cn(
        'section-head',
        `section-head--${align}`,
        tone === 'dark' && 'section-head--dark',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow', tone === 'dark' && 'eyebrow--dark')}>{eyebrow}</span>
      )}
      <Tag className="section-head__title">{title}</Tag>
      {lead && <p className="section-head__lead">{lead}</p>}
    </div>
  )
}
