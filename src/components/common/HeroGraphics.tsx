import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Brain, BookOpenCheck, ShieldAlert, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroGraphics: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[380px] sm:h-[440px] flex items-center justify-center select-none overflow-visible">
      {/* Background ambient circular rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-amber-500/10 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border border-amber-500/15"
        />
        <div className="absolute w-[180px] h-[180px] rounded-full bg-amber-500/10 blur-3xl animate-pulse-glow" />
      </div>

      {/* Central Core: The Golden Placement Target */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 flex flex-col items-center justify-center p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#181a24] to-[#0c0d14] border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-center group cursor-pointer hover:border-amber-400 transition-colors"
      >
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg flex items-center justify-center mb-2"
        >
          <div className="w-full h-full bg-[#0a0b10] rounded-[14px] flex items-center justify-center">
            <Award className="w-8 h-8 text-amber-400" />
          </div>
        </motion.div>

        <div className="text-xs uppercase tracking-widest text-amber-400 font-bold font-heading">
          Target Objective
        </div>
        <div className="text-base sm:text-xl font-black text-white font-heading mt-0.5">
          Placement Cleared
        </div>
        <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tier-1 Offer Ready</span>
        </div>
      </motion.div>

      {/* Orbital Node 1: Quantitative Mastery (Top Left) */}
      <motion.div
        initial={{ x: -60, y: -40, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute top-4 sm:top-8 left-2 sm:left-12 z-20"
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="p-3 sm:p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl flex items-center gap-3 hover:border-amber-400 transition-all hover:scale-105"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white font-heading">
              Quant Foundations
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              LCM · % Shortcuts · TSD
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Orbital Node 2: Logical Reasoning (Top Right) */}
      <motion.div
        initial={{ x: 60, y: -40, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-4 sm:top-8 right-2 sm:right-12 z-20"
      >
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="p-3 sm:p-4 rounded-2xl bg-zinc-900/90 border border-sky-500/30 backdrop-blur-md shadow-xl flex items-center gap-3 hover:border-sky-400 transition-all hover:scale-105"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white font-heading">
              Logical Deductions
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              Syllogisms · Seating Grid
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Orbital Node 3: My Error Book Radar (Bottom Left) */}
      <motion.div
        initial={{ x: -60, y: 40, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-8 left-2 sm:left-14 z-20"
      >
        <motion.div
          animate={{ y: [3, -5, 3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="p-3 sm:p-4 rounded-2xl bg-zinc-900/90 border border-rose-500/30 backdrop-blur-md shadow-xl flex items-center gap-3 hover:border-rose-400 transition-all hover:scale-105"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white font-heading flex items-center gap-1.5">
              <span>My Error Book</span>
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              Root-Cause Trap Buster
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Orbital Node 4: Verbal & Speed Drill (Bottom Right) */}
      <motion.div
        initial={{ x: 60, y: 40, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-8 right-2 sm:right-14 z-20"
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="p-3 sm:p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 backdrop-blur-md shadow-xl flex items-center gap-3 hover:border-emerald-400 transition-all hover:scale-105"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white font-heading">
              Verbal & Speed Drills
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              Grammar Concord · RC Speed
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Connecting Laser Beams (SVG vector lines between nodes) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 400" fill="none">
        <defs>
          <linearGradient id="beamGrad1" x1="160" y1="80" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="beamGrad2" x1="640" y1="80" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="beamGrad3" x1="160" y1="320" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="beamGrad4" x1="640" y1="320" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <line x1="200" y1="90" x2="350" y2="180" stroke="url(#beamGrad1)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="600" y1="90" x2="450" y2="180" stroke="url(#beamGrad2)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="200" y1="310" x2="350" y2="220" stroke="url(#beamGrad3)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="600" y1="310" x2="450" y2="220" stroke="url(#beamGrad4)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
    </div>
  );
};
