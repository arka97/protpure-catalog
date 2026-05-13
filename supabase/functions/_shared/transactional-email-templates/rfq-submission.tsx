import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface RFQItem {
  productName: string
  packSize?: string
  catNo?: string
  quantity: number
  notes?: string
}

interface RFQSubmissionProps {
  name?: string
  company?: string
  email?: string
  phone?: string
  country?: string
  requirements?: string
  items?: RFQItem[]
}

const RFQSubmissionEmail = ({
  name, company, email, phone, country, requirements, items = [],
}: RFQSubmissionProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New RFQ from {company || name || 'a customer'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New RFQ submission</Heading>
        <Text style={lead}>
          A new request for quote was submitted on protpure.com.
        </Text>

        <Section style={card}>
          <Heading as="h2" style={h2}>Contact</Heading>
          <Text style={row}><strong>Name:</strong> {name || '—'}</Text>
          <Text style={row}><strong>Company:</strong> {company || '—'}</Text>
          <Text style={row}><strong>Email:</strong> {email || '—'}</Text>
          <Text style={row}><strong>Phone:</strong> {phone || '—'}</Text>
          <Text style={row}><strong>Country:</strong> {country || '—'}</Text>
        </Section>

        <Section style={card}>
          <Heading as="h2" style={h2}>Requested items ({items.length})</Heading>
          {items.length === 0 ? (
            <Text style={row}>No items.</Text>
          ) : (
            items.map((it, i) => (
              <Section key={i} style={itemBox}>
                <Text style={itemName}>{it.productName}</Text>
                <Text style={itemMeta}>
                  {it.packSize || '—'}{it.catNo ? ` · ${it.catNo}` : ''} · Qty {it.quantity}
                </Text>
                {it.notes && <Text style={itemNotes}>Notes: {it.notes}</Text>}
              </Section>
            ))
          )}
        </Section>

        {requirements && (
          <Section style={card}>
            <Heading as="h2" style={h2}>Additional requirements</Heading>
            <Text style={row}>{requirements}</Text>
          </Section>
        )}

        <Hr style={hr} />
        <Text style={footer}>
          Reply directly to this email to respond to {name || 'the customer'}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: RFQSubmissionEmail,
  subject: (d: Record<string, any>) =>
    `New RFQ — ${d.company || d.name || 'customer'} (${(d.items || []).length} item${(d.items || []).length === 1 ? '' : 's'})`,
  displayName: 'RFQ submission',
  to: 'sales@protpure.com',
  previewData: {
    name: 'Jane Doe',
    company: 'Acme Biotech',
    email: 'jane@acme.com',
    phone: '+1 555 1234',
    country: 'India',
    requirements: 'Need samples for evaluation by next month.',
    items: [
      { productName: 'ProtPure Resin A', packSize: '100 mL', catNo: 'PA-100', quantity: 2, notes: 'For mAb capture' },
      { productName: 'ProtPure Resin B', packSize: '500 mL', catNo: 'PB-500', quantity: 1 },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a2540' }
const container = { padding: '24px', maxWidth: '640px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0d1b2a', margin: '0 0 8px' }
const lead = { fontSize: '14px', color: '#475569', margin: '0 0 24px' }
const h2 = { fontSize: '14px', fontWeight: 'bold', color: '#0d1b2a', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '0 0 12px' }
const card = { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px 20px', margin: '0 0 16px' }
const row = { fontSize: '14px', color: '#1a2540', margin: '0 0 6px', lineHeight: '1.5' }
const itemBox = { borderLeft: '3px solid #0d9488', paddingLeft: '12px', margin: '0 0 12px' }
const itemName = { fontSize: '14px', fontWeight: 'bold', color: '#0d1b2a', margin: '0 0 4px', fontFamily: 'Arial, sans-serif' }
const itemMeta = { fontSize: '13px', color: '#475569', margin: '0 0 4px', fontFamily: 'Arial, sans-serif' }
const itemNotes = { fontSize: '13px', color: '#475569', margin: '0', fontStyle: 'italic' as const, fontFamily: 'Arial, sans-serif' }
const hr = { borderColor: '#e2e8f0', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '0' }