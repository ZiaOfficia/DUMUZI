import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "../common/Button";
import { ctaContent } from "../../data/content";
import { submitToGoogleSheets } from "../../utils/googleSheets";
import { sendEmailNotification } from "../../utils/emailNotification";

export const ContactSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    weddingDate: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Trigger background tasks (non-blocking)
      submitToGoogleSheets({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.weddingDate,
        message: formData.message,
        serviceName: "General Contact",
      });

      sendEmailNotification({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.weddingDate,
        message: formData.message,
        source: "Contact Section",
      });

      // Redirect instantly
      navigate("/thank-you");
    } catch (err) {
      console.error("Submission trigger error", err);
      // Navigate anyway for instant feel
      navigate("/thank-you");
    }
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 relative" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Contact Info (Left) - Unchanged */}
        <div>
          <h2 className="text-5xl font-display mb-8">{ctaContent.heading}</h2>
          <div className="text-lg text-gray-600 mb-12">
            {ctaContent.text.map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="p-2 bg-primary/10 rounded-full text-primary">
                <Phone size={20} />
              </span>
              <span className="text-sm uppercase tracking-widest text-gray-800">
                +91-9161-115-116
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="p-2 bg-primary/10 rounded-full text-primary">
                <MapPin size={20} />
              </span>
              <span className="text-sm uppercase tracking-widest text-gray-800">
                Lucknow, India
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="p-2 bg-primary/10 rounded-full text-primary">
                <Mail size={20} />
              </span>
              <span className="text-sm uppercase tracking-widest text-gray-800 break-all">
                info@dumuzi.com
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 border border-t-4 border-gray-100 border-t-primary shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-500">
                First Name
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-3"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-3"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-3"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-500">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-3"
              placeholder="e.g. 9876543210"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-500">
              I want to talk about
            </label>
            <select
              value={formData.weddingDate}
              onChange={(e) =>
                setFormData({ ...formData, weddingDate: e.target.value })
              }
              className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-3 text-gray-700"
            >
              <option value="">Select an option</option>
              <option value="order">Placing an order</option>
              <option value="corporate">Corporate gifting enquiry</option>
              <option value="bespoke">Bespoke commission or wedding favours</option>
              <option value="masterclass">Masterclass booking</option>
              <option value="wholesale">Wholesale / trade enquiry</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-500">
              Your message
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-stone-50 border border-gray-200 focus:outline-none focus:border-primary p-3 resize-none"
              placeholder="Tell us about your enquiry…"
            ></textarea>
          </div>
          <Button
            type="submit"
            className="w-full py-4 tracking-[0.2em]"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};
