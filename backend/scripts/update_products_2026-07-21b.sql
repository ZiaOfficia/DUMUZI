-- Price-only updates, 2026-07-21 (second batch).
UPDATE "Products" SET mrp = 575 WHERE "productName" = 'LF-H18D';
UPDATE "Products" SET mrp = 260 WHERE "productName" = 'LF-D9';
UPDATE "Products" SET mrp = 525 WHERE "productName" = 'LF-BN9';
UPDATE "Products" SET mrp = 549 WHERE "productName" = 'LF-BN9T';

-- Verify:
SELECT "productName", description, mrp, category FROM "Products" ORDER BY id;
