// Constants used throughout the application

export const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: 'Calculator' },
  { id: 'science', name: 'Science', icon: 'Flask' },
  { id: 'english', name: 'English', icon: 'BookOpen' },
  { id: 'history', name: 'History', icon: 'Scroll' },
  { id: 'art', name: 'Art', icon: 'Palette' },
  { id: 'music', name: 'Music', icon: 'Music' },
  { id: 'computer-science', name: 'Computer Science', icon: 'Code' },
  { id: 'physics', name: 'Physics', icon: 'Atom' },
  { id: 'chemistry', name: 'Chemistry', icon: 'Beaker' },
  { id: 'biology', name: 'Biology', icon: 'Microscope' },
  { id: 'geography', name: 'Geography', icon: 'Globe' },
] as const;

export const GRADES = [
  { value: 'K', label: 'Kindergarten' },
  { value: '1', label: '1st Grade' },
  { value: '2', label: '2nd Grade' },
  { value: '3', label: '3rd Grade' },
  { value: '4', label: '4th Grade' },
  { value: '5', label: '5th Grade' },
  { value: '6', label: '6th Grade' },
  { value: '7', label: '7th Grade' },
  { value: '8', label: '8th Grade' },
  { value: '9', label: '9th Grade' },
  { value: '10', label: '10th Grade' },
  { value: '11', label: '11th Grade' },
  { value: '12', label: '12th Grade' },
  { value: 'college', label: 'College' },
] as const;

export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IN', name: 'India' },
  { code: 'JP', name: 'Japan' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'GR', name: 'Greece' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CL', name: 'Chile' },
  { code: 'PE', name: 'Peru' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'RU', name: 'Russia' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'TR', name: 'Turkey' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'IL', name: 'Israel' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'NP', name: 'Nepal' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'LA', name: 'Laos' },
] as const;

export const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic skill tree access',
      'Limited AI tutoring (10/day)',
      'Community guilds',
      'Standard analytics',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    features: [
      'Full skill tree access',
      'Unlimited AI tutoring',
      'Premium guilds',
      'Advanced analytics',
      'Priority support',
      'Custom avatars',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    features: [
      'Everything in Pro',
      '1-on-1 mentor sessions',
      'Certificate generation',
      'Portfolio export',
      'Exclusive vault items',
      'Early access features',
    ],
  },
] as const;

export const ICON_MAP: Record<string, string> = {
  'ai-ideas': 'Lightbulb',
  'growth-analytics': 'TrendingUp',
  'adaptive-learning': 'BrainCircuit',
  'systems-engine': 'Settings',
  'customization': 'Settings2',
  'community-guilds': 'Network',
  'curriculum': 'BookOpen',
  'goals-quests': 'Target',
};

export const VAULT_COSMETICS: Array<{
  id: string;
  name: string;
  type: 'avatar_frame' | 'background' | 'effect';
  cost: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}> = [
  // Avatar frames
  { id: 'frame-gold', name: 'Golden Frame', type: 'avatar_frame', cost: 500, rarity: 'rare' },
  { id: 'frame-amethyst', name: 'Amethyst Frame', type: 'avatar_frame', cost: 750, rarity: 'epic' },
  { id: 'frame-platinum', name: 'Platinum Frame', type: 'avatar_frame', cost: 1000, rarity: 'legendary' },
  // Backgrounds
  { id: 'bg-stars', name: 'Starry Night', type: 'background', cost: 300, rarity: 'common' },
  { id: 'bg-forest', name: 'Enchanted Forest', type: 'background', cost: 500, rarity: 'rare' },
  { id: 'bg-galaxy', name: 'Galaxy Nexus', type: 'background', cost: 800, rarity: 'epic' },
  // Effects
  { id: 'effect-sparkle', name: 'Sparkle Trail', type: 'effect', cost: 400, rarity: 'rare' },
  { id: 'effect-rainbow', name: 'Rainbow Aura', type: 'effect', cost: 600, rarity: 'epic' },
  { id: 'effect-fire', name: 'Phoenix Flame', type: 'effect', cost: 900, rarity: 'legendary' },
];

export const LEARNING_PACES: Array<{
  id: 'relaxed' | 'moderate' | 'intensive';
  name: string;
  description: string;
}> = [
  { id: 'relaxed', name: 'Relaxed', description: '3-5 hours per week' },
  { id: 'moderate', name: 'Moderate', description: '5-10 hours per week' },
  { id: 'intensive', name: 'Intensive', description: '10+ hours per week' },
];

export const GOALS: Array<{ id: string; name: string }> = [
  { id: 'improve-grades', name: 'Improve Grades' },
  { id: 'learn-new', name: 'Learn Something New' },
  { id: 'exam-prep', name: 'Exam Preparation' },
  { id: 'career', name: 'Career Development' },
  { id: 'personal-interest', name: 'Personal Interest' },
  { id: 'competition', name: 'Competition Prep' },
];

export const POMODORO_PRESETS: Array<{ name: string; work: number; break: number }> = [
  { name: 'Classic', work: 25, break: 5 },
  { name: 'Extended', work: 50, break: 10 },
  { name: 'Short', work: 15, break: 3 },
  { name: 'Deep Work', work: 90, break: 20 },
];

export const BADGE_TIERS: Record<
  'bronze' | 'silver' | 'gold' | 'platinum',
  { color: string; threshold: number }
> = {
  bronze: { color: '#CD7F32', threshold: 0 },
  silver: { color: '#C0C0C0', threshold: 1000 },
  gold: { color: '#FFD700', threshold: 5000 },
  platinum: { color: '#E5E4E2', threshold: 10000 },
};

export const SESSION_TIMEOUT_MINUTES = 30;
export const SESSION_WARNING_SECONDS = 60;

export const AI_RATE_LIMIT_HOURLY = 30;
export const CODE_EXECUTION_RATE_LIMIT_HOURLY = 50;
