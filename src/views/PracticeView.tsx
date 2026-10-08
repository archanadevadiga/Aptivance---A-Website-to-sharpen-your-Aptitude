import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATABASE } from '../data/questionsData';
import { QuestionCard } from '../components/practice/QuestionCard';
import { Question } from '../types';
import {
  Target,
  Zap,
  RotateCcw,
  BookOpen,
  AlertTriangle,
  Award,
  Calendar,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
} from 'lucide-react';

type PracticeModeId =
  | 'quick'
  | 'topic'
  | 'weak_area'
  | 'speed_drill'
  | 'mixed'
  | 'challenge'
  | 'daily';

export const PracticeView: React.FC = () => {
  const { allQuestions, errorBook } = useApp();

  const [activeMode, setActiveMode] = useState<PracticeModeId | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('percentages');
  const [currentSessionQuestions, setCurrentSessionQuestions] = useState<Question[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  // Available topics for topic mode
  const uniqueTopics = useMemo(() => {
    const map = new Map<string, string>();
    allQuestions.forEach((q) => map.set(q.topicId, q.topicName));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [allQuestions]);

  // Start specific practice mode
  const handleStartMode = (mode: PracticeModeId) => {
    setActiveMode(mode);
    setActiveQuestionIdx(0);

    let filtered: Question[] = [];

    switch (mode) {
      case 'quick':
        filtered = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
        break;
      case 'topic':
        filtered = allQuestions.filter((q) => q.topicId === selectedTopicId);
        if (filtered.length === 0) filtered = allQuestions.slice(0, 5);
        break;
      case 'weak_area': {
        // Collect question IDs from unresolved errors
        const errorQIds = errorBook.filter((e) => !e.isResolved).map((e) => e.questionId);
        filtered = allQuestions.filter((q) => errorQIds.includes(q.id));
        if (filtered.length === 0) {
          // If no unresolved errors, pick Hard and Medium questions
          filtered = allQuestions.filter((q) => q.difficulty === 'Hard' || q.difficulty === 'Medium').slice(0, 6);
        }
        break;
      }
      case 'speed_drill':
        filtered = allQuestions.filter((q) => q.difficulty === 'Easy' || q.difficulty === 'Medium').slice(0, 6);
        break;
      case 'challenge':
        filtered = allQuestions.filter((q) => q.difficulty === 'Hard' || q.difficulty === 'Placement Challenge');
        if (filtered.length === 0) filtered = allQuestions.slice(0, 5);
        break;
      case 'daily':
        filtered = allQuestions.slice(0, 5);
        break;
      case 'mixed':
      default:
        filtered = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 8);
        break;
    }

    setCurrentSessionQuestions(filtered);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleExitPractice = () => {
    setActiveMode(null);
    setCurrentSessionQuestions([]);
    setActiveQuestionIdx(0);
  };

  const practiceModesConfig = [
    {
      id: 'quick',
      title: 'Quick Practice',
      description: '5 questions in low-pressure mode. Great for quick warmup between study sessions.',
      questionsCount: '5 questions',
      time: '~5 mins',
      difficulty: 'All Levels',
      badge: 'Daily Warmup',
      icon: Zap,
      accent: 'text-amber-400',
    },
    {
      id: 'topic',
      title: 'Topic Practice',
      description: 'Target a specific concept to achieve mastery and build confidence.',
      questionsCount: 'Topic-based',
      time: '~10 mins',
      difficulty: 'Focused',
      badge: 'Concept Depth',
      icon: BookOpen,
      accent: 'text-blue-400',
    },
    {
      id: 'weak_area',
      title: 'Weak Area Practice',
      description: 'Automatically draws questions from your Error Book to fix recurring mistake patterns.',
      questionsCount: errorBook.filter((e) => !e.isResolved).length > 0 ? `${errorBook.filter((e) => !e.isResolved).length} in queue` : 'Adaptive set',
      time: '~8 mins',
      difficulty: 'Personalized',
      badge: 'Error Book Driven',
      icon: AlertTriangle,
      accent: 'text-rose-400',
    },
    {
      id: 'speed_drill',
      title: 'Speed Drill',
      description: 'Short questions timed tightly to improve solving velocity and mental arithmetic.',
      questionsCount: '6 questions',
      time: '4 mins',
      difficulty: 'Time-Critique',
      badge: 'Velocity',
      icon: Clock,
      accent: 'text-amber-400',
    },
    {
      id: 'mixed',
      title: 'Mixed Practice',
      description: 'Multi-topic blend simulating the unexpected shifts of real campus recruitment exams.',
      questionsCount: '8 questions',
      time: '~12 mins',
      difficulty: 'Moderate',
      badge: 'Multi-Subject',
      icon: Layers,
      accent: 'text-emerald-400',
    },
    {
      id: 'challenge',
      title: 'Placement Challenge',
      description: 'Hardest tier questions designed for Product companies (Amazon, Zoho, Juspay, etc.).',
      questionsCount: '5 questions',
      time: '~15 mins',
      difficulty: 'Hard / Challenge',
      badge: 'Tier-1 Prime',
      icon: Award,
      accent: 'text-amber-300',
    },
    {
      id: 'daily',
      title: 'Daily Practice Set',
      description: 'Curated 5 questions every morning to maintain your active problem-solving streak.',
      questionsCount: '5 questions',
      time: '~7 mins',
      difficulty: 'Balanced',
      badge: 'Streak Booster',
      icon: Calendar,
      accent: 'text-indigo-400',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <Target className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Practice Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Targeted Practice Modes
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Choose a tailored practice format. Every mistake you make can be automatically filed into your Error Book for systematic correction.
        </p>
      </div>

      {/* Active Session Display (if a mode is launched) */}
      {activeMode && currentSessionQuestions.length > 0 && (
        <div className="bg-[#0b0c12] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs">
                {activeMode.replace('_', ' ').toUpperCase()} MODE
              </span>
              <span className="text-sm text-zinc-300 font-semibold">
                Question {activeQuestionIdx + 1} of {currentSessionQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExitPractice}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
              >
                Exit Session
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 transition-all duration-300 rounded-full"
              style={{
                width: `${((activeQuestionIdx + 1) / currentSessionQuestions.length) * 100}%`,
              }}
            />
          </div>

          {/* Active Question Card */}
          <QuestionCard
            key={currentSessionQuestions[activeQuestionIdx].id}
            question={currentSessionQuestions[activeQuestionIdx]}
            questionIndex={activeQuestionIdx}
            totalQuestions={currentSessionQuestions.length}
            showNextButton={activeQuestionIdx < currentSessionQuestions.length - 1}
            onNext={() => {
              if (activeQuestionIdx < currentSessionQuestions.length - 1) {
                setActiveQuestionIdx((prev) => prev + 1);
              }
            }}
          />

          {/* Next / Completion Indicator */}
          {activeQuestionIdx === currentSessionQuestions.length - 1 && (
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center space-y-2">
              <div className="text-sm font-semibold text-white">
                You reached the final question of this session!
              </div>
              <p className="text-xs text-zinc-400">
                Any missed questions are stored in your Error Book with step-by-step shortcuts.
              </p>
              <button
                onClick={handleExitPractice}
                className="px-5 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs"
              >
                Complete & Back to Modes
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceModesConfig.map((mode) => {
          const Icon = mode.icon;
          return (
            <div
              key={mode.id}
              className="relative p-6 sm:p-7 rounded-2xl bg-[#0e1017] border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-900/60 px-2.5 py-1 rounded-md border border-zinc-800">
                    {mode.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white font-heading">{mode.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{mode.description}</p>
                </div>

                {/* If topic mode, show topic dropdown */}
                {mode.id === 'topic' && (
                  <div className="pt-1">
                    <label className="text-[11px] text-zinc-400 block mb-1">Select topic:</label>
                    <select
                      value={selectedTopicId}
                      onChange={(e) => setSelectedTopicId(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {uniqueTopics.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2 text-xs text-zinc-400 border-t border-zinc-800/80">
                  <span>{mode.questionsCount}</span>
                  <span>·</span>
                  <span>{mode.time}</span>
                  <span>·</span>
                  <span className="text-zinc-400">{mode.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => handleStartMode(mode.id as PracticeModeId)}
                className="mt-6 w-full py-2.5 rounded-xl bg-zinc-900 group-hover:bg-amber-500 text-zinc-200 group-hover:text-zinc-950 font-bold text-xs sm:text-sm border border-zinc-700/80 group-hover:border-amber-400 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch {mode.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
