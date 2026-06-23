import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';
const GOLDF = 'rgba(212,165,90,0.55)';

const navLinks = [
  { name: 'Home',           path: '/' },
  { name: 'Collections',    path: '/collections' },
  { name: 'Best Chocolate', path: '/best-chocolate' },
  { name: 'About Us',       path: '/about' },
  { name: 'Blog',           path: '/blog' },
  { name: 'Contact',        path: '/contact' },
];

const IconBtn = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <button
    aria-label={label}
    className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 group/icon"
    style={{
      background: 'rgba(212,165,90,0)',
      border: '1px solid rgba(212,165,90,0)',
      color: GOLDF,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = GOLDL;
      e.currentTarget.style.background = 'rgba(212,165,90,0.08)';
      e.currentTarget.style.borderColor = 'rgba(212,165,90,0.22)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = GOLDF;
      e.currentTarget.style.background = 'rgba(212,165,90,0)';
      e.currentTarget.style.borderColor = 'rgba(212,165,90,0)';
    }}
  >
    {children}
  </button>
);

export const Navbar = () => {
  const { totalItems } = useCart();
  const { pathname }   = useLocation();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: scrolled
          ? 'rgba(13,8,5,0.97)'
          : 'rgba(13,8,5,0.82)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled
          ? '1px solid rgba(212,165,90,0.22)'
          : '1px solid rgba(212,165,90,0.1)',
        boxShadow: scrolled
          ? '0 4px 40px rgba(0,0,0,0.55), 0 1px 0 rgba(212,165,90,0.08)'
          : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[62px] lg:h-[68px]">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none flex-shrink-0 group">
          <span
            className="font-luxury tracking-[0.12em] transition-all duration-300"
            style={{
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLDL} 50%, ${GOLD} 100%)`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DUMUZI
          </span>
          <span
            className="text-[7.5px] tracking-[0.45em] uppercase mt-0.5 transition-opacity duration-300"
            style={{ color: 'rgba(212,165,90,0.42)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Luxury Chocolates
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ name, path }) => {
            const active = pathname === path;
            return (
              <li key={name} className="relative">
                <Link
                  to={path}
                  className="relative px-4 py-2 rounded-lg text-[13px] tracking-wide transition-all duration-250 inline-block"
                  style={{
                    color: active ? GOLDL : 'rgba(212,165,90,0.52)',
                    fontWeight: active ? 600 : 400,
                    background: active ? 'rgba(212,165,90,0.06)' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--cream)';
                      e.currentTarget.style.background = 'rgba(212,165,90,0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(212,165,90,0.52)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {name}
                  {active && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-0 right-0 flex justify-center"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >
                      <div
                        className="h-[2px] rounded-full"
                        style={{
                          width: '60%',
                          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                        }}
                      />
                    </motion.div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-1 lg:gap-1.5">
          <IconBtn label="Search"><Search size={16} /></IconBtn>
          <IconBtn label="Account"><User size={16} /></IconBtn>

          {/* Cart */}
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(212,165,90,0)',
              border: '1px solid rgba(212,165,90,0)',
              color: GOLDF,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = GOLDL;
              e.currentTarget.style.background = 'rgba(212,165,90,0.08)';
              e.currentTarget.style.borderColor = 'rgba(212,165,90,0.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = GOLDF;
              e.currentTarget.style.background = 'rgba(212,165,90,0)';
              e.currentTarget.style.borderColor = 'rgba(212,165,90,0)';
            }}
            aria-label="Cart"
          >
            <ShoppingBag size={16} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                  color: '#0d0805',
                  boxShadow: '0 2px 8px rgba(212,165,90,0.5)',
                }}
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
            style={{ color: GOLDF, background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.color = GOLDL; }}
            onMouseLeave={e => { e.currentTarget.style.color = GOLDF; }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}  transition={{ duration: 0.2 }}><X    size={20} /></motion.span>
                : <motion.span key="men" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden lg:hidden"
            style={{
              background: 'rgba(13,8,5,0.98)',
              borderTop: '1px solid rgba(212,165,90,0.14)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <ul className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map(({ name, path }) => {
                const active = pathname === path;
                return (
                  <li key={name}>
                    <Link
                      to={path}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm tracking-wide transition-all duration-200"
                      style={{
                        color: active ? GOLDL : 'rgba(212,165,90,0.55)',
                        fontWeight: active ? 600 : 400,
                        background: active ? 'rgba(212,165,90,0.07)' : 'transparent',
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {active && (
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}` }}
                        />
                      )}
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile footer divider */}
            <div className="mx-6 mb-5 pt-4" style={{ borderTop: '1px solid rgba(212,165,90,0.1)' }}>
              <p className="text-[9px] tracking-[0.3em] uppercase text-center" style={{ color: 'rgba(212,165,90,0.3)' }}>
                ✦ DUMUZI Luxury Chocolates ✦
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
