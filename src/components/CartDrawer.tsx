import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatCurrency, calculateCartTotals } from '../utils/shopLogic';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  const totals = calculateCartTotals(cart, currency);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md bg-[#FDFBF7] dark:bg-[#18120e] h-full shadow-2xl flex flex-col justify-between border-l border-[#e8dccb] dark:border-[#332215] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#ebdcc8] dark:border-[#332215] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#824f2e] dark:text-[#cba258]" />
            <h2 className="font-serif text-2xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
              Acquisition Bag
            </h2>
            <span className="text-xs font-mono text-[#824f2e] dark:text-[#cba258]">
              ({totals.itemCount})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6e4e37] dark:text-[#c4ae99] hover:bg-[#f3e7d5] dark:hover:bg-[#281b12] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body / Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#f3e7d5] dark:bg-[#281b12] flex items-center justify-center text-[#824f2e] dark:text-[#cba258]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="font-serif text-xl text-[#3b2216] dark:text-[#f8ede0]">Your bag is empty</p>
              <p className="text-xs text-[#74553f] dark:text-[#a8907b] max-w-xs mx-auto">
                Discover our rare certified sandalwood sculptures and reserve a piece of Indian sculptural heritage.
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const unitPrice = currency === 'INR' ? item.sculpture.priceINR : item.sculpture.priceUSD;
              return (
                <div
                  key={item.sculpture.id}
                  className="flex gap-4 p-3.5 bg-[#f9f4ea] dark:bg-[#21160f] rounded-xl border border-[#ebdcc8] dark:border-[#332215]"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.sculpture.image}
                    alt={item.sculpture.title}
                    className="w-20 h-20 object-cover rounded-lg bg-[#2b180d] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#2b180d] dark:text-[#f8ede0] truncate">
                          {item.sculpture.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.sculpture.id)}
                          className="text-[#9a7d65] hover:text-red-700 transition-colors p-1"
                          aria-label={`Remove ${item.sculpture.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#824f2e] dark:text-[#cba258] truncate">
                        {item.sculpture.era} · {item.sculpture.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#ebdcc8]/60 dark:border-[#382619]">
                      <div className="flex items-center border border-[#d8c4ad] dark:border-[#3f2a1b] rounded bg-white dark:bg-[#1a110a] text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.sculpture.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-[#ebdcc8] dark:hover:bg-[#2f1f15]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 font-mono text-xs">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.sculpture.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-[#ebdcc8] dark:hover:bg-[#2f1f15]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-[#2b180d] dark:text-[#f8ede0] tabular-nums">
                        {formatCurrency(unitPrice * item.quantity, currency)}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer / Checkout Strip */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#ebdcc8] dark:border-[#332215] bg-[#f9f4ea] dark:bg-[#1c140e] space-y-4">
            
            <div className="space-y-1.5 text-xs text-[#6e4e37] dark:text-[#c4ae99]">
              <div className="flex justify-between">
                <span>Artwork Subtotal</span>
                <span className="font-mono tabular-nums">{formatCurrency(totals.subtotal, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Crated Transit</span>
                <span className="font-mono tabular-nums">
                  {totals.isShippingFree ? 'Complimentary' : formatCurrency(totals.insuranceShipping, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Heritage Conservation Levy (3%)</span>
                <span className="font-mono tabular-nums">{formatCurrency(totals.tax, currency)}</span>
              </div>
              <div className="pt-2 border-t border-[#ebdcc8] dark:border-[#332215] flex justify-between text-sm font-semibold text-[#2b180d] dark:text-[#f8ede0]">
                <span>Total Valuation</span>
                <span className="font-serif text-lg tabular-nums">{formatCurrency(totals.total, currency)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full py-3.5 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Proceed To Acquisition Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#824f2e] dark:text-[#cba258]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Escrow Protection & Registered Provenance Dossier</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
