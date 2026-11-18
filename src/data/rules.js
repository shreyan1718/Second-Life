// Safety rules (Phase 4).
// -----------------------
// Hard overrides applied by the recommendation engine. When an answer
// triggers a rule, the enforced pathway becomes the primary recommendation
// regardless of the score ranking, and the message is displayed prominently.

export const SAFETY_RULES = [
  {
    id: 'battery-damaged',
    priority: 1,
    enforce: 'recycle',
    message:
      'Swollen or damaged lithium batteries are a fire risk. Never donate them, never bin them — hand the device to an e-waste collection point as soon as possible.',
  },
  {
    id: 'moldy-textile',
    priority: 2,
    enforce: 'recycle',
    message:
      'Mouldy fabric can’t be donated or safely reused. Seal it in a bag and use textile recycling so the spores don’t spread at home.',
  },
  {
    id: 'rotten-wood',
    priority: 3,
    enforce: 'recycle',
    message:
      'Wood with rot or pest damage shouldn’t be reused or burnt indoors — it can spread to your other furniture. Recycle it as wood waste.',
  },
  {
    id: 'cracked-glass',
    priority: 4,
    enforce: 'recycle',
    message:
      'Cracked glass and ceramics can fail suddenly. Wrap them carefully and recycle — never donate items that could cut someone.',
  },
]
