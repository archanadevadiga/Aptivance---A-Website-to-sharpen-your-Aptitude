import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { MistakeType, ErrorRecord, Question } from '../types';
import { QuestionCard } from '../components/practice/QuestionCard';
import {
  AlertTriangle,
  CheckCircle2,
  Filter,
  RotateCcw,
  Check,
  Trash2,
  Lightbulb,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';

export const ErrorBookView: React.FC = () => {
  const {
    errorBook,
    allQuestions,
    updateMistakeClassification,
    toggleErrorResolved,
    removeErrorRecord,
    setActiveTab,
    setSelectedTopicForLearn,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unresolved' | 'resolved' | MistakeType>('all');
  const [retestQuestionId, setRetestQuestionId] = useState<string | null>(null);

  // Grouped mistakes for recurring analysis
  const recurringAnalysis = useMemo(() => {
    const topicMistakeCounts: Record<string, { topicName: string; count: number; commonType: string }> = {};

    errorBook.forEach((err) => {
      const q = allQuestions.find((item) => item.id === err.questionId);
      if (q) {
        if (!topicMistakeCounts[q.topicName]) {
          topicMistakeCounts[q.topicName] = { topicName: q.topicName, count: 0, commonType: err.mistakeType };
        }
        topicMistakeCounts[q.topicName].count += 1;
      }
    });

    return Object.values(topicMistakeCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [errorBook, allQuestions]);

  // Filtered error entries
  const filteredErrors = useMemo(() => {
    return errorBook.filter((err) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'unresolved') return !err.isResolved;
      if (activeFilter === 'resolved') return err.isResolved;
      return err.mistakeType === activeFilter;
    });
  }, [errorBook, activeFilter]);

  const mistakeLabels: Record<MistakeType, { label: string; color: string }> = {
    concept: { label: 'Concept mistake', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
    calculation: { label: 'Calculation mistake', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
    misread: { label: 'Misread question', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    time_pressure: { label: 'Time pressure', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    guessing: { label: 'Guessing', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30' },
    careless: { label: 'Careless mistake', color: 'bg-orange-500/10 text-orange-400 border-orange-500/30' },
  };

  const unresolvedCount = errorBook.filter((e) => !e.isResolved).length;
  const resolvedCount = errorBook.filter((e) => e.isResolved).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Signature Placement Differentiator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          My Error Book
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl">
          Transform your errors into your biggest placement advantage. Automatically record every missed question, classify the root cause, practice again, and eliminate recurring traps.
        </p>
      </div>

      {/* Top Intelligence Box: Recurring Mistake Diagnostic */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#121018] via-zinc-900/90 to-[#0e1017] border border-amber-500/30 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              Weekly Mistake Diagnostic Analysis
            </h2>
          </div>
          <div className="text-xs text-zinc-400">
            {unresolvedCount} unresolved errors requiring review
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recurringAnalysis.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Rank #{idx + 1}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {item.count} errors
                </span>
              </div>
              <div className="text-sm font-bold text-white truncate">{item.topicName}</div>
              <div className="text-[11px] text-zinc-400">
                Predominant trap: <strong>{item.commonType}</strong>
              </div>
            </div>
          ))}

          {recurringAnalysis.length === 0 && (
            <div className="col-span-4 py-4 text-center text-xs text-zinc-400">
              No recurring mistakes identified yet. Practice questions to build your personalized diagnostic map.
            </div>
          )}
        </div>

        {/* Visual Distribution Breakdown Chart */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">Error Category Distribution</span>
            <span className="text-[11px] text-zinc-500">Total {errorBook.length} logged mistakes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1">
            {[
              { type: 'concept', label: 'Concept', color: 'bg-rose-500' },
              { type: 'calculation', label: 'Calculation', color: 'bg-amber-500' },
              { type: 'time_pressure', label: 'Time', color: 'bg-purple-500' },
              { type: 'misread', label: 'Misread', color: 'bg-blue-500' },
              { type: 'guessing', label: 'Guessing', color: 'bg-zinc-500' },
              { type: 'careless', label: 'Careless', color: 'bg-orange-500' },
            ].map(({ type, label, color }) => {
              const count = errorBook.filter((e) => e.mistakeType === type).length;
              const pct = errorBook.length > 0 ? Math.round((count / errorBook.length) * 100) : 0;
              return (
                <div key={type} className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">{label}</span>
                    <span className="font-bold text-white">{count}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6 }}
                      className={`${color} h-1.5 rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-zinc-800">
        {[
          { id: 'all', label: `All Errors (${errorBook.length})` },
          { id: 'unresolved', label: `Unresolved (${unresolvedCount})` },
          { id: 'resolved', label: `Resolved (${resolvedCount})` },
          { id: 'concept', label: 'Concept Mistakes' },
          { id: 'calculation', label: 'Calculation Mistakes' },
          { id: 'time_pressure', label: 'Time Pressure' },
          { id: 'misread', label: 'Misread Questions' },
          { id: 'careless', label: 'Careless' },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Retest Modal if student clicked "Practice Again" */}
      {retestQuestionId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1017] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  Practice Again · Error Remediation
                </h3>
              </div>
              <button
                onClick={() => setRetestQuestionId(null)}
                className="text-zinc-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-zinc-800"
              >
                Close
              </button>
            </div>

            {(() => {
              const q = allQuestions.find((item) => item.id === retestQuestionId);
              if (!q) return <div>Question not found.</div>;
              return (
                <QuestionCard
                  question={q}
                  showNextButton={false}
                />
              );
            })()}
          </div>
        </div>
      )}

      {/* List of Recorded Errors */}
      <div className="space-y-6">
        {filteredErrors.map((error) => {
          const q = allQuestions.find((item) => item.id === error.questionId);
          if (!q) return null;

          const classification = mistakeLabels[error.mistakeType] || {
            label: error.mistakeType,
            color: 'bg-zinc-800 text-zinc-300',
          };

          return (
            <div
              key={error.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all space-y-5 ${
                error.isResolved
                  ? 'bg-zinc-900/20 border-zinc-800/60 opacity-70'
                  : 'bg-[#0e1017] border-zinc-800 shadow-xl hover:border-amber-500/40'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800/70">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${classification.color}`}>
                    {classification.label}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">{q.topicName}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs text-zinc-500">{q.difficulty}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleErrorResolved(error.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      error.isResolved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{error.isResolved ? 'Marked as Understood' : 'Mark as Understood'}</span>
                  </button>

                  <button
                    onClick={() => removeErrorRecord(error.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                    title="Remove from Error Book"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Original Question Text */}
              <div className="text-sm sm:text-base text-zinc-100 font-medium leading-relaxed whitespace-pre-line">
                {q.questionText}
              </div>

              {/* Answer comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 space-y-1">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-rose-400">
                    Your Answer Selected:
                  </span>
                  <div className="text-zinc-200">
                    Option {String.fromCharCode(65 + error.studentAnswer)}: {q.options[error.studentAnswer]}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-400">
                    Correct Placement Answer:
                  </span>
                  <div className="text-zinc-200">
                    Option {String.fromCharCode(65 + q.correctAnswer)}: {q.options[q.correctAnswer]}
                  </div>
                </div>
              </div>

              {/* Notes / Reason */}
              {error.notes && (
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
                  <strong className="text-zinc-300">Diagnostic Note: </strong>
                  {error.notes}
                </div>
              )}

              {/* Step-by-Step Explanation */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1.5 text-xs">
                <span className="font-bold text-amber-400 uppercase tracking-wider">
                  Worked Solution & Reasoning
                </span>
                <p className="text-zinc-300 leading-relaxed font-sans">{q.explanation}</p>
              </div>

              {/* Shortcut Method if available */}
              {q.shortcut && (
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-zinc-300 space-y-1">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>30-Second Shortcut Method:</span>
                  </span>
                  <p className="text-zinc-200">{q.shortcut}</p>
                </div>
              )}

              {/* Action Buttons: Practice Again, Re-classify */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-500">Reclassify mistake:</span>
                  <select
                    value={error.mistakeType}
                    onChange={(e) => updateMistakeClassification(error.id, e.target.value as MistakeType)}
                    className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="concept">Concept mistake</option>
                    <option value="calculation">Calculation mistake</option>
                    <option value="misread">Misread question</option>
                    <option value="time_pressure">Time pressure</option>
                    <option value="guessing">Guessing</option>
                    <option value="careless">Careless mistake</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedTopicForLearn(q.topicId);
                      setActiveTab('learn');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-zinc-400 hover:text-amber-300 font-medium flex items-center gap-1"
                  >
                    <span>Read Topic Concept</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setRetestQuestionId(q.id)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:brightness-110 text-zinc-950 font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Practice Again</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredErrors.length === 0 && (
          <div className="p-12 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white font-heading">
              No matching errors in this view!
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Solve more questions in Practice or Mock Tests. Any mistake you encounter will be preserved right here for high-impact review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
