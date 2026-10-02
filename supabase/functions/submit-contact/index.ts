import { guard, isValidEmail, json, sendAndLog, str } from '../_shared/enquiry-guard.ts'

Deno.serve(async (req) => {
  const body = await guard(req)
  if (body instanceof Response) return body

  const email = body.email
  if (!isValidEmail(email)) return json({ error: 'A valid email is required' }, 400)
  const name = str(body.name, 200)
  if (!name) return json({ error: 'Name is required' }, 400)
  const id = str(body.requestId, 100) || crypto.randomUUID()

  return sendAndLog(
    'contact-submission',
    { name, company: str(body.company, 200), email, message: str(body.message, 10000) },
    `contact-${id}`,
    email,
  )
})
