import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { faqs } from "../../data/content";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-12 md:py-24 px-4 md:px-6 bg-wedding-slate text-white relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary-dark rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-gray-300">
              Got Questions?
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display mb-6">
            Common <span className="text-primary italic">Questions</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 rounded-xl border ${
                openIndex === index
                  ? "bg-white/10 border-primary/50 shadow-2xl shadow-primary/10"
                  : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/8"
              }`}
            >
              <button
                className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
              >
                <span
                  className={`font-display text-lg tracking-wide transition-colors duration-300 ${
                    openIndex === index ? "text-primary" : "text-white/90"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    openIndex === index
                      ? "bg-primary border-primary text-white rotate-180"
                      : "border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white"
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-8 pt-0">
                  <p className="text-gray-300 leading-relaxed text-base border-t border-white/10 pt-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
