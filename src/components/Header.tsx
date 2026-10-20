import React, { useState } from 'react';
import { ShoppingBag, Moon, Sun, ShieldCheck, Menu, X, Globe } from 'lucide-react';
import { Currency } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: Currency;
  onToggleCurrency: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onToggleCurrency,
  darkMode,
  onToggleDarkMode,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FDFBF7]/90 dark:bg-[#18120e]/90 border-b border-[#e8dccb] dark:border-[#382619] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Brand Zone (Single element wordmark) */}
        <a 
          href="#" 
          className="flex flex-col shrink-0 focus:outline-none group"
        >
          <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#2b180d] dark:text-[#f8ede0] group-hover:text-[#a4693b] dark:group-hover:text-[#e4cbb0] transition-colors whitespace-nowrap">
            Kala Fine Arts
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#824f2e] dark:text-[#cba258] -mt-1 font-medium">
            Sagar Sandalwood
          </span>
        </a>

        {/* Clean Navigation Links (4-5 single-line links with subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5c3e28] dark:text-[#d3beab]">
          <a 
            href="#collection" 
            className="hover:text-[#a4693b] dark:hover:text-[#e4cbb0] transition-colors whitespace-nowrap py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#a4693b] dark:after:bg-[#cba258] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Masterworks
          </a>
          <a 
            href="#heritage" 
            className="hover:text-[#a4693b] dark:hover:text-[#e4cbb0] transition-colors whitespace-nowrap py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#a4693b] dark:after:bg-[#cba258] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Sagar Heritage
          </a>
          <a 
            href="#provenance" 
            className="hover:text-[#a4693b] dark:hover:text-[#e4cbb0] transition-colors whitespace-nowrap py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#a4693b] dark:after:bg-[#cba258] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Authenticity & GI
          </a>
          <a 
            href="#contact" 
            className="hover:text-[#a4693b] dark:hover:text-[#e4cbb0] transition-colors whitespace-nowrap py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#a4693b] dark:after:bg-[#cba258] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Atelier & Contact
          </a>
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-[#dfd1be] dark:border-[#422e1f] text-[#593520] dark:text-[#dfcaa7] hover:bg-[#f3e7d5] dark:hover:bg-[#2c1d13] transition-colors whitespace-nowrap"
            title="Toggle Currency (INR / USD)"
            aria-label={`Current currency: ${currency}. Click to switch.`}
          >
            <Globe className="w-3.5 h-3.5 text-[#a4693b] dark:text-[#cba258]" />
            <span>{currency}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-md border border-[#dfd1be] dark:border-[#422e1f] text-[#593520] dark:text-[#dfcaa7] hover:bg-[#f3e7d5] dark:hover:bg-[#2c1d13] transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#cba258]" /> : <Moon className="w-4 h-4 text-[#824f2e]" />}
          </button>

          {/* Admin Gateway Icon Button */}
          <button
            onClick={onOpenAdmin}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
              isAdminLoggedIn 
                ? 'border-[#a4693b] bg-[#a4693b]/10 text-[#a4693b] dark:text-[#e4cbb0]'
                : 'border-transparent text-[#775338] dark:text-[#b49b85] hover:border-[#dfd1be] dark:hover:border-[#422e1f]'
            }`}
            title="Admin Portal (Inventory & Enquiries)"
            aria-label="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">{isAdminLoggedIn ? 'Curator' : 'Admin'}</span>
          </button>

          {/* Cart Primary CTA */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md font-medium text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap"
            aria-label={`View Cart with ${cartCount} sculptures`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Acquisitions</span>
            <span className="ml-0.5 px-1.5 py-0.2 bg-[#a4693b] dark:bg-[#23130c] text-white dark:text-[#cba258] rounded text-xs font-mono tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#42251a] dark:text-[#dfcaa7]"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e8dccb] dark:border-[#382619] bg-[#FDFBF7] dark:bg-[#18120e] px-4 py-4 space-y-3">
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#42251a] dark:text-[#f8ede0]"
          >
            Masterworks
          </a>
          <a
            href="#heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#42251a] dark:text-[#f8ede0]"
          >
            Sagar Heritage
          </a>
          <a
            href="#provenance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#42251a] dark:text-[#f8ede0]"
          >
            Authenticity & GI
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#42251a] dark:text-[#f8ede0]"
          >
            Atelier & Contact
          </a>
          <div className="pt-2 border-t border-[#e8dccb] dark:border-[#382619] flex items-center justify-between">
            <span className="text-xs text-[#824f2e] dark:text-[#cba258]">Sagar, Karnataka</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs font-medium text-[#593520] dark:text-[#dfcaa7] underline"
            >
              Curator Portal Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
