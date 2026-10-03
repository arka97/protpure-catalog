import { createClient } from 'npm:@supabase/supabase-js@2'
import data from './data.json' with { type: 'json' }

Deno.serve(async (req) => {
  if (req.headers.get('x-seed-key') !== Deno.env.get('DOCS_PASSWORD')) return new Response('forbidden', { status: 403 })
  const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const rows = (data as any[]).map((p, i) => ({ slug: p.slug, sort_order: i, data: p }))
  const { error } = await sb.from('catalog_products').upsert(rows, { onConflict: 'slug' })
  return new Response(JSON.stringify({ ok: !error, count: rows.length, error: error?.message }))
})
