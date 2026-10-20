import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, Lock } from 'lucide-react';
import { STORE_INFO } from '../data/initialSculptures';

interface FooterProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, isAdminLoggedIn }) => {
  return (
    <footer className="bg-[#241710] text-[#eedec7] border-t border-[#3b271a] transition-colors duration-200">
      
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Story Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl font-medium tracking-tight text-[#f8ede0] block">
              {STORE_INFO.name}
            </span>
            <p className="text-xs uppercase tracking-widest text-[#cba258] font-medium">
              {STORE_INFO.niche}
            </p>
            <p className="text-xs text-[#c4ae99] leading-relaxed max-w-sm font-light">
              Preserving Karnataka’s sacred sandalwood carving heritage. Monolithic antique heartwood sculptures curated with verified historical provenance, government forest clearance, and lifetime natural aroma guarantee.
            </p>
          </div>

          {/* Sagar Atelier Particulars */}
          <div className="lg:col-span-4 space-y-3 text-xs text-[#c4ae99]">
            <span className="font-serif text-lg text-[#f8ede0] block font-medium">
              Sagar Atelier & Archive
            </span>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-[#cba258] shrink-0 mt-0.5" />
              <span>{STORE_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-3.5 h-3.5 text-[#cba258] shrink-0" />
              <a href={STORE_INFO.telUrl} className="hover:text-white transition-colors">
                {STORE_INFO.mobileDisplay}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5 text-[#cba258] shrink-0" />
              <a href={STORE_INFO.mailUrl} className="hover:text-white transition-colors">
                {STORE_INFO.email}
              </a>
            </div>
          </div>

          {/* Curatorial & Legal Column */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#c4ae99]">
            <span className="font-serif text-lg text-[#f8ede0] block font-medium">
              Provenance & Security
            </span>

            <p className="text-[11px] leading-relaxed text-[#a8907b]">
              All antique sandalwood items are certified under the Karnataka Forest Act & Antiquities and Art Treasures Act. Protected white-glove transport with tamper-evident dossiers.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-[#cba258] hover:underline font-medium cursor-pointer"
                aria-label="Access Curator Portal"
              >
                <Lock className="w-3 h-3" />
                <span>{isAdminLoggedIn ? 'Open Curator Dashboard' : 'Curator & Archival Portal'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Strip */}
      <div className="border-t border-[#3b271a] bg-[#1a100a] py-6 text-xs text-[#9e836f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {STORE_INFO.name}. All Rights Reserved. Sagar, Karnataka, India.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Sagar Gudigar Legacy</span>
            <span aria-hidden="true">·</span>
            <span>Registered Heritage Provenance</span>
            <span aria-hidden="true">·</span>
            <span>CITES Timber Compliance</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
