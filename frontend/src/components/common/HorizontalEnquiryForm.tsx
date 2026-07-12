import { useState } from "react";
import { Button } from "./Button";
import { submitToGoogleSheets } from "../../utils/googleSheets";
import { sendEmailNotification } from "../../utils/emailNotification";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";

export const HorizontalEnquiryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    phone: "",
    message: "",
    venue: "",
    budget: "",
  });


  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.message ||
      !formData.venue ||
      !formData.budget
    ) {
      alert("Please fill in all the details, including your message.");
      return;
    }

    try {
      // Trigger background submissions (non-blocking)
      submitToGoogleSheets({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.date,
        message: formData.message,
        venue: formData.venue,
        budget: formData.budget,
        serviceName: "Inquiry Started",
      });

      sendEmailNotification({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        message: formData.message,
        venue: formData.venue,
        budget: formData.budget,
      });

      // Redirect instantly
      navigate("/thank-you");

      setFormData({
        name: "",
        email: "",
        date: "",
        phone: "",
        message: "",
        venue: "",
        budget: "",
      });
    } catch (error) {
      console.error("Submission error", error);
      // Navigate anyway for instant feel
      navigate("/thank-you");
    }
  };

  return (
    <div className="bg-stone-50 py-12 px-6 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 border-t-4 border-primary">
          <div className="w-full md:w-1/4">
            <h3 className="font-display text-xl text-accent">
              Get in touch with us
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Tell us about your order or occasion and we will get back to you within 24 hours.
            </p>
          </div>

          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-stone-50 border-none px-4 py-3 focus:ring-1 focus:ring-primary text-gray-600"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-stone-50 border-none px-4 py-3 focus:ring-1 focus:ring-primary text-gray-600"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-stone-50 border-none px-4 py-3 focus:ring-1 focus:ring-primary text-gray-600"
              />
              <select
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full bg-stone-50 border-none px-4 py-3 focus:ring-1 focus:ring-primary text-gray-600 appearance-none"
              >
                <option value="" disabled>
                  I want to...
                </option>
                <option value="gift-box">Order a gift box</option>
                <option value="wedding-favors">Wedding favours enquiry</option>
                <option value="corporate">Corporate gifting</option>
                <option value="bespoke">Bespoke commission</option>
                <option value="masterclass">Book a masterclass</option>
                <option value="other">Something else</option>
              </select>
              <input
                type="text"
                placeholder="City / Location"
                required
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
                className="w-full bg-stone-50 border-none px-4 py-3 focus:ring-1 focus:ring-primary text-gray-600"
              />
              <select
                required
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full bg-stone-50 border-none px-4 py-3 focus:ring-1 focus:ring-primary text-gray-600 appearance-none"
              >
                <option value="" disabled>
                  Approximate budget (optional)
                </option>
                <option value="under-1k">Under Rs 1,000</option>
                <option value="1k-5k">Rs 1,000 – 5,000</option>
                <option value="5k-25k">Rs 5,000 – 25,000</option>
                <option value="25k-plus">Rs 25,000 and above</option>
                <option value="not-applicable">Not applicable</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-stone-50 border-none px-4 py-3 focus:ring-1 focus:ring-primary text-gray-600"
                />
                <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};