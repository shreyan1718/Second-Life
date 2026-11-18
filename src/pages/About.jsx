import {
  Target,
  Eye,
  Trash2,
  Leaf,
  Zap,
  ShieldCheck,
  Sprout,
  Users,
  Camera,
  ClipboardCheck,
  Wand2,
  BarChart3,
  MapPin,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Badge from '../components/ui/Badge.jsx'
import SDGSection from '../components/home/SDGSection.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

const PROBLEMS = [
  {
    text: (
      <>
        <strong>2.1 billion tonnes</strong> of municipal solid waste are generated every year —
        heading for 3.8 billion by 2050 (UNEP).
      </>
    ),
  },
  {
    text: (
      <>
        Only <strong>22%</strong> of the world’s e-waste is formally collected and recycled — the
        rest is lost.
      </>
    ),
  },
  {
    text: (
      <>
        The equivalent of <strong>one garbage truck</strong> of textiles is landfilled or burned
        every second (Ellen MacArthur Foundation).
      </>
    ),
  },
  {
    text: (
      <>
        Most people <strong>want</strong> to do the right thing — they just don’t know where to
        start.
      </>
    ),
  },
]

const ANSWER_STEPS = [
  'Photograph the object you’re about to throw away.',
  'AI identifies what it is and what it’s made of.',
  'A short questionnaire assesses its condition and usability.',
  'You get a personalised action plan — with steps, materials and safety notes.',
]

const VALUES = [
  {
    icon: Zap,
    title: 'Simplicity',
    text: 'No jargon, no guilt-trips — just clear next steps anyone can follow.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & safety',
    text: 'Every recommendation comes with honest reasoning and safety precautions.',
  },
  {
    icon: Sprout,
    title: 'Real impact',
    text: 'We quantify the waste you divert, so progress feels tangible.',
  },
  {
    icon: Users,
    title: 'Community first',
    text: 'Donations, swaps and shared ideas spread sustainability person to person.',
  },
]

const ROADMAP = [
  {
    icon: Camera,
    title: 'AI object scanner',
    text: 'Upload or snap a photo on the Scan page. A neural network (MobileNet) identifies the object entirely on your device — the model ships with the app and photos never leave your browser.',
    live: true,
  },
  {
    icon: ClipboardCheck,
    title: 'Condition assessment',
    text: 'A short, dynamic questionnaire tailored to each item’s category — validated and stored for your impact history.',
    live: true,
  },
  {
    icon: Wand2,
    title: 'Recommendation engine',
    text: 'Reasoned repair, reuse, donate or recycle suggestions with ranked alternatives and safety rules built in.',
    live: true,
  },
  {
    icon: MapPin,
    title: 'Donation & recycling guidance',
    text: 'Category-by-category disposal know-how, plus a nearby search for charity shops and recycling points powered by OpenStreetMap.',
    live: true,
  },
  {
    icon: BarChart3,
    title: 'Impact dashboard',
    text: 'My Impact tracks items analysed, actions you confirm, estimated waste diverted and more — with interactive charts. Data stays in your browser.',
    live: true,
  },
]

export default function About() {
  usePageTitle('About Us · Second Life')
  return (
    <div className="page-about">
      <header className="about-hero">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="About Second Life"
            title="We help everyday objects live longer, better lives."
            lead="Second Life is a student-built sustainability project with one simple goal: make sure nothing usable ends up in a landfill just because someone didn’t know what else to do with it."
          />
        </div>
      </header>

      <section id="mission" className="section section--white mission">
        <div className="container">
          <SectionHeading eyebrow="Mission & vision" title="Why Second Life exists" />

          <div className="mission__grid">
            <Reveal className="reveal--full">
              <article className="mission-card card card--hover">
                <span className="tile tile--lg">
                  <Target size={24} aria-hidden="true" />
                </span>
                <h3>Our mission</h3>
                <p>
                  To turn every “should I throw this away?” moment into a confident, informed
                  decision — using AI to recommend the most sustainable option for any unwanted
                  object.
                </p>
              </article>
            </Reveal>

            <Reveal delay={100} className="reveal--full">
              <article className="mission-card card card--hover">
                <span className="tile tile--lg">
                  <Eye size={24} aria-hidden="true" />
                </span>
                <h3>Our vision</h3>
                <p>
                  A world where repair, reuse and responsible recycling are everyone’s default
                  reflex — and landfill is the last resort, not the easy option.
                </p>
              </article>
            </Reveal>
          </div>

          <div className="problem-answer">
            <Reveal className="reveal--full">
              <article className="problem-card">
                <h3>
                  <Trash2 size={22} aria-hidden="true" />
                  The problem
                </h3>
                <ul>
                  {PROBLEMS.map((p, i) => (
                    <li key={i}>{p.text}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={100} className="reveal--full">
              <article className="answer-card">
                <h3>
                  <Leaf size={22} aria-hidden="true" />
                  Our answer
                </h3>
                <ol>
                  {ANSWER_STEPS.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <SDGSection detailed />

      <section className="section section--white values">
        <div className="container">
          <SectionHeading
            eyebrow="What we value"
            title="Principles behind every recommendation"
          />

          <div className="values__grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="reveal--full">
                <article className="value-card card card--hover">
                  <span className="tile">
                    <v.icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="section section--tint roadmap">
        <div className="container">
          <SectionHeading
            eyebrow="What’s next"
            title="On the roadmap"
            lead="The foundation is live — here’s what we’re building next."
          />

          <div className="roadmap__grid">
            {ROADMAP.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="reveal--full">
                <article className="roadmap-card card card--hover">
                  <span className="tile">
                    <r.icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  {r.live ? <Badge>Live now</Badge> : <Badge variant="outline">Planned</Badge>}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
