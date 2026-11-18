import AppLink from '../layout/AppLink.jsx'
import { cn } from '../../utils/cn'

/**
 * Universal button. Renders a router link (`to`), an anchor (`href`)
 * or a native button, with a consistent look.
 *
 * variants: primary | secondary | ghost | light | outline-light
 * sizes:    sm | md | lg
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  type,
  className,
  children,
  ...rest
}) {
  const classes = cn('btn', `btn--${variant}`, `btn--${size}`, className)

  if (to) {
    return (
      <AppLink to={to} className={classes} {...rest}>
        {children}
      </AppLink>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type || 'button'} className={classes} {...rest}>
      {children}
    </button>
  )
}
