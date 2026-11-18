import { Leaf } from 'lucide-react'
import Logo from './Logo.jsx'
import AppLink from './AppLink.jsx'
import { SDGS } from '../../data/sdgs.js'

const EXPLORE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/scan', label: 'Scan an item' },
  { to: '/explore', label: 'Explore Ideas' },
  { to: '/dispose', label: 'Donate & recycle' },
  { to: '/dashboard', label: 'My impact' },
  { to: '/#how-it-works', label: 'How it works' },
]

const PROJECT_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/about#mission', label: 'Mission & vision' },
  { to: '/about#sdgs', label: 'SDG alignment' },
  { to: '/about#roadmap', label: 'What’s next' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>
              Don’t throw it away — give it a second life. AI-assisted guidance for repairing,
              reusing, donating and recycling everyday objects.
            </p>
            <div className="footer__sdgs" aria-label="UN Sustainable Development Goals supported">
              {SDGS.map((s) => (
                <span
                  key={s.number}
                  className="footer__sdg"
                  style={{ background: s.color }}
                  title={`SDG ${s.number} — ${s.title}`}
                >
                  {s.number}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Explore">
            <h3>Explore</h3>
            <ul className="footer__links">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <AppLink to={l.to}>{l.label}</AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Project">
            <h3>Project</h3>
            <ul className="footer__links">
              {PROJECT_LINKS.map((l) => (
                <li key={l.label}>
                  <AppLink to={l.to}>{l.label}</AppLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Second Life · A student innovation project</span>
          <span className="footer__bottom-brand">
            <Leaf size={14} aria-hidden="true" /> Built for a low-waste future
          </span>
        </div>
      </div>
    </footer>
  )
}
