export interface Sculpture {
  id: string;
  title: string;
  subtitle: string;
  category: 'Deity' | 'Celestial' | 'Royal' | 'Artefact';
  era: '18th Century' | '19th Century' | 'Early 20th Century' | 'Contemporary Masterwork';
  priceINR: number;
  priceUSD: number;
  dimensions: string;
  weightKg: number;
  aromaProfile: string;
  provenance: string;
  woodOrigin: string;
  authenticityCertificateId: string;
  stockQuantity: number;
  image: string;
  additionalImages?: string[];
  featured: boolean;
  description: string;
  artisanStory: string;
}

export interface CartItem {
  sculpture: Sculpture;
  quantity: number;
}

export type Currency = 'INR' | 'USD';

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  sculptureId?: string;
  sculptureTitle?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'replied';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  insuranceShipping: number;
  total: number;
  currency: Currency;
  paymentMethod: 'concierge_wire' | 'escrow' | 'card';
  status: 'processing' | 'insured_transit' | 'delivered';
  createdAt: string;
}

export type UserRole = 'visitor' | 'admin';
