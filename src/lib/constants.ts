import { Lightbulb, TrendingUp, BrainCircuit, Settings, BarChart3, Settings2, Network, Share2, BookOpen, Target } from 'lucide-react'

export const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'Computer Science',
] as const

export const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'India',
  'Japan',
  'China',
  'Brazil',
  'Mexico',
  'South Korea',
  'Italy',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Singapore',
] as const

export const TIERS = [
  { id: 'free', name: 'Free', price: 0, features: ['Basic skill trees', 'Limited AI queries', 'Community access'] },
  { id: 'pro', name: 'Pro', price: 9.99, features: ['All skill trees', 'Unlimited AI queries', 'Advanced analytics', 'Priority support'] },
  { id: 'school', name: 'School', price: 0, features: ['All Pro features', 'Classroom management', 'Teacher tools', 'Bulk licensing'] },
] as const

export const GRADES = [
  'K',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'College',
  'Other',
] as const

export const GOALS = [
  'Improve grades',
  'Prepare for exams',
  'Learn new skills',
  'Study with friends',
  'Track progress',
  'Earn achievements',
] as const

export const PACES = [
  { id: 'relaxed', name: 'Relaxed', description: '15-30 minutes per day' },
  { id: 'moderate', name: 'Moderate', description: '30-60 minutes per day' },
  { id: 'intensive', name: 'Intensive', description: '60+ minutes per day' },
] as const

export const ICON_MAP = {
  'ai-ideas': Lightbulb,
  'growth-analytics': TrendingUp,
  'adaptive-learning': BrainCircuit,
  'systems-engine': Settings,
  'customization': Settings2,
  'community-guilds': Network,
  'guilds': Share2,
  'curriculum': BookOpen,
  'goals-quests': Target,
  'analytics': BarChart3,
} as const

export const AVATAR_COLORS = [
  '#1A237E', // Deep Cobalt
  '#6200EA', // Royal Amethyst
  '#00BFA5', // Tech Teal
  '#FFC107', // Academic Gold
  '#E91E63', // Pink
  '#4CAF50', // Green
  '#FF5722', // Orange
  '#607D8B', // Blue Grey
] as const

export const VAULT_COSMETICS = {
  avatars: [
    { id: 'avatar-1', name: 'Scholar', cost: 200, icon: '🎓' },
    { id: 'avatar-2', name: 'Explorer', cost: 250, icon: '🗺️' },
    { id: 'avatar-3', name: 'Scientist', cost: 300, icon: '🔬' },
    { id: 'avatar-4', name: 'Artist', cost: 250, icon: '🎨' },
  ],
  themes: [
    { id: 'theme-1', name: 'Amethyst', cost: 300, icon: '💜' },
    { id: 'theme-2', name: 'Teal', cost: 300, icon: '🌊' },
    { id: 'theme-3', name: 'Sunset', cost: 250, icon: '🌅' },
    { id: 'theme-4', name: 'Night', cost: 350, icon: '🌙' },
  ],
  badgeFrames: [
    { id: 'frame-1', name: 'Gold', cost: 400, icon: '🌟' },
    { id: 'frame-2', name: 'Diamond', cost: 500, icon: '💎' },
    { id: 'frame-3', name: 'Ruby', cost: 450, icon: '❤️' },
    { id: 'frame-4', name: 'Emerald', cost: 400, icon: '💚' },
  ],
  titles: [
    { id: 'title-1', name: 'Pro', cost: 200, icon: '🎓' },
    { id: 'title-2', name: 'Scholar', cost: 150, icon: '📖' },
    { id: 'title-3', name: 'Innovator', cost: 250, icon: '💡' },
    { id: 'title-4', name: 'Master', cost: 300, icon: '🏆' },
  ],
} as const

export const KEYBOARD_SHORTCUTS = {
  commandPalette: { keys: ['Cmd', 'K'], description: 'Open command palette' },
  aiCompanion: { keys: ['Cmd', '/'], description: 'Toggle AI companion' },
  journal: { keys: ['Cmd', 'J'], description: 'Quick journal entry' },
  close: { keys: ['Esc'], description: 'Close modal/drawer' },
  help: { keys: ['?'], description: 'Show keyboard shortcuts' },
} as const
