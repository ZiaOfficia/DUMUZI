import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { SEO } from "../components/common/SEO";

export const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen pt-[60px] md:pt-[50px]">
      <SEO
        title="Privacy Policy — DUMUZI Luxury Chocolates"
        description="Privacy Policy for DUMUZI Luxury Chocolates. How we collect, use, and protect your personal information."
      />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 shadow-sm border border-stone-100">
        <h1 className="text-4xl font-serif text-stone-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-stone-500 mb-8 text-sm uppercase tracking-widest">
          Last Updated: January 2025
        </p>

        <div className="prose prose-stone max-w-none text-stone-600">
          <p className="mb-6">
            At DUMUZI Luxury Chocolates, we are committed to protecting your privacy and handling your personal
            information with care. This Privacy Policy explains how we collect, use, and safeguard your data
            when you visit our website or place an order with us. By using our website, you agree to these terms.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Who We Are
          </h2>
          <p className="mb-6">
            DUMUZI Luxury Chocolates is an artisan chocolate brand founded in 2009, based in Paris, France.
            We craft single-origin handmade chocolates and deliver them worldwide. Our website address is:
            https://dumuzi.com.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            How We Collect and Use Your Personal Information
          </h2>
          <p className="mb-4">
            We collect only the personal information needed to fulfil your order and provide you with our
            services. This includes:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Your name, email address, and phone number.</li>
            <li>Delivery address and billing information.</li>
            <li>Order history and product preferences.</li>
            <li>Payment details (processed securely through our payment provider — we do not store card numbers).</li>
          </ul>
          <p className="mb-4">
            You provide this information when you place an order, subscribe to our newsletter, book a masterclass,
            or submit a contact enquiry. We use your data to:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Process and fulfil your orders.</li>
            <li>Send order confirmations, delivery updates, and receipts.</li>
            <li>Respond to your enquiries and service requests.</li>
            <li>Send newsletter and promotional updates (only if you have opted in).</li>
            <li>Improve our website and customer experience.</li>
          </ul>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            How We Protect Your Personal Data
          </h2>
          <p className="mb-6">
            We use industry-standard security measures to protect your personal information from unauthorised
            access or disclosure. Payment data is encrypted and processed through PCI-compliant payment
            providers. However, no internet transmission is 100% secure, so we cannot guarantee absolute safety.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Who We Share Your Data With
          </h2>
          <p className="mb-6">
            We never sell or rent your personal information. We only share details in the following situations:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>
              <strong>Delivery Partners:</strong> We share your name and delivery address with our courier
              partners to fulfil your order.
            </li>
            <li>
              <strong>Payment Processors:</strong> Payment details are securely handled by our PCI-compliant
              payment provider.
            </li>
            <li>
              <strong>Legal Compliance:</strong> If required by law, we may share information with relevant
              authorities.
            </li>
          </ul>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Cookies and Tracking
          </h2>
          <p className="mb-6">
            Our website uses cookies to improve your browsing experience and understand how visitors use our
            site. You can manage your cookie preferences in your browser settings, though some website
            features may not function fully without them.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            How Long We Retain Your Data
          </h2>
          <p className="mb-6">
            We retain your order data for up to 7 years for accounting and legal compliance purposes. If you
            unsubscribe from our newsletter, we will remove your email from our mailing list within 7 days.
            You may request deletion of your personal data at any time.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Your Rights Over Your Data
          </h2>
          <p className="mb-6">
            Under applicable data protection laws, you have the right to:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Request a copy of the personal information we hold about you.</li>
            <li>Ask us to correct any inaccurate details.</li>
            <li>Request deletion of your personal data.</li>
            <li>Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p className="mb-6">
            To exercise any of these rights, contact us using the details below.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-6">
            We may update this policy from time to time. Any updates will be posted on this page with an
            updated date at the top. Continued use of our website constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
            <h3 className="font-serif text-lg text-stone-900 mb-2">
              DUMUZI Luxury Chocolates
            </h3>
            <p className="mb-1">
              <strong>Email:</strong> hello@dumuzi.com
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> +44 20 7123 4567
            </p>
            <p>
              <strong>Address:</strong> 12 Rue du Chocolat, 75001 Paris, France
            </p>
          </div>
          <p className="mt-6 italic">
            We are committed to protecting your privacy and treating your data with the respect it deserves.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-100 flex justify-center">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
