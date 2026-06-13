import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/common/Button";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const ThankYouPage = () => {
  // Fire conversion event when Thank You page loads
  useEffect(() => {
    // Google Analytics 4 conversion event
    if (window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "form_submission",
        event_label: "enquiry_form",
        value: 1,
      });
    }

    // Push to dataLayer for GTM triggers
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "form_submission_success",
        formType: "enquiry",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white p-12 rounded-2xl shadow-xl text-center border-t-8 border-primary"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-4xl font-display text-accent mb-6">Thank you.</h1>

        <p className="text-xl text-gray-700 mb-4 font-light">
          We have received your message.
        </p>

        <p className="text-gray-600 mb-10 leading-relaxed">
          Our team at DUMUZI Luxury Chocolates will read your message and reply
          within 1–2 business days. For urgent matters, you can also
          email us at{" "}
          <a
            href="mailto:hello@dumuzi.com"
            className="text-primary hover:underline"
          >
            hello@dumuzi.com
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" icon={Home} className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link to="/blog">
            <Button
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Read Our News
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
