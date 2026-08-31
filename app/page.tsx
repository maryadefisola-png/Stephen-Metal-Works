'use client'

import { useState } from 'react'
import QuoteForm from './components/QuoteForm'
import AIStudio from './components/AIStudio'

const services = [
  ['01', 'Gates', 'Modern, classic and security-focused gates fabricated to your space.'],
  ['02', 'Doors', 'Durable metal doors built for homes, businesses and custom projects.'],
  ['03', 'Burglar Proofing', 'Protective window and property fabrication without sacrificing style.'],
  ['04', 'Custom Metal Works', 'Made-to-measure metal fabrication for ideas that need a custom solution.'],
]

export default function Home() {
  const [menu, setMenu] = useState(false)
  const whatsapp = 'https://wa.me/2348087221638'
  return (
    <main>
      <nav className="nav"><a className="brand" href="#top"><span className="mark">SM</span><span>STEPHEN<br /><small>METAL WORKS</small></span></a><div className={`navlinks ${menu ? 'open' : ''}`}><a href="#services" onClick={() => setMenu(false)}>Services</a><a href="#studio" onClick={() => setMenu(false)}>AI Design Studio</a><a href="#work" onClick={() => setMenu(false)}>Our Work</a><a href="#contact" onClick={() => setMenu(false)}>Contact</a></div><a className="navcta" href={whatsapp} target="_blank">WhatsApp Us ↗</a><button className="menubtn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button></nav>
      <section className="hero" id="top"><div className="hero-copy"><div className="eyebrow"><span /> IBADAN · NIGERIA · WORLDWIDE PROJECTS</div><h1>Metalwork<br /><em>with character.</em></h1><p>Custom gates, doors, security work and fabrication—designed around your space and built to last.</p><div className="actions"><a className="button primary" href="#studio">Design Your Project ↗</a><a className="button ghost" href="#work">Explore Our Work</a></div><div className="trust"><b>01</b><span>Made to measure</span><b>02</b><span>Built for durability</span><b>03</b><span>Local & international clients</span></div></div><div className="hero-art" aria-label="Metal fabrication visual"><div className="ring r1"/><div className="ring r2"/><div className="gate"><div className="gatebar"/><div className="gatebar"/><div className="gatebar"/><div className="gatebar"/><div className="gatebar"/></div><div className="artlabel">SMW / 01<br /><span>CRAFT · FORM · FUNCTION</span></div></div></section>
      <section className="intro section"><div className="sectiontag">THE WORK</div><div><h2>From an idea in your head<br /><em>to metal in your hands.</em></h2><p>Whether you have a reference photo or only a rough idea, Stephen Metal Works helps turn it into a practical, buildable concept.</p></div></section>
      <section className="services section" id="services"><div className="sectionhead"><div className="sectiontag">WHAT WE DO</div><p>Fabrication that balances strength, detail and the character of your property.</p></div><div className="servicegrid">{services.map(([n,t,d]) => <article className="service" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="#quote">Discuss a project ↗</a></article>)}</div></section>
      <section className="studio section" id="studio"><div className="studio-copy"><div className="sectiontag">STEPHEN AI DESIGN STUDIO</div><h2>Don't have a picture?<br /><em>Describe what you imagine.</em></h2><p>Tell our design assistant what you want—a modern gate, a luxury door, a security pattern or something completely original. Generate a concept, refine it, then send it to Stephen Metal Works for a quote.</p><div className="prompt">“I want a modern black double gate with simple horizontal lines, a pedestrian door and a premium finish.”</div></div><AIStudio /></section>
      <section className="work section" id="work"><div className="sectionhead"><div><div className="sectiontag">OUR WORK</div><h2>A portfolio ready for <em>your best projects.</em></h2></div><p>Project photos can be added from the admin dashboard as the business grows.</p></div><div className="workgrid"><div className="placeholder large"><span>PROJECT 01</span><b>Your next signature gate</b></div><div className="placeholder"><span>PROJECT 02</span><b>Custom doors</b></div><div className="placeholder"><span>PROJECT 03</span><b>Security & detail</b></div></div></section>
      <section className="quote section" id="quote"><div className="quoteinner"><div className="sectiontag">REQUEST A QUOTE</div><h2>Tell us what you want.<br /><em>We'll take it from there.</em></h2><p>Give us the basic details below. You can describe your idea even if you don't have a picture.</p><QuoteForm /></div></section>
      <footer id="contact"><div><a className="brand" href="#top"><span className="mark">SM</span><span>STEPHEN<br /><small>METAL WORKS</small></span></a><p>Precision in Metal. Built to Last.</p></div><div><b>CONTACT</b><a href="tel:08058464190">0805 846 4190</a><a href={whatsapp} target="_blank">WhatsApp: 0808 722 1638</a></div><div><b>LOCATION</b><p>Agaloke, off Kunrotola Filling Station,<br />Apata, Ibadan, Nigeria</p></div><div><b>AVAILABILITY</b><p>Serving clients in Ibadan, across Nigeria<br />and selected projects abroad.</p></div></footer><a className="floatwa" href={whatsapp} target="_blank" aria-label="Chat on WhatsApp">◔</a>
    </main>
  )
}
