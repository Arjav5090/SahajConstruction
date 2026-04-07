import { Router } from 'express'
import multer from 'multer'
import { getFromAddress, getMailTo, getTransporter, isMailConfigured } from '../lib/mail.js'

const MAX_BYTES = 5 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
  fileFilter(_req, file, cb) {
    const ok =
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    if (!ok) {
      cb(new Error('Only PDF or Word (.pdf, .doc, .docx) files are allowed.'))
      return
    }
    cb(null, true)
  },
})

export const careersRouter = Router()

careersRouter.post('/', upload.single('resume'), async (req, res, next) => {
  try {
    if (!isMailConfigured()) {
      return res.status(503).json({ error: 'Mail is not configured on the server.' })
    }

    if (req.file && req.file.size > MAX_BYTES) {
      return res.status(400).json({ error: 'Résumé must be 5 MB or smaller.' })
    }

    const email = String(req.body?.email || '').trim()
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' })
    }

    const firstName = String(req.body?.firstName || '').trim()
    const lastName = String(req.body?.lastName || '').trim()
    const phone = String(req.body?.phone || '').trim()
    const city = String(req.body?.city || '').trim()
    const position = String(req.body?.position || '').trim()
    const expectedSalary = String(req.body?.expectedSalary || '').trim()
    const coverLetter = String(req.body?.coverLetter || '').trim()
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || '—'

    const text = [
      'Careers application — Sahaj Construction website',
      '',
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || '—'}`,
      `City: ${city || '—'}`,
      `Position: ${position || '—'}`,
      `Expected salary: ${expectedSalary || '—'}`,
      '',
      'Cover letter / message:',
      coverLetter || '(None)',
    ].join('\n')

    const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">${escapeHtml(
      text,
    )}</pre>`

    const subj = `Careers application — ${position || 'General'}`

    const attachments = []
    if (req.file?.buffer?.length) {
      attachments.push({
        filename: req.file.originalname || 'resume',
        content: req.file.buffer,
        contentType: req.file.mimetype,
      })
    }

    const transporter = getTransporter()
    await transporter.sendMail({
      from: getFromAddress(),
      to: getMailTo(),
      replyTo: email,
      subject: `[Website] ${subj}`,
      text,
      html,
      attachments,
    })
    res.json({ ok: true })
  } catch (err) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Résumé must be 5 MB or smaller.' })
    }
    next(err)
  }
})

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
