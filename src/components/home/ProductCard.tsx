import React, { useState } from 'react';
import { ShoppingBag, Star, Download, PackageCheck, Eye, Heart } from 'lucide-react';
import { Product } from '../../types';
import { toPersianDigits, formatToman, getDiscountedPrice } from '../../utils/persian';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [imageError, setImageError] = useState(false);
  const isWishlisted = wishlist.includes(product.id);
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercent);

  return (
    <div className="group relative bg-brand-card rounded-2xl border border-gray-800/80 hover:border-brand-cyan/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-glass hover:shadow-glow-cyan hover:-translate-y-1">
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-surface to-brand-card p-4 text-center">
            {product.type === 'digital' ? (
              <Download className="w-10 h-10 text-brand-cyan/60 mb-2" />
            ) : (
              <PackageCheck className="w-10 h-10 text-brand-neonGreen/60 mb-2" />
            )}
            <span className="text-xs font-bold text-gray-300">{product.title}</span>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.type === 'digital' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-brand-violet/90 backdrop-blur-md text-white border border-brand-violet/40">
              <Download className="w-3 h-3" />
              دانلودی آنی
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-brand-neonGreen/90 backdrop-blur-md text-slate-950 border border-brand-neonGreen/40">
              <PackageCheck className="w-3 h-3" />
              ارسال فیزیکی
            </span>
          )}

          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-red-500 text-white shadow">
              {toPersianDigits(product.discountPercent)}٪ تخفیف
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 left-3 p-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white hover:text-red-400 transition-colors"
          title="افزودن به علاقه‌مندی‌ها"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Quick View Trigger Overlay */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px]"
        >
          <Eye className="w-4 h-4 text-brand-cyan" />
          مشاهده جزئیات کامل و سرفصل‌ها
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{product.categoryLabelPersian}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold text-white">{toPersianDigits(product.rating)}</span>
              <span className="text-[10px] text-gray-400">({toPersianDigits(product.reviewsCount)})</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-cyan transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {product.shortDesc}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
          <div>
            {product.discountPercent && product.discountPercent > 0 ? (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 line-through">
                  {formatToman(product.price)}
                </span>
                <span className="text-base font-extrabold text-brand-cyan">
                  {formatToman(discountedPrice)}
                </span>
              </div>
            ) : (
              <span className="text-base font-extrabold text-white">
                {formatToman(product.price)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-glow-cyan active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            افزودن به سبد
          </button>
        </div>
      </div>
    </div>
  );
};
