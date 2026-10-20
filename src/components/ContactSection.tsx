import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { CustomerInquiry, Sculpture } from '../types';
import { STORE_INFO } from '../data/initialSculptures';
import { validateInquiryForm } from '../utils/shopLogic';

interface ContactSectionProps {
  sculptures: Sculpture[];
  inquirySculpture: Sculpture | null;
  onClearInquirySculpture: () => void;
  onSubmitInquiry: (inquiry: CustomerInquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  sculptures,
  inquirySculpture,
  onClearInquirySculpture,
  onSubmitInquiry
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSculptureId, setSelectedSculptureId] = useState<string>(inquirySculpture?.id || '');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync if an inquiry sculpture was passed via quick view
  React.useEffect(() => {
    if (inquirySculpture) {
      setSelectedSculptureId(inquirySculpture.id);
      setMessage(`I am interested in acquiring or learning more about the "${inquirySculpture.title}" (${inquirySculpture.authenticityCertificateId}).`);
    }
  }, [inquirySculpture]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm({ name, email, phone, message });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const matchingSculpture = sculptures.find((s) => s.id === selectedSculptureId);

    const newInquiry: CustomerInquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone,
      sculptureId: matchingSculpture?.id,
      sculptureTitle: matchingSculpture?.title,
      message,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    onSubmitInquiry(newInquiry);
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClearInquirySculpture();
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FDFBF7] dark:bg-[#18120e] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#824f2e] dark:text-[#cba258] font-medium mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sagar Atelier & Archive</span>
            <span aria-hidden="true">·</span>
            <span>Private Consultations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2b180d] dark:text-[#f8ede0]">
            Connect With Our Master Curators
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#614532] dark:text-[#c4ae99] font-light leading-relaxed">
            Whether you wish to arrange a private atelier viewing in Sagar, inquire about specific antique provenance, or commission an authentic heirloom carving, our archivist is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Left Column: Direct Atelier Credentials & Address */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Atelier Card */}
            <div className="p-8 rounded-2xl bg-[#f9f4ea] dark:bg-[#21160f] border border-[#ebdcc8] dark:border-[#332215] space-y-6">
              
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
                  {STORE_INFO.name}
                </h3>
                <p className="text-xs text-[#824f2e] dark:text-[#cba258] mt-1 font-medium">
                  {STORE_INFO.niche}
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#523824] dark:text-[#c4ae99]">
                
                {/* Physical Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#824f2e] dark:text-[#cba258] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2b180d] dark:text-[#f8ede0] block mb-0.5">Atelier & Gallery Address</span>
                    <p className="leading-relaxed">{STORE_INFO.address}</p>
                    <span className="text-[11px] text-[#7d5d44] dark:text-[#9e836f] block mt-0.5">Near Jog Falls Road Corridor, Western Ghats Region</span>
                  </div>
                </div>

                {/* Direct Telephone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#824f2e] dark:text-[#cba258] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2b180d] dark:text-[#f8ede0] block mb-0.5">Telephone / Mobile</span>
                    <a 
                      href={STORE_INFO.telUrl} 
                      className="font-mono text-sm hover:underline text-[#2b180d] dark:text-[#f8ede0]"
                    >
                      {STORE_INFO.mobileDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#824f2e] dark:text-[#cba258] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2b180d] dark:text-[#f8ede0] block mb-0.5">Direct Curatorial Email</span>
                    <a 
                      href={STORE_INFO.mailUrl} 
                      className="hover:underline text-[#2b180d] dark:text-[#f8ede0]"
                    >
                      {STORE_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Visiting Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#824f2e] dark:text-[#cba258] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2b180d] dark:text-[#f8ede0] block mb-0.5">Viewing Sessions</span>
                    <p>Monday to Saturday: 10:00 AM – 7:30 PM IST</p>
                    <span className="text-[11px] text-[#7d5d44] dark:text-[#9e836f]">Prior appointment recommended for rare vault viewing</span>
                  </div>
                </div>

              </div>

              {/* Direct Instant Actions */}
              <div className="pt-4 border-t border-[#ebdcc8] dark:border-[#382619] flex flex-wrap gap-3">
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold tracking-wide transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Atelier</span>
                </a>

                <a
                  href={STORE_INFO.telUrl}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#c4af98] dark:border-[#422e1f] text-[#42251a] dark:text-[#dfcaa7] hover:bg-[#f3e7d5] dark:hover:bg-[#281b12] rounded-md text-xs font-semibold tracking-wide transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#824f2e] dark:text-[#cba258]" />
                  <span>Direct Call</span>
                </a>
              </div>

            </div>

            {/* Geographical Indication Seal Notice */}
            <div className="p-4 rounded-xl border border-[#e2d0b8] dark:border-[#382619] bg-[#faf5eb] dark:bg-[#1a120c] flex items-center gap-3 text-xs text-[#74553f] dark:text-[#a8907b]">
              <ShieldCheck className="w-5 h-5 text-[#824f2e] dark:text-[#cba258] shrink-0" />
              <span>Certified under Karnataka Heritage Forest Product Safeguards and legal sandalwood transit registry.</span>
            </div>

          </div>

          {/* Right Column: Interactive Customer Inquiry Form */}
          <div className="lg:col-span-7 bg-[#faf5eb] dark:bg-[#1c140e] p-8 sm:p-10 rounded-2xl border border-[#ebdcc8] dark:border-[#332215]">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
                  Inquiry Received by Atelier
                </h3>
                <p className="text-xs sm:text-sm text-[#614532] dark:text-[#c4ae99] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Kala Fine Arts. Your dossier inquiry has been routed to our Sagar atelier. We will respond within 4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs font-semibold bg-[#42251a] dark:bg-[#cba258] text-[#fdfbf7] dark:text-[#23130c] rounded-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
                    Inquire On Sculptures or Private Commission
                  </h3>
                  <p className="text-xs text-[#74553f] dark:text-[#bca48f] mt-1 font-light">
                    Direct communication with the Sagar workshop curators.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. S. Krishnamurthy"
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                    />
                    {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="collector@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 80889 75184"
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                      Sculpture of Interest (Optional)
                    </label>
                    <select
                      value={selectedSculptureId}
                      onChange={(e) => setSelectedSculptureId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                    >
                      <option value="">General Collection Inquiry</option>
                      {sculptures.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.era})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
                    Your Message / Specific Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify if you require export customs documentation, private viewing in Sagar, or high-resolution microscopic wood grain photographs..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-0.5">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Curatorial Inquiry</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
