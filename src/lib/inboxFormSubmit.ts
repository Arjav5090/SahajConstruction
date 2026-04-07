/** Website inbox API (Express backend in `/backend`). */

/** Résumé size limit for careers applications (must match backend) */
export const MAX_CV_BYTES = 5 * 1024 * 1024

function apiBase(): string {
  return String(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
}

function inboxUrl(path: string): string {
  const base = apiBase()
  const p = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${p}` : p
}

/** When `true`, contact/careers use mailto fallback instead of the API. */
export function isInboxApiDisabled(): boolean {
  return import.meta.env.VITE_INBOX_API_DISABLED === 'true'
}

export function isContactFormConfigured(): boolean {
  return !isInboxApiDisabled()
}

export function isCareersFormConfigured(): boolean {
  return !isInboxApiDisabled()
}

export type SubmitInboxResult =
  | { ok: true }
  | { ok: false; code: 'network'; detail?: string }

async function parseJsonError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string }
    if (data.error) return data.error
  } catch {
    /* ignore */
  }
  return res.statusText || 'Request failed'
}

export async function submitContactEmail(fields: {
  name: string
  organization: string
  email: string
  phone: string
  subject: string
  message: string
}): Promise<SubmitInboxResult> {
  const subject = fields.subject || 'Website enquiry'
  const payload = {
    name: fields.name || '—',
    organization: fields.organization || '—',
    email: fields.email,
    phone: fields.phone || '—',
    subject,
    message: fields.message || '—',
  }

  try {
    const res = await fetch(inboxUrl('/api/contact'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      return {
        ok: false,
        code: 'network',
        detail: await parseJsonError(res),
      }
    }
    return { ok: true }
  } catch (e: unknown) {
    const err = e as { message?: string }
    return {
      ok: false,
      code: 'network',
      detail: err.message || 'Network error',
    }
  }
}

export async function submitCareersApplicationForm(form: HTMLFormElement): Promise<SubmitInboxResult> {
  const resumeInput = form.querySelector<HTMLInputElement>('input[type="file"][name="resume"]')
  const file = resumeInput?.files?.[0]
  if (file && file.size > MAX_CV_BYTES) {
    return { ok: false, code: 'network', detail: 'Résumé must be 5 MB or smaller.' }
  }

  const fd = new FormData(form)
  if (!file) {
    fd.delete('resume')
  }

  try {
    const res = await fetch(inboxUrl('/api/careers'), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: fd,
    })
    if (!res.ok) {
      return {
        ok: false,
        code: 'network',
        detail: await parseJsonError(res),
      }
    }
    return { ok: true }
  } catch (e: unknown) {
    const err = e as { message?: string }
    return {
      ok: false,
      code: 'network',
      detail: err.message || 'Network error',
    }
  }
}
