import nodemailer from 'nodemailer'

function requiredEnv(name) {
  const v = process.env[name]
  if (!v || !String(v).trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return String(v).trim()
}

/** Use HTTPS email API (works on Render, Railway, etc.). SMTP is often blocked there. */
function usesResend() {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

function isSmtpConfigured() {
  try {
    requiredEnv('SMTP_HOST')
    requiredEnv('SMTP_USER')
    requiredEnv('SMTP_PASS')
    return true
  } catch {
    return false
  }
}

export function isMailConfigured() {
  if (!process.env.MAIL_TO?.trim()) return false
  if (usesResend()) {
    return Boolean(process.env.MAIL_FROM?.trim())
  }
  return isSmtpConfigured()
}

/** @returns {'none' | 'resend' | 'smtp'} */
export function getMailTransport() {
  if (!isMailConfigured()) return 'none'
  if (usesResend()) return 'resend'
  return 'smtp'
}

export function getMailTo() {
  return requiredEnv('MAIL_TO')
}

export function getFromAddress() {
  if (usesResend()) {
    return requiredEnv('MAIL_FROM')
  }
  return process.env.MAIL_FROM?.trim() || `Sahaj Construction Website <${requiredEnv('SMTP_USER')}>`
}

/** Single pooled SMTP transport — only used when not on Resend. */
let transporterSingleton = null

function getTransporter() {
  if (usesResend()) return null
  if (transporterSingleton) return transporterSingleton
  if (!isSmtpConfigured()) return null

  const host = requiredEnv('SMTP_HOST')
  const port = Number(process.env.SMTP_PORT || 587)
  const secure = process.env.SMTP_SECURE === 'true' || port === 465
  const user = requiredEnv('SMTP_USER')
  const pass = requiredEnv('SMTP_PASS')

  transporterSingleton = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    pool: true,
    maxConnections: 2,
    maxMessages: 100,
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 60_000,
  })
  return transporterSingleton
}

/**
 * @param {object} opts
 * @param {string} opts.replyTo
 * @param {string} opts.subject
 * @param {string} opts.text
 * @param {string} opts.html
 * @param {Array<{ filename: string, content: Buffer, contentType?: string }>} [opts.attachments]
 */
export async function sendInboxEmail({ replyTo, subject, text, html, attachments }) {
  const to = getMailTo()
  const from = getFromAddress()

  if (usesResend()) {
    await sendViaResend({ from, to, replyTo, subject, text, html, attachments })
    return
  }

  const transporter = getTransporter()
  if (!transporter) {
    throw new Error('SMTP is not configured')
  }

  const nodemailerAttachments = (attachments || []).map((a) => ({
    filename: a.filename,
    content: a.content,
    contentType: a.contentType,
  }))

  await transporter.sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
    html,
    attachments: nodemailerAttachments.length ? nodemailerAttachments : undefined,
  })
}

async function sendViaResend({ from, to, replyTo, subject, text, html, attachments }) {
  const key = requiredEnv('RESEND_API_KEY')

  const body = {
    from,
    to: [to],
    subject,
    reply_to: replyTo,
  }
  if (html) body.html = html
  if (text) body.text = text
  if (attachments?.length) {
    body.attachments = attachments.map((a) => ({
      filename: a.filename,
      content: a.content.toString('base64'),
    }))
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let detail = await res.text()
    try {
      const j = JSON.parse(detail)
      detail = j.message || j.error?.message || j.name || detail
    } catch {
      /* keep text */
    }
    throw new Error(detail || `Resend HTTP ${res.status}`)
  }
}
