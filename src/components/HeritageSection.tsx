import React from 'react';
import { Award, Feather, History, Trees } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-20 md:py-28 bg-[#f9f4ea] dark:bg-[#1a120c] border-y border-[#ebdcc8] dark:border-[#332215] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#824f2e] dark:text-[#cba258] font-medium mb-3">
            <History className="w-3.5 h-3.5" />
            <span>Sagar Gudigar Legacy</span>
            <span aria-hidden="true">·</span>
            <span>Western Ghats, Karnataka</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2b180d] dark:text-[#f8ede0] leading-tight">
            Centuries of Sacred Sandalwood Carving in Sagar
          </h2>
          
          <p className="mt-4 text-base text-[#614532] dark:text-[#c4ae99] font-light leading-relaxed">
            In the mist-draped Malnad town of Sagar, woodcarving is not merely an occupation—it is an unbroken hereditary sadhana practiced across centuries by the legendary Gudigar guild.
          </p>
        </div>

        {/* 3 Editorial Heritage Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          <div className="bg-[#fdfbf7] dark:bg-[#21160f] p-8 rounded-xl border border-[#e8dccb] dark:border-[#382619] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#f3e7d5] dark:bg-[#2f1f15] flex items-center justify-center text-[#824f2e] dark:text-[#cba258]">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
              The Gudigar Mastercarvers
            </h3>
            <p className="text-xs text-[#614532] dark:text-[#a8907b] leading-relaxed">
              Tracing ancestry to temple builders and court sculptors of the Vijayanagara and Keladi Nayaka realms, Sagar Gudigars employ over forty specialized miniature steel chisels to evoke gossamer garments, ornate temple arches, and micro-relief figures.
            </p>
          </div>

          <div className="bg-[#fdfbf7] dark:bg-[#21160f] p-8 rounded-xl border border-[#e8dccb] dark:border-[#382619] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#f3e7d5] dark:bg-[#2f1f15] flex items-center justify-center text-[#824f2e] dark:text-[#cba258]">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
              Grade A Mysore Santalum Album
            </h3>
            <p className="text-xs text-[#614532] dark:text-[#a8907b] leading-relaxed">
              Karnataka’s wild southern sandalwood possesses the world’s highest santalol concentration. The dense golden heartwood retains its sacred calming aroma for centuries without decaying, drying into a regal velvety honey-toned patina.
            </p>
          </div>

          <div className="bg-[#fdfbf7] dark:bg-[#21160f] p-8 rounded-xl border border-[#e8dccb] dark:border-[#382619] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#f3e7d5] dark:bg-[#2f1f15] flex items-center justify-center text-[#824f2e] dark:text-[#cba258]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
              Geographical Indication & Ethics
            </h3>
            <p className="text-xs text-[#614532] dark:text-[#a8907b] leading-relaxed">
              Every antique sculpture in Kala Fine Arts is accompanied by a registered certificate of provenance and legal verification adhering strictly to Karnataka State Forest Department guidelines and international antique trade laws.
            </p>
          </div>

        </div>

        {/* Curation Quote Strip */}
        <div id="provenance" className="mt-14 p-8 sm:p-10 rounded-xl bg-gradient-to-r from-[#f1e3ce] to-[#ebd7be] dark:from-[#2a1b12] dark:to-[#22150e] border border-[#dfcbb3] dark:border-[#3f2a1b]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-[#824f2e] dark:text-[#cba258]">
              Curator’s Declaration of Authenticity
            </p>
            <p className="font-serif text-xl sm:text-2xl text-[#2b180d] dark:text-[#f8ede0] italic leading-relaxed">
              "To hold a Sagar sandalwood sculpture is to touch five centuries of sacred devotion. Its fragrance is the memory of Karnataka’s oldest rainforests, preserved forever in devotional wood."
            </p>
            <div className="text-xs text-[#6e4e37] dark:text-[#c4ae99]">
              <span>Kala Fine Arts Atelier</span> · <span>SN Nagar, Sagar, Karnataka - 577401</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
