-- Updates existing Products rows to match the 2026-07-20 rename/price changes.
-- Matched by productName (unique key). Safe to re-run (idempotent).

UPDATE "Products" SET description = 'HEART 9 SIGNATURE',           mrp = 260 WHERE "productName" = 'LF-H9';
UPDATE "Products" SET description = 'HEART 5 CAVITY PLATINUM',     mrp = 185 WHERE "productName" = 'LF-H5P';
UPDATE "Products" SET description = 'HEART 7 CAVITY PLATINUM',     mrp = 249 WHERE "productName" = 'LF-H7P';
UPDATE "Products" SET                                              mrp = 230 WHERE "productName" = 'LF-H8B';
UPDATE "Products" SET                                              mrp = 325 WHERE "productName" = 'LF-H9P';
UPDATE "Products" SET                                              mrp = 325 WHERE "productName" = 'LF-H12B';
UPDATE "Products" SET                                              mrp = 375 WHERE "productName" = 'LF-H12P';
UPDATE "Products" SET                                              mrp = 525 WHERE "productName" = 'LF-H18B';
UPDATE "Products" SET description = 'HEART 18 CAVITY',             mrp = 549 WHERE "productName" = 'LF-H18D';

UPDATE "Products" SET description = 'DIAMOND 6 CAVITY',            mrp = 199 WHERE "productName" = 'LF-D6';
UPDATE "Products" SET description = 'DIAMOND 9 CAVITY',            mrp = 260 WHERE "productName" = 'LF-D9';
UPDATE "Products" SET description = 'DIAMOND 12 CAVITY BROWN',     mrp = 325 WHERE "productName" = 'LF-D12B';
UPDATE "Products" SET description = 'DIAMOND 12 CAVITY',           mrp = 375 WHERE "productName" = 'LF-D12';
UPDATE "Products" SET description = 'DIAMOND 15 CAVITY',           mrp = 430 WHERE "productName" = 'LF-D15';
UPDATE "Products" SET description = 'DIAMOND 15 CAVITY TRIOS',     mrp = 460 WHERE "productName" = 'LF-D15T';
UPDATE "Products" SET description = 'DIAMOND 18 CAVITY TRIOS',     mrp = 549 WHERE "productName" = 'LF-D18T';
UPDATE "Products" SET description = 'DIAMOND 25 CAVITY BROWN',     mrp = 650 WHERE "productName" = 'LF-D25B';
UPDATE "Products" SET description = 'DIAMOND 25 CAVITY',           mrp = 699 WHERE "productName" = 'LF-D25';
UPDATE "Products" SET description = 'DIAMOND 25 CAVITY TRIOS',     mrp = 749 WHERE "productName" = 'LF-D25T';

-- Verify:
SELECT "productName", description, mrp, category FROM "Products" ORDER BY id;
