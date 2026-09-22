import { PolicyLayout, type PolicySection } from '../components/common/PolicyLayout';

const sections: PolicySection[] = [
  {
    title: 'Order processing time',
    body: 'Orders are typically processed within 1–2 business days after payment confirmation. During peak seasons, promotional periods, or unforeseen circumstances, processing times may be slightly extended.',
  },
  {
    title: 'Shipping rates',
    body: 'Shipping is free for all our valuable customers.',
  },
  {
    title: 'Shipping destinations',
    body: 'We currently ship all across India. Some remote locations may experience longer delivery times due to limited courier availability.',
  },
  {
    title: 'Estimated delivery time',
    body: 'Products are delivered within 1 week of placing the order. Estimated delivery times are shown at checkout and are based on standard business days. Actual delivery times may vary depending on your location, shipping method, and external factors beyond our control.',
  },
  {
    title: 'Order tracking',
    body: 'Once your order is shipped, you will receive a confirmation email with a tracking number. Use it to monitor your shipment on our website or on the carrier’s tracking portal.',
  },
  {
    title: 'Delayed shipments',
    body: 'While we strive for timely deliveries, delays may occur due to circumstances such as:',
    points: [
      'National holidays, gazetted holidays, weekends, or election days.',
      'Extreme weather such as heavy rain, storms, or natural calamities.',
      'Logistical issues beyond our control.',
      'Delays on the part of the delivery agent or courier service.',
    ],
  },
  {
    title: 'Undeliverable packages',
    body: 'Please ensure the shipping address you provide is accurate and complete. If a package is returned to us as undeliverable, we will contact you to arrange reshipment. Additional shipping charges may apply for resending the package.',
  },
  {
    title: 'Customs and duties',
    body: 'International orders may be subject to customs duties and taxes imposed by the destination country. Customers are responsible for any applicable customs fees; these are not included in our product pricing or shipping rates.',
  },
];

const ShippingDeliveryPage = () => {
  return (
    <PolicyLayout
      eyebrow="Customer Care"
      title="Shipping & Delivery"
      intro="From our atelier to your doorstep, every parcel is handled with precision and care. Here is how we ship, what it costs, and when to expect your order."
      seoTitle="Shipping & Delivery — DUMUZI"
      seoDescription="Shipping, delivery timelines and order tracking information for DUMUZI orders."
      sections={sections}
      contact={
        <>
          For any enquiry about shipping, tracking, or delivery, contact our support team at{' '}
          <a href="mailto:info@littlefun.in" style={{ color: 'var(--gold)' }}>info@littlefun.in</a>{' '}
          or{' '}
          <a href="tel:+919161115116" style={{ color: 'var(--gold)' }}>+91-9161-115-116</a>.
        </>
      }
    />
  );
};

export default ShippingDeliveryPage;
