import React, { useState } from 'react';
import { 
  Dumbbell, 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  Calculator, 
  ShieldCheck, 
  BookOpen, 
  Flame 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { toPersianDigits } from '../../utils/persian';

interface NavbarProps {
  onNavigate: (view: 'home' | 'store' | 'tools' | 'articles' | 'dashboard' | 'admin') => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const { cartCount, setIsCartOpen } = useStore();
  const { user, loginAsDemoAdmin, loginAsDemoUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070A12]/85 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            type="button" 
            className="flex items-center gap-3 cursor-pointer text-right bg-transparent border-0 p-0" 
            onClick={() => onNavigate('home')}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-cyan/20 to-brand-violet/30 border border-brand-cyan/40 shadow-glow-cyan">
              <Dumbbell className="w-6 h-6 text-brand-cyan" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-neonGreen" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white">نورپلنر</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">PRO</span>
              </div>
              <p className="text-[10px] text-gray-400 font-light hidden sm:block">مسیر علمی تناسب اندام</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors hover:text-brand-cyan ${currentView === 'home' ? 'text-brand-cyan font-bold' : 'text-gray-300'}`}
            >
              خانه
            </button>
            <button
              onClick={() => onNavigate('store')}
              className={`flex items-center gap-1.5 transition-colors hover:text-brand-cyan ${currentView === 'store' ? 'text-brand-cyan font-bold' : 'text-gray-300'}`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              فروشگاه و برنامه‌ها
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className={`flex items-center gap-1.5 transition-colors hover:text-brand-cyan ${currentView === 'tools' ? 'text-brand-cyan font-bold' : 'text-gray-300'}`}
            >
              <Calculator className="w-4 h-4 text-brand-neonGreen" />
              محاسبه‌گرهای هوشمند
            </button>
            <button
              onClick={() => onNavigate('articles')}
              className={`flex items-center gap-1.5 transition-colors hover:text-brand-cyan ${currentView === 'articles' ? 'text-brand-cyan font-bold' : 'text-gray-300'}`}
            >
              <BookOpen className="w-4 h-4 text-brand-violet" />
              مقالات علمی
            </button>
          </nav>

          {/* User Controls & Cart CTA */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher for Evaluation */}
            <div className="hidden md:flex items-center gap-1 bg-brand-card p-1 rounded-lg border border-gray-800 text-xs">
              <button
                type="button"
                onClick={user?.role === 'admin' ? loginAsDemoUser : loginAsDemoAdmin}
                className="px-2 py-1 rounded text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all flex items-center gap-1"
                title="تغییر سریع نقش برای ارزیابی قابلیت‌های کاربری و پنل مدیریت"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                <span>نقش: {user?.role === 'admin' ? 'مدیر ارشد' : 'کاربر عادی'}</span>
              </button>
            </div>

            {/* Dashboard / User Button */}
            <button
              type="button"
              onClick={() => onNavigate(user?.role === 'admin' ? 'admin' : 'dashboard')}
              className="p-2.5 rounded-xl bg-brand-surface/70 hover:bg-brand-surface border border-gray-700/60 text-gray-200 transition-all"
              title="پنل حساب کاربری"
            >
              <UserIcon className="w-5 h-5 text-gray-300" />
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-brand-cyan/10 to-brand-blue/20 hover:from-brand-cyan/20 hover:to-brand-blue/30 border border-brand-cyan/30 text-white transition-all shadow-glow-cyan"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="w-5 h-5 text-brand-cyan" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-card/95 border-b border-brand-border px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-gray-200 hover:text-brand-cyan border-b border-gray-800/60"
          >
            خانه
          </button>
          <button
            type="button"
            onClick={() => { onNavigate('store'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-gray-200 hover:text-brand-cyan border-b border-gray-800/60"
          >
            فروشگاه و برنامه‌های ورزشی
          </button>
          <button
            type="button"
            onClick={() => { onNavigate('tools'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-gray-200 hover:text-brand-cyan border-b border-gray-800/60"
          >
            ابزارها و محاسبه‌گرهای تناسب اندام
          </button>
          <button
            type="button"
            onClick={() => { onNavigate('articles'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-gray-200 hover:text-brand-cyan border-b border-gray-800/60"
          >
            مقالات و آموزش‌های علمی
          </button>
          <button
            type="button"
            onClick={() => { onNavigate(user?.role === 'admin' ? 'admin' : 'dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-brand-cyan font-bold"
          >
            {user?.role === 'admin' ? 'پنل مدیریت (Admin)' : 'میز کاربری و دانلودها'}
          </button>
        </div>
      )}
    </header>
  );
};
