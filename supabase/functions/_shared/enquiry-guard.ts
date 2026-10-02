import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmail } from './transactional-email-templates/send-email.ts'

// Public enquiry forms: origin allowlist + per-instance IP rate limit + input checks.
const ALLOWED_ORIGINS = ['https://protpure.com', 'https://www.protpure.com', 'https://protpure.lovable.app']
const ALLOWED_ORIGIN_SUFFIXES = ['.lovable.app', '.lovable.dev', '.lovableproject.com']
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const ipHits = new Map<string, number[]>()

const EMAIL_RE = /^[^\s<>"'\\,;:()\[\]]+@[^\s<>"'\\,;:()\[\]]+\.[^\s<>"'\\,;:()\[\]]+$/
export function isValidEmail(v: unknown): v is string {
  return typeof v === 'string' && v.length <= 254 && !/[\r\n\t\0]/.test(v) && EMAIL_RE.test(v)
}

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function originAllowed(origin: string | null) {
  if (!origin) return false
  if (ALLOWED_ORIGINS.includes(origin)) return true
  try {
    const host = new URL(origin).hostname
    return ALLOWED_ORIGIN_SUFFIXES.some((s) => host.endsWith(s))
  } catch {
    return false
  }
}

function rateLimited(ip: string) {
  const now = Date.now()
  const arr = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  arr.push(now)
  ipHits.set(ip, arr)
  return arr.length > RATE_LIMIT_MAX
}

/** Returns an early Response when the request must be refused, otherwise the parsed body. */
export async function guard(req: Request): Promise<Response | Record<string, any>> {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const origin = req.headers.get('origin')
  if (!originAllowed(origin)) {
    console.warn('Blocked request from disallowed origin', { origin })
    return json({ error: 'Forbidden' }, 403)
  }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('cf-connecting-ip') || 'unknown'
  if (rateLimited(ip)) return json({ error: 'Too many requests' }, 429)
  try {
    const body = await req.json()
    if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, 400)
    return body
  } catch {
    return json({ error: 'Invalid JSON in request body' }, 400)
  }
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : undefined)
export { str }

/** Sends a template to its fixed recipient and records the outcome in the send log. */
export async function sendAndLog(
  templateName: string,
  templateData: Record<string, any>,
  idempotencyKey: string,
  replyTo: string,
) {
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const recipient = 'sales@protpure.com'
  const log = async (status: string, error_message?: string) => {
    const { error } = await supabase.from('email_send_log').insert({
      message_id: null,
      template_name: templateName,
      recipient_email: recipient,
      status,
      error_message: error_message ?? null,
    })
    if (error) console.error('Failed to write send log', { code: error.code, message: error.message })
  }
  try {
    const result = await sendTemplateEmail(templateName, recipient, { templateData, idempotencyKey, replyTo })
    if (result.sent) {
      await log('sent')
      return json({ success: true })
    }
    await log('suppressed')
    return json({ success: false, reason: 'email_suppressed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Enquiry email failed', { templateName, message })
    await log('failed', message)
    return json({ error: 'Failed to send email' }, 500)
  }
}
