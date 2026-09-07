import PDFDocument from 'pdfkit'
import { isAdminRequest } from '../../../../../lib/adminAuth'
import { supabaseAdmin } from '../../../../../lib/supabaseAdmin'

export const runtime = 'nodejs'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return new Response('Unauthorized', { status: 401 })
  const { id } = await params
  const { data: quote, error } = await supabaseAdmin().from('quotations').select('*').eq('id', id).single()
  if (error || !quote) return new Response('Quotation not found', { status: 404 })

  const doc = new PDFDocument({ margin: 50 })
  const chunks: Buffer[] = []
  doc.on('data', (chunk) => chunks.push(chunk))
  const finished = new Promise<void>((resolve) => doc.on('end', resolve))
  const naira = (n: unknown) => `₦${Number(n || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`

  doc.fontSize(18).fillColor('#1E2023').text('STEPHEN METAL WORKS')
  doc.fontSize(9).fillColor('#555').text('Agaloke, off Kunrotola Filling Station, Apata, Ibadan, Nigeria').text('Phone: 0805 846 4190   WhatsApp: 0808 722 1638')
  doc.moveDown().strokeColor('#C7C4BA').moveTo(50, doc.y).lineTo(545, doc.y).stroke().moveDown()
  doc.fontSize(14).fillColor('#35505E').text(`Quotation ${quote.quote_number}`)
  doc.fontSize(9).fillColor('#555').text(`Date: ${new Date(quote.created_at).toLocaleDateString('en-GB')}   Valid for ${quote.validity_days} days`)
  doc.moveDown().fontSize(10).fillColor('#1E2023')
  doc.text(`Customer: ${quote.customer_name}`).text(`Phone: ${quote.phone}`).text(`Location: ${quote.location || '-'}`).text(`Project: ${quote.project_type || '-'}`)
  if (quote.description) doc.moveDown(.5).text(`Description: ${quote.description}`)
  doc.moveDown().fontSize(10).text('Items', { underline: true }).moveDown(.3)
  for (const item of quote.items || []) {
    const line = (Number(item.qty) || 0) * (Number(item.unitPrice) || 0)
    doc.text(`${item.desc || 'Item'}   ${item.qty || 0} x ${naira(item.unitPrice)}   =   ${naira(line)}`)
  }
  doc.moveDown().text(`Subtotal: ${naira(quote.subtotal)}`)
  if (Number(quote.discount)) doc.text(`Discount: -${naira(quote.discount)}`)
  doc.fontSize(12).text(`Total: ${naira(quote.total)}`, { underline: true })
  doc.fontSize(10).text(`Deposit required (${quote.deposit_pct}%): ${naira(quote.deposit_amount)}`)
  doc.moveDown(1.5).fontSize(8).fillColor('#777').text('This quotation is an estimate based on the information provided and is subject to site inspection. Final pricing is confirmed on inspection.')
  doc.end(); await finished
  return new Response(Buffer.concat(chunks), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${quote.quote_number}.pdf"` } })
}
