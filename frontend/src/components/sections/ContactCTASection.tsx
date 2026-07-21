import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GOLD = '#d4a373';
const GOLDL = '#e5c199';

const contactCards = [
  {
    icon: MessageCircle,
    title: 'Marriage Gifting',
    desc: 'Curated confection favours and gift boxes for weddings and marriage celebrations.',
    cta: 'Start a Commission',
    path: '/contact',
  },
  {
    icon: Mail,
    title: 'Corporate Gifting',
    desc: 'Branded gift sets for clients and teams. From 50 to 5,000 units, with full logo integration.',
    cta: 'Request a Quote',
    path: '/contact',
  },
  {
    icon: Phone,
    title: 'Customize Gifts',
    desc: 'Personalise your own gift box — choose the flavours, packaging, and finishing touches.',
    cta: 'Start Customizing',
    path: '/contact',
  },
];

export const ContactCTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: 'linear-gradient(145deg, var(--bg-dark) 0%, var(--bg-deep) 100%)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-10"
        style={{ background: GOLD }} />

      {/* Lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.25),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg,transparent,${GOLD})` }} />
            <span className="text-[10px] tracking-[0.32em] uppercase font-bold text-gold-gradient font-sans">Work With Us</span>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg,${GOLD},transparent)` }} />
          </div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--cream)' }}>
            Let's Create Something<br />
            <span className="text-gold-gradient italic font-display">Extraordinary</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto font-sans" style={{ color: 'var(--muted)' }}>
            Whether it's a personal order, a corporate programme, or a hands-on masterclass — our team is ready to craft something special for you.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map(({ icon: Icon, title, desc, cta, path }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.1 }}
              onClick={() => navigate(path)}
              className="group cursor-pointer flex flex-col p-7 rounded-3xl glass-card glass-card-hover"
              style={{ border: '1px solid rgba(212,163,115,0.15)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(212,163,115,0.1)', border: '1px solid rgba(212,163,115,0.22)' }}>
                <Icon size={24} style={{ color: GOLD }} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--cream)' }}>{title}</h3>
              <p className="text-[12px] leading-relaxed font-sans mb-6 flex-1" style={{ color: 'var(--muted)' }}>{desc}</p>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                style={{ color: GOLDL }}>
                {cta} <ArrowRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-xs tracking-[0.2em] uppercase font-bold border-none cursor-pointer transition-all duration-300"
            style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--bg-deep)', boxShadow: '0 12px 35px rgba(212,163,115,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 55px rgba(212,163,115,0.6)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 12px 35px rgba(212,163,115,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Get In Touch <ArrowRight size={16} />
          </button>
          <p className="text-[11px] mt-4 font-sans" style={{ color: 'rgba(212,163,115,0.4)' }}>
            We reply within 1–2 business days · hello@dumuzi.com
          </p>
        </motion.div>
      </div>
    </section>
  );
};
