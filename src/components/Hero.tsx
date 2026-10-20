import React from 'react';
import { ArrowRight, Compass, Award, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/initialSculptures';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] dark:bg-[#18120e] transition-colors duration-200">
      
      {/* Background ambient decorative motif */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#f1e4ce] dark:bg-[#3b2216] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#e4cbb0] dark:bg-[#23130c] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Story & Typography */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#824f2e] dark:text-[#cba258]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sagar, Karnataka</span>
              <span aria-hidden="true">·</span>
              <span>Centuries-Old Gudigar Guild</span>
              <span aria-hidden="true">·</span>
              <span>Certified Santalum Album</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2b180d] dark:text-[#f8ede0] leading-[1.12] [text-wrap:balance]">
              Rare Handcrafted Antique Sandalwood Sculptures
            </h1>

            {/* Curated Subtitle */}
            <p className="text-base sm:text-lg text-[#614532] dark:text-[#c9b4a1] max-w-2xl leading-relaxed font-light">
              Preserved across generations in the sacred timber groves of Malnad. Each masterwork is chiseled by ancestral Gudigar sculptors from monolithic antique heartwood, exuding timeless natural fragrance and divine reverence.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md font-medium text-sm tracking-wide transition-all shadow-sm hover:shadow-md group whitespace-nowrap cursor-pointer"
              >
                <span>Explore The Masterworks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#c4af98] dark:border-[#523b2a] text-[#42251a] dark:text-[#dfcaa7] hover:bg-[#f3e7d5] dark:hover:bg-[#241710] rounded-md font-medium text-sm tracking-wide transition-colors whitespace-nowrap cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#824f2e] dark:text-[#cba258]" />
                <span>Private Atelier Viewing</span>
              </button>
            </div>

            {/* Quick Proof Footnote */}
            <div className="pt-4 border-t border-[#ebdcc8] dark:border-[#382619] flex flex-wrap items-center gap-6 text-xs text-[#7d5d44] dark:text-[#a8907b]">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#a4693b] dark:text-[#cba258]" />
                <span>Government Certified Heartwood</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#a4693b] dark:text-[#cba258]" />
                <span>Individually Registered Provenance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#a4693b] dark:text-[#cba258]" />
                <span>Perpetual Natural Aroma</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Editorial Hero Artwork Showcase */}
          <div className="lg:col-span-5">
            <div className="relative group">
              
              {/* Outer decorative frame */}
              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#f5ebd9] to-[#eedbc1] dark:from-[#2a1b12] dark:to-[#1a110a] border border-[#e2d0b8] dark:border-[#3f2a1b] shadow-xl">
                
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-lg bg-[#2b180d]">
                  <img
                    src="/src/assets/images/sandalwood_hero_craft_1792228799061.jpg"
                    alt="Master craftsman hand-carving a sandalwood sculpture at Kala Fine Arts atelier in Sagar"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Atmospheric contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Curated Overlay Tag on Artwork */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] uppercase tracking-widest text-[#e4cbb0] font-medium">
                      Atelier Documentation · Sagar
                    </p>
                    <p className="font-serif text-lg sm:text-xl font-normal text-white">
                      The Living Heritage of Sacred Sandalwood Carving
                    </p>
                  </div>
                </div>

                {/* Sub-strip detail */}
                <div className="mt-3.5 px-2 flex items-center justify-between text-xs text-[#6e4e37] dark:text-[#c4ae99]">
                  <span className="font-medium">Direct Atelier Contact:</span>
                  <a 
                    href={STORE_INFO.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#824f2e] dark:text-[#cba258] hover:underline font-semibold"
                  >
                    {STORE_INFO.mobileDisplay}
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 4-Column Full-Width Trust Strip */}
      <div className="border-y border-[#ebdcc8] dark:border-[#332215] bg-[#f9f4ea] dark:bg-[#1f1611]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="space-y-1">
              <p className="font-serif text-lg font-medium text-[#351e11] dark:text-[#f8ede0]">
                100% Genuine Heartwood
              </p>
              <p className="text-xs text-[#74553f] dark:text-[#b49e8a]">
                Aged Mysore Santalum album with legal forest certification
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-serif text-lg font-medium text-[#351e11] dark:text-[#f8ede0]">
                Sagar Gudigar Tradition
              </p>
              <p className="text-xs text-[#74553f] dark:text-[#b49e8a]">
                Multi-generational artisan guild mastering micro-relief filigree
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-serif text-lg font-medium text-[#351e11] dark:text-[#f8ede0]">
                Insured Crated Transit
              </p>
              <p className="text-xs text-[#74553f] dark:text-[#b49e8a]">
                Museum-grade climate packing with door-to-door global insurance
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-serif text-lg font-medium text-[#351e11] dark:text-[#f8ede0]">
                Certificate of Provenance
              </p>
              <p className="text-xs text-[#74553f] dark:text-[#b49e8a]">
                Individual gallery dossier with registered serial ID & seal
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
