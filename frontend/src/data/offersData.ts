/**
 * offersData — DUMUZI promotional offers.
 *
 *  • Single offers → buy one specific box, get a specific gift box free.
 *  • Combo offers  → spend a threshold on the whole cart, unlock a free gift box.
 *
 * Gift/product references are resolved from productsData by id so prices and
 * images stay in sync with the catalog. The cart uses `comboTiers` to nudge the
 * shopper toward the next free-gift threshold.
 */
import { products, type Product } from './productsData';
import type { GiftItem } from '../context/CartContext';

const byId = (id: number): Product => {
  const p = products.find(x => x.id === id);
  if (!p) throw new Error(`offersData: product id ${id} not found`);
  return p;
};

export interface SingleOffer {
  /** the box the customer must buy */
  buy: Product;
  /** the free gift box they receive */
  gift: Product;
  /** optional campaign poster (public/images/offers) shown on the home page */
  poster?: string;
}

export interface ComboTier {
  /** minimum cart subtotal (₹) to unlock the gift */
  threshold: number;
  /** the free gift box unlocked at this threshold */
  gift: Product;
}

// ── SINGLE OFFERS ─────────────────────────────────────────────────────────────
// Buy the listed box → get the gift box free.
// Where a campaign poster exists it is the source of truth for the pairing —
// the artwork is what the shopper reads, so the data has to say the same thing.
export const singleOffers: SingleOffer[] = [
  { buy: byId(24), gift: byId(4), poster: '/images/offers/D25T.webp' },  // LF-D25T ₹749 → LF-H4P ₹140 free
  { buy: byId(23), gift: byId(2), poster: '/images/offers/D25.webp'  },  // LF-D25  ₹699 → LF-H3  ₹99  free
  { buy: byId(22), gift: byId(2), poster: '/images/offers/D25B.webp' },  // LF-D25B ₹640 → LF-H3  ₹99  free
  { buy: byId(14), gift: byId(2), poster: '/images/offers/H18D.webp' },  // LF-H18D ₹575 → LF-H3  ₹99  free
  { buy: byId(21), gift: byId(2), poster: '/images/offers/D18.webp'  },  // LF-D18T ₹575 → LF-H3  ₹99  free
  { buy: byId(13), gift: byId(2) },                                     // LF-H18B ₹525 → LF-H3  ₹99  free
];

/** Offers that ship with campaign artwork — drives the home page showcase. */
export const posterOffers: SingleOffer[] = singleOffers.filter(o => o.poster);

/** Stable cart key for a single-offer gift — same value wherever it's claimed. */
export const singleGiftKey = (buyId: number, giftId: number) => `single-${buyId}-${giftId}`;

/**
 * Build the cart gift entry for a single offer. Shared by the Offers page
 * ("Buy Now") and the cart panel so a gift claimed either way is the same row.
 */
export function singleGiftItem({ buy, gift }: SingleOffer): GiftItem {
  return {
    key: singleGiftKey(buy.id, gift.id),
    productId: gift.id,
    name: gift.description,
    image: gift.image,
    mrp: gift.mrp,
    source: 'single',
    buyId: buy.id,
  };
}

// ── COMBO OFFERS ──────────────────────────────────────────────────────────────
// Spend the threshold on the whole cart → unlock the free gift box.
// Kept sorted ascending by threshold — the cart logic relies on this order.
export const comboTiers: ComboTier[] = [
  { threshold: 499,  gift: byId(2) },  // → LF-H3  ₹99  free
  { threshold: 799,  gift: byId(3) },  // → LF-H3T ₹110 free
  { threshold: 999,  gift: byId(5) },  // → LF-H5  ₹160 free
  { threshold: 1499, gift: byId(8) },  // → LF-H8B ₹230 free
  { threshold: 1999, gift: byId(9) },  // → LF-H9P ₹325 free
];

// ── DEEP LINKS ────────────────────────────────────────────────────────────────
// Every offer gets a stable id so the top ribbon (and any other link) can point
// at one specific offer: /offers?tab=…&offer=<id>. The Offers page reads the id
// from the URL, opens the right tab, scrolls to the card and highlights it.

export const singleOfferId = ({ buy, gift }: SingleOffer) => `single-${buy.id}-${gift.id}`;
export const comboOfferId  = ({ threshold }: ComboTier)   => `combo-${threshold}`;

export interface TickerOffer {
  id: string;
  /** which Offers tab the offer lives on */
  tab: 'single' | 'combo';
  /** short line shown in the ribbon (styling uppercases it) */
  label: string;
  /** ready-to-use router path for the ribbon link */
  to: string;
}

/** All live offers — single first, then combo — as ribbon-ready ticker entries. */
export const tickerOffers: TickerOffer[] = [
  ...singleOffers.map((offer): TickerOffer => {
    const id = singleOfferId(offer);
    return {
      id,
      tab: 'single',
      label: `Buy ${offer.buy.description} · Get ${offer.gift.description} Free`,
      to: `/offers?tab=single&offer=${id}`,
    };
  }),
  ...comboTiers.map((tier): TickerOffer => {
    const id = comboOfferId(tier);
    return {
      id,
      tab: 'combo',
      label: `Spend ₹${tier.threshold} · Get ${tier.gift.description} Free (worth ₹${tier.gift.mrp})`,
      to: `/offers?tab=combo&offer=${id}`,
    };
  }),
];

export interface ComboProgress {
  /** highest tier already unlocked (null if none reached yet) */
  unlocked: ComboTier | null;
  /** the next tier to aim for (null if the top tier is reached) */
  next: ComboTier | null;
  /** ₹ still needed to reach `next` (0 if next is null) */
  remaining: number;
}

/**
 * Given a cart subtotal, work out which combo gift is unlocked and how far the
 * shopper is from the next one. Drives the cart's "add ₹X more to get Y free" nudge.
 */
export function getComboProgress(subtotal: number): ComboProgress {
  let unlocked: ComboTier | null = null;
  let next: ComboTier | null = null;

  for (const tier of comboTiers) {
    if (subtotal >= tier.threshold) {
      unlocked = tier;              // keep climbing — last match is the highest unlocked
    } else {
      next = tier;                 // first tier not yet reached
      break;
    }
  }

  return {
    unlocked,
    next,
    remaining: next ? next.threshold - subtotal : 0,
  };
}
