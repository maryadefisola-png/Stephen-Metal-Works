import { NextResponse } from 'next/server'
import { isAdminRequest } from '../../../../lib/adminAuth'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

const ALLOWED = new Set(['Draft','Sent','Accepted','Rejected','In Production','Completed'])

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  try {
    const { id } = await params
    const { status } = await request.json()
    if (!ALLOWED.has(status)) return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
    const { data, error } = await supabaseAdmin().from('quotations').update({ status }).eq('id', id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ quotation: data })
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
}
