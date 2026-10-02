import { guard, isValidEmail, json, sendAndLog, str } from '../_shared/enquiry-guard.ts'

Deno.serve(async (req) => {
  const body = await guard(req)
  if (body instanceof Response) return body

  const email = body.email
  if (!isValidEmail(email)) return json({ error: 'A valid email is required' }, 400)
  const name = str(body.name, 200)
  if (!name) return json({ error: 'Name is required' }, 400)
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 100) : []
  if (!rawItems.length) return json({ error: 'At least one item is required' }, 400)

  const items = rawItems.map((i: any) => ({
    productName: str(i?.productName, 300),
    packSize: str(i?.packSize, 100),
    catNo: str(i?.catNo, 100),
    quantity: typeof i?.quantity === 'number' ? i.quantity : undefined,
    notes: str(i?.notes, 2000),
  }))
  const id = str(body.requestId, 100) || crypto.randomUUID()

  return sendAndLog(
    'rfq-submission',
    {
      name,
      company: str(body.company, 200),
      email,
      phone: str(body.phone, 50),
      country: str(body.country, 100),
      requirements: str(body.requirements, 5000),
      items,
    },
    `rfq-${id}`,
    email,
  )
})
