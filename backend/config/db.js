const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

let sequelize;

// ── Render PostgreSQL (DATABASE_URL provided by Render) ──────────────────────
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // required for Render's self-signed cert
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  // ── Local development fallback (MySQL / individual env vars) ───────────────
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: "mysql",
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      dialectOptions: {
        connectTimeout: 60000,
        ...(process.env.DB_SSL === "true" && {
          ssl: { require: true, rejectUnauthorized: false },
        }),
      },
    }
  );
}

module.exports = sequelize;
