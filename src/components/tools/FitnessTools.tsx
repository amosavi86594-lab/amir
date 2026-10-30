import React, { useState } from 'react';
import { Calculator, Activity, Flame, ShieldAlert } from 'lucide-react';
import { calculateFitnessMetrics, toPersianDigits } from '../../utils/persian';

export const FitnessTools: React.FC = () => {
  const [weight, setWeight] = useState<number>(78);
  const [height, setHeight] = useState<number>(178);
  const [age, setAge] = useState<number>(27);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // Moderate exercise 3-5 days/week

  const metrics = calculateFitnessMetrics(weight, height, age, gender, activity);

  // Interpretation of BMI
  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: 'کمبود وزن', color: 'text-yellow-400' };
    if (bmi < 24.9) return { text: 'وزن نرمال و سلامت', color: 'text-brand-neonGreen' };
    if (bmi < 29.9) return { text: 'اضافه وزن ملایم', color: 'text-orange-400' };
    return { text: 'چاقی (نیاز به بازنگری سبک زندگی)', color: 'text-red-400' };
  };

  const bmiStatus = getBmiStatus(metrics.bmi);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold mb-4">
          <Calculator className="w-4 h-4" />
          <span>موتور محاسباتی بیومتریک نورپلنر</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          محاسبه‌گر پیشرفته کالری، ماکرو و BMI
        </h2>
        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
          بر مبنای فرمول استاندارد طلایی میفلین-سنت جور (Mifflin-St Jeor). به یاد داشته باشید این مقادیر شاخص برآوردی دقیق هستند و جایگزین تجویز بالینی پزشک متخصص محسوب نمی‌شوند.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters Box */}
        <div className="lg:col-span-5 bg-brand-card p-6 sm:p-8 rounded-2xl border border-brand-border shadow-glass">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-cyan" />
            مشخصات فردی شما
          </h3>

          <div className="space-y-5">
            {/* Gender Toggle */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">جنسیت فیزیولوژیک</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 rounded-xl font-medium text-sm transition-all border ${
                    gender === 'male'
                      ? 'bg-brand-cyan/20 border-brand-cyan text-white shadow-glow-cyan'
                      : 'bg-brand-surface/40 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  آقا (مرد)
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 rounded-xl font-medium text-sm transition-all border ${
                    gender === 'female'
                      ? 'bg-brand-violet/20 border-brand-violet text-white shadow-glow-violet'
                      : 'bg-brand-surface/40 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  خانم (زن)
                </button>
              </div>
            </div>

            {/* Sliders for Weight, Height, Age */}
            <div>
              <div className="flex justify-between text-xs text-gray-300 mb-1">
                <span>وزن فعلی:</span>
                <span className="font-bold text-brand-cyan">{toPersianDigits(weight)} کیلوگرم</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-300 mb-1">
                <span>قد:</span>
                <span className="font-bold text-brand-cyan">{toPersianDigits(height)} سانتی‌متر</span>
              </div>
              <input
                type="range"
                min="130"
                max="220"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-300 mb-1">
                <span>سن:</span>
                <span className="font-bold text-brand-cyan">{toPersianDigits(age)} سال</span>
              </div>
              <input
                type="range"
                min="14"
                max="80"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
              />
            </div>

            {/* Activity Level Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">میزان فعالیت هفتگی</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                aria-label="میزان فعالیت هفتگی"
                className="w-full bg-brand-surface border border-gray-700/60 rounded-xl px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-brand-cyan"
              >
                <option value={1.2}>کم‌تحرک (کار پشت میز بدون ورزش منظم)</option>
                <option value={1.375}>فعالیت سبک (۱ تا ۳ روز تمرین ملایم در هفته)</option>
                <option value={1.55}>فعالیت متوسط (۳ تا ۵ روز تمرین باشگاهی در هفته)</option>
                <option value={1.725}>بسیار فعال (۶ تا ۷ روز تمرین ورزشی سنگین)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculated Results Presentation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* BMI Card */}
            <div className="bg-brand-card p-5 rounded-2xl border border-gray-800 relative overflow-hidden">
              <div className="text-xs text-gray-400 mb-1">شاخص توده بدنی (BMI)</div>
              <div className="text-3xl font-black text-white mb-2">{toPersianDigits(metrics.bmi)}</div>
              <div className={`text-xs font-semibold ${bmiStatus.color}`}>{bmiStatus.text}</div>
            </div>

            {/* Protein Target Card */}
            <div className="bg-brand-card p-5 rounded-2xl border border-gray-800 relative overflow-hidden">
              <div className="text-xs text-gray-400 mb-1">پروتئین هدف پیشنهادی</div>
              <div className="text-3xl font-black text-brand-neonGreen mb-2">
                {toPersianDigits(metrics.targetProteinGrams)}{' '}
                <span className="text-xs font-normal text-gray-400">گرم در روز</span>
              </div>
              <div className="text-xs text-gray-400">معادل ۲.۰ گرم به ازای هر کیلو وزن برای تحریک سنتز پروتئین</div>
            </div>
          </div>

          {/* Caloric Scenarios */}
          <div className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              اهداف کالری روزانه شما بر اساس مقصد فیتنسی
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-brand-surface/40 border border-gray-800 text-center">
                <span className="text-xs text-red-400 block mb-1">کاهش چربی (کات پایدار)</span>
                <span className="text-xl font-black text-white">{toPersianDigits(metrics.fatLossCalories)}</span>
                <span className="text-[11px] text-gray-400 block mt-1">کالری در روز (-۴۵۰)</span>
              </div>

              <div className="p-4 rounded-xl bg-brand-surface/70 border border-brand-cyan/40 text-center shadow-glow-cyan">
                <span className="text-xs text-brand-cyan block mb-1">تثبیت وزن فعلی</span>
                <span className="text-xl font-black text-white">{toPersianDigits(metrics.maintenanceCalories)}</span>
                <span className="text-[11px] text-gray-400 block mt-1">کالری در روز (TDEE)</span>
              </div>

              <div className="p-4 rounded-xl bg-brand-surface/40 border border-gray-800 text-center">
                <span className="text-xs text-brand-neonGreen block mb-1">عضله‌سازی (بالک تمیز)</span>
                <span className="text-xl font-black text-white">{toPersianDigits(metrics.muscleGainCalories)}</span>
                <span className="text-[11px] text-gray-400 block mt-1">کالری در روز (+۳۵۰)</span>
              </div>
            </div>
          </div>

          {/* Medical & Scientific Disclaimer */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              <strong>یادداشت علمی تیم نورپلنر:</strong> سوخت‌وساز بدن انسان متغیر است. پس از اجرای پلن برای ۲ هفته، وزن‌گیری ناشتا انجام دهید و در صورت لزوم کالری را در گام‌های ۱۰۰ تایی تعدیل نمایید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
