import React, { useState } from 'react';
import { Download, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { toPersianDigits, formatToman } from '../../utils/persian';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, wishlist, addToCart } = useStore();
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
      </div>
    );
  }

  // Find products the user has actually paid for / licensed
  const purchasedProducts = products.filter((p) => user.purchasedProductIds.includes(p.id));
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSimulatedDownload = (title: string, fileFormat?: string) => {
    setDownloadNotice(`فایل «${title}» (${fileFormat || 'PDF'}) با موفقیت دانلود و ذخیره شد.`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      {/* Toast Notification */}
      {downloadNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500/90 text-slate-950 px-5 py-3 rounded-2xl font-bold text-xs shadow-glow-green border border-emerald-400 backdrop-blur-md flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* User Header Profile */}
      <div className="bg-brand-card p-6 rounded-2xl border border-brand-border mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">{user.fullName}</h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
              کاربر تایید شده
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">شماره تماس: {user.phone} | ایمیل: {user.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-brand-surface border border-gray-800 text-xs text-gray-300">
            برنامه‌های فعال: <span className="font-bold text-brand-neonGreen">{toPersianDigits(purchasedProducts.length)}</span>
          </div>
        </div>
      </div>

      {/* Main Vault: Digital Downloads */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-brand-cyan" />
            صندوق فایل‌های دانلودی اختصاصی شما
          </h3>
          <span className="text-xs text-gray-500">دسترسی دائمی و رمزگذاری‌شده</span>
        </div>

        {purchasedProducts.length === 0 ? (
          <div className="bg-brand-card/50 p-8 rounded-2xl border border-gray-800 text-center text-gray-400 text-sm">
            شما هنوز برنامه‌ای خریداری نکرده‌اید. برای شروع به بخش فروشگاه سر بزنید.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchasedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-brand-card p-5 rounded-2xl border border-gray-800/80 hover:border-brand-cyan/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3">
                  <img src={prod.image} alt={prod.title} className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-900" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{prod.title}</h4>
                    <p className="text-xs text-gray-400">{prod.fileFormat || 'فایل PDF و شیت تمرینی'}</p>
                    <span className="text-[11px] text-brand-neonGreen font-mono mt-1 inline-block">حجم: {prod.fileSize || '۲۵ مگابایت'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-neonGreen" />
                    لایسنس رسمی تایید شده
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSimulatedDownload(prod.title, prod.fileFormat)}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-cyan/15 hover:bg-brand-cyan text-brand-cyan hover:text-slate-950 font-bold text-xs border border-brand-cyan/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    دانلود فایل نسخه نهایی
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist Section */}
      {wishlistProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">لیست علاقه‌مندی‌های ذخیره‌شده شما</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {wishlistProducts.map((p) => (
              <div key={p.id} className="bg-brand-card p-4 rounded-xl border border-gray-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white line-clamp-1">{p.title}</h5>
                    <span className="text-[11px] text-brand-cyan">{formatToman(p.price)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(p)}
                  className="px-3 py-1.5 bg-brand-cyan text-slate-950 text-xs font-bold rounded-lg shrink-0 flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  خرید
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
