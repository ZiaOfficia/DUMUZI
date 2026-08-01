const test = require('node:test');
const assert = require('node:assert');
const crypto = require('node:crypto');

const {
  requestHash, responseHash, hashMatches, formatAmount, clean, newTxnId,
} = require('../utils/payu');

// PayU's published sandbox merchant. Using their documented values means these
// assertions fail loudly if the pipe layout is ever "tidied up" — a wrong hash
// is rejected by PayU with no useful error, so it has to be pinned here.
const SALT = 'eCwWELxi';
const FIELDS = {
  key:         'gtKFFx',
  txnid:       'abc123',
  amount:      '10.00',
  productinfo: 'iPhone',
  firstname:   'Ashish',
  email:       'test@gmail.com',
};

const sha512 = (s) => crypto.createHash('sha512').update(s).digest('hex');

test('request hash matches PayU\'s documented field layout', () => {
  // key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||SALT
  const literal = 'gtKFFx|abc123|10.00|iPhone|Ashish|test@gmail.com|||||||||||eCwWELxi';
  assert.strictEqual(requestHash(FIELDS, SALT), sha512(literal));
});

test('request hash places udf values in the right slots', () => {
  const withUdf = { ...FIELDS, udf1: 'a', udf3: 'c' };
  const literal = 'gtKFFx|abc123|10.00|iPhone|Ashish|test@gmail.com|a||c||||||||eCwWELxi';
  assert.strictEqual(requestHash(withUdf, SALT), sha512(literal));
});

test('response hash is the reverse layout, salt first', () => {
  const body = { ...FIELDS, status: 'success' };
  const literal = 'eCwWELxi|success|||||||||||test@gmail.com|Ashish|iPhone|10.00|abc123|gtKFFx';
  assert.strictEqual(responseHash(body, SALT), sha512(literal));
});

test('additionalCharges is prepended when PayU sends it', () => {
  const body = { ...FIELDS, status: 'success' };
  const plain = responseHash(body, SALT);
  const charged = responseHash({ ...body, additionalCharges: '5.00' }, SALT);

  assert.notStrictEqual(charged, plain);
  assert.strictEqual(
    charged,
    sha512(`5.00|eCwWELxi|success|||||||||||test@gmail.com|Ashish|iPhone|10.00|abc123|gtKFFx`),
  );
});

test('a tampered response fails verification', () => {
  const body = { ...FIELDS, status: 'success' };
  const genuine = responseHash(body, SALT);

  assert.ok(hashMatches(responseHash(body, SALT), genuine));
  // Amount edited in flight, status downgraded, or signed with the wrong salt
  assert.ok(!hashMatches(responseHash({ ...body, amount: '1.00' }, SALT), genuine));
  assert.ok(!hashMatches(responseHash({ ...body, status: 'failure' }, SALT), genuine));
  assert.ok(!hashMatches(responseHash(body, 'wrongsalt'), genuine));
});

test('hashMatches tolerates casing but not length games', () => {
  const h = responseHash({ ...FIELDS, status: 'success' }, SALT);
  assert.ok(hashMatches(h, h.toUpperCase()));
  assert.ok(!hashMatches(h, h.slice(0, -1)));
  assert.ok(!hashMatches(h, undefined));
});

test('amount is always two decimals', () => {
  assert.strictEqual(formatAmount(749), '749.00');
  assert.strictEqual(formatAmount(640.5), '640.50');
  assert.strictEqual(formatAmount('99'), '99.00');
});

test('clean strips pipes and non-ASCII so the hash cannot be split', () => {
  assert.strictEqual(clean('a|b'), 'a b');
  assert.strictEqual(clean('café  crème'), 'caf crme');
  assert.strictEqual(clean('x'.repeat(200)).length, 100);
});

test('txnid is unique, alphanumeric and within PayU\'s 25-char limit', () => {
  const ids = new Set(Array.from({ length: 500 }, newTxnId));
  assert.strictEqual(ids.size, 500);
  for (const id of ids) {
    assert.ok(id.length <= 25, `too long: ${id}`);
    assert.match(id, /^[A-Z0-9]+$/);
  }
});
