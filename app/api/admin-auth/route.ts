import { NextResponse } from 'next/server'
import { COOKIE, makeAdminToken } from '../../../lib/adminAuth'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const expected = process.env.ADMIN_PASSWORD
    if (!expected || password !== expected) return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
    const response = NextResponse.json({ ok: true })
    response.cookies.set(COOKIE, makeAdminToken(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 12 })
    return response
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 })
  return response
}
