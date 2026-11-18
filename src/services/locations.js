// Location-based drop-off discovery (Phase 6).
// ---------------------------------------------
// Queries real, public, keyless services:
//   • Nominatim (OpenStreetMap) — turns a place name into coordinates
//   • Overpass API  — finds recycling points, charity shops and second-hand
//                     shops around those coordinates
// No API keys, no accounts, no tracking. When the app runs somewhere without
// internet access (like the sandboxed preview frame), these calls fail and
// the UI explains that honestly instead of showing invented results.

const RADIUS = 12000 // metres
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error('network')
  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) throw new Error('notfound')
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), displayName: data[0].display_name }
}

async function overpass(lat, lon) {
  const around = `(around:${RADIUS},${lat},${lon})`
  const q = `[out:json][timeout:25];(node["amenity"="recycling"]${around};way["amenity"="recycling"]${around};node["shop"="charity"]${around};way["shop"="charity"]${around};node["shop"="second_hand"]${around};way["shop"="second_hand"]${around};);out center 60;`

  let data = null
  let lastErr = null
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(q)}`,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data = await res.json()
      break
    } catch (e) {
      lastErr = e
    }
  }
  if (!data) throw new Error('network')

  const TYPE_LABELS = {
    recycling: 'Recycling point',
    charity: 'Charity shop',
    second_hand: 'Second-hand shop',
  }

  return (data.elements || [])
    .map((el) => {
      const tags = el.tags || {}
      const pLat = el.lat ?? el.center?.lat
      const pLon = el.lon ?? el.center?.lon
      if (pLat == null || pLon == null) return null
      const kind = tags.amenity === 'recycling' ? 'recycling' : tags.shop
      const accepts = Object.entries(tags)
        .filter(([k, v]) => k.startsWith('recycling:') && v === 'yes')
        .map(([k]) => k.slice('recycling:'.length).replace(/_/g, ' '))
      return {
        id: `${el.type}/${el.id}`,
        name: tags.name || 'Unnamed drop-off point',
        kind,
        kindLabel: TYPE_LABELS[kind] || 'Drop-off point',
        lat: pLat,
        lon: pLon,
        accepts,
        distance: haversine(lat, lon, pLat, pLon),
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance)
}

/**
 * Search for drop-off points near a place name.
 * Returns { location, points }.
 */
export async function searchDropOffPoints(query) {
  const location = await geocode(query)
  const points = await overpass(location.lat, location.lon)
  return { location: location.displayName, points }
}

/**
 * Search for drop-off points around the browser's coordinates.
 * Returns { location, points }.
 */
export async function searchNearCoordinates(lat, lon) {
  const points = await overpass(lat, lon)
  return { location: 'your current location', points }
}
