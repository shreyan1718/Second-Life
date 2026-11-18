/**
 * SECOND LIFE — End-to-end test suite (Phase 8).
 * ------------------------------------------------
 * Runs the complete user journeys against a dev server in a real browser:
 *
 *   1. Every page renders, with correct titles and zero page errors
 *   2. Responsive audit — no horizontal overflow at mobile/tablet/desktop
 *   3. Mobile navigation (hamburger menu)
 *   4. The full scan wizard: upload → analyse → category → validation →
 *      answers → recommendation → dashboard → confirm → undo → delete
 *   5. The safety-override journey (swollen battery forces Recycle)
 *   6. Explore library: search, filters, sorting, guide pages, universal
 *      item search (item advice + decision framework for unknown items)
 *   7. Dispose page + live OpenStreetMap search
 *
 * Usage:
 *   npm run dev            # in one terminal
 *   npm run test:e2e       # in another
 *
 * Requires a Chromium binary, e.g.:  npx playwright-core install chromium
 * (or set CHROME_PATH to an existing Chrome/Chromium executable).
 */

import { chromium } from 'playwright-core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 800 },
  { name: 'tablet', width: 768, height: 1000 },
  { name: 'desktop', width: 1280, height: 900 },
]
const PAGES = [
  { path: '/', marker: '.hero', title: 'Second Life — Don’t Throw It Away. Give It a Second Life.' },
  { path: '/scan', marker: '.dropzone', title: 'Scan an Item · Second Life' },
  { path: '/explore', marker: '.explore__grid', title: 'Explore Ideas · Second Life' },
  { path: '/explore/denim-tote', marker: '.steps-timeline', title: 'Turn Old Jeans Into a Tote Bag · Second Life' },
  { path: '/dispose', marker: '.disposal-grid', title: 'Donate & Recycle · Second Life' },
  { path: '/dashboard', marker: '.dash-empty', title: 'My Impact · Second Life' },
  { path: '/about', marker: '.mission__grid', title: 'About Us · Second Life' },
  { path: '/nowhere', marker: '.not-found', title: 'Page not found · Second Life' },
]

const results = []
function record(name, ok, detail = '') {
  results.push({ name, ok, detail })
  console.log(`  ${ok ? '✓' : '✗ FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function findChromium() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH
  const cacheDir = path.join(os.homedir(), '.cache', 'ms-playwright')
  if (fs.existsSync(cacheDir)) {
    for (const d of fs.readdirSync(cacheDir)) {
      if (!d.startsWith('chromium')) continue
      for (const sub of ['chrome-linux64/chrome', 'chrome-linux/chrome']) {
        const p = path.join(cacheDir, d, sub)
        if (fs.existsSync(p)) return p
      }
    }
  }
  return null
}

/** A simple synthetic photo (canvas-drawn PNG) for the upload flows. */
async function makeTestImage(page) {
  const dataUrl = await page.evaluate(() => {
    const c = document.createElement('canvas')
    c.width = 320
    c.height = 320
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#dcefe4'
    ctx.fillRect(0, 0, 320, 320)
    ctx.fillStyle = '#2d6a4f'
    ctx.beginPath()
    ctx.arc(160, 160, 90, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(120, 120, 80, 80)
    return c.toDataURL('image/png')
  })
  return Buffer.from(dataUrl.split(',')[1], 'base64')
}

async function run() {
  const exe = findChromium()
  if (!exe) {
    console.error('No Chromium found. Run: npx playwright-core install chromium')
    process.exit(1)
  }
  const browser = await chromium.launch({
    executablePath: exe,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader'],
  })

  /* ------------------------------------------------ 1. pages, titles, errors */
  console.log('\n[1] Pages render · titles · console errors')
  {
    const page = await browser.newPage({ viewport: VIEWPORTS[2] })
    const errors = []
    page.on('pageerror', (e) => errors.push(`${e.message}`))
    for (const p of PAGES) {
      errors.length = 0
      await page.goto(BASE + p.path, { waitUntil: 'networkidle', timeout: 60000 })
      await page.waitForSelector(p.marker, { timeout: 20000 }).catch(() => {})
      const hasMarker = (await page.$(p.marker)) != null
      record(`${p.path} renders`, hasMarker)
      record(`${p.path} title`, (await page.title()) === p.title, await page.title())
      record(`${p.path} no page errors`, errors.length === 0, errors.join(' | ').slice(0, 120))
    }
    await page.close()
  }

  /* ------------------------------------------------ 2. responsive audit */
  console.log('\n[2] Responsive audit — horizontal overflow')
  {
    const page = await browser.newPage()
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      for (const p of PAGES) {
        await page.goto(BASE + p.path, { waitUntil: 'networkidle', timeout: 60000 })
        await sleep(400)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        record(`${vp.name} ${p.path} no overflow`, overflow <= 1, `overflow ${overflow}px`)
      }
    }
    await page.close()
  }

  /* ------------------------------------------------ 3. mobile navigation */
  console.log('\n[3] Mobile navigation')
  {
    const page = await browser.newPage({ viewport: VIEWPORTS[0] })
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 })
    const toggle = page.locator('.navbar__toggle')
    record('hamburger visible on mobile', (await toggle.isVisible()) === true)
    await toggle.click()
    await page.waitForSelector('.navbar__mobile', { timeout: 5000 })
    record('menu opens', true)
    await page.click('.navbar__mobile a[href="/explore"]')
    await page.waitForSelector('.explore__grid', { timeout: 10000 })
    record('menu link navigates', page.url().includes('/explore'))
    await page.close()
  }

  /* ------------------------------------------------ 4. full scan journey */
  console.log('\n[4] Scan → recommendation → dashboard journey')
  {
    const page = await browser.newPage({ viewport: VIEWPORTS[2] })
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    const img = await makeTestImage(page)

    await page.goto(BASE + '/scan', { waitUntil: 'networkidle', timeout: 60000 })
    await page.setInputFiles('input[type="file"]', {
      name: 'test-item.png',
      mimeType: 'image/png',
      buffer: img,
    })
    await page.waitForSelector('.scan-preview__img', { timeout: 10000 })
    record('photo upload shows preview', true)

    await page.click('text=Analyse item')
    await page.waitForSelector('.scan-result', { timeout: 90000 })
    const hasCategory = await page.$eval('#category-select', (s) => !!s.value)
    record('analysis produces a result (AI or honest fallback)', true)

    if (!hasCategory) {
      await page.selectOption('#category-select', 'Household')
      record('manual category selection', true)
    }
    await page.click('text=Continue to condition')
    await page.waitForSelector('.questionnaire', { timeout: 10000 })
    record('condition step renders', true)

    await page.click('text=Get my recommendation')
    await page.waitForSelector('.scan-error', { timeout: 8000 })
    record('validation blocks empty submit', true)

    const fieldsets = await page.$$('.question-card')
    for (const fs of fieldsets) await fs.$eval('.option-pill', (b) => b.click())
    await page.click('text=Get my recommendation')
    await page.waitForSelector('.rec-hero', { timeout: 30000 })
    const pathway = await page.$eval('.rec-hero h2', (e) => e.innerText)
    const reasonCount = await page.$$eval('.rec-reasons li', (e) => e.length)
    const altCount = await page.$$eval('.rec-alt', (e) => e.length)
    record(
      'recommendation rendered',
      !!pathway && reasonCount > 0 && altCount === 3,
      `${pathway}, ${reasonCount} reasons, ${altCount} alternatives`,
    )

    await page.click('text=View my impact')
    await page.waitForSelector('.dash-stats', { timeout: 10000 })
    record('dashboard reflects the scan', true)

    await page.click('.confirm-chip:has-text("Reuse")')
    await sleep(400)
    const done = await page.$('.history__done-badge')
    record('action confirmation works', !!done, done ? (await done.innerText()).trim() : '')

    await page.click('button:has-text("Undo")')
    await sleep(300)
    const undone = await page.$('.history__done-badge')
    record('undo works', !undone)

    await page.click('.history__delete')
    await sleep(400)
    record('delete restores empty state', (await page.$('.dash-empty')) != null)
    record('journey has no page errors', errors.length === 0, errors.join(' | ').slice(0, 120))
    await page.close()
  }

  /* ------------------------------------------------ 5. safety override journey */
  console.log('\n[5] Safety override (swollen battery → Recycle)')
  {
    const page = await browser.newPage({ viewport: VIEWPORTS[2] })
    const img = await makeTestImage(page)
    await page.goto(BASE + '/scan', { waitUntil: 'networkidle', timeout: 60000 })
    await page.setInputFiles('input[type="file"]', {
      name: 'battery-item.png',
      mimeType: 'image/png',
      buffer: img,
    })
    await page.click('text=Analyse item')
    await page.waitForSelector('.scan-result', { timeout: 90000 })
    await page.selectOption('#category-select', 'Electronics')
    await page.click('text=Continue to condition')
    await page.waitForSelector('.questionnaire', { timeout: 10000 })

    // overall = Worn out · functional = Not at all · reason = It’s damaged
    await page.click('.question-card:nth-child(1) .option-pill:has-text("Worn out")')
    await page.click('.question-card:nth-child(2) .option-pill:has-text("Not at all")')
    await page.click('.question-card:nth-child(3) .option-pill:has-text("damaged")')
    await page.click('.question-card:has-text("power on") .option-pill:has-text("No")')
    await page.click('.question-card:has-text("battery") .option-pill:has-text("Swollen or damaged")')
    await page.click('.question-card:has-text("physical damage") .option-pill:has-text("None of these")')

    await page.click('text=Get my recommendation')
    await page.waitForSelector('.rec-hero', { timeout: 30000 })
    const pathway = await page.$eval('.rec-hero h2', (e) => e.innerText)
    const safety = await page.$('.rec-safety')
    record('swollen battery forces Recycle', pathway === 'Recycle', `got ${pathway}`)
    record('safety warning displayed', !!safety)
    await page.click('.history__delete').catch(() => {})
    await page.close()
  }

  /* ------------------------------------------------ 6. explore library */
  console.log('\n[6] Explore library')
  {
    const page = await browser.newPage({ viewport: VIEWPORTS[2] })
    await page.goto(BASE + '/explore', { waitUntil: 'networkidle', timeout: 60000 })
    const total = await page.$$eval('.idea-card', (e) => e.length)
    record('all guides listed', total === 32, `${total} cards`)

    await page.fill('input[type="search"]', 'denim')
    await sleep(300)
    const denimCount = await page.$$eval('.idea-card', (e) => e.length)
    record('search narrows results', denimCount > 0 && denimCount < total, `${denimCount} matches`)

    await page.click('button:has-text("Reset filters")')
    await sleep(300)
    await page.fill('input[type="search"]', 'power bank')
    await sleep(300)
    const powerBankCount = await page.$$eval('.idea-card', (e) => e.length)
    record('power-bank search finds the guide', powerBankCount >= 1, `${powerBankCount} matches`)
    record(
      'power-bank search also shows item advice',
      (await page.$('.item-card')) != null,
    )

    await page.click('button:has-text("Reset filters")')
    await sleep(300)
    await page.fill('input[type="search"]', 'saree')
    await sleep(300)
    record('saree search shows item advice', (await page.$('.item-card')) != null)
    record('saree search offers browsing fallback', (await page.$('.explore__guides-note')) != null)

    await page.click('button:has-text("Reset filters")')
    await sleep(300)
    await page.fill('input[type="search"]', 'qwzxv')
    await sleep(300)
    record('unknown search shows decision framework', (await page.$('.no-match')) != null)

    const reset = async () => {
      await page.click('button:has-text("Reset filters")')
      await sleep(300)
    }
    await reset()
    await page.click('button.chip:has-text("Beginner")')
    await sleep(300)
    const beginnerCount = await page.$$eval('.idea-card', (e) => e.length)
    record('level filter works', beginnerCount > 0 && beginnerCount < total, `${beginnerCount} beginner`)

    await reset()
    await page.selectOption('#sort-select', 'az')
    await sleep(300)
    const first = await page.$eval('.idea-card .idea-card__title', (e) => e.innerText)
    record('A–Z sort works', /^[a-b]/i.test(first), `first: ${first}`)

    await reset()
    await page.click('.idea-card >> nth=0')
    await page.waitForSelector('.steps-timeline', { timeout: 10000 })
    const steps = await page.$$eval('.step-row', (e) => e.length)
    const materials = await page.$$eval('.materials-list li', (e) => e.length)
    const safety = await page.$$eval('.detail-panel--safety li', (e) => e.length)
    const printBtn = await page.$('button:has-text("Print this guide")')
    record(
      'guide page complete',
      steps > 0 && materials > 0 && safety > 0 && !!printBtn,
      `${steps} steps, ${materials} materials, ${safety} safety notes`,
    )
    await page.close()
  }

  /* ------------------------------------------------ 7. dispose + live search */
  console.log('\n[7] Dispose page & OpenStreetMap search')
  {
    const page = await browser.newPage({ viewport: VIEWPORTS[2] })
    await page.goto(BASE + '/dispose', { waitUntil: 'networkidle', timeout: 60000 })
    const cards = await page.$$eval('.disposal-card', (e) => e.length)
    const tiles = await page.$$eval('.dropoff-tile', (e) => e.length)
    record('disposal guides render', cards === 5, `${cards} cards`)
    record('drop-off types render', tiles === 6, `${tiles} tiles`)

    await page.fill('.locate-card__field input', 'Mumbai')
    await page.click('button:has-text("Search")')
    // Live internet → results or an honest empty; no internet → honest alert.
    const outcome = await page
      .waitForSelector('.locate-result, .locate-card__alert', { timeout: 60000 })
      .catch(() => null)
    if (outcome) {
      const hasResults = (await page.$('.locate-result')) != null
      const hasAlert = (await page.$('.locate-card__alert')) != null
      record('location search responds honestly', hasResults || hasAlert, hasResults ? 'results shown' : 'honest empty/alert')
    } else {
      record('location search responds honestly', false, 'no response within 60s')
    }
    await page.close()
  }

  await browser.close()

  /* ------------------------------------------------ summary */
  const failed = results.filter((r) => !r.ok)
  console.log(`\n${'='.repeat(60)}`)
  console.log(`RESULTS: ${results.length - failed.length}/${results.length} passed`)
  if (failed.length) {
    console.log('FAILURES:')
    failed.forEach((f) => console.log(`  ✗ ${f.name} ${f.detail ? `— ${f.detail}` : ''}`))
    process.exit(1)
  }
  console.log('ALL TESTS PASSED ✅')
}

run().catch((e) => {
  console.error('SUITE CRASHED:', e)
  process.exit(1)
})
