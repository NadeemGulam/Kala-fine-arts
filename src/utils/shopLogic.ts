import type { CartItem, Currency, Sculpture } from '../types/index.ts';

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateCartTotals(items: CartItem[], currency: Currency) {
  const subtotal = items.reduce((acc, item) => {
    const unitPrice = currency === 'INR' ? item.sculpture.priceINR : item.sculpture.priceUSD;
    return acc + unitPrice * item.quantity;
  }, 0);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Complimentary museum-grade white-glove insured transit for orders over 100,000 INR / 1,200 USD
  const freeThreshold = currency === 'INR' ? 100000 : 1200;
  const standardShipping = currency === 'INR' ? 5000 : 150;
  const insuranceShipping = subtotal === 0 || subtotal >= freeThreshold ? 0 : standardShipping;

  // 3% Fine Art Heritage conservation & curation levy
  const taxRate = 0.03;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + insuranceShipping + tax;

  return {
    itemCount,
    subtotal,
    insuranceShipping,
    isShippingFree: insuranceShipping === 0 && subtotal > 0,
    tax,
    total
  };
}

export interface SculptureFilters {
  query?: string;
  category?: string;
  era?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

export function filterSculptures(sculptures: Sculpture[], filters: SculptureFilters): Sculpture[] {
  return sculptures.filter((item) => {
    if (filters.category && filters.category !== 'All' && item.category !== filters.category) {
      return false;
    }
    if (filters.era && filters.era !== 'All' && item.era !== filters.era) {
      return false;
    }
    if (filters.inStockOnly && item.stockQuantity <= 0) {
      return false;
    }
    if (filters.minPrice !== undefined && item.priceINR < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && item.priceINR > filters.maxPrice) {
      return false;
    }
    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchProvenance = item.provenance.toLowerCase().includes(q);
      const matchOrigin = item.woodOrigin.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchDesc && !matchProvenance && !matchOrigin) {
        return false;
      }
    }
    return true;
  });
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `KFA-${timestamp}-${random}`;
}

export function validateInquiryForm(form: { name: string; email: string; phone: string; message: string }) {
  const errors: Record<string, string> = {};
  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'Please provide your full name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }
  if (!form.phone || form.phone.trim().length < 8) {
    errors.phone = 'Please provide a contact number with country/area code.';
  }
  if (!form.message || form.message.trim().length < 5) {
    errors.message = 'Please provide brief details of your enquiry.';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
