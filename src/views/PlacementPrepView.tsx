import React, { useState } from 'react';
import {
  COMPANY_PATTERNS,
  FRACTION_PERCENTAGE_TABLE,
  PYTHAGOREAN_TRIPLES,
  TEST_STRATEGY_RULES,
  CompanyPattern,
} from '../data/placementData';
import { SITLogo, NAACLogo, IICLogo } from '../components/common/InstitutionalLogos';
import { LogoManagerModal } from '../components/common/LogoManagerModal';
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
  Building2,
  GraduationCap,
  Award,
  Users2,
  FileCheck,
  Star,
  ExternalLink,
  UploadCloud,
} from 'lucide-react';

export const PlacementPrepView: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyPattern>(COMPANY_PATTERNS[0]);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'blueprints' | 'sit_guidelines' | 'speed_tables' | 'protocols'>('blueprints');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* ================= OFFICIAL SIT T&P CELL CREDENTIALS COMMAND BANNER ================= */}
      <section className="relative overflow-hidden p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-[#0c0e17] via-[#111422] to-[#0a0c14] border-2 border-amber-500/40 shadow-2xl">
        {/* Ambient subtle glow flares */}
        <div className="absolute top-0 right-0 w-[450px] h-[250px] bg-amber-500/10 blur-[110px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-sky-500/5 blur-[90px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-8">
          {/* Top Bar: Official Institute & Placement Cell Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/90">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL PLACEMENT PREPARATION PORTAL</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight leading-tight">
                Department of Training & Placement
              </h1>
              <div className="text-sm sm:text-base font-semibold text-amber-400 font-heading">
                SRINIVAS INSTITUTE OF TECHNOLOGY (SIT), MANGALURU
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                Valachil, Merlapadavu, Mangaluru – 574143 · Affiliated to Visvesvaraya Technological University (VTU) Belagavi · Approved by AICTE, New Delhi
              </p>
            </div>

            {/* Official 3 Logos Showcase (SIT, NAAC, IIC) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-shrink-0 bg-black/60 p-3 sm:p-4 rounded-2xl border border-zinc-800 shadow-xl">
              {/* 1. SIT Logo */}
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all">
                <SITLogo size="md" />
                <span className="text-[10px] font-bold text-white mt-1.5">SIT</span>
              </div>

              {/* 2. NAAC Logo */}
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all">
                <NAACLogo size="md" />
                <span className="text-[10px] font-bold text-zinc-200 mt-1.5">NAAC</span>
              </div>

              {/* 3. IIC Logo */}
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all">
                <IICLogo size="md" />
                <span className="text-[10px] font-bold text-zinc-200 mt-1.5">IIC</span>
              </div>

              {/* Upload / Customize Button */}
              <button
                onClick={() => setShowLogoModal(true)}
                className="flex flex-col items-center justify-center p-2 px-3 rounded-xl bg-zinc-900/90 hover:bg-amber-500/20 border border-zinc-800 hover:border-amber-400/50 text-zinc-400 hover:text-amber-300 transition-all cursor-pointer h-full"
                title="Upload or customize institutional and brand logos"
              >
                <UploadCloud className="w-5 h-5 mb-1" />
                <span className="text-[9px] font-bold">Logo Assets</span>
              </button>
            </div>
          </div>

          {/* Credentials & Accreditation Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Award className="w-4 h-4 text-amber-400" />
                <span>NAAC ACCREDITATION</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-heading">Accredited</div>
              <div className="text-[11px] text-zinc-400">Higher Academic Standards</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>IIC COUNCIL</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-heading">MoE Council</div>
              <div className="text-[11px] text-zinc-400">Innovation & Startups</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>RECRUITMENT TIE-UPS</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-heading">150+ Companies</div>
              <div className="text-[11px] text-zinc-400">Tier-1 IT, Core & Product</div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>APTITUDE CLEARANCE</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-heading">92%+ Target</div>
              <div className="text-[11px] text-zinc-400">Online Screening Cutoffs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs for Placement Portal Sections */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-2">
        {[
          { id: 'blueprints', label: 'Company Screening Blueprints', icon: Target },
          { id: 'sit_guidelines', label: 'SIT Placement Policy & Directives', icon: FileCheck },
          { id: 'speed_tables', label: 'Mental Math Speed Tables', icon: Table },
          { id: 'protocols', label: 'Exam-Room Tactical Protocol', icon: Zap },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: COMPANY PATTERNS ================= */}
      {activeTab === 'blueprints' && (
        <div className="space-y-6 animate-in fade-in duration-200">
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
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
      )}

      {/* ================= TAB 2: SIT PLACEMENT POLICY & ELIGIBILITY GUIDELINES ================= */}
      {activeTab === 'sit_guidelines' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              SIT Mangaluru Campus Recruitment Guidelines & Directives
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Department of Training & Placement directives for eligible engineering graduates (2024–2027 Batches).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e1017] border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Eligibility Criteria Benchmark</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Most premier recruiters mandate a minimum of <strong>60.0% / 6.5 CGPA</strong> across 10th, 12th/Diploma, and current B.Tech semesters with zero standing backlogs at the time of drive registration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1017] border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Aptitude Screening Prerequisite</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Written screening clears over 75% of candidate rejection. Students must maintain an Aptivance Readiness Score of <strong>75%+</strong> and clear mock test cutoffs prior to drive scheduling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1017] border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Award className="w-4 h-4 text-sky-400" />
                <span>NAAC & IIC Innovation Quality</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Backed by NAAC institutional accreditation and the IIC Innovation Council framework, SIT conducts regular Campus Recruitment Training (CRT) sprints on commercial arithmetic and logic deduction.
              </p>
            </div>
          </div>

          {/* SIT Campus Placement Protocol Steps */}
          <div className="p-7 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-5">
            <h3 className="text-base font-bold text-white font-heading">
              The 4-Stage SIT Placement Preparation Pipeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Phase 1</span>
                <div className="text-sm font-bold text-white">Diagnostic Baseline</div>
                <p className="text-xs text-zinc-400">Pinpoint individual weak topics via Aptivance diagnostic test.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Phase 2</span>
                <div className="text-sm font-bold text-white">Curriculum Lessons</div>
                <p className="text-xs text-zinc-400">Master 30-second shortcut methods for Percentages, Work & Syllogisms.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Phase 3</span>
                <div className="text-sm font-bold text-white">Error Book Remediation</div>
                <p className="text-xs text-zinc-400">Eliminate recurring traps and calculation slips in My Error Book.</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Phase 4</span>
                <div className="text-sm font-bold text-white">Timed Company Mocks</div>
                <p className="text-xs text-zinc-400">Clear timed TCS NQT, Infosys, and Accenture simulation cutoffs.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SPEED CALCULATION TABLES ================= */}
      {activeTab === 'speed_tables' && (
        <div className="space-y-6 animate-in fade-in duration-200">
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
      )}

      {/* ================= TAB 4: EXAM ROOM PROTOCOLS ================= */}
      {activeTab === 'protocols' && (
        <div className="space-y-6 animate-in fade-in duration-200">
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
      )}

      {/* Institutional & Brand Logo Manager Modal */}
      <LogoManagerModal isOpen={showLogoModal} onClose={() => setShowLogoModal(false)} />
    </div>
  );
};
