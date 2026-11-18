import { cn } from '../../utils/cn'

/**
 * Dynamic condition questionnaire (Phase 3).
 * Renders single-choice questions as pill buttons and multi-choice questions
 * with an exclusive "None of these" option. Validation state is passed in.
 */
export default function Questionnaire({ questions, answers, onChange, errors }) {
  return (
    <div className="questionnaire">
      {questions.map((q) => {
        const selected = answers[q.id]
        const values = Array.isArray(selected) ? selected : selected != null ? [selected] : []
        return (
          <fieldset
            key={q.id}
            className={cn('question-card', errors?.[q.id] && 'question-card--error')}
            aria-invalid={errors?.[q.id] ? 'true' : undefined}
          >
            <legend>{q.label}</legend>
            {q.help && <p className="question-card__help">{q.help}</p>}
            <div className="question-card__options">
              {q.options.map((o) => {
                const isSelected = values.includes(o.value)
                return (
                  <button
                    type="button"
                    key={o.value}
                    className={cn('option-pill', isSelected && 'option-pill--selected')}
                    aria-pressed={isSelected}
                    onClick={() => onChange(q, o.value)}
                  >
                    {q.type === 'multi' && <span className="option-pill__box" aria-hidden="true" />}
                    {o.label}
                  </button>
                )
              })}
            </div>
            {errors?.[q.id] && <p className="question-card__error">Please choose an answer.</p>}
          </fieldset>
        )
      })}
    </div>
  )
}
