import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Twitter, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOLD='#d4a373'; const GOLDL='#e5c199';
const quickLinks   = ['Shop All','Collections','Best Sellers','About Us','Contact Us','Track Order'];
const serviceLinks = ['FAQ','Shipping & Delivery','Returns & Refunds','Terms & Conditions','Privacy Policy'];
const paymentIcons = ['VISA','MC','PayPal','Apple Pay','G Pay'];
const socials      = [{ Icon:Facebook },{ Icon:Instagram },{ Icon:Youtube },{ Icon:Twitter }];
const item = { hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0, transition:{ duration:0.5 } } };

export const Footer = () => (
  <motion.footer
    initial="hidden" whileInView="visible" viewport={{ once:true }}
    variants={{ hidden:{ opacity:0 }, visible:{ opacity:1, transition:{ staggerChildren:0.1 } } }}
    style={{ background:'linear-gradient(180deg,#0f0a07 0%,#0c0805 100%)', borderTop:`1px solid rgba(212,163,115,0.15)`, position:'relative' }}
  >
    {/* Top glow */}
    <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
      style={{ background:`linear-gradient(90deg,transparent,rgba(212,163,115,0.35),transparent)` }} />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

        {/* Brand */}
        <motion.div variants={item}>
          <Link to="/" className="flex flex-col mb-5">
            <span className="font-display text-2xl tracking-wider" style={{ fontWeight:800, background:`linear-gradient(135deg,${GOLD},${GOLDL})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>DUMUZI</span>
            <span className="text-[9px] tracking-[0.35em] uppercase mt-0.5" style={{ color:'rgba(212,163,115,0.38)' }}>Luxury Chocolates</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6" style={{ color:'rgba(200,191,179,0.7)', lineHeight:'1.75' }}>
            Crafting moments of joy with our luxurious chocolates. Made with love, passion and the finest ingredients.
          </p>
          <div className="flex gap-3">
            {socials.map(({ Icon }, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{ background:'rgba(212,163,115,0.07)', border:`1px solid rgba(212,163,115,0.16)`, color:'rgba(212,163,115,0.55)' }}
                onMouseEnter={e=>{ const el=e.currentTarget; el.style.background='rgba(212,163,115,0.16)'; el.style.borderColor='rgba(212,163,115,0.45)'; el.style.color=GOLDL; el.style.transform='translateY(-3px)'; el.style.boxShadow=`0 6px 20px rgba(212,163,115,0.2)`; }}
                onMouseLeave={e=>{ const el=e.currentTarget; el.style.background='rgba(212,163,115,0.07)'; el.style.borderColor='rgba(212,163,115,0.16)'; el.style.color='rgba(212,163,115,0.55)'; el.style.transform='translateY(0)'; el.style.boxShadow='none'; }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={item}>
          <h4 className="text-[10px] tracking-[0.28em] uppercase mb-5 font-bold" style={{ color:GOLD }}>Quick Links</h4>
          <ul className="flex flex-col gap-3">
            {quickLinks.map(link => (
              <li key={link}>
                <Link to="/" className="text-sm transition-all duration-200 inline-block" style={{ color:'rgba(200,191,179,0.6)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color=GOLDL; e.currentTarget.style.paddingLeft='6px'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.color='rgba(200,191,179,0.6)'; e.currentTarget.style.paddingLeft='0'; }}>{link}</Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Service */}
        <motion.div variants={item}>
          <h4 className="text-[10px] tracking-[0.28em] uppercase mb-5 font-bold" style={{ color:GOLD }}>Customer Service</h4>
          <ul className="flex flex-col gap-3">
            {serviceLinks.map(link => (
              <li key={link}>
                <Link to="/" className="text-sm transition-all duration-200 inline-block" style={{ color:'rgba(200,191,179,0.6)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color=GOLDL; e.currentTarget.style.paddingLeft='6px'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.color='rgba(200,191,179,0.6)'; e.currentTarget.style.paddingLeft='0'; }}>{link}</Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={item}>
          <h4 className="text-[10px] tracking-[0.28em] uppercase mb-5 font-bold" style={{ color:GOLD }}>Newsletter</h4>
          <p className="text-sm mb-5 leading-relaxed" style={{ color:'rgba(200,191,179,0.65)' }}>
            Subscribe for exclusive offers and early access to new collections.
          </p>
          <div className="flex rounded-xl overflow-hidden" style={{ border:`1px solid rgba(212,163,115,0.25)` }}>
            <input type="email" placeholder="Your email address"
              className="flex-1 bg-transparent px-4 py-3 text-xs outline-none"
              style={{ color:'#f9f6f0', background:'rgba(212,163,115,0.04)' }} />
            <button className="px-4 flex items-center justify-center transition-all duration-300 flex-shrink-0"
              style={{ background:`linear-gradient(135deg,${GOLD},${GOLDL})`, border:'none', cursor:'pointer' }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 0 24px rgba(212,163,115,0.55)`; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow='none'; }}>
              <Send size={14} style={{ color:'#0f0a07' }} />
            </button>
          </div>
          <p className="text-[10px] mt-3" style={{ color:'rgba(200,191,179,0.35)' }}>No spam. Unsubscribe at any time.</p>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height:'1px', background:`linear-gradient(90deg,transparent,rgba(212,163,115,0.3),transparent)`, marginBottom:'1.75rem' }} />

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="text-xs" style={{ color:'rgba(200,191,179,0.35)' }}>© 2024 DUMUZI Luxury Chocolates. All Rights Reserved.</p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {paymentIcons.map(icon => (
            <span key={icon} className="text-[9px] tracking-widest px-2.5 py-1 rounded-md font-bold"
              style={{ background:'rgba(212,163,115,0.05)', border:`1px solid rgba(212,163,115,0.14)`, color:'rgba(200,191,179,0.45)' }}>{icon}</span>
          ))}
        </div>
      </div>
    </div>
  </motion.footer>
);
