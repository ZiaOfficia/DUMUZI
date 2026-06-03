import { Heart } from "lucide-react";

const partners = [
  { name: "Rahmani 30", initials: "R30" },
  { name: "Gulf News", initials: "GN" },
  { name: "Times of India", initials: "TOI" },
  { name: "GiveIndia", initials: "GI" },
  { name: "Ketto", initials: "KT" },
  { name: "CSR Box", initials: "CSR" },
];

export const ClientsStrip = () => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-0 bg-accent relative overflow-hidden">
      <span className="absolute top-6 left-1/4 text-secondary/40 text-2xl" aria-hidden>
        ✦
      </span>
      <span className="absolute bottom-6 right-1/4 text-secondary/40 text-2xl" aria-hidden>
        ✦
      </span>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="inline-flex items-center justify-center gap-3 text-sm uppercase tracking-[0.4em] text-secondary mb-3 font-bold">
          <span className="block w-8 h-px bg-secondary" />
          <Heart size={14} fill="currentColor" />
          Partners &amp; Supporters
          <Heart size={14} fill="currentColor" />
          <span className="block w-8 h-px bg-secondary" />
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-white mb-10">
          Organizations that support our work
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center justify-center px-3 py-6 rounded-tl-2xl rounded-br-2xl border border-secondary/20 bg-white/5 hover:bg-secondary hover:border-secondary transition-all duration-300"
            >
              <span className="font-display text-2xl font-bold text-secondary mb-1 group-hover:text-accent transition-colors">
                {p.initials}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-300 group-hover:text-accent/80 transition-colors">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
