import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATABASE } from '../data/questionsData';
import { DiagnosticResult, Question } from '../types';
import { QuestionCard } from '../components/practice/QuestionCard';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  BookOpen,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react';

export const DiagnosticView: React.FC = () => {
  const { diagnosticResult, saveDiagnosticResult, setActiveTab, setSelectedTopicForLearn } = useApp();

  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completedResult, setCompletedResult] = useState<DiagnosticResult | null>(diagnosticResult);

  // Diagnostic questions: 12 curated questions across Quant, Logical, Verbal
  const diagnosticQuestions: Question[] = useMemo(() => {
    return [
      // Quant
      QUESTIONS_DATABASE.find((q) => q.id === 'q_pct_01')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_pct_02')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_pl_01')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_tw_01')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_tsd_01')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_si_01')!,
      // Logical
      QUESTIONS_DATABASE.find((q) => q.id === 'q_syl_01')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_syl_02')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_br_01')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_dir_01')!,
      // Verbal
      QUESTIONS_DATABASE.find((q) => q.id === 'q_se_01')!,
      QUESTIONS_DATABASE.find((q) => q.id === 'q_rc_01')!,
    ].filter(Boolean);
  }, []);

  const handleStartDiagnostic = () => {
    setIsTestActive(true);
    setCurrentIdx(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishDiagnostic = () => {
    let quantCorrect = 0, quantTotal = 0;
    let logCorrect = 0, logTotal = 0;
    let verbalCorrect = 0, verbalTotal = 0;

    diagnosticQuestions.forEach((q, idx) => {
      const selected = answers[idx];
      const isCorrect = selected === q.correctAnswer;

      if (q.subject === 'quantitative') {
        quantTotal++;
        if (isCorrect) quantCorrect++;
      } else if (q.subject === 'logical') {
        logTotal++;
        if (isCorrect) logCorrect++;
      } else if (q.subject === 'verbal') {
        verbalTotal++;
        if (isCorrect) verbalCorrect++;
      }
    });

    const totalCorrect = quantCorrect + logCorrect + verbalCorrect;
    const totalQ = diagnosticQuestions.length;
    const percentage = Math.round((totalCorrect / totalQ) * 100);

    const quantPct = Math.round((quantCorrect / quantTotal) * 100);
    const logPct = Math.round((logCorrect / logTotal) * 100);
    const verbalPct = Math.round((verbalCorrect / verbalTotal) * 100);

    const strengths: string[] = [];
    const weakAreas: string[] = [];

    if (quantPct >= 65) strengths.push('Quantitative Foundations (Percentages & Work)');
    else weakAreas.push('Quantitative Aptitude (Time & Work, Percentages, Harmonic Speeds)');

    if (logPct >= 65) strengths.push('Logical Deductions & Syllogisms');
    else weakAreas.push('Deductive Reasoning & Family Trees');

    if (verbalPct >= 65) strengths.push('Grammar Precision & Reading Comprehension');
    else weakAreas.push('Sentence Correction & Concord Rules');

    // Build recommended path
    const recommendedPath = [
      {
        step: 1,
        topicId: 'percentages',
        topicName: 'Percentages & Fraction Equivalents',
        subject: 'quantitative' as const,
        reason: 'Essential prerequisite that unblocks Profit & Loss, Simple Interest, and Data Interpretation.',
      },
      {
        step: 2,
        topicId: 'time_work',
        topicName: 'Time & Work (LCM Method)',
        subject: 'quantitative' as const,
        reason: 'Master unit work efficiency to solve high-frequency campus placement test problems.',
      },
      {
        step: 3,
        topicId: 'syllogisms',
        topicName: 'Syllogisms & Deductive Logic',
        subject: 'logical' as const,
        reason: 'Lock in 100% accuracy on Either-Or complementary pairs and multi-statement deductions.',
      },
      {
        step: 4,
        topicId: 'spotting_errors',
        topicName: 'Spotting Errors & Agreement',
        subject: 'verbal' as const,
        reason: 'Eliminate common subject-verb traps and improve verbal screening score.',
      },
    ];

    const result: DiagnosticResult = {
      id: `diag_${Date.now()}`,
      timestamp: Date.now(),
      totalScore: totalCorrect,
      maxScore: totalQ,
      percentage,
      quantScore: { correct: quantCorrect, total: quantTotal, percentage: quantPct },
      logicalScore: { correct: logCorrect, total: logTotal, percentage: logPct },
      verbalScore: { correct: verbalCorrect, total: verbalTotal, percentage: verbalPct },
      strengths,
      weakAreas,
      recommendedPath,
    };

    saveDiagnosticResult(result);
    setCompletedResult(result);
    setIsTestActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active Diagnostic Test
  if (isTestActive) {
    const currentQ = diagnosticQuestions[currentIdx];
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-[#0e1017] border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Diagnostic Assessment
            </span>
            <div className="text-sm font-semibold text-white">
              Question {currentIdx + 1} of {diagnosticQuestions.length}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">
              Answered {Object.keys(answers).length} / {diagnosticQuestions.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-amber-500 h-2 transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / diagnosticQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQ}
          questionIndex={currentIdx}
          totalQuestions={diagnosticQuestions.length}
          isTestMode={true}
          selectedOptionInTest={answers[currentIdx] ?? null}
          onSelectOptionInTest={(optIdx) => {
            setAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
          }}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-300 disabled:opacity-30"
          >
            Previous
          </button>

          {currentIdx < diagnosticQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinishDiagnostic}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-xs hover:brightness-110 shadow-lg"
            >
              Finish & View Aptitude Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  // Diagnostic Report (if completed)
  if (completedResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Diagnostic Baseline Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-2">
                Your Aptitude Profile
              </h1>
            </div>

            <button
              onClick={handleStartDiagnostic}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          </div>

          {/* Section Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-center">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Quantitative Aptitude
              </div>
              <div className="text-3xl font-extrabold text-amber-400 font-heading">
                {completedResult.quantScore.percentage}%
              </div>
              <div className="text-xs text-zinc-500">
                {completedResult.quantScore.correct} of {completedResult.quantScore.total} correct
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-center">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Logical Reasoning
              </div>
              <div className="text-3xl font-extrabold text-sky-400 font-heading">
                {completedResult.logicalScore.percentage}%
              </div>
              <div className="text-xs text-zinc-500">
                {completedResult.logicalScore.correct} of {completedResult.logicalScore.total} correct
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-center">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Verbal Ability
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 font-heading">
                {completedResult.verbalScore.percentage}%
              </div>
              <div className="text-xs text-zinc-500">
                {completedResult.verbalScore.correct} of {completedResult.verbalScore.total} correct
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Your Core Strengths</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {completedResult.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Focus Areas to Elevate</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {completedResult.weakAreas.map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400">✕</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Learning Path */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Your Recommended Learning Path
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Targeted sequential curriculum to clear company screening cutoffs efficiently.
              </p>
            </div>

            <div className="space-y-3">
              {completedResult.recommendedPath.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs flex-shrink-0">
                      0{step.step}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {step.topicName}
                      </div>
                      <div className="text-xs text-zinc-400">{step.reason}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTopicForLearn(step.topicId);
                      setActiveTab('learn');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-800 group-hover:bg-amber-500 text-zinc-200 group-hover:text-zinc-950 text-xs font-semibold transition-all flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Start Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pre-test Intro
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
        <Compass className="w-4 h-4 text-amber-400" />
        <span>Step 1 of the Placement Journey</span>
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
          Diagnostic Aptitude Test
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Take a 12-question diagnostic test spanning Quantitative Aptitude, Logical Reasoning, and Verbal Ability. Uncover your natural strengths, pin down weak areas, and generate a tailored placement study roadmap.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 max-w-lg mx-auto text-left space-y-3 text-xs text-zinc-300">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Estimated duration: <strong>12 to 15 minutes</strong></span>
        </div>
        <div className="flex items-center gap-2.5">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Covers: <strong>Quant, Logical Reasoning & Verbal Ability</strong></span>
        </div>
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Output: <strong>Customized Diagnostic Aptitude Profile & Learning Path</strong></span>
        </div>
      </div>

      <button
        onClick={handleStartDiagnostic}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-extrabold text-base hover:brightness-110 transition-all shadow-[0_0_25px_-5px_rgba(245,158,11,0.4)] inline-flex items-center gap-2 cursor-pointer"
      >
        <span>Begin Diagnostic Test</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
