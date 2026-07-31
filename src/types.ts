export interface ShippingDetails {
  name: string;
  email: string;
  allergies: string;
  phoneCountry: string;
  phoneCode: string;
  phone: string;
  shipDate: string;
  address: string;
  birthdayMonth: string;
  birthdayDay: string;
  birthdayYear?: string;
}

export interface UserPreferences {
  hobbies: string[];
  relax: string[];
  drinks: string[];
  cravings: string[];
  shipping: ShippingDetails;
}

export interface OptionItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  category?: string;
}

export interface QuestionStep {
  id: number;
  key: keyof Omit<UserPreferences, 'shipping'> | 'shipping' | 'welcome' | 'result';
  title: string;
  botMessage: string;
  subtext?: string;
  type: 'welcome' | 'multi-select' | 'single-select' | 'form' | 'reveal';
  options?: OptionItem[];
}

export interface GiftBoxItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

export interface CuratedGiftResult {
  boxTitle: string;
  customMessage: string;
  curatedHighlights: string[];
  tagline: string;
  items: GiftBoxItem[];
  trackingCode: string;
  estimatedDelivery: string;
}

export interface RecommendationFeedback {
  rating: number;
  comment: string;
  authorName: string;
  tags: string[];
  submittedAt?: string;
}
