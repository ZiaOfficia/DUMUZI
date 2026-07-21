-- Updates for the 2026-07-21 price changes + BONBON -> BN rename.
-- Run the ALTER TYPE first, then the UPDATEs. Safe to re-run (idempotent).

-- 1) Rename the category enum value (metadata-only, relabels existing rows instantly)
ALTER TYPE "enum_Products_category" RENAME VALUE 'BONBON' TO 'BN';

-- 2) Update existing rows' description/mrp
UPDATE "Products" SET                                          mrp = 325 WHERE "productName" = 'LF-D9';
UPDATE "Products" SET                                          mrp = 499 WHERE "productName" = 'LF-D15';
UPDATE "Products" SET                                          mrp = 425 WHERE "productName" = 'LF-D15T';
UPDATE "Products" SET                                          mrp = 575 WHERE "productName" = 'LF-D18T';
UPDATE "Products" SET                                          mrp = 640 WHERE "productName" = 'LF-D25B';
UPDATE "Products" SET description = 'BN 9 CAVITY',             mrp = 549 WHERE "productName" = 'LF-BN9';
UPDATE "Products" SET description = 'BN 9 CAVITY TRIOS'                 WHERE "productName" = 'LF-BN9T';

-- Verify:
SELECT "productName", description, mrp, category FROM "Products" ORDER BY id;
