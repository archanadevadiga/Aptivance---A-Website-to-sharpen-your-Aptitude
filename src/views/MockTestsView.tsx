import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockTest, Question, TestAttemptResult } from '../types';
import { QuestionCard } from '../components/practice/QuestionCard';
import {
  FileCheck2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Award,
  ChevronRight,
  TrendingUp,
  BarChart2,
  ShieldCheck,
} from 'lucide-react';

export const MockTestsView: React.FC = () => {
  const { allMockTests, allQuestions, saveTestAttempt, testAttempts, recordError } = useApp();

  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  const [lastAttemptResult, setLastAttemptResult] = useState<TestAttemptResult | null>(null);
  const [reviewMode, setReviewMode] = useState<boolean>(false);

  // Active test questions
  const testQuestions: Question[] = useMemo(() => {
    if (!activeTest) return [];
    return activeTest.questionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is Question => q !== undefined);
  }, [activeTest, allQuestions]);

  // Timer countdown
  useEffect(() => {
    if (!activeTest || isTestSubmitted) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTest, isTestSubmitted]);

  // Start test
  const handleStartTest = (test: MockTest) => {
    setActiveTest(test);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setSecondsRemaining(test.durationMinutes * 60);
    setIsTestSubmitted(false);
    setLastAttemptResult(null);
    setReviewMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit test and calculate comprehensive score report
  const handleSubmitTest = () => {
    if (!activeTest) return;

    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    const topicStats: Record<string, { total: number; correct: number }> = {};

    const answersDetail = testQuestions.map((q, idx) => {
      const selected = selectedAnswers[idx] !== undefined ? selectedAnswers[idx] : null;
      const isCorrect = selected === q.correctAnswer;

      if (!topicStats[q.topicName]) {
        topicStats[q.topicName] = { total: 0, correct: 0 };
      }
      topicStats[q.topicName].total += 1;

      if (selected === null) {
        skipped += 1;
      } else if (isCorrect) {
        correct += 1;
        topicStats[q.topicName].correct += 1;
      } else {
        incorrect += 1;
        // Log to Error Book
        recordError(q.id, selected, q.correctAnswer, 'time_pressure', `Missed in mock: ${activeTest.title}`);
      }

      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        timeSpentSeconds: Math.round(
          (activeTest.durationMinutes * 60 - secondsRemaining) / Math.max(1, testQuestions.length)
        ),
      };
    });

    // Score calculation with negative marking
    let calculatedScore = correct * activeTest.marksPerQuestion;
    if (activeTest.negativeMarking) {
      calculatedScore -= incorrect * activeTest.negativePenalty;
    }
    calculatedScore = Math.max(0, Math.round(calculatedScore * 100) / 100);

    const percentage = Math.round((calculatedScore / testQuestions.length) * 100);
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const timeTaken = activeTest.durationMinutes * 60 - secondsRemaining;
    const avgTimePerQ = attempted > 0 ? Math.round(timeTaken / attempted) : 0;

    const topicBreakdown = Object.entries(topicStats).map(([topicName, stats]) => ({
      topicName,
      total: stats.total,
      correct: stats.correct,
      accuracy: Math.round((stats.correct / stats.total) * 100),
    }));

    const result: TestAttemptResult = {
      id: `attempt_${Date.now()}`,
      testId: activeTest.id,
      testTitle: activeTest.title,
      timestamp: Date.now(),
      durationTakenSeconds: timeTaken,
      totalQuestions: testQuestions.length,
      attempted,
      correct,
      incorrect,
      skipped,
      score: calculatedScore,
      percentage,
      accuracy,
      averageTimePerQuestion: avgTimePerQ,
      answers: answersDetail,
      topicBreakdown,
    };

    saveTestAttempt(result);
    setLastAttemptResult(result);
    setIsTestSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ================= VIEW 1: ACTIVE TEST SCREEN =================
  if (activeTest && !isTestSubmitted) {
    const currentQ = testQuestions[currentQIndex];
    const isUnder5Mins = secondsRemaining < 300;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Test Engine Top Bar */}
        <div className="bg-[#0e1017] border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              {activeTest.title}
            </h2>
            <div className="text-xs text-zinc-400">
              Total {testQuestions.length} Questions · Negative Marking:{' '}
              {activeTest.negativeMarking ? `-${activeTest.negativePenalty}` : 'None'}
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-base font-bold border transition-colors ${
                isUnder5Mins
                  ? 'bg-rose-950/40 text-rose-300 border-rose-500 animate-pulse'
                  : 'bg-zinc-900 text-amber-400 border-amber-500/40'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to submit this mock test now?')) {
                  handleSubmitTest();
                }
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all shadow-md cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Test Engine Main: Question + Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Area */}
          <div className="lg:col-span-8 space-y-4">
            {currentQ && (
              <QuestionCard
                question={currentQ}
                questionIndex={currentQIndex}
                totalQuestions={testQuestions.length}
                isTestMode={true}
                selectedOptionInTest={selectedAnswers[currentQIndex] ?? null}
                onSelectOptionInTest={(optIdx) => {
                  setSelectedAnswers((prev) => ({ ...prev, [currentQIndex]: optIdx }));
                }}
              />
            )}

            {/* Question Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0e1017] border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  disabled={currentQIndex === testQuestions.length - 1}
                  onClick={() => setCurrentQIndex((prev) => Math.min(testQuestions.length - 1, prev + 1))}
                  className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Clear Response */}
                {selectedAnswers[currentQIndex] !== undefined && (
                  <button
                    onClick={() => {
                      setSelectedAnswers((prev) => {
                        const copy = { ...prev };
                        delete copy[currentQIndex];
                        return copy;
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Clear Response
                  </button>
                )}

                {/* Mark for Review */}
                <button
                  onClick={() => {
                    setMarkedForReview((prev) => ({
                      ...prev,
                      [currentQIndex]: !prev[currentQIndex],
                    }));
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    markedForReview[currentQIndex]
                      ? 'bg-purple-950/50 border-purple-500 text-purple-300'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-600'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentQIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Palette: Question Navigator */}
          <div className="lg:col-span-4 bg-[#0e1017] border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Question Palette
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span>Answered ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-zinc-800 border border-zinc-700" />
                <span>Unanswered ({testQuestions.length - Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-600" />
                <span>Marked ({Object.values(markedForReview).filter(Boolean).length})</span>
              </div>
            </div>

            {/* Number grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[350px] overflow-y-auto pr-1">
              {testQuestions.map((_, idx) => {
                const isCurrent = idx === currentQIndex;
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isMarked = markedForReview[idx];

                let cellColor = 'bg-zinc-800/80 text-zinc-400 hover:border-zinc-500';
                if (isMarked) {
                  cellColor = 'bg-purple-600 text-white font-bold';
                } else if (isAnswered) {
                  cellColor = 'bg-amber-500 text-zinc-950 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-lg border text-xs transition-all flex items-center justify-center ${cellColor} ${
                      isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0e1017]' : 'border-transparent'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW 2: TEST RESULT REPORT =================
  if (isTestSubmitted && lastAttemptResult) {
    const isPassed = lastAttemptResult.score >= (activeTest?.passingScore || 10);

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Results Banner */}
        <div className="bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Mock Test Scorecard
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                {lastAttemptResult.testTitle}
              </h2>
            </div>

            <div
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border flex items-center gap-2 ${
                isPassed
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              }`}
            >
              {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{isPassed ? 'PLACEMENT CUTOFF CLEARED' : 'NEEDS PRACTICE FOR CUTOFF'}</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
                {lastAttemptResult.score} / {lastAttemptResult.totalQuestions}
              </div>
              <div className="text-xs text-zinc-400">Net Final Score</div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {lastAttemptResult.accuracy}%
              </div>
              <div className="text-xs text-zinc-400">Solving Accuracy</div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                {lastAttemptResult.correct}
              </div>
              <div className="text-xs text-zinc-400">Correct Answers</div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-heading">
                {lastAttemptResult.incorrect}
              </div>
              <div className="text-xs text-zinc-400">Incorrect (In Error Book)</div>
            </div>
          </div>

          {/* Topic-Wise Performance Breakdown */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <span>Topic-Wise Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lastAttemptResult.topicBreakdown.map((tb, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between text-xs"
                >
                  <span className="text-zinc-200 font-semibold">{tb.topicName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">
                      {tb.correct} of {tb.total} ({tb.accuracy}%)
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        tb.accuracy >= 70 ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <button
              onClick={() => setReviewMode(!reviewMode)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{reviewMode ? 'Hide Question Solutions' : 'Review All Worked Solutions'}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (activeTest) handleStartTest(activeTest);
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>

              <button
                onClick={() => {
                  setActiveTest(null);
                  setIsTestSubmitted(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:brightness-110 transition-all shadow-md"
              >
                Back to Mock Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Review Section */}
        {reviewMode && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white font-heading">
              Detailed Question Review & Explanations
            </h3>

            <div className="space-y-6">
              {testQuestions.map((q, idx) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  questionIndex={idx}
                  totalQuestions={testQuestions.length}
                  showNextButton={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= VIEW 3: MOCK TESTS CATALOG =================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Real Exam Simulations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Placement Mock Test Engine
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Timed full-length mock examinations with countdown timer, question navigation palette, negative marking, and instant percentile analytics.
        </p>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allMockTests.map((mock) => (
          <div
            key={mock.id}
            className="p-7 rounded-2xl bg-[#0e1017] border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {mock.category}
                </span>
                <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{mock.durationMinutes} mins</span>
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white font-heading">{mock.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{mock.description}</p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-zinc-400 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span>Questions</span>
                  <span className="text-zinc-200 font-semibold">{mock.questionIds.length} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Negative Marking</span>
                  <span className="text-zinc-200 font-semibold">
                    {mock.negativeMarking ? `Yes (-${mock.negativePenalty})` : 'No penalty'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Passing Cutoff</span>
                  <span className="text-amber-400 font-semibold">{mock.passingScore} marks</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStartTest(mock)}
              className="mt-6 w-full py-2.5 rounded-xl bg-zinc-900 group-hover:bg-amber-500 text-zinc-200 group-hover:text-zinc-950 font-bold text-xs sm:text-sm border border-zinc-700/80 group-hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Take Mock Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
