import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Upload, Check } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Helper to get custom uploaded logo from localStorage or direct public asset fallback
 */
export const getSavedLogo = (key: string): string => {
  try {
    const direct = localStorage.getItem(key);
    if (direct) return direct;

    if (key === 'aptivance_custom_logo' || key === 'optivance_custom_logo') {
      const attached = localStorage.getItem('attached_logo_raw');
      if (attached) return attached;
      return '/Logo.jpeg';
    }

    if (key === 'sit_custom_logo') return '/SIT.png';
    if (key === 'naac_custom_logo') return '/NAAC.png';
    if (key === 'iic_custom_logo') return '/IIC.png';

    return '';
  } catch {
    if (key === 'aptivance_custom_logo' || key === 'optivance_custom_logo') return '/Logo.jpeg';
    if (key === 'sit_custom_logo') return '/SIT.png';
    if (key === 'naac_custom_logo') return '/NAAC.png';
    if (key === 'iic_custom_logo') return '/IIC.png';
    return '';
  }
};

/**
 * Hook to trigger re-render on logo changes
 */
export const useLogoUpdate = () => {
  const [, setVersion] = useState(0);
  useEffect(() => {
    const handleUpdate = () => setVersion((v) => v + 1);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('logo_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('logo_updated', handleUpdate);
    };
  }, []);
};

/**
 * Official Srinivas Institute of Technology (SIT, Mangaluru) Logo
 * Renders the exact official SIT image provided
 */
export const SITLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  useLogoUpdate();
  const imgSrc = getSavedLogo('sit_custom_logo');

  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${sizeMap[size]} ${className}`}>
      <img
        src={imgSrc || '/SIT.png'}
        alt="Srinivas Institute of Technology"
        className="w-full h-full object-contain select-none filter drop-shadow-sm"
        onError={(e) => {
          // Fallback to SVG if image not found
          const target = e.currentTarget;
          if (!target.src.endsWith('/SIT.svg')) {
            target.src = '/SIT.svg';
          }
        }}
      />
    </div>
  );
};

/**
 * Official National Assessment and Accreditation Council (NAAC) Logo
 * Renders pure official NAAC emblem (No Grade A text, as requested)
 */
export const NAACLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  useLogoUpdate();
  const imgSrc = getSavedLogo('naac_custom_logo');

  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${sizeMap[size]} ${className}`}>
      <img
        src={imgSrc || '/NAAC.png'}
        alt="NAAC"
        className="w-full h-full object-contain select-none filter drop-shadow-sm"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith('/NAAC.svg')) {
            target.src = '/NAAC.svg';
          }
        }}
      />
    </div>
  );
};

/**
 * Official Institution's Innovation Council (IIC - Ministry of Education) Logo
 * Renders official IIC emblem (No 4-star text, as requested)
 */
export const IICLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  useLogoUpdate();
  const imgSrc = getSavedLogo('iic_custom_logo');

  const sizeMap = {
    sm: 'w-16 h-8',
    md: 'w-28 h-12',
    lg: 'w-40 h-16',
    xl: 'w-52 h-20',
  };

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${sizeMap[size]} ${className}`}>
      <img
        src={imgSrc || '/IIC.png'}
        alt="Institution's Innovation Council"
        className="w-full h-full object-contain select-none filter drop-shadow-sm"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith('/IIC.svg')) {
            target.src = '/IIC.svg';
          }
        }}
      />
    </div>
  );
};

/**
 * Official Srinivas Institute of Technology Horizontal Banner
 */
export const SITHorizontalBadge: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const heights = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${heights[size]} ${className}`}>
      <SITLogo size={size === 'lg' ? 'md' : 'sm'} />
      <div className="flex flex-col justify-center">
        <span className="font-bold text-white tracking-tight leading-tight text-xs sm:text-sm">
          SRINIVAS INSTITUTE OF TECHNOLOGY
        </span>
        <span className="text-[10px] text-zinc-400 font-medium">
          Valachil, Mangaluru · Training &amp; Placement Cell
        </span>
      </div>
    </div>
  );
};

/**
 * Top Institutional Header Strip (SIT, NAAC, IIC)
 * Displays official logos directly with no extra text or badges
 */
export const InstitutionalHeaderStrip: React.FC<{ onOpenLogoManager?: () => void }> = ({
  onOpenLogoManager,
}) => {
  useLogoUpdate();
  const [hasAttached, setHasAttached] = useState(() =>
    Boolean(
      localStorage.getItem('attached_logo_raw') ||
      localStorage.getItem('aptivance_custom_logo') ||
      localStorage.getItem('optivance_custom_logo')
    )
  );

  const handleInstantAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) {
          localStorage.setItem('attached_logo_raw', result);
          localStorage.setItem('aptivance_custom_logo', result);
          localStorage.setItem('optivance_custom_logo', result);
          setHasAttached(true);
          window.dispatchEvent(new Event('logo_updated'));
          window.dispatchEvent(new Event('storage'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenManager = () => {
    if (onOpenLogoManager) {
      onOpenLogoManager();
    } else {
      window.dispatchEvent(new CustomEvent('open_logo_manager'));
    }
  };

  return (
    <div className="w-full bg-[#07080d] border-b border-zinc-800/90 py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
        {/* Left: SIT Institution Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <SITLogo size="sm" />
          <div className="flex flex-col">
            <span className="text-white font-bold text-xs sm:text-sm tracking-tight leading-tight">
              SRINIVAS INSTITUTE OF TECHNOLOGY
            </span>
            <span className="text-zinc-400 text-[10px] hidden sm:inline">
              Valachil, Mangaluru · Training &amp; Placement Cell
            </span>
          </div>
        </div>

        {/* Right: The 3 Clean Official Logos (SIT, NAAC, IIC) + Update Button */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <NAACLogo size="sm" />
          <IICLogo size="sm" />

          {/* Manage / Update Logos Modal Button */}
          <button
            onClick={handleOpenManager}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-[11px] font-semibold transition-all cursor-pointer shadow-sm"
            title="Open Logo Manager to update or customize any logo yourself"
          >
            <Upload className="w-3 h-3 text-amber-400" />
            <span>Update Logos</span>
          </button>

          {/* Quick Attached Logo Sync / Upload */}
          <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-[11px] font-semibold transition-all cursor-pointer shadow-sm">
            {hasAttached ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300 hidden sm:inline">Custom Active</span>
              </>
            ) : (
              <>
                <Upload className="w-3 h-3 text-zinc-400" />
                <span className="hidden sm:inline">Quick Upload</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInstantAttach}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

/**
 * Clean Institutional Logos Row Component for Showcases & Placement Prep
 * Pure official logos of SIT, NAAC, and IIC without extra text labels like "Grade A" or "4star"
 */
export const InstitutionalLogosRow: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
      <SITLogo size={size} />
      <NAACLogo size={size} />
      <IICLogo size={size} />
    </div>
  );
};

/**
 * Institutional Showcase Card for the Homepage
 * Clean showcase displaying the 3 official logos without "Grade A" or "4-star" text
 */
export const InstitutionalShowcaseCard: React.FC = () => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0f111a] to-[#0a0b10] border border-zinc-800 shadow-xl relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Institutional Placement Training Portal</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
            Srinivas Institute of Technology (SIT)
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Administered by the Training &amp; Placement Cell in alignment with NAAC and Institution&apos;s Innovation Council (IIC) guidelines for career readiness.
          </p>
        </div>

        {/* The 3 Official Logos Side by Side */}
        <div className="flex items-center gap-4 sm:gap-6 bg-zinc-950/60 p-3 sm:p-4 rounded-2xl border border-zinc-800/80">
          <div className="flex flex-col items-center">
            <SITLogo size="md" />
            <span className="text-[10px] font-bold text-zinc-300 mt-1.5">SIT</span>
          </div>
          <div className="w-px h-14 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <NAACLogo size="md" />
            <span className="text-[10px] font-bold text-zinc-300 mt-1.5">NAAC</span>
          </div>
          <div className="w-px h-14 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <IICLogo size="md" />
            <span className="text-[10px] font-bold text-zinc-300 mt-1.5">IIC MoE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
