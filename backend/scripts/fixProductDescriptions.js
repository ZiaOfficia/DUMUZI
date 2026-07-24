/**
 * One-off fix: update descriptions for products already seeded with the
 * old "POLYCARBONATE" wording to "PLATINUM".
 * Run once: node scripts/fixProductDescriptions.js
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const sequelize = require("../config/db");
const Product   = require("../models/Product");

const fixes = [
  { productName: "LF-H9P",  description: "HEART 9 CAVITY PLATINUM" },
  { productName: "LF-H12P", description: "HEART 12 CAVITY PLATINUM" },
];

async function run() {
  try {
    await sequelize.authenticate();
    console.log("✓ DB connected");

    for (const { productName, description } of fixes) {
      const [count] = await Product.update(
        { description },
        { where: { productName } }
      );
      console.log(`${productName}: ${count} row(s) updated`);
    }
  } catch (err) {
    console.error("Fix error:", err.message);
  } finally {
    await sequelize.close();
  }
}

run();
