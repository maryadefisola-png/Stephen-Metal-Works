import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stephen Metal Works | Precision in Metal. Built to Last.',
  description: 'Custom gates, doors, burglar proofing and metal fabrication in Ibadan, Nigeria, serving clients locally and abroad.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}