import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATABASE } from '../data/questionsData';
import { QuestionCard } from '../components/practice/QuestionCard';
import { HeroGraphics } from '../components/common/HeroGraphics';
import {
  Compass,
  Target,
  BookOpen,
  Brain,
  Calculator,
  BookOpenCheck,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Award,
  Layers,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveTab, setSelectedTopicForLearn, allQuestions } = useApp();

  const [activeQuickSampleIdx, setActiveQuickSampleIdx] = useState(0);
  const sampleQuestion = allQuestions[activeQuickSampleIdx % allQuestions.length];

  const handleStartTopic = (topicId: string) => {
    setSelectedTopicForLearn(topicId);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      {/* ================= HERO SECTION WITH GRAPHICS & ANIMATIONS ================= */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-20 border-b border-zinc-800/80 bg-radial-gold bg-grid-tech">
        {/* Ambient radial flares */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-sky-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Top Headline Cluster */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Animated Pill Kicker */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Placement Aptitude Learning Platform · Engineered for Engineers</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-heading leading-[1.08]">
                Master Aptitude.{' '}
                <span className="gold-gradient-text block sm:inline">
                  Clear Your Placement Test.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Learn concepts, practice smarter, improve your speed and become placement-ready with structured aptitude preparation.
              </p>
            </motion.div>

            {/* Primary Calls to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  setActiveTab('diagnostic');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-zinc-950 font-black text-sm sm:text-base hover:brightness-110 transition-all shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 flex items-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-zinc-950" />
                <span>Start Diagnostic Test</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 font-bold text-sm sm:text-base transition-all hover:scale-102 flex items-center gap-2 cursor-pointer"
              >
                <Target className="w-5 h-5 text-amber-400" />
                <span>Start Practicing</span>
              </button>
            </motion.div>
          </div>

          {/* Interactive Ecosystem Graphic */}
          <div className="pt-4">
            <HeroGraphics />
          </div>

          {/* Continuum Stages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 max-w-4xl mx-auto"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
              <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mb-3 text-center">
                The Placement Success Continuum
              </div>
              <div className="grid grid-cols-5 items-center text-center gap-1 sm:gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-bold text-xs sm:text-sm">
                    01
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1.5">Student</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">Baseline</span>
                </div>

                <div className="text-amber-500/70 flex justify-center font-bold">→</div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs sm:text-sm">
                    02
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1.5">Learn</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">Concepts & Shortcuts</span>
                </div>

                <div className="text-amber-500/70 flex justify-center font-bold">→</div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/25 border border-amber-500/60 flex items-center justify-center text-amber-300 font-bold text-xs sm:text-sm">
                    03
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-amber-400 mt-1.5">Practice</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">Error Book Loop</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATISTICS METRICS WITH ANIMATED CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '1,000+', label: 'Curated Questions', sub: 'Step-by-step verified solutions', highlight: true },
            { value: '45+', label: 'Topic Modules', sub: 'Full concept & shortcut lessons', highlight: false },
            { value: '50+', label: 'Mock Test Simulations', sub: 'TCS, Infosys & Accenture patterns', highlight: true },
            { value: '3+1', label: 'Core Aptitude Areas', sub: 'Quant, Logic, Verbal & Strategy', highlight: false },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.5)' }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#0d0f17] border border-zinc-800 text-center space-y-1.5 transition-colors shadow-lg"
            >
              <div className={`text-3xl sm:text-4xl font-black font-heading ${stat.highlight ? 'text-amber-400' : 'text-white'}`}>
                {stat.value}
              </div>
              <div className="text-sm font-bold text-zinc-100">{stat.label}</div>
              <div className="text-xs text-zinc-400">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= THREE CORE DISCIPLINE CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            Three Core Placement Disciplines
          </h2>
          <p className="text-sm text-zinc-400">
            Engineered specifically to clear Tier-1 and Tier-2 engineering campus recruitment screening cutoffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Quantitative */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-7 rounded-3xl bg-[#0e1017] border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Quantitative Aptitude
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Learn mathematics and numerical problem-solving required for placement tests: Percentages, Time & Work, Speed & Distance, Profit/Loss, and P&C.
              </p>
              <div className="text-xs text-amber-400 font-semibold">
                22 Deep Topics · Formulas & Shortcuts
              </div>
            </div>

            <button
              onClick={() => handleStartTopic('percentages')}
              className="mt-6 w-full py-3 rounded-xl bg-zinc-900 group-hover:bg-amber-500 text-zinc-200 group-hover:text-zinc-950 font-bold text-xs sm:text-sm border border-zinc-700/80 group-hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Start Learning Quant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 2: Logical */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-7 rounded-3xl bg-[#0e1017] border border-zinc-800 hover:border-sky-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Logical Reasoning
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Develop analytical problem-solving ability: Deductive Syllogisms, Seating Arrangements, Family Trees, Direction Sense, and Puzzles.
              </p>
              <div className="text-xs text-sky-400 font-semibold">
                12 Deductive Topics · Matrix Strategies
              </div>
            </div>

            <button
              onClick={() => handleStartTopic('syllogisms')}
              className="mt-6 w-full py-3 rounded-xl bg-zinc-900 group-hover:bg-sky-500 text-zinc-200 group-hover:text-zinc-950 font-bold text-xs sm:text-sm border border-zinc-700/80 group-hover:border-sky-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Start Learning Logic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 3: Verbal */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="p-7 rounded-3xl bg-[#0e1017] border border-zinc-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Verbal Ability
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Improve grammar, sentence correction, reading comprehension, error spotting, and rapid elimination of misleading distractors.
              </p>
              <div className="text-xs text-emerald-400 font-semibold">
                7 Core Topics · High-Frequency Traps
              </div>
            </div>

            <button
              onClick={() => handleStartTopic('spotting_errors')}
              className="mt-6 w-full py-3 rounded-xl bg-zinc-900 group-hover:bg-emerald-500 text-zinc-200 group-hover:text-zinc-950 font-bold text-xs sm:text-sm border border-zinc-700/80 group-hover:border-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Start Learning Verbal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= CORE DIFFERENTIATOR: MY ERROR BOOK ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#14121a] via-zinc-900/95 to-[#0b0c10] border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Signature Differentiator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
                My Error Book: Your Personal Aptitude Coach
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Most students solve hundreds of questions and repeat the exact same errors in the actual placement test. Aptivance automatically logs every mistake and lets you classify it:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  'Concept mistake',
                  'Calculation mistake',
                  'Misread question',
                  'Time pressure',
                  'Guessing',
                  'Careless mistake',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 flex items-center gap-2 font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setActiveTab('error-book');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Open My Error Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-heading">
                  Weekly Diagnostic Insight
                </span>
                <span className="text-[11px] text-zinc-400">Live AI Analytics</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-zinc-200 font-bold">
                    <span>1. Percentages – Successive percentage</span>
                    <span className="text-rose-400 font-bold">3 errors</span>
                  </div>
                  <div className="text-zinc-400 text-[11px]">Recurring trap: Assumed +20% and -20% cancel to zero.</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-zinc-200 font-bold">
                    <span>2. Time & Work – Combined efficiency</span>
                    <span className="text-amber-400 font-bold">2 errors</span>
                  </div>
                  <div className="text-zinc-400 text-[11px]">Subtracted individual efficiencies incorrectly.</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-zinc-200 font-bold">
                    <span>3. Time, Speed – Harmonic average</span>
                    <span className="text-amber-400 font-bold">2 errors</span>
                  </div>
                  <div className="text-zinc-400 text-[11px]">Applied arithmetic mean instead of 2ab/(a+b).</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE PRACTICE WIDGET ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-amber-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Try It Yourself In 30 Seconds</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Live Placement Practice Question
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Solve this real campus screening question. See how instant explanations and error tracking work.
          </p>
        </div>

        <QuestionCard
          question={sampleQuestion}
          questionIndex={activeQuickSampleIdx}
          totalQuestions={allQuestions.length}
          showNextButton={true}
          onNext={() => setActiveQuickSampleIdx((prev) => (prev + 1) % allQuestions.length)}
        />
      </section>

      {/* ================= RECRUITER PATTERNS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Aligned with Placement Test Patterns
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Curriculum calibrated against actual recruiter screening rounds.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('placement-prep');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Company Patterns</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'TCS NQT', pkg: '₹3.6 - 9 LPA', diff: 'Moderate' },
            { name: 'Infosys', pkg: '₹3.6 - 9.5 LPA', diff: 'High' },
            { name: 'Accenture', pkg: '₹4.5 - 6.5 LPA', diff: 'Moderate' },
            { name: 'Wipro Elite', pkg: '₹3.5 - 6.5 LPA', diff: 'Speed' },
            { name: 'Cognizant', pkg: '₹4.0 - 6.7 LPA', diff: 'Adaptive' },
            { name: 'Amazon / Product', pkg: '₹14 - 30+ LPA', diff: 'Very High' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, borderColor: '#f59e0b' }}
              onClick={() => {
                setActiveTab('placement-prep');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-all cursor-pointer space-y-2 text-center group"
            >
              <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors font-heading">
                {item.name}
              </div>
              <div className="text-[11px] text-amber-400 font-semibold">{item.pkg}</div>
              <div className="text-[10px] text-zinc-500">{item.diff} Level</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL ACTION BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-zinc-950 text-center space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.3)]"
        >
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Ready to Clear Your Campus Placement Test?
          </h2>
          <p className="text-zinc-900 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            Take a 15-minute diagnostic test today. Pinpoint your weak areas, get your custom learning path, and start practicing with precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setActiveTab('diagnostic');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-zinc-950 text-amber-400 hover:text-amber-300 font-black text-base transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              Start Free Diagnostic Test
            </button>
            <button
              onClick={() => {
                setActiveTab('learn');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-4 rounded-2xl bg-zinc-900/20 hover:bg-zinc-900/30 text-zinc-950 font-bold text-base transition-all border border-zinc-950/20 cursor-pointer"
            >
              Explore Full Curriculum
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
