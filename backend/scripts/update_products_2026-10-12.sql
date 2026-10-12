-- 2026-10-12 — Remove the BN series: LF-BN9 (id 25) and LF-BN9T (id 26).
-- Run in the Neon SQL editor. Past orders keep their own copy of the line
-- items, so order history is not affected.

BEGIN;

-- 1) Drop the two products from any saved account carts
DELETE FROM "CartItems" WHERE "productId" IN (25, 26);

-- 2) Remove the products
DELETE FROM "Products" WHERE id IN (25, 26);

COMMIT;

-- Verify (expect 30 rows, none with category BN):
SELECT id, "productName", description, mrp, category FROM "Products" ORDER BY id;
