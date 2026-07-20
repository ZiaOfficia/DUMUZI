import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';

const quickLinks = [
  { label: 'Collections', to: '/collections' },
  { label: 'Best Sellers', to: '/best-sellers' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];
const serviceLinks = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & Delivery', to: '/shipping-delivery' },
  { label: 'Returns & Refunds', to: '/returns-refunds' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
];
const paymentIcons = ['VISA', 'MC', 'PayPal', 'Apple Pay', 'G Pay'];

const socials = [
  { Icon: Facebook,  href: '#', label: 'Facebook'  },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube,   href: '#', label: 'YouTube'   },
  { Icon: Twitter,   href: '#', label: 'Twitter'   },
];

const item = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export const Footer = () => (
  <motion.footer
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
    style={{
      background: 'linear-gradient(180deg, #0d0805 0%, #080503 100%)',
      borderTop: '1px solid rgba(212,165,90,0.14)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Decorative ambient glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[120px] pointer-events-none"
      style={{ background: 'rgba(212,165,90,0.05)', top: 0 }} />

    {/* Top accent line */}
    <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
      style={{ background: 'linear-gradient(90deg,transparent,rgba(212,165,90,0.4),transparent)' }} />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-12">

        {/* Brand Column */}
        <motion.div variants={item} className="lg:col-span-1">
          <Link to="/" className="flex flex-col mb-6">
            <span
              className="font-luxury tracking-[0.1em] mb-1"
              style={{
                fontSize: '24px',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLDL} 50%, ${GOLD} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DUMUZI
            </span>
            <span className="text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(212,165,90,0.35)', fontFamily: 'Inter, sans-serif' }}>
              Luxury Confectionery
            </span>
          </Link>

          <p className="text-[13px] leading-[1.75] mb-6 font-sans"
            style={{ color: 'rgba(200,191,179,0.65)', lineHeight: '1.8' }}>
            Crafting moments of pure indulgence with masterfully crafted confectionery, made with the world's finest ingredients.
          </p>

          {/* Contact info */}
          <div className="flex flex-col gap-2 mb-6">
            {[
              { Icon: MapPin, text: 'Lucknow, India' },
              { Icon: Phone,  text: '+91-9161-115-116' },
              { Icon: Mail,   text: 'info@dumuzi.com' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon size={12} style={{ color: 'rgba(212,165,90,0.5)', flexShrink: 0 }} />
                <span className="text-[12px] font-sans" style={{ color: 'rgba(200,191,179,0.5)' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-2.5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(212,165,90,0.06)',
                  border: '1px solid rgba(212,165,90,0.15)',
                  color: 'rgba(212,165,90,0.5)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background     = 'rgba(212,165,90,0.14)';
                  el.style.borderColor    = 'rgba(212,165,90,0.42)';
                  el.style.color          = GOLDL;
                  el.style.transform      = 'translateY(-3px)';
                  el.style.boxShadow      = '0 6px 22px rgba(212,165,90,0.2)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background  = 'rgba(212,165,90,0.06)';
                  el.style.borderColor = 'rgba(212,165,90,0.15)';
                  el.style.color       = 'rgba(212,165,90,0.5)';
                  el.style.transform   = 'translateY(0)';
                  el.style.boxShadow   = 'none';
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={item}>
          <h4 className="text-[10px] tracking-[0.3em] uppercase mb-6 font-bold" style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}>
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {quickLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-[13px] transition-all duration-200 inline-flex items-center gap-1.5 group/link"
                  style={{ color: 'rgba(200,191,179,0.55)', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLDL; e.currentTarget.style.paddingLeft = '6px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,191,179,0.55)'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Service */}
        <motion.div variants={item}>
          <h4 className="text-[10px] tracking-[0.3em] uppercase mb-6 font-bold" style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}>
            Customer Service
          </h4>
          <ul className="flex flex-col gap-3">
            {serviceLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-[13px] transition-all duration-200 inline-block"
                  style={{ color: 'rgba(200,191,179,0.55)', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLDL; e.currentTarget.style.paddingLeft = '6px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,191,179,0.55)'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>


      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(212,165,90,0.28),transparent)',
        marginBottom: '2rem',
      }} />

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="text-[11px] font-sans" style={{ color: 'rgba(200,191,179,0.32)' }}>
          © 2024 DUMUZI. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {paymentIcons.map(icon => (
            <span
              key={icon}
              className="text-[8.5px] tracking-widest px-2.5 py-1 rounded-md font-bold"
              style={{
                background: 'rgba(212,165,90,0.04)',
                border: '1px solid rgba(212,165,90,0.12)',
                color: 'rgba(200,191,179,0.38)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.footer>
);
