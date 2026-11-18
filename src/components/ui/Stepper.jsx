import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Progress stepper for the scan wizard.
 * Completed steps are clickable (go back); the current and future ones are not.
 */
export default function Stepper({ steps, current, onStepClick }) {
  return (
    <ol className="stepper" aria-label="Scan progress">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'upcoming'
        const clickable = i < current && onStepClick
        return (
          <li key={label} className={cn('stepper__item', `stepper__item--${state}`)}>
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onStepClick(i)}
              aria-current={state === 'active' ? 'step' : undefined}
              className="stepper__btn"
            >
              <span className="stepper__dot">
                {state === 'done' ? <Check size={14} aria-hidden="true" /> : i + 1}
              </span>
              <span className="stepper__label">{label}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
