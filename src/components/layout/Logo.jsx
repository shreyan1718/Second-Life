import { useId } from 'react'
import { cn } from '../../utils/cn'

/**
 * Second Life brand mark — a leaf inside a circular "second life" loop,
 * on a gradient tile. Wordmark sits beside it.
 */
export default function Logo({ className }) {
  const gid = `slg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <span className={cn('logo', className)}>
      <svg className="logo__mark" viewBox="0 0 64 64" role="img" aria-label="Second Life logo">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34D399" />
            <stop offset="1" stopColor="#0B3B2A" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="17" fill={`url(#${gid})`} />
        <path
          d="M32 16.5A15.5 15.5 0 1 1 16.5 32"
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path d="M16.5 23.5 11 34.5h11z" fill="#fff" />
        <path d="M33 23c7 4 7 14 0 20-7-6-7-16 0-20z" fill="#fff" />
        <path d="M33 26.5v13" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="logo__word">
        Second&nbsp;<span className="logo__word-accent">Life</span>
      </span>
    </span>
  )
}
