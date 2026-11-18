import { useEffect, useRef, useState } from 'react'
import { Camera, X, Focus } from 'lucide-react'
import Button from '../ui/Button.jsx'

/**
 * Full-screen camera capture modal.
 * Opens the device camera, lets the user frame the item and capture a still,
 * then hands the photo back as a File. Handles permission/no-camera errors.
 */
export default function CameraCapture({ onClose, onCapture }) {
  const videoRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let stream
    let cancelled = false

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('This browser does not support camera access — please upload a photo instead.')
      return
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        stream = s
        if (videoRef.current) videoRef.current.srcObject = s
      })
      .catch((err) => {
        if (cancelled) return
        if (err.name === 'NotAllowedError') {
          setError(
            'Camera permission was blocked. Allow camera access in your browser settings, or upload a photo instead.',
          )
        } else if (err.name === 'NotFoundError') {
          setError('No camera was found on this device — try uploading a photo instead.')
        } else {
          setError('The camera could not be started — please upload a photo instead.')
        }
      })

    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  function capture() {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        onCapture(new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' }))
      },
      'image/jpeg',
      0.9,
    )
  }

  return (
    <div
      className="camera-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Camera capture"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="camera-modal__card">
        <video ref={videoRef} className="camera-modal__video" autoPlay playsInline muted />
        <p className="camera-modal__hint">
          <Focus size={15} aria-hidden="true" />
          Fill the frame with one item, in good light
        </p>
        {error && <p className="camera-modal__error">{error}</p>}
        <div className="camera-modal__actions">
          <Button onClick={capture} disabled={!!error}>
            <Camera size={17} aria-hidden="true" />
            Capture photo
          </Button>
          <Button variant="secondary" onClick={onClose}>
            <X size={16} aria-hidden="true" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
