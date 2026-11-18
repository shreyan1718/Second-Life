import { Camera, ScanSearch, ClipboardCheck, Compass, Wrench } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Badge from '../ui/Badge.jsx'

const STEPS = [
  {
    icon: Camera,
    title: 'Snap a photo',
    text: 'Upload or capture a picture of the item you’re about to toss — the app does the rest.',
  },
  {
    icon: ScanSearch,
    title: 'AI identifies it',
    text: 'Second Life recognises the object and its material category in seconds.',
  },
  {
    icon: ClipboardCheck,
    title: 'Answer a few questions',
    text: 'A short, smart checklist learns the item’s condition and how usable it still is.',
  },
  {
    icon: Compass,
    title: 'Get your action plan',
    text: 'A personalised recommendation — repair, reuse, donate or recycle — with steps, materials and safety notes.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--white steps">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="From clutter to climate action in four steps"
          lead="One photo and a few taps stand between your unwanted items and a better ending."
        />

        <div className="steps__grid">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="reveal--full">
              <article className="step">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="tile tile--lg">
                  <s.icon size={22} aria-hidden="true" />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="steps__note">
            <Wrench size={16} aria-hidden="true" />
            <span>
              <strong>The whole journey is live:</strong> photo → on-device AI identification →
              condition questions → action plan → donation &amp; recycling guidance → your impact
              dashboard.
            </span>
            <Badge>Live now</Badge>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
