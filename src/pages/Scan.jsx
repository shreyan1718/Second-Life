import { useEffect, useRef, useState } from 'react'
import {
  Upload,
  Camera,
  Trash2,
  ScanSearch,
  BadgeCheck,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  PenLine,
  HelpCircle,
  Cpu,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Stepper from '../components/ui/Stepper.jsx'
import CameraCapture from '../components/scan/CameraCapture.jsx'
import Questionnaire from '../components/scan/Questionnaire.jsx'
import Recommendation from '../components/scan/Recommendation.jsx'
import { recognizeObject, getModelStatus } from '../services/recognition.js'
import { getQuestions } from '../data/questions.js'
import { recommend } from '../services/recommendation.js'
import { saveScan } from '../services/scanStore.js'
import { CATEGORIES } from '../data/ideas.js'
import { cn } from '../utils/cn'
import usePageTitle from '../hooks/usePageTitle.js'

const MAX_SIZE = 8 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ANALYSIS_HINTS = [
  'Reading your photo…',
  'Detecting edges and textures…',
  'Matching against known object types…',
  'Narrowing down the best match…',
]
const STEPS = ['Identify', 'Condition', 'Recommendation']
const STEP_INDEX = { identify: 0, condition: 1, recommendation: 2 }

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/** Small JPEG thumbnail (data URL) of the scan photo, for stored records. */
function makeThumbnail(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      try {
        const scale = Math.min(1, 240 / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(img.width * scale))
        canvas.height = Math.max(1, Math.round(img.height * scale))
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.72))
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = url
  })
}

export default function Scan() {
  usePageTitle('Scan an Item · Second Life')
  const [step, setStep] = useState('identify')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle') // idle | ready | analyzing | done
  const [result, setResult] = useState(null)
  const [correctedCategory, setCorrectedCategory] = useState(null)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [hint, setHint] = useState(ANALYSIS_HINTS[0])
  const [aiStatus, setAiStatus] = useState('loading') // loading | ready | unavailable
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})
  const [rec, setRec] = useState(null)
  const inputRef = useRef(null)
  const flowId = useRef(makeId())

  // Preload the on-device model and show its real status in the badge.
  useEffect(() => {
    let cancelled = false
    getModelStatus().then((s) => {
      if (!cancelled) setAiStatus(s)
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Release object URLs when they’re replaced or the page unmounts.
  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    },
    [previewUrl],
  )

  // Cycle status messages while analysing.
  useEffect(() => {
    if (status !== 'analyzing') return
    let i = 0
    const timer = setInterval(() => {
      i = (i + 1) % ANALYSIS_HINTS.length
      setHint(ANALYSIS_HINTS[i])
    }, 950)
    return () => clearInterval(timer)
  }, [status])

  function acceptFile(f) {
    if (!f) return
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError('That file type isn’t supported — please choose a JPG, PNG or WebP photo.')
      return
    }
    if (f.size > MAX_SIZE) {
      setError(`That photo is ${formatSize(f.size)} — please choose one under 8 MB.`)
      return
    }
    setError(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    flowId.current = makeId()
    setFile(f)
    setPreviewUrl(URL.createObjectURL(f))
    setResult(null)
    setCorrectedCategory(null)
    setAnswers({})
    setErrors({})
    setRec(null)
    setStatus('ready')
    setStep('identify')
  }

  function clearImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    flowId.current = makeId()
    setPreviewUrl(null)
    setFile(null)
    setResult(null)
    setCorrectedCategory(null)
    setError(null)
    setStatus('idle')
    setAnswers({})
    setErrors({})
    setRec(null)
    setStep('identify')
  }

  async function analyze() {
    if (!file || status !== 'ready' || !previewUrl) return
    setStatus('analyzing')
    setHint(ANALYSIS_HINTS[0])
    setError(null)
    try {
      const r = await recognizeObject(previewUrl)
      setResult(r)
      setStatus('done')
    } catch {
      setError('Something went wrong while analysing the photo — please try again.')
      setStatus('ready')
    }
  }

  function handleAnswer(q, value) {
    setErrors((e) => {
      const next = { ...e }
      delete next[q.id]
      return next
    })
    setAnswers((prev) => {
      if (q.type === 'multi') {
        const cur = prev[q.id] || []
        // Exclusive "none of these": selecting it clears everything else.
        if (value === q.noneValue) return { ...prev, [q.id]: [value] }
        const next = cur.includes(value)
          ? cur.filter((v) => v !== value)
          : [...cur.filter((v) => v !== q.noneValue), value]
        return { ...prev, [q.id]: next }
      }
      return { ...prev, [q.id]: value }
    })
  }

  async function goToRecommendation() {
    const questions = getQuestions(displayCategory)
    const errs = {}
    for (const q of questions) {
      const a = answers[q.id]
      const missing = q.type === 'multi' ? !a || a.length === 0 : !a
      if (missing) errs[q.id] = true
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setError(
        `Please answer the remaining question${Object.keys(errs).length > 1 ? 's' : ''} — they all shape your recommendation.`,
      )
      if (typeof document !== 'undefined') {
        document
          .querySelector('.question-card--error')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setError(null)
    const r = recommend(displayCategory, questions, answers)
    setRec(r)
    setStep('recommendation')

    // Persist the completed scan ( groundwork for the Phase 7 dashboard).
    const thumbnail = await makeThumbnail(previewUrl)
    saveScan({
      id: flowId.current,
      createdAt: new Date().toISOString(),
      name: result?.name || 'Your item',
      category: displayCategory,
      source: result?.name ? (correctedCategory ? 'corrected' : 'ai') : 'manual',
      confidence: result?.confidence ?? null,
      thumbnail,
      answers,
      conditionScore: r.conditionScore,
      conditionLabel: r.conditionLabel,
      primary: r.primary,
      alternatives: r.alternatives.map((a) => ({ key: a.key, pct: a.pct })),
      safety: r.safety.map((s) => s.id),
    })
  }

  const analyzing = status === 'analyzing'
  const done = status === 'done' && result
  const identified = done && result.name
  const needsInput = done && (result.unrecognized || result.modelUnavailable)
  const displayCategory = correctedCategory ?? result?.category ?? ''
  const questions = getQuestions(displayCategory || 'Household')
  const stepIndex = STEP_INDEX[step]

  return (
    <div className="page-scan">
      <header className="scan-hero">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Scan an item"
            title="Show us what you’re parting with"
            lead="Upload or snap a photo, answer a few quick questions about the item’s condition, and get a personalised action plan — repair, reuse, donate or recycle — with reasoning you can trust."
          />
          <div className="scan-hero__note">
            {aiStatus === 'loading' && (
              <Badge variant="outline">
                <span className="spinner spinner--sm" aria-hidden="true" />
                Loading on-device AI model…
              </Badge>
            )}
            {aiStatus === 'ready' && (
              <Badge variant="outline">
                <Cpu size={13} aria-hidden="true" />
                On-device AI ready — photos never leave your browser
              </Badge>
            )}
            {aiStatus === 'unavailable' && (
              <Badge variant="outline">
                <AlertTriangle size={13} aria-hidden="true" />
                AI model unavailable — manual category mode
              </Badge>
            )}
          </div>
        </div>
      </header>

      <section className="scan-body" aria-label="Scan an item">
        <div className="container">
          {error && (
            <div className="scan-error" role="alert">
              <AlertTriangle size={17} aria-hidden="true" />
              {error}
            </div>
          )}

          <div className={cn('scan-card card', step !== 'identify' && 'scan-card--wide')}>
            <Stepper
              steps={STEPS}
              current={stepIndex}
              onStepClick={(i) => setStep(Object.keys(STEP_INDEX)[i])}
            />

            {/* ------------------------------------------------ STEP 1: IDENTIFY */}
            {step === 'identify' && (
              <>
                {!previewUrl ? (
                  <div
                    className={cn('dropzone', dragOver && 'dropzone--over')}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragOver(true)
                    }}
                    onDragLeave={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(false)
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragOver(false)
                      acceptFile(e.dataTransfer.files[0])
                    }}
                  >
                    <span className="tile tile--lg">
                      <Upload size={24} aria-hidden="true" />
                    </span>
                    <span className="dropzone__title">Drag &amp; drop a photo here</span>
                    <span className="dropzone__sub">JPG, PNG or WebP — up to 8 MB</span>
                    <div className="dropzone__actions">
                      <Button onClick={() => inputRef.current?.click()}>
                        <Upload size={16} aria-hidden="true" />
                        Browse files
                      </Button>
                      <Button variant="secondary" onClick={() => setCameraOpen(true)}>
                        <Camera size={16} aria-hidden="true" />
                        Use camera
                      </Button>
                    </div>
                    <span className="dropzone__hint">
                      Your photo stays on your device — the AI model runs entirely in your browser.
                    </span>
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="visually-hidden"
                      aria-label="Choose a photo to upload"
                      onChange={(e) => {
                        acceptFile(e.target.files[0])
                        e.target.value = ''
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="scan-preview">
                      <img
                        src={previewUrl}
                        alt="Preview of the item you’re scanning"
                        className="scan-preview__img"
                      />
                      {analyzing && (
                        <div className="scan-preview__overlay">
                          <span className="scan-preview__scanline" aria-hidden="true" />
                          <span className="scan-preview__status">
                            <span className="spinner" aria-hidden="true" />
                            {hint}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="scan-filebar">
                      <span className="scan-filebar__name">{file?.name}</span>
                      <span className="scan-filebar__size">{file && formatSize(file.size)}</span>
                      <span className="scan-filebar__spacer" />
                      <Button variant="ghost" size="sm" onClick={clearImage} disabled={analyzing}>
                        <Trash2 size={14} aria-hidden="true" />
                        Remove
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCameraOpen(true)}
                        disabled={analyzing}
                      >
                        <Camera size={14} aria-hidden="true" />
                        Retake
                      </Button>
                    </div>

                    {!done && (
                      <div className="scan-actions">
                        <Button size="lg" onClick={analyze} disabled={analyzing}>
                          <ScanSearch size={18} aria-hidden="true" />
                          {analyzing ? 'Analysing…' : 'Analyse item'}
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {done && (
                  <div className="scan-result">
                    <div className="scan-result__head">
                      <span className="tile tile--lg">
                        {identified ? (
                          <BadgeCheck size={26} aria-hidden="true" />
                        ) : (
                          <HelpCircle size={26} aria-hidden="true" />
                        )}
                      </span>
                      <div>
                        <span className="scan-result__label">
                          {identified
                            ? 'Identified'
                            : result.modelUnavailable
                              ? 'AI unavailable'
                              : 'Not sure'}
                        </span>
                        <span className="scan-result__name">
                          {identified
                            ? result.name
                            : result.modelUnavailable
                              ? 'Automatic identification couldn’t run'
                              : 'We couldn’t identify this confidently'}
                        </span>
                      </div>
                      {identified && !correctedCategory && (
                        <Badge className="scan-result__conf">{result.confidence}% match</Badge>
                      )}
                    </div>

                    {result.modelUnavailable ? (
                      <div className="scan-warning" role="status">
                        <AlertTriangle size={17} aria-hidden="true" />
                        <span>
                          The AI model couldn’t run on this device, so the photo can’t be analysed
                          automatically right now. You can still pick the closest category below
                          and continue — nothing is guessed on your behalf.
                        </span>
                      </div>
                    ) : (
                      <>
                        {result.note && <p className="scan-result__note">{result.note}</p>}
                        {result.unrecognized && (
                          <p className="scan-result__note">
                            No need to worry — pick the closest category below and carry on.
                          </p>
                        )}
                      </>
                    )}

                    <div className="scan-result__chips">
                      {displayCategory && <Badge>Category: {displayCategory}</Badge>}
                      {correctedCategory && <Badge variant="outline">Corrected by you</Badge>}
                      {result.unrecognized && <Badge variant="outline">Low confidence</Badge>}
                    </div>

                    <div className="scan-correct">
                      <label className="scan-correct__label" htmlFor="category-select">
                        <PenLine size={14} aria-hidden="true" />
                        {identified
                          ? 'Not right? Correct the category'
                          : 'Choose the closest category'}
                      </label>
                      <div className="scan-correct__row">
                        <select
                          id="category-select"
                          className="scan-select"
                          value={displayCategory}
                          onChange={(e) => setCorrectedCategory(e.target.value)}
                        >
                          <option value="" disabled>
                            Choose a category…
                          </option>
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="scan-result__actions">
                      {displayCategory ? (
                        <>
                          <Button onClick={() => setStep('condition')} size="lg">
                            Continue to condition <ArrowRight size={17} aria-hidden="true" />
                          </Button>
                          <Button
                            variant="secondary"
                            to={`/explore?category=${encodeURIComponent(displayCategory)}`}
                          >
                            See {displayCategory} ideas
                          </Button>
                        </>
                      ) : (
                        <span className="scan-result__next">
                          <Info size={14} aria-hidden="true" />
                          Pick a category above to continue.
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ------------------------------------------------ STEP 2: CONDITION */}
            {step === 'condition' && (
              <>
                <div className="scan-flowhead">
                  {previewUrl && (
                    <img src={previewUrl} alt="" className="scan-flowhead__img" />
                  )}
                  <div>
                    <span className="scan-flowhead__name">
                      {result?.name || 'Your item'}
                    </span>
                    <span className="scan-flowhead__sub">
                      {displayCategory} · a few quick questions about its condition
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="scan-flowhead__back"
                    onClick={() => setStep('identify')}
                  >
                    <ArrowLeft size={14} aria-hidden="true" />
                    Change
                  </Button>
                </div>

                <Questionnaire
                  questions={questions}
                  answers={answers}
                  onChange={handleAnswer}
                  errors={errors}
                />

                <div className="scan-actions">
                  <Button variant="secondary" onClick={() => setStep('identify')}>
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back
                  </Button>
                  <Button size="lg" onClick={goToRecommendation}>
                    Get my recommendation <ArrowRight size={17} aria-hidden="true" />
                  </Button>
                </div>
              </>
            )}

            {/* ------------------------------------------ STEP 3: RECOMMENDATION */}
            {step === 'recommendation' && rec && (
              <>
                <Recommendation category={displayCategory} result={rec} />
                <div className="scan-actions">
                  <Button variant="secondary" onClick={() => setStep('condition')}>
                    <ArrowLeft size={16} aria-hidden="true" />
                    Review answers
                  </Button>
                  <Button onClick={clearImage}>
                    <RotateCcw size={16} aria-hidden="true" />
                    Scan another item
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {cameraOpen && (
        <CameraCapture
          onClose={() => setCameraOpen(false)}
          onCapture={(f) => {
            setCameraOpen(false)
            acceptFile(f)
          }}
        />
      )}
    </div>
  )
}
