export type Product = {
  id: number;
  brandName: string;
  productName: string;
  image: string;
  description: string;
  mrp: number;
};

// Multi-box listings carry their box count in productName ("LF-H3 x10") and in
// the description, since the code alone is what lands on the order line.
// Keep in step with backend/scripts/update_products_2026-10-09.sql.
export const products: Product[] = [
  // ── HEART SERIES ──────────────────────────────────────────────────────────
  {
    id: 1,
    brandName: "DUMUZI",
    productName: "LF-H9 x2",
    image: "/images/products/packs/LF-H9.webp",
    description: "HEART 9 CAVITY BROWN · PACK OF 2",
    mrp: 520,
  },
  {
    id: 2,
    brandName: "DUMUZI",
    productName: "LF-H3 x10",
    image: "/images/products/packs/LF-H3.webp",
    description: "HEART 3 CAVITY BROWN · BUTTERSCOTCH · PACK OF 10",
    mrp: 990,
  },
  {
    id: 3,
    brandName: "DUMUZI",
    productName: "LF-H3T x10",
    image: "/images/products/packs/LF-H3T.webp",
    description: "HEART 3 CAVITY TRIOS · PACK OF 10",
    mrp: 1110,
  },
  {
    id: 4,
    brandName: "DUMUZI",
    productName: "LF-H4P x10",
    image: "/images/products/packs/LF-H4P.webp",
    description: "HEART 4 CAVITY PLATINUM · PACK OF 10",
    mrp: 1400,
  },
  {
    id: 5,
    brandName: "DUMUZI",
    productName: "LF-H5B x5",
    image: "/images/products/packs/LF-H5B.webp",
    description: "HEART 5 CAVITY BROWN · PACK OF 5",
    mrp: 800,
  },
  {
    id: 6,
    brandName: "DUMUZI",
    productName: "LF-H5P x5",
    image: "/images/products/packs/LF-H5P.webp",
    description: "HEART 5 CAVITY PLATINUM · ALMOND & RAISIN · PACK OF 5",
    mrp: 925,
  },
  {
    id: 7,
    brandName: "DUMUZI",
    productName: "LF-H7P x3",
    image: "/images/products/packs/LF-H7P.webp",
    description: "HEART 7 CAVITY PLATINUM · PACK OF 3",
    mrp: 747,
  },
  {
    id: 8,
    brandName: "DUMUZI",
    productName: "LF-H8B x4",
    image: "/images/products/packs/LF-H8B.webp",
    description: "HEART 8 CAVITY BROWN · PACK OF 4",
    mrp: 920,
  },
  {
    id: 9,
    brandName: "DUMUZI",
    productName: "LF-H9P x2",
    image: "/images/products/packs/LF-H9P.webp",
    description: "HEART 9 CAVITY PLATINUM · PACK OF 2",
    mrp: 650,
  },
  {
    id: 10,
    brandName: "DUMUZI",
    productName: "LF-H12B x2",
    image: "/images/products/packs/LF-H12B.webp",
    description: "HEART 12 CAVITY BROWN · PACK OF 2",
    mrp: 650,
  },
  {
    id: 11,
    brandName: "DUMUZI",
    productName: "LF-H12P x2",
    image: "/images/products/packs/LF-H12P.webp",
    description: "HEART 12 CAVITY PLATINUM · PACK OF 2",
    mrp: 750,
  },
  {
    id: 12,
    brandName: "DUMUZI",
    productName: "LF-H12T x2",
    image: "/images/products/packs/LF-H12T.webp",
    description: "HEART 12 CAVITY TRIOS · PACK OF 2",
    mrp: 798,
  },
  {
    id: 13,
    brandName: "DUMUZI",
    productName: "LF-H18B",
    image: "/images/products/packs/LF-H18B.webp",
    description: "HEART 18 CAVITY BROWN · BUTTERSCOTCH",
    mrp: 525,
  },
  {
    id: 14,
    brandName: "DUMUZI",
    productName: "LF-H18D",
    image: "/images/products/packs/LF-H18D.webp",
    description: "HEART 18 CAVITY · ALMOND & RAISIN / CRANBERRIES",
    mrp: 575,
  },


  // ── DIAMOND SERIES ────────────────────────────────────────────────────────
  {
    id: 15,
    brandName: "DUMUZI",
    productName: "LF-D6 x4",
    image: "/images/products/packs/LF-D6.webp",
    description: "DIAMOND 6 CAVITY · ALMOND & RAISIN · PACK OF 4",
    mrp: 796,
  },
  {
    id: 16,
    brandName: "DUMUZI",
    productName: "LF-D9 x2",
    image: "/images/products/packs/LF-D9.webp",
    description: "DIAMOND 9 CAVITY · PACK OF 2",
    mrp: 520,
  },
  {
    id: 17,
    brandName: "DUMUZI",
    productName: "LF-D12B x2",
    image: "/images/products/packs/LF-D12B.webp",
    description: "DIAMOND 12 CAVITY BROWN · BUTTERSCOTCH · PACK OF 2",
    mrp: 650,
  },
  {
    id: 18,
    brandName: "DUMUZI",
    productName: "LF-D12 x2",
    image: "/images/products/packs/LF-D12.webp",
    description: "DIAMOND 12 CAVITY · PACK OF 2",
    mrp: 750,
  },
  {
    id: 19,
    brandName: "DUMUZI",
    productName: "LF-D15",
    image: "/images/products/packs/LF-D15.webp",
    description: "DIAMOND 15 CAVITY · ALMOND & RAISIN",
    mrp: 499,
  },
  {
    id: 20,
    brandName: "DUMUZI",
    productName: "LF-D15T",
    image: "/images/products/packs/LF-D15T.webp",
    description: "DIAMOND 15 CAVITY TRIOS · ALMOND & RAISIN / CRANBERRIES",
    mrp: 525,
  },
  {
    id: 21,
    brandName: "DUMUZI",
    productName: "LF-D18",
    image: "/images/products/packs/LF-D18.webp",
    description: "DIAMOND 18 CAVITY TRIOS",
    mrp: 575,
  },
  {
    id: 22,
    brandName: "DUMUZI",
    productName: "LF-D25B",
    image: "/images/products/packs/LF-D25B.webp",
    description: "DIAMOND 25 CAVITY BROWN · ALMOND & RAISIN",
    mrp: 640,
  },
  {
    id: 23,
    brandName: "DUMUZI",
    productName: "LF-D25",
    image: "/images/products/packs/LF-D25.webp",
    description: "DIAMOND 25 CAVITY · ALMOND & RAISIN",
    mrp: 699,
  },
  {
    id: 24,
    brandName: "DUMUZI",
    productName: "LF-D25T",
    image: "/images/products/packs/LF-D25T.webp",
    description: "DIAMOND 25 CAVITY TRIOS",
    mrp: 749,
  },


  // ── BN SERIES ─────────────────────────────────────────────────────────────
  {
    id: 25,
    brandName: "DUMUZI",
    productName: "LF-BN9",
    image: "/images/products/packs/LF-BN9.webp",
    description: "BN 9 CAVITY · ALMOND & RAISIN",
    mrp: 499,
  },
  {
    id: 26,
    brandName: "DUMUZI",
    productName: "LF-BN9T",
    image: "/images/products/packs/LF-BN9T.webp",
    description: "BN 9 CAVITY TRIOS · ALMOND & RAISIN",
    mrp: 525,
  },


  // ── OVAL SERIES ───────────────────────────────────────────────────────────
  {
    id: 27,
    brandName: "DUMUZI",
    productName: "LF-O9 x2",
    image: "/images/products/packs/LF-O9.webp",
    description: "OVAL 9 CAVITY · PACK OF 2",
    mrp: 650,
  },


  // ── COMBO PACKS ───────────────────────────────────────────────────────────
  {
    id: 28,
    brandName: "DUMUZI",
    productName: "LF-D15+LF-D9",
    image: "/images/products/combo/LF-D15_LF-D9.webp",
    description: "COMBO · DIAMOND 15 CAVITY + DIAMOND 9 CAVITY",
    mrp: 759,
  },
  {
    id: 29,
    brandName: "DUMUZI",
    productName: "LF-D15+LF-H12T",
    image: "/images/products/combo/LF-D15_LF-H12T.webp",
    description: "COMBO · DIAMOND 15 CAVITY + HEART 12 CAVITY TRIOS",
    mrp: 898,
  },
  {
    id: 30,
    brandName: "DUMUZI",
    productName: "LF-D15T+LF-D9",
    image: "/images/products/combo/LF-D15T_LF-D9.webp",
    description: "COMBO · DIAMOND 15 CAVITY TRIOS + DIAMOND 9 CAVITY",
    mrp: 785,
  },
  {
    id: 31,
    brandName: "DUMUZI",
    productName: "LF-D25+LF-D9",
    image: "/images/products/combo/LF-D25_LF-D9.webp",
    description: "COMBO · DIAMOND 25 CAVITY + DIAMOND 9 CAVITY",
    mrp: 959,
  },
  {
    id: 32,
    brandName: "DUMUZI",
    productName: "LF-D25T+LF-H5P",
    image: "/images/products/combo/LF-D25T_LF-H5P.webp",
    description: "COMBO · DIAMOND 25 CAVITY TRIOS + HEART 5 CAVITY PLATINUM",
    mrp: 934,
  },
];
