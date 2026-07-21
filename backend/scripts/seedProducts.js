/**
 * Seed Products table from the 27 DUMUZI products.
 * Run once: node scripts/seedProducts.js
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const sequelize = require("../config/db");
const Product   = require("../models/Product");

const products = [
  // ── HEART SERIES ──────────────────────────────────────────────────────────
  { id: 1,  brandName:"DUMUZI", productName:"LF-H9",   image:"/images/products/DUMUZI.jpeg",      description:"HEART 9 CAVITY BROWN",            mrp:260,  category:"HEART"   },
  { id: 2,  brandName:"DUMUZI", productName:"LF-H3",   image:"/images/products/LF-H3.jpeg",       description:"HEART 3 CAVITY BROWN",            mrp:99,   category:"HEART"   },
  { id: 3,  brandName:"DUMUZI", productName:"LF-H3T",  image:"/images/products/LF - H3T.jpeg",    description:"HEART 3 CAVITY TRIOS",            mrp:110,  category:"HEART"   },
  { id: 4,  brandName:"DUMUZI", productName:"LF-H4P",  image:"/images/products/LF-H4P.jpeg",      description:"HEART 4 CAVITY",                  mrp:140,  category:"HEART"   },
  { id: 5,  brandName:"DUMUZI", productName:"LF-H5",   image:"/images/products/LF - H5.jpeg",     description:"HEART 5 CAVITY",                  mrp:160,  category:"HEART"   },
  { id: 6,  brandName:"DUMUZI", productName:"LF-H5P",  image:"/images/products/LF-H5P.jpeg",      description:"HEART 5 CAVITY PLATINUM",         mrp:185,  category:"HEART"   },
  { id: 7,  brandName:"DUMUZI", productName:"LF-H7P",  image:"/images/products/LF-H7P.jpeg",      description:"HEART 7 CAVITY PLATINUM",         mrp:249,  category:"HEART"   },
  { id: 8,  brandName:"DUMUZI", productName:"LF-H8B",  image:"/images/products/LF-H8B.jpeg",      description:"HEART 8 CAVITY BROWN",            mrp:230,  category:"HEART"   },
  { id: 9,  brandName:"DUMUZI", productName:"LF-H9P",  image:"/images/products/LF-H9P .jpeg",     description:"HEART 9 CAVITY POLYCARBONATE",    mrp:325,  category:"HEART"   },
  { id: 10, brandName:"DUMUZI", productName:"LF-H12B", image:"/images/products/LF-H12B.jpeg",     description:"HEART 12 CAVITY BROWN",           mrp:325,  category:"HEART"   },
  { id: 11, brandName:"DUMUZI", productName:"LF-H12P", image:"/images/products/LF-H12P.jpeg",     description:"HEART 12 CAVITY POLYCARBONATE",   mrp:375,  category:"HEART"   },
  { id: 12, brandName:"DUMUZI", productName:"LF-H12T", image:"/images/products/LF-H12T.jpeg",     description:"HEART 12 CAVITY TRIOS",           mrp:399,  category:"HEART"   },
  { id: 13, brandName:"DUMUZI", productName:"LF-H18B", image:"/images/products/LF-H18B.jpeg",     description:"HEART 18 CAVITY BROWN",           mrp:525,  category:"HEART"   },
  { id: 14, brandName:"DUMUZI", productName:"LF-H18D", image:"/images/products/LF-H18D.jpeg",     description:"HEART 18 CAVITY",                 mrp:575,  category:"HEART"   },
  // ── DIAMOND SERIES ────────────────────────────────────────────────────────
  { id: 15, brandName:"DUMUZI", productName:"LF-D6",   image:"/images/products/LF-D6.jpeg",       description:"DIAMOND 6 CAVITY",                mrp:199,  category:"DIAMOND" },
  { id: 16, brandName:"DUMUZI", productName:"LF-D9",   image:"/images/products/LF-D9.jpeg",       description:"DIAMOND 9 CAVITY",                mrp:260,  category:"DIAMOND" },
  { id: 17, brandName:"DUMUZI", productName:"LF-D12B", image:"/images/products/LF-D12B.jpeg",     description:"DIAMOND 12 CAVITY BROWN",         mrp:325,  category:"DIAMOND" },
  { id: 18, brandName:"DUMUZI", productName:"LF-D12",  image:"/images/products/LF-D12.jpeg",      description:"DIAMOND 12 CAVITY",               mrp:375,  category:"DIAMOND" },
  { id: 19, brandName:"DUMUZI", productName:"LF-D15",  image:"/images/products/LF-D15.jpeg",      description:"DIAMOND 15 CAVITY",               mrp:499,  category:"DIAMOND" },
  { id: 20, brandName:"DUMUZI", productName:"LF-D15T", image:"/images/products/LF-D15T.jpeg",     description:"DIAMOND 15 CAVITY TRIOS",         mrp:425,  category:"DIAMOND" },
  { id: 21, brandName:"DUMUZI", productName:"LF-D18T", image:"/images/products/LF-D18T.jpeg",     description:"DIAMOND 18 CAVITY TRIOS",         mrp:575,  category:"DIAMOND" },
  { id: 22, brandName:"DUMUZI", productName:"LF-D25B", image:"/images/products/LF-D25B.jpeg",     description:"DIAMOND 25 CAVITY BROWN",         mrp:640,  category:"DIAMOND" },
  { id: 23, brandName:"DUMUZI", productName:"LF-D25",  image:"/images/products/LF-D25.jpeg",      description:"DIAMOND 25 CAVITY",               mrp:699,  category:"DIAMOND" },
  { id: 24, brandName:"DUMUZI", productName:"LF-D25T", image:"/images/products/LF-D25T.jpeg",     description:"DIAMOND 25 CAVITY TRIOS",         mrp:749,  category:"DIAMOND" },
  // ── BN SERIES ──────────────────────────────────────────────────────────────
  { id: 25, brandName:"DUMUZI", productName:"LF-BN9",  image:"/images/products/LF- BN9.jpeg",     description:"BN 9 CAVITY",                     mrp:525,  category:"BN"      },
  { id: 26, brandName:"DUMUZI", productName:"LF-BN9T", image:"/images/products/LF-BN9T.jpeg",     description:"BN 9 CAVITY TRIOS",               mrp:549,  category:"BN"      },
  // ── OVAL SERIES ───────────────────────────────────────────────────────────
  { id: 27, brandName:"DUMUZI", productName:"LF-O9",   image:"/images/products/LF-O9.jpeg",       description:"OVAL 9 CAVITY",                   mrp:260,  category:"OVAL"    },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✓ DB connected");

    // Sync only Products table (no alter on others)
    await Product.sync({ force: false });
    console.log("✓ Products table synced");

    let inserted = 0;
    for (const p of products) {
      const [, created] = await Product.findOrCreate({
        where: { productName: p.productName },
        defaults: p,
      });
      if (created) inserted++;
    }

    console.log(`✅ Seed complete — ${inserted} new products inserted (${products.length - inserted} already existed)`);
  } catch (err) {
    console.error("Seed error:", err.message);
  } finally {
    await sequelize.close();
  }
}

seed();
