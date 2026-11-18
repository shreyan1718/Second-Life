import { Sparkles, ScanLine, ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

export default function CTASection() {
  return (
    <section className="section cta-section">
      <div className="container">
        <Reveal>
          <div className="cta-panel">
            <span className="cta-panel__badge">
              <Sparkles size={14} aria-hidden="true" />
              Photo upload · live now
            </span>
            <h2>Ready to rethink what you throw away?</h2>
            <p>
              Point your camera at the clutter, or browse the idea library — every guide comes
              with materials, step-by-step instructions and safety notes.
            </p>
            <div className="cta-panel__actions">
              <Button to="/scan" variant="light" size="lg">
                <ScanLine size={18} aria-hidden="true" />
                Scan an item
              </Button>
              <Button to="/explore" variant="outline-light" size="lg">
                Browse ideas <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
