// Impact estimation model (Phase 7).
// -------------------------------
// Waste diverted is estimated from typical item weights per category. These
// are honest rough averages for common household objects — the dashboard
// always labels the figure as an estimate.

export const CATEGORY_WEIGHTS_KG = {
  Electronics: 1.5,
  'Clothing & Textiles': 0.6,
  'Furniture & Wood': 8.0,
  Household: 0.8,
  'Garden & Outdoor': 2.0,
}

/** Estimated kilograms kept out of landfill for one completed item. */
export function estimateDivertedKg(scan) {
  if (!scan.completed) return 0
  return CATEGORY_WEIGHTS_KG[scan.category] ?? 1.0
}

/** Total estimated kilograms for a list of scans (completed items only). */
export function totalDivertedKg(scans) {
  const kg = scans.reduce((sum, s) => sum + estimateDivertedKg(s), 0)
  return Math.round(kg * 10) / 10
}

// Fixed chart colours per pathway (forest→emerald ramp, on-palette).
export const PATHWAY_COLORS = {
  repair: '#067A5B',
  reuse: '#10B981',
  donate: '#6EE7B7',
  recycle: '#2D6A4F',
}
