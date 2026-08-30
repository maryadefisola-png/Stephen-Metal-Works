use client

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function QuoteForm() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const supabase = createClient()
    const { error } = await supabase.from('quote_requests').insert({
      customer_name: String(form.get('customer_name') || ''),
      phone: String(form.get('phone') || ''),
      whatsapp: String(form.get('whatsapp') || ''),
      location: String(form.get('location') || ''),
      project_type: String(form.get('project_type') || ''),
      dimensions: String(form.get('dimensions') || ''),
      description: String(form.get('description') || '')
    })
    setLoading(false)
    if (error) setStatus('Something went wrong. Please try WhatsApp instead.')
    else { setStatus('Request received. We will contact you soon.'); e.currentTarget.reset() }
  }
  return <form className='quoteform' onSubmit={submit}>
    <div className='formgrid'><input name='customer_name' placeholder='Your name' required /><input name='phone' placeholder='Phone number' required /><input name='whatsapp' placeholder='WhatsApp number (optional)' /><input name='location' placeholder='Project location' required /></div>
    <div className='formgrid'><select name='project_type' defaultValue='' required><option value='' disabled>What are you building?</option><option>Gate</option><option>Door</option><option>Burglar Proofing</option><option>Railing</option><option>Staircase</option><option>Custom Metal Work</option><option>Other</option></select><input name='dimensions' placeholder='Approximate size (optional)' /></div>
    <textarea name='description' placeholder='Tell us what you want, or describe the design you have in mind...' required rows={5} />
    <button className='button light' disabled={loading}>{loading ? 'Sending...' : 'Send Quote Request'}</button>
    {status && <p className='formstatus'>{status}</p>}
  </form>
}
