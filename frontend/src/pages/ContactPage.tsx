import { motion } from "framer-motion";
import { Mail, Phone, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "../components/common/Button";
import { ctaContent } from "../data/content";

import { SEO } from "../components/common/SEO";
import { useNavigate } from "react-router-dom";
import { submitToGoogleSheets } from "../utils/googleSheets";
import { sendEmailNotification } from "../utils/emailNotification";

const inputStyle: CSSProperties = {
  background: 'rgba(26,18,13,0.7)',
  border: '1px solid rgba(212,163,115,0.2)',
  color: 'var(--cream)',
  width: '100%',
  padding: '16px',
  outline: 'none',
  transition: 'border-color 0.3s',
};

export const ContactPage = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'var(--bg-deep)' }}>
      <SEO
        title="Contact Us — DUMUZI"
        description="Get in touch with DUMUZI for orders, corporate gifting, bespoke commissions, masterclass bookings, or general enquiries."
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
        <div className="absolute inset-0 opacity-40">
          <img
            loading="lazy"
            decoding="async"
            src="/images/products/LF-D25T.jpeg"
            alt="DUMUZI atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(15,10,7,0.65)' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md" style={{ background: 'rgba(212,163,115,0.15)', border: '1px solid rgba(212,163,115,0.35)' }}>
              <Sparkles size={14} style={{ color: 'var(--gold)' }} />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">
                Let's talk
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight text-cream">
              Get In{" "}
              <span className="text-gold italic font-serif">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted font-light max-w-2xl mx-auto">
              For orders, bespoke commissions, corporate gifting, or masterclass bookings — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Info */}
          <div>
            <h2 className="text-5xl font-display mb-8 text-cream">
              {ctaContent.heading}
            </h2>
            <div className="text-lg text-muted mb-12 leading-relaxed">
              {ctaContent.text.map((p, i) => (
                <p key={i} className="mb-4">
                  {p}
                </p>
              ))}
            </div>
            <div className="space-y-8">
              <motion.div
                className="flex items-center space-x-6 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="p-4 rounded-full transition-colors duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(212,163,115,0.1)', border: '1px solid rgba(212,163,115,0.25)', color: 'var(--gold)' }}
                >
                  <Phone size={24} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Phone
                  </p>
                  <span className="text-lg font-display text-cream">
                    +91-9161-115-116
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="p-4 rounded-full transition-colors duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(212,163,115,0.1)', border: '1px solid rgba(212,163,115,0.25)', color: 'var(--gold)' }}
                >
                  <Mail size={24} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Sales Queries
                  </p>
                  <span className="text-lg font-display text-cream break-all">
                    sales@littlefuns.in
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="p-4 rounded-full transition-colors duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(212,163,115,0.1)', border: '1px solid rgba(212,163,115,0.25)', color: 'var(--gold)' }}
                >
                  <Mail size={24} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">
                    Customer Queries
                  </p>
                  <span className="text-lg font-display text-cream break-all">
                    info@littlefun.in
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const data = {
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                weddingDate: formData.get("weddingDate") as string,
                venue: formData.get("venue") as string,
                budget: formData.get("budget") as string,
                message: formData.get("message") as string,
              };

              try {
                submitToGoogleSheets({
                  name: `${data.firstName} ${data.lastName}`,
                  email: data.email,
                  phone: data.phone,
                  eventDate: data.weddingDate,
                  venue: data.venue,
                  budget: data.budget,
                  serviceName: "Contact Page Form",
                });

                sendEmailNotification({
                  ...data,
                  name: `${data.firstName} ${data.lastName}`,
                  phone: data.phone,
                  eventDate: data.weddingDate,
                  venue: data.venue,
                  budget: data.budget,
                  source: "Contact Page Form",
                });

                navigate("/thank-you");
              } catch (err) {
                console.error("Submission trigger error", err);
                navigate("/thank-you");
              }
            }}
            className="glass-card p-10 md:p-12 space-y-8"
            style={{ borderTop: '4px solid var(--gold)', borderRadius: '4px' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  style={inputStyle}
                  placeholder="E.g. James"
                  className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)] placeholder:text-[rgba(220,214,205,0.35)]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  style={inputStyle}
                  placeholder="E.g. Laurent"
                  className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)] placeholder:text-[rgba(220,214,205,0.35)]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                Contact Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                style={inputStyle}
                placeholder="10-digit mobile number"
                className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)] placeholder:text-[rgba(220,214,205,0.35)]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                style={inputStyle}
                placeholder="amit@example.com"
                className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)] placeholder:text-[rgba(220,214,205,0.35)]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                Best date to call you (optional)
              </label>
              <input
                name="weddingDate"
                type="date"
                style={{ ...inputStyle, colorScheme: 'dark' }}
                className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                City / Location
              </label>
              <input
                name="venue"
                type="text"
                required
                style={inputStyle}
                placeholder="London, New York, Dubai…"
                className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)] placeholder:text-[rgba(220,214,205,0.35)]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                How can we help you?
              </label>
              <select
                name="budget"
                required
                defaultValue=""
                style={{ ...inputStyle, colorScheme: 'dark' }}
                className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)] appearance-none"
              >
                <option value="" disabled style={{ background: '#1a120d', color: '#dcd6cd' }}>
                  Select an option
                </option>
                <option value="order" style={{ background: '#1a120d', color: '#f9f6f0' }}>I want to place an order</option>
                <option value="corporate" style={{ background: '#1a120d', color: '#f9f6f0' }}>Corporate gifting enquiry</option>
                <option value="bespoke" style={{ background: '#1a120d', color: '#f9f6f0' }}>Bespoke commission or wedding favours</option>
                <option value="masterclass" style={{ background: '#1a120d', color: '#f9f6f0' }}>Masterclass booking</option>
                <option value="wholesale" style={{ background: '#1a120d', color: '#f9f6f0' }}>Wholesale / trade enquiry</option>
                <option value="other" style={{ background: '#1a120d', color: '#f9f6f0' }}>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gold">
                Your message
              </label>
              <textarea
                name="message"
                rows={5}
                style={inputStyle}
                placeholder="Tell us about your enquiry…"
                className="focus:border-[#d4a373] hover:border-[rgba(212,163,115,0.4)] placeholder:text-[rgba(220,214,205,0.35)]"
              ></textarea>
            </div>
            <Button
              type="submit"
              className="w-full py-5 tracking-[0.2em] text-sm"
            >
              Send Message
            </Button>
          </form>
        </motion.div>
      </section>

    </div>
  );
};
