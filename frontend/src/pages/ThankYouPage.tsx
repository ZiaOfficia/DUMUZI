import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Home, ArrowRight, ShoppingBag, Sparkles, Package } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "../components/common/SEO";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GOLD  = "#d4a55a";
const GOLDL = "#e8c07a";

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const isOrder = searchParams.get("type") === "order";

  // Fire conversion event when Thank You page loads
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "form_submission",
        event_label: "enquiry_form",
        value: 1,
      });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "form_submission_success",
        formType: "enquiry",
      });
    }
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a120d 0%, #100a07 60%, var(--choc-deep) 100%)" }}
    >
      <SEO title={isOrder ? "Order Confirmed" : "Thank You"} description="Thank you from DUMUZI" />

      {/* Warm decorative glows for a happy, festive feel */}
      <div
        className="absolute -top-32 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,165,90,0.16) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,165,90,0.12) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full rounded-3xl p-10 sm:p-12 text-center relative"
        style={{
          background: "rgba(26,18,13,0.9)",
          border: "1px solid rgba(212,165,90,0.18)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Success icon with gold glow + little sparkle accents */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.55, delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, boxShadow: "var(--shadow-gold)" }}
          >
            <CheckCircle size={44} style={{ color: "var(--choc-deep)" }} strokeWidth={2.5} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="absolute -top-1 -right-2"
          >
            <Sparkles size={20} style={{ color: GOLDL }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.65 }}
            className="absolute -bottom-1 -left-3"
          >
            <Sparkles size={14} style={{ color: GOLD }} />
          </motion.div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
          {isOrder ? (
            <>Order <span style={{ color: GOLDL }}>Placed!</span></>
          ) : (
            <>Thank <span style={{ color: GOLDL }}>You.</span></>
          )}
        </h1>

        <p className="text-lg mb-4 font-sans" style={{ color: "var(--cream)" }}>
          {isOrder
            ? "Your DUMUZI order has been placed successfully."
            : "We have received your message."}
        </p>

        <p className="text-sm mb-10 leading-relaxed font-sans" style={{ color: "var(--muted)" }}>
          {isOrder
            ? "Our artisans will prepare your chocolates with care, and we'll reach out within 1–2 business days with dispatch details. For any queries, email us at "
            : "Our team at DUMUZI will read your message and reply within 1–2 business days. For urgent matters, you can also email us at "}
          <a href="mailto:hello@dumuzi.com" style={{ color: GOLDL }} className="hover:underline">
            hello@dumuzi.com
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isOrder ? (
            <>
              <Link
                to="/collections"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: "var(--choc-deep)", boxShadow: "0 8px 24px rgba(212,165,90,0.3)" }}
              >
                <ShoppingBag size={15} /> Continue Shopping
              </Link>
              <Link
                to="/my-orders"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={{ background: "transparent", color: "var(--cream)", border: "1px solid rgba(212,165,90,0.3)" }}
              >
                <Package size={15} /> View My Orders
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLDL})`, color: "var(--choc-deep)", boxShadow: "0 8px 24px rgba(212,165,90,0.3)" }}
              >
                <Home size={15} /> Return Home
              </Link>
              <Link
                to="/blog"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={{ background: "transparent", color: "var(--cream)", border: "1px solid rgba(212,165,90,0.3)" }}
              >
                Read Our News <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
