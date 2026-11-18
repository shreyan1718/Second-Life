# Second Life 🌱

> **Don't throw it away — give it a second life.**

Second Life is an AI-powered sustainability application that helps users identify unwanted
objects and discover whether they can be **repaired, reused, donated or recycled** — with
actionable instructions, required materials, safety precautions and creative ideas.

It supports UN Sustainable Development Goals **9, 11, 12 and 13**.

**Status: COMPLETE — all 8 phases delivered.** · 77/77 end-to-end tests passing.

---

## What it does

1. **📸 Scan** — upload or snap a photo of any unwanted item
2. **🧠 Identify** — a neural network (MobileNet) recognises the object **on your device** —
   no account, no upload, photos never leave the browser
3. **📋 Assess** — a short, category-aware questionnaire learns the item's condition
4. **🧭 Recommend** — a transparent engine suggests Repair / Reuse / Donate / Recycle with
   reasoning, ranked alternatives and hard safety overrides
5. **🛠️ Act** — 32 step-by-step DIY guides, a universal item search with advice for dozens of
   everyday things, and practical donation & recycling guidance with a nearby drop-off search
6. **📈 Track** — an impact dashboard with charts and user-confirmed actions

## Quick start

```bash
npm install
npm run dev          # development server → http://localhost:5173
npm run build        # production build → /dist
npm run preview      # serve the production build
npm run test:e2e     # end-to-end test suite (needs the dev server running)
```

> **Tests** require a Chromium binary: run `npx playwright-core install chromium` once, or
> point `CHROME_PATH` at an existing Chrome/Chromium.

## User guide

| Page | What's there |
| --- | --- |
| **Home** | How it works, the four pathways, waste statistics, SDG alignment |
| **Scan an Item** | The 3-step wizard: photo → AI identification + category correction → condition questions → recommendation with reasoning, alternatives and safety warnings |
| **Explore Ideas** | **Universal search**: type any item — “power bank”, “saree”, “mattress” — and get an advice card (best pathway, options, tips, safety, related guides) from a 60-item knowledge base, plus matching guides; anything unknown still gets the decision framework (how to choose Repair / Reuse / Donate / Recycle) with a category guess and scan option. Also: 32 complete guides, filterable by category / pathway / level, sortable, printable |
| **Donate & Recycle** | Nearby drop-off search (OpenStreetMap), category-by-category disposal guides, India-specific know-how (CPCB e-waste recyclers, RRR centres, kabadiwalas, NGO drives) |
| **My Impact** | Stat cards, interactive charts, completed-action tiles, activity history with confirm / change / undo / delete |
| **About Us** | Mission, the problem we address, SDG alignment, values, roadmap |

## Feature history (by phase)

### Phase 1 — Foundation & UI ✅
Branding (logo, favicon, design tokens), responsive app shell (glass navbar with mobile menu,
footer, 404), Home / About / Explore pages, reusable component library, self-hosted variable
fonts, scroll-reveal animations with `prefers-reduced-motion` support.

### Phase 2 — Image Upload & AI Recognition ✅
Drag & drop + file browse + camera capture (modal with permission handling), image preview,
client-side validation (type / 8 MB), animated analysis overlay, **real on-device AI**:
MobileNet v1 via TensorFlow.js with **self-hosted model weights** (`public/models/`, ~16 MB —
works fully offline and inside sandboxed frames), ImageNet→category mapping, real confidence
plus raw top-3 guesses, manual category correction, honest "couldn't identify" and
"AI unavailable" states. **No result is ever fabricated.**

### Phase 3 — Condition Assessment ✅
3-step wizard with a clickable stepper; dynamic questionnaire (3 universal + category-specific
questions for Electronics, Clothing, Furniture, Household, Garden); single- and multi-select
options with exclusive "None of these"; inline validation with auto-scroll; responses stored
with a photo thumbnail.

### Phase 4 — Recommendation Engine ✅
Transparent rule-based scoring (every answer contributes pathway weights); primary pathway +
reasoning bullets assembled from the user's answers; ranked alternatives with fit %; condition
score 0–100; **safety rules that override the ranking** (swollen battery, mouldy textile, rotten
wood, cracked glass → forced Recycle with a prominent warning).

### Phase 5 — DIY Ideas & Tutorials ✅
32 complete guides across all categories and pathways; difficulty filter and sorting
(Featured / Quickest / Easiest / A–Z); print-friendly guide pages with a dedicated print
stylesheet.

### Phase 6 — Donation & Recycling Guidance ✅
Nearby drop-off search using **public, keyless OpenStreetMap services** (Nominatim geocoding +
Overpass for charity shops, second-hand shops and recycling points, with distances and
accepted-material tags); browser Geolocation support; category disposal guides with
India-specific channels; "where to look" grid; honest degradation when offline.

### Phase 7 — User Dashboard & Impact Tracking ✅
Stat cards (items analysed, actions completed, estimated waste diverted, top pathway);
hand-built interactive SVG charts (donut + bars); completed-action tiles driven **only** by
user confirmations; activity history with confirm / change / undo / delete and two-step
clear-all; honest weight-based impact estimates; data stays in the browser.

### Phase 8 — Integration & Final Testing ✅
Per-page browser titles; "Reset filters" control; a **power-bank guide added when a real
search gap was found**; **77-check E2E suite** (`tests/e2e.mjs`) covering every workflow;
responsive audit at 375/768/1280 px (zero horizontal overflow); live API validation;
final documentation.

### Universal item search (post-Phase-8 enhancement) ✅
Searching Explore now answers for **any** item, not just guide titles:
- **60-item knowledge base** (`src/data/items.js`) — phones, laptops, sarees, mattresses,
  mixers, appliances, batteries, blankets, tools and more. Each entry: best pathway + why,
  every sensible option, practical tips, safety notes, related guides.
- **Smart matching** (`src/services/itemSearch.js`) — normalized, singular-aware,
  word-boundary scoring (no substring false positives); top 3 matches shown as advice cards.
- **Decision framework for unknowns** (`NoMatchPanel`) — when a search matches nothing at all,
  the four pathways are explained as decision criteria, with a keyword-based category guess
  and a scan CTA. No search ever dead-ends.

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI | React 18 + Vite 5 | Fast, modular development |
| Routing | React Router 6 | Clean multi-page structure |
| Styling | Hand-rolled CSS design tokens | Full control, zero framework lock-in |
| Icons | lucide-react | Crisp, consistent, tree-shaken |
| Fonts | Plus Jakarta Sans + Inter (Fontsource) | Premium look, self-hosted |
| AI | TensorFlow.js + self-hosted MobileNet v1 | Real recognition, on-device, keyless, offline |
| Places | Nominatim + Overpass (OpenStreetMap) | Public, keyless drop-off search |
| Storage | localStorage (in-memory fallback) | Private, zero-backend persistence |
| Tests | playwright-core | Real-browser E2E coverage |

No backend, no API keys, no accounts — the entire application runs client-side.

## Project structure

```
second-life/
├── index.html                       # App shell, meta, favicon
├── vite.config.js                   # Dev server + preview-frame CORS middleware
├── tests/
│   └── e2e.mjs                      # 77-check end-to-end suite
├── public/
│   ├── favicon.svg                  # Second Life leaf-loop mark
│   └── models/mobilenet_v1_1.0_224/ # Self-hosted MobileNet weights (56 files)
└── src/
    ├── main.jsx / App.jsx           # Entry + router
    ├── hooks/usePageTitle.js
    ├── styles/                      # tokens, base, ui, layout, home, about,
    │                                # explore, scan, dispose, dashboard (+ print)
    ├── components/
    │   ├── layout/                  # Logo, Navbar, Footer, AppLink, ScrollToTop
    │   ├── ui/                      # Button, Badge, PathwayChip, SectionHeading,
    │   │                            # Reveal, Stepper
    │   ├── home/                    # Hero, HowItWorks, Pathways, ImpactBand,
    │   │                            # SDGSection, ExploreTeaser, CTASection
    │   ├── explore/                 # FilterBar, IdeaCard, ItemAdviceCard, NoMatchPanel
    │   ├── scan/                    # CameraCapture, Questionnaire, Recommendation
    │   └── dashboard/               # DonutChart, CategoryBars, ScanHistory
    ├── pages/                       # Home, Scan, Explore, IdeaDetail, Dispose,
    │                                # Dashboard, About, NotFound
    ├── services/
    │   ├── recognition.js           # On-device MobileNet recognition
    │   ├── recommendation.js        # Scoring + safety overrides
    │   ├── itemSearch.js            # Universal item-search matching
    │   ├── scanStore.js             # Save / complete / undo / delete / clear
    │   └── locations.js             # Nominatim + Overpass search
    ├── data/
    │   ├── pathways.js              # The four pathways
    │   ├── ideas.js                 # 32 complete guides
    │   ├── items.js                 # 60-item advice book (universal search)
    │   ├── questions.js             # Condition questionnaires
    │   ├── rules.js                 # Safety rules
    │   ├── objects.js               # ImageNet → category mapping
    │   ├── imagenet-classes.js      # 1000 class labels
    │   ├── disposal.js              # Category disposal guidance
    │   ├── impact.js                # Weight estimates + chart colours
    │   ├── sdgs.js / stats.js       # SDG band + waste statistics
    │   └── (categories in ideas.js)
    └── utils/cn.js
```

## Design system

- **Colours** — forest green `#1B4332` · emerald `#059669`/`#10B981` · white · soft off-white
  `#F7F9F4`; official SDG colours only on SDG badges; functional red/amber only for
  errors and safety warnings.
- **Type** — Plus Jakarta Sans (display) · Inter (body), self-hosted variable fonts.
- **Shape** — rounded cards (20–26 px) and pill controls.
- **Motion** — scroll reveals, hover lifts, 150–320 ms easing; reduced-motion respected.

## Privacy & honesty principles

1. Photos never leave the browser — recognition runs on-device.
2. No API keys anywhere; location search uses public keyless services.
3. Nothing pretends to be what it isn't: fallbacks and estimates are labelled as such.
4. User data stays in the browser's local storage; clearing it is always available.

## Testing

`npm run test:e2e` (with the dev server running) executes **77 checks**:

1. Every page renders with the correct title and **zero page errors**
2. Responsive audit — no horizontal overflow at **375 / 768 / 1280 px** on every page
3. Mobile navigation (hamburger menu)
4. The full scan journey: upload → analyse → category → validation → recommendation →
   dashboard → confirm → undo → delete
5. Safety override: a swollen battery forces Recycle with a warning
6. Library: 32 guides, search, level filter, A–Z sort, complete guide pages, universal
   item search (advice cards + decision framework for unknowns)
7. Dispose page + live OpenStreetMap search

## Known limitations & future work

- **Local-first data** — history lives in one browser; a backend + accounts would sync it.
- **Item book breadth** — 60 common items are covered; anything else falls to the (always
  available) decision framework and scanner. The book is plain data — easy to grow.
- **Recognition breadth** — MobileNet/ImageNet covers common household objects; unusual items
  fall back to the (honest) manual category picker. A larger or fine-tuned model could widen it.
- **Map coverage** — drop-off search depends on OpenStreetMap data, which is thinner in some
  Indian cities; the UI says so plainly when nothing is mapped.
- **Impact estimates** — category weight averages, labelled as estimates on the dashboard.

## License & credits

- MobileNet weights and ImageNet labels: TensorFlow authors (Apache License 2.0).
- Drop-off data: © OpenStreetMap contributors (ODbL).
- Fonts: Plus Jakarta Sans & Inter (SIL OFL).
- Icons: Lucide (ISC).
