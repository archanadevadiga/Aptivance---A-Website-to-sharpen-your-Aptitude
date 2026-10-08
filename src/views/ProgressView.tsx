import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Target,
  AlertTriangle,
  BookmarkCheck,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const {
    readinessScore,
    currentStreak,
    totalQuestionsSolved,
    accuracyRate,
    averageSolvingTimeSeconds,
    errorBook,
    testAttempts,
    diagnosticResult,
    setActiveTab,
    setSelectedTopicForLearn,
  } = useApp();

  const unresolvedErrorCount = errorBook.filter((e) => !e.isResolved).length;

  // Status badge styling
  const statusColors = {
    'Foundation Stage': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    'Improving': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Strong': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Placement Ready': 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 border-amber-300 font-black',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          <span>Student Performance & Placement Readiness</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          My Learning Analytics
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Multi-dimensional assessment tracking your accuracy, solving speed, topic coverage, and mock test resilience.
        </p>
      </div>

      {/* PLACEMENT READINESS HERO SCORECARD */}
      <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#121018] via-zinc-900/90 to-[#0e1017] border border-amber-500/40 shadow-2xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Composite Placement Readiness Evaluation
            </span>
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-black text-white font-heading">
                {readinessScore.overall}%
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  statusColors[readinessScore.status]
                }`}
              >
                {readinessScore.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <Flame className="w-5 h-5 fill-amber-400" />
            <span>{currentStreak} Days Consecutive Active Streak</span>
          </div>
        </div>

        {/* Why this status (PRD Requirement) */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200/90 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white text-sm font-semibold">Why you received this readiness status:</strong>
            <p className="leading-relaxed font-sans">{readinessScore.rationale}</p>
          </div>
        </div>

        {/* 5-Dimensional Readiness Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">1. Accuracy</span>
              <span className="text-amber-400 font-bold">{readinessScore.accuracyScore}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore.accuracyScore}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-amber-400 h-2 rounded-full"
              />
            </div>
            <div className="text-[10px] text-zinc-500">Correct answers ratio</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">2. Solving Speed</span>
              <span className="text-sky-400 font-bold">{readinessScore.speedScore}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore.speedScore}%` }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="bg-sky-400 h-2 rounded-full"
              />
            </div>
            <div className="text-[10px] text-zinc-500">{averageSolvingTimeSeconds}s per question target</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">3. Consistency</span>
              <span className="text-emerald-400 font-bold">{readinessScore.consistencyScore}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore.consistencyScore}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="bg-emerald-400 h-2 rounded-full"
              />
            </div>
            <div className="text-[10px] text-zinc-500">Regular daily sessions</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">4. Topic Coverage</span>
              <span className="text-purple-400 font-bold">{readinessScore.coverageScore}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore.coverageScore}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="bg-purple-400 h-2 rounded-full"
              />
            </div>
            <div className="text-[10px] text-zinc-500">Quant, Logic & Verbal span</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">5. Mock Performance</span>
              <span className="text-amber-400 font-bold">{readinessScore.mockScore}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore.mockScore}%` }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="bg-amber-400 h-2 rounded-full"
              />
            </div>
            <div className="text-[10px] text-zinc-500">Timed simulation tests</div>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {totalQuestionsSolved}
          </div>
          <div className="text-xs font-semibold text-zinc-400">Questions Practiced</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
            {accuracyRate}%
          </div>
          <div className="text-xs font-semibold text-zinc-400">Overall Accuracy Rate</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-heading">
            {unresolvedErrorCount}
          </div>
          <div className="text-xs font-semibold text-zinc-400">Unresolved Errors in Book</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
            {testAttempts.length}
          </div>
          <div className="text-xs font-semibold text-zinc-400">Mock Tests Attempted</div>
        </div>
      </div>

      {/* Two Column Section: Actionable Next Steps & Recent Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recommended Action Plan */}
        <div className="lg:col-span-6 bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Recommended Next Actions</span>
            </h3>
            <span className="text-[11px] text-zinc-400">Personalized</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Review {unresolvedErrorCount} Unresolved Errors</div>
                <div className="text-[11px] text-zinc-400">Fix concept traps in Percentages and Time & Work.</div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('error-book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-bold text-xs"
              >
                Open Book
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Take a Timed Mock Test</div>
                <div className="text-[11px] text-zinc-400">Simulate TCS NQT or Full Campus Screening under pressure.</div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('mock-tests');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white font-bold text-xs"
              >
                Mock Tests
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Speed Calculation Drill</div>
                <div className="text-[11px] text-zinc-400">Train mental math with fraction-to-percentage tables.</div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:text-white font-bold text-xs"
              >
                Drills
              </button>
            </div>
          </div>
        </div>

        {/* Recent Mock Test History */}
        <div className="lg:col-span-6 bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Recent Mock Test Attempts</span>
            </h3>
            <span className="text-[11px] text-zinc-400">{testAttempts.length} Total</span>
          </div>

          <div className="space-y-3">
            {testAttempts.slice(0, 4).map((att) => (
              <div
                key={att.id}
                className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                    {att.testTitle}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Accuracy: {att.accuracy}% · {Math.round(att.durationTakenSeconds / 60)} mins taken
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-amber-400 font-mono text-sm">
                    {att.score} / {att.totalQuestions}
                  </div>
                  <div className="text-[10px] text-zinc-500">{att.percentage}% Score</div>
                </div>
              </div>
            ))}

            {testAttempts.length === 0 && (
              <div className="py-8 text-center text-xs text-zinc-500">
                No mock test attempts recorded yet. Head over to Mock Tests to take your first test.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
