import express, { Router } from 'express'
import { isMailConfigured, sendInboxEmail } from '../lib/mail.js'

export const contactRouter = Router()
contactRouter.use(express.json({ limit: '32kb' }))

contactRouter.post('/', async (req, res, next) => {
  try {
    if (!isMailConfigured()) {
      return res.status(503).json({ error: 'Mail is not configured on the server.' })
    }
    const { name, organization, email, phone, subject, message } = req.body || {}
    const fromEmail = typeof email === 'string' ? email.trim() : ''
    if (!fromEmail) {
      return res.status(400).json({ error: 'Email is required.' })
    }

    const subj = (typeof subject === 'string' && subject.trim()) || 'Website enquiry'
    const text = [
      'Contact form — Sahaj Construction website',
      '',
      `Name: ${name || '—'}`,
      `Organization: ${organization || '—'}`,
      `Email: ${fromEmail}`,
      `Phone: ${phone || '—'}`,
      '',
      'Message:',
      typeof message === 'string' ? message || '—' : '—',
    ].join('\n')

    const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">${escapeHtml(
      text,
    )}</pre>`

    await sendInboxEmail({
      replyTo: fromEmail,
      subject: `[Website] ${subj}`,
      text,
      html,
    })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
