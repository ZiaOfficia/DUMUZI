export interface PortfolioItem {
  id: string;
  title: string;
  services: string;
  date: string;
  location: string;
  heroImage: string;
  description: string[];
  galleryImages: string[];
  videoUrl?: string; // YouTube ID
  testimonial?: {
    quote: string;
    author: string;
  };
}

// DUMUZI Luxury Chocolates — Collections & Artisan Guides
export const portfolioData: PortfolioItem[] = [
  {
    id: "noir-intense-collection",
    title: "Noir Intense — Single-Origin Dark Collection",
    services: "Dark Chocolate, Single-Origin, Bars & Truffles",
    date: "2024",
    location: "Madagascar · Ecuador · Peru",
    heroImage: "/images/assets/dark_chocolates_hero.png",
    description: [
      "Our Noir Intense collection was born from a single question: what does a cocoa bean actually taste like before sugar and milk dilute its character? Three years of direct sourcing partnerships with farming cooperatives in Madagascar, Ecuador, and Peru gave us the answer.",
      "Each origin is slow-roasted separately, hand-tempered at precise temperature thresholds, and cast into thin bars that let the chocolate's natural flavour speak without interference.",
      "The result is a tasting flight of single-origin dark chocolates that reads like a map of the equatorial belt — vibrant red fruit from Madagascar, earthy florals from Ecuador, and the smoky, mineral depth of Peruvian highland cocoa.",
    ],
    galleryImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
    testimonial: {
      quote:
        "The Madagascar Noir Intense is the finest dark chocolate I have ever tasted. It completely redefined what I thought chocolate could be.",
      author: "Isabella R., London",
    },
  },
  {
    id: "signature-truffle-guide",
    title: "The Art of the DUMUZI Truffle",
    services: "Truffles, Ganache, Artisan Craftsmanship",
    date: "2024",
    location: "DUMUZI Atelier, Paris",
    heroImage: "/images/assets/dark_chocolates_hero.png",
    description: [
      "A DUMUZI truffle begins the night before. Our organic cream is infused cold with botanicals — fresh cardamom pods, Damask rose petals, or yuzu zest — then strained and heated the next morning to be poured over finely chopped single-origin chocolate.",
      "The ganache emulsifies slowly. Our chocolatiers stir outward from the centre, never rushing the process. It rests for 24 hours before it is hand-rolled into rough spheres, dipped in tempered chocolate, and finished by hand.",
      "No two truffles are identical. That is how it should be. Each one is a small work of art, and the slight variation in shape is proof that a human made it.",
    ],
    galleryImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
    testimonial: {
      quote:
        "I ordered the Rose & Cardamom truffle box as a wedding gift. The couple told me it was the most memorable gift they received.",
      author: "James T., New York",
    },
  },
  {
    id: "gold-collection-2024",
    title: "The Gold Collection — Limited Holiday Edition",
    services: "Gift Boxes, Limited Edition, Holiday",
    date: "Christmas 2024",
    location: "DUMUZI Atelier",
    heroImage: "/images/assets/dark_chocolates_hero.png",
    description: [
      "Released each December, our Gold Collection is the most anticipated launch of the DUMUZI year. The 2024 edition featured 24 pieces across six signature flavours, each individually decorated with edible 24-karat gold leaf.",
      "The box itself was designed in collaboration with a Parisian luxury paper artisan — deep midnight blue with gold foil embossing, a magnetic closure, and a hand-tied silk ribbon.",
      "The 2024 Gold Collection sold out in 48 hours. We now take pre-orders from October each year for subscribers and returning customers.",
    ],
    galleryImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
    testimonial: {
      quote:
        "I buy the Gold Collection every year for my most important clients. The response is always the same: pure amazement.",
      author: "Corporate gifting client",
    },
  },
  {
    id: "tempering-masterclass",
    title: "Tempering Masterclass — Sold Out 2024",
    services: "Masterclass, Tempering, Education",
    date: "2024 — Present",
    location: "DUMUZI Atelier, Paris",
    heroImage: "/images/assets/dark_chocolates_hero.png",
    description: [
      "Our four-hour Advanced Tempering Masterclass sold out every session in 2024. Participants learned to control cocoa butter crystal polymorphs, achieve a mirror-gloss finish, and produce professional-quality pralines using our own hand-polished copper molds.",
      "Led by our head chocolatier Antoine Laurent, each session is limited to eight participants to ensure individual attention and a genuine learning experience.",
      "Past participants have included professional pastry chefs, food journalists, and dedicated home chocolatiers. Several alumni have gone on to launch their own chocolate businesses.",
    ],
    galleryImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
    testimonial: {
      quote:
        "I walked into the masterclass as an enthusiastic amateur and walked out as a chocolatier. Antoine's teaching is extraordinary.",
      author: "Marcus W., Advanced Masterclass participant",
    },
  },
  {
    id: "cocoa-source-madagascar",
    title: "Our Cocoa Source — Sambirano Valley, Madagascar",
    services: "Sustainability, Direct Sourcing, Terroir",
    date: "2023 — Present",
    location: "Sambirano Valley, Madagascar",
    heroImage: "/images/assets/dark_chocolates_hero.png",
    description: [
      "In 2023, our founders visited the Sambirano Valley in northern Madagascar to meet the farming cooperative that has supplied our cocoa since 2015. What they found was a community that has built its livelihood on the quality of its beans.",
      "We pay above fair-trade prices and reinvest a percentage of every bar's sale into the cooperative's drying and fermentation infrastructure. Better processing means better cocoa — better cocoa means better chocolate.",
      "The Sambirano Valley's volcanic soil, high humidity, and consistent rainfall produce cocoa with a distinctive red-fruit acidity that our customers have come to recognise as the hallmark of our Noir Intense 85%.",
    ],
    galleryImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
    testimonial: {
      quote:
        "When I taste the Noir Intense, I taste the valley. There is something genuinely different about chocolate made from cocoa you have met at its source.",
      author: "Antoine Laurent, Founder",
    },
  },
  {
    id: "bespoke-hotel-programme",
    title: "Bespoke Programme — The Savoy, London",
    services: "Corporate, Bespoke, Venue Programme",
    date: "2022 — Present",
    location: "London, UK",
    heroImage: "/images/assets/dark_chocolates_hero.png",
    description: [
      "In 2022, DUMUZI was commissioned by a five-star London hotel to create an exclusive bespoke chocolate programme for their in-room amenity and restaurant petit-fours service.",
      "We developed three exclusive flavours — Earl Grey & Bergamot, English Rose & Champagne, and Smoked Sea Salt Dark — available nowhere else. Every piece is embossed with a bespoke monogram in edible gold.",
      "The programme has since expanded to three additional luxury properties. Our hotel partners benefit from regular production, consistent quality, and full creative exclusivity over their chocolate menu.",
    ],
    galleryImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
    testimonial: {
      quote:
        "DUMUZI's bespoke programme has become one of the most commented-on details by our guests. We could not imagine our amenity offering without them.",
      author: "Head of Guest Experience, luxury hotel",
    },
  },
];
