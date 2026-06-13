import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const messages = [
  'FREE DELIVERY on orders above ₹500',
  'Handcrafted with the Finest Premium Cocoa',
  'New Collection — DUMUZI Gold Series Now Available',
];

export const TopBar = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + messages.length) % messages.length);
  const next = () => setIdx(i => (i + 1) % messages.length);
  return (
    <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
      className="w-full flex items-center justify-between px-4"
      style={{ background:'linear-gradient(90deg,#1a120d 0%,#251208 50%,#1a120d 100%)', borderBottom:'1px solid rgba(212,163,115,0.18)', minHeight:36 }}>
      <button onClick={prev} style={{ color:'rgba(212,163,115,0.5)', background:'none', border:'none', cursor:'pointer', padding:'0 4px', transition:'color 0.2s' }}
        onMouseEnter={e=>{ e.currentTarget.style.color='#d4a373'; }} onMouseLeave={e=>{ e.currentTarget.style.color='rgba(212,163,115,0.5)'; }}>
        <ChevronLeft size={14} />
      </button>
      <motion.p key={idx} initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
        className="text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.24em] uppercase font-semibold text-center flex-1"
        style={{ color:'#e5c199' }}>
        <span style={{ color:'#d4a373', marginRight:8 }}>✦</span>
        {messages[idx]}
        <span style={{ color:'#d4a373', marginLeft:8 }}>✦</span>
      </motion.p>
      <button onClick={next} style={{ color:'rgba(212,163,115,0.5)', background:'none', border:'none', cursor:'pointer', padding:'0 4px', transition:'color 0.2s' }}
        onMouseEnter={e=>{ e.currentTarget.style.color='#d4a373'; }} onMouseLeave={e=>{ e.currentTarget.style.color='rgba(212,163,115,0.5)'; }}>
        <ChevronRight size={14} />
      </button>
    </motion.div>
  );
};
