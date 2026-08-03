import React, { useState } from 'react';

const Logo = ({ className = '', size = 'md', forceWhite = false }) => {
  const [imageError, setImageError] = useState(false);

  // Responsive sizes for the image logo
  const imageSizes = {
    sm: 'h-12 sm:h-14 md:h-16',
    md: 'h-16 sm:h-20 md:h-[84px]',
    lg: 'h-28 sm:h-36 md:h-[145px]'
  };

  const heightClass = imageSizes[size] || imageSizes.md;

  // Primary: Render the user's actual logo.jpeg image from /public
  if (!imageError) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo.jpeg"
          alt="Shreestone Ceramics Logo"
          onError={() => setImageError(true)}
          className={`${heightClass} w-auto object-contain rounded-lg transition-transform duration-300`}
        />
      </div>
    );
  }

  // Fallback: Vector SVG Lotus-O + Cinzel Roman Serif Typography
  const sizeClasses = {
    sm: {
      text: 'text-base sm:text-lg',
      lotus: 'w-[1.25em] h-[1.25em] mx-[0.06em]',
      subtext: 'text-[7px] sm:text-[8px] tracking-[0.32em] mt-0.5'
    },
    md: {
      text: 'text-xl sm:text-2xl',
      lotus: 'w-[1.25em] h-[1.25em] mx-[0.06em]',
      subtext: 'text-[9px] sm:text-[10px] tracking-[0.34em] mt-0.5'
    },
    lg: {
      text: 'text-2xl sm:text-3xl',
      lotus: 'w-[1.25em] h-[1.25em] mx-[0.06em]',
      subtext: 'text-[10px] sm:text-[11px] tracking-[0.36em] mt-1'
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const textColor = forceWhite ? 'text-white' : 'text-charcoal-900 dark:text-white';

  return (
    <div className={`flex flex-col items-end select-none ${className}`}>
      {/* Top Main Brand Text: SHREEST + (Lotus O) + NE */}
      <div className={`flex items-center font-cinzel font-bold tracking-wide leading-none ${currentSize.text} ${textColor}`}>
        <span>SHREEST</span>
        
        {/* Golden Lotus O Emblem */}
        <span className={`inline-flex items-center justify-center ${currentSize.lotus}`} aria-label="O">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(212,175,55,0.25)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="shreestone-gold-logo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F4E0A5" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#C59B27" />
                <stop offset="100%" stopColor="#F4E0A5" />
              </linearGradient>
            </defs>

            {/* Outer Golden Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#shreestone-gold-logo)"
              strokeWidth="6"
            />
            
            {/* Inner Accent Thin Ring */}
            <circle
              cx="50"
              cy="50"
              r="37"
              stroke="url(#shreestone-gold-logo)"
              strokeWidth="1.5"
              strokeOpacity="0.55"
            />

            {/* Lotus Flower Base Crescent */}
            <path
              d="M22,60 C35,75 65,75 78,60 C66,68 34,68 22,60 Z"
              fill="url(#shreestone-gold-logo)"
            />
            <path
              d="M26,65 C38,77 62,77 74,65 C62,71 38,71 26,65 Z"
              fill="url(#shreestone-gold-logo)"
              opacity="0.8"
            />

            {/* 5 Lotus Petals */}
            {/* Center Tall Petal */}
            <path
              d="M50,18 C40,34 42,54 50,66 C58,54 60,34 50,18 Z"
              fill="url(#shreestone-gold-logo)"
            />

            {/* Left Inner Petal */}
            <path
              d="M50,66 C41,52 32,43 28,31 C38,31 46,45 50,66 Z"
              fill="url(#shreestone-gold-logo)"
              opacity="0.95"
            />

            {/* Right Inner Petal */}
            <path
              d="M50,66 C59,52 68,43 72,31 C62,31 54,45 50,66 Z"
              fill="url(#shreestone-gold-logo)"
              opacity="0.95"
            />

            {/* Left Outer Petal */}
            <path
              d="M50,66 C38,56 24,50 18,42 C26,38 38,48 50,66 Z"
              fill="url(#shreestone-gold-logo)"
              opacity="0.85"
            />

            {/* Right Outer Petal */}
            <path
              d="M50,66 C62,56 76,50 82,42 C74,38 62,48 50,66 Z"
              fill="url(#shreestone-gold-logo)"
              opacity="0.85"
            />
          </svg>
        </span>
        
        <span>NE</span>
      </div>

      {/* Bottom Subtitle: CERAMIC */}
      <span className={`font-cinzel font-medium uppercase leading-none ${currentSize.subtext} ${textColor} opacity-95`}>
        CERAMIC
      </span>
    </div>
  );
};

export default Logo;
