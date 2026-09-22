const test = require('node:test');
const assert = require('node:assert');

const { resolveGifts, unlockedComboGiftId } = require('../utils/offers');

// Only the fields resolveGifts reads. Ids match productsData/offersData:
//  2 → LF-H3 (the gift most single offers give, and the ₹499 combo tier)
// 22 → LF-D25B ₹640, the box that earns both at once
//  3 → LF-H3T, the ₹799 combo tier
const PRODUCTS = [
  { id: 2,  productName: 'LF-H3',   inStock: true },
  { id: 3,  productName: 'LF-H3T',  inStock: true },
  { id: 4,  productName: 'LF-H4P',  inStock: true },
  { id: 22, productName: 'LF-D25B', inStock: true },
  { id: 24, productName: 'LF-D25T', inStock: true },
];

const paid = (...productIds) => productIds.map((productId) => ({ productId }));

test('one gift per order when a cart earns both a single and a combo offer', () => {
  // LF-D25B at ₹640 carries its own free LF-H3 and also clears the ₹499 tier,
  // which gives LF-H3 as well. The shopper picks one; they do not stack.
  const lines = resolveGifts(
    [
      { productId: 2, source: 'single' },
      { productId: 2, source: 'combo' },
    ],
    paid(22),
    640,
    PRODUCTS,
  );

  assert.strictEqual(lines.length, 1);
  assert.strictEqual(lines[0].productId, 2);
  assert.strictEqual(lines[0].price, 0);
});

test('the shopper\'s chosen gift is the one honoured', () => {
  // Same cart, but the combo claim is listed first — the combo gift wins.
  const lines = resolveGifts(
    [
      { productId: 2, source: 'combo' },
      { productId: 2, source: 'single' },
    ],
    paid(22),
    640,
    PRODUCTS,
  );

  assert.strictEqual(lines.length, 1);
  assert.strictEqual(lines[0].name, 'LF-H3 (FREE GIFT)');
});

test('two different earned gifts still yield only one line', () => {
  // LF-D25T earns LF-H4P; ₹840 also clears the ₹799 tier for LF-H3T.
  const lines = resolveGifts(
    [
      { productId: 4, source: 'single' },
      { productId: 3, source: 'combo' },
    ],
    paid(24),
    840,
    PRODUCTS,
  );

  assert.strictEqual(lines.length, 1);
  assert.strictEqual(lines[0].productId, 4);
});

test('a gift the order did not earn is dropped, not charged', () => {
  const lines = resolveGifts(
    [{ productId: 4, source: 'single' }], // LF-H4P needs LF-D25T in the cart
    paid(22),
    640,
    PRODUCTS,
  );

  assert.deepStrictEqual(lines, []);
});

test('an out-of-stock gift falls through to the next earned claim', () => {
  const lines = resolveGifts(
    [
      { productId: 2, source: 'single' },
      { productId: 3, source: 'combo' },
    ],
    paid(22),
    840,
    [{ ...PRODUCTS[0], inStock: false }, ...PRODUCTS.slice(1)],
  );

  assert.strictEqual(lines.length, 1);
  assert.strictEqual(lines[0].productId, 3);
});

test('no claims means no gift lines', () => {
  assert.deepStrictEqual(resolveGifts([], paid(22), 640, PRODUCTS), []);
  assert.deepStrictEqual(resolveGifts(undefined, paid(22), 640, PRODUCTS), []);
});

test('combo tier resolves to the highest threshold reached', () => {
  assert.strictEqual(unlockedComboGiftId(498), null);
  assert.strictEqual(unlockedComboGiftId(499), 2);
  assert.strictEqual(unlockedComboGiftId(640), 2);
  assert.strictEqual(unlockedComboGiftId(799), 3);
  assert.strictEqual(unlockedComboGiftId(5000), 9);
});
