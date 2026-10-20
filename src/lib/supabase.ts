/**
 * Supabase Client Preparation Layer
 * 
 * Provides an adaptable storage provider that automatically uses localStorage
 * for instant zero-config interactive state management, while exposing fully typed
 * hooks and API signatures ready to swap to '@supabase/supabase-js'.
 */

import { CustomerInquiry, Order, Sculpture } from '../types';
import { INITIAL_SCULPTURES } from '../data/initialSculptures';

const STORAGE_KEYS = {
  SCULPTURES: 'kala_fine_arts_sculptures_v1',
  INQUIRIES: 'kala_fine_arts_inquiries_v1',
  ORDERS: 'kala_fine_arts_orders_v1',
  AUTH: 'kala_fine_arts_auth_v1'
};

// Simulated initial enquiries for admin demonstration
const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-101',
    name: 'Vikramaditya Rao',
    email: 'v.rao.heritage@gmail.com',
    phone: '+91 98450 12345',
    sculptureId: 'kala-001',
    sculptureTitle: 'Ananda Tandava Nataraja',
    message: 'Seeking additional high-resolution images of the flame aureole and confirmation of private viewing arrangement in Bangalore.',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    status: 'in_progress'
  },
  {
    id: 'inq-102',
    name: 'Evelyn St. Claire',
    email: 'evelyn.stclaire@mayfair-antiques.co.uk',
    phone: '+44 20 7946 0912',
    sculptureId: 'kala-004',
    sculptureTitle: 'Imperial Royal Ceremonial Elephant',
    message: 'Inquiring regarding export documentation, CITES wood certification, and crated climate-controlled air transport to London Heathrow.',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    status: 'new'
  }
];

export const supabaseStorage = {
  getSculptures(): Sculpture[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SCULPTURES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_SCULPTURES;
  },

  saveSculptures(sculptures: Sculpture[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SCULPTURES, JSON.stringify(sculptures));
    } catch (e) {
      console.error('Failed to save sculptures', e);
    }
  },

  getInquiries(): CustomerInquiry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_INQUIRIES;
  },

  saveInquiries(inquiries: CustomerInquiry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries', e);
    }
  },

  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  },

  saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  },

  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.SCULPTURES);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  }
};
