import { PolicyLayout, type PolicySection } from '../components/common/PolicyLayout';

const RETURN_ADDRESS =
  'Little Fun Foods & Beverages Private Limited, 1st and 2nd Floor, Plot No. 14, Khasra No. 1769, Sadrauna Road, Manak Nagar, Lucknow – 226011.';

const sections: PolicySection[] = [
  {
    title: 'Return window',
    body: 'We offer a 2-day return window from the time your order is delivered. Requests raised after this window cannot be processed.',
  },
  {
    title: 'When a return is accepted',
    body: 'Returns are accepted only in the following cases:',
    points: [
      'You received a wrong product.',
      'The product is damaged or defective.',
      'You received a different item than what you ordered.',
    ],
  },
  {
    title: 'Eligibility conditions',
    body: 'To be eligible for a return, all of the following must be met:',
    points: [
      'The item must be unused, unworn, and in the same condition in which you received it.',
      'Original packaging and tags must be intact.',
      'A valid receipt or proof of purchase is required.',
      'A complete unboxing video — from opening the sealed package to clearly showing the issue — must be shared within 48 hours of delivery for all return and refund claims.',
    ],
  },
  {
    title: 'When a return is not accepted',
    points: [
      'The wrong item was ordered, or you changed your mind.',
      'Claims such as did not like the product, seeded/not seeded, ordered by mistake, or no longer required.',
      'The product is not damaged or defective.',
      'The unboxing video is missing, incomplete, or submitted after 48 hours.',
    ],
  },
  {
    title: 'How to request a return',
    body: 'Email us at info@littlefun.in to initiate a return. Once your request is approved, you will receive an email with return instructions and a shipping label. Items sent back without prior return approval will not be accepted.',
  },
  {
    title: 'Return address',
    body: RETURN_ADDRESS,
  },
  {
    title: 'Damaged or defective items',
    body: 'Please inspect your order upon delivery and contact us immediately at info@littlefun.in if the product arrives damaged, has a manufacturing defect, or is different from what you ordered. All such claims must be supported with a clear and complete unboxing video.',
  },
  {
    title: 'Replacements',
    body: 'We do not offer direct replacements. If you wish to replace an item, initiate a return for the existing product, then place a new order separately once your return has been accepted.',
  },
  {
    title: 'Cancellations',
    body: 'Orders can be cancelled within 24 hours of placement, or before processing begins. Once an order has been processed or shipped, it cannot be cancelled.',
  },
  {
    title: 'Refund process',
    body: 'Once your return is received and inspected, we will notify you whether the refund has been approved or rejected.',
    points: [
      'Approved refunds are processed within 3 working days.',
      'The amount reflects in your account within 5–15 business days, depending on your bank or card provider.',
      'If more than 15 business days have passed since your refund was approved and you have not received it, please contact us.',
    ],
  },
];

const ReturnsRefundsPage = () => {
  return (
    <PolicyLayout
      eyebrow="Service Promise"
      title="Returns & Refunds"
      intro="Your satisfaction matters to us. We are committed to a smooth, transparent, and responsible shopping experience — so if something goes wrong, here is exactly how we put it right."
      seoTitle="Returns & Refunds — DUMUZI"
      seoDescription="Return, refund and cancellation policy for DUMUZI orders."
      sections={sections}
      contactLabel="Contact"
      contact={
        <>
          Please reach out to our support team at{' '}
          <a href="mailto:info@littlefun.in" style={{ color: 'var(--gold)' }}>info@littlefun.in</a>{' '}
          or call{' '}
          <a href="tel:+919161115116" style={{ color: 'var(--gold)' }}>+91-9161-115-116</a>{' '}
          with your order number and a brief description of the issue.
        </>
      }
    />
  );
};

export default ReturnsRefundsPage;
