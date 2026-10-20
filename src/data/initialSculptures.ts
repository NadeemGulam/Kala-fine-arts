import { Sculpture } from '../types';
import {
  apsaraImage,
  elephantImage,
  ganeshaImage,
  heroImage,
  natarajaImage,
} from './imageAssets';

export const INITIAL_SCULPTURES: Sculpture[] = [
  {
    id: 'kala-001',
    title: 'Ananda Tandava Nataraja',
    subtitle: 'Cosmic Dancer with Prabhavali Aureole of Flames',
    category: 'Deity',
    era: '18th Century',
    priceINR: 425000,
    priceUSD: 5100,
    dimensions: '28" H × 18" W × 7" D',
    weightKg: 8.4,
    aromaProfile: 'Deep balsamic, sweet creamy wood with subtle cedar and honey undertones, remarkably preserved over two centuries.',
    provenance: 'Acquired from a private aristocratic heritage collection in Srirangapatna; carved by senior Mysore court guild masters.',
    woodOrigin: 'Grade A Mysore Heartwood (Santalum album), Southern Malnad Forest Reserve',
    authenticityCertificateId: 'KFA-1788-NAT-092',
    stockQuantity: 1,
    image: natarajaImage,
    additionalImages: [
      natarajaImage,
      heroImage
    ],
    featured: true,
    description: 'A sublime representation of Lord Shiva performing the cosmic dance of creation and dissolution. Carved from a monolithic block of ancient heartwood sandalwood, the figure showcases exquisite anatomical mastery, floating locks crowned with the river Ganga, and a tiered lotus pedestal.',
    artisanStory: 'Crafted over nine months by ancestral Gudigar sculptors whose techniques have been handed down since the Hoysala dynasty.'
  },
  {
    id: 'kala-002',
    title: 'Mahaganapati on Floral Lotus Throne',
    subtitle: 'Supreme Remover of Obstacles with Ornate Arch',
    category: 'Deity',
    era: '19th Century',
    priceINR: 340000,
    priceUSD: 4080,
    dimensions: '22" H × 15" W × 6" D',
    weightKg: 6.8,
    aromaProfile: 'Rich warm amber notes with intense creamy sandalwood essence released on ambient temperature rise.',
    provenance: 'Preserved by a Sagar temple endowment trust; certified genuine aged Santalum album with micro-fracture patina.',
    woodOrigin: 'Sagar-Soraba Sacred Grove Reserve, Karnataka, India',
    authenticityCertificateId: 'KFA-1845-GAN-114',
    stockQuantity: 1,
    image: ganeshaImage,
    additionalImages: [
      ganeshaImage
    ],
    featured: true,
    description: 'This museum-grade Ganesha embodies divine serenity and benevolence. The arched prabhavali features openwork micro-carved vines, celestial yalis, and a Kirtimukha crest. Ganesha holds his broken tusk and pasha cord in delicate relief.',
    artisanStory: 'Originating from the legendary Sagar Gudigar woodcarving guild, recognized worldwide for unrivaled micro-chisel lace work.'
  },
  {
    id: 'kala-003',
    title: 'Surasundari Playing Sacred Veena',
    subtitle: 'Celestial Apsara with Gossamer Drapery',
    category: 'Celestial',
    era: '18th Century',
    priceINR: 390000,
    priceUSD: 4680,
    dimensions: '26" H × 14" W × 6.5" D',
    weightKg: 7.2,
    aromaProfile: 'Lush floral sandalwood with warm butter notes and enduring natural essential oil richness.',
    provenance: 'Previously documented in a French colonial private salon collection; repatriated to Karnataka in 1984.',
    woodOrigin: 'Shimoga Old Growth Sandalwood Forest, Karnataka',
    authenticityCertificateId: 'KFA-1794-APS-048',
    stockQuantity: 1,
    image: apsaraImage,
    additionalImages: [
      apsaraImage
    ],
    featured: true,
    description: 'Depicting a celestial court maiden immersed in devotion as she plucks melodies on the Saraswati veena. Notice the micro-folds of the flowing waist-sash and the ornate jeweled headdress rendered with needle-fine steel gouges.',
    artisanStory: 'Reflects the pinnacle of Karnataka temple sculpture aesthetics, translating stone temple friezes into warm, fragrant wood.'
  },
  {
    id: 'kala-004',
    title: 'Imperial Royal Ceremonial Elephant',
    subtitle: 'Processional Tusker with Pierced Jaali Howdah Carriage',
    category: 'Royal',
    era: '19th Century',
    priceINR: 520000,
    priceUSD: 6240,
    dimensions: '30" H × 24" W × 10" D',
    weightKg: 12.5,
    aromaProfile: 'Profoundly grounding dry wood fragrance with hints of vetiver, amber, and aged balsamic heartwood.',
    provenance: 'Commissioned for the festive Dasara Durbar celebrations of the Kingdom of Mysore; acquired at auction.',
    woodOrigin: 'Mysore-Coorg Forest Belt, Southern Karnataka',
    authenticityCertificateId: 'KFA-1870-ELE-007',
    stockQuantity: 1,
    image: elephantImage,
    additionalImages: [
      elephantImage
    ],
    featured: true,
    description: 'An extraordinary antique masterpiece featuring an imperial royal elephant outfitted in ceremonial caparison with bell tassels. The crowning glory is the perforated howdah (pavilion) carved with intricate geometric jaali latticework containing seated royal courtiers.',
    artisanStory: 'Demonstrates the world-famous "Jaali" (lattice) carving technique unique to the master woodcarvers of Sagar.'
  }
];

export const STORE_INFO = {
  name: 'Kala Fine Arts',
  niche: 'Luxury Antique Sandalwood Sculptures & Handcrafted Artefacts',
  email: 'angeerasan@gmail.com',
  mobile: '+91 8088975184',
  mobileDisplay: '+91 80889 75184',
  address: '3rd Main, 4th Cross, SN Nagar, Sagar - 577401, Karnataka, India',
  city: 'Sagar',
  pincode: '577401',
  state: 'Karnataka',
  country: 'India',
  whatsappUrl: 'https://wa.me/918088975184?text=Hello%20Kala%20Fine%20Arts%2C%20I%20am%20inquiring%20about%20your%20antique%20sandalwood%20sculptures%20collection.',
  telUrl: 'tel:+918088975184',
  mailUrl: 'mailto:angeerasan@gmail.com'
};
