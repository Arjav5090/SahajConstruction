import nodemailer from 'nodemailer'

function requiredEnv(name) {
  const v = process.env[name]
  if (!v || !String(v).trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return String(v).trim()
}

function isSmtpConfigured() {
  try {
    requiredEnv('SMTP_HOST')
    requiredEnv('SMTP_USER')
    requiredEnv('SMTP_PASS')
    requiredEnv('MAIL_TO')
    return true
  } catch {
    return false
  }
}

export function isMailConfigured() {
  return isSmtpConfigured()
}

/** @returns {'none' | 'smtp'} */
export function getMailTransport() {
  return isMailConfigured() ? 'smtp' : 'none'
}

export function getMailTo() {
  return requiredEnv('MAIL_TO')
}

export function getFromAddress() {
  return process.env.MAIL_FROM?.trim() || `Sahaj Construction Website <${requiredEnv('SMTP_USER')}>`
}

function numEnv(name, fallback) {
  const n = Number(process.env[name])
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/** Pooled transport — reuses the SMTP connection instead of handshaking every send. */
let transporterSingleton = null

function getTransporter() {
  if (transporterSingleton) return transporterSingleton
  if (!isSmtpConfigured()) return null

  const host = requiredEnv('SMTP_HOST')
  const port = Number(process.env.SMTP_PORT || 587)
  const secure = process.env.SMTP_SECURE === 'true' || port === 465
  const user = requiredEnv('SMTP_USER')
  const pass = requiredEnv('SMTP_PASS')

  const connectionTimeout = numEnv('SMTP_CONNECTION_TIMEOUT_MS', 90_000)
  const greetingTimeout = numEnv('SMTP_GREETING_TIMEOUT_MS', 45_000)
  const socketTimeout = numEnv('SMTP_SOCKET_TIMEOUT_MS', 120_000)

  /** Force IPv4 if your host has broken IPv6 routes to the mail server. */
  const family = process.env.SMTP_FORCE_IPV4 === 'true' ? 4 : undefined

  transporterSingleton = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    pool: true,
    maxConnections: 2,
    maxMessages: 100,
    connectionTimeout,
    greetingTimeout,
    socketTimeout,
    ...(family !== undefined ? { family } : {}),
    tls: {
      minVersion: 'TLSv1.2',
    },
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
    from: getFromAddress(),
    to: getMailTo(),
    replyTo,
    subject,
    text,
    html,
    attachments: nodemailerAttachments.length ? nodemailerAttachments : undefined,
  })
}
