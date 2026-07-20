import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { SEO } from '../components/common/SEO';

const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

const InputField = ({
  label, type, value, onChange, icon, placeholder, required = true,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; icon: React.ReactNode;
  placeholder?: string; required?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(212,163,115,0.6)' }}>
        {label}
      </label>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,163,115,0.18)' }}
      >
        <span style={{ color: 'rgba(212,163,115,0.45)', flexShrink: 0 }}>{icon}</span>
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="flex-1 bg-transparent outline-none text-sm font-sans"
          style={{ color: 'var(--cream)' }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="flex-shrink-0 opacity-40 hover:opacity-80 transition-opacity"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cream)' }}
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const LoginPage = () => {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy]       = useState(false);

  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Redirect to original page after login, or /collections
  const from = (location.state as { from?: string })?.from ?? '/collections';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await login(email.trim(), password);
      success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'var(--bg-deep)' }}
    >
      <SEO title="Login — DUMUZI" description="Sign in to your DUMUZI account" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span
              className="font-display text-2xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DUMUZI
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--cream)' }}>
            Welcome back
          </h1>
          <p className="text-sm font-sans" style={{ color: 'var(--muted)' }}>
            Sign in to view your cart and orders
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(26,18,13,0.85)',
            border: '1px solid rgba(212,163,115,0.2)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <InputField
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              icon={<Mail size={15} />}
              placeholder="you@example.com"
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              icon={<Lock size={15} />}
              placeholder="••••••••"
            />

            <button
              type="submit"
              disabled={busy}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 mt-2"
              style={{
                background: busy ? 'rgba(212,163,115,0.4)' : `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
                color: 'var(--bg-deep)',
                boxShadow: busy ? 'none' : '0 8px 24px rgba(212,163,115,0.3)',
                cursor: busy ? 'not-allowed' : 'pointer',
                border: 'none',
              }}
            >
              {busy ? (
                <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(0,0,0,0.3)', borderTopColor: 'var(--bg-deep)' }} />
              ) : (
                <><LogIn size={15} /> Sign In</>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(212,163,115,0.1)' }}>
            <p className="text-sm font-sans" style={{ color: 'var(--muted)' }}>
              Don't have an account?{' '}
              <Link
                to="/register"
                state={{ from }}
                className="font-semibold transition-colors"
                style={{ color: GOLD }}
                onMouseEnter={e => { e.currentTarget.style.color = GOLDL; }}
                onMouseLeave={e => { e.currentTarget.style.color = GOLD; }}
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
