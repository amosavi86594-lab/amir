import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroCanvas } from './components/3d/HeroCanvas';
import { ProductCard } from './components/home/ProductCard';
import { FitnessTools } from './components/tools/FitnessTools';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { UserDashboard } from './components/user/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { mockArticles } from './data/mockData';
import { Product } from './types';
import { 
  Zap, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  Layers, 
  Sparkles,
  Search,
  X
} from 'lucide-react';

const MainContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'store' | 'tools' | 'articles' | 'dashboard' | 'admin'>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  
  const { products, addToCart } = useStore();

  const filteredProducts = products.filter(p => {
    const matchesFilter = activeCategoryFilter === 'all' 
      ? true 
      : (p.type === activeCategoryFilter || p.category === activeCategoryFilter);
    const matchesSearch = searchQuery.trim() === '' 
      ? true 
      : (p.title.includes(searchQuery) || p.shortDesc.includes(searchQuery) || p.categoryLabelPersian.includes(searchQuery));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-bg text-slate-100 flex flex-col font-sans">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />

      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            {/* HERO SECTION WITH 3D CANVAS */}
            <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-gray-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Hero Pitch */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/40 text-brand-cyan text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>پلتفرم علمی فیتنس و ابزارهای نوین تناسب اندام</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.25]">
                      بدنت رو بساز؛ <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-l from-brand-cyan via-teal-300 to-emerald-400">
                        مسیرت رو هوشمندانه
                      </span>{' '}
                      انتخاب کن
                    </h1>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                      برنامه تمرینی اختصاصی، رژیم‌های تغذیه علمی، شیت‌های اکسل بیش‌باری تدریجی و محصولات فیتنسی استاندارد برای خلق نسخه قوی‌تر شما.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentView('store')}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-slate-950 font-extrabold text-sm shadow-glow-cyan hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>شروع مسیر من</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentView('tools')}
                        className="w-full sm:w-auto px-6 py-4 rounded-xl bg-brand-surface/70 hover:bg-brand-surface text-white font-bold text-sm border border-gray-700/80 transition-all cursor-pointer"
                      >
                        محاسبه‌گر کالری و ماکروها
                      </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-800/80">
                      <div>
                        <div className="text-lg font-black text-brand-cyan">۱۰۰٪ علمی</div>
                        <div className="text-[11px] text-gray-400">مبتنی بر مقالات روز</div>
                      </div>
                      <div>
                        <div className="text-lg font-black text-brand-neonGreen">دسترسی آنی</div>
                        <div className="text-[11px] text-gray-400">دانلود بلافاصله پس از پرداخت</div>
                      </div>
                      <div>
                        <div className="text-lg font-black text-brand-violet">پشتیبانی کامل</div>
                        <div className="text-[11px] text-gray-400">تیکت مشاوره با تیم فنی</div>
                      </div>
                    </div>
                  </div>

                  {/* Right 3D Visualizer Scene */}
                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    <div className="w-full max-w-md lg:max-w-none rounded-3xl bg-gradient-to-b from-brand-surface/30 to-brand-card/40 border border-brand-border/60 p-2 shadow-2xl relative">
                      <HeroCanvas />
                      <div className="absolute bottom-4 left-4 right-4 bg-brand-card/85 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs text-gray-300">
                        <span className="flex items-center gap-1 text-brand-cyan">
                          <Zap className="w-3.5 h-3.5" />
                          تعامل ۳ بعدی فعال
                        </span>
                        <span className="text-[10px] text-gray-400">ماوس را بر روی کره حرکت دهید</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 9 FEATURED CATEGORIES GRID */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">دسته‌بندی‌های تخصصی نورپلنر</h2>
                <p className="text-xs sm:text-sm text-gray-400">تمامی ابزارها، برنامه‌ها و مواد مغذی مورد نیاز برای ساختن بدنی بدون نقص</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {[
                  { id: 'workout_plan', title: 'برنامه‌های بدنسازی', desc: 'هایپرتروفی، تفکیک عضلانی و توان', icon: Dumbbell, color: 'text-brand-cyan' },
                  { id: 'nutrition_diet', title: 'برنامه‌های تغذیه', desc: 'رژیم‌های علمی با غذای ایرانی', icon: Apple, color: 'text-brand-neonGreen' },
                  { id: 'muscle_gain', title: 'افزایش حجم عضلانی', desc: 'دوره حجم تمیز بدون چربی زائد', icon: TrendingUp, color: 'text-brand-violet' },
                  { id: 'fat_loss', title: 'کاهش چربی', desc: 'پروتکل‌های کسری کالری و تثبیت', icon: Zap, color: 'text-orange-400' },
                  { id: 'healthy_recipes', title: 'دستورهای غذایی سالم', desc: 'رسپی‌های پروتئینی لذیذ زیر ۲۰ دقیقه', icon: Award, color: 'text-emerald-400' },
                  { id: 'educational_ebook', title: 'کتاب‌ها و فایل‌های آموزشی', desc: 'دانشنامه‌های آناتومی و بایومکانیک', icon: Layers, color: 'text-blue-400' },
                  { id: 'workout_journal', title: 'دفتر برنامه‌ریزی ورزشی', desc: 'ژورنال‌های ثبت اختصاصی رکوردها', icon: CheckCircle2, color: 'text-pink-400' },
                  { id: 'fitness_tools', title: 'ابزارهای تناسب اندام', desc: 'محاسبه‌گر کالری و ماکرو بیومتریک', icon: Clock, color: 'text-cyan-300' },
                  { id: 'nutrition_food', title: 'محصولات غذایی ورزشی', desc: 'اوتمیل غنی‌شده و میان‌وعده سالم', icon: Apple, color: 'text-amber-400' },
                ].map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (cat.id === 'fitness_tools') {
                        setCurrentView('tools');
                      } else {
                        setActiveCategoryFilter(cat.id);
                        setCurrentView('store');
                      }
                    }}
                    className="p-5 rounded-2xl bg-brand-card border border-gray-800/80 hover:border-brand-cyan/40 transition-all cursor-pointer group hover:-translate-y-1 shadow-glass"
                  >
                    <cat.icon className={`w-6 h-6 mb-3 ${cat.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-brand-cyan">{cat.title}</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* BEST-SELLING PRODUCTS SHOWCASE */}
            <section className="py-16 bg-brand-card/30 border-y border-gray-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">پرفروش‌ترین برنامه‌ها و محصولات</h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">تست شده و تایید شده توسط مربیان و فیزیولوژیست‌های ورزشی</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentView('store')}
                    className="text-xs font-bold text-brand-cyan hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                  >
                    <span>مشاهده کل کاتالوگ فروشگاه</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedQuickViewProduct}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* WHY NOORPLANER VALUE PROPS */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">چرا ورزشکاران نورپلنر را انتخاب می‌کنند؟</h2>
                <p className="text-xs sm:text-sm text-gray-400">چهار اصل بنیادی که پلتفرم ما بر اساس آن‌ها بنا شده است</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'برنامه‌های کاربردی و قابل اجرا', desc: 'طراحی شده متناسب با امکانات باشگاه‌ها و رژیم غذایی رایج در ایران.' },
                  { title: 'دسترسی سریع به محصولات دیجیتال', desc: 'بدون معطلی! بلافاصله پس از پرداخت فایل‌ها در میز کاربری شما ذخیره می‌شوند.' },
                  { title: 'محتوای آموزشی ساختارمند', desc: 'ارائه نکات تخصصی بدون ادعاهای اغراق‌آمیز و غیرعلمی دگرگونی یک‌شبه.' },
                  { title: 'تجربه خرید ساده و امن', desc: 'پشتیبانی از پروتکل شاپرک، درگاه‌های رسمی بانکی و حریم خصوصی رمزگذاری شده.' },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-brand-card border border-gray-800">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center font-bold mb-4">
                      {i + 1}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* EMBEDDED FITNESS CALCULATOR PREVIEW */}
            <section className="py-8 bg-brand-card/20 border-t border-gray-900">
              <FitnessTools />
            </section>
          </div>
        )}

        {/* VIEW 2: STORE & CATALOG */}
        {currentView === 'store' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-black text-white">فروشگاه جامع نورپلنر</h1>
                <p className="text-xs text-gray-400 mt-1">برنامه‌های دیجیتالی قابل دانلود و محصولات غذایی سلامت‌محور</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                <input
                  type="text"
                  placeholder="جستجو در بین عناوین و برنامه‌ها..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-card border border-gray-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-2.5 text-gray-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === 'all'
                    ? 'bg-brand-cyan text-slate-950 shadow-glow-cyan'
                    : 'bg-brand-card border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                همه محصولات
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('digital')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === 'digital'
                    ? 'bg-brand-violet text-white shadow-glow-violet'
                    : 'bg-brand-card border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                فقط برنامه‌ها و دانلودی‌ها
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('physical')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === 'physical'
                    ? 'bg-brand-neonGreen text-slate-950 shadow-glow-green'
                    : 'bg-brand-card border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                محصولات فیزیکی و غذایی
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('muscle_gain')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === 'muscle_gain'
                    ? 'bg-blue-600 text-white'
                    : 'bg-brand-card border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                حجم عضلانی
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('fat_loss')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === 'fat_loss'
                    ? 'bg-orange-600 text-white'
                    : 'bg-brand-card border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                کاهش چربی
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('healthy_recipes')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === 'healthy_recipes'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-card border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                دستورهای غذایی
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-brand-card/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-3">محصولی مطابق فیلتر انتخابی شما یافت نشد.</p>
                <button
                  type="button"
                  onClick={() => { setActiveCategoryFilter('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-brand-surface border border-gray-700 rounded-xl text-xs text-brand-cyan"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} onQuickView={setSelectedQuickViewProduct} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: FITNESS TOOLS */}
        {currentView === 'tools' && <FitnessTools />}

        {/* VIEW 4: SCIENTIFIC ARTICLES */}
        {currentView === 'articles' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h1 className="text-3xl font-black text-white mb-2">مقالات آموزشی و پژوهش‌های علمی</h1>
              <p className="text-xs text-gray-400">راهنماهای تمرینی، تغذیه اصولی و ریکاوری با استناد به مراجع آکادمیک ورزشی</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockArticles.map((art) => (
                <div key={art.id} className="bg-brand-card rounded-2xl border border-gray-800 overflow-hidden shadow-glass flex flex-col justify-between">
                  <div>
                    <img src={art.image} alt={art.title} className="w-full aspect-video object-cover bg-gray-900" />
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-brand-cyan mb-2">
                        <span>{art.category}</span>
                        <span className="text-gray-400">{art.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{art.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{art.summary}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 border-t border-gray-800/60 mt-4 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{art.author}</span>
                    <span>{art.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: USER DASHBOARD */}
        {currentView === 'dashboard' && <UserDashboard />}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* QUICK VIEW / DETAIL MODAL */}
      {selectedQuickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-brand-card w-full max-w-2xl rounded-2xl border border-brand-border p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedQuickViewProduct(null)}
              className="absolute top-5 left-5 p-1 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <img
                src={selectedQuickViewProduct.image}
                alt={selectedQuickViewProduct.title}
                className="w-full aspect-square rounded-xl object-cover bg-gray-900"
              />
              <div className="space-y-4">
                <span className="text-xs font-bold text-brand-cyan">{selectedQuickViewProduct.categoryLabelPersian}</span>
                <h3 className="text-lg font-black text-white">{selectedQuickViewProduct.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedQuickViewProduct.fullDesc}</p>

                {selectedQuickViewProduct.features && (
                  <div>
                    <h5 className="text-xs font-bold text-white mb-1.5">ویژگی‌های برجسته:</h5>
                    <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                      {selectedQuickViewProduct.features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedQuickViewProduct.deliverables && (
                  <div>
                    <h5 className="text-xs font-bold text-white mb-1.5">محتویات و فایل‌های همراه:</h5>
                    <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                      {selectedQuickViewProduct.deliverables.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedQuickViewProduct);
                      setSelectedQuickViewProduct(null);
                    }}
                    className="w-full py-3 rounded-xl bg-brand-cyan text-slate-950 font-black text-xs hover:bg-cyan-300 transition-all cursor-pointer shadow-glow-cyan"
                  >
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PERSISTENT GLOBAL SLIDE-OUT CART & CHECKOUT MODALS */}
      <CartDrawer />
      <CheckoutModal />

      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainContent />
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;
