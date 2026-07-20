import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { SEO } from "../components/common/SEO";

export const TermsOfServicePage = () => {
  return (
    <div className="bg-white min-h-screen pt-[60px] md:pt-[50px]">
      <SEO
        title="Terms of Service — DUMUZI"
        description="Terms of Service for DUMUZI. Terms governing purchases, orders, returns, and use of our website."
      />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 shadow-sm border border-stone-100">
        <h1 className="text-4xl font-serif text-stone-900 mb-8">
          Terms of Service
        </h1>
        <p className="text-stone-500 mb-8 text-sm uppercase tracking-widest">
          Effective Date: January 2025
        </p>

        <div className="prose prose-stone max-w-none text-stone-600">
          <p className="mb-6">
            Welcome to DUMUZI. These Terms of Service govern your use of
            our website (dumuzi.com) and your purchases from us. By using our website or
            placing an order, you agree to these terms. Please read them carefully.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Who We Are
          </h2>
          <p className="mb-6">
            DUMUZI is an artisan confectionery brand founded in 2013 and based in
            Paris, France. We craft handmade single-origin confections and deliver them to customers
            worldwide. Our website address is: https://dumuzi.com.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Placing an Order
          </h2>
          <p className="mb-6">
            When you place an order on our website, you are making an offer to purchase our products.
            We reserve the right to accept or decline any order. An order confirmation email constitutes
            our acceptance of your order.
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>All prices are listed inclusive of applicable taxes unless stated otherwise.</li>
            <li>We reserve the right to adjust prices without prior notice.</li>
            <li>Payment is required in full at the time of ordering.</li>
          </ul>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Delivery
          </h2>
          <p className="mb-6">
            We aim to dispatch all orders within 2–3 business days. Estimated delivery times vary by
            destination. We use temperature-controlled packaging and express couriers to ensure your
            confections arrive in perfect condition. DUMUZI is not responsible for delays caused by
            courier services or customs clearance.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Returns & Refunds
          </h2>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>
              <strong>Perishable products:</strong> Because our confections are handcrafted perishable
              items, we do not accept returns or exchanges.
            </li>
            <li>
              <strong>Damaged or faulty orders:</strong> If your order arrives damaged or below our
              quality standards, please contact us within 48 hours of delivery with photos. We will
              arrange a replacement at no charge.
            </li>
            <li>
              <strong>Refunds:</strong> Refunds are issued only in cases of damaged goods or order
              errors on our part. Refunds are processed within 5–10 business days.
            </li>
          </ul>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Bespoke & Corporate Orders
          </h2>
          <p className="mb-6">
            Bespoke and corporate orders are subject to a separate agreement confirmed in writing before
            production begins. A 50% deposit is required to start production on bespoke orders. Deposits
            are non-refundable once production has commenced.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Intellectual Property
          </h2>
          <p className="mb-6">
            All content on our website, including text, images, logos, and designs, belongs to
            DUMUZI. You may not reproduce or use our content without our express
            written permission.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Limitation of Liability
          </h2>
          <p className="mb-6">
            DUMUZI is not liable for any indirect, incidental, or consequential
            damages arising from the use of our website or products. Our liability is limited to the
            value of the order in question.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Changes to Terms
          </h2>
          <p className="mb-6">
            We may update these terms from time to time. Changes will be posted on this page with
            an updated effective date. Continued use of our website constitutes acceptance of any updates.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="mb-4">
            For any questions about these terms, please contact us:
          </p>
          <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
            <h3 className="font-serif text-lg text-stone-900 mb-2">
              DUMUZI
            </h3>
            <p className="mb-1">
              <strong>Email:</strong> hello@dumuzi.com
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> +44 20 7123 4567
            </p>
            <p>
              <strong>Address:</strong> 12 Rue des Artisans, 75001 Paris, France
            </p>
          </div>
          <p className="mt-6 italic">
            Thank you for choosing DUMUZI. We look forward to crafting something
            extraordinary for you.
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
