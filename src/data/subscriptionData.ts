export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  features: PlanFeature[];
  mostPopular?: boolean;
  color: string;
  savings?: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Basic access to educational content',
    color: 'gray',
    features: [
      { name: 'Access to 4 games', included: true },
      { name: 'Basic activities', included: true },
      { name: 'Single child profile', included: true },
      { name: 'Basic progress tracking', included: true },
      { name: 'Premium games', included: false },
      { name: 'No ads', included: false },
      { name: 'Offline mode', included: false },
      { name: 'Multiple child profiles', included: false },
      { name: 'Advanced progress reports', included: false },
      { name: 'Printable worksheets', included: false },
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 5.99,
    period: 'month',
    description: 'Perfect for casual learners',
    color: 'primary',
    features: [
      { name: 'Access to all games', included: true },
      { name: 'All basic activities', included: true },
      { name: 'Up to 2 child profiles', included: true },
      { name: 'Standard progress tracking', included: true },
      { name: 'Ad-free experience', included: true },
      { name: 'Some printable worksheets', included: true },
      { name: 'Premium games', included: true },
      { name: 'Offline mode', included: false },
      { name: 'Advanced progress reports', included: false },
      { name: 'Priority support', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    period: 'month',
    description: 'The complete educational experience',
    mostPopular: true,
    color: 'secondary',
    features: [
      { name: 'Access to all games', included: true },
      { name: 'All activities and worksheets', included: true },
      { name: 'Up to 5 child profiles', included: true },
      { name: 'Detailed progress analytics', included: true },
      { name: 'Ad-free experience', included: true },
      { name: 'Offline mode for selected games', included: true },
      { name: 'Early access to new content', included: true },
      { name: 'Parent resource guides', included: true },
      { name: 'Teacher dashboard', included: true },
      { name: 'Priority support', included: true },
    ]
  },
  {
    id: 'premium-annual',
    name: 'Premium Annual',
    price: 95.88,
    period: 'year',
    description: 'Our best value option',
    color: 'accent',
    savings: 'Save 20%',
    features: [
      { name: 'All Premium features', included: true },
      { name: 'Unlimited child profiles', included: true },
      { name: 'Priority access to new games', included: true },
      { name: 'Quarterly parent webinars', included: true },
      { name: 'Custom learning paths', included: true },
    ]
  }
];

export default subscriptionPlans;