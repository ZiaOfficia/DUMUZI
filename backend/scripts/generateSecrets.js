/**
 * ═══════════════════════════════════════════════════════
 *  DUMUZI — Secret Generator
 *  Run this ONCE to generate your JWT_SECRET and ADMIN_PASSWORD_HASH
 *
 *  Usage:
 *    node scripts/generateSecrets.js
 *
 *  Then copy the output values into your .env file
 * ═══════════════════════════════════════════════════════
 */

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const readline = require("readline");

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout,
});

rl.question("\n🔑 Enter your desired ADMIN PASSWORD: ", async (password) => {
  rl.close();

  if (!password || password.length < 8) {
    console.error("\n❌ Password must be at least 8 characters.\n");
    process.exit(1);
  }

  console.log("\n⏳ Generating secrets...\n");

  // 1. JWT Secret — 64 random bytes = 128 hex chars (very strong)
  const jwtSecret = crypto.randomBytes(64).toString("hex");

  // 2. Admin password hash
  const adminHash = await bcrypt.hash(password, 12);

  console.log("═".repeat(60));
  console.log("✅  COPY THESE VALUES INTO YOUR .env FILE");
  console.log("═".repeat(60));
  console.log("");
  console.log(`JWT_SECRET=${jwtSecret}`);
  console.log("");
  console.log(`ADMIN_USERNAME=admin`);
  console.log(`ADMIN_PASSWORD_HASH=${adminHash}`);
  console.log("");
  console.log("═".repeat(60));
  console.log("⚠️  Keep these values SECRET. Never commit .env to Git.");
  console.log("═".repeat(60));
  console.log("");
});
