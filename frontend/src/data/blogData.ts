export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Full HTML/Markdown content
  image: string;
  date: string;
  author: string;
  category: string;
  tags?: string; // Comma-separated tags
  createdAt?: string; // Raw ISO date for URL generation
}

/**
 * Generate a date-based URL for a blog post.
 * e.g., /2026/01/21/post-slug
 */
export const getBlogPostUrl = (slug: string, createdAt?: string): string => {
  const cleanSlug = slug.replace(/^\/+/, "");
  if (createdAt) {
    const d = new Date(createdAt);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `/${year}/${month}/${day}/${cleanSlug}`;
  }
  // Fallback if no createdAt
  return `/blog/${cleanSlug}`;
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "crafting-the-perfect-dark-chocolate-truffles",
    title: "Crafting the Perfect Dark Chocolate Truffle: An Artisan's Guide",
    excerpt: "Discover the secret behind our signature dark chocolate truffles, from choosing the perfect cocoa percentages to achieving a silky ganache texture.",
    content: `
      <p>Creating a truly luxurious dark chocolate truffle is a delicate balancing act of temperature, timing, and ingredient quality. At DUMUZI, we spent years refining our signature recipe to ensure that every single bite delivers a moment of pure bliss.</p>
      
      <h3>The Importance of Quality Cocoa</h3>
      <p>A great truffle starts at the source. We select single-origin organic cocoa beans with a minimum of 72% cocoa content. This guarantees a deep, complex flavor profile that isn't masked by excess sugar. The beans are roasted slowly to draw out notes of red fruit and roasted nuts.</p>
      
      <h3>Achieving the Silky Ganache</h3>
      <p>The heart of a truffle is its ganache. To achieve the signature DUMUZI texture, we heat organic double cream just to the boiling point, then pour it over finely chopped chocolate. The key is slow emulsification—stirring outward from the center to create a glossy, stable emulsion without introducing air bubbles.</p>
      
      <blockquote>
        "Luxury is in the details. A perfect truffle must have a thin, crisp chocolate shell that snaps cleanly, yielding immediately to a velvety, melting interior."
      </blockquote>
      
      <h3>The Final Enrobing</h3>
      <p>Once the ganache has set, each truffle is hand-rolled and dipped in tempered dark chocolate. Some are finished with a dusting of premium Dutch cocoa powder, while others are decorated with delicate flakes of 24k gold leaf. The result is a masterpiece of confectionary art.</p>
    `,
    image: "/images/products/LF-BN9T.jpeg",
    date: "Feb 10, 2026",
    author: "Chef Antoine Laurent",
    category: "Craftsmanship",
    tags: "Truffles, Dark Chocolate, Handcrafted, Ganache",
    createdAt: "2026-02-10T12:00:00.000Z",
  },
  {
    id: "2",
    slug: "sourcing-single-origin-cocoa-beans-madagascar-ecuador",
    title: "Sourcing Single-Origin Cocoa: Madagascar vs. Ecuador",
    excerpt: "Explore the unique flavor profiles of single-origin cocoa beans and how soil, climate, and geography shape the taste of our luxury collections.",
    content: `
      <p>Just like fine wine, the taste of chocolate is deeply influenced by its 'terroir'—the environment where the cocoa beans are grown. Today, we contrast two of our favorite single-origin chocolates: Madagascar and Ecuador.</p>
      
      <h3>Madagascar: Vibrant and Fruity</h3>
      <p>Cocoa beans from the Sambirano Valley in Madagascar are famous for their bright, citrusy acidity. When you taste a DUMUZI Madagascar bar, you will instantly notice notes of raspberry, cranberry, and even citrus. It is a lively, refreshing flavor that surprises many who are used to standard chocolate.</p>
      
      <h3>Ecuador: Earthy and Floral</h3>
      <p>In contrast, Ecuadorian Arriba Nacional cocoa offers a completely different sensory experience. It is deep, robust, and heavily aromatic, with floral hints of jasmine and orange blossom, paired with an earthy, nutty finish. We use this cocoa to create our signature velvet dark blends.</p>
      
      <h3>Our Commitment to Fair Sourcing</h3>
      <p>We work directly with local farming cooperatives in both regions. By bypassing middle-men, we ensure that farmers are paid above fair-trade prices, supporting sustainable agriculture and protecting biodiversity in these unique ecosystems.</p>
    `,
    image: "/images/products/LF-D25T.jpeg",
    date: "Jan 28, 2026",
    author: "Sourcing Team",
    category: "Sustainability",
    tags: "Cocoa Sourcing, Madagascar, Ecuador, Single-Origin",
    createdAt: "2026-01-28T12:00:00.000Z",
  },
  {
    id: "3",
    slug: "corporate-gifting-guide-luxury-chocolate-boxes",
    title: "The Ultimate Corporate Gifting Guide: Why Premium Gift Packs Stand Out",
    excerpt: "Discover how custom-designed confectionery assortments can elevate your corporate relations and leave a lasting impression on clients and partners.",
    content: `
      <p>In the business world, a thoughtful gift is a powerful tool to build relationships and show appreciation. Standard corporate gifts like notebooks and pens are often forgotten. A box of DUMUZI premium gift packs, however, is an experience that is shared and remembered.</p>
      
      <h3>First Impressions Matter</h3>
      <p>Our corporate boxes are wrapped in elegant dark textured paper with gold-foil embossing and silk ribbons. Opening a DUMUZI box is a multi-sensory experience that reflects the high standards of your own brand.</p>
      
      <h3>Custom Branding Options</h3>
      <p>We offer fully customizable corporate gift boxes. From custom-molded confectionery bars featuring your company logo to personalized ribbon colors and branded greeting cards, we help you align our confectionery with your corporate identity.</p>
    `,
    image: "/images/products/LF-H18D.jpeg",
    date: "Jan 15, 2026",
    author: "Gifting Expert",
    category: "Gifting",
    tags: "Corporate Gifts, Luxury Packing, Customs",
    createdAt: "2026-01-15T12:00:00.000Z",
  },
  {
    id: "4",
    slug: "health-benefits-organic-dark-chocolate",
    title: "Dark Chocolate & Wellness: The Scientific Benefits of Cocoa",
    excerpt: "Learn how the rich antioxidants, flavonoids, and minerals in organic dark chocolate support cardiovascular health and boost mood.",
    content: `
      <p>Indulgence doesn't have to come with guilt. High-quality organic dark chocolate is packed with bioactive compounds that contribute positively to your health and mental well-being.</p>
      
      <h3>Antioxidants and Heart Health</h3>
      <p>Dark chocolate is one of the richest dietary sources of polyphenols and flavonoids, powerful antioxidants that help lower blood pressure and improve blood flow. Studies show that consuming moderate amounts of dark chocolate weekly supports long-term cardiovascular health.</p>
      
      <h3>The Natural Mood Elevator</h3>
      <p>Have you ever wondered why chocolate makes you feel happy? It triggers the release of endorphins and contains serotonin and phenylethylamine (the 'love chemical'), which promote feelings of relaxation and joy. A piece of DUMUZI dark chocolate is the perfect natural stress reliever.</p>
    `,
    image: "/images/products/LF-D15T.jpeg",
    date: "Dec 30, 2025",
    author: "Wellness Desk",
    category: "Science",
    tags: "Health Benefits, Antioxidants, Organic Cocoa, Mood Booster",
    createdAt: "2025-12-30T12:00:00.000Z",
  },
  {
    id: "5",
    slug: "art-of-tempering-chocolate-at-home",
    title: "Mastering the Temper: How to Work with Chocolate Like a Pro",
    excerpt: "A step-by-step tutorial on the science of chocolate tempering, explaining how to achieve a glossy finish and crisp snap at home.",
    content: `
      <p>Tempering is the process of heating and cooling chocolate to stable temperatures, aligning the cocoa butter crystals. Without tempering, chocolate sets soft, dull, and melts instantly on your fingers. Here is how to achieve the perfect professional temper at home.</p>
      
      <h3>The Three Stages of Tempering</h3>
      <p>To temper dark chocolate, you must follow these temperature thresholds carefully:</p>
      <ol>
        <li><strong>Melting:</strong> Heat the chocolate to 45°C - 50°C to break all existing crystal structures.</li>
        <li><strong>Cooling:</strong> Cool the chocolate to 27°C while stirring continuously to allow stable crystals to seed.</li>
        <li><strong>Reheating:</strong> Gently warm the chocolate back to 31°C - 32°C. This melts away any unstable crystal structures, leaving a perfect glossy temper.</li>
      </ol>
      
      <h3>The Snap Test</h3>
      <p>Dip a clean spoon into the tempered chocolate. If it is correctly tempered, it will set at room temperature within 3 to 5 minutes with a shiny surface and a crisp snap when bent.</p>
    `,
    image: "/images/products/LF-H12T.jpeg",
    date: "Dec 12, 2025",
    author: "Chocolatier Antoine",
    category: "Craftsmanship",
    tags: "Tempering, Baking, Chocolate DIY, Science",
    createdAt: "2025-12-12T12:00:00.000Z",
  },
  {
    id: "6",
    slug: "history-of-cocoa-from-sacred-bean-to-luxury-sweet",
    title: "The History of Cocoa: From Sacred Mayan Drink to Modern Luxury",
    excerpt: "Travel back in time to discover how the ancient Mesoamericans consumed cocoa and how it evolved into the world's most desired luxury sweet.",
    content: `
      <p>Long before it was molded into sweet bars, cocoa was consumed as a bitter, spicy beverage by the ancient Mayans and Aztecs, who believed the bean was a gift from the gods.</p>
      
      <h3>The Food of the Gods</h3>
      <p>The scientific name for the cocoa tree, <em>Theobroma cacao</em>, translates literally to 'Food of the Gods'. In Mesoamerica, cocoa beans were so valuable they were used as currency. The elite drank it frothed with water, chili peppers, and cornmeal.</p>
      
      <h3>The European Evolution</h3>
      <p>When cocoa arrived in Europe in the 16th century, Spanish royalty added sugar and cinnamon. Over the centuries, inventions like the cocoa press and conching machine transformed chocolate from a gritty beverage into the smooth, solid confections we cherish today.</p>
    `,
    image: "/images/products/DUMUZI.jpeg",
    date: "Nov 25, 2025",
    author: "Heritage Team",
    category: "History",
    tags: "Cocoa History, Mayans, Confectionery Evolution",
    createdAt: "2025-11-25T12:00:00.000Z",
  },
  {
    id: "7",
    slug: "pairing-wine-and-luxury-chocolates",
    title: "Wine & Chocolate Pairing: The Connoisseur’s Guide",
    excerpt: "Learn the rules of pairing fine wines with premium dark and milk chocolates to elevate your next tasting party.",
    content: `
      <p>Pairing wine and chocolate can be incredibly rewarding if done correctly. However, because both contain strong tannins, matching them requires balance. Here are our top rules for a perfect pairing.</p>
      
      <h3>Rule 1: The Wine Should Be Sweet or Equal</h3>
      <p>A dry red wine paired with sweet milk chocolate can taste sour. Ensure the wine has a hint of sweetness to complement the cocoa richness. Port, Banyuls, and late-harvest Zinfandels are classic choices.</p>
      
      <h3>Rule 2: Match Intensities</h3>
      <p>Match delicate milk chocolates with lighter wines (like a Pinot Noir), and save robust 80% dark chocolates for full-bodied Cabernet Sauvignon or Syrah.</p>
    `,
    image: "/images/products/LF-D18T.jpeg",
    date: "Nov 10, 2025",
    author: "Sommelier Desk",
    category: "Tasting Guide",
    tags: "Wine Pairing, Chocolate Tasting, Fine Dining",
    createdAt: "2025-11-10T12:00:00.000Z",
  },
  {
    id: "8",
    slug: "custom-chocolate-favors-for-weddings-and-events",
    title: "Elegant Wedding Favors: Custom Chocolate Collections",
    excerpt: "Explore our range of personalized chocolate wedding favors, designed to add an indulgent touch to your big day.",
    content: `
      <p>Your wedding day is a reflection of your unique love story, and the parting gifts for your guests should be just as special. Custom DUMUZI chocolate favors add a memorable, sweet touch of sophistication to your wedding reception.</p>
      
      <h3>Personalized Packaging</h3>
      <p>We design custom-molded chocolate favors and miniature truffle boxes that match your wedding theme, colors, and monogram. Each piece is beautifully presented in delicate packaging that serves as both table decor and a delicious treat.</p>
    `,
    image: "/images/products/LF-H18B.jpeg",
    date: "Oct 22, 2025",
    author: "Event Team",
    category: "Gifting",
    tags: "Wedding Favors, Custom Boxes, Luxury Weddings",
    createdAt: "2025-10-22T12:00:00.000Z",
  },
  {
    id: "9",
    slug: "tempering-temperatures-and-chocolate-science",
    title: "The Physics of Cocoa Butter: Why Good Chocolate Snaps",
    excerpt: "An in-depth look at the polymorphs of cocoa butter crystals and how chocolate makers manipulate science for the perfect texture.",
    content: `
      <p>Cocoa butter can crystallize into six different polymorphs (Form I to Form VI). Only Form V yields the glossy appearance, clean release from molds, and crisp snap that defines luxury chocolate.</p>
      
      <h3>Controlling the Crystals</h3>
      <p>By controlling heating and cooling rates, our chocolatiers ensure that only Form V crystals dominate the mixture. This scientific precision is what gives DUMUZI chocolates their premium feel and long shelf stability.</p>
    `,
    image: "/images/products/LF-D25B.jpeg",
    date: "Oct 05, 2025",
    author: "Science Team",
    category: "Science",
    tags: "Cocoa Physics, Crystal Polymorphs, Tempering Science",
    createdAt: "2025-10-05T12:00:00.000Z",
  },
  {
    id: "10",
    slug: "the-story-behind-dumuzi-chocolate-brand",
    title: "The Dumuzi Legend: Handcrafted Cocoa with a Heritage",
    excerpt: "Discover the inspiration behind the DUMUZI brand name and our vision to redefine luxury chocolate craftsmanship.",
    content: `
      <p>Named after the ancient deity of abundance and fertility, DUMUZI was founded to honor the rich agricultural heritage of cocoa farming and elevate chocolate-making to a fine art.</p>
      
      <h3>Redefining Confectionery Luxury</h3>
      <p>We combine centuries-old European conching techniques with modern ethical sourcing to produce dark chocolate bars and truffles that are rich, pure, and sustainably crafted.</p>
    `,
    image: "/images/products/LF- BN9.jpeg",
    date: "Sep 18, 2025",
    author: "Founders",
    category: "Heritage",
    tags: "Dumuzi Origin, Brand Story, Artisanal Vision",
    createdAt: "2025-09-18T12:00:00.000Z",
  },
];
