-- 2026-10-09 catalogue refresh: new product photography, multi-box packs and
-- five two-box combos. Mirrors frontend/src/data/productsData.ts exactly.
-- Run in the Neon SQL editor. Run step 1 ON ITS OWN first (Postgres won't use a
-- new enum value in the same transaction that added it), then steps 2-3.
-- Safe to re-run.

-- 1) New category for the combo packs
ALTER TYPE "enum_Products_category" ADD VALUE IF NOT EXISTS 'COMBO';

-- 2) Refresh the 27 existing products (ids 1-27 unchanged, so carts keep working)
BEGIN;
UPDATE "Products" SET "productName" = 'LF-H9 x2', image = '/images/products/packs/LF-H9.webp', description = 'HEART 9 CAVITY BROWN · PACK OF 2', mrp = 520, "updatedAt" = NOW() WHERE id = 1;
UPDATE "Products" SET "productName" = 'LF-H3 x10', image = '/images/products/packs/LF-H3.webp', description = 'HEART 3 CAVITY BROWN · BUTTERSCOTCH · PACK OF 10', mrp = 990, "updatedAt" = NOW() WHERE id = 2;
UPDATE "Products" SET "productName" = 'LF-H3T x10', image = '/images/products/packs/LF-H3T.webp', description = 'HEART 3 CAVITY TRIOS · PACK OF 10', mrp = 1110, "updatedAt" = NOW() WHERE id = 3;
UPDATE "Products" SET "productName" = 'LF-H4P x10', image = '/images/products/packs/LF-H4P.webp', description = 'HEART 4 CAVITY PLATINUM · PACK OF 10', mrp = 1400, "updatedAt" = NOW() WHERE id = 4;
UPDATE "Products" SET "productName" = 'LF-H5B x5', image = '/images/products/packs/LF-H5B.webp', description = 'HEART 5 CAVITY BROWN · PACK OF 5', mrp = 800, "updatedAt" = NOW() WHERE id = 5;
UPDATE "Products" SET "productName" = 'LF-H5P x5', image = '/images/products/packs/LF-H5P.webp', description = 'HEART 5 CAVITY PLATINUM · ALMOND & RAISIN · PACK OF 5', mrp = 925, "updatedAt" = NOW() WHERE id = 6;
UPDATE "Products" SET "productName" = 'LF-H7P x3', image = '/images/products/packs/LF-H7P.webp', description = 'HEART 7 CAVITY PLATINUM · PACK OF 3', mrp = 747, "updatedAt" = NOW() WHERE id = 7;
UPDATE "Products" SET "productName" = 'LF-H8B x4', image = '/images/products/packs/LF-H8B.webp', description = 'HEART 8 CAVITY BROWN · PACK OF 4', mrp = 920, "updatedAt" = NOW() WHERE id = 8;
UPDATE "Products" SET "productName" = 'LF-H9P x2', image = '/images/products/packs/LF-H9P.webp', description = 'HEART 9 CAVITY PLATINUM · PACK OF 2', mrp = 650, "updatedAt" = NOW() WHERE id = 9;
UPDATE "Products" SET "productName" = 'LF-H12B x2', image = '/images/products/packs/LF-H12B.webp', description = 'HEART 12 CAVITY BROWN · PACK OF 2', mrp = 650, "updatedAt" = NOW() WHERE id = 10;
UPDATE "Products" SET "productName" = 'LF-H12P x2', image = '/images/products/packs/LF-H12P.webp', description = 'HEART 12 CAVITY PLATINUM · PACK OF 2', mrp = 750, "updatedAt" = NOW() WHERE id = 11;
UPDATE "Products" SET "productName" = 'LF-H12T x2', image = '/images/products/packs/LF-H12T.webp', description = 'HEART 12 CAVITY TRIOS · PACK OF 2', mrp = 798, "updatedAt" = NOW() WHERE id = 12;
UPDATE "Products" SET "productName" = 'LF-H18B', image = '/images/products/packs/LF-H18B.webp', description = 'HEART 18 CAVITY BROWN · BUTTERSCOTCH', mrp = 525, "updatedAt" = NOW() WHERE id = 13;
UPDATE "Products" SET "productName" = 'LF-H18D', image = '/images/products/packs/LF-H18D.webp', description = 'HEART 18 CAVITY · ALMOND & RAISIN / CRANBERRIES', mrp = 575, "updatedAt" = NOW() WHERE id = 14;
UPDATE "Products" SET "productName" = 'LF-D6 x4', image = '/images/products/packs/LF-D6.webp', description = 'DIAMOND 6 CAVITY · ALMOND & RAISIN · PACK OF 4', mrp = 796, "updatedAt" = NOW() WHERE id = 15;
UPDATE "Products" SET "productName" = 'LF-D9 x2', image = '/images/products/packs/LF-D9.webp', description = 'DIAMOND 9 CAVITY · PACK OF 2', mrp = 520, "updatedAt" = NOW() WHERE id = 16;
UPDATE "Products" SET "productName" = 'LF-D12B x2', image = '/images/products/packs/LF-D12B.webp', description = 'DIAMOND 12 CAVITY BROWN · BUTTERSCOTCH · PACK OF 2', mrp = 650, "updatedAt" = NOW() WHERE id = 17;
UPDATE "Products" SET "productName" = 'LF-D12 x2', image = '/images/products/packs/LF-D12.webp', description = 'DIAMOND 12 CAVITY · PACK OF 2', mrp = 750, "updatedAt" = NOW() WHERE id = 18;
UPDATE "Products" SET "productName" = 'LF-D15', image = '/images/products/packs/LF-D15.webp', description = 'DIAMOND 15 CAVITY · ALMOND & RAISIN', mrp = 499, "updatedAt" = NOW() WHERE id = 19;
UPDATE "Products" SET "productName" = 'LF-D15T', image = '/images/products/packs/LF-D15T.webp', description = 'DIAMOND 15 CAVITY TRIOS · ALMOND & RAISIN / CRANBERRIES', mrp = 525, "updatedAt" = NOW() WHERE id = 20;
UPDATE "Products" SET "productName" = 'LF-D18', image = '/images/products/packs/LF-D18.webp', description = 'DIAMOND 18 CAVITY TRIOS', mrp = 575, "updatedAt" = NOW() WHERE id = 21;
UPDATE "Products" SET "productName" = 'LF-D25B', image = '/images/products/packs/LF-D25B.webp', description = 'DIAMOND 25 CAVITY BROWN · ALMOND & RAISIN', mrp = 640, "updatedAt" = NOW() WHERE id = 22;
UPDATE "Products" SET "productName" = 'LF-D25', image = '/images/products/packs/LF-D25.webp', description = 'DIAMOND 25 CAVITY · ALMOND & RAISIN', mrp = 699, "updatedAt" = NOW() WHERE id = 23;
UPDATE "Products" SET "productName" = 'LF-D25T', image = '/images/products/packs/LF-D25T.webp', description = 'DIAMOND 25 CAVITY TRIOS', mrp = 749, "updatedAt" = NOW() WHERE id = 24;
UPDATE "Products" SET "productName" = 'LF-BN9', image = '/images/products/packs/LF-BN9.webp', description = 'BN 9 CAVITY · ALMOND & RAISIN', mrp = 499, "updatedAt" = NOW() WHERE id = 25;
UPDATE "Products" SET "productName" = 'LF-BN9T', image = '/images/products/packs/LF-BN9T.webp', description = 'BN 9 CAVITY TRIOS · ALMOND & RAISIN', mrp = 525, "updatedAt" = NOW() WHERE id = 26;
UPDATE "Products" SET "productName" = 'LF-O9 x2', image = '/images/products/packs/LF-O9.webp', description = 'OVAL 9 CAVITY · PACK OF 2', mrp = 650, "updatedAt" = NOW() WHERE id = 27;

-- 3) Add the combo packs with fixed ids the frontend already knows
INSERT INTO "Products" (id, "brandName", "productName", image, description, mrp, category, "inStock", "createdAt", "updatedAt") VALUES
  (28, 'DUMUZI', 'LF-D15+LF-D9', '/images/products/combo/LF-D15_LF-D9.webp', 'COMBO · DIAMOND 15 CAVITY + DIAMOND 9 CAVITY', 759, 'COMBO', true, NOW(), NOW()),
  (29, 'DUMUZI', 'LF-D15+LF-H12T', '/images/products/combo/LF-D15_LF-H12T.webp', 'COMBO · DIAMOND 15 CAVITY + HEART 12 CAVITY TRIOS', 898, 'COMBO', true, NOW(), NOW()),
  (30, 'DUMUZI', 'LF-D15T+LF-D9', '/images/products/combo/LF-D15T_LF-D9.webp', 'COMBO · DIAMOND 15 CAVITY TRIOS + DIAMOND 9 CAVITY', 785, 'COMBO', true, NOW(), NOW()),
  (31, 'DUMUZI', 'LF-D25+LF-D9', '/images/products/combo/LF-D25_LF-D9.webp', 'COMBO · DIAMOND 25 CAVITY + DIAMOND 9 CAVITY', 959, 'COMBO', true, NOW(), NOW()),
  (32, 'DUMUZI', 'LF-D25T+LF-H5P', '/images/products/combo/LF-D25T_LF-H5P.webp', 'COMBO · DIAMOND 25 CAVITY TRIOS + HEART 5 CAVITY PLATINUM', 934, 'COMBO', true, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET "productName" = EXCLUDED."productName", image = EXCLUDED.image,
  description = EXCLUDED.description, mrp = EXCLUDED.mrp, category = EXCLUDED.category, "updatedAt" = NOW();

-- Keep the id sequence ahead of the rows inserted by hand
SELECT setval(pg_get_serial_sequence('"Products"', 'id'), (SELECT MAX(id) FROM "Products"));
COMMIT;

-- Verify (expect 32 rows):
SELECT id, "productName", description, mrp, category FROM "Products" ORDER BY id;
