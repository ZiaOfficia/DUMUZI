import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, LogOut, Settings, ChevronDown, Package } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { CartPanel } from '../common/CartPanel';

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';
const GOLDF = 'rgba(212,165,90,0.55)';

const navLinks = [
  { name: 'Home',        path: '/' },
  { name: 'About Us',    path: '/about' },
  { name: 'Gallery',     path: '/collections' },
  { name: 'Blog',        path: '/blog' },
  { name: 'Contact',     path: '/contact' },
];

const IconBtn = ({
  children, label, onClick, active = false,
}: { children: React.ReactNode; label?: string; onClick?: () => void; active?: boolean }) => (
  <button
    aria-label={label}
    onClick={onClick}
    className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 group/icon cursor-pointer"
    style={{
      background: active ? 'rgba(212,165,90,0.12)' : 'rgba(212,165,90,0)',
      border: active ? '1px solid rgba(212,165,90,0.3)' : '1px solid rgba(212,165,90,0)',
      color: active ? GOLDL : GOLDF,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = GOLDL;
      e.currentTarget.style.background = 'rgba(212,165,90,0.08)';
      e.currentTarget.style.borderColor = 'rgba(212,165,90,0.22)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = active ? GOLDL : GOLDF;
      e.currentTarget.style.background = active ? 'rgba(212,165,90,0.12)' : 'rgba(212,165,90,0)';
      e.currentTarget.style.borderColor = active ? 'rgba(212,165,90,0.3)' : 'rgba(212,165,90,0)';
    }}
  >
    {children}
  </button>
);

export const Navbar = () => {
  const { totalItems }               = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { success }                  = useToast();
  const { pathname }                 = useLocation();
  const navigate                     = useNavigate();
  const [scrolled, setScrolled]      = useState(false);
  const [menuOpen, setMenuOpen]      = useState(false);
  const [cartOpen, setCartOpen]      = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [searchOpen, setSearchOpen]  = useState(false);
  const [searchTerm, setSearchTerm]  = useState('');
  const dropRef                      = useRef<HTMLDivElement>(null);
  const searchRef                    = useRef<HTMLDivElement>(null);
  const searchInputRef               = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setUserDropOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/collections?search=${encodeURIComponent(term)}`);
    setSearchOpen(false);
    setSearchTerm('');
  };

  const handleLogout = async () => {
    await logout();
    setUserDropOpen(false);
    success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
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
      {/* Marketplace bar */}
      <div
        className="w-full flex items-center justify-center gap-2 px-3 py-1.5 flex-wrap"
        style={{
          background: 'rgba(0,0,0,0.35)',
          borderBottom: '1px solid rgba(212,165,90,0.1)',
        }}
      >
        <a
          href="https://www.meesho.com/LITTLEFUNFOODSBEVERAGESPRIVATELIMITED?ms=2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.03]"
          style={{
            background: 'linear-gradient(135deg, #9F2089 0%, #6a148a 100%)',
            color: '#fdf2fb',
            boxShadow: '0 2px 10px rgba(159,32,137,0.35)',
          }}
        >
          Buy from Meesho
        </a>
        <a
          href="https://amzn.in/d/0ihpOhSG"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.03]"
          style={{
            background: 'linear-gradient(135deg, #FF9900 0%, #e07b00 100%)',
            color: '#131921',
            boxShadow: '0 2px 10px rgba(255,153,0,0.3)',
          }}
        >
          Buy from Amazon
        </a>
      </div>

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
          <div className="relative" ref={searchRef}>
            <IconBtn label="Search" active={searchOpen} onClick={() => setSearchOpen(v => !v)}>
              <Search size={16} />
            </IconBtn>
            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  onSubmit={handleSearchSubmit}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-[calc(100%+10px)] w-64 sm:w-72"
                  style={{
                    background: 'rgba(13,8,5,0.98)',
                    border: '1px solid rgba(212,165,90,0.22)',
                    borderRadius: 14,
                    padding: 8,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(212,165,90,0.5)' }} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Escape') setSearchOpen(false); }}
                      placeholder="Search confections…"
                      className="w-full pl-8 pr-3 py-2.5 rounded-lg text-[13px] font-sans outline-none"
                      style={{
                        background: 'rgba(212,165,90,0.07)',
                        border: '1px solid rgba(212,165,90,0.2)',
                        color: 'var(--cream)',
                      }}
                    />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* User: dropdown if logged in, link if guest */}
          {isAuthenticated && user ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setUserDropOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-semibold"
                style={{
                  background: userDropOpen ? 'rgba(212,165,90,0.1)' : 'rgba(212,165,90,0)',
                  border: `1px solid ${userDropOpen ? 'rgba(212,165,90,0.3)' : 'rgba(212,165,90,0)'}`,
                  color: GOLDL,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { if (!userDropOpen) { e.currentTarget.style.background = 'rgba(212,165,90,0.07)'; e.currentTarget.style.borderColor = 'rgba(212,165,90,0.2)'; }}}
                onMouseLeave={e => { if (!userDropOpen) { e.currentTarget.style.background = 'rgba(212,165,90,0)'; e.currentTarget.style.borderColor = 'rgba(212,165,90,0)'; }}}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: '#0d0805' }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={11} style={{ opacity: 0.6, flexShrink: 0, transform: userDropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              <AnimatePresence>
                {userDropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-50"
                    style={{
                      background: 'rgba(18,12,8,0.98)',
                      border: '1px solid rgba(212,165,90,0.2)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(24px)',
                    }}
                  >
                    <Link
                      to="/profile"
                      onClick={() => setUserDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-xs font-semibold transition-colors"
                      style={{ color: 'rgba(212,165,90,0.7)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,165,90,0.07)'; e.currentTarget.style.color = GOLDL; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(212,165,90,0.7)'; }}
                    >
                      <Settings size={13} /> My Profile
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setUserDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-xs font-semibold transition-colors"
                      style={{ color: 'rgba(212,165,90,0.7)', borderTop: '1px solid rgba(212,165,90,0.08)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,165,90,0.07)'; e.currentTarget.style.color = GOLDL; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(212,165,90,0.7)'; }}
                    >
                      <ShoppingBag size={13} /> My Cart {totalItems > 0 && `(${totalItems})`}
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={() => setUserDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-xs font-semibold transition-colors"
                      style={{ color: 'rgba(212,165,90,0.7)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,165,90,0.07)'; e.currentTarget.style.color = GOLDL; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(212,165,90,0.7)'; }}
                    >
                      <Package size={13} /> My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-semibold transition-colors"
                      style={{ color: 'rgba(239,68,68,0.7)', background: 'none', border: 'none', borderTop: '1px solid rgba(212,165,90,0.08)', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#ef4444'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(239,68,68,0.7)'; }}
                    >
                      <LogOut size={13} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login">
              <IconBtn label="Account"><User size={16} /></IconBtn>
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
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
                ✦ DUMUZI ✦
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>

    <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};
