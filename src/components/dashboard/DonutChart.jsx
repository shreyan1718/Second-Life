import { useState } from 'react'

/**
 * Interactive SVG donut chart. Hovering a segment highlights it and updates
 * the centre label. Hand-built — no chart library, ~3 kB.
 */
export default function DonutChart({ data, title }) {
  const [hover, setHover] = useState(null)
  const total = data.reduce((s, d) => s + d.count, 0)
  const active = hover != null ? data.find((d) => d.key === hover) : null

  // Geometry
  const R = 15.9155 // radius chosen so circumference = 100 (easy percentage math)
  const CX = 21
  const CY = 21
  let acc = 25 // start at 12 o'clock

  const segments = data.map((d) => {
    const frac = total ? d.count / total : 0
    const seg = { ...d, frac, offset: acc }
    acc = (acc + frac * 100) % 100
    return seg
  })

  return (
    <div className="chart-card card">
      <h3>{title}</h3>
      {total === 0 ? (
        <div className="chart-card__empty">
          <svg viewBox="0 0 42 42" className="donut" aria-hidden="true">
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--mint-100)" strokeWidth="6" />
          </svg>
          <p>No recommendations yet — scan an item to begin.</p>
        </div>
      ) : (
        <div className="donut__wrap">
          <svg viewBox="0 0 42 42" className="donut" role="img" aria-label={`${title} chart`}>
            {segments
              .filter((s) => s.count > 0)
              .map((s) => (
                <circle
                  key={s.key}
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={hover === s.key ? 7.5 : 6}
                  strokeDasharray={`${s.frac * 100 - 0.6} ${100 - (s.frac * 100 - 0.6)}`}
                  strokeDashoffset={s.offset}
                  opacity={hover == null || hover === s.key ? 1 : 0.35}
                  onMouseEnter={() => setHover(s.key)}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
            <text x={CX} y={CY - 0.6} textAnchor="middle" className="donut__value">
              {active ? active.count : total}
            </text>
            <text x={CX} y={CY + 3.4} textAnchor="middle" className="donut__label">
              {active ? active.label : 'total'}
            </text>
          </svg>

          <ul className="donut__legend">
            {data.map((d) => (
              <li
                key={d.key}
                className={hover === d.key ? 'is-hover' : undefined}
                onMouseEnter={() => setHover(d.key)}
                onMouseLeave={() => setHover(null)}
              >
                <span className="donut__dot" style={{ background: d.color }} />
                <span className="donut__legend-label">{d.label}</span>
                <span className="donut__legend-count">
                  {d.count}
                  {total > 0 && (
                    <small> · {Math.round((d.count / total) * 100)}%</small>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
