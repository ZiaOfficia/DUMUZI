/**
 * Retry server-side Meta Purchases that didn't get through.
 *
 *   node scripts/retryMetaPurchases.js            # send
 *   node scripts/retryMetaPurchases.js --dry-run  # just list what would be sent
 *
 * Picks up orders whose Conversions API Purchase failed (a Meta outage, an
 * expired token) or was never sent (the token wasn't configured yet), and
 * sends each through the same sendPurchaseToMeta the live triggers use — so
 * the per-order claim, the attempt cap and the event_id are all the same.
 *
 * Only orders from the last 48 hours: that's Meta's window for deduplicating
 * against the browser Pixel's copy of the same Purchase. Anything older could
 * be counted twice, so it's left alone.
 *
 * Only orders created since CAPI shipped (they carry meta_client_context), so
 * this can never backfill Purchases for older orders the Pixel already counted.
 */
require('dotenv').config();
const { Op } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('../models/Order');
const { sendPurchaseToMeta, isPurchaseEligible, MAX_ATTEMPTS } = require('../services/metaConversionsApi');

const WINDOW_HOURS = 48;
const dryRun = process.argv.includes('--dry-run');

(async () => {
  try {
    await sequelize.authenticate();

    const candidates = await Order.findAll({
      where: {
        createdAt:           { [Op.gte]: new Date(Date.now() - WINDOW_HOURS * 3600 * 1000) },
        meta_client_context: { [Op.ne]: null },
        meta_capi_attempts:  { [Op.lt]: MAX_ATTEMPTS },
        // 'sending' only if a restart orphaned the claim — sendPurchaseToMeta
        // leaves a live one alone
        [Op.or]: [{ meta_capi_status: null }, { meta_capi_status: { [Op.in]: ['failed', 'sending'] } }],
      },
      order: [['createdAt', 'ASC']],
    });
    const due = candidates.filter(isPurchaseEligible);

    console.log(`${due.length} order(s) due a Meta Purchase${dryRun ? ' (dry run — nothing sent)' : ''}`);
    const tally = {};
    for (const order of due) {
      const outcome = dryRun ? 'would-send' : await sendPurchaseToMeta(order);
      tally[outcome] = (tally[outcome] || 0) + 1;
      console.log(`  ${order.razorpay_order_id}  ${order.payment_method}  attempts=${order.meta_capi_attempts} → ${outcome}`);
    }
    console.log('Done:', JSON.stringify(tally));
  } catch (err) {
    console.error('Retry run failed:', err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close().catch(() => {});
  }
})();
