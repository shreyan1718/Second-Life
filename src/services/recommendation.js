import { PATHWAYS } from '../data/pathways.js'
import { SAFETY_RULES } from '../data/rules.js'

// Recommendation engine (Phase 4).
// --------------------------------
// Transparent, rule-based scoring: every questionnaire answer contributes
// weights to the four pathways; safety rules can override the ranking
// entirely. The output always includes the reasoning, so the user sees
// *why* a pathway was recommended — nothing is a black box.

const BASE_WEIGHTS = {
  Electronics: { repair: 1, reuse: 0, donate: 2, recycle: 1 },
  'Clothing & Textiles': { repair: 0, reuse: 2, donate: 2, recycle: 0 },
  'Furniture & Wood': { repair: 1, reuse: 1, donate: 1, recycle: 0 },
  Household: { repair: 0, reuse: 2, donate: 1, recycle: 0 },
  'Garden & Outdoor': { repair: 0, reuse: 2, donate: 1, recycle: 0 },
}

const CATEGORY_NOTES = {
  Electronics:
    'Electronics are always in demand for donation — and even broken devices contain recoverable metals.',
  'Clothing & Textiles': 'Textiles are famously easy to pass on or repurpose when they’re clean.',
  'Furniture & Wood': 'Quality wood furniture is prized by charities and upcyclers alike.',
  Household: 'Household items are the workhorses of reuse — jars, boxes and trays never die.',
  'Garden & Outdoor': 'Garden gear is tough stuff — it usually has more seasons in it.',
}

const PATHWAY_LINES = {
  repair:
    'Repairing keeps the item’s whole embedded carbon working for you — no new materials, no new manufacturing.',
  reuse: 'Reusing costs nothing extra and turns something unused into something useful again.',
  donate: 'Donation passes a working item directly to someone who needs it — the purest form of reuse.',
  recycle: 'Recycling recovers the raw materials so they can become something new instead of landfill.',
}

const CONDITION_LABELS = [
  { min: 80, label: 'Excellent' },
  { min: 55, label: 'Good' },
  { min: 30, label: 'Fair' },
  { min: 0, label: 'Poor' },
]

/**
 * Build a recommendation from the questionnaire answers.
 *
 * @param {string} category - Second Life category
 * @param {Array} questions - question objects (from getQuestions)
 * @param {Object} answers - { questionId: value | value[] }
 */
export function recommend(category, questions, answers) {
  const totals = { repair: 0, reuse: 0, donate: 0, recycle: 0 }
  Object.assign(totals, BASE_WEIGHTS[category] || { repair: 1, reuse: 1, donate: 1, recycle: 1 })

  let points = 0
  let maxPoints = 0
  const reasons = []
  const triggeredRuleIds = []

  for (const q of questions) {
    const sel = answers[q.id]
    if (sel == null) continue
    const values = Array.isArray(sel) ? sel : [sel]
    // For multi-select questions, an exclusive "none of these" resets the rest.
    const effective =
      q.type === 'multi' && q.noneValue && values.includes(q.noneValue) ? [q.noneValue] : values

    for (const v of effective) {
      const o = q.options.find((opt) => opt.value === v)
      if (!o) continue
      for (const [k, w] of Object.entries(o.weights || {})) {
        totals[k] += w
      }
      points += o.points || 0
      if (o.note) reasons.push(o.note)
      if (o.rules) triggeredRuleIds.push(...o.rules)
    }
    maxPoints += Math.max(...q.options.map((o) => o.points || 0))
  }

  // Condition score + label.
  const conditionScore = Math.round((points / (maxPoints || 1)) * 100)
  const conditionLabel =
    (CONDITION_LABELS.find((c) => conditionScore >= c.min) || CONDITION_LABELS[3]).label

  // Safety rules first: if any rule fired, the most urgent one wins.
  const safety = SAFETY_RULES.filter((r) => triggeredRuleIds.includes(r.id))
  const enforcedRule = [...safety].sort((a, b) => a.priority - b.priority)[0] || null

  // Rank pathways by score, clamped at zero.
  const ranked = PATHWAYS.map((p) => ({ ...p, score: Math.max(0, totals[p.key]) })).sort(
    (a, b) => b.score - a.score,
  )
  const sum = ranked.reduce((s, p) => s + p.score, 0) || 1
  const withPct = ranked.map((p) => ({
    key: p.key,
    label: p.label,
    tagline: p.tagline,
    pct: Math.max(4, Math.round((p.score / sum) * 100)),
  }))

  const primary = enforcedRule ? enforcedRule.enforce : withPct[0].key
  const alternatives = withPct.filter((p) => p.key !== primary)

  // Reasoning shown to the user: category context → answer notes → pathway line.
  const primaryReasons = [
    ...(CATEGORY_NOTES[category] ? [CATEGORY_NOTES[category]] : []),
    ...reasons,
    PATHWAY_LINES[primary],
  ].slice(0, 6)

  return {
    primary,
    alternatives,
    safety,
    enforcedRule: enforcedRule ? enforcedRule.id : null,
    conditionScore,
    conditionLabel,
    reasons: primaryReasons,
  }
}
