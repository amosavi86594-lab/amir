import React, { useState } from 'react';
import { ShieldCheck, Plus, Package, DollarSign, Users, ShoppingCart, Tag, Check, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatToman, toPersianDigits } from '../../utils/persian';

export const AdminDashboard: React.FC = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons'>('products');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Quick state for adding a demo product
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('250000');
  const [newType, setNewType] = useState<'digital' | 'physical'>('digital');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setAddedNotice(`محصول «${newTitle || 'برنامه جدید'}» با موفقیت در انبار سیستم ثبت شد.`);
    setShowAddModal(false);
    setNewTitle('');
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      {addedNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500/90 text-slate-950 px-5 py-3 rounded-2xl font-bold text-xs shadow-glow-green border border-emerald-400 backdrop-blur-md flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{addedNotice}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-cyan" />
            <h2 className="text-2xl font-black text-white">داشبورد مدیریت یکپارچه نورپلنر</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">مدیریت موجودی فیزیکی، قیمت‌های تومانی و محصولات دیجیتال</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-brand-cyan text-slate-950 text-xs font-bold rounded-xl shadow-glow-cyan hover:bg-cyan-300 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          افزودن محصول جدید
        </button>
      </div>

      {/* KPI Metric Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-brand-card p-5 rounded-2xl border border-gray-800">
          <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-brand-neonGreen" />
            فروش کل ماه جاری
          </div>
          <div className="text-xl font-black text-white">{formatToman(42800000)}</div>
        </div>
        <div className="bg-brand-card p-5 rounded-2xl border border-gray-800">
          <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-brand-cyan" />
            کل کاتالوگ فعال
          </div>
          <div className="text-xl font-black text-white">{toPersianDigits(products.length)} آیتم</div>
        </div>
        <div className="bg-brand-card p-5 rounded-2xl border border-gray-800">
          <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <ShoppingCart className="w-3.5 h-3.5 text-orange-400" />
            سفارشات موفق
          </div>
          <div className="text-xl font-black text-white">{toPersianDigits(128)} سفارش</div>
        </div>
        <div className="bg-brand-card p-5 rounded-2xl border border-gray-800">
          <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-brand-violet" />
            ورزشکاران عضو
          </div>
          <div className="text-xl font-black text-white">{toPersianDigits(1840)} نفر</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4 border-b border-gray-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'products' ? 'bg-brand-surface text-brand-cyan border border-brand-cyan/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          انبار و محصولات ({toPersianDigits(products.length)})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'orders' ? 'bg-brand-surface text-brand-cyan border border-brand-cyan/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          سفارشات اخیر شاپرک (۵ مورد)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'coupons' ? 'bg-brand-surface text-brand-cyan border border-brand-cyan/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          کدهای تخفیف فعال
        </button>
      </div>

      {/* Product Inventory Table */}
      {activeTab === 'products' && (
        <div className="bg-brand-card rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">لیست و موجودی محصولات سیستم</h3>
            <span className="text-xs text-gray-400">قیمت‌گذاری بر مبنای تومان</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-gray-300">
              <thead className="bg-brand-surface/60 text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="p-3.5">عنوان محصول</th>
                  <th className="p-3.5">نوع</th>
                  <th className="p-3.5">قیمت پایه</th>
                  <th className="p-3.5">تخفیف</th>
                  <th className="p-3.5">وضعیت انبار / فایل</th>
                  <th className="p-3.5">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-surface/30">
                    <td className="p-3.5 font-medium text-white flex items-center gap-2">
                      <img src={p.image} alt={p.title} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="line-clamp-1">{p.title}</span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${p.type === 'digital' ? 'bg-violet-900/40 text-violet-300' : 'bg-emerald-900/40 text-emerald-300'}`}>
                        {p.type === 'digital' ? 'دیجیتال' : 'فیزیکی'}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono">{formatToman(p.price)}</td>
                    <td className="p-3.5 text-amber-400 font-bold">{p.discountPercent ? `${toPersianDigits(p.discountPercent)}٪` : '-'}</td>
                    <td className="p-3.5">
                      {p.type === 'physical' ? (
                        <span className="text-gray-300">{toPersianDigits(p.stockCount || 0)} عدد در انبار</span>
                      ) : (
                        <span className="text-brand-cyan">فایل آماده دانلود</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <button type="button" onClick={() => alert(`تنظیمات محصول ${p.title} باز شد.`)} className="text-brand-cyan hover:underline ml-2">ویرایش</button>
                      <button type="button" onClick={() => alert(`محصول ${p.title} غیرفعال شد.`)} className="text-red-400 hover:underline">غیرفعال</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-brand-card rounded-2xl border border-gray-800 overflow-hidden p-5 space-y-3">
          {[
            { id: 'NP-882190', name: 'سارا رضایی', item: 'برنامه جامع ۱۲ هفته‌ای هایپرتروفی', amount: 285000, date: '۱۰ دقیقه قبل', status: 'تکمیل شده (دانلود آنی)' },
            { id: 'NP-882189', name: 'علی محمدی', item: 'اوتمیل پروتئینه غنی‌شده (۲ بسته)', amount: 390000, date: '۴۵ دقیقه قبل', status: 'آماده تحویل به پست' },
            { id: 'NP-882188', name: 'مهرداد کاظمی', item: 'دفتر برنامه‌ریزی فیزیکی تمرینات', amount: 216000, date: '۲ ساعت قبل', status: 'بسته‌بندی شده' },
            { id: 'NP-882187', name: 'نیلوفر زمانی', item: 'پلن تغذیه و راهنمای جامع کات', amount: 246500, date: '۴ ساعت قبل', status: 'تکمیل شده (دانلود آنی)' },
          ].map((ord) => (
            <div key={ord.id} className="p-4 rounded-xl bg-brand-surface/40 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-brand-cyan font-bold">{ord.id}</span>
                  <span className="text-white font-bold">{ord.name}</span>
                </div>
                <p className="text-gray-400">{ord.item}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                <span className="font-black text-brand-neonGreen">{formatToman(ord.amount)}</span>
                <span className="text-gray-500">{ord.date} · {ord.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-4 h-4 text-brand-cyan" />
                <span className="font-mono font-black text-lg text-white">NOOR20</span>
              </div>
              <p className="text-xs text-gray-400">تخفیف ۲۰ درصدی روی کلیه محصولات ویژه تست پلتفرم</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">فعال</span>
          </div>

          <div className="p-5 rounded-2xl bg-brand-card border border-gray-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-4 h-4 text-brand-cyan" />
                <span className="font-mono font-black text-lg text-white">FITNESS10</span>
              </div>
              <p className="text-xs text-gray-400">تخفیف ۱۰ درصدی برای خریدهای بعدی اعضا</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">فعال</span>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-brand-card w-full max-w-md rounded-2xl border border-brand-border p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 left-4 p-1 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">افزودن محصول جدید به کاتالوگ</h3>
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">عنوان برنامه یا محصول</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: برنامه تخصصی تمرین با کش و وزن بدن"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-brand-surface border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">نوع محصول</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('digital')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      newType === 'digital' ? 'bg-brand-violet/20 border-brand-violet text-white' : 'bg-brand-surface border-gray-800 text-gray-400'
                    }`}
                  >
                    دیجیتالی (دانلودی)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('physical')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      newType === 'physical' ? 'bg-brand-neonGreen/20 border-brand-neonGreen text-white' : 'bg-brand-surface border-gray-800 text-gray-400'
                    }`}
                  >
                    فیزیکی (پستی)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">قیمت به تومان</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-brand-surface border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-cyan text-slate-950 font-black rounded-xl hover:bg-cyan-300 transition-all cursor-pointer mt-2"
              >
                ذخیره و انتشار در فروشگاه
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
