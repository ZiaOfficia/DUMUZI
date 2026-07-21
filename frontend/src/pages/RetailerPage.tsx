import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Package, Truck, Store, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { submitToGoogleSheets } from '../utils/googleSheets';
import { sendEmailNotification } from '../utils/emailNotification';

const GOLD  = '#d4a373';
const GOLDL = '#e5c199';

const benefits = [
  {
    icon: Award,
    title: 'Premium Handcrafted Range',
    desc: '27 signature gift-box designs across Heart, Diamond, BN, and Oval collections — a catalogue that stands out on any shelf.',
  },
  {
    icon: TrendingUp,
    title: 'Attractive Retailer Margins',
    desc: 'Competitive wholesale pricing with volume-based slabs, designed to keep your margins healthy.',
  },
  {
    icon: Package,
    title: 'Marketing & Packaging Support',
    desc: 'Branded display materials, gift-box packaging, and promotional support to help you sell.',
  },
  {
    icon: Truck,
    title: 'Reliable Fulfilment',
    desc: 'Consistent stock availability and dependable delivery timelines, wherever you are in India.',
  },
];

const businessTypes = [
  'Retail Store',
  'Online Store / D2C',
  'Distributor / Wholesaler',
  'Supermarket / Chain',
  'Gifting / Hamper Business',
  'Other',
];

const InputField = ({
  label, type = 'text', value, onChange, icon, placeholder, required = true,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; icon: React.ReactNode;
  placeholder?: string; required?: boolean;
}) => (
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
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="flex-1 bg-transparent outline-none text-sm font-sans"
        style={{ color: 'var(--cream)' }}
      />
    </div>
  </div>
);

export const RetailerPage = () => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    businessType: businessTypes[0],
    gstNumber: '',
    message: '',
  });

  const update = (field: keyof typeof formData) => (value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);

    try {
      submitToGoogleSheets({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        serviceName: 'Retailer Application',
        businessName: formData.businessName,
        businessType: formData.businessType,
        city: formData.city,
        gstNumber: formData.gstNumber,
      });

      sendEmailNotification({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        serviceName: 'Retailer Application',
        businessName: formData.businessName,
        businessType: formData.businessType,
        city: formData.city,
        gstNumber: formData.gstNumber,
      });

      navigate('/thank-you');
    } catch (err) {
      console.error('Retailer application submission error:', err);
      navigate('/thank-you');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-deep)' }} className="min-h-screen">
      <SEO
        title="Become a Retailer — DUMUZI"
        description="Partner with DUMUZI. Apply to stock our handcrafted luxury confectionery gift boxes at your store."
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background: 'linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-dark) 60%, var(--bg-warm) 100%)',
          minHeight: '48vh',
        }}
      >
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-15" style={{ background: GOLD }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-24 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-label mb-5 inline-block"
          >
            Partner With DUMUZI
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-luxury font-semibold leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', color: 'var(--cream)' }}
          >
            Become a <em className="text-luxury-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>DUMUZI Retailer</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans"
            style={{ color: 'var(--muted)' }}
          >
            Bring handcrafted luxury confectionery to your customers. We're looking for retail stores,
            distributors, and gifting businesses across India to stock the DUMUZI range.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl mb-4" style={{ color: 'var(--cream)' }}>
              Why Partner With Us
            </h2>
            <div className="h-1 w-20 mx-auto" style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLDL}, ${GOLD})` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass-card p-6 rounded-2xl"
                style={{ border: '1px solid rgba(212,163,115,0.16)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(212,163,115,0.12)' }}>
                  <Icon size={20} style={{ color: GOLD }} />
                </div>
                <h3 className="font-display text-lg mb-2" style={{ color: 'var(--cream)' }}>{title}</h3>
                <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--muted)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20 lg:py-28 px-6" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl mb-4" style={{ color: 'var(--cream)' }}>
              Apply to Become a Retailer
            </h2>
            <p className="text-base font-sans" style={{ color: 'var(--muted)' }}>
              Tell us about your business and we'll get back to you within 2–3 business days.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl p-6 md:p-10"
            style={{
              background: 'rgba(26,18,13,0.85)',
              border: '1px solid rgba(212,163,115,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Business / Shop Name"
                  value={formData.businessName}
                  onChange={update('businessName')}
                  icon={<Store size={15} />}
                  placeholder="Your business name"
                />
                <InputField
                  label="Contact Person Name"
                  value={formData.name}
                  onChange={update('name')}
                  icon={<User size={15} />}
                  placeholder="Your full name"
                />
                <InputField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={update('email')}
                  icon={<Mail size={15} />}
                  placeholder="you@example.com"
                />
                <InputField
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={update('phone')}
                  icon={<Phone size={15} />}
                  placeholder="9876543210"
                />
                <InputField
                  label="City / Location"
                  value={formData.city}
                  onChange={update('city')}
                  icon={<MapPin size={15} />}
                  placeholder="Your city"
                />
                <InputField
                  label="GST Number (optional)"
                  value={formData.gstNumber}
                  onChange={update('gstNumber')}
                  icon={<FileText size={15} />}
                  placeholder="22AAAAA0000A1Z5"
                  required={false}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(212,163,115,0.6)' }}>
                  Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={e => update('businessType')(e.target.value)}
                  className="px-4 py-3 rounded-xl text-sm font-sans outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,163,115,0.18)', color: 'var(--cream)' }}
                >
                  {businessTypes.map(type => (
                    <option key={type} value={type} style={{ background: 'var(--bg-dark)' }}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(212,163,115,0.6)' }}>
                  Tell us about your business
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => update('message')(e.target.value)}
                  placeholder="Store size, existing brands you stock, expected order volume, etc."
                  className="px-4 py-3 rounded-xl text-sm font-sans outline-none resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,163,115,0.18)', color: 'var(--cream)' }}
                />
              </div>

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
                  'Submit Application'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RetailerPage;
