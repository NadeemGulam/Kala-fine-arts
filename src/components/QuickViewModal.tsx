import React, { useState, useRef } from 'react';
import { X, ShoppingBag, ShieldCheck, ZoomIn, MessageSquare, Award, Compass, Check } from 'lucide-react';
import { Currency, Sculpture } from '../types';
import { formatCurrency } from '../utils/shopLogic';
import { STORE_INFO } from '../data/initialSculptures';

interface QuickViewModalProps {
  sculpture: Sculpture | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (sculpture: Sculpture, quantity: number) => void;
  onOpenInquiry: (sculpture: Sculpture) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  sculpture,
  currency,
  onClose,
  onAddToCart,
  onOpenInquiry
}) => {
  const [activeTab, setActiveTab] = useState<'provenance' | 'aroma' | 'conservation'>('provenance');
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  if (!sculpture) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleAdd = () => {
    onAddToCart(sculpture, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const price = currency === 'INR' ? sculpture.priceINR : sculpture.priceUSD;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl bg-[#FDFBF7] dark:bg-[#18120e] rounded-2xl shadow-2xl border border-[#e2d0b8] dark:border-[#3a271c] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#f3e7d5]/90 dark:bg-[#2b1c12]/90 text-[#3b2216] dark:text-[#f8ede0] hover:bg-[#e4cbb0] dark:hover:bg-[#3d2719] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
          
          {/* Left Column: Wood Grain Inspector Gallery */}
          <div className="lg:col-span-6 bg-[#211208] relative flex flex-col justify-between p-6 overflow-hidden">
            
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-white/80 text-xs mb-3 z-10">
              <span className="font-mono">{sculpture.authenticityCertificateId}</span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-white/10 px-2 py-0.5 rounded">
                <ZoomIn className="w-3 h-3 text-[#cba258]" />
                Hover image to inspect wood grain
              </span>
            </div>

            {/* Interactive Zoom Surface */}
            <div
              ref={imgRef}
              onMouseEnter={() => setZoomActive(true)}
              onMouseLeave={() => setZoomActive(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black cursor-crosshair group shadow-inner"
            >
              <img
                src={sculpture.image}
                alt={sculpture.title}
                className={`w-full h-full object-cover object-center transition-transform duration-200 ${
                  zoomActive ? 'scale-150' : 'scale-100'
                }`}
                style={
                  zoomActive
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                      }
                    : undefined
                }
                referrerPolicy="no-referrer"
              />

              {/* Scrim footer on image */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent text-white/90 text-xs flex justify-between pointer-events-none">
                <span>{sculpture.dimensions}</span>
                <span className="font-mono">{sculpture.weightKg} kg Heartwood</span>
              </div>
            </div>

            {/* Micro Provenance guarantee strip */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-1 text-[#cba258]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Guaranteed Genuine Santalum album
              </span>
              <span>Sagar Guild Mark</span>
            </div>

          </div>

          {/* Right Column: Narrative, Specifications, Purchase Module */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Era line */}
              <div className="flex items-center gap-2 text-xs text-[#824f2e] dark:text-[#cba258] font-medium">
                <span>{sculpture.era}</span>
                <span aria-hidden="true">·</span>
                <span>{sculpture.category}</span>
                <span aria-hidden="true">·</span>
                <span>GI Tag Heritage</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#2b180d] dark:text-[#f8ede0] leading-tight">
                  {sculpture.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#74553f] dark:text-[#bca48f] mt-1 font-light">
                  {sculpture.subtitle}
                </p>
              </div>

              {/* Valuation & Currency */}
              <div className="py-2 border-y border-[#ebdcc8] dark:border-[#332215] flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-[#824f2e] dark:text-[#cba258]">
                  Curation Valuation
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#2b180d] dark:text-[#f8ede0] tabular-nums">
                  {formatCurrency(price, currency)}
                </span>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-[#ebdcc8] dark:border-[#332215] gap-4 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('provenance')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'provenance'
                      ? 'text-[#2b180d] dark:text-[#f8ede0] font-semibold after:w-full after:h-0.5 after:bg-[#a4693b] dark:after:bg-[#cba258] after:absolute after:bottom-0 after:left-0'
                      : 'text-[#824f2e]/70 dark:text-[#b49e8a]/70 hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
                  }`}
                >
                  Provenance & History
                </button>
                <button
                  onClick={() => setActiveTab('aroma')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'aroma'
                      ? 'text-[#2b180d] dark:text-[#f8ede0] font-semibold after:w-full after:h-0.5 after:bg-[#a4693b] dark:after:bg-[#cba258] after:absolute after:bottom-0 after:left-0'
                      : 'text-[#824f2e]/70 dark:text-[#b49e8a]/70 hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
                  }`}
                >
                  Aroma & Physicality
                </button>
                <button
                  onClick={() => setActiveTab('conservation')}
                  className={`pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'conservation'
                      ? 'text-[#2b180d] dark:text-[#f8ede0] font-semibold after:w-full after:h-0.5 after:bg-[#a4693b] dark:after:bg-[#cba258] after:absolute after:bottom-0 after:left-0'
                      : 'text-[#824f2e]/70 dark:text-[#b49e8a]/70 hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
                  }`}
                >
                  Conservation & Transit
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="min-h-[140px] text-xs text-[#523824] dark:text-[#c4ae99] leading-relaxed">
                {activeTab === 'provenance' && (
                  <div className="space-y-2.5">
                    <p>{sculpture.description}</p>
                    <p className="font-light text-[#775338] dark:text-[#9e836f]">
                      <strong className="font-medium text-[#2b180d] dark:text-[#f8ede0]">Documented Provenance: </strong>
                      {sculpture.provenance}
                    </p>
                    <p className="font-light text-[#775338] dark:text-[#9e836f]">
                      <strong className="font-medium text-[#2b180d] dark:text-[#f8ede0]">Artisan Tradition: </strong>
                      {sculpture.artisanStory}
                    </p>
                  </div>
                )}

                {activeTab === 'aroma' && (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-lg bg-[#f9f4ea] dark:bg-[#241710] border border-[#ebdcc8] dark:border-[#382619]">
                      <span className="font-medium text-[#824f2e] dark:text-[#cba258] block mb-1">Aroma Profile:</span>
                      <p>{sculpture.aromaProfile}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-[#824f2e] dark:text-[#cba258] block">Weight:</span>
                        <span className="font-mono text-sm font-medium">{sculpture.weightKg} Kilograms</span>
                      </div>
                      <div>
                        <span className="text-[#824f2e] dark:text-[#cba258] block">Sculpture Dimensions:</span>
                        <span className="font-mono text-sm font-medium">{sculpture.dimensions}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'conservation' && (
                  <div className="space-y-2.5">
                    <p>
                      Sandalwood heartwood should be kept away from direct persistent moisture and extreme radiant heating. Its natural oil preserves the structural integrity for centuries without artificial varnish.
                    </p>
                    <div className="p-2.5 rounded bg-[#f9f4ea] dark:bg-[#241710] text-[#7d5d44] dark:text-[#b49e8a]">
                      <strong>Global White-Glove Crated Transit:</strong> Shipped in custom foam-lined rosewood crates with tamper-evident seals and digital temperature monitoring.
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Contiguous Purchase & Inquiry Module */}
            <div className="pt-4 border-t border-[#ebdcc8] dark:border-[#332215] space-y-3">
              
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#d8c4ad] dark:border-[#422e1f] rounded-md overflow-hidden bg-[#f9f4ea] dark:bg-[#241710]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs hover:bg-[#ebdcc8] dark:hover:bg-[#382619] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-medium text-[#2b180d] dark:text-[#f8ede0]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(sculpture.stockQuantity, quantity + 1))}
                    className="px-3 py-2 text-xs hover:bg-[#ebdcc8] dark:hover:bg-[#382619] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Acquisitions</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Acquisitions ({formatCurrency(price * quantity, currency)})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Direct Inquiry / WhatsApp */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry(sculpture);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-[#d8c4ad] dark:border-[#422e1f] text-[#593520] dark:text-[#dfcaa7] hover:bg-[#f3e7d5] dark:hover:bg-[#241710] rounded-md text-xs font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#824f2e] dark:text-[#cba258]" />
                  <span>Curator Inquiry</span>
                </button>

                <a
                  href={`${STORE_INFO.whatsappUrl}&text=Hello%20Kala%20Fine%20Arts%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(sculpture.title)}%20(${sculpture.authenticityCertificateId})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-[#d8c4ad] dark:border-[#422e1f] text-[#593520] dark:text-[#dfcaa7] hover:bg-[#f3e7d5] dark:hover:bg-[#241710] rounded-md text-xs font-medium transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#824f2e] dark:text-[#cba258]" />
                  <span>WhatsApp Atelier</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
