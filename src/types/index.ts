export type ProductType = 'digital' | 'physical';

export type ProductCategory = 
  | 'workout_plan'
  | 'nutrition_diet'
  | 'muscle_gain'
  | 'fat_loss'
  | 'healthy_recipes'
  | 'educational_ebook'
  | 'workout_journal'
  | 'fitness_tools'
  | 'nutrition_food';

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  categoryLabelPersian: string;
  type: ProductType;
  price: number; // In Iranian Toman
  discountPercent?: number;
  rating: number; // Honest genuine benchmark rating (out of 5)
  reviewsCount: number;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  level?: 'مبتدی' | 'متوسط' | 'پیشرفته' | 'متوسط تا پیشرفته' | 'همه سطوح';
  fileFormat?: string; // e.g. "PDF + اکسل تمرینی + ویدیو فرم حرکات"
  fileSize?: string;
  inStock?: boolean;
  stockCount?: number;
  deliverables?: string[];
  ingredients?: string;
  storageInfo?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  purchasedProductIds: string[];
  savedPlans: string[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'پرداخت شده' | 'در حال پردازش انبار' | 'ارسال شده' | 'لغو شده';
  type: 'digital_only' | 'physical_included';
  trackingCode?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  date: string;
  author: string;
  image: string;
}
