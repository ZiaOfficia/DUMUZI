import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const GOLD='#d4a373'; const GOLDL='#e5c199';

const navLinks = [
  { name:'Home',             path:'/' },
  { name:'Collections',      path:'/collections' },
  { name:'Best Chocolate',   path:'/best-chocolate' },
  { name:'About Us',         path:'/about' },
  { name:'Blog',             path:'/blog' },
  { name:'Contact',          path:'/contact' },
];

export const Navbar = () => {
  const { totalItems } = useCart();
  const { pathname }   = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ duration:0.7, ease:[0.25,0.1,0.25,1] }}
      style={{
        background: scrolled ? 'rgba(15,10,7,0.97)' : 'rgba(15,10,7,0.78)',
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        borderBottom: scrolled ? `1px solid rgba(212,163,115,0.25)` : `1px solid rgba(212,163,115,0.1)`,
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
        transition:'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-[68px]">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none flex-shrink-0">
          <span className="font-display text-xl lg:text-[22px] tracking-wider"
            style={{ fontWeight:800, background:`linear-gradient(135deg,${GOLD},${GOLDL})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            DUMUZI
          </span>
          <span className="text-[8px] tracking-[0.4em] uppercase" style={{ color:'rgba(212,163,115,0.45)' }}>Luxury Chocolates</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map(({ name, path }) => {
            const active = pathname === path;
            return (
              <li key={name} className="relative">
                <Link to={path} className="text-[13px] tracking-wide transition-colors duration-200"
                  style={{ color:active ? GOLD : 'rgba(212,163,115,0.6)', fontWeight:active ? 600 : 400 }}
                  onMouseEnter={e=>{ if(!active) e.currentTarget.style.color='#f9f6f0'; }}
                  onMouseLeave={e=>{ if(!active) e.currentTarget.style.color='rgba(212,163,115,0.6)'; }}>
                  {name}
                </Link>
                {active && (
                  <motion.div layoutId="activeNav"
                    className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full"
                    style={{ background:`linear-gradient(90deg,transparent,${GOLD},transparent)` }}
                    transition={{ type:'spring', stiffness:380, damping:30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4 lg:gap-5">
          {[Search, User].map((Icon, i) => (
            <button key={i} style={{ color:'rgba(212,163,115,0.6)', background:'none', border:'none', cursor:'pointer', padding:0, transition:'color 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.color=GOLD; }}
              onMouseLeave={e=>{ e.currentTarget.style.color='rgba(212,163,115,0.6)'; }}>
              <Icon size={18} />
            </button>
          ))}
          <button className="relative" style={{ color:'rgba(212,163,115,0.6)', background:'none', border:'none', cursor:'pointer', padding:0, transition:'color 0.2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.color=GOLD; }}
            onMouseLeave={e=>{ e.currentTarget.style.color='rgba(212,163,115,0.6)'; }}>
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <motion.span initial={{ scale:0 }} animate={{ scale:1 }}
                className="absolute -top-2 -right-2 text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
                style={{ background:GOLD, color:'#0f0a07' }}>
                {totalItems}
              </motion.span>
            )}
          </button>
          <button className="lg:hidden" style={{ color:'rgba(212,163,115,0.6)', background:'none', border:'none', cursor:'pointer', padding:0 }}
            onClick={() => setMenuOpen(v => !v)}>
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.span key="x"   initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }}  transition={{ duration:0.2 }}><X    size={20}/></motion.span>
                : <motion.span key="men" initial={{ rotate:90,opacity:0 }}  animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }} transition={{ duration:0.2 }}><Menu size={20}/></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height:0,opacity:0 }} animate={{ height:'auto',opacity:1 }} exit={{ height:0,opacity:0 }}
            transition={{ duration:0.32, ease:[0.25,0.1,0.25,1] }}
            className="overflow-hidden lg:hidden"
            style={{ background:'rgba(15,10,7,0.98)', borderTop:`1px solid rgba(212,163,115,0.15)` }}>
            <ul className="flex flex-col px-6 py-5 gap-4">
              {navLinks.map(({ name, path }) => {
                const active = pathname === path;
                return (
                  <li key={name}>
                    <Link to={path} className="flex items-center gap-3 text-sm tracking-wide transition-colors duration-200"
                      style={{ color:active ? GOLD : 'rgba(212,163,115,0.6)', fontWeight:active ? 600 : 400 }}
                      onClick={() => setMenuOpen(false)}>
                      {active && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:GOLD }} />}
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
