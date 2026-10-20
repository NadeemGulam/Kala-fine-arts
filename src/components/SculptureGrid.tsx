import React, { useState, useMemo } from 'react';
import { Search, Eye, ShoppingBag, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { Currency, Sculpture } from '../types';
import { formatCurrency, filterSculptures } from '../utils/shopLogic';

interface SculptureGridProps {
  sculptures: Sculpture[];
  currency: Currency;
  onSelectSculpture: (sculpture: Sculpture) => void;
  onAddToCart: (sculpture: Sculpture) => void;
}

export const SculptureGrid: React.FC<SculptureGridProps> = ({
  sculptures,
  currency,
  onSelectSculpture,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const categories = ['All', 'Deity', 'Celestial', 'Royal'];
  const eras = ['All', '18th Century', '19th Century'];

  const filteredItems = useMemo(() => {
    return filterSculptures(sculptures, {
      query: searchQuery,
      category: selectedCategory,
      era: selectedEra
    });
  }, [sculptures, searchQuery, selectedCategory, selectedEra]);

  const handleQuickAdd = (item: Sculpture, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedNoticeId(item.id);
    setTimeout(() => {
      setAddedNoticeId((current) => (current === item.id ? null : current));
    }, 1800);
  };

  return (
    <section id="collection" className="py-16 md:py-24 bg-[#FDFBF7] dark:bg-[#18120e] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#ebdcc8] dark:border-[#332215]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#824f2e] dark:text-[#cba258] font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curation Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Monolithic Antique Carvings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2b180d] dark:text-[#f8ede0]">
              The Rare Sandalwood Collection
            </h2>
          </div>

          <p className="text-sm text-[#614532] dark:text-[#c9b4a1] max-w-md font-light leading-relaxed">
            Every artefact in our gallery is an irreplaceable historical piece, carved strictly from mature aged sandalwood heartwood retaining its sacred natural aroma.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f3e7d5] dark:bg-[#241710] rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#42251a] text-[#fdfbf7] dark:bg-[#cba258] dark:text-[#23130c] shadow-sm'
                    : 'text-[#6e4e37] dark:text-[#bca48f] hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
                }`}
              >
                {cat === 'All' ? 'All Masterpieces' : cat}
              </button>
            ))}
          </div>

          {/* Era & Search Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Era Filter Selector */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f3e7d5]/70 dark:bg-[#241710]/80 rounded-lg border border-[#e2d0b8] dark:border-[#382619]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#824f2e] dark:text-[#cba258]" />
              <label htmlFor="era-select" className="text-xs text-[#74553f] dark:text-[#b49e8a] whitespace-nowrap">Era:</label>
              <select
                id="era-select"
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                className="bg-transparent text-xs font-medium text-[#3b2216] dark:text-[#f8ede0] focus:outline-none cursor-pointer"
              >
                {eras.map((era) => (
                  <option key={era} value={era} className="bg-[#fdfbf7] dark:bg-[#1f1611] text-[#3b2216] dark:text-[#f8ede0]">
                    {era === 'All' ? 'All Eras' : era}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#824f2e] dark:text-[#cba258] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search deities, themes, origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f9f4ea] dark:bg-[#241710] border border-[#e2d0b8] dark:border-[#382619] rounded-lg text-[#3b2216] dark:text-[#f8ede0] placeholder-[#9a7d65] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
              />
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="pb-6 text-xs text-[#824f2e] dark:text-[#cba258] flex items-center justify-between font-mono">
          <span>Displaying {filteredItems.length} authenticated sculpture{filteredItems.length === 1 ? '' : 's'}</span>
          <span>Currency: {currency}</span>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 px-4 border border-dashed border-[#d8c4ad] dark:border-[#3a271c] rounded-xl bg-[#faf5eb] dark:bg-[#1a120c]">
            <p className="font-serif text-2xl text-[#42251a] dark:text-[#f8ede0] mb-2">No sculptures match this inquiry</p>
            <p className="text-sm text-[#74553f] dark:text-[#bca48f] max-w-md mx-auto mb-6">
              Our archivist frequently updates our private collection of authenticated Sagar antique carvings. Try adjusting your search or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedEra('All');
              }}
              className="px-4 py-2 text-xs font-medium bg-[#42251a] dark:bg-[#cba258] text-[#fdfbf7] dark:text-[#23130c] rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {filteredItems.map((item) => {
              const currentPrice = currency === 'INR' ? item.priceINR : item.priceUSD;
              const isAdded = addedNoticeId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectSculpture(item)}
                  className="group relative flex flex-col bg-[#faf5eb] dark:bg-[#1c140e] border border-[#e8dccb] dark:border-[#332215] rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  
                  {/* Image Container (65-75% visual prominence) */}
                  <div className="relative aspect-[4/3] bg-[#29170c] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Subtle authenticity watermark pill replacement: Clean text badge */}
                    <div className="absolute top-4 left-4 text-[11px] font-medium tracking-wider uppercase text-white/90 drop-shadow-md bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.authenticityCertificateId}
                    </div>

                    {/* Hover Quick View Overlay Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FDFBF7]/95 dark:bg-[#18120e]/95 text-[#2b180d] dark:text-[#f8ede0] rounded-md text-xs font-semibold shadow-lg backdrop-blur-sm">
                        <Eye className="w-3.5 h-3.5 text-[#a4693b] dark:text-[#cba258]" />
                        Inspect Grain & Provenance
                      </span>
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                      <span className="font-light tracking-wide">{item.dimensions}</span>
                      <span className="font-mono">{item.weightKg} kg Heartwood</span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div>
                      {/* Unboxed Metadata (Zero-Pill Rule) */}
                      <div className="flex items-center gap-2 text-xs text-[#824f2e] dark:text-[#cba258] mb-1.5 font-medium">
                        <span>{item.era}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate max-w-[150px]">{item.woodOrigin.split(',')[0]}</span>
                      </div>

                      {/* Sculpture Title */}
                      <h3 className="font-serif text-2xl font-medium text-[#2b180d] dark:text-[#f8ede0] group-hover:text-[#a4693b] dark:group-hover:text-[#cba258] transition-colors">
                        {item.title}
                      </h3>

                      {/* Subtitle / Iconography */}
                      <p className="text-xs text-[#74553f] dark:text-[#bca48f] line-clamp-1 mt-0.5 font-light">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs text-[#614532] dark:text-[#a8907b] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bottom Price & Direct Buy Strip */}
                    <div className="pt-4 border-t border-[#ebdcc8] dark:border-[#2e1d13] flex items-center justify-between gap-4">
                      
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#824f2e] dark:text-[#cba258] block">
                          Acquisition Value
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-semibold text-[#2b180d] dark:text-[#f8ede0] tabular-nums">
                          {formatCurrency(currentPrice, currency)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleQuickAdd(item, e)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c]'
                          }`}
                          aria-label={`Acquire ${item.title}`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Acquire</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
