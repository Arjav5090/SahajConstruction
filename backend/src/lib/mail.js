import nodemailer from 'nodemailer'

function requiredEnv(name) {
  const v = process.env[name]
  if (!v || !String(v).trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return String(v).trim()
}

export function isMailConfigured() {
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

export function getMailTo() {
  return requiredEnv('MAIL_TO')
}

/** Single pooled transport — avoids a full SMTP+TLS handshake on every request. */
let transporterSingleton = null

export function getTransporter() {
  if (transporterSingleton) return transporterSingleton
  if (!isMailConfigured()) return null

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
  })
  return transporterSingleton
}

export function getFromAddress() {
  return process.env.MAIL_FROM?.trim() || `Sahaj Construction Website <${requiredEnv('SMTP_USER')}>`
}
