'use client'
import { useState } from 'react'
const CATEGORIES=['All','Gates','Doors','Burglar Proofing','Railings','Staircases','Custom']
const projects=[
 {id:1,title:'Apata dual-leaf gate',category:'Gates',location:'Apata, Ibadan',materials:'Mild steel, powder-coated black',completed:'2026-06',img:null},
 {id:2,title:'Bodija estate railing run',category:'Railings',location:'Bodija, Ibadan',materials:'Stainless steel, brushed finish',completed:'2026-05',img:null},
 {id:3,title:'Ring Road office burglar-proofing',category:'Burglar Proofing',location:'Ring Road, Ibadan',materials:'Mild steel, grey finish',completed:'2026-04',img:null},
 {id:4,title:'Akobo spiral staircase',category:'Staircases',location:'Akobo, Ibadan',materials:'Steel frame, wood treads',completed:'2026-03',img:null},
]
export default function Portfolio(){const [cat,setCat]=useState('All');const [active,setActive]=useState<any>(null);const filtered=cat==='All'?projects:projects.filter(p=>p.category===cat);return <div className="portfolio"><div className="portfolio-filters">{CATEGORIES.map(c=><button key={c} onClick={()=>setCat(c)} className={cat===c?'active':''}>{c}</button>)}</div><div className="portfolio-grid">{filtered.map(p=><button key={p.id} className="portfolio-card" onClick={()=>setActive(p)}><div className="portfolio-photo">{p.img?<img src={p.img} alt={p.title}/>:<span>PHOTO PENDING</span>}</div><strong>{p.title}</strong><small>{p.location}</small></button>)}</div>{active&&<div className="portfolio-modal" onClick={()=>setActive(null)}><div className="portfolio-modal-card" onClick={e=>e.stopPropagation()}><div className="portfolio-photo large">{active.img?<img src={active.img} alt={active.title}/>:<span>PHOTO PENDING</span>}</div><h3>{active.title}</h3><p>{active.location}</p><p>Materials: {active.materials}</p><p>Completed: {active.completed}</p><button className="button primary" onClick={()=>setActive(null)}>Close</button></div></div>}</div>}
