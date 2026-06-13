import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const GOLD = '#d4a373';
const GOLDL = '#e5c199';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          loading="lazy"
          decoding="async"
          src="/images/products/LF-H12T.jpeg"
          alt="DUMUZI Heart 12 Trios Gift Box"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,6,4,0.82)' }} />
        {/* Gold ambient glow centre */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full blur-[160px] opacity-15" style={{ background: GOLD }} />
        </div>
      </div>

      {/* Top / Bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.35),transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(212,163,115,0.35),transparent)' }} />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
          style={{ background: 'rgba(212,163,115,0.1)', border: `1px solid rgba(212,163,115,0.25)` }}
        >
          <Sparkles size={12} style={{ color: GOLD }} />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: GOLDL }}>Members Only</span>
          <Sparkles size={12} style={{ color: GOLD }} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display font-bold mb-5"
          style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', color: 'var(--cream)', lineHeight: 1.15 }}
        >
          First Access to<br />
          <span className="text-gold-gradient italic font-display">New Collections</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-sm leading-relaxed mb-10 font-sans"
          style={{ color: 'rgba(220,214,205,0.65)' }}
        >
          Subscribe for early access to seasonal releases, exclusive offers, and artisan guides from our master chocolatiers. Sent quarterly — never spam.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.22 }}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})` }}>
                <Send size={20} style={{ color: 'var(--choc-deep)' }} />
              </div>
              <p className="font-display text-lg" style={{ color: 'var(--cream)' }}>You're on the list.</p>
              <p className="text-[12px] font-sans" style={{ color: 'rgba(212,163,115,0.55)' }}>Expect exclusive access with our next collection launch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-full outline-none text-sm font-sans"
                style={{
                  background: 'rgba(212,163,115,0.07)',
                  border: '1px solid rgba(212,163,115,0.25)',
                  color: 'var(--cream)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,163,115,0.55)'; e.currentTarget.style.background = 'rgba(212,163,115,0.1)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,163,115,0.25)'; e.currentTarget.style.background = 'rgba(212,163,115,0.07)'; }}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider border-none cursor-pointer transition-all duration-300 flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${GOLD},${GOLDL})`, color: 'var(--choc-deep)', boxShadow: '0 8px 25px rgba(212,163,115,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 14px 40px rgba(212,163,115,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(212,163,115,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
          )}
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[10px] mt-5 font-sans"
          style={{ color: 'rgba(212,163,115,0.3)' }}
        >
          No spam. Unsubscribe any time. We respect your inbox.
        </motion.p>
      </div>
    </section>
  );
};

export default NewsletterSection;
