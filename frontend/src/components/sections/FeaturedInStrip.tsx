const features = [
  "Gulf News",
  "The Times of India",
  "Hindustan Times",
  "The Hindu",
  "NDTV",
  "Outlook India",
  "The Indian Express",
  "BBC News Hindi",
];

export const FeaturedInStrip = () => {
  return (
    <div className="py-10 md:py-16 px-4 md:px-0 bg-wedding-slate relative overflow-hidden">
      {/* Diamond row at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`block w-2 h-2 rotate-45 -translate-y-1 ${
              i === 2 ? "bg-secondary" : "bg-primary/70"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center w-full mb-10">
        <p className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.4em] text-secondary text-center">
          <span className="block w-8 h-px bg-secondary" />
          Aaghaz in the News
          <span className="block w-8 h-px bg-secondary" />
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 px-8 max-w-6xl mx-auto">
        {features.map((name, i) => (
          <span
            key={name}
            className="font-display text-xl md:text-2xl italic text-gray-300 hover:text-secondary transition-colors flex items-center gap-3"
          >
            {name}
            {i < features.length - 1 && (
              <span className="hidden md:inline text-secondary/50 text-xs">
                ◆
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
