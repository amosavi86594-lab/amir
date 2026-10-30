import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Building, CreditCard } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { formatToman } from '../../utils/persian';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, finalTotal, clearCart } = useStore();
  const { user, addPurchasedProducts } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedGateway, setSelectedGateway] = useState<'zarinpal' | 'saman'>('zarinpal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const hasPhysical = cart.some((i) => i.product.type === 'physical');

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedCode = `NP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingNumber(generatedCode);

    // Simulate safe server-side verification loop
    setTimeout(() => {
      const digitalIds = cart.map((i) => i.product.id);
      addPurchasedProducts(digitalIds);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-brand-card w-full max-w-xl rounded-2xl border border-brand-border p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            setIsCheckoutOpen(false);
            setOrderComplete(false);
          }}
          className="absolute top-5 left-5 p-1.5 text-gray-400 hover:text-white rounded-lg"
          aria-label="بستن پنجره پرداخت"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-brand-cyan" />
              <h2 className="text-xl font-bold text-white">تسویه حساب و پرداخت امن</h2>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              مبلغ نهایی فاکتور: <span className="text-brand-cyan font-bold">{formatToman(finalTotal)}</span>
            </p>

            {/* Test Gateway Notice Badge */}
            <div className="p-3 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-200/90 leading-relaxed">
                <strong>حالت شبیه‌ساز پروتکل پرداخت (Sandbox Mode):</strong> به دلیل نیاز به تایید اینماد و مرچنت‌کد اختصاصی زرین‌پال/سامان‌کیش در محیط محلی، سفارش در محیط اعتبارسنجی تستی نهایی خواهد شد و فایل‌ها بلافاصله به پنل شما اضافه می‌شوند.
              </div>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">نام و نام خانوادگی تحویل‌گیرنده</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-brand-surface border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">شماره همراه (جهت پیامک پیگیری)</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-brand-surface border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-cyan focus:outline-none"
                  />
                </div>
              </div>

              {hasPhysical && (
                <div className="space-y-4 pt-2 border-t border-gray-800">
                  <div className="text-xs font-bold text-brand-neonGreen">
                    مشخصات ارسال مرسوله پستی (پیشتاز)
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">آدرس پستی کامل</label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، واحد..."
                      className="w-full bg-brand-surface border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">کد پستی ۱۰ رقمی</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-brand-surface border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-cyan focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Payment Gateway Selection */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-gray-400 mb-2">انتخاب درگاه بانکی</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('zarinpal')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      selectedGateway === 'zarinpal'
                        ? 'border-brand-cyan bg-brand-cyan/15 text-white shadow-glow-cyan'
                        : 'border-gray-800 bg-brand-surface/40 text-gray-400'
                    }`}
                  >
                    <Building className="w-4 h-4 text-amber-400" />
                    درگاه زرین‌پال
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGateway('saman')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      selectedGateway === 'saman'
                        ? 'border-brand-cyan bg-brand-cyan/15 text-white shadow-glow-cyan'
                        : 'border-gray-800 bg-brand-surface/40 text-gray-400'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    درگاه پرداخت سامان‌کیش
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-4 py-3.5 rounded-xl bg-brand-cyan text-slate-950 font-black text-sm hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? 'در حال اتصال به شاپرک...' : `تایید و پرداخت ${formatToman(finalTotal)}`}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-neonGreen/20 border border-brand-neonGreen text-brand-neonGreen flex items-center justify-center mx-auto shadow-glow-green">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">سفارش با موفقیت ثبت و تایید گردید</h3>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
              کد پیگیری تراکنش: <span className="font-mono text-brand-cyan font-bold">{trackingNumber}</span>. فایل‌های دانلودی شما آنی در میز کاربری قابل دریافت هستند.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderComplete(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-surface text-white text-xs font-bold border border-gray-700 hover:border-brand-cyan cursor-pointer"
            >
              بستن و مشاهده حساب کاربری
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
