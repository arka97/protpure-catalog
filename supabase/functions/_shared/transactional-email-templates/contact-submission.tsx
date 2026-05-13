import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ContactSubmissionProps {
  name?: string
  company?: string
  email?: string
  message?: string
}

const ContactSubmissionEmail = ({
  name, company, email, message,
}: ContactSubmissionProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact message from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form message</Heading>
        <Text style={lead}>
          A visitor sent a message via the contact form on protpure.com.
        </Text>

        <Section style={card}>
          <Heading as="h2" style={h2}>Contact</Heading>
          <Text style={row}><strong>Name:</strong> {name || '—'}</Text>
          <Text style={row}><strong>Company:</strong> {company || '—'}</Text>
          <Text style={row}><strong>Email:</strong> {email || '—'}</Text>
        </Section>

        <Section style={card}>
          <Heading as="h2" style={h2}>Message</Heading>
          <Text style={row}>{message || '—'}</Text>
        </Section>

        <Hr style={hr} />
        <Text style={footer}>
          Reply directly to this email to respond to {name || 'the sender'}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactSubmissionEmail,
  subject: (d: Record<string, any>) =>
    `New contact message — ${d.name || d.company || 'website'}`,
  displayName: 'Contact form submission',
  to: 'sales@protpure.com',
  previewData: {
    name: 'Jane Doe',
    company: 'Acme Biotech',
    email: 'jane@acme.com',
    message: 'Hi — I would like to learn more about your products.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a2540' }
const container = { padding: '24px', maxWidth: '640px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0d1b2a', margin: '0 0 8px' }
const lead = { fontSize: '14px', color: '#475569', margin: '0 0 24px' }
const h2 = { fontSize: '14px', fontWeight: 'bold', color: '#0d1b2a', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '0 0 12px' }
const card = { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px 20px', margin: '0 0 16px' }
const row = { fontSize: '14px', color: '#1a2540', margin: '0 0 6px', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#e2e8f0', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '0' }