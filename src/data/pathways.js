import { Wrench, Lightbulb, HeartHandshake, Recycle } from 'lucide-react'

// The four outcome pathways Second Life recommends.
export const PATHWAYS = [
  {
    key: 'repair',
    label: 'Repair',
    icon: Wrench,
    tagline: 'Fix it, don’t replace it',
    description:
      'Diagnose common faults, gather the right tools and spare parts, and follow step-by-step guidance that brings your item back to working life.',
    bestFor: 'Items with minor faults or wear',
    examples: ['Loose chair joints', 'Slow laptops', 'Torn seams'],
  },
  {
    key: 'reuse',
    label: 'Reuse',
    icon: Lightbulb,
    tagline: 'Turn old into new',
    description:
      'Creative repurposing ideas that transform what you already own into something genuinely useful — from furniture makeovers to garden planters.',
    bestFor: 'Intact items you no longer need',
    examples: ['Jar storage', 'Denim totes', 'Ladder shelves'],
  },
  {
    key: 'donate',
    label: 'Donate',
    icon: HeartHandshake,
    tagline: 'Pass it forward',
    description:
      'Find the right new home for items that still work — charities, shelters, libraries and community drives that can put them to good use.',
    bestFor: 'Working items in good condition',
    examples: ['Winter coats', 'Old phones', 'Used books'],
  },
  {
    key: 'recycle',
    label: 'Recycle',
    icon: Recycle,
    tagline: 'Close the loop',
    description:
      'Clear, practical instructions for responsible disposal — what can be recycled, how to prepare it, and where to take it in your area.',
    bestFor: 'Broken or unusable items',
    examples: ['E-waste', 'Cables & chargers', 'Batteries'],
  },
]

export const PATHWAY_MAP = Object.fromEntries(PATHWAYS.map((p) => [p.key, p]))
