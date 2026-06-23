/**
 * validate.mjs — SEO + ссылки + размеры валидация для samogoncalc
 * Запуск: node tests/validate.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, extname, relative, dirname } from 'path'
import { load } from 'cheerio'

const DIST = join(process.cwd(), 'dist')
const PUBLIC = join(process.cwd(), 'public')
const MAX_HTML_KB = 200  // макс. размер HTML (главная с 12 калькуляторами ~165KB)
const MAX_TOTAL_KB = 1500 // макс. общий размер страницы

let errors = 0
let warnings = 0
let pagesChecked = 0
const brokenLinks = []
const pagesWithoutH1 = []
const pagesWithoutOgImage = []
const pagesWithoutDescription = []
const largePages = []

// ========== Утилиты ==========

function getAllFiles(dir, ext = '.html') {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) results.push(...getAllFiles(full, ext))
    else if (entry.name.endsWith(ext)) results.push(full)
  }
  return results
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

// ========== Проверка одной страницы ==========

function validatePage(filePath) {
  const html = readFileSync(filePath, 'utf-8')
  const $ = load(html)
  const relPath = relative(DIST, filePath)
  pagesChecked++

  const pageErrors = []

  // H1
  const h1s = $('h1')
  if (h1s.length === 0) {
    pageErrors.push('  ❌ Нет H1')
    pagesWithoutH1.push(relPath)
  } else if (h1s.length > 1) {
    pageErrors.push(`  ⚠️  ${h1s.length} H1 (должен быть 1)`)
  }

  // Title
  const title = $('title').text().trim()
  if (!title) pageErrors.push('  ❌ Пустой <title>')
  else if (title.length < 10) pageErrors.push(`  ⚠️  Короткий title (${title.length} симв): "${title}"`)

  // Meta description
  const desc = $('meta[name="description"]').attr('content')
  if (!desc) {
    pageErrors.push('  ❌ Нет meta description')
    pagesWithoutDescription.push(relPath)
  }

  // OG Image
  const ogImage = $('meta[property="og:image"]').attr('content')
  if (!ogImage) {
    pageErrors.push('  ❌ Нет og:image')
    pagesWithoutOgImage.push(relPath)
  }

  // Canonical
  const canonical = $('link[rel="canonical"]').attr('href')
  if (!canonical) pageErrors.push('  ❌ Нет canonical URL')

  // Robots: теги/категории должны иметь noindex
  const isTagOrCat = relPath.startsWith('tags/') || relPath.startsWith('category/')
  const robots = $('meta[name="robots"]').attr('content')
  if (isTagOrCat && (!robots || !robots.includes('noindex'))) {
    pageErrors.push('  ❌ Страница тега/категории без noindex!')
  }

  // Robots: основные страницы НЕ должны иметь noindex
  if (!isTagOrCat && robots && robots.includes('noindex')) {
    pageErrors.push('  ⚠️  Основная страница имеет noindex (проверь)')
  }

  // Размер HTML
  const htmlSize = Buffer.byteLength(html, 'utf-8')
  if (htmlSize > MAX_HTML_KB * 1024) {
    largePages.push({ path: relPath, size: htmlSize })
    pageErrors.push(`  ⚠️  Большой HTML: ${formatBytes(htmlSize)}`)
  }

  if (pageErrors.length > 0) {
    console.log(`\n📄 ${relPath}`)
    pageErrors.forEach(e => console.log(e))
    errors += pageErrors.filter(e => e.includes('❌')).length
    warnings += pageErrors.filter(e => e.includes('⚠️')).length
  }

  return { $, html, relPath }
}

// ========== Проверка ссылок ==========

function validateLinks(allPages) {
  console.log('\n🔗 Проверка внутренних ссылок...')

  const distFiles = new Set()
  for (const f of getAllFiles(DIST, '')) {
    const rel = relative(DIST, f)
    distFiles.add('/' + rel)
    distFiles.add('/' + rel.replace('/index.html', '/'))
  }

  for (const { $, relPath } of allPages) {
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href')
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')
          || href.startsWith('tel:') || href.startsWith('viber:') || href.startsWith('whatsapp:')) return

      let target = href.split('?')[0].split('#')[0]
      if (!target.endsWith('/') && !target.includes('.')) target += '/'

      if (!distFiles.has(target) && !distFiles.has(target + 'index.html')) {
        brokenLinks.push({ from: relPath, to: href })
      }
    })
  }

  if (brokenLinks.length > 0) {
    console.log(`  ❌ ${brokenLinks.length} битых ссылок:`)
    brokenLinks.forEach(l => console.log(`     ${l.from} → ${l.to}`))
    errors += brokenLinks.length
  } else {
    console.log('  ✅ Все внутренние ссылки валидны')
  }
}

// ========== Размеры ==========

function validateSizes() {
  console.log('\n📦 Проверка размеров...')

  const jsFiles = getAllFiles(join(DIST, '_astro'), '.js')
  const cssFiles = getAllFiles(join(DIST, '_astro'), '.css')

  const totalJS = jsFiles.reduce((s, f) => s + statSync(f).size, 0)
  const totalCSS = cssFiles.reduce((s, f) => s + statSync(f).size, 0)

  console.log(`  JS бандлы: ${jsFiles.length} файлов, ${formatBytes(totalJS)}`)
  console.log(`  CSS бандлы: ${cssFiles.length} файлов, ${formatBytes(totalCSS)}`)

  if (largePages.length > 0) {
    console.log(`  ⚠️  ${largePages.length} страниц с большим HTML:`)
    largePages.forEach(p => console.log(`     ${p.path}: ${formatBytes(p.size)}`))
    warnings += largePages.length
  }
}

// ========== Итоги ==========

function summary() {
  console.log('\n' + '='.repeat(60))
  console.log('📊 ИТОГИ ТЕСТИРОВАНИЯ')
  console.log('='.repeat(60))
  console.log(`  Страниц проверено: ${pagesChecked}`)
  console.log(`  ✅ Без ошибок: ${pagesChecked - pagesWithoutH1.length - pagesWithoutDescription.length - pagesWithoutOgImage.length}`)
  console.log(`  ❌ Ошибок: ${errors}`)
  console.log(`  ⚠️  Предупреждений: ${warnings}`)

  if (pagesWithoutH1.length > 0) console.log(`  📋 Без H1: ${pagesWithoutH1.length} стр.`)
  if (pagesWithoutOgImage.length > 0) console.log(`  🖼️  Без og:image: ${pagesWithoutOgImage.length} стр.`)
  if (pagesWithoutDescription.length > 0) console.log(`  📝 Без description: ${pagesWithoutDescription.length} стр.`)

  if (errors === 0 && warnings === 0) {
    console.log('\n  🎉 Все проверки пройдены!')
  } else if (errors === 0) {
    console.log('\n  ✅ Критических ошибок нет. Проверь предупреждения.')
  } else {
    console.log(`\n  💥 ${errors} критических ошибок требуют исправления.`)
    process.exit(1)
  }
}

// ========== MAIN ==========

console.log('🔍 SamogonCalc — валидация сборки')
console.log(`📂 ${DIST}\n`)

const allPages = []
for (const file of getAllFiles(DIST, '.html')) {
  if (file.includes('pagefind') || file.includes('googled')) continue // skip tooling files
  const result = validatePage(file)
  if (result) allPages.push(result)
}

validateLinks(allPages)
validateSizes()
summary()
