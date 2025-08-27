import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dataDir = join(root, 'portal-blueprint', 'data')
const outDir = join(root, 'public')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

function readJSON(p){ return JSON.parse(readFileSync(p, 'utf8')) }

const courses = readJSON(join(dataDir, 'courses.json'))

// Load modules for each course
const modulesByCourse = {}
for (const course of courses) {
  const modulePath = join(dataDir, 'modules', `${course.slug}.json`)
  if (existsSync(modulePath)) {
    const modules = readJSON(modulePath)
    modulesByCourse[course.id] = modules
  }
}

// Load quizzes
const quizzes = []
const quizDir = join(dataDir, 'quiz')
if (existsSync(quizDir)) {
  const quizFiles = readdirSync(quizDir).filter(f => f.endsWith('.json'))
  for (const file of quizFiles) {
    const quiz = readJSON(join(quizDir, file))
    quizzes.push(quiz)
  }
}

// Minimal validation
const slugs = new Set()
for (const c of courses) {
  if (!c.slug) throw new Error('Course missing slug')
  if (slugs.has(c.slug)) throw new Error('Duplicate course slug: '+c.slug)
  slugs.add(c.slug)
  if (typeof c.durationMin === 'number' && c.durationMin < 1) {
    throw new Error(`durationMin must be >=1 for ${c.slug}`)
  }
}

// Emit combined data for later use
writeFileSync(join(outDir, 'data.json'), JSON.stringify({ 
  courses, 
  modulesByCourse, 
  quizzes 
}, null, 2))

// Emit a tiny sitemap for now
const base = 'https://portal.roadreadysafety.com'
const urls = ['/', '/support', '/dashboard']
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
  urls.map(u => `  <url><loc>${base}${u}</loc></url>`).join('\n')
}\n</urlset>\n`
writeFileSync(join(outDir, 'sitemap.xml'), xml)

console.log('✅ Prebuild complete: public/data.json & sitemap.xml')
