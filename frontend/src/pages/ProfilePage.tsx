import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { authApi } from '../services/api';
import { SEO } from '../components/common/SEO';
import { useNavigate } from 'react-router-dom';

const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="rounded-2xl p-6 sm:p-8"
    style={{
      background: 'rgba(26,18,13,0.85)',
      border: '1px solid rgba(212,163,115,0.15)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
    }}
  >
    <h2 className="font-display text-xl font-bold mb-6 pb-4" style={{ color: 'var(--cream)', borderBottom: '1px solid rgba(212,163,115,0.12)' }}>
      {title}
    </h2>
    {children}
  </div>
);

const Field = ({
  label, icon, type = 'text', value, onChange, placeholder, readOnly = false,
}: {
  label: string; icon: React.ReactNode; type?: string; value: string;
  onChange?: (v: string) => void; placeholder?: string; readOnly?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(212,163,115,0.55)' }}>
        {label}
      </label>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: readOnly ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(212,163,115,0.15)',
          opacity: readOnly ? 0.6 : 1,
        }}
      >
        <span style={{ color: 'rgba(212,163,115,0.4)', flexShrink: 0 }}>{icon}</span>
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className="flex-1 bg-transparent outline-none text-sm font-sans"
          style={{ color: 'var(--cream)', cursor: readOnly ? 'default' : 'text' }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="opacity-40 hover:opacity-80 transition-opacity"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cream)' }}
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

const SaveBtn = ({ busy, label = 'Save Changes' }: { busy: boolean; label?: string }) => (
  <button
    type="submit"
    disabled={busy}
    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300"
    style={{
      background: busy ? 'rgba(212,163,115,0.35)' : `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
      color: 'var(--bg-deep)',
      border: 'none',
      cursor: busy ? 'not-allowed' : 'pointer',
      boxShadow: busy ? 'none' : '0 4px 16px rgba(212,163,115,0.25)',
    }}
  >
    {busy
      ? <div className="w-3.5 h-3.5 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: 'var(--bg-deep)' }} />
      : <><Save size={13} />{label}</>
    }
  </button>
);

export const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  // Profile form state
  const [name, setName]   = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [profileBusy, setProfileBusy] = useState(false);

  // Password form state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw]         = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwBusy, setPwBusy]       = useState(false);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      error('Name must be at least 2 characters');
      return;
    }
    setProfileBusy(true);
    try {
      const { user: updated } = await authApi.updateProfile({ name: name.trim(), phone: phone.trim() || undefined });
      updateUser(updated);
      success('Profile updated successfully');
    } catch (err: unknown) {
      error(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setProfileBusy(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPw.length < 8) { error('New password must be at least 8 characters'); return; }
    if (newPw !== confirmPw) { error('New passwords do not match'); return; }
    setPwBusy(true);
    try {
      await authApi.changePassword({ currentPassword: currentPw, newPassword: newPw, confirmPassword: confirmPw });
      success('Password changed successfully');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch (err: unknown) {
      error(err instanceof Error ? err.message : 'Password change failed');
    } finally {
      setPwBusy(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: 'var(--bg-deep)' }}>
      <SEO title="My Profile — DUMUZI" description="Manage your DUMUZI account" />

      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--cream)' }}>My Account</h1>
            <p className="text-sm mt-1 font-sans" style={{ color: 'var(--muted)' }}>
              Manage your profile and password
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
          >
            <LogOut size={13} /> Logout
          </button>
        </motion.div>

        {/* Avatar strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex items-center gap-4 mb-6 p-5 rounded-2xl"
          style={{
            background: 'rgba(212,163,115,0.06)',
            border: '1px solid rgba(212,163,115,0.15)',
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`,
              color: 'var(--bg-deep)',
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-display font-semibold text-lg" style={{ color: 'var(--cream)' }}>{user.name}</p>
            <p className="text-xs font-sans" style={{ color: 'var(--muted)' }}>{user.email}</p>
            <span
              className="inline-block mt-1 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold"
              style={{ background: 'rgba(212,163,115,0.12)', color: GOLD, border: `1px solid rgba(212,163,115,0.25)` }}
            >
              {user.role}
            </span>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: 'rgba(212,163,115,0.08)',
              border: '1px solid rgba(212,163,115,0.2)',
              color: GOLDL,
              cursor: 'pointer',
            }}
          >
            <ShoppingBag size={13} /> View Cart
          </button>
        </motion.div>

        <div className="flex flex-col gap-5">
          {/* Profile section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.14 }}>
            <Section title="Personal Information">
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                <Field label="Full Name" icon={<User size={14} />} value={name} onChange={setName} placeholder="Your name" />
                <Field label="Email Address" icon={<Mail size={14} />} value={user.email} readOnly />
                <Field label="Phone Number" icon={<Phone size={14} />} value={phone} onChange={setPhone} placeholder="+91 98765 43210" type="tel" />
                <div className="flex justify-end mt-2">
                  <SaveBtn busy={profileBusy} />
                </div>
              </form>
            </Section>
          </motion.div>

          {/* Password section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Section title="Change Password">
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <Field label="Current Password" icon={<Lock size={14} />} type="password" value={currentPw} onChange={setCurrentPw} placeholder="••••••••" />
                <Field label="New Password" icon={<Lock size={14} />} type="password" value={newPw} onChange={setNewPw} placeholder="Min 8 characters" />
                <Field label="Confirm New Password" icon={<Lock size={14} />} type="password" value={confirmPw} onChange={setConfirmPw} placeholder="Repeat new password" />
                <div className="flex justify-end mt-2">
                  <SaveBtn busy={pwBusy} label="Change Password" />
                </div>
              </form>
            </Section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
