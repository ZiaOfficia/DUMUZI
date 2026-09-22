// Server-side offer rules — the backend's copy of
// frontend/src/data/offersData.ts. Keep the two in step: the cart quotes these
// gifts, and this file is what decides whether one is actually given away.
//
// Free gifts are resolved here rather than taken from the request for the same
// reason prices are (see orderPricing.js): the client may *ask* for a gift, but
// only the order in front of us can earn it. A claim is checked against that
// order alone — the paid boxes in it and its own subtotal — so nothing from an
// earlier order can put a ₹0 line on this one.

/** Buy this box (by product id) → that gift box comes free. */
const SINGLE_OFFERS = [
  { buyId: 24, giftId: 4 }, // LF-D25T → LF-H4P
  { buyId: 23, giftId: 2 }, // LF-D25  → LF-H3
  { buyId: 22, giftId: 2 }, // LF-D25B → LF-H3
  { buyId: 14, giftId: 2 }, // LF-H18D → LF-H3
  { buyId: 21, giftId: 2 }, // LF-D18T → LF-H3
  { buyId: 13, giftId: 2 }, // LF-H18B → LF-H3
];

/** Spend this much on one order → that gift box comes free. Ascending. */
const COMBO_TIERS = [
  { threshold: 499, giftId: 2 }, // LF-H3
  { threshold: 799, giftId: 3 }, // LF-H3T
  { threshold: 999, giftId: 5 }, // LF-H5
  { threshold: 1499, giftId: 8 }, // LF-H8B
  { threshold: 1999, giftId: 9 }, // LF-H9P
];

/**
 * The combo gift this subtotal unlocks — the highest tier it reaches, since
 * only one combo gift is given per order. Null below the first tier.
 *
 * @param {number} subtotalRupees  paid items only, this order only
 * @returns {number|null} gift product id
 */
function unlockedComboGiftId(subtotalRupees) {
  let giftId = null;
  for (const tier of COMBO_TIERS) {
    if (subtotalRupees >= tier.threshold) giftId = tier.giftId;
    else break;
  }
  return giftId;
}

/**
 * Turn the gifts a shopper claimed into ₹0 order lines.
 *
 * A single-offer gift needs its qualifying box among this order's paid items;
 * a combo gift needs this order's subtotal to reach its tier. Anything else is
 * dropped rather than rejected — a claim left over from an earlier cart
 * shouldn't fail an otherwise-valid checkout, but it must never be charged for
 * either.
 *
 * ONE GIFT PER ORDER. An order can qualify for two offers at once — a ₹640
 * LF-D25B carries its own single-offer gift and also clears the ₹499 combo
 * tier — but the shopper picks one, they do not stack. The cart sends the one
 * they chose; if an older client sends both, the first earned claim wins.
 *
 * @param {Array<{productId: number|string, source?: string}>} rawGifts  as claimed by the client
 * @param {Array<{productId: number}>} pricedItems  the paid lines from priceOrderItems
 * @param {number} subtotalRupees  the paid subtotal from priceOrderItems
 * @param {Array<{id: number, productName: string, inStock: boolean}>} products
 * @returns {Array<{productId:number, name:string, price:number, quantity:number}>}
 */
function resolveGifts(rawGifts, pricedItems, subtotalRupees, products) {
  if (!Array.isArray(rawGifts) || rawGifts.length === 0) return [];

  const byId = new Map(products.map((p) => [Number(p.id), p]));
  const paidIds = new Set(pricedItems.map((i) => i.productId));

  const earnedSingles = new Set(
    SINGLE_OFFERS.filter((o) => paidIds.has(o.buyId)).map((o) => o.giftId)
  );
  const comboGiftId = unlockedComboGiftId(subtotalRupees);

  for (const raw of rawGifts) {
    const productId = Number(raw?.productId);
    if (!Number.isInteger(productId) || productId <= 0) continue;

    const source = raw?.source === "combo" ? "combo" : "single";
    const earned = source === "combo"
      ? productId === comboGiftId
      : earnedSingles.has(productId);
    if (!earned) continue;

    // Can't give away what we can't ship.
    const product = byId.get(productId);
    if (!product || product.inStock === false) continue;

    // One gift per order — the first earned, in-stock claim is the only line.
    return [
      {
        productId,
        name: `${product.productName} (FREE GIFT)`,
        price: 0,
        quantity: 1,
      },
    ];
  }

  return [];
}

module.exports = { SINGLE_OFFERS, COMBO_TIERS, unlockedComboGiftId, resolveGifts };
