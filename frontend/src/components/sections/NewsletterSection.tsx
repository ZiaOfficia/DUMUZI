

const NewsletterSection = () => {
  return (
      <section className="relative py-16 md:py-32 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1920&q=80"
            alt="Children studying — Aaghaz Foundation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-accent/70"/>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-2xl mx-auto">
          <h5 className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-6">
            Stay Updated
          </h5>
          <h2 className="text-4xl md:text-5xl font-display mb-8">
            Get updates about our work
          </h2>
          <p className="text-lg font-light opacity-95 mb-10">
            Sign up to receive our news. We send updates four times a year with real stories of how your donations help students. No spam.
          </p>

          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 px-6 py-4 rounded-full focus:outline-none focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              className="bg-secondary text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-secondary-dark transition-colors rounded-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
  )
}

export default NewsletterSection