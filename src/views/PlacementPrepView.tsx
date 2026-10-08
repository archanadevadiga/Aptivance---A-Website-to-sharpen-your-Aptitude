import React, { useState } from 'react';
import {
  COMPANY_PATTERNS,
  FRACTION_PERCENTAGE_TABLE,
  PYTHAGOREAN_TRIPLES,
  TEST_STRATEGY_RULES,
  CompanyPattern,
} from '../data/placementData';
import {
  Briefcase,
  Target,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Table,
  Zap,
} from 'lucide-react';

export const PlacementPrepView: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyPattern>(COMPANY_PATTERNS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
          <span>Campus Recruitment Intel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Company Test Patterns & Test Strategy
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl">
          Detailed company recruitment syllabus, sectional cutoffs, speed calculation tables, and tactical test management for engineering placements.
        </p>
      </div>

      {/* Part 1: Company Pattern Analysis */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            Recruiter Screening Blueprints
          </h2>
          <span className="text-xs text-zinc-400">Select company to view blueprint</span>
        </div>

        {/* Company Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {COMPANY_PATTERNS.map((comp) => {
            const isSelected = selectedCompany.id === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedCompany(comp)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {comp.name}
              </button>
            );
          })}
        </div>

        {/* Selected Company Detail Blueprint */}
        <div className="p-7 sm:p-9 rounded-3xl bg-[#0e1017] border border-zinc-800 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black text-amber-400 font-heading">
                  {selectedCompany.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {selectedCompany.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Typical Placement Package: <strong className="text-zinc-200">{selectedCompany.avgPackage}</strong> · Difficulty: <strong className="text-zinc-200">{selectedCompany.difficulty}</strong>
              </p>
            </div>

            <div className="text-right">
              <div className="text-xs text-zinc-400">Total Allotted Duration</div>
              <div className="text-lg font-mono font-bold text-white">
                {selectedCompany.totalTimeMinutes} Minutes
              </div>
            </div>
          </div>

          {/* Section Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
              Sectional Timing & Cutoff Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedCompany.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{sec.name}</span>
                    <span className="text-xs text-amber-400 font-mono font-semibold">
                      {sec.questionsCount} Qs / {sec.durationMinutes}m
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{sec.cutoffAdvice}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Topics & Insider Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                High-Frequency Topics Tested
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.keyTopics.map((topic, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Tactical Insider Strategy</span>
              </h4>
              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                {selectedCompany.insiderStrategy}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Speed Calculation Memory Tables */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
          Mental Math & Speed Reference Tables
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Fraction to Percentage Conversion Table */}
          <div className="lg:col-span-7 bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Fraction to Percentage Conversion Speed Table
                </h3>
              </div>
              <span className="text-[11px] text-zinc-500">Memorize 1/2 to 1/20</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {FRACTION_PERCENTAGE_TABLE.map((row, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center space-y-0.5"
                >
                  <div className="text-sm font-mono font-black text-amber-400">{row.fraction}</div>
                  <div className="text-xs font-bold text-white">{row.percentage}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">{row.decimal}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pythagorean Triples */}
          <div className="lg:col-span-5 bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                Pythagorean Triples (Direction Sense & Geometry)
              </h3>
            </div>

            <div className="space-y-2.5">
              {PYTHAGOREAN_TRIPLES.map((pt, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-0.5">
                  <div className="text-xs font-mono font-bold text-amber-400">Base: ({pt.base})</div>
                  <div className="text-[11px] text-zinc-400">Multipliers: {pt.scale}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Part 3: Test Strategy Protocol */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
          Exam-Room Tactical Protocol
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEST_STRATEGY_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/40 transition-colors space-y-2"
            >
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Strategy {idx + 1}
              </div>
              <h3 className="text-base font-bold text-white">{rule.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
