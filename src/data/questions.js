// Condition-assessment question bank (Phase 3).
// ----------------------------------------------
// Questions are dynamic: every scan answers the common set plus a set
// tailored to the item's category. Each option carries:
//   points  — condition quality 0–3 (drives the condition score)
//   weights — contributions to the four pathway scores
//   note    — reasoning bullet quoted in the recommendation
//   rules   — safety rule ids triggered by this answer (see rules.js)

const COMMON = [
  {
    id: 'overall',
    type: 'choice',
    label: 'Overall, what condition is it in?',
    options: [
      {
        value: 'like-new',
        label: 'Like new',
        points: 3,
        weights: { donate: 2, reuse: 1 },
        note: 'It’s in great shape — someone else could use it exactly as it is.',
      },
      {
        value: 'lightly-used',
        label: 'Lightly used',
        points: 2,
        weights: { reuse: 1, donate: 1 },
        note: 'Only light wear — there’s plenty of life left in it.',
      },
      {
        value: 'well-used',
        label: 'Well used',
        points: 1,
        weights: { reuse: 1 },
        note: 'Honest wear, but the material is still serviceable.',
      },
      {
        value: 'worn-out',
        label: 'Worn out',
        points: 0,
        weights: { recycle: 1 },
        note: 'It has given everything it has — the kind thing now is recovering its materials.',
      },
    ],
  },
  {
    id: 'functional',
    type: 'choice',
    label: 'Does it still do its main job?',
    options: [
      {
        value: 'fully',
        label: 'Yes, perfectly',
        points: 3,
        weights: { donate: 2 },
        note: 'It works — passing it on extends its life with zero effort.',
      },
      {
        value: 'partially',
        label: 'Partially, with quirks',
        points: 2,
        weights: { repair: 2 },
        note: 'A fixable fault is all that stands between it and a longer life.',
      },
      {
        value: 'no',
        label: 'Not at all',
        points: 0,
        weights: { repair: 1, recycle: 1 },
        note: 'It no longer works, but its materials still hold value.',
      },
    ],
  },
  {
    id: 'reason',
    type: 'choice',
    label: 'Why are you parting with it?',
    options: [
      {
        value: 'not-needed',
        label: 'I simply don’t need it',
        points: 2,
        weights: { donate: 1, reuse: 1 },
        note: 'One person’s spare is another person’s essential.',
      },
      {
        value: 'replaced',
        label: 'Replaced by something new',
        points: 2,
        weights: { donate: 1 },
      },
      {
        value: 'damaged',
        label: 'It’s damaged',
        points: 0,
        weights: { repair: 1, recycle: 1 },
      },
      {
        value: 'style',
        label: 'Outgrown or out of style',
        points: 1,
        weights: { donate: 1, reuse: 1 },
        note: 'Still perfectly usable — just no longer your taste.',
      },
    ],
  },
]

const CATEGORY_SPECIFIC = {
  Electronics: [
    {
      id: 'elec-power',
      type: 'choice',
      label: 'Does it power on?',
      options: [
        {
          value: 'yes',
          label: 'Yes',
          points: 3,
          weights: { donate: 2 },
          note: 'Working electronics are in high demand for donation and digital-inclusion programs.',
        },
        {
          value: 'sometimes',
          label: 'Sometimes / intermittently',
          points: 1,
          weights: { repair: 2 },
          note: 'Intermittent faults are often just connectors or batteries — very repairable.',
        },
        {
          value: 'no',
          label: 'No',
          points: 0,
          weights: { repair: 1, recycle: 2 },
          note: 'Dead devices still contain recoverable metals like copper, gold and aluminium.',
        },
      ],
    },
    {
      id: 'elec-battery',
      type: 'choice',
      label: 'How is the battery (if it has one)?',
      options: [
        { value: 'good', label: 'Holds charge well', points: 3, weights: { donate: 1 } },
        {
          value: 'drains',
          label: 'Drains quickly',
          points: 1,
          weights: { repair: 2 },
          note: 'A battery replacement is one of the most do-able electronics repairs.',
        },
        {
          value: 'swollen',
          label: 'Swollen or damaged',
          points: 0,
          weights: { recycle: 3 },
          rules: ['battery-damaged'],
        },
        { value: 'none', label: 'No battery / not applicable', points: 2, weights: {} },
      ],
    },
    {
      id: 'elec-damage',
      type: 'multi',
      label: 'Any physical damage?',
      help: 'Select all that apply.',
      noneValue: 'none',
      options: [
        { value: 'none', label: 'None of these', points: 3, weights: { donate: 1 } },
        {
          value: 'screen',
          label: 'Cracked or broken screen',
          points: 0,
          weights: { repair: 1 },
          note: 'Screen damage is repairable on many devices — and worth it on expensive ones.',
        },
        { value: 'water', label: 'Water damage', points: 0, weights: { recycle: 1 } },
        {
          value: 'cable',
          label: 'Worn or frayed cable',
          points: 1,
          weights: { repair: 2 },
          note: 'Frayed cables are usually a simple fix — but stop using them until repaired.',
        },
      ],
    },
  ],
  'Clothing & Textiles': [
    {
      id: 'tex-tears',
      type: 'choice',
      label: 'Are there tears or holes?',
      options: [
        { value: 'none', label: 'None', points: 3, weights: { donate: 2 } },
        {
          value: 'small',
          label: 'Small, repairable ones',
          points: 2,
          weights: { repair: 2 },
          note: 'Small tears are exactly what a needle and thread are for.',
        },
        {
          value: 'large',
          label: 'Large ones',
          points: 0,
          weights: { reuse: 1, recycle: 1 },
          note: 'Even torn fabric can be cut into rags, patches or stuffing.',
        },
      ],
    },
    {
      id: 'tex-clean',
      type: 'choice',
      label: 'Is it clean and odour-free?',
      options: [
        {
          value: 'yes',
          label: 'Yes',
          points: 3,
          weights: { donate: 2 },
          note: 'Charities can only accept clean items — you’re donation-ready.',
        },
        {
          value: 'stains',
          label: 'Some stains or fading',
          points: 1,
          weights: { reuse: 1, donate: -1 },
        },
        {
          value: 'mouldy',
          label: 'Mouldy or musty',
          points: 0,
          weights: { recycle: 2 },
          rules: ['moldy-textile'],
        },
      ],
    },
    {
      id: 'tex-fabric',
      type: 'choice',
      label: 'Is the fabric itself still strong?',
      options: [
        {
          value: 'strong',
          label: 'Yes, strong',
          points: 3,
          weights: { reuse: 2, donate: 1 },
          note: 'Strong fabric is raw material for dozens of upcycling projects.',
        },
        {
          value: 'thinning',
          label: 'Thinning in places',
          points: 1,
          weights: { reuse: 1, recycle: 1 },
        },
      ],
    },
  ],
  'Furniture & Wood': [
    {
      id: 'fur-structure',
      type: 'choice',
      label: 'How is the structure?',
      options: [
        { value: 'sturdy', label: 'Sturdy', points: 3, weights: { donate: 2, reuse: 1 } },
        {
          value: 'wobbly',
          label: 'Wobbly joints',
          points: 1,
          weights: { repair: 2 },
          note: 'Loose joints are a classic glue-and-clamp fix.',
        },
        {
          value: 'broken',
          label: 'Broken parts',
          points: 0,
          weights: { repair: 1, recycle: 1 },
        },
        {
          value: 'rot',
          label: 'Rot or wood-worm',
          points: 0,
          weights: { recycle: 3 },
          rules: ['rotten-wood'],
        },
      ],
    },
    {
      id: 'fur-surface',
      type: 'choice',
      label: 'How is the surface?',
      options: [
        { value: 'good', label: 'Good', points: 3, weights: { donate: 1 } },
        {
          value: 'scratched',
          label: 'Scratched or dull',
          points: 1,
          weights: { repair: 1, reuse: 2 },
          note: 'A sand and a coat of oil makes scratches vanish — a satisfying weekend job.',
        },
        { value: 'water', label: 'Water damage or stains', points: 0, weights: { reuse: 1, recycle: 1 } },
      ],
    },
  ],
  Household: [
    {
      id: 'hou-intact',
      type: 'choice',
      label: 'Is it free of chips, cracks or breaks?',
      options: [
        { value: 'yes', label: 'Yes, intact', points: 3, weights: { donate: 2 } },
        {
          value: 'chips',
          label: 'Minor chips',
          points: 1,
          weights: { reuse: 2 },
          note: 'A small chip doesn’t stop a jar storing rice or a mug holding pencils.',
        },
        {
          value: 'cracked',
          label: 'Cracked or broken',
          points: 0,
          weights: { recycle: 2 },
          rules: ['cracked-glass'],
        },
      ],
    },
    {
      id: 'hou-clean',
      type: 'choice',
      label: 'How clean is it?',
      options: [
        { value: 'yes', label: 'Clean', points: 3, weights: { donate: 1, reuse: 1 } },
        {
          value: 'needs-wash',
          label: 'Needs a wash',
          points: 2,
          weights: { reuse: 1 },
          note: 'A good wash unlocks most options — including donation.',
        },
        { value: 'stained', label: 'Permanently stained', points: 0, weights: { reuse: 1, recycle: 1 } },
      ],
    },
  ],
  'Garden & Outdoor': [
    {
      id: 'gar-breaks',
      type: 'choice',
      label: 'Any cracks or breaks?',
      options: [
        { value: 'none', label: 'None', points: 3, weights: { donate: 2, reuse: 1 } },
        {
          value: 'small',
          label: 'Small ones',
          points: 1,
          weights: { reuse: 2, repair: 1 },
          note: 'A cracked pot is still a planter — drainage comes free.',
        },
        { value: 'major', label: 'Major breakage', points: 0, weights: { recycle: 2 } },
      ],
    },
    {
      id: 'gar-weather',
      type: 'choice',
      label: 'Any weather damage?',
      options: [
        { value: 'none', label: 'None', points: 3, weights: { donate: 1 } },
        {
          value: 'surface',
          label: 'Surface wear only',
          points: 1,
          weights: { repair: 1, reuse: 1 },
          note: 'A clean and a re-seal brings most garden items right back.',
        },
        { value: 'severe', label: 'Severe damage', points: 0, weights: { recycle: 2 } },
      ],
    },
  ],
}

/** Common questions + the category-specific set, in order. */
export function getQuestions(category) {
  return [...COMMON, ...(CATEGORY_SPECIFIC[category] || [])]
}
