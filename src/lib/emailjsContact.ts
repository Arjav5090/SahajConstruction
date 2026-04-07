import emailjs from '@emailjs/browser'
import { companyInfo } from '../data/companyInfo'

type EmailJsEnv = 'VITE_EMAILJS_SERVICE_ID' | 'VITE_EMAILJS_PUBLIC_KEY' | 'VITE_EMAILJS_TEMPLATE_ID'

function trimEnv(key: EmailJsEnv): string {
  return String(import.meta.env[key] ?? '').trim()
}

export function isContactEmailJsConfigured(): boolean {
  return Boolean(
    trimEnv('VITE_EMAILJS_SERVICE_ID') &&
      trimEnv('VITE_EMAILJS_PUBLIC_KEY') &&
      trimEnv('VITE_EMAILJS_TEMPLATE_ID'),
  )
}

export type SendContactResult = { ok: true } | { ok: false; detail?: string }

/**
 * Sends the contact form via EmailJS. Template should include these variables (names flexible — match your EmailJS template):
 * from_name, from_email, organization, phone, subject, message, reply_to, inbox_email
 */
export async function sendContactViaEmailJs(fields: {
  name: string
  organization: string
  email: string
  phone: string
  subject: string
  message: string
}): Promise<SendContactResult> {
  const serviceId = trimEnv('VITE_EMAILJS_SERVICE_ID')
  const templateId = trimEnv('VITE_EMAILJS_TEMPLATE_ID')
  const publicKey = trimEnv('VITE_EMAILJS_PUBLIC_KEY')
  if (!serviceId || !templateId || !publicKey) {
    return { ok: false, detail: 'Email service is not configured.' }
  }

  const subject = fields.subject || 'Website enquiry'
  const templateParams = {
    form_type: 'contact',
    inbox_email: companyInfo.email,
    from_name: fields.name || '—',
    from_email: fields.email,
    organization: fields.organization || '—',
    phone: fields.phone || '—',
    subject,
    message: fields.message || '—',
    reply_to: fields.email,
  }

  try {
    const res = await emailjs.send(serviceId, templateId, templateParams, { publicKey })
    if (res.status !== 200) {
      return { ok: false, detail: res.text || 'Could not send.' }
    }
    return { ok: true }
  } catch (e: unknown) {
    const err = e as { text?: string; message?: string }
    return {
      ok: false,
      detail: err.text || err.message || 'Network error',
    }
  }
}
