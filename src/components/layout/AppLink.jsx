import { Link, useLocation } from 'react-router-dom'

/**
 * A Link that handles in-page hash anchors smoothly.
 * When navigating to another page, the router changes the URL and
 * ScrollToTop performs the scroll. When already on the target page,
 * we scroll directly (so repeat clicks still work).
 */
export default function AppLink({ to, children, onClick, ...rest }) {
  const { pathname } = useLocation()
  const [path, hash] = to.split('#')

  function handleClick(e) {
    onClick?.(e)
    if (!hash || e.defaultPrevented) return
    if (pathname === (path || '/')) {
      const el = document.getElementById(hash)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
