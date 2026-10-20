import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCurrency, calculateCartTotals, filterSculptures } from './shopLogic.ts';
import type { Sculpture, CartItem } from '../types/index.ts';

const mockSculpture1: Sculpture = {
  id: 'test-1',
  title: 'Lord Ganesha Carving',
  subtitle: 'Aged Santalum Album',
  category: 'Deity',
  era: '19th Century',
  priceINR: 150000,
  priceUSD: 1800,
  dimensions: '18x12',
  weightKg: 4,
  aromaProfile: 'Woody amber',
  provenance: 'Mysore Guild',
  woodOrigin: 'Sagar Reserve',
  authenticityCertificateId: 'KFA-001',
  stockQuantity: 2,
  image: '/test.jpg',
  featured: true,
  description: 'Divine remover of obstacles sculpted in deep relief.',
  artisanStory: 'Crafted in Sagar'
};

const mockSculpture2: Sculpture = {
  id: 'test-2',
  title: 'Apsara Celestial Dancer',
  subtitle: 'Classical Hoysala Motif',
  category: 'Celestial',
  era: '18th Century',
  priceINR: 80000,
  priceUSD: 950,
  dimensions: '20x10',
  weightKg: 3.5,
  aromaProfile: 'Floral balsamic',
  provenance: 'Shimoga Collection',
  woodOrigin: 'Malnad Forest',
  authenticityCertificateId: 'KFA-002',
  stockQuantity: 1,
  image: '/test2.jpg',
  featured: false,
  description: 'Graceful court dancer with veena instrument.',
  artisanStory: 'Artisan heritage'
};

test('formatCurrency formats INR and USD correctly', () => {
  const inrFormatted = formatCurrency(425000, 'INR');
  assert.ok(inrFormatted.includes('4,25,000') || inrFormatted.includes('₹'), 'INR formatted correctly');

  const usdFormatted = formatCurrency(5100, 'USD');
  assert.ok(usdFormatted.includes('5,100') || usdFormatted.includes('$'), 'USD formatted correctly');
});

test('calculateCartTotals computes subtotal, luxury insurance, and curation levy correctly', () => {
  const cart: CartItem[] = [
    { sculpture: mockSculpture1, quantity: 1 } // INR 150,000 -> qualifies for free insured shipping
  ];

  const totals = calculateCartTotals(cart, 'INR');
  assert.equal(totals.itemCount, 1);
  assert.equal(totals.subtotal, 150000);
  assert.equal(totals.insuranceShipping, 0); // Above 100,000 INR threshold
  assert.equal(totals.isShippingFree, true);
  assert.equal(totals.tax, 4500); // 3% of 150,000
  assert.equal(totals.total, 154500);
});

test('calculateCartTotals charges standard insured shipping for lower value orders', () => {
  const cart: CartItem[] = [
    { sculpture: mockSculpture2, quantity: 1 } // USD 950 -> below 1,200 threshold
  ];

  const totals = calculateCartTotals(cart, 'USD');
  assert.equal(totals.itemCount, 1);
  assert.equal(totals.subtotal, 950);
  assert.equal(totals.insuranceShipping, 150);
  assert.equal(totals.isShippingFree, false);
  assert.equal(totals.tax, Math.round(950 * 0.03));
  assert.equal(totals.total, 950 + 150 + 29);
});

test('filterSculptures correctly filters by category, era, and search text', () => {
  const list = [mockSculpture1, mockSculpture2];

  // Category filter
  const deityOnly = filterSculptures(list, { category: 'Deity' });
  assert.equal(deityOnly.length, 1);
  assert.equal(deityOnly[0].id, 'test-1');

  // Era filter
  const century18 = filterSculptures(list, { era: '18th Century' });
  assert.equal(century18.length, 1);
  assert.equal(century18[0].id, 'test-2');

  // Search text
  const searchApsara = filterSculptures(list, { query: 'dancer' });
  assert.equal(searchApsara.length, 1);
  assert.equal(searchApsara[0].id, 'test-2');
});
