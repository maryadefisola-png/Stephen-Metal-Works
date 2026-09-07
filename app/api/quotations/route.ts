import { NextResponse } from 'next/server'
import { isAdminRequest } from '../../../lib/adminAuth'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export async function GET(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  const search = new URL(request.url).searchParams.get('search')?.trim() || ''
  const supabase = supabaseAdmin()
  let query = supabase.from('quotations').select('*').order('created_at', { ascending: false })
  if (search) {
    const safe = search.replace(/[%_,]/g, ' ').replace(/\./g, ' ')
    query = query.or(`customer_name.ilike.%${safe}%,quote_number.ilike.%${safe}%,project_type.ilike.%${safe}%`)
  }
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ quotations: data ?? [] })
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  try {
    const body = await request.json()
    const items = Array.isArray(body.items) ? body.items : []
    const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.qty) || 0) * (Number(item.unitPrice) || 0), 0)
    const discount = Math.max(Number(body.discount) || 0, 0)
    const total = Math.max(subtotal - discount, 0)
    const depositPct = Math.min(Math.max(Number(body.depositPct) || 0, 0), 100)
    const depositAmount = Math.round((total * depositPct) / 100)
    if (!String(body.customer ?? '').trim() || !String(body.phone ?? '').trim()) {
      return NextResponse.json({ error: 'Customer name and phone are required.' }, { status: 400 })
    }
    const supabase = supabaseAdmin()
    const { data, error } = await supabase.from('quotations').insert({
      customer_name: String(body.customer).trim(), phone: String(body.phone).trim(), location: String(body.location ?? '').trim() || null,
      project_type: String(body.project ?? '').trim() || null, description: String(body.description ?? '').trim() || null,
      items, subtotal, discount, deposit_pct: depositPct, deposit_amount: depositAmount, total,
      validity_days: Math.max(Number(body.validityDays) || 14, 1), status: body.status || 'Draft', design_image_url: body.designImageUrl || null,
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ quotation: data }, { status: 201 })
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
}
