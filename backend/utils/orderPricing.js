// Server-side order pricing.
// Never trust prices sent by the client — always price items from the
// Products table so a tampered request can't lower the amount charged.

/**
 * Build priced order items from client cart lines + DB products.
 *
 * @param {Array<{productId: number|string, quantity: number|string}>} rawItems
 * @param {Array<{id: number, productName: string, mrp: string|number, inStock: boolean}>} products
 * @returns {{ items: Array<{productId:number, name:string, price:number, quantity:number}>, totalRupees: number }}
 * @throws {Error} with .status = 400 on any invalid line
 */
function priceOrderItems(rawItems, products) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw badRequest("Cart is empty");
  }

  const byId = new Map(products.map((p) => [Number(p.id), p]));
  const items = [];
  let totalRupees = 0;

  for (const raw of rawItems) {
    const productId = Number(raw?.productId);
    const quantity = Number(raw?.quantity);

    if (!Number.isInteger(productId) || productId <= 0) {
      throw badRequest("Invalid product in cart");
    }
    if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 100) {
      throw badRequest("Invalid quantity in cart");
    }

    const product = byId.get(productId);
    if (!product) {
      throw badRequest("A product in your cart is no longer available");
    }
    if (product.inStock === false) {
      throw badRequest(`"${product.productName}" is out of stock`);
    }

    const price = Number(product.mrp); // authoritative price from DB
    if (!Number.isFinite(price) || price <= 0) {
      throw badRequest("A product in your cart has an invalid price");
    }

    items.push({ productId, name: product.productName, price, quantity });
    totalRupees += price * quantity;
  }

  return { items, totalRupees };
}

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

module.exports = { priceOrderItems };
