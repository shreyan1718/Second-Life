import { cn } from '../../utils/cn'

/** Small pill label. variants: mint (default) | outline */
export default function Badge({ variant = 'mint', className, children, ...rest }) {
  return (
    <span className={cn('badge', variant !== 'mint' && `badge--${variant}`, className)} {...rest}>
      {children}
    </span>
  )
}
