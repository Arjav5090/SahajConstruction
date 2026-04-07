import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })
import { contactRouter } from './routes/contact.js'
import { careersRouter } from './routes/careers.js'
import { isMailConfigured } from './lib/mail.js'

const app = express()
const port = Number(process.env.PORT || 3001)
const corsOrigin = process.env.CORS_ORIGIN

app.use(
  cors({
    origin: corsOrigin === '*' || !corsOrigin ? true : corsOrigin.split(',').map((s) => s.trim()),
    credentials: true,
  }),
)

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mail: isMailConfigured(),
  })
})

app.use('/api/contact', contactRouter)
app.use('/api/careers', careersRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  if (err instanceof Error && err.message.includes('PDF or Word')) {
    return res.status(400).json({ error: err.message })
  }
  const message = err instanceof Error ? err.message : 'Server error'
  res.status(500).json({ error: message })
})

app.listen(port, () => {
  console.log(`API listening on http://127.0.0.1:${port}`)
  if (!isMailConfigured()) {
    console.warn(
      '[mail] Not configured: set SMTP_HOST, SMTP_USER, SMTP_PASS, and MAIL_TO in backend/.env (contact/careers will return 503 until then).',
    )
  }
})
