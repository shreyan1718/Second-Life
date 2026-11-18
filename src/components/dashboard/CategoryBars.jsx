import { useState } from 'react'

/** Interactive horizontal bar chart — items analysed per category. */
export default function CategoryBars({ data, title }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(1, ...data.map((d) => d.count))
  const total = data.reduce((s, d) => s + d.count, 0)

  return (
    <div className="chart-card card">
      <h3>{title}</h3>
      {total === 0 ? (
        <div className="chart-card__empty">
          <p>Nothing analysed yet — your categories will appear here.</p>
        </div>
      ) : (
        <ul className="bars">
          {data.map((d) => (
            <li
              key={d.label}
              className={hover === d.label ? 'is-hover' : undefined}
              onMouseEnter={() => setHover(d.label)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="bars__label">{d.label}</span>
              <span className="bars__track">
                <span
                  className="bars__fill"
                  style={{ width: `${(d.count / max) * 100}%` }}
                />
              </span>
              <span className="bars__count">{d.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
