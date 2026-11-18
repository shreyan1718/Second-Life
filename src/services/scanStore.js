// Scan-session persistence (Phase 3 → extended in Phase 7).
// ---------------------------------------------------------------------------
// Completed scans are stored locally in the browser. localStorage is wrapped
// in try/catch because sandboxed preview frames block storage access — in
// that case an in-memory store keeps the session working (records simply
// don't survive a reload). A real database arrives in a later phase.

const KEY = 'second-life:scans'
const MAX_RECORDS = 50

let memoryStore = []

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return memoryStore
  }
}

function write(scans) {
  memoryStore = scans
  try {
    localStorage.setItem(KEY, JSON.stringify(scans))
  } catch {
    // Storage unavailable (e.g. sandboxed frame) — memory store is enough.
  }
}

export function getScans() {
  return read()
}

/** Insert or update (upsert) a scan record by id. */
export function saveScan(record) {
  const scans = read()
  const i = scans.findIndex((s) => s.id === record.id)
  if (i >= 0) {
    scans[i] = record
  } else {
    scans.unshift(record)
    if (scans.length > MAX_RECORDS) scans.length = MAX_RECORDS
  }
  write(scans)
  return record
}

/**
 * Confirm (or un-confirm) what the user actually did with an item.
 * @param {string} id - scan id
 * @param {string|null} pathway - one of repair/reuse/donate/recycle, or null to undo
 */
export function setCompleted(id, pathway) {
  const scans = read()
  const i = scans.findIndex((s) => s.id === id)
  if (i < 0) return null
  if (pathway) {
    scans[i].completed = { pathway, at: new Date().toISOString() }
  } else {
    delete scans[i].completed
  }
  write(scans)
  return scans[i]
}

/** Remove a single scan from the history. */
export function deleteScan(id) {
  const scans = read()
  const next = scans.filter((s) => s.id !== id)
  write(next)
  return next
}

/** Remove the entire history. */
export function clearScans() {
  memoryStore = []
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
