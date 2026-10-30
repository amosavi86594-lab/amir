import React from 'react';
import { Dumbbell, ShieldCheck, CreditCard, Lock, Sparkles } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (v: 'home' | 'store' | 'tools' | 'articles' | 'dashboard' | 'admin') => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-card/90 border-t border-brand-border/60 pt-16 pb-8 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              type="button" 
              className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-right" 
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-brand-cyan" />
              </div>
              <span className="text-xl font-black text-white">نورپلنر (Noorplaner)</span>
            </button>
            <p className="text-xs leading-relaxed text-gray-400 max-w-sm">
              «مسیر حرفه‌ای‌تر شدن، از اینجا شروع می‌شه». پلتفرم جامع برنامه‌های علمی بدنسازی، شیت‌های تمرینی، رژیم‌های اختصاصی و محصولات غذایی با کیفیت ورزشی در ایران.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-gray-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-neonGreen" />
                اتصال امن SSL ۲۵۶ بیتی
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-brand-cyan" />
                شبکه پرداخت شاپرک
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li><button type="button" onClick={() => onNavigate('home')} className="hover:text-brand-cyan">صفحه اصلی</button></li>
              <li><button type="button" onClick={() => onNavigate('store')} className="hover:text-brand-cyan">فروشگاه برنامه‌ها</button></li>
              <li><button type="button" onClick={() => onNavigate('tools')} className="hover:text-brand-cyan">محاسبه‌گر ماکرو و کالری</button></li>
              <li><button type="button" onClick={() => onNavigate('articles')} className="hover:text-brand-cyan">بانک مقالات تمرینی</button></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">قوانین و امنیت</h4>
            <ul className="space-y-2">
              <li><button type="button" onClick={() => alert('لایسنس محصولات دیجیتال برای استفاده شخصی بوده و هرگونه بازنشر بدون هماهنگی نقض کپی‌رایت است.')} className="hover:text-brand-cyan text-right">قوانین لایسنس فایل‌های دیجیتال</button></li>
              <li><button type="button" onClick={() => alert('محصولات فیزیکی در صورت عدم باز شدن پلمپ تا ۷ روز امکان بازگشت وجه دارند.')} className="hover:text-brand-cyan text-right">شرایط ضمانت و مرجوعی کالا</button></li>
              <li><button type="button" onClick={() => alert('اطلاعات بیومتریک و آدرس پستی با رمزنگاری پیشرفته ذخیره شده و محرمانه است.')} className="hover:text-brand-cyan text-right">حفظ حریم خصوصی کاربران</button></li>
              <li><button type="button" onClick={() => alert('پاسخگویی به سوالات متداول از طریق بخش پشتیبانی ۲۴ ساعته امکان‌پذیر است.')} className="hover:text-brand-cyan text-right">سوالات متداول (FAQ)</button></li>
            </ul>
          </div>

          {/* Enamad & Trust Badges Mockup */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">مجوزها و نمادهای اعتماد</h4>
            <div className="flex gap-2">
              <div className="p-3 rounded-xl bg-brand-surface/60 border border-gray-800 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-6 h-6 text-brand-cyan mb-1" />
                <span className="text-[10px] text-gray-300">درگاه پرداخت تایید شده</span>
              </div>
              <div className="p-3 rounded-xl bg-brand-surface/60 border border-gray-800 flex flex-col items-center justify-center text-center">
                <Sparkles className="w-6 h-6 text-brand-neonGreen mb-1" />
                <span className="text-[10px] text-gray-300">اصالت علمی محتوا</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© تمامی حقوق مادی و معنوی متعلق به پلتفرم نورپلنر (Noorplaner) می‌باشد.</p>
          <p>طراحی شده با استانداردهای مدرن فرانت‌اند و تجربه کاربری شتابان.</p>
        </div>
      </div>
    </footer>
  );
};
