import React from 'react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Target, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedTopicForLearn } = useApp();

  const handleLink = (tab: string, topicId?: string) => {
    setActiveTab(tab);
    if (topicId) {
      setSelectedTopicForLearn(topicId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06070a] border-t border-zinc-800 text-zinc-400 mt-20">
      {/* Upper Promise Bar */}
      <div className="border-b border-zinc-800/60 bg-gradient-to-r from-amber-500/5 via-zinc-900/40 to-transparent py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Structured Placement Journey</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Learn → Practice → Improve → Test → Analyse → Clear.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">My Error Book Intelligence</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Diagnose recurring concept, calculation, and time mistakes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Verified Placement Standards</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Aligned with TCS, Infosys, Accenture, Wipro, and Cognizant.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showTagline={true} />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Aptivance is a dedicated aptitude learning and diagnostic platform engineered for undergraduate students preparing for campus recruitment drives.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-amber-400/90 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Personal Aptitude Coach for Engineering Campus Placements</span>
            </div>
          </div>

          {/* Quick Curriculum */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">Quantitative Aptitude</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('learn', 'percentages')} className="hover:text-amber-300 transition-colors">
                  Percentages & Fractions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'profit_loss')} className="hover:text-amber-300 transition-colors">
                  Profit, Loss & Discount
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'time_work')} className="hover:text-amber-300 transition-colors">
                  Time & Work (LCM Method)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'time_speed_distance')} className="hover:text-amber-300 transition-colors">
                  Time, Speed & Distance
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'simple_compound_interest')} className="hover:text-amber-300 transition-colors">
                  Simple & Compound Interest
                </button>
              </li>
            </ul>
          </div>

          {/* Reasoning & Verbal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">Reasoning & Verbal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('learn', 'syllogisms')} className="hover:text-amber-300 transition-colors">
                  Syllogisms & Deductions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'blood_relations')} className="hover:text-amber-300 transition-colors">
                  Blood Relations Tree
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'seating_arrangement')} className="hover:text-amber-300 transition-colors">
                  Seating Arrangements
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'spotting_errors')} className="hover:text-amber-300 transition-colors">
                  Spotting Errors
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('learn', 'sentence_correction')} className="hover:text-amber-300 transition-colors">
                  Sentence Correction
                </button>
              </li>
            </ul>
          </div>

          {/* Differentiators */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">Key Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('error-book')} className="text-amber-400 hover:text-amber-300 font-medium">
                  ★ My Error Book
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('diagnostic')} className="hover:text-amber-300 transition-colors">
                  Diagnostic Aptitude Test
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('formula-bank')} className="hover:text-amber-300 transition-colors">
                  Formula & Shortcut Bank
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('placement-prep')} className="hover:text-amber-300 transition-colors">
                  Company Test Patterns
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('mock-tests')} className="hover:text-amber-300 transition-colors">
                  Placement Mock Tests
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and academic attribution */}
        <div className="pt-8 mt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Aptivance. Built for Campus Placement Aspirants.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Engineering Aptitude Platform</span>
            <span>·</span>
            <span className="text-amber-400/80">Sharpen Your Skills. Shape Your Future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
