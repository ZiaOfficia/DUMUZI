import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { SEO } from "../components/common/SEO";

export const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen pt-[60px] md:pt-[50px]">
      <SEO
        title="Privacy Policy — Aaghaz Foundation"
        description="Privacy Policy for Aaghaz Foundation. How we collect, use, and protect donor and applicant information."
      />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 shadow-sm border border-stone-100">
        <h1 className="text-4xl font-serif text-stone-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-stone-500 mb-8 text-sm uppercase tracking-widest">
          Last Updated: October 2024
        </p>

        <div className="prose prose-stone max-w-none text-stone-600">
          <p className="mb-6">
            At Aaghaz Foundation, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy outlines how we
            collect, use, and safeguard your data when you visit our website or
            apply for our scholarship and student aid programs. By using our website,
            you agree to these terms.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Who We Are
          </h2>
          <p className="mb-6">
            Aaghaz Foundation is a registered education trust based in Lucknow, India.
            We help clever students from poor families finish their education through
            scholarships and financial aid. Our website address is:
            [https://aaghazfoundation.com].
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            How We Collect and Use Your Personal Information
          </h2>
          <p className="mb-4">
            We collect only the personal information needed to run our programs and
            verify applicants. This includes:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Student's name, age, gender, and school/college details.</li>
            <li>Academic marksheets and study reports.</li>
            <li>Parents' names, occupations, and family income details.</li>
            <li>Phone number, email address, and home address.</li>
            <li>Bank account details (only for paying school fees directly).</li>
          </ul>
          <p className="mb-4">
            You provide this information when you apply for student aid, register as
            a volunteer, fill out donor forms, or subscribe to our newsletter. We use
            your data to:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Verify the financial and academic details of applicants.</li>
            <li>Contact families for in-person home visits.</li>
            <li>Process and pay school or college fees.</li>
            <li>Send updates to donors about the students they support.</li>
            <li>Share newsletter and program updates.</li>
          </ul>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            How We Protect Your Personal Data
          </h2>
          <p className="mb-6">
            We take safety measures to protect your personal details from unauthorized
            access or disclosure. Your data is kept secure. However, no internet
            transmission is 100% safe, so we cannot guarantee absolute safety.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Who We Share Your Data With
          </h2>
          <p className="mb-6">
            We never sell or rent your personal information. We only share details in
            the following situations:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>
              <strong>Donors:</strong> We share student names, stories, and academic
              progress reports with the donors who fund their education.
            </li>
            <li>
              <strong>Volunteers:</strong> We share contact and address details with
              our volunteers so they can visit your home for checking details.
            </li>
            <li>
              <strong>Legal Compliance:</strong> If required by law, we may share
              information with government authorities to comply with legal rules.
            </li>
          </ul>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Cookies and Tracking
          </h2>
          <p className="mb-6">
            Our website uses cookies to improve your browsing experience. Cookies help
            us see how visitors use our site so we can make it better. You can turn
            off cookies in your browser settings, but some website features might
            not work.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            How Long We Retain Your Data
          </h2>
          <p className="mb-6">
            We keep your personal information only as long as needed to help you with
            your studies or as required by law. If you ask us to delete your details,
            we will do so unless we need to keep them for legal reasons.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            What Rights You Have Over Your Data
          </h2>
          <p className="mb-6">
            You have the right to:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Ask for a copy of the information we have about you.</li>
            <li>Ask us to correct any wrong details.</li>
            <li>Ask us to delete your personal data.</li>
          </ul>
          <p className="mb-6">
            To do this, contact us using the email or phone number below.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-6">
            We may update this policy from time to time. Any updates will be posted
            on this page, and the date at the top will be updated. Continuing to use
            our site means you agree to the updated terms.
          </p>

          <h2 className="text-2xl font-serif text-stone-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
            <h3 className="font-serif text-lg text-stone-900 mb-2">
              Aaghaz Foundation Support Team
            </h3>
            <p className="mb-1">
              <strong>Email:</strong> aaghaz.foundation@gmail.com
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> +91 99716 48900
            </p>
            <p>
              <strong>Address:</strong> 57 Ganesh Gunj, Lucknow, UP — 226018
            </p>
          </div>
          <p className="mt-6 italic">
            We are dedicated to protecting your privacy and ensuring your data
            is handled responsibly.
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
