import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const required = ['customer_name', 'phone', 'location', 'project_type', 'description']
    if (required.some((key) => !String(body[key] ?? '').trim())) {
      return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from('quote_requests').insert({
      customer_name: String(body.customer_name).trim(),
      phone: String(body.phone).trim(),
      whatsapp: String(body.whatsapp ?? '').trim() || null,
      location: String(body.location).trim(),
      project_type: String(body.project_type).trim(),
      dimensions: String(body.dimensions ?? '').trim() || null,
      description: String(body.description).trim(),
      generated_design_url: String(body.generated_design_url ?? '').trim() || null,
      reference_image_url: String(body.reference_image_url ?? '').trim() || null,
    })

    if (error) return NextResponse.json({ error: 'Unable to submit your request.' }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
