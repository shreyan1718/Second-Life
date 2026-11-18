import { useState } from 'react'
import {
  Search,
  LocateFixed,
  MapPin,
  HeartHandshake,
  Recycle,
  Store,
  Coins,
  ShieldCheck,
  Gift,
  Lightbulb,
  ShieldAlert,
  ExternalLink,
  ScanLine,
  WifiOff,
  SearchX,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { DISPOSAL_GUIDES, DROP_OFF_TYPES } from '../data/disposal.js'
import { CATEGORY_META } from '../data/ideas.js'
import { searchDropOffPoints, searchNearCoordinates } from '../services/locations.js'
import usePageTitle from '../hooks/usePageTitle.js'

const DROP_OFF_ICONS = { store: Store, heart: HeartHandshake, recycle: Recycle, coins: Coins, shield: ShieldCheck, gift: Gift }

function formatKm(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}

export default function Dispose() {
  usePageTitle('Donate & Recycle · Second Life')
  const [query, setQuery] = useState('')
  const [state, setState] = useState('idle') // idle | searching | done | error
  const [location, setLocation] = useState(null)
  const [points, setPoints] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  async function runSearch(makeCall) {
    setState('searching')
    setErrorMsg('')
    try {
      const { location: loc, points: found } = await makeCall()
      setLocation(loc)
      setPoints(found)
      setState('done')
    } catch (e) {
      if (e.message === 'notfound') {
        setErrorMsg(
          'We couldn’t find that place name. Try a nearby town, city or landmark — for example “Jamshedpur” or “Bistupur”.',
        )
      } else {
        setErrorMsg(
          'The location search needs internet access to query OpenStreetMap, and none seems available right now (the sandboxed preview blocks external requests). Everything else on this page works offline — and the search will work in the deployed app.',
        )
      }
      setState('error')
    }
  }

  function onSearchSubmit(e) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    runSearch(() => searchDropOffPoints(q))
  }

  function onUseMyLocation() {
    if (!navigator.geolocation) {
      setErrorMsg('This browser does not support location detection — type a place name instead.')
      setState('error')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        runSearch(() => searchNearCoordinates(pos.coords.latitude, pos.coords.longitude)),
      () => {
        setErrorMsg(
          'Location permission was denied or is unavailable — type a place name instead.',
        )
        setState('error')
      },
      { timeout: 12000 },
    )
  }

  return (
    <div className="page-dispose">
      <header className="dispose-hero">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Donate & recycle"
            title="Give it away, the right way"
            lead="Where to take things, how to prepare them, and who actually wants them — practical disposal guidance for every category, plus a search for drop-off points near you."
          />
          <div className="dispose-hero__note">
            <Badge variant="outline">
              <MapPin size={13} aria-hidden="true" />
              Drop-off search powered by public OpenStreetMap data — no keys, no tracking
            </Badge>
          </div>
        </div>
      </header>

      <section className="dispose-locate" aria-label="Find drop-off points">
        <div className="container">
          <div className="locate-card card">
            <h2>Find drop-off points near you</h2>
            <p className="locate-card__sub">
              Searches charity shops, second-hand shops and recycling points around any place —
              straight from OpenStreetMap’s community-built map.
            </p>
            <form className="locate-card__form" onSubmit={onSearchSubmit}>
              <label className="locate-card__field">
                <Search size={17} aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Enter a city or locality — e.g. Jamshedpur…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search for drop-off points near a place"
                />
              </label>
              <Button type="submit" disabled={state === 'searching'}>
                Search
              </Button>
              <Button type="button" variant="secondary" onClick={onUseMyLocation} disabled={state === 'searching'}>
                <LocateFixed size={15} aria-hidden="true" />
                Use my location
              </Button>
            </form>

            {state === 'searching' && (
              <p className="locate-card__status">
                <span className="spinner" aria-hidden="true" />
                Searching the map…
              </p>
            )}

            {state === 'error' && (
              <div className="locate-card__alert" role="alert">
                <WifiOff size={17} aria-hidden="true" />
                {errorMsg}
              </div>
            )}

            {state === 'done' && points.length === 0 && (
              <div className="locate-card__alert" role="status">
                <SearchX size={17} aria-hidden="true" />
                No drop-off points are mapped within 12 km of {location}. Try a nearby city — or
                use the “where to look” guide below.
              </div>
            )}

            {state === 'done' && points.length > 0 && (
              <>
                <p className="locate-card__result-head" aria-live="polite">
                  <strong>{points.length}</strong> drop-off point{points.length === 1 ? '' : 's'} found
                  near {location}
                </p>
                <ul className="locate-results">
                  {points.map((p) => (
                    <li key={p.id} className="locate-result">
                      <div className="locate-result__main">
                        <span className="locate-result__name">{p.name}</span>
                        <span className="locate-result__kind">{p.kindLabel}</span>
                        {p.accepts.length > 0 && (
                          <span className="locate-result__accepts">
                            Accepts: {p.accepts.slice(0, 6).join(', ')}
                          </span>
                        )}
                      </div>
                      <div className="locate-result__side">
                        <span className="locate-result__distance">{formatKm(p.distance)}</span>
                        <a
                          className="locate-result__link"
                          href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=18/${p.lat}/${p.lon}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open map <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section section--white disposal" aria-label="Disposal guidance by category">
        <div className="container">
          <SectionHeading
            eyebrow="By category"
            title="How to part with each kind of thing"
            lead="Every category has a right way to be handed on — and a right way to be recycled when its time is truly up."
          />
          <div className="disposal-grid">
            {DISPOSAL_GUIDES.map((g, i) => {
              const Icon = (CATEGORY_META[g.category] || {}).icon
              return (
                <Reveal key={g.category} delay={(i % 3) * 80} className="reveal--full">
                  <article className="disposal-card card card--hover">
                    <header className="disposal-card__head">
                      {Icon && (
                        <span className="tile">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                      )}
                      <h3>{g.category}</h3>
                    </header>
                    <div className="disposal-card__cols">
                      <div>
                        <h4>
                          <HeartHandshake size={15} aria-hidden="true" />
                          {g.donate.title}
                        </h4>
                        <ul>
                          {g.donate.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>
                          <Recycle size={15} aria-hidden="true" />
                          {g.recycle.title}
                        </h4>
                        <ul>
                          {g.recycle.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="disposal-card__note">
                      <Lightbulb size={15} aria-hidden="true" />
                      {g.notes}
                    </p>
                    <p className="disposal-card__safety">
                      <ShieldAlert size={15} aria-hidden="true" />
                      {g.safety}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--tint dropoff" aria-label="Where to look">
        <div className="container">
          <SectionHeading
            eyebrow="Where to look"
            title="Six reliable places things can go"
            lead="From charity shops to kabadiwalas — the drop-off networks that already exist around you."
          />
          <div className="dropoff-grid">
            {DROP_OFF_TYPES.map((t, i) => {
              const Icon = DROP_OFF_ICONS[t.icon]
              return (
                <Reveal key={t.title} delay={(i % 3) * 80} className="reveal--full">
                  <article className="dropoff-tile card card--hover">
                    <span className="tile">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section dispose-cta">
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <h2>Not sure which route an item deserves?</h2>
              <p>Scan it — the recommendation engine weighs its condition and tells you exactly why.</p>
              <div className="cta-panel__actions">
                <Button to="/scan" variant="light" size="lg">
                  <ScanLine size={18} aria-hidden="true" />
                  Scan an item
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
