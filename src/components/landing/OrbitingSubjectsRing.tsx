import React, { useState } from 'react';
import { GlassEmblemPedestal } from './GlassEmblemPedestal';

export const OrbitingSubjectsRing: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const innerSubjects = [
    { name: 'AP Calculus BC', icon: '📐', color: 'bg-blue-600' },
    { name: 'Chemistry', icon: '⚗️', color: 'bg-teal-600' },
    { name: 'AP Physics 1', icon: '⚡', color: 'bg-purple-600' },
    { name: 'CS Principles', icon: '💻', color: 'bg-indigo-600' },
  ];

  const outerSubjects = [
    { name: 'Biology & Genetics', icon: '🧬', color: 'bg-emerald-600' },
    { name: 'World History', icon: '🏛️', color: 'bg-amber-600' },
    { name: 'Microeconomics', icon: '📈', color: 'bg-rose-600' },
    { name: 'Spanish Fluency', icon: '🗣️', color: 'bg-cyan-600' },
    { name: 'Art & Design', icon: '🎨', color: 'bg-fuchsia-600' },
  ];

  return (
    <div
      className="relative w-full max-w-[540px] h-[480px] sm:h-[540px] flex items-center justify-center mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Outer Concentric Orbit Track */}
      <div className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full border border-dashed border-indigo-300/40 pointer-events-none" />

      {/* Inner Concentric Orbit Track */}
      <div className="absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full border border-indigo-200/35 pointer-events-none" />

      {/* Centerpiece 3D Glass Emblem */}
      <div className="relative z-20 pointer-events-auto">
        <GlassEmblemPedestal />
      </div>

      {/* Inner Orbit Revolving Container */}
      <div
        className={`absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] pointer-events-none transition-transform duration-1000 ${
          isPaused ? '' : 'animate-spin-slow'
        }`}
        style={{ animationDuration: '34s' }}
      >
        {innerSubjects.map((subject, idx) => {
          const angle = (idx / innerSubjects.length) * 2 * Math.PI;
          const radius = 130; // Radius in px
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={subject.name}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-white text-xs font-semibold backdrop-blur-md border border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-cyan-400/50 ${subject.color}`}
              >
                <span className="text-sm">{subject.icon}</span>
                <span>{subject.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outer Orbit Revolving Container (Reverse Direction) */}
      <div
        className={`absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] pointer-events-none transition-transform duration-1000 ${
          isPaused ? '' : 'animate-spin-reverse-slow'
        }`}
        style={{ animationDuration: '48s' }}
      >
        {outerSubjects.map((subject, idx) => {
          const angle = (idx / outerSubjects.length) * 2 * Math.PI;
          const radius = 190; // Radius in px
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={subject.name}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-white text-xs font-semibold backdrop-blur-md border border-white/40 transition-all duration-300 hover:scale-110 hover:shadow-cyan-400/50 ${subject.color}`}
              >
                <span className="text-sm">{subject.icon}</span>
                <span>{subject.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
