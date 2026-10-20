/**
 * Kala Fine Arts - Luxury Artisan Sandalwood Sculptures
 * Sagar, Karnataka, India
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SculptureGrid } from './components/SculptureGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { HeritageSection } from './components/HeritageSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ContactSection } from './components/ContactSection';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { CartItem, Currency, CustomerInquiry, Order, Sculpture } from './types';
import { supabaseStorage } from './lib/supabase';

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kala_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  // Currency State (INR / USD)
  const [currency, setCurrency] = useState<Currency>('INR');

  // Core Data States
  const [sculptures, setSculptures] = useState<Sculpture[]>(() => supabaseStorage.getSculptures());
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => supabaseStorage.getInquiries());
  const [orders, setOrders] = useState<Order[]>(() => supabaseStorage.getOrders());
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('kala_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // UI Modals & Active Selections
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedSculpture, setSelectedSculpture] = useState<Sculpture | null>(null);
  const [inquirySculpture, setInquirySculpture] = useState<Sculpture | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kala_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Sync Dark Mode with <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('kala_dark_mode', 'true'); } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('kala_dark_mode', 'false'); } catch {}
    }
  }, [darkMode]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('kala_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Update Sculptures
  const handleUpdateSculptures = (updated: Sculpture[]) => {
    setSculptures(updated);
    supabaseStorage.saveSculptures(updated);
  };

  // Update Inquiries
  const handleUpdateInquiries = (updated: CustomerInquiry[]) => {
    setInquiries(updated);
    supabaseStorage.saveInquiries(updated);
  };

  // Update Orders
  const handleUpdateOrders = (updated: Order[]) => {
    setOrders(updated);
    supabaseStorage.saveOrders(updated);
  };

  // Add Item to Cart
  const handleAddToCart = (sculpture: Sculpture, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.sculpture.id === sculpture.id);
      if (existing) {
        return prev.map((item) =>
          item.sculpture.id === sculpture.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { sculpture, quantity }];
    });
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (sculptureId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(sculptureId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.sculpture.id === sculptureId ? { ...item, quantity } : item
      )
    );
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (sculptureId: string) => {
    setCart((prev) => prev.filter((item) => item.sculpture.id !== sculptureId));
  };

  // Place Order Success
  const handleOrderSuccess = (order: Order) => {
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    supabaseStorage.saveOrders(updatedOrders);
    setCart([]);
  };

  // Submit Inquiry
  const handleSubmitInquiry = (inquiry: CustomerInquiry) => {
    const updated = [inquiry, ...inquiries];
    setInquiries(updated);
    supabaseStorage.saveInquiries(updated);
  };

  // Admin Auth Handlers
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    try { localStorage.setItem('kala_admin_auth', 'true'); } catch {}
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try { localStorage.removeItem('kala_admin_auth'); } catch {}
    setIsAdminDashboardOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#18120e] text-[#2b180d] dark:text-[#f8ede0] transition-colors duration-200 antialiased selection:bg-[#d4aa7f] selection:text-[#23130c]">
      
      {/* Top Banner Notice */}
      <aside aria-label="Authenticity Announcement" className="bg-[#42251a] text-[#fdfbf7] dark:bg-[#23130c] dark:text-[#cba258] text-[11px] font-medium tracking-widest uppercase text-center py-2 px-4 border-b border-[#5a3625] dark:border-[#332215]">
        <span>Sagar Atelier Heritage · Certified 100% Genuine Santalum Album · Insured Global Transit</span>
      </aside>

      {/* Header Bar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={() => setCurrency((curr) => (curr === 'INR' ? 'USD' : 'INR'))}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setIsAdminDashboardOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Collection Section */}
        <SculptureGrid
          sculptures={sculptures}
          currency={currency}
          onSelectSculpture={(sculpture) => setSelectedSculpture(sculpture)}
          onAddToCart={(sculpture) => handleAddToCart(sculpture, 1)}
        />

        {/* Heritage & Provenance Section */}
        <HeritageSection />

        {/* Contact & Atelier Section */}
        <ContactSection
          sculptures={sculptures}
          inquirySculpture={inquirySculpture}
          onClearInquirySculpture={() => setInquirySculpture(null)}
          onSubmitInquiry={handleSubmitInquiry}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setIsAdminDashboardOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Modals & Overlays */}
      <QuickViewModal
        sculpture={selectedSculpture}
        currency={currency}
        onClose={() => setSelectedSculpture(null)}
        onAddToCart={handleAddToCart}
        onOpenInquiry={(sculpture) => {
          setInquirySculpture(sculpture);
          const el = document.getElementById('contact');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        onOrderSuccess={handleOrderSuccess}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {isAdminDashboardOpen && (
        <AdminDashboard
          sculptures={sculptures}
          inquiries={inquiries}
          orders={orders}
          currency={currency}
          onUpdateSculptures={handleUpdateSculptures}
          onUpdateInquiries={handleUpdateInquiries}
          onUpdateOrders={handleUpdateOrders}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={handleAdminLogout}
        />
      )}

    </div>
  );
}
