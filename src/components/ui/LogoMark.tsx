import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface LogoMarkProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'horizontal' | 'stacked' | 'icon-only' | 'full' | 'icon' | 'mono'
  size?: number
  lightMode?: boolean
}

export default function LogoMark({ variant = 'horizontal', size = 40, className, lightMode = false, ...props }: LogoMarkProps) {
  // Reusable SVG Emblem: Open Book + Circuit Tree + Gradient Flame
  const EmblemSvg = (
    <div className="relative flex items-center justify-center filter drop-shadow-md">
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 md:w-11 md:h-11 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9100" />
            <stop offset="45%" stopColor="#E040FB" />
            <stop offset="100%" stopColor="#304FFE" />
          </linearGradient>
          <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="circuitGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00BFA5" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
        </defs>

        {/* Translucent Book Pages Base */}
        <path
          d="M14 68 C28 62, 44 65, 50 72 C56 65, 72 62, 86 68 L86 36 C72 30, 56 33, 50 40 C44 33, 28 30, 14 36 Z"
          fill="url(#bookGrad)"
          fillOpacity="0.85"
          stroke="#93C5FD"
          strokeWidth="2"
        />
        <path
          d="M20 74 C32 68, 44 71, 50 77 C56 71, 68 68, 80 74 L80 44 C68 39, 56 42, 50 48 C44 42, 32 39, 20 44 Z"
          fill="#FFFFFF"
          fillOpacity="0.3"
          stroke="#60A5FA"
          strokeWidth="1.5"
        />

        {/* Central Circuit Tree */}
        <line x1="50" y1="72" x2="50" y2="40" stroke="url(#circuitGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* Left Circuit Branches */}
        <path d="M50 60 H38 V48" fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="48" r="3.2" fill="#00E5FF" />
        <path d="M50 50 H32 V40" fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="40" r="3.2" fill="#00E5FF" />

        {/* Right Circuit Branches */}
        <path d="M50 60 H62 V48" fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="62" cy="48" r="3.2" fill="#00E5FF" />
        <path d="M50 50 H68 V40" fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="68" cy="40" r="3.2" fill="#00E5FF" />

        {/* Radiant Flame of Knowledge */}
        <path
          d="M50 36 C42 30, 41 19, 49 10 C50 16, 54 18, 55 14 C59 21, 58 30, 50 36 Z"
          fill="url(#flameGrad)"
          className="animate-pulse"
        />
        {/* Inner core flame */}
        <path
          d="M50 34 C46 29, 45 22, 50 16 C53 21, 54 26, 50 34 Z"
          fill="#FFF9C4"
          fillOpacity="0.85"
        />
      </svg>
    </div>
  );

  // Map old variants to new variants for backward compatibility
  const effectiveVariant = variant === 'full' ? 'horizontal' : variant === 'icon' ? 'icon-only' : variant

  if (effectiveVariant === 'icon-only') {
    return <div className={cn('inline-flex items-center', className)} {...props}>{EmblemSvg}</div>;
  }

  if (effectiveVariant === 'stacked') {
    return (
      <div className={cn('flex flex-col items-center text-center p-3 select-none', className)} {...props}>
        <div className="w-16 h-16 mb-2 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="flameGradStacked" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF9100" />
                <stop offset="45%" stopColor="#E040FB" />
                <stop offset="100%" stopColor="#304FFE" />
              </linearGradient>
              <linearGradient id="bookGradStacked" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>
            <path
              d="M14 68 C28 62, 44 65, 50 72 C56 65, 72 62, 86 68 L86 36 C72 30, 56 33, 50 40 C44 33, 28 30, 14 36 Z"
              fill="url(#bookGradStacked)"
              stroke="#93C5FD"
              strokeWidth="2"
            />
            <line x1="50" y1="72" x2="50" y2="40" stroke="#00E5FF" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M50 60 H38 V48" fill="none" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="38" cy="48" r="3.5" fill="#00E5FF" />
            <path d="M50 50 H32 V40" fill="none" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="40" r="3.5" fill="#00E5FF" />
            <path d="M50 60 H62 V48" fill="none" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="62" cy="48" r="3.5" fill="#00E5FF" />
            <path d="M50 50 H68 V40" fill="none" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="68" cy="40" r="3.5" fill="#00E5FF" />
            <path
              d="M50 36 C42 30, 41 19, 49 10 C50 16, 54 18, 55 14 C59 21, 58 30, 50 36 Z"
              fill="url(#flameGradStacked)"
            />
          </svg>
        </div>
        <span
          className={cn('font-extrabold tracking-widest text-2xl uppercase font-jakarta', lightMode ? 'text-white' : 'text-[#1A237E]')}
        >
          ACADEMICA
        </span>
        <span
          className={cn('text-xs mt-1 max-w-[200px] leading-tight font-medium', lightMode ? 'text-slate-300' : 'text-[#1A237E]/80')}
        >
          Intelligent Design Hub for AI & Brand Professionals
        </span>
      </div>
    );
  }

  // Horizontal Lockup
  return (
    <div className={cn('flex items-center gap-3 select-none', className)} {...props}>
      {EmblemSvg}
      <div className="flex flex-col text-left">
        <span
          className={cn('font-black text-xl tracking-wider uppercase font-jakarta leading-none', lightMode ? 'text-white' : 'text-[#1A237E]')}
        >
          ACADEMICA
        </span>
        <span
          className={cn('text-[9.5px] uppercase tracking-widest font-semibold mt-1', lightMode ? 'text-teal-300' : 'text-[#6200EA]')}
        >
          Intelligent Learning Hub
        </span>
      </div>
    </div>
  );
}
