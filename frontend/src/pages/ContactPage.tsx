import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../components/common/Button";
import { ctaContent } from "../data/content";

import { SEO } from "../components/common/SEO";
import { useNavigate } from "react-router-dom";
import { submitToGoogleSheets } from "../utils/googleSheets";
import { sendEmailNotification } from "../utils/emailNotification";

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
    <div className="min-h-screen pt-24 pb-12 bg-stone-50">
      <SEO
        title="Contact Us — Aaghaz Foundation"
        description="Reach out to Aaghaz Foundation to donate, launch a scholarship, become a volunteer, apply for student aid or partner with us on CSR. Based in Lucknow, working across India."
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-accent text-white">
        <div className="absolute inset-0 opacity-50">
          <img
            loading="lazy"
            decoding="async"
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1920&q=80"
            alt="Children studying — Aaghaz Foundation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-accent/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/40 mb-8 backdrop-blur-md">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-secondary">
                Let's talk
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight">
              Get In{" "}
              <span className="text-secondary italic font-serif">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
              If you want to donate, volunteer, partner, or apply for study help, write to us. We read every message.
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
            <h2 className="text-5xl font-display mb-8 text-accent">
              {ctaContent.heading}
            </h2>
            <div className="text-lg text-gray-600 mb-12 leading-relaxed">
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
                <span className="p-4 bg-white border border-stone-100 rounded-full text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Phone size={24} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                    Phone
                  </p>
                  <span className="text-lg font-display text-gray-800">
                    +91 98765 43210
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="p-4 bg-white border border-stone-100 rounded-full text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MapPin size={24} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                    Registered Office
                  </p>
                  <span className="text-lg font-display text-gray-800">
                    57 Ganesh Gunj, Lucknow, UP — 226018
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="p-4 bg-white border border-stone-100 rounded-full text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mail size={24} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                    Email
                  </p>
                  <span className="text-lg font-display text-gray-800 break-all">
                    aaghaz.foundation@gmail.com
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          {/* Contact Form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              // Rudimentary state handling for this page since it was static before
              // ideally this should be a shared component, but respecting the file structure:
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
                // Trigger background submissions (non-blocking)
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

                // Redirect instantly
                navigate("/thank-you");
              } catch (err) {
                console.error("Submission trigger error", err);
                // Even on trigger error, we've likely tried to send. 
                // In a production app choice, we often navigate anyway to avoid blocking.
                navigate("/thank-you");
              }
            }}
            className="bg-white p-10 md:p-12 border border-t-4 border-stone-100 border-t-primary shadow-2xl rounded-sm space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 transition-colors duration-300 hover:bg-stone-100 focus:bg-white"
                  placeholder="E.g. Amit"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 transition-colors duration-300 hover:bg-stone-100 focus:bg-white"
                  placeholder="E.g. Kumar"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                Contact Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 transition-colors duration-300 hover:bg-stone-100 focus:bg-white"
                placeholder="10-digit mobile number"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 transition-colors duration-300 hover:bg-stone-100 focus:bg-white"
                placeholder="amit@example.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                Best date to call you (optional)
              </label>
              <input
                name="weddingDate"
                type="date"
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 text-gray-500 transition-colors duration-300 hover:bg-stone-100 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                City / Location
              </label>
              <input
                name="venue"
                type="text"
                required
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 transition-colors duration-300 hover:bg-stone-100 focus:bg-white"
                placeholder="Lucknow, Mumbai, Delhi…"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                Why are you writing to us?
              </label>
              <select
                name="budget"
                required
                defaultValue=""
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 text-gray-700 transition-colors duration-300 hover:bg-stone-100 focus:bg-white appearance-none"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="donate">I want to donate</option>
                <option value="scholarship">I want to start a scholarship</option>
                <option value="volunteer">I want to join as a volunteer</option>
                <option value="apply-aid">I want to apply for study help (fees)</option>
                <option value="csr">My company wants to partner with Aaghaz</option>
                <option value="other">Other reason</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-500">
                Your message
              </label>
              <textarea
                name="message"
                rows={5}
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-4 transition-colors duration-300 hover:bg-stone-100 focus:bg-white"
                placeholder="Tell us how you would like to be involved..."
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

      {/* Map Section */}
      <section className="h-[65vh] max-w-7xl mx-auto mb-12 rounded-2xl bg-stone-100 relative group overflow-hidden shadow-xl">
        {/* Map Iframe */}
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          className="transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105"
          src="https://maps.google.com/maps?q=Ganesh%20Gunj%2C%20Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
          title="Aaghaz Foundation Office Location"
        ></iframe>

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-stone-50 to-transparent pointer-events-none" />

        {/* Floating Location Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-8 left-6 md:bottom-12 md:left-12 bg-white/90 backdrop-blur-md p-8 shadow-2xl border-l-4 border-primary max-w-sm"
        >
          <h3 className="text-2xl font-display text-accent mb-2">
            Our Office Address
          </h3>
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">
            Monday to Saturday · 10 AM to 6 PM
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1" size={20} />
              <p className="text-gray-700 leading-relaxed">
                57 Ganesh Gunj
                <br />
                Lucknow, UP — 226018
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-primary" size={20} />
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Ganesh+Gunj,+Lucknow,+UP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors group/link"
          >
            Get Directions{" "}
            <ArrowRight
              size={14}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </section>
    </div>
  );
};
