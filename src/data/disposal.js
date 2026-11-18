// Donation & recycling guidance (Phase 6).
// -----------------------------------------
// Practical, category-by-category disposal know-how. Content is written for
// Indian users (the project's home) but stays useful anywhere.

export const DISPOSAL_GUIDES = [
  {
    category: 'Electronics',
    donate: {
      title: 'Donating',
      points: [
        'Only working devices — test them, and describe any faults honestly.',
        'Factory-reset and wipe your data first; include chargers and cables if you can.',
        'Digital-inclusion programs and refurbishers put old laptops and phones to direct use.',
      ],
    },
    recycle: {
      title: 'Recycling',
      points: [
        'Use authorised e-waste recyclers — search “CPCB authorised e-waste recyclers” for the state-wise list.',
        'Electronics and battery brands run take-back collection points under EPR rules.',
        'Never bin electronics or batteries with household waste — their metals are recoverable.',
      ],
    },
    notes:
      'A kabadiwala will pay for scrap metal, but authorised recyclers dismantle devices safely (batteries, mercury, lead) — use them for anything with a battery or screen.',
    safety: 'Remove and tape battery terminals; stop using any device with a swollen battery.',
  },
  {
    category: 'Clothing & Textiles',
    donate: {
      title: 'Donating',
      points: [
        'Wash everything — charities can only accept clean, odour-free clothing.',
        'NGO drives (such as Goonj) and shelters take clothing, footwear and household linen.',
        'Group by type (warm wear, kids, formals) so they can be distributed quickly.',
      ],
    },
    recycle: {
      title: 'Recycling',
      points: [
        'Unwearable items become rags or stuffing — textile traders and kabadiwalas often take them.',
        'Some clothing brands run in-store take-back bins for old garments.',
        'Natural-fibre offcuts can be composted in small quantities; synthics cannot.',
      ],
    },
    notes:
      'Rule of thumb: wearable → donate, torn but clean → rag trade, mouldy or stained → textile recycling, never the wet-waste bin.',
    safety: 'Check every pocket before it leaves the house.',
  },
  {
    category: 'Furniture & Wood',
    donate: {
      title: 'Donating',
      points: [
        'Hostels, shelters and community centres often need sturdy furniture — photos help them say yes.',
        'Second-hand dealers frequently collect for free if the piece has resale value.',
        'Local give-away groups (OLX free, Freecycle, WhatsApp groups) find takers within days.',
      ],
    },
    recycle: {
      title: 'Recycling',
      points: [
        'Intact timber is reused by wood recyclers and carpenters — offer it before scrapping it.',
        'Broken pieces go to municipal bulky waste or your local RRR centre.',
        'Never burn painted, polished or treated wood — the fumes are toxic.',
      ],
    },
    notes:
      'Measure doorways and staircases before donating large pieces — and lift with your knees, not your back.',
    safety: 'Check for protruding nails and screws before transport.',
  },
  {
    category: 'Household',
    donate: {
      title: 'Donating',
      points: [
        'Kitchen items, crockery and utensils in working order are perfect for shelter “new home kits”.',
        'Books go far at school libraries, community shelves and book-swap drives.',
        'Board games and toys (complete, safe, clean) are always in demand at children’s homes.',
      ],
    },
    recycle: {
      title: 'Recycling',
      points: [
        'Glass bottles and jars: rinse, keep lids separate, and use a bottle bank or RRR centre.',
        'Metal tins and foil: rinse and hand to scrap collection — metals recycle forever.',
        'Paints, chemicals and cleaning agents are hazardous waste — take them to a depot, never the drain.',
      ],
    },
    notes:
      'Mixed-material items (plastic + metal + electronics) are the hardest to recycle — separating the parts first makes every material recyclable.',
    safety: 'Wrap broken glass in newspaper and label it before disposal.',
  },
  {
    category: 'Garden & Outdoor',
    donate: {
      title: 'Donating',
      points: [
        'Surplus pots, tools and seeds are welcome at school gardens and community green projects.',
        'Healthy plants can be swapped or given away — local gardening groups love a freebie.',
      ],
    },
    recycle: {
      title: 'Recycling',
      points: [
        'Green waste (leaves, trimmings) belongs in compost, not landfill — it releases methane there.',
        'Some nurseries take back plastic plant pots for reuse.',
        'Broken terracotta can be used as crocks for pot drainage before resorting to disposal.',
      ],
    },
    notes:
      'A single rain barrel or compost bin can divert a surprising share of a household’s waste stream.',
    safety: 'Empty any standing water from pots and buckets before storing or donating them.',
  },
]

// General places to look — shown as a grid on the Dispose page.
export const DROP_OFF_TYPES = [
  {
    icon: 'store',
    title: 'Charity & thrift shops',
    text: 'Sell donated goods to fund good causes. Accept clean, working items — call ahead for furniture.',
  },
  {
    icon: 'heart',
    title: 'NGO collection drives',
    text: 'Organisations like Goonj take clothing and household goods, and many run festival-season drives.',
  },
  {
    icon: 'recycle',
    title: 'Municipal RRR centres',
    text: 'Reduce–Reuse–Recycle centres run by many Indian cities accept dry recyclables — check your municipality’s site.',
  },
  {
    icon: 'coins',
    title: 'Kabadiwala / scrap dealer',
    text: 'Pays by weight for paper, cardboard, metal, plastic and some e-waste. For e-waste, prefer authorised recyclers.',
  },
  {
    icon: 'shield',
    title: 'Authorised e-waste recyclers',
    text: 'Required for anything with a battery or screen. The CPCB publishes a state-wise list of authorised recyclers.',
  },
  {
    icon: 'gift',
    title: 'Give-away groups',
    text: 'OLX “free”, Freecycle and local WhatsApp groups pass items straight to new owners — zero transport footprint.',
  },
]
