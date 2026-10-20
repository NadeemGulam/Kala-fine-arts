import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Download, Truck } from 'lucide-react';
import { CartItem, Currency, Order } from '../types';
import { calculateCartTotals, formatCurrency, generateOrderNumber } from '../utils/shopLogic';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Sagar');
  const [state, setState] = useState('Karnataka');
  const [postalCode, setPostalCode] = useState('577401');
  const [country, setCountry] = useState('India');
  const [paymentMethod, setPaymentMethod] = useState<'concierge_wire' | 'escrow' | 'card'>('concierge_wire');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const totals = calculateCartTotals(cart, currency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
    if (!phone.trim()) errors.phone = 'Contact telephone is required';
    if (!address.trim()) errors.address = 'Delivery address is required';
    if (!postalCode.trim()) errors.postalCode = 'Postal / Zip code is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generateOrderNumber(),
        customerName: name,
        email,
        phone,
        address,
        city,
        state,
        postalCode,
        country,
        items: [...cart],
        subtotal: totals.subtotal,
        tax: totals.tax,
        insuranceShipping: totals.insuranceShipping,
        total: totals.total,
        currency,
        paymentMethod,
        status: 'processing',
        createdAt: new Date().toISOString()
      };

      setCreatedOrder(order);
      setStep('success');
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FDFBF7] dark:bg-[#18120e] rounded-2xl shadow-2xl border border-[#ebdcc8] dark:border-[#382619] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-[#ebdcc8] dark:border-[#332215] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#824f2e] dark:text-[#cba258]" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
              {step === 'form' ? 'Acquisition Checkout & Provenance Registration' : 'Order Confirmed · Dossier Issued'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6e4e37] dark:text-[#c4ae99] hover:bg-[#f3e7d5] dark:hover:bg-[#2b1c12] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Order summary bar */}
            <div className="p-4 rounded-xl bg-[#f9f4ea] dark:bg-[#21160f] border border-[#ebdcc8] dark:border-[#332215] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#824f2e] dark:text-[#cba258] block">Reserved Sculptures ({cart.length})</span>
                <span className="font-serif text-lg font-medium text-[#2b180d] dark:text-[#f8ede0]">
                  {cart.map((c) => c.sculpture.title).join(', ')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#824f2e] dark:text-[#cba258] block">Total Valuation</span>
                <span className="font-serif text-xl font-semibold text-[#2b180d] dark:text-[#f8ede0] tabular-nums">
                  {formatCurrency(totals.total, currency)}
                </span>
              </div>
            </div>

            {/* Client Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#824f2e] dark:text-[#cba258]">
                1. Collector & Delivery Particulars
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhakrishna Bhat"
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                  />
                  {formErrors.name && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    Direct Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="collector@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                  />
                  {formErrors.email && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    Contact Telephone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 00000"
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                  />
                  {formErrors.phone && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                  Private Gallery / Estate Delivery Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment / Suite, Building, Street"
                  className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                />
                {formErrors.address && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.address}</p>}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0]"
                  />
                  {formErrors.postalCode && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment & Settlement Method */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#824f2e] dark:text-[#cba258]">
                2. Settlement Method
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'concierge_wire' 
                    ? 'border-[#824f2e] bg-[#f7efe3] dark:bg-[#2d1e15] ring-1 ring-[#824f2e]' 
                    : 'border-[#ebdcc8] dark:border-[#382619] bg-white dark:bg-[#21160f]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="concierge_wire"
                    checked={paymentMethod === 'concierge_wire'}
                    onChange={() => setPaymentMethod('concierge_wire')}
                    className="sr-only"
                  />
                  <span className="font-serif text-sm font-medium text-[#2b180d] dark:text-[#f8ede0] block">
                    Atelier Wire Transfer
                  </span>
                  <span className="text-[11px] text-[#74553f] dark:text-[#a8907b] block mt-1">
                    Bank wire with official invoice & tax certificate.
                  </span>
                </label>

                <label className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'escrow' 
                    ? 'border-[#824f2e] bg-[#f7efe3] dark:bg-[#2d1e15] ring-1 ring-[#824f2e]' 
                    : 'border-[#ebdcc8] dark:border-[#382619] bg-white dark:bg-[#21160f]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="escrow"
                    checked={paymentMethod === 'escrow'}
                    onChange={() => setPaymentMethod('escrow')}
                    className="sr-only"
                  />
                  <span className="font-serif text-sm font-medium text-[#2b180d] dark:text-[#f8ede0] block">
                    Escrow Protection
                  </span>
                  <span className="text-[11px] text-[#74553f] dark:text-[#a8907b] block mt-1">
                    Funds released upon white-glove inspection.
                  </span>
                </label>

                <label className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-[#824f2e] bg-[#f7efe3] dark:bg-[#2d1e15] ring-1 ring-[#824f2e]' 
                    : 'border-[#ebdcc8] dark:border-[#382619] bg-white dark:bg-[#21160f]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="sr-only"
                  />
                  <span className="font-serif text-sm font-medium text-[#2b180d] dark:text-[#f8ede0] block">
                    Encrypted Card
                  </span>
                  <span className="text-[11px] text-[#74553f] dark:text-[#a8907b] block mt-1">
                    Instant 256-bit encrypted card charge.
                  </span>
                </label>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#ebdcc8] dark:border-[#332215] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs text-[#824f2e] dark:text-[#cba258]">
                <ShieldCheck className="w-4 h-4" />
                <span>Protected by Kala Fine Arts Sagar Heritage Guarantee</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registering Acquisition...</span>
                ) : (
                  <>
                    <span>Confirm & Issue Acquisition Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 sm:p-10 space-y-8 text-center">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs uppercase tracking-widest font-mono text-[#824f2e] dark:text-[#cba258]">
                Certificate of Acquisition Registered
              </span>
              <h4 className="font-serif text-3xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
                Thank You, {createdOrder?.customerName}
              </h4>
              <p className="text-xs sm:text-sm text-[#614532] dark:text-[#c4ae99] leading-relaxed">
                Your order <strong className="font-mono text-[#2b180d] dark:text-[#f8ede0]">{createdOrder?.orderNumber}</strong> has been logged into our atelier ledger. Our senior archivist will contact you shortly to coordinate white-glove transit from Sagar.
              </p>
            </div>

            {/* Certificate Preview Card */}
            <div className="p-6 rounded-xl bg-[#f7efe3] dark:bg-[#21160f] border border-[#e2d0b8] dark:border-[#382619] max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#e2d0b8] dark:border-[#382619] pb-2 text-[11px] text-[#824f2e] dark:text-[#cba258]">
                <span>KALA FINE ARTS ATELIER</span>
                <span>SAGAR - 577401</span>
              </div>
              <div className="space-y-1 text-[#3b2216] dark:text-[#f8ede0]">
                <div className="flex justify-between">
                  <span className="text-[#74553f] dark:text-[#9e836f]">Order Dossier:</span>
                  <span>{createdOrder?.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74553f] dark:text-[#9e836f]">Delivery Destination:</span>
                  <span className="truncate max-w-[200px]">{createdOrder?.city}, {createdOrder?.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74553f] dark:text-[#9e836f]">Valuation:</span>
                  <span className="font-semibold">{formatCurrency(createdOrder?.total || 0, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74553f] dark:text-[#9e836f]">Settlement Mode:</span>
                  <span className="uppercase">{createdOrder?.paymentMethod.replace('_', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md text-xs font-semibold"
              >
                Return to Gallery
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
