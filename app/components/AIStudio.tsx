'use client'

import { useState } from 'react'

export default function AIStudio() {
  const [description, setDescription] = useState('')
  const [projectType, setProjectType] = useState('Gate')
  const [style, setStyle] = useState('Modern')
  const [material, setMaterial] = useState('Steel')
  const [colour, setColour] = useState('Black')
  const [dimensions, setDimensions] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState('')
  const [concept, setConcept] = useState<any>(null)
  const [image, setImage] = useState('')

  async function generate() {
    setError(''); setImageError(''); setConcept(null); setImage('')
    if (description.trim().length < 8) { setError('Please describe your idea in a little more detail.'); return }
    setLoading(true)
    try {
      const res = await fetch('https://hyeutqboexofqqcqutlp.supabase.co/functions/v1/ai-design', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description, projectType, style, material, colour, dimensions }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to create the concept.')
      setConcept(data.concept)
      generateImage(data.concept)
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to create the concept.') }
    finally { setLoading(false) }
  }

  async function generateImage(aiConcept: any) {
    setImageLoading(true); setImageError('')
    try {
      const res = await fetch('https://hyeutqboexofqqcqutlp.supabase.co/functions/v1/ai-design-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description, projectType, style, material, colour, dimensions, conceptName: aiConcept?.concept_name, designFeatures: aiConcept?.design_features }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to generate the visual design.')
      setImage(data.image || '')
    } catch (e) { setImageError(e instanceof Error ? e.message : 'Unable to generate the visual design.') }
    finally { setImageLoading(false) }
  }

  return <div className="ai-studio-live">
    <div className="ai-form">
      <label>What do you want to build?<select value={projectType} onChange={e => setProjectType(e.target.value)}><option>Gate</option><option>Door</option><option>Burglar Proofing</option><option>Railing</option><option>Staircase</option><option>Custom Metal Work</option></select></label>
      <label>Describe your idea<textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Example: I want a large black double gate with clean horizontal lines, a pedestrian door and a premium look." /></label>
      <div className="ai-options"><label>Style<select value={style} onChange={e => setStyle(e.target.value)}><option>Modern</option><option>Classic</option><option>Luxury</option><option>Minimal</option><option>Industrial</option></select></label><label>Material<select value={material} onChange={e => setMaterial(e.target.value)}><option>Steel</option><option>Stainless steel</option><option>Aluminium</option><option>Not sure yet</option></select></label><label>Finish<select value={colour} onChange={e => setColour(e.target.value)}><option>Black</option><option>White</option><option>Grey</option><option>Metallic</option><option>Not sure yet</option></select></label></div>
      <label>Approximate dimensions (optional)<input value={dimensions} onChange={e => setDimensions(e.target.value)} placeholder="e.g. 5m wide x 2.4m high" /></label>
      <button className="button primary" onClick={generate} disabled={loading}>{loading ? 'Creating your concept…' : 'Generate My Design ↗'}</button>
      {error && <p className="formstatus">{error}</p>}
    </div>
    <div className="ai-result">
      {concept ? <>
        <div className="sectiontag">AI CONCEPT</div>
        {imageLoading ? <div className="ai-image-loading"><span>✦</span><p>Creating your visual design…</p><small>This can take a little longer than the written concept.</small></div> : image ? <div className="ai-image-wrap"><img src={image} alt={`${concept.concept_name} visual concept`} /><div className="ai-image-label">AI VISUAL CONCEPT · FOR DESIGN DIRECTION</div></div> : imageError ? <div className="ai-image-error">{imageError}</div> : null}
        <h3>{concept.concept_name}</h3>
        <p>{concept.customer_summary}</p>
        <h4>Design features</h4><ul>{(concept.design_features || []).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
        <h4>Practical notes</h4><p>{concept.practical_notes}</p>
        <button className="button light" onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}>Request a Quote for This Design ↗</button>
      </> : <div className="ai-empty"><span>✦</span><h3>Your concept will appear here</h3><p>Describe what you imagine. The assistant will turn it into a clear design direction and visual concept for Stephen Metal Works.</p></div>}
    </div>
  </div>
}
