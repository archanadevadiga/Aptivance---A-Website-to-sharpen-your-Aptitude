import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FORMULAS_DATABASE } from '../data/formulasData';
import { SUBJECT_METADATA } from '../data/curriculumData';
import { SubjectId, FormulaItem } from '../types';
import {
  BookmarkCheck,
  Search,
  Bookmark,
  Zap,
  AlertTriangle,
  Copy,
  Check,
  Sparkles,
  Calculator,
} from 'lucide-react';

export const FormulaBankView: React.FC = () => {
  const { bookmarkedFormulaIds, toggleBookmarkFormula } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectId>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = useMemo(() => {
    return FORMULAS_DATABASE.filter((f) => {
      const matchesSubject = selectedSubject === 'all' || f.subject === selectedSubject;
      const matchesSearch =
        searchQuery.trim() === '' ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSubject && matchesSearch;
    });
  }, [selectedSubject, searchQuery]);

  const handleCopyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Formula & Shortcut Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Formula & Shortcut Bank
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Search, study, and bookmark every high-yield placement formula, parameter meaning, worked example, and pitfall.
        </p>
      </div>

      {/* Search and Subject Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search formulas by name, topic, or keyword (e.g., successive, harmonic)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedSubject === 'all'
                ? 'bg-amber-500 text-zinc-950 shadow-sm'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            All Disciplines
          </button>
          <button
            onClick={() => setSelectedSubject('quantitative')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedSubject === 'quantitative'
                ? 'bg-amber-500 text-zinc-950 shadow-sm'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Quantitative
          </button>
          <button
            onClick={() => setSelectedSubject('logical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedSubject === 'logical'
                ? 'bg-amber-500 text-zinc-950 shadow-sm'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Logical
          </button>
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFormulas.map((formula) => {
          const isBookmarked = bookmarkedFormulaIds.includes(formula.id);

          return (
            <div
              key={formula.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0e1017] border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400">{formula.topicName}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-400 font-semibold">{formula.name}</span>
                  </div>

                  <button
                    onClick={() => toggleBookmarkFormula(formula.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-zinc-600 hover:text-zinc-300'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark formula'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Mathematical Expression Banner */}
                <div className="relative p-4 rounded-xl bg-black border border-amber-500/30 text-amber-300 font-mono text-sm sm:text-base font-bold text-center tracking-wide overflow-x-auto">
                  {formula.formula}

                  <button
                    onClick={() => handleCopyFormula(formula.id, formula.formula)}
                    className="absolute right-2 top-2 p-1.5 rounded text-zinc-500 hover:text-white transition-colors"
                    title="Copy formula"
                  >
                    {copiedId === formula.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Meaning of Variables */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Meaning of Variables:
                  </div>
                  <ul className="space-y-1 text-zinc-300 pl-1">
                    {formula.variables.map((v, vIdx) => (
                      <li key={vIdx} className="flex items-start gap-1.5">
                        <code className="text-amber-400 font-mono font-bold">{v.symbol}:</code>
                        <span>{v.meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                  <div className="text-[11px] font-semibold text-zinc-400">Application Example:</div>
                  <div className="leading-relaxed font-sans">{formula.example}</div>
                </div>

                {/* Shortcut & Trap */}
                {formula.shortcut && (
                  <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Fast Shortcut: </strong>
                      {formula.shortcut}
                    </div>
                  </div>
                )}

                {formula.commonMistake && (
                  <div className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs text-rose-300/90 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Avoid Pitfall: </strong>
                      {formula.commonMistake}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="text-center py-16 text-zinc-500 text-sm">
          No formulas matched your search. Try searching for "speed", "lcm", or "interest".
        </div>
      )}
    </div>
  );
};
