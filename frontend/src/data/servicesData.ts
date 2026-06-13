// DUMUZI Luxury Chocolates — Collections & Product Categories
// Same ServiceData interface shape so existing components keep working.

export interface ServiceData {
  id: string;
  title: string;
  heroImage: string;
  heroTitle: string;
  intro: {
    heading: string;
    subheading: string;
    description: string[];
  };
  whyChooseUs: {
    title: string;
    items: { title: string; description: string }[];
  };
  signatureServices: {
    title: string;
    items: { title: string; description: string; features?: string[] }[];
  };
  process: {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  testimonials?: {
    quote: string;
    author: string;
    location: string;
  }[];
  portfolioImages: string[];
  faqs?: { question: string; answer: string }[];
  namedScholarships?: string[];
  contact?: {
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
    note?: string;
  };
}

import { serviceImages } from "./imageAssets";

export const servicesData: ServiceData[] = [
  {
    id: "dark-collection",
    title: "Dark Chocolate Collection",
    heroImage: serviceImages.studentAid,
    heroTitle: "THE DARK COLLECTION — SINGLE-ORIGIN INTENSITY",
    intro: {
      heading: "DARK CHOCOLATE COLLECTION",
      subheading: "Complex, bold, and deeply satisfying single-origin dark chocolates.",
      description: [
        "Our Dark Collection is the heart of DUMUZI. Each bar is made from a single origin of organic cocoa — Madagascar, Ecuador, or Peru — so you can taste the distinct character of each region's terroir.",
        "With cocoa percentages ranging from 72% to 92%, our dark range offers everything from approachable richness to intensely complex bitterness, all hand-tempered in our atelier for a glossy finish and clean snap.",
      ],
    },
    whyChooseUs: {
      title: "What Sets Our Dark Chocolate Apart",
      items: [
        {
          title: "Single-Origin Cocoa",
          description:
            "Each bar is made from one estate's harvest, preserving unique tasting notes of red fruit, earth, and roasted nuts.",
        },
        {
          title: "Hand-Tempered by Masters",
          description:
            "Our chocolatiers hand-temper every batch to achieve Form V cocoa butter crystals — the secret behind a perfect snap and glossy sheen.",
        },
        {
          title: "No Artificial Additives",
          description:
            "No palm oil, no artificial flavours, no preservatives. Just pure cocoa, organic cocoa butter, and a touch of unrefined cane sugar.",
        },
      ],
    },
    signatureServices: {
      title: "Dark Collection Highlights",
      items: [
        {
          title: "Noir Intense 85%",
          description:
            "Our bestselling Madagascar single-origin bar. Deep, complex, with notes of red berry and a dry, clean finish.",
        },
        {
          title: "Grand Cru Ecuador 72%",
          description:
            "A gentler entry into dark chocolate. Earthy and floral, with hints of jasmine and orange blossom.",
        },
        {
          title: "Pure Origin Peru 92%",
          description:
            "For the true connoisseur. Intensely dark with an earthy, smoky depth and a long, lingering finish.",
        },
        {
          title: "Dark Truffle Selection",
          description:
            "Ganache truffles made from our 85% Madagascar blend, finished with Dutch cocoa powder or 24k gold leaf.",
        },
      ],
    },
    process: {
      title: "How We Make Our Dark Chocolate",
      description: "Every batch follows our slow, carefully monitored four-stage process:",
      steps: [
        {
          title: "1. Source",
          description:
            "We hand-select cocoa beans from farming cooperatives in Madagascar, Ecuador, and Peru — paying above fair-trade prices.",
        },
        {
          title: "2. Roast",
          description:
            "Beans are slowly roasted at low temperatures to develop deep, complex flavour profiles without burning delicate aromatic compounds.",
        },
        {
          title: "3. Temper",
          description:
            "Our master chocolatiers hand-temper each batch, cycling through precise temperature stages to align cocoa butter crystals.",
        },
        {
          title: "4. Finish",
          description:
            "Each bar or truffle is hand-finished, inspected for quality, and packed in temperature-controlled packaging.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "The Noir Intense 85% is the finest dark chocolate I have ever tasted. It completely changed how I think about single-origin cocoa.",
        author: "Isabella R.",
        location: "London, UK",
      },
      {
        quote:
          "I ordered the Dark Truffle Selection as a gift and the recipient called me immediately to say they had never tasted anything like it.",
        author: "James T.",
        location: "New York, USA",
      },
    ],
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },

  {
    id: "truffle-collection",
    title: "Truffle Collection",
    heroImage: serviceImages.scholarships,
    heroTitle: "TRUFFLE COLLECTION — HANDCRAFTED GANACHE MASTERPIECES",
    intro: {
      heading: "THE TRUFFLE COLLECTION",
      subheading: "Velvety ganache truffles crafted by hand in our artisan atelier.",
      description: [
        "Our truffles begin with the finest single-origin chocolate and organic cream. Each ganache is slowly emulsified by hand to achieve a perfectly smooth, melting texture. Seasonal flavour infusions — from rose and cardamom to yuzu and black pepper — are added in small batches.",
        "Every truffle is hand-rolled, enrobed in tempered chocolate, and finished with cocoa powder, crushed nuts, or edible 24k gold leaf.",
      ],
    },
    whyChooseUs: {
      title: "Why Our Truffles Are Exceptional",
      items: [
        {
          title: "Hand-rolled, never moulded",
          description:
            "Our truffles are shaped by hand, giving each one a natural, artisan appearance.",
        },
        {
          title: "Seasonal infusions",
          description:
            "Each season brings new flavour infusions using fresh botanicals, spices, and citrus zests.",
        },
        {
          title: "Premium finishes",
          description:
            "Choose from Dutch cocoa dusting, crushed pistachios, freeze-dried berry, or 24k edible gold leaf.",
        },
      ],
    },
    signatureServices: {
      title: "Signature Truffle Flavours",
      items: [
        {
          title: "Classic Dark Ganache",
          description:
            "85% Madagascar ganache, hand-rolled in Dutch cocoa powder. Our most iconic truffle.",
        },
        {
          title: "Rose & Cardamom",
          description:
            "Milk chocolate ganache infused with Damask rose water and green cardamom. Finished with dried rose petals.",
        },
        {
          title: "Yuzu & Dark Chocolate",
          description:
            "A Japanese-inspired truffle — tart yuzu citrus in a velvety 72% Ecuador ganache.",
        },
        {
          title: "Salted Caramel & Hazelnut",
          description:
            "Buttery salted caramel ganache with toasted Piedmont hazelnuts in a milk chocolate shell.",
        },
      ],
    },
    process: {
      title: "From Ganache to Gift Box",
      description: "",
      steps: [
        {
          title: "1. Make the ganache",
          description:
            "We heat organic cream and pour it over finely chopped chocolate, slowly emulsifying by hand.",
        },
        {
          title: "2. Infuse & set",
          description:
            "Seasonal flavour extracts are folded in. The ganache rests for 24 hours at precise temperatures.",
        },
        {
          title: "3. Roll & enrobe",
          description:
            "Each truffle is hand-rolled and dipped in tempered chocolate, then finished with its signature coating.",
        },
        {
          title: "4. Inspect & pack",
          description:
            "Each piece is quality-checked, placed in a paper cup, and nestled into its gift box.",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "The Rose & Cardamom truffle is unlike anything I have ever had. It tastes like a luxury perfume smells. Extraordinary.",
        author: "Sophia M.",
        location: "Paris, France",
      },
    ],
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },

  {
    id: "gift-boxes",
    title: "Gift Boxes",
    heroImage: serviceImages.financialAssistance,
    heroTitle: "GIFT BOXES — LUXURY GIFTING REIMAGINED",
    intro: {
      heading: "DUMUZI GIFT BOXES",
      subheading: "Elegantly curated gift boxes for every occasion.",
      description: [
        "A DUMUZI gift box is an experience before the first piece is even tasted. Our boxes are wrapped in dark textured paper with gold-foil embossing, tied with a satin ribbon, and lined with a handwritten card.",
        "Choose from our curated assortments or build a bespoke box with your preferred selections. All boxes come in a signature temperature-controlled outer box for safe delivery.",
      ],
    },
    whyChooseUs: {
      title: "What Makes Our Gifting Special",
      items: [
        {
          title: "Premium presentation",
          description:
            "Gold-foil embossed dark paper, satin ribbons, and a handwritten personalised card in every box.",
        },
        {
          title: "Curated or bespoke",
          description:
            "Choose from our seasonal curated assortments, or build your own box from our full collection.",
        },
        {
          title: "Temperature-controlled delivery",
          description:
            "Every gift box is shipped in an insulated outer carton with food-grade gel packs to preserve quality.",
        },
      ],
    },
    signatureServices: {
      title: "Gift Box Collections",
      items: [
        {
          title: "The Classic Assortment (12 pcs)",
          description:
            "A curated selection of our bestselling dark and milk chocolate truffles. Our most popular gift.",
        },
        {
          title: "The Signature Collection (24 pcs)",
          description:
            "Our full range of signature truffles, pralines, and dark chocolate bars in a single, impressive box.",
        },
        {
          title: "The Single-Origin Discovery Box",
          description:
            "Three dark chocolate bars — one each from Madagascar, Ecuador, and Peru — for the true connoisseur.",
        },
        {
          title: "Bespoke Corporate Gift Set",
          description:
            "Fully custom boxes with company logo embossing, branded ribbon, and a personalised corporate card.",
        },
      ],
    },
    process: {
      title: "How to Order a Gift Box",
      description: "",
      steps: [
        {
          title: "1. Choose your collection",
          description:
            "Browse our curated assortments online, or contact us to build a bespoke selection.",
        },
        {
          title: "2. Personalise",
          description:
            "Add a handwritten message, custom ribbon colour, or logo embossing for corporate orders.",
        },
        {
          title: "3. We craft & pack",
          description:
            "Your chocolates are freshly made, quality-checked, and beautifully arranged in the gift box.",
        },
        {
          title: "4. Delivered to your door",
          description:
            "Shipped in temperature-controlled packaging by express courier, with tracking provided.",
        },
      ],
    },
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },

  {
    id: "pralines-collection",
    title: "Pralines Collection",
    heroImage: "/images/assets/dark_chocolates_hero.png",
    heroTitle: "PRALINES COLLECTION — BELGIAN CRAFT, DUMUZI SOUL",
    intro: {
      heading: "HANDCRAFTED PRALINES",
      subheading: "Belgian-inspired pralines with the finest nut pastes and flavour fillings.",
      description: [
        "Inspired by the great Belgian praline tradition, our DUMUZI pralines combine classic craftsmanship with our own single-origin dark chocolate shells. Each piece is individually cast in hand-polished moulds.",
        "From classic hazelnut praline paste to contemporary salted miso caramel, our praline range pushes the boundaries of fine confectionery.",
      ],
    },
    whyChooseUs: {
      title: "Why Our Pralines Stand Out",
      items: [
        {
          title: "Hand-polished molds",
          description:
            "Our custom copper molds are hand-polished to ensure a mirror-gloss chocolate shell on every piece.",
        },
        {
          title: "Finest nut pastes",
          description:
            "We use only Piedmont hazelnuts and Sicilian pistachios, freshly ground in our atelier.",
        },
        {
          title: "Bold flavour combinations",
          description:
            "Our chocolatiers experiment seasonally — expect anything from smoked sea salt caramel to matcha and white chocolate.",
        },
      ],
    },
    signatureServices: {
      title: "Praline Highlights",
      items: [
        {
          title: "Hazelnut Praline Classic",
          description:
            "Roasted Piedmont hazelnut paste in a 72% Ecuador dark chocolate shell. A timeless classic.",
        },
        {
          title: "Pistachio & Rose",
          description:
            "Sicilian pistachio paste with a hint of rose water, enrobed in white chocolate.",
        },
        {
          title: "Salted Miso Caramel",
          description:
            "A daring pairing — sweet caramel with umami white miso in a milk chocolate shell.",
        },
        {
          title: "Seasonal Special",
          description:
            "A rotating praline inspired by the season's finest botanicals, fruits, and spices.",
        },
      ],
    },
    process: {
      title: "The Praline Making Process",
      description: "",
      steps: [
        {
          title: "1. Cast the shells",
          description:
            "Tempered chocolate is poured into hand-polished molds, spun to coat evenly, then inverted to remove the excess.",
        },
        {
          title: "2. Fill",
          description:
            "Each shell is piped with its ganache or nut paste filling, then left to crystallise at a controlled temperature.",
        },
        {
          title: "3. Cap",
          description:
            "A final layer of tempered chocolate seals the base of each praline to create a perfectly closed piece.",
        },
        {
          title: "4. Unmould & finish",
          description:
            "Pralines are gently unmoulded, inspected for gloss, and decorated with their signature finishing element.",
        },
      ],
    },
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },

  {
    id: "wedding-favors",
    title: "Wedding Favours",
    heroImage: serviceImages.madarsaInitiative,
    heroTitle: "WEDDING FAVOURS — SWEET MEMORIES FOR EVERY GUEST",
    intro: {
      heading: "BESPOKE WEDDING FAVOURS",
      subheading: "Custom chocolate wedding favours that your guests will cherish.",
      description: [
        "Your wedding day deserves a parting gift as special as the occasion. DUMUZI wedding favours are fully bespoke — from custom-molded chocolates bearing your initials to miniature truffle boxes wrapped in your wedding colour palette.",
        "We work closely with couples and wedding planners to design favours that double as table décor and deliver a moment of pure indulgence to every guest.",
      ],
    },
    whyChooseUs: {
      title: "What We Offer",
      items: [
        {
          title: "Monogrammed packaging",
          description:
            "Gold-foil embossed boxes in any colour with your initials or a custom design.",
        },
        {
          title: "Custom chocolate molds",
          description:
            "Your initials, a motif, or even the date cast into the chocolate itself.",
        },
        {
          title: "No minimum too large",
          description:
            "We produce from 50 to 5,000 wedding favours, with consistent quality across every order.",
        },
      ],
    },
    signatureServices: {
      title: "Wedding Favour Options",
      items: [
        {
          title: "Mini Truffle Box (3 pcs)",
          description:
            "Three signature truffles in a miniature gift box — elegant, compact, and delicious.",
        },
        {
          title: "Monogrammed Chocolate Bar",
          description:
            "A personalised single-origin dark or milk chocolate bar with your initials or wedding date.",
        },
        {
          title: "Mixed Praline Box (6 pcs)",
          description:
            "Six assorted pralines in a bespoke box with custom ribbon and personalised tag.",
        },
        {
          title: "Fully Custom Favour",
          description:
            "Design your own shape, flavour, packaging, and finish. Contact us to discuss your vision.",
        },
      ],
    },
    process: {
      title: "How to Order Wedding Favours",
      description: "",
      steps: [
        {
          title: "1. Share your vision",
          description:
            "Tell us about your wedding theme, colour palette, guest count, and preferred chocolates.",
        },
        {
          title: "2. Receive a design proposal",
          description:
            "Our team will send you packaging mockups and flavour suggestions within 48 hours.",
        },
        {
          title: "3. Approve & deposit",
          description:
            "Confirm the design, place a 50% deposit, and we begin production 4 weeks before your event.",
        },
        {
          title: "4. Delivery or collection",
          description:
            "We deliver your favours in a single temperature-controlled shipment, or you can collect from our atelier.",
        },
      ],
    },
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },

  {
    id: "corporate-gifting",
    title: "Corporate Gifting",
    heroImage: serviceImages.memorialScholarship,
    heroTitle: "CORPORATE GIFTING — ELEVATE YOUR BRAND WITH LUXURY CHOCOLATE",
    intro: {
      heading: "CORPORATE GIFTING PROGRAM",
      subheading: "Bespoke luxury chocolate gifts that represent your brand at its finest.",
      description: [
        "A DUMUZI corporate gift is more than a token — it is a statement about your brand's standards. Our corporate gifting program offers fully branded chocolate sets, custom-molded bars, and seasonal assortments that leave a lasting impression.",
        "We work with marketing teams, EA offices, and gifting managers to create collections that align with your brand identity, budget, and timeline.",
      ],
    },
    whyChooseUs: {
      title: "Why Companies Choose DUMUZI",
      items: [
        {
          title: "Logo & brand integration",
          description:
            "Your company logo can be embossed on packaging, printed on ribbons, or molded directly into the chocolate.",
        },
        {
          title: "Bulk pricing available",
          description:
            "We offer competitive pricing for orders of 50+ units, with dedicated account management for regular orders.",
        },
        {
          title: "Consistent quality at scale",
          description:
            "Our production team maintains the same artisan quality standards whether you order 50 or 2,000 units.",
        },
      ],
    },
    signatureServices: {
      title: "Corporate Collection Options",
      items: [
        {
          title: "Branded Truffle Box",
          description:
            "Our 12-piece Classic Assortment in a custom box with your logo and a branded message card.",
        },
        {
          title: "Single-Origin Bar Set",
          description:
            "Three single-origin dark chocolate bars in a branded sleeve. A sophisticated and educational gift.",
        },
        {
          title: "Premium Executive Box",
          description:
            "Our 24-piece Signature Collection in a premium rigid gift box with magnetic closure and full brand wrap.",
        },
        {
          title: "Seasonal Corporate Collection",
          description:
            "Limited-edition seasonal assortments available for Christmas, Diwali, and Chinese New Year.",
        },
      ],
    },
    process: {
      title: "How to Set Up a Corporate Account",
      description: "",
      steps: [
        {
          title: "1. Enquire",
          description:
            "Email our corporate team at corporate@dumuzi.com or fill out the corporate enquiry form.",
        },
        {
          title: "2. Proposal & samples",
          description:
            "We send you a personalised proposal and a complimentary sample box within 5 business days.",
        },
        {
          title: "3. Approve design",
          description:
            "We produce packaging mockups for your approval before any production begins.",
        },
        {
          title: "4. Production & delivery",
          description:
            "Once approved, your order is produced in 10–15 business days and delivered with full tracking.",
        },
      ],
    },
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
    contact: {
      name: "Elise Moreau",
      role: "Corporate Gifting Director",
      email: "corporate@dumuzi.com",
      phone: "+44 20 7123 4567",
      note: "For bulk orders or bespoke corporate gifting enquiries, contact Elise directly. She will design a proposal tailored to your brand and budget.",
    },
  },

  {
    id: "subscription-box",
    title: "Subscription Box",
    heroImage: serviceImages.becomeVolunteer,
    heroTitle: "THE DUMUZI SUBSCRIPTION — LUXURY DELIVERED MONTHLY",
    intro: {
      heading: "DUMUZI SUBSCRIPTION BOX",
      subheading: "A curated selection of new and exclusive chocolates delivered to your door.",
      description: [
        "Our subscription boxes are designed for true chocolate lovers who want to explore the full breadth of DUMUZI's craft. Each box features a curated mix of new releases, seasonal specials, and exclusive members-only creations.",
        "Subscribers receive first access to new collections, invitations to online tasting events, and a personal tasting notes card with each delivery.",
      ],
    },
    whyChooseUs: {
      title: "Subscription Benefits",
      items: [
        {
          title: "Exclusive member access",
          description:
            "Subscribers receive new collections before they go on sale to the public.",
        },
        {
          title: "Tasting notes included",
          description:
            "Every box comes with a printed card explaining the origin, flavour profile, and pairing suggestions for each piece.",
        },
        {
          title: "Flexible plans",
          description:
            "Choose monthly or quarterly delivery. Pause or cancel any time with no penalties.",
        },
      ],
    },
    signatureServices: {
      title: "Subscription Plans",
      items: [
        {
          title: "The Connoisseur (Monthly)",
          description:
            "12 pieces per month — a rotating mix of truffles, pralines, and a mini single-origin bar.",
        },
        {
          title: "The Explorer (Quarterly)",
          description:
            "24 pieces per quarter — our widest assortment including seasonal specials and one exclusive.",
        },
        {
          title: "The Dark Devotee",
          description:
            "A dark-chocolate-only monthly box featuring three single-origin bars and 6 dark truffles.",
        },
        {
          title: "The Gift Subscription",
          description:
            "Purchase a 3, 6, or 12-month subscription as a gift. A beautiful gift card is emailed on your chosen date.",
        },
      ],
    },
    process: {
      title: "How the Subscription Works",
      description: "",
      steps: [
        {
          title: "1. Choose your plan",
          description:
            "Select your preferred subscription type and delivery frequency on our website.",
        },
        {
          title: "2. We curate your box",
          description:
            "Each month, our head chocolatier selects a unique assortment tailored to your plan.",
        },
        {
          title: "3. Fresh production",
          description:
            "Your chocolates are produced fresh the week before your delivery date.",
        },
        {
          title: "4. Delivered & enjoyed",
          description:
            "Your box arrives in temperature-controlled packaging with a tasting notes card inside.",
        },
      ],
    },
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },

  {
    id: "bespoke-orders",
    title: "Bespoke Orders",
    heroImage: serviceImages.joinDonor,
    heroTitle: "BESPOKE CHOCOLATE COMMISSIONS — YOUR VISION, OUR CRAFT",
    intro: {
      heading: "BESPOKE CHOCOLATE ORDERS",
      subheading: "Fully custom chocolate creations for extraordinary occasions.",
      description: [
        "Some moments call for something truly one-of-a-kind. Our bespoke order service allows you to commission completely custom chocolates — from unique flavour infusions to hand-painted artistic bars and sculpted chocolate centrepieces.",
        "We have crafted bespoke collections for luxury hotels, Michelin-starred restaurants, fashion houses, and private celebrations. Tell us your vision and we will bring it to life.",
      ],
    },
    whyChooseUs: {
      title: "What Bespoke Can Mean",
      items: [
        {
          title: "Custom flavour creation",
          description:
            "Our chocolatiers will develop a completely original ganache or praline flavour based on your brief.",
        },
        {
          title: "Hand-painted bars",
          description:
            "Artistic chocolate bars painted by hand with edible cocoa butter colours — each one unique.",
        },
        {
          title: "Sculpted centrepieces",
          description:
            "Large-format chocolate sculptures for event centrepieces, made to order and shipped in bespoke crating.",
        },
      ],
    },
    signatureServices: {
      title: "Bespoke Services",
      items: [
        {
          title: "Flavour Commission",
          description:
            "Brief us on a taste, a memory, or an ingredient, and our head chocolatier will create an original ganache for you.",
        },
        {
          title: "Hand-Painted Bar Collection",
          description:
            "A set of 6 or 12 single-origin dark chocolate bars individually painted with edible cocoa butter artwork.",
        },
        {
          title: "Chocolate Sculpture",
          description:
            "A bespoke sculpted chocolate centrepiece — animals, logos, letters, or abstract forms.",
        },
        {
          title: "Venue & Restaurant Programmes",
          description:
            "Regular bespoke supply for hotels, restaurants, and luxury venues with their own branded chocolate selection.",
        },
      ],
    },
    process: {
      title: "The Bespoke Journey",
      description: "",
      steps: [
        {
          title: "1. Share your brief",
          description:
            "Email us with your vision, occasion, quantity, timeline, and any inspiration images.",
        },
        {
          title: "2. Consultation call",
          description:
            "Our head chocolatier will speak with you directly to explore the brief and suggest options.",
        },
        {
          title: "3. Sample production",
          description:
            "We produce a small sample batch for your approval before the full order begins.",
        },
        {
          title: "4. Full production & delivery",
          description:
            "Once approved, your bespoke order is produced and delivered with white-glove packaging.",
        },
      ],
    },
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },

  {
    id: "launch-scholarship",
    title: "Chocolate Masterclass",
    heroImage: serviceImages.launchScholarship,
    heroTitle: "DUMUZI MASTERCLASSES — LEARN THE ART OF FINE CHOCOLATE",
    intro: {
      heading: "Chocolate Masterclasses",
      subheading: "Hands-on sessions with our master chocolatiers.",
      description: [
        "Our chocolate masterclasses are intimate, hands-on sessions in our artisan atelier. You will learn the science of tempering, the art of truffle-making, and the subtleties of single-origin tasting — guided by our experienced chocolatiers.",
        "Classes are available for individuals, couples, corporate team-building, and private groups. Gift vouchers are available year-round.",
      ],
    },
    whyChooseUs: {
      title: "What You Will Learn",
      items: [
        {
          title: "Tempering from scratch",
          description:
            "The science and technique of tempering chocolate to a perfect Form V crystal structure.",
        },
        {
          title: "Truffle making",
          description:
            "How to make a ganache, hand-roll truffles, and finish them like a professional chocolatier.",
        },
        {
          title: "Single-origin tasting",
          description:
            "A guided tasting of three single-origin dark chocolates — learning to identify terroir, processing, and roasting notes.",
        },
        {
          title: "Take-home box",
          description:
            "Every participant takes home a box of the chocolates they made during the session.",
        },
      ],
    },
    signatureServices: {
      title: "Masterclass Formats",
      items: [
        {
          title: "Introduction to Chocolate (2 hrs)",
          description:
            "Perfect for beginners. Covers single-origin tasting, basic tempering, and truffle rolling.",
        },
        {
          title: "Advanced Praline Class (4 hrs)",
          description:
            "For those with some experience. Learn shell moulding, ganache infusions, and praline production.",
        },
        {
          title: "Corporate Team Event",
          description:
            "A private masterclass for teams of 8–20 people. Custom content available.",
        },
        {
          title: "Private Couple's Session",
          description:
            "An intimate two-hour session for couples — a unique date night in our atelier.",
        },
      ],
    },
    process: {
      title: "How to Book",
      description: "",
      steps: [
        {
          title: "1. Choose your session",
          description:
            "Select a masterclass format and check availability on our website.",
        },
        {
          title: "2. Book & pay",
          description:
            "Secure your place with full payment. Gift vouchers can be emailed immediately.",
        },
        {
          title: "3. Attend",
          description:
            "Arrive at our atelier. All equipment and ingredients are provided.",
        },
        {
          title: "4. Take your creations home",
          description:
            "Leave with a box of your handmade chocolates and a DUMUZI recipe booklet.",
        },
      ],
    },
    portfolioImages: [
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
      "/images/assets/dark_chocolates_hero.png",
    ],
  },
];
