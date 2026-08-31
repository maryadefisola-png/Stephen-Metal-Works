'use client'

import { FormEvent, useState } from 'react'

export default function QuoteForm() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setStatus('')
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    try {
      const res = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try WhatsApp instead.')
      setStatus('Request received. We will contact you soon.'); e.currentTarget.reset()
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Unable to submit request.') }
    finally { setLoading(false) }
  }
  return <form className='quoteform' onSubmit={submit}>
    <div className='formgrid'><input name='customer_name' placeholder='Your name' required /><input name='phone' placeholder='Phone number' required /><input name='whatsapp' placeholder='WhatsApp number (optional)' /><input name='location' placeholder='Project location' required /></div>
    <div className='formgrid'><select name='project_type' defaultValue='' required><option value='' disabled>What are you building?</option><option>Gate</option><option>Door</option><option>Burglar Proofing</option><option>Railing</option><option>Staircase</option><option>Custom Metal Work</option><option>Other</option></select><input name='dimensions' placeholder='Approximate size (optional)' /></div>
    <textarea name='description' placeholder='Tell us what you want, or describe the design you have in mind...' required rows={5} />
    <button className='button light' disabled={loading}>{loading ? 'Sending...' : 'Send Quote Request'}</button>
    {status && <p className='formstatus'>{status}</p>}
  </form>
}
