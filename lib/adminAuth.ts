import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE = 'smw_admin'

function secret() {
  return process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_PASSWORD || 'change-me'
}

export function makeAdminToken() {
  const payload = 'staff'
  const sig = createHmac('sha256', secret()).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export function isValidAdminToken(token?: string) {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (payload !== 'staff' || !sig) return false
  const expected = createHmac('sha256', secret()).update(payload).digest('hex')
  try { return timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) } catch { return false }
}

export async function isAdminRequest() {
  const jar = await cookies()
  return isValidAdminToken(jar.get(COOKIE)?.value)
}

export { COOKIE }
