import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stephen-metal-works.vercel.app'

export const metadata: Metadata = {
  title: 'Stephen Metal Works | Custom Gates, Doors & Fabrication in Ibadan',
  description: 'Custom gates, doors, security work, railings and staircases fabricated in Ibadan, Nigeria. Design your project with AI, then get a quote on WhatsApp.',
  keywords: ['gate fabricator Ibadan','metal works Ibadan','welder Ibadan','burglar proofing Ibadan','custom gates Nigeria','railings Ibadan'],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Stephen Metal Works',
    description: 'Metalwork with character — custom gates, doors, security work and fabrication in Ibadan, Nigeria.',
    url: siteUrl,
    siteName: 'Stephen Metal Works',
    locale: 'en_NG',
    type: 'website',
  },
}

function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Stephen Metal Works',
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+2348058464190',
    address: { '@type': 'PostalAddress', streetAddress: 'Agaloke, off Kunrotola Filling Station, Apata', addressLocality: 'Ibadan', addressRegion: 'Oyo State', addressCountry: 'NG' },
    priceRange: '$$',
    areaServed: ['Ibadan','Oyo State','Nigeria'],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<LocalBusinessSchema /></body></html>
}
