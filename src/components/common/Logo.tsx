import React from 'react';
import { getSavedLogo, useLogoUpdate } from './InstitutionalLogos';

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
  useLogoUpdate();
  const customImg =
    getSavedLogo('aptivance_custom_logo') ||
    getSavedLogo('optivance_custom_logo') ||
    '/Logo.jpeg';

  const heights = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
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
      {/* Official Provided APTIVANCE Logo Image */}
      <img
        src={customImg}
        alt="APTIVANCE Logo"
        className={`${heights[size]} w-auto max-w-[260px] object-contain select-none rounded filter drop-shadow-sm`}
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith('/Logo.png')) {
            target.src = '/Logo.png';
          }
        }}
      />

      {/* Fallback/Accompanying Tagline if requested and not in icon-only mode */}
      {showTagline && size !== 'sm' && (
        <span className="sr-only">APTIVANCE Placement &amp; Aptitude Portal</span>
      )}
    </div>
  );
};
