/**
 * GuestGate — the one-time "sign in or carry on as a guest?" prompt.
 *
 * The first time a shopper puts something in their cart we ask how they want to
 * buy. Choosing "Continue as Guest" is remembered, so we never interrupt them
 * again: every later add goes straight into the cart, and the cart and checkout
 * label them a guest throughout.
 *
 * The choice is deliberately *not* a login wall — the item they clicked is still
 * added the moment they pick guest, so nothing is lost to the detour.
 */
import {
  createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, ShoppingBag, X, UserRound } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useToast } from '../components/common/Toast';

const GOLD  = '#d4a55a';
const GOLDL = '#e8c07a';

// Remembered so the prompt is genuinely once-per-shopper, not once-per-visit.
const GUEST_MODE_KEY = 'dumuzi_guest_mode';

const readGuestMode = () => {
  try { return localStorage.getItem(GUEST_MODE_KEY) === '1'; } catch { return false; }
};

interface GuestGateContextType {
  /** True once the shopper has chosen to buy without an account. */
  isGuest: boolean;
  /** Record the guest choice (also used by the Login page's guest button). */
  continueAsGuest: () => void;
  /**
   * Run `proceed` if we already know who's buying, otherwise open the prompt
   * and run it once they choose guest. Returns true if it ran straight away.
   */
  ensureIdentity: (proceed: () => void) => boolean;
}

const GuestGateContext = createContext<GuestGateContextType | undefined>(undefined);

export function GuestGateProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [guestChoice, setGuestChoice] = useState(readGuestMode);
  const [open, setOpen]               = useState(false);

  // Held in a ref, not state: it's a callback, and setState would try to call it.
  const pending = useRef<(() => void) | null>(null);

  // Signing in supersedes the choice, so it's derived rather than stored twice —
  // a member is never a guest, whatever an earlier visit remembered.
  const isGuest = !isAuthenticated && guestChoice;

  // Drop the remembered flag once they have an account, so a later visit starts
  // from the prompt again instead of silently resuming guest mode.
  useEffect(() => {
    if (!isAuthenticated) return;
    try { localStorage.removeItem(GUEST_MODE_KEY); } catch { /* storage unavailable */ }
  }, [isAuthenticated]);

  const continueAsGuest = useCallback(() => {
    setGuestChoice(true);
    try { localStorage.setItem(GUEST_MODE_KEY, '1'); } catch { /* storage unavailable */ }
  }, []);

  const ensureIdentity = useCallback((proceed: () => void) => {
    // Never block a click on an in-flight auth check — the cart merges either way.
    if (isAuthenticated || isGuest || authLoading) {
      proceed();
      return true;
    }
    pending.current = proceed;
    setOpen(true);
    return false;
  }, [isAuthenticated, isGuest, authLoading]);

  const chooseGuest = useCallback(() => {
    continueAsGuest();
    setOpen(false);
    pending.current?.();
    pending.current = null;
    success('Added to your guest cart — you can check out without an account');
  }, [continueAsGuest, success]);

  const chooseSignIn = useCallback(() => {
    setOpen(false);
    pending.current = null; // re-added by whichever button they click after signing in
    navigate('/login', { state: { from: location.pathname } });
  }, [navigate, location.pathname]);

  const dismiss = useCallback(() => {
    setOpen(false);
    pending.current = null;
  }, []);

  return (
    <GuestGateContext.Provider value={{ isGuest, continueAsGuest, ensureIdentity }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="guest-gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] flex items-center justify-center px-5"
              style={{ background: 'rgba(8,5,3,0.78)', backdropFilter: 'blur(6px)' }}
              onClick={dismiss}
              role="dialog"
              aria-modal="true"
              aria-label="Sign in or continue as a guest"
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-2xl p-7"
                style={{
                  background: 'linear-gradient(160deg, #1a120d 0%, #120c08 100%)',
                  border: '1px solid rgba(212,165,90,0.2)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                }}
              >
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Close"
                  className="absolute top-4 right-4 p-1 rounded-full"
                  style={{ color: 'rgba(220,214,205,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>

                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(212,165,90,0.12)', border: '1px solid rgba(212,165,90,0.28)' }}
                >
                  <ShoppingBag size={18} style={{ color: GOLD }} />
                </div>

                <h2 className="font-display font-bold text-xl mb-1.5" style={{ color: 'var(--cream)' }}>
                  How would you like to buy?
                </h2>
                <p className="text-sm font-sans leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                  Sign in to save your details and track your orders — or carry on as a
                  guest and check out in a couple of taps.
                </p>

                <button
                  type="button"
                  onClick={chooseSignIn}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                    color: '#0d0805',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(212,165,90,0.25)',
                  }}
                >
                  <LogIn size={15} /> Sign In
                </button>

                <button
                  type="button"
                  onClick={chooseGuest}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: GOLDL,
                    border: '1px solid rgba(212,165,90,0.4)',
                    cursor: 'pointer',
                  }}
                >
                  <UserRound size={15} /> Continue as Guest
                </button>

                <p className="text-[11px] text-center mt-3 font-sans" style={{ color: 'rgba(220,214,205,0.35)' }}>
                  Your item goes into the cart either way — we only ask once.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </GuestGateContext.Provider>
  );
}

export function useGuestGate() {
  const ctx = useContext(GuestGateContext);
  if (!ctx) throw new Error('useGuestGate must be used inside GuestGateProvider');
  return ctx;
}
