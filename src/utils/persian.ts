// Converts Latin digits (0-9) to Persian digits (۰-۹)
export const toPersianDigits = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (match) => persianDigits[parseInt(match, 10)]);
};

// Formats a monetary number into Iranian Toman with thousands separators
export const formatToman = (amount: number): string => {
  const formattedNumber = new Intl.NumberFormat('fa-IR').format(amount);
  return `${formattedNumber} تومان`;
};

// Calculates discounted price
export const getDiscountedPrice = (price: number, discountPercent?: number): number => {
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
};

// Scientific Mifflin-St Jeor TDEE formula & BMI calculation
export const calculateFitnessMetrics = (
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: 'male' | 'female',
  activityMultiplier: number
) => {
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  // Mifflin - St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  const maintenanceCalories = Math.round(bmr * activityMultiplier);
  const fatLossCalories = Math.round(maintenanceCalories - 450);
  const muscleGainCalories = Math.round(maintenanceCalories + 350);

  // Suggested optimal protein intake for athletes (2g per kg)
  const targetProteinGrams = Math.round(weightKg * 2.0);

  return {
    bmi,
    bmr: Math.round(bmr),
    maintenanceCalories,
    fatLossCalories,
    muscleGainCalories,
    targetProteinGrams,
  };
};
