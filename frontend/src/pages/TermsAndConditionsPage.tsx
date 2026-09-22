import { PolicyLayout, type PolicySection } from '../components/common/PolicyLayout';

const sections: PolicySection[] = [
  {
    title: 'Acceptance of these terms',
    body: 'Little Fun Foods & Beverages Private Limited offers this website, including all information, tools, and services available from it, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here. By visiting our site or purchasing from us, you engage in our “Service” and agree to be bound by these Terms of Service, including any additional terms and policies referenced herein or available by hyperlink.',
  },
  {
    title: 'Who these terms apply to',
    body: 'These Terms of Service apply to all users of the site, including without limitation browsers, vendors, customers, merchants, and contributors of content. Please read them carefully before accessing or using our website. If you do not agree to all of these terms, you may not access the website or use any of its services.',
  },
  {
    title: 'Changes to these terms',
    body: 'Any new features or tools added to the current store are also subject to these Terms of Service. We reserve the right to update, change, or replace any part of these terms by posting updates to our website. It is your responsibility to check this page periodically. Your continued use of the website following the posting of any change constitutes acceptance of that change.',
  },
  {
    title: 'Online store',
    body: 'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you have given us consent to allow any minor dependent to use this site.',
    points: [
      'You may not use our products for any illegal or unauthorised purpose.',
      'You may not violate any law in your jurisdiction, including copyright law, in the use of the Service.',
      'You must not transmit any worms or viruses, or any code of a destructive nature.',
      'A breach or violation of any of these terms will result in immediate termination of your Services.',
    ],
  },
  {
    title: 'General conditions',
    body: 'We reserve the right to refuse service to anyone, for any reason, at any time. You understand that your content, not including credit card information, may be transferred unencrypted and may involve transmission over various networks, and changes to conform to the technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.',
  },
  {
    title: 'Use of the service',
    body: 'You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service, or any contact on the website through which the service is provided, without our express written permission. The headings used in this agreement are included for convenience only and do not limit or otherwise affect these terms.',
  },
  {
    title: 'Information we collect',
    body: 'When you purchase something from our store, as part of the buying and selling process we collect the personal information you give us, such as your name, address, and email address. When you browse our store, we also automatically receive your computer’s internet protocol (IP) address, which helps us learn about your browser and operating system. With your permission, we may send you emails about our store, new products, and other updates.',
  },
  {
    title: 'Consent',
    body: 'When you provide personal information to complete a transaction, verify your card, place an order, arrange a delivery, or return a purchase, you consent to our collecting it and using it for that specific reason only. If we ask for your personal information for a secondary reason such as marketing, we will either ask you directly for your express consent or give you an opportunity to decline. If you change your mind after opting in, you may withdraw your consent at any time by contacting us.',
  },
  {
    title: 'Disclosure',
    body: 'We may disclose your personal information if we are required by law to do so, or if you violate our Terms of Service.',
  },
];

const TermsAndConditionsPage = () => {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These terms govern your use of our website and the purchases you make through it. Please read them carefully before placing an order."
      seoTitle="Terms & Conditions — DUMUZI"
      seoDescription="Terms and conditions governing the use of the DUMUZI website and store."
      sections={sections}
      contactLabel="Questions"
      contact={
        <>
          If anything in these terms is unclear, or you wish to withdraw consent for the use of your
          information, please contact our team at{' '}
          <a href="mailto:info@littlefun.in" style={{ color: 'var(--gold)' }}>info@littlefun.in</a>.
        </>
      }
    />
  );
};

export default TermsAndConditionsPage;
