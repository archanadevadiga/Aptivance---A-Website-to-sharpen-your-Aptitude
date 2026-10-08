import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  iconOnly = false,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]',
    xl: 'text-[15px]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem matching user's Aptivance mark */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]"
        >
          <defs>
            <linearGradient id="blueStemGrad" x1="40" y1="180" x2="110" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0a192f" />
              <stop offset="50%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            <linearGradient id="goldSwooshGrad" x1="45" y1="140" x2="165" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>

            <linearGradient id="goldStarGrad" x1="150" y1="20" x2="175" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="rightPillarGrad" x1="120" y1="70" x2="155" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Left leg of 'A' */}
          <path
            d="M95 24L38 145C36 150 40 155 46 155H70L95 95L110 135H128L98 24C97 22 95.5 22 95 24Z"
            fill="url(#blueStemGrad)"
          />

          {/* Right Pillar with placement symbols */}
          <path
            d="M125 78L160 152C162 155 159 157 155 157H128L108 114L125 78Z"
            fill="url(#rightPillarGrad)"
          />

          {/* Open Book in the base triangle */}
          <g transform="translate(68, 114)">
            {/* Book left page */}
            <path
              d="M32 20C24 16 12 16 2 20V32C12 28 24 28 32 32V20Z"
              fill="#ffffff"
              opacity="0.95"
            />
            {/* Book right page */}
            <path
              d="M32 20C40 16 52 16 62 20V32C52 28 40 28 32 32V20Z"
              fill="#e2e8f0"
              opacity="0.9"
            />
            {/* Book center spine */}
            <line x1="32" y1="20" x2="32" y2="33" stroke="#f59e0b" strokeWidth="1.5" />
          </g>

          {/* The Rising Amber Swoosh representing student growth */}
          <path
            d="M44 142C75 110 115 85 160 38C152 46 122 75 92 108C70 132 54 142 44 142Z"
            fill="url(#goldSwooshGrad)"
          />

          {/* Achieving Student Silhouette reaching up */}
          <circle cx="132" cy="40" r="8" fill="#1e293b" />
          <path
            d="M122 62C122 53 128 47 136 47C142 47 148 51 154 57L164 42L167 46L154 65C150 71 143 73 137 72L122 62Z"
            fill="#1e293b"
          />

          {/* Five-pointed Golden Star of Placement Success */}
          <polygon
            points="167,20 171,30 181,31 173,38 176,48 167,42 158,48 161,38 153,31 163,30"
            fill="url(#goldStarGrad)"
            filter="drop-shadow(0px 0px 4px rgba(245, 158, 11, 0.8))"
          />

          {/* 4 Miniature Discipline Icons on the right flank: Brain, Graph, Gear, Bulb */}
          <g fill="#ffffff" opacity="0.9" transform="translate(133, 90)">
            {/* Brain symbol */}
            <circle cx="4" cy="2" r="2.5" fill="#f8fafc" />
            <circle cx="9" cy="2" r="2.5" fill="#f8fafc" />
            
            {/* Bar chart symbol */}
            <rect x="0" y="14" width="2.5" height="5" rx="0.5" fill="#38bdf8" />
            <rect x="4" y="11" width="2.5" height="8" rx="0.5" fill="#38bdf8" />
            <rect x="8" y="8" width="2.5" height="11" rx="0.5" fill="#fbbf24" />

            {/* Gear symbol */}
            <circle cx="5" cy="28" r="3.5" stroke="#f8fafc" strokeWidth="1.5" fill="none" />
            <circle cx="5" cy="28" r="1.2" fill="#f8fafc" />

            {/* Lightbulb symbol */}
            <path d="M5 38C3.5 38 2.5 39 2.5 40.5C2.5 41.5 3.2 42.2 3.8 42.8V44.5H6.2V42.8C6.8 42.2 7.5 41.5 7.5 40.5C7.5 39 6.5 38 5 38Z" fill="#fbbf24" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className={`font-black tracking-tight leading-none text-white ${textSizes[size]} font-heading flex items-center`}>
            <span>APTI</span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 font-extrabold">
              V
            </span>
            <span className="text-white">ANCE</span>
          </div>
          {showTagline && (
            <div className={`font-medium tracking-wide text-zinc-400 uppercase mt-1 flex items-center gap-1.5 ${taglineSizes[size]}`}>
              <span>Sharpen Your Skills</span>
              <span className="text-amber-500/70 font-bold">·</span>
              <span className="text-amber-400">Shape Your Future</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
