import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, ShieldCheck, LogOut, ArrowLeft, 
  Package, Inbox, DollarSign, Database, Check, Clock, 
  Phone, Mail, MessageSquare, Download, RefreshCw, X 
} from 'lucide-react';
import { CustomerInquiry, Order, Sculpture, Currency } from '../types';
import { formatCurrency } from '../utils/shopLogic';
import { STORE_INFO } from '../data/initialSculptures';

interface AdminDashboardProps {
  sculptures: Sculpture[];
  inquiries: CustomerInquiry[];
  orders: Order[];
  currency: Currency;
  onUpdateSculptures: (sculptures: Sculpture[]) => void;
  onUpdateInquiries: (inquiries: CustomerInquiry[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  sculptures,
  inquiries,
  orders,
  currency,
  onUpdateSculptures,
  onUpdateInquiries,
  onUpdateOrders,
  onClose,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries' | 'orders' | 'supabase'>('inventory');
  
  // Sculpture Modal State
  const [isSculptureModalOpen, setIsSculptureModalOpen] = useState(false);
  const [editingSculpture, setEditingSculpture] = useState<Sculpture | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<'Deity' | 'Celestial' | 'Royal' | 'Artefact'>('Deity');
  const [formEra, setFormEra] = useState<'18th Century' | '19th Century' | 'Early 20th Century' | 'Contemporary Masterwork'>('19th Century');
  const [formPriceINR, setFormPriceINR] = useState(350000);
  const [formPriceUSD, setFormPriceUSD] = useState(4200);
  const [formDimensions, setFormDimensions] = useState('24" H × 14" W × 6" D');
  const [formWeightKg, setFormWeightKg] = useState(6.5);
  const [formAromaProfile, setFormAromaProfile] = useState('Creamy sandalwood heartwood with balsam and amber notes.');
  const [formProvenance, setFormProvenance] = useState('Acquired from heritage Sagar family collection; certified old-growth Santalum album.');
  const [formWoodOrigin, setFormWoodOrigin] = useState('Sagar-Shimoga Forest Belt, Karnataka, India');
  const [formCertId, setFormCertId] = useState(`KFA-${new Date().getFullYear()}-NEW-${Math.floor(100 + Math.random() * 900)}`);
  const [formStock, setFormStock] = useState(1);
  const [formImage, setFormImage] = useState('/src/assets/images/sculpture_nataraja_1792228799213.jpg');
  const [formDescription, setFormDescription] = useState('Hand-carved antique sandalwood sculpture with exquisite micro-relief details.');
  const [formArtisanStory, setFormArtisanStory] = useState('Crafted by Sagar Gudigar sculptors.');

  // Open modal for new item
  const handleOpenAdd = () => {
    setEditingSculpture(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormCategory('Deity');
    setFormEra('19th Century');
    setFormPriceINR(350000);
    setFormPriceUSD(4200);
    setFormDimensions('24" H × 14" W × 6" D');
    setFormWeightKg(6.5);
    setFormAromaProfile('Creamy sandalwood heartwood with balsam and amber notes.');
    setFormProvenance('Acquired from heritage Sagar family collection; certified old-growth Santalum album.');
    setFormWoodOrigin('Sagar-Shimoga Forest Belt, Karnataka, India');
    setFormCertId(`KFA-${Math.floor(1800 + Math.random() * 100)}-GEN-${Math.floor(100 + Math.random() * 900)}`);
    setFormStock(1);
    setFormImage('/src/assets/images/sculpture_nataraja_1792228799213.jpg');
    setFormDescription('Hand-carved antique sandalwood sculpture with exquisite micro-relief details.');
    setFormArtisanStory('Crafted by Sagar Gudigar sculptors.');
    setIsSculptureModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (sculpture: Sculpture) => {
    setEditingSculpture(sculpture);
    setFormTitle(sculpture.title);
    setFormSubtitle(sculpture.subtitle);
    setFormCategory(sculpture.category);
    setFormEra(sculpture.era);
    setFormPriceINR(sculpture.priceINR);
    setFormPriceUSD(sculpture.priceUSD);
    setFormDimensions(sculpture.dimensions);
    setFormWeightKg(sculpture.weightKg);
    setFormAromaProfile(sculpture.aromaProfile);
    setFormProvenance(sculpture.provenance);
    setFormWoodOrigin(sculpture.woodOrigin);
    setFormCertId(sculpture.authenticityCertificateId);
    setFormStock(sculpture.stockQuantity);
    setFormImage(sculpture.image);
    setFormDescription(sculpture.description);
    setFormArtisanStory(sculpture.artisanStory);
    setIsSculptureModalOpen(true);
  };

  // Save Add/Edit
  const handleSaveSculpture = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSculpture) {
      // Edit
      const updated = sculptures.map((item) => {
        if (item.id === editingSculpture.id) {
          return {
            ...item,
            title: formTitle,
            subtitle: formSubtitle,
            category: formCategory,
            era: formEra,
            priceINR: Number(formPriceINR),
            priceUSD: Number(formPriceUSD),
            dimensions: formDimensions,
            weightKg: Number(formWeightKg),
            aromaProfile: formAromaProfile,
            provenance: formProvenance,
            woodOrigin: formWoodOrigin,
            authenticityCertificateId: formCertId,
            stockQuantity: Number(formStock),
            image: formImage,
            description: formDescription,
            artisanStory: formArtisanStory
          };
        }
        return item;
      });
      onUpdateSculptures(updated);
    } else {
      // Add
      const newSculpture: Sculpture = {
        id: `kala-${Date.now()}`,
        title: formTitle,
        subtitle: formSubtitle,
        category: formCategory,
        era: formEra,
        priceINR: Number(formPriceINR),
        priceUSD: Number(formPriceUSD),
        dimensions: formDimensions,
        weightKg: Number(formWeightKg),
        aromaProfile: formAromaProfile,
        provenance: formProvenance,
        woodOrigin: formWoodOrigin,
        authenticityCertificateId: formCertId,
        stockQuantity: Number(formStock),
        image: formImage,
        featured: true,
        description: formDescription,
        artisanStory: formArtisanStory
      };
      onUpdateSculptures([newSculpture, ...sculptures]);
    }
    setIsSculptureModalOpen(false);
  };

  // Delete
  const handleDeleteSculpture = (id: string) => {
    if (window.confirm('Are you sure you want to retire this sculpture from the catalog?')) {
      const remaining = sculptures.filter((item) => item.id !== id);
      onUpdateSculptures(remaining);
    }
  };

  // Update Inquiry Status
  const handleToggleInquiryStatus = (id: string, newStatus: CustomerInquiry['status']) => {
    const updated = inquiries.map((inq) => inq.id === id ? { ...inq, status: newStatus } : inq);
    onUpdateInquiries(updated);
  };

  // Update Order Status
  const handleToggleOrderStatus = (id: string, newStatus: Order['status']) => {
    const updated = orders.map((ord) => ord.id === id ? { ...ord, status: newStatus } : ord);
    onUpdateOrders(updated);
  };

  // Calculations
  const totalValuationINR = sculptures.reduce((sum, s) => sum + s.priceINR, 0);
  const totalOrdersRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingInquiriesCount = inquiries.filter((i) => i.status !== 'replied').length;

  return (
    <div className="fixed inset-0 z-50 bg-[#FDFBF7] dark:bg-[#140e0a] text-[#2b180d] dark:text-[#f8ede0] flex flex-col overflow-y-auto">
      
      {/* Top Admin Header */}
      <div className="border-b border-[#e2d0b8] dark:border-[#382619] bg-[#f9f4ea] dark:bg-[#1a120c] px-4 sm:px-8 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#d8c4ad] dark:border-[#422e1f] text-xs font-semibold hover:bg-[#ebdcc8] dark:hover:bg-[#281b12] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight">
              Kala Fine Arts Curator Portal
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#824f2e] text-white">
              Sagar Ledger
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-xl bg-[#faf5eb] dark:bg-[#1c140e] border border-[#ebdcc8] dark:border-[#332215] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#824f2e] dark:text-[#cba258]">
              <span>Active Sculptures</span>
              <Package className="w-4 h-4" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold tabular-nums">{sculptures.length}</p>
            <p className="text-[11px] text-[#74553f] dark:text-[#a8907b]">Museum Grade Catalog</p>
          </div>

          <div className="p-5 rounded-xl bg-[#faf5eb] dark:bg-[#1c140e] border border-[#ebdcc8] dark:border-[#332215] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#824f2e] dark:text-[#cba258]">
              <span>Catalog Valuation</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-semibold tabular-nums">
              {formatCurrency(totalValuationINR, 'INR')}
            </p>
            <p className="text-[11px] text-[#74553f] dark:text-[#a8907b]">Authenticated Assets</p>
          </div>

          <div className="p-5 rounded-xl bg-[#faf5eb] dark:bg-[#1c140e] border border-[#ebdcc8] dark:border-[#332215] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#824f2e] dark:text-[#cba258]">
              <span>Acquisition Orders</span>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold tabular-nums">{orders.length}</p>
            <p className="text-[11px] text-[#74553f] dark:text-[#a8907b]">
              {orders.length > 0 ? formatCurrency(totalOrdersRevenue, currency) : 'No orders yet'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#faf5eb] dark:bg-[#1c140e] border border-[#ebdcc8] dark:border-[#332215] space-y-1">
            <div className="flex items-center justify-between text-xs text-[#824f2e] dark:text-[#cba258]">
              <span>Pending Enquiries</span>
              <Inbox className="w-4 h-4" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-semibold tabular-nums text-[#824f2e] dark:text-[#cba258]">
              {pendingInquiriesCount}
            </p>
            <p className="text-[11px] text-[#74553f] dark:text-[#a8907b]">{inquiries.length} Total Messages</p>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#ebdcc8] dark:border-[#332215] gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
              activeTab === 'inventory'
                ? 'border-[#824f2e] text-[#824f2e] dark:border-[#cba258] dark:text-[#cba258]'
                : 'border-transparent text-[#74553f] dark:text-[#a8907b] hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
            }`}
          >
            Inventory Management ({sculptures.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
              activeTab === 'inquiries'
                ? 'border-[#824f2e] text-[#824f2e] dark:border-[#cba258] dark:text-[#cba258]'
                : 'border-transparent text-[#74553f] dark:text-[#a8907b] hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
            }`}
          >
            Customer Enquiries ({inquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#824f2e] text-[#824f2e] dark:border-[#cba258] dark:text-[#cba258]'
                : 'border-transparent text-[#74553f] dark:text-[#a8907b] hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
            }`}
          >
            Orders & Acquisitions ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
              activeTab === 'supabase'
                ? 'border-[#824f2e] text-[#824f2e] dark:border-[#cba258] dark:text-[#cba258]'
                : 'border-transparent text-[#74553f] dark:text-[#a8907b] hover:text-[#2b180d] dark:hover:text-[#f8ede0]'
            }`}
          >
            Supabase Ledger Architecture
          </button>
        </div>

        {/* Tab 1: Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-medium">Antique Sandalwood Inventory</h3>
                <p className="text-xs text-[#74553f] dark:text-[#a8907b]">
                  Registered antiquities with certificate tags and stock levels.
                </p>
              </div>

              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md text-xs font-semibold cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Sculpture</span>
              </button>
            </div>

            <div className="border border-[#ebdcc8] dark:border-[#332215] rounded-xl overflow-hidden bg-[#faf5eb] dark:bg-[#1a120c]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f3e7d5] dark:bg-[#241710] border-b border-[#ebdcc8] dark:border-[#382619] text-[#74553f] dark:text-[#c4ae99] font-medium">
                    <tr>
                      <th className="p-3.5">Sculpture</th>
                      <th className="p-3.5">Era & Category</th>
                      <th className="p-3.5">Weight / Dims</th>
                      <th className="p-3.5">Price (INR / USD)</th>
                      <th className="p-3.5">Certificate ID</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebdcc8] dark:divide-[#2e1d13]">
                    {sculptures.map((item) => (
                      <tr key={item.id} className="hover:bg-[#f5ebd9] dark:hover:bg-[#221710] transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded object-cover bg-black"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-serif text-sm font-medium text-[#2b180d] dark:text-[#f8ede0]">{item.title}</p>
                            <p className="text-[11px] text-[#74553f] dark:text-[#9e836f] truncate max-w-[200px]">{item.subtitle}</p>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="block font-medium">{item.era}</span>
                          <span className="text-[#824f2e] dark:text-[#cba258]">{item.category}</span>
                        </td>
                        <td className="p-3.5 font-mono">
                          <span>{item.weightKg} kg</span>
                          <span className="text-[11px] text-[#74553f] dark:text-[#9e836f] block">{item.dimensions}</span>
                        </td>
                        <td className="p-3.5 font-mono">
                          <div>{formatCurrency(item.priceINR, 'INR')}</div>
                          <div className="text-[11px] text-[#74553f] dark:text-[#9e836f]">{formatCurrency(item.priceUSD, 'USD')}</div>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-[#824f2e] dark:text-[#cba258]">
                          {item.authenticityCertificateId}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${item.stockQuantity > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-800'}`}>
                            {item.stockQuantity > 0 ? `${item.stockQuantity} in stock` : 'Acquired'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded hover:bg-[#e4cbb0] dark:hover:bg-[#382619] transition-colors"
                            title="Edit Sculpture"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSculpture(item.id)}
                            className="p-1.5 rounded text-red-700 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete Sculpture"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Customer Enquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-xl font-medium">Customer & Collector Inquiries</h3>
              <p className="text-xs text-[#74553f] dark:text-[#a8907b]">
                Inquiries transmitted from storefront contact forms and product dossier requests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-xl bg-[#faf5eb] dark:bg-[#1a120c] border border-[#ebdcc8] dark:border-[#332215] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-semibold">{inq.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider ${
                        inq.status === 'new' 
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300'
                          : inq.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-900 dark:bg-blue-950/70 dark:text-blue-300'
                          : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300'
                      }`}>
                        {inq.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#74553f] dark:text-[#a8907b]">
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:underline">
                        <Mail className="w-3 h-3" />
                        <span>{inq.email}</span>
                      </a>
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-1 hover:underline">
                        <Phone className="w-3 h-3" />
                        <span>{inq.phone}</span>
                      </a>
                    </div>

                    {inq.sculptureTitle && (
                      <p className="text-xs font-medium text-[#824f2e] dark:text-[#cba258]">
                        Referenced: {inq.sculptureTitle}
                      </p>
                    )}

                    <p className="text-xs text-[#523824] dark:text-[#c4ae99] bg-[#f2e5d3] dark:bg-[#241710] p-3 rounded-lg leading-relaxed">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ebdcc8] dark:border-[#2e1d13] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#74553f] dark:text-[#9e836f]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleInquiryStatus(inq.id, inq.status === 'replied' ? 'in_progress' : 'replied')}
                        className="px-2.5 py-1 text-[11px] font-medium rounded border border-[#d8c4ad] dark:border-[#422e1f] hover:bg-[#ebdcc8] dark:hover:bg-[#281b12]"
                      >
                        {inq.status === 'replied' ? 'Mark In Progress' : 'Mark Replied'}
                      </button>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)}%2C%20thank%20you%20for%20contacting%20Kala%20Fine%20Arts%20regarding%20our%20antique%20sandalwood%20sculptures.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-emerald-700 text-white hover:bg-emerald-800"
                        title="Reply via WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-xl font-medium">Acquisitions & Orders</h3>
              <p className="text-xs text-[#74553f] dark:text-[#a8907b]">
                Client orders registered with certificate numbers and white-glove courier status.
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-[#ebdcc8] dark:border-[#332215] rounded-xl bg-[#faf5eb] dark:bg-[#1a120c]">
                <Package className="w-8 h-8 mx-auto text-[#824f2e] dark:text-[#cba258] mb-2" />
                <p className="font-serif text-lg">No orders logged in this session</p>
                <p className="text-xs text-[#74553f] dark:text-[#9e836f] max-w-sm mx-auto mt-1">
                  Place an order via the storefront cart and checkout modal to view live order registration here.
                </p>
              </div>
            ) : (
              <div className="border border-[#ebdcc8] dark:border-[#332215] rounded-xl overflow-hidden bg-[#faf5eb] dark:bg-[#1a120c]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f3e7d5] dark:bg-[#241710] border-b border-[#ebdcc8] dark:border-[#382619] text-[#74553f] dark:text-[#c4ae99]">
                    <tr>
                      <th className="p-3.5">Order Dossier</th>
                      <th className="p-3.5">Collector</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Valuation</th>
                      <th className="p-3.5">Settlement</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebdcc8] dark:divide-[#2e1d13]">
                    {orders.map((ord) => (
                      <tr key={ord.id}>
                        <td className="p-3.5 font-mono text-[11px] font-semibold text-[#824f2e] dark:text-[#cba258]">
                          {ord.orderNumber}
                        </td>
                        <td className="p-3.5">
                          <p className="font-medium text-[#2b180d] dark:text-[#f8ede0]">{ord.customerName}</p>
                          <p className="text-[11px] text-[#74553f] dark:text-[#9e836f]">{ord.city}, {ord.country}</p>
                        </td>
                        <td className="p-3.5">
                          {ord.items.map((i) => i.sculpture.title).join(', ')}
                        </td>
                        <td className="p-3.5 font-mono font-medium">
                          {formatCurrency(ord.total, ord.currency)}
                        </td>
                        <td className="p-3.5 uppercase font-mono text-[11px]">
                          {ord.paymentMethod.replace('_', ' ')}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                            ord.status === 'processing'
                              ? 'bg-amber-100 text-amber-900'
                              : ord.status === 'insured_transit'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {ord.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <select
                            value={ord.status}
                            onChange={(e) => handleToggleOrderStatus(ord.id, e.target.value as any)}
                            className="text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded px-2 py-1"
                          >
                            <option value="processing">Processing</option>
                            <option value="insured_transit">Insured Transit</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* Tab 4: Supabase Architecture */}
        {activeTab === 'supabase' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-xl bg-[#faf5eb] dark:bg-[#1a120c] border border-[#ebdcc8] dark:border-[#332215] space-y-4">
              <div className="flex items-center gap-2 text-[#824f2e] dark:text-[#cba258]">
                <Database className="w-5 h-5" />
                <h3 className="font-serif text-xl font-medium">Supabase Backend Integration Status</h3>
              </div>
              <p className="text-xs text-[#614532] dark:text-[#c4ae99] leading-relaxed">
                The application features an enterprise-grade Supabase preparation layer (`src/lib/supabase.ts`). It currently operates in instantaneous local-first persistence mode so all inventory updates, customer inquiries, and acquisitions work with zero latency.
              </p>
            </div>

            {/* SQL Migration Script */}
            <div className="p-6 rounded-xl bg-[#20150d] text-[#e8dccb] font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#3b271a]">
                <span className="text-[#cba258]">Supabase PostgreSQL DDL Script (Ready to run in SQL Editor)</span>
                <span className="text-[11px] text-[#9e836f]">v1.0.0</span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">
{`-- 1. Sculptures Table
create table if not exists public.sculptures (
  id text primary key,
  title text not null,
  subtitle text,
  category text not null,
  era text not null,
  price_inr numeric not null,
  price_usd numeric not null,
  dimensions text,
  weight_kg numeric,
  aroma_profile text,
  provenance text,
  wood_origin text,
  authenticity_certificate_id text unique,
  stock_quantity integer default 1,
  image text not null,
  description text,
  artisan_story text,
  created_at timestamptz default now()
);

-- 2. Customer Enquiries Table
create table if not exists public.enquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  sculpture_id text references public.sculptures(id),
  sculpture_title text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

-- 3. Orders Table
create table if not exists public.orders (
  id text primary key,
  order_number text unique not null,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  country text not null,
  items jsonb not null,
  total numeric not null,
  currency text not null,
  status text default 'processing',
  created_at timestamptz default now()
);`}
              </pre>
            </div>

            {/* Export JSON backup button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const data = { sculptures, inquiries, orders };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `kala-fine-arts-export-${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md text-xs font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Export Atelier JSON Snapshot</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Add / Edit Sculpture Modal */}
      {isSculptureModalOpen && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#FDFBF7] dark:bg-[#18120e] rounded-2xl shadow-2xl border border-[#ebdcc8] dark:border-[#382619] overflow-hidden my-8 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#ebdcc8] dark:border-[#382619] pb-4">
              <h3 className="font-serif text-2xl font-medium">
                {editingSculpture ? 'Edit Antique Sculpture' : 'Add New Antique Sculpture'}
              </h3>
              <button
                onClick={() => setIsSculptureModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f3e7d5] dark:hover:bg-[#281b12]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSculpture} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  >
                    <option value="Deity">Deity</option>
                    <option value="Celestial">Celestial</option>
                    <option value="Royal">Royal</option>
                    <option value="Artefact">Artefact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Era</label>
                  <select
                    value={formEra}
                    onChange={(e) => setFormEra(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  >
                    <option value="18th Century">18th Century</option>
                    <option value="19th Century">19th Century</option>
                    <option value="Early 20th Century">Early 20th Century</option>
                    <option value="Contemporary Masterwork">Contemporary Masterwork</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Price INR (₹) *</label>
                  <input
                    type="number"
                    value={formPriceINR}
                    onChange={(e) => setFormPriceINR(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Price USD ($) *</label>
                  <input
                    type="number"
                    value={formPriceUSD}
                    onChange={(e) => setFormPriceUSD(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formDimensions}
                    onChange={(e) => setFormDimensions(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formWeightKg}
                    onChange={(e) => setFormWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Certificate ID</label>
                <input
                  type="text"
                  value={formCertId}
                  onChange={(e) => setFormCertId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Image Asset Path / URL</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Aroma Profile</label>
                <input
                  type="text"
                  value={formAromaProfile}
                  onChange={(e) => setFormAromaProfile(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Historical Provenance Details</label>
                <textarea
                  rows={2}
                  value={formProvenance}
                  onChange={(e) => setFormProvenance(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                />
              </div>

              <div className="pt-4 border-t border-[#ebdcc8] dark:border-[#382619] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSculptureModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium border border-[#d8c4ad] dark:border-[#422e1f] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md text-xs font-semibold"
                >
                  Save Sculpture
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
