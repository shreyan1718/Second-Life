import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function NotFound() {
  usePageTitle('Page not found · Second Life')
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__code" aria-hidden="true">
          404
        </span>
        <h1>This page took a wrong turn.</h1>
        <p>
          It happens — even to the best of recyclers. Let’s get you somewhere useful.
        </p>
        <div className="not-found__actions">
          <Button to="/">
            Back to home <ArrowRight size={17} aria-hidden="true" />
          </Button>
          <Button to="/explore" variant="secondary">
            Explore ideas
          </Button>
        </div>
      </div>
    </section>
  )
}
