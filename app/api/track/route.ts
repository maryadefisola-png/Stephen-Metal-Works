import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const { quoteNumber, phone } = await request.json()
    const quote = String(quoteNumber ?? '').trim()
    const customerPhone = String(phone ?? '').trim()

    if (!quote || !customerPhone) {
      return NextResponse.json({ error: 'Quote number and phone are required.' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin()
      .from('quotations')
      .select('quote_number, customer_name, project_type, status, total, created_at, updated_at')
      .eq('quote_number', quote)
      .eq('phone', customerPhone)
      .maybeSingle()

    if (error) return NextResponse.json({ error: 'Unable to check project status right now.' }, { status: 500 })
    if (!data) return NextResponse.json({ error: 'No matching quotation found. Check your quote number and phone.' }, { status: 404 })

    return NextResponse.json({ quotation: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
