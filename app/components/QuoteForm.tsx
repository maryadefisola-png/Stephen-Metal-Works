'use client'

import { FormEvent, useEffect, useState } from 'react'

type QuoteDesign = {
  projectType: string
  dimensions: string
  description: string
  generatedDesignUrl: string
  conceptName: string
  customerSummary: string
  designFeatures: string[]
  practicalNotes: string
}

export default function QuoteForm({ design }: { design?: QuoteDesign | null }) {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ customer_name: '', phone: '', whatsapp: '', location: '', project_type: '', dimensions: '', description: '', generated_design_url: '' })

  useEffect(() => {
    if (!design) return
    const fullDescription = [
      `AI Concept: ${design.conceptName}`,
      design.customerSummary,
      `Design features: ${design.designFeatures.join('; ')}`,
      `Practical notes: ${design.practicalNotes}`,
      `Original request: ${design.description}`
    ].filter(Boolean).join('\n\n')
    setForm(prev => ({ ...prev, project_type: design.projectType, dimensions: design.dimensions, description: fullDescription, generated_design_url: design.generatedDesignUrl }))
  }, [design])

  function update(name: string, value: string) { setForm(prev => ({ ...prev, [name]: value })) }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setStatus('')
    try {
      const res = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try WhatsApp instead.')
      setStatus('Request received. We will contact you soon.')
      setForm({ customer_name: '', phone: '', whatsapp: '', location: '', project_type: '', dimensions: '', description: '', generated_design_url: '' })
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Unable to submit request.') }
    finally { setLoading(false) }
  }

  return <form className='quoteform' onSubmit={submit}>
    {design && <div className='quote-design-card'><div><strong>AI design attached</strong><span>{design.conceptName}</span></div><img src={design.generatedDesignUrl} alt={design.conceptName} /><a href={`${design.generatedDesignUrl}?download=Stephen-Metal-Works-${encodeURIComponent(design.conceptName)}.png`} target='_blank' rel='noreferrer'>Save attached design ↓</a></div>}
    <div className='formgrid'><input name='customer_name' value={form.customer_name} onChange={e => update('customer_name', e.target.value)} placeholder='Your name' required /><input name='phone' value={form.phone} onChange={e => update('phone', e.target.value)} placeholder='Phone number' required /><input name='whatsapp' value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder='WhatsApp number (optional)' /><input name='location' value={form.location} onChange={e => update('location', e.target.value)} placeholder='Project location' required /></div>
    <div className='formgrid'><select name='project_type' value={form.project_type} onChange={e => update('project_type', e.target.value)} required><option value='' disabled>What are you building?</option><option>Gate</option><option>Door</option><option>Burglar Proofing</option><option>Railing</option><option>Staircase</option><option>Custom Metal Work</option><option>Other</option></select><input name='dimensions' value={form.dimensions} onChange={e => update('dimensions', e.target.value)} placeholder='Approximate size (optional)' /></div>
    <textarea name='description' value={form.description} onChange={e => update('description', e.target.value)} placeholder='Tell us what you want, or describe the design you have in mind...' required rows={8} />
    <button className='button light' disabled={loading}>{loading ? 'Sending...' : design ? 'Send This AI Design for a Quote ↗' : 'Send Quote Request'}</button>
    {status && <p className='formstatus'>{status}</p>}
  </form>
}
