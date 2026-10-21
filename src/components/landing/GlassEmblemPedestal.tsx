import React from 'react';

export const GlassEmblemPedestal: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Atmospheric Radial Studio Glow Behind Pedestal */}
      <div
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full -top-10 opacity-70 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(98,0,234,0.35) 0%, rgba(0,191,165,0.2) 50%, transparent 75%)',
        }}
      />

      {/* The 3D Glass Emblem Object Container with Floating Animation */}
      <div className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 transition-transform duration-700 hover:rotate-1 hover:scale-105 filter drop-shadow-2xl">
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glass Book Gradients with Refraction Shading */}
            <linearGradient id="glassSpine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="glassCoverLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="glassCoverRight" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0F766E" stopOpacity="0.9" />
            </linearGradient>

            {/* Glowing Flame Gradients */}
            <radialGradient id="flameCore" cx="50%" cy="60%" r="55%">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="30%" stopColor="#FFC107" />
              <stop offset="65%" stopColor="#E040FB" />
              <stop offset="100%" stopColor="#3B82F6" />
            </radialGradient>

            {/* Specular Highlight Filter */}
            <filter id="glassBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Pedestal Surface Shadow under Book */}
          <ellipse cx="120" cy="205" rx="75" ry="14" fill="#0F172A" fillOpacity="0.35" filter="blur(6px)" />

          {/* Left Glass Open Leaf */}
          <path
            d="M120 185 C85 168 45 174 30 180 L30 85 C45 80 85 75 120 95 Z"
            fill="url(#glassCoverLeft)"
            stroke="#BAE6FD"
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#glassBloom)"
          />
          {/* Glass Inner Reflection Rim (Left) */}
          <path
            d="M38 94 C50 90 85 86 112 102 L112 172 C85 158 50 162 38 166 Z"
            fill="#FFFFFF"
            fillOpacity="0.18"
            stroke="#E0F2FE"
            strokeWidth="1.5"
          />

          {/* Right Glass Open Leaf */}
          <path
            d="M120 185 C155 168 195 174 210 180 L210 85 C195 80 155 75 120 95 Z"
            fill="url(#glassCoverRight)"
            stroke="#A7F3D0"
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#glassBloom)"
          />
          {/* Glass Inner Reflection Rim (Right) */}
          <path
            d="M202 94 C190 90 155 86 128 102 L128 172 C155 158 190 162 202 166 Z"
            fill="#FFFFFF"
            fillOpacity="0.18"
            stroke="#CCFBF1"
            strokeWidth="1.5"
          />

          {/* Center Spine Glass Prism */}
          <path
            d="M116 186 C120 188 124 188 128 186 L128 94 C124 92 120 92 116 94 Z"
            fill="url(#glassSpine)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Glowing Translucent Circuit Tree Nodes Inside the Book */}
          {/* Trunk */}
          <path d="M120 178 L120 98" stroke="#00E5FF" strokeWidth="4.5" strokeLinecap="round" />
          {/* Left branches */}
          <path d="M120 155 H95 V128" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="95" cy="128" r="6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M120 134 H80 V105" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="80" cy="105" r="6" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="2" />

          {/* Right branches */}
          <path d="M120 155 H145 V128" fill="none" stroke="#2DD4BF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="145" cy="128" r="6" fill="#2DD4BF" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M120 134 H160 V105" fill="none" stroke="#2DD4BF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="160" cy="105" r="6" fill="#34D399" stroke="#FFFFFF" strokeWidth="2" />

          {/* Luminescent Torch Flame with Multi-Layer Chromatic Aura */}
          {/* Outer Flame Glow */}
          <path
            d="M120 90 C100 78 98 48 118 20 C122 35 132 40 135 28 C145 45 142 68 120 90 Z"
            fill="url(#flameCore)"
            stroke="#FFFFFF"
            strokeWidth="2"
            filter="url(#glassBloom)"
          />
          {/* Inner Golden Core */}
          <path
            d="M120 84 C110 74 108 55 120 36 C124 46 128 54 122 66 C125 72 124 78 120 84 Z"
            fill="#FFF59D"
            fillOpacity="0.9"
          />
        </svg>
      </div>

      {/* Realistic Pedestal Surface (White Studio Table with Draped Linen Falloff) */}
      <div className="relative -mt-8 sm:-mt-10 w-64 sm:w-80 md:w-96 flex flex-col items-center">
        {/* Pedestal Top Rim */}
        <div className="w-full h-8 sm:h-10 rounded-full bg-gradient-to-b from-white via-slate-100 to-slate-200 border-t border-white shadow-md flex items-center justify-center">
          <div className="w-11/12 h-3 rounded-full bg-white/70 blur-[2px]" />
        </div>
        {/* Draped Studio Cloth Base */}
        <div
          className="w-11/12 h-10 sm:h-12 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-b-2xl shadow-xl border-x border-b border-white/50"
          style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
          }}
        />
        {/* Soft Floor Shadow */}
        <div className="w-full h-4 bg-slate-900/15 rounded-full blur-md -mt-2" />
      </div>
    </div>
  );
};
