import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { toPersianDigits, formatToman } from '../../utils/persian';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    finalTotal,
    discountRate,
    applyCoupon,
    setIsCheckoutOpen,
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    setCouponMsg({ success: res.success, text: res.message });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-brand-card border-r border-brand-border shadow-2xl flex flex-col justify-between z-10">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">سبد خرید شما</h2>
              <span className="text-xs bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full font-bold">
                {toPersianDigits(cart.length)} قلم
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
              aria-label="بستن سبد خرید"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="mb-4">سبد خرید شما در حال حاضر خالی است.</p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-brand-surface rounded-xl text-brand-cyan text-sm border border-brand-cyan/30"
                >
                  مشاهده برنامه‌ها و محصولات
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => {
                const effectiveUnitPrice = product.discountPercent
                  ? Math.round(product.price * (1 - product.discountPercent / 100))
                  : product.price;

                return (
                  <div
                    key={product.id}
                    className="flex gap-3 bg-brand-surface/40 p-3 rounded-xl border border-gray-800/80"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-900 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">{product.title}</h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          aria-label={`حذف ${product.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-extrabold text-brand-cyan">
                          {formatToman(effectiveUnitPrice * quantity)}
                        </span>

                        {product.type === 'physical' ? (
                          <div className="flex items-center gap-1.5 bg-brand-surface px-2 py-0.5 rounded-lg border border-gray-700">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="text-gray-400 hover:text-white p-0.5"
                              aria-label="کاهش تعداد"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs text-white font-bold px-1">
                              {toPersianDigits(quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="text-gray-400 hover:text-white p-0.5"
                              aria-label="افزایش تعداد"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-brand-violet bg-brand-violet/10 px-2 py-0.5 rounded">
                            لایسنس تکی فایل
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-800 bg-[#070A12]/90 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف (تست: NOOR20)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 bg-brand-surface border border-gray-700 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-surface hover:bg-gray-800 text-white rounded-xl text-xs font-bold border border-gray-700 flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-brand-cyan" />
                  اعمال
                </button>
              </form>

              {couponMsg && (
                <p className={`text-xs ${couponMsg.success ? 'text-brand-neonGreen' : 'text-red-400'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>مجموع خرید:</span>
                  <span>{formatToman(cartTotal)}</span>
                </div>
                {discountRate > 0 && (
                  <div className="flex justify-between text-brand-neonGreen">
                    <span>تخفیف ویژه ({toPersianDigits(discountRate)}٪):</span>
                    <span>-{formatToman(cartTotal - finalTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-gray-800">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-brand-cyan text-base font-black">{formatToman(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-neonGreen text-slate-950 font-extrabold text-sm hover:opacity-95 transition-all shadow-glow-cyan flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تکمیل سفارش و اتصال به درگاه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-neonGreen" />
                <span>پرداخت از طریق کلیه کارت‌های عضو شتاب شاپرک</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
