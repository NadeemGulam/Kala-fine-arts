import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulated Supabase Auth / Local verification
    setTimeout(() => {
      if (email.trim().toLowerCase() === 'admin@kalafinearts.com' && password === 'sandalwood184') {
        setIsLoading(false);
        onLoginSuccess();
        onClose();
      } else if (email.trim() && password.trim().length >= 6) {
        // Allow general curator demo access
        setIsLoading(false);
        onLoginSuccess();
        onClose();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. You may click "Auto-fill Curator Demo Credentials" below.');
      }
    }, 600);
  };

  const fillDemoCredentials = () => {
    setEmail('admin@kalafinearts.com');
    setPassword('sandalwood184');
    setError('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-[#FDFBF7] dark:bg-[#18120e] rounded-2xl shadow-2xl border border-[#ebdcc8] dark:border-[#382619] overflow-hidden p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#74553f] dark:text-[#a8907b] hover:bg-[#f3e7d5] dark:hover:bg-[#281b12] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#f3e7d5] dark:bg-[#281b12] flex items-center justify-center text-[#824f2e] dark:text-[#cba258]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-[#2b180d] dark:text-[#f8ede0]">
            Kala Fine Arts Curator Gateway
          </h3>
          <p className="text-xs text-[#74553f] dark:text-[#b49e8a]">
            Access inventory management, customer inquiries & Supabase ledger.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
              Curator Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kalafinearts.com"
              className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#42251a] dark:text-[#dfcaa7] mb-1">
              Master Access Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-[#241710] border border-[#d8c4ad] dark:border-[#422e1f] rounded-md text-[#2b180d] dark:text-[#f8ede0] focus:outline-none focus:ring-1 focus:ring-[#824f2e]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#42251a] hover:bg-[#2b180d] dark:bg-[#cba258] dark:hover:bg-[#b58c42] text-[#fdfbf7] dark:text-[#23130c] rounded-md font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Authenticating...' : 'Authenticate Curator Session'}</span>
          </button>
        </form>

        {/* 1-Click Demo Helper */}
        <div className="pt-2 border-t border-[#ebdcc8] dark:border-[#332215]">
          <button
            onClick={fillDemoCredentials}
            className="w-full py-2 px-3 text-xs font-medium text-[#824f2e] dark:text-[#cba258] bg-[#f9f4ea] dark:bg-[#241710] hover:bg-[#f3e7d5] dark:hover:bg-[#2f1f15] rounded-md border border-[#ebdcc8] dark:border-[#382619] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Auto-fill Curator Demo Credentials</span>
          </button>
        </div>

      </div>
    </div>
  );
};
