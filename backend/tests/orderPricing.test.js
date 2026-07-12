const test = require("node:test");
const assert = require("node:assert");
const { priceOrderItems } = require("../utils/orderPricing");

const products = [
  { id: 1, productName: "Dark 72%", mrp: "450.00", inStock: true },
  { id: 2, productName: "Truffle Box", mrp: "1200.00", inStock: true },
  { id: 3, productName: "Sold Out Praline", mrp: "800.00", inStock: false },
];

test("prices items from the DB, ignoring client-sent prices", () => {
  const { items, totalRupees } = priceOrderItems(
    [
      { productId: 1, quantity: 2, price: 0.01 }, // tampered client price
      { productId: 2, quantity: 1, price: 1 },
    ],
    products
  );

  assert.strictEqual(totalRupees, 450 * 2 + 1200);
  assert.deepStrictEqual(items, [
    { productId: 1, name: "Dark 72%", price: 450, quantity: 2 },
    { productId: 2, name: "Truffle Box", price: 1200, quantity: 1 },
  ]);
});

test("rejects an empty cart", () => {
  assert.throws(() => priceOrderItems([], products), { status: 400 });
  assert.throws(() => priceOrderItems(undefined, products), { status: 400 });
});

test("rejects unknown products", () => {
  assert.throws(() => priceOrderItems([{ productId: 999, quantity: 1 }], products), {
    status: 400,
  });
});

test("rejects out-of-stock products", () => {
  assert.throws(() => priceOrderItems([{ productId: 3, quantity: 1 }], products), {
    status: 400,
    message: '"Sold Out Praline" is out of stock',
  });
});

test("rejects invalid quantities", () => {
  for (const quantity of [0, -1, 1.5, "abc", null, 101]) {
    assert.throws(
      () => priceOrderItems([{ productId: 1, quantity }], products),
      { status: 400 },
      `quantity=${quantity} should be rejected`
    );
  }
});

test("rejects invalid product ids", () => {
  for (const productId of [0, -5, 2.5, "abc", null, undefined]) {
    assert.throws(
      () => priceOrderItems([{ productId, quantity: 1 }], products),
      { status: 400 },
      `productId=${productId} should be rejected`
    );
  }
});

test("handles string ids from the DB and duplicate cart lines", () => {
  const { totalRupees } = priceOrderItems(
    [
      { productId: "1", quantity: 1 },
      { productId: 1, quantity: 3 },
    ],
    [{ id: "1", productName: "Dark 72%", mrp: 450, inStock: true }]
  );
  assert.strictEqual(totalRupees, 450 * 4);
});
