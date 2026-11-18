import { ITEMS } from '../data/items.js'

// Item search — powers the universal search on Explore.
// ------------------------------------------------------
// Matches a free-text query against the item knowledge base with simple,
// transparent scoring. When nothing matches, guessCategory() gives the
// decision framework a category hint from keywords.

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function singular(s) {
  // Naive but effective for our vocabulary: "bottles" → "bottle", "boxes" → "box"
  if (s.endsWith('ies') && s.length > 4) return `${s.slice(0, -3)}y`
  if (s.endsWith('ses')) return s.slice(0, -2)
  if (s.endsWith('s') && !s.endsWith('ss') && s.length > 3) return s.slice(0, -1)
  return s
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Whole-word containment: does `text` contain `word` on word boundaries? */
function containsWord(text, word) {
  return new RegExp(`\\b${escapeRegex(word)}\\b`).test(text)
}

/**
 * Search the item knowledge base.
 * @param {string} query - raw user input
 * @returns {Array} best-matching items (max 3), best first
 */
export function searchItems(query) {
  const q = normalize(query)
  if (!q) return []
  const qs = singular(q)

  const scored = []
  for (const item of ITEMS) {
    let best = 0
    for (const key of item.keys) {
      const k = normalize(key)
      const ks = singular(k)
      if (qs === k || qs === ks) best = Math.max(best, 100)
      else if (containsWord(qs, k) || containsWord(qs, ks)) best = Math.max(best, 60 + k.length)
      else if (qs.length >= 3 && (containsWord(k, qs) || containsWord(ks, qs)))
        best = Math.max(best, 40 + qs.length)
    }
    if (best > 0) scored.push({ item, score: best })
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.item)
}

// Keyword hints for guessing a category when no item matched.
const CATEGORY_HINTS = [
  [
    'Electronics',
    ['phone', 'mobile', 'laptop', 'computer', 'electronic', 'electric', 'battery', 'charger', 'cable', 'wire', 'device', 'gadget', 'remote', 'screen', 'tv', 'television', 'speaker', 'camera', 'printer', 'console', 'gaming', 'headphone', 'earphone', 'bluetooth', 'usb', 'wifi', 'router', 'tab', 'tablet', 'watch', 'appliance', 'fridge', 'refrigerator', 'microwave', 'washing machine', 'mixer', 'fan', 'iron', 'kettle', 'toaster', 'cooler', 'ac ', 'air conditioner', 'heater', 'vacuum', 'ups'],
  ],
  [
    'Clothing & Textiles',
    ['cloth', 'clothes', 'clothing', 'wear', 'shirt', 'jean', 'denim', 'saree', 'sari', 'kurta', 'dress', 'frock', 'skirt', 'jacket', 'coat', 'sweater', 'hoodie', 'sock', 'shoe', 'footwear', 'sneaker', 'sandal', 'chappal', 'boot', 'fabric', 'textile', 'linen', 'bedsheet', 'sheet', 'curtain', 'towel', 'blanket', 'quilt', 'pillow', 'cushion', 'bag', 'backpack', 'purse', 'scarf', 'dupatta', 'shawl', 'wool', 'yarn'],
  ],
  [
    'Furniture & Wood',
    ['furniture', 'chair', 'table', 'desk', 'bed', 'cot', 'mattress', 'sofa', 'couch', 'divan', 'wardrobe', 'cupboard', 'almirah', 'cabinet', 'drawer', 'shelf', 'bookshelf', 'bench', 'stool', 'ladder', 'wood', 'timber', 'pallet', 'crate'],
  ],
  [
    'Household',
    ['household', 'kitchen', 'jar', 'bottle', 'tin', 'can', 'utensil', 'plate', 'bowl', 'mug', 'cup', 'cutlery', 'pan', 'pot', 'cookware', 'crockery', 'toy', 'game', 'puzzle', 'book', 'magazine', 'newspaper', 'paper', 'cardboard', 'box', 'carton', 'bulb', 'lamp', 'medicine', 'cosmetic', 'shampoo', 'toothbrush', 'cd', 'dvd', 'cassette', 'bucket', 'tub', 'bin', 'mop', 'broom'],
  ],
  [
    'Garden & Outdoor',
    ['garden', 'plant', 'pot', 'planter', 'seed', 'soil', 'compost', 'hose', 'watering', 'spade', 'trowel', 'rake', 'tool', 'outdoor', 'patio', 'lawn'],
  ],
]

/**
 * Guess a likely category from the query text (for unmatched searches).
 * @returns {string|null} category name or null
 */
export function guessCategory(query) {
  const q = normalize(query)
  if (!q) return null
  let best = null
  let bestHits = 0
  for (const [category, hints] of CATEGORY_HINTS) {
    const hits = hints.reduce((n, h) => (q.includes(h) ? n + 1 : n), 0)
    if (hits > bestHits) {
      bestHits = hits
      best = category
    }
  }
  return bestHits > 0 ? best : null
}
