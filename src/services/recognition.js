import { CLASS_MAP } from '../data/objects.js'
import { IMAGENET_CLASSES } from '../data/imagenet-classes.js'

// Recognition service — REAL on-device AI, fully self-hosted
// ----------------------------------------------------------
// MobileNet v1 (ImageNet-trained CNN) runs in the browser via TensorFlow.js.
// The model weights are served from this app's own /public folder, so NO
// external network access is needed and photos never leave the user's device.
//
// If the model cannot run (unsupported browser), recogniseObject resolves to
// { modelUnavailable: true } — the UI then asks the user to pick a category
// manually. We NEVER fabricate an identification.

const MODEL_URL = '/models/mobilenet_v1_1.0_224/model.json'
const IMAGE_SIZE = 224
const MATCH_THRESHOLD = 0.15

let modelPromise = null

async function loadModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      // Dynamic import: TensorFlow.js is only downloaded when a scan happens.
      const tf = await import('@tensorflow/tfjs')
      const model = await tf.loadLayersModel(MODEL_URL)
      // Warm-up pass — compiles WebGL shaders so the first real scan is fast.
      await model.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).data()
      return model
    })()
    // Allow a later retry if loading failed.
    modelPromise.catch(() => {
      modelPromise = null
    })
  }
  return modelPromise
}

/** 'ready' | 'unavailable' — used for the status badge on the Scan page. */
export async function getModelStatus() {
  try {
    await loadModel()
    return 'ready'
  } catch {
    return 'unavailable'
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Image could not be loaded'))
    img.src = url
  })
}

/** First CLASS_MAP entry whose keywords appear in an ImageNet class name. */
function matchClass(className) {
  const label = className.toLowerCase()
  for (const entry of CLASS_MAP) {
    if (entry.keywords.some((kw) => label.includes(kw.toLowerCase()))) return entry
  }
  return null
}

/**
 * Identify the object in a photo.
 *
 * @param {string} imageUrl - object URL of the image to analyse
 * @returns {Promise<{
 *   name?: string, category?: string, confidence?: number, note?: string,
 *   unrecognized?: boolean, modelUnavailable?: boolean
 * }>}
 */
export async function recognizeObject(imageUrl) {
  const tf = await import('@tensorflow/tfjs')

  let model
  try {
    model = await loadModel()
  } catch {
    return { modelUnavailable: true }
  }

  const img = await loadImage(imageUrl)

  // Preprocess exactly as the original MobileNet demo: resize to 224×224,
  // scale pixels from [0,255] to [-1,1].
  const output = tf.tidy(() => {
    let t = tf.browser.fromPixels(img)
    t = tf.image.resizeBilinear(t, [IMAGE_SIZE, IMAGE_SIZE], true)
    const input = t
      .toFloat()
      .mul(2 / 255)
      .sub(1)
      .reshape([-1, IMAGE_SIZE, IMAGE_SIZE, 3])
    const out = model.predict(input)
    // This layers model emits 1000 probabilities directly; graph models emit
    // 1001 (with an extra background class) — handle both.
    return out.shape[out.shape.length - 1] === 1001 ? out.slice([0, 1], [-1, 1000]) : out
  })

  const data = Array.from(await output.data())
  output.dispose()

  // Top-10 predictions with class names.
  const predictions = data
    .map((probability, index) => ({ className: IMAGENET_CLASSES[index], probability }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 10)

  const top3 = predictions
    .slice(0, 3)
    .map((p) => `${p.className.split(',')[0]} (${Math.round(p.probability * 100)}%)`)
  const note = top3.length ? `The model saw: ${top3.join(', ')}.` : ''

  for (const p of predictions) {
    const match = matchClass(p.className)
    if (match && p.probability >= MATCH_THRESHOLD) {
      return {
        name: match.name,
        category: match.category,
        confidence: Math.round(p.probability * 100),
        note,
      }
    }
  }

  // Nothing matched confidently — hand over to manual selection.
  return { unrecognized: true, note }
}
