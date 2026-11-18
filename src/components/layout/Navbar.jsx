import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ScanLine } from 'lucide-react'
import Logo from './Logo.jsx'
import AppLink from './AppLink.jsx'
import Button from '../ui/Button.jsx'
import { cn } from '../../utils/cn'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/scan', label: 'Scan an Item' },
  { to: '/explore', label: 'Explore Ideas' },
  { to: '/dispose', label: 'Donate & Recycle' },
  { to: '/dashboard', label: 'My Impact' },
  { to: '/about', label: 'About Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  const renderLink = (l) =>
    l.to.includes('#') ? (
      <AppLink key={l.to} to={l.to} className="navbar__link" onClick={close}>
        {l.label}
      </AppLink>
    ) : (
      <NavLink
        key={l.to}
        to={l.to}
        end={l.end}
        onClick={close}
        className={({ isActive }) => cn('navbar__link', isActive && 'navbar__link--active')}
      >
        {l.label}
      </NavLink>
    )

  return (
    <header className={cn('navbar', scrolled && 'navbar--scrolled')}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Second Life — home" onClick={close}>
          <Logo />
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          {LINKS.map(renderLink)}
        </nav>

        <div className="navbar__actions">
          <Button to="/scan" size="sm" className="navbar__cta">
            <ScanLine size={15} aria-hidden="true" />
            Scan Now
          </Button>
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="navbar__panel" id="mobile-menu">
          <div className="container">
            <nav className="navbar__mobile" aria-label="Mobile">
              {LINKS.map(renderLink)}
              <Button to="/scan" onClick={close} className="navbar__mobile-cta">
                <ScanLine size={16} aria-hidden="true" />
                Scan Now
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
