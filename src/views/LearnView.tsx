import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { TOPIC_LESSONS, SUBJECT_METADATA } from '../data/curriculumData';
import { QUESTIONS_DATABASE } from '../data/questionsData';
import { QuestionCard } from '../components/practice/QuestionCard';
import { VennDiagramIllustration, CircularSeatingDiagram, ClockAngleDiagram } from '../components/common/ConceptDiagrams';
import { SubjectId, TopicLesson } from '../types';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Brain,
  BookOpenCheck,
  Zap,
  Bookmark,
  ChevronRight,
  Clock,
  HelpCircle,
  FileText,
} from 'lucide-react';

export const LearnView: React.FC = () => {
  const { selectedTopicForLearn, setSelectedTopicForLearn, bookmarkedFormulaIds, toggleBookmarkFormula } = useApp();

  const [activeSubject, setActiveSubject] = useState<SubjectId>('quantitative');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected lesson (default to percentages if none selected)
  const activeTopicLesson = useMemo(() => {
    if (selectedTopicForLearn) {
      const found = TOPIC_LESSONS.find((l) => l.id === selectedTopicForLearn);
      if (found) return found;
    }
    const subjectLessons = TOPIC_LESSONS.filter((l) => l.subject === activeSubject);
    return subjectLessons[0] || TOPIC_LESSONS[0];
  }, [selectedTopicForLearn, activeSubject]);

  // Filter lessons for sidebar / curriculum list
  const filteredLessons = useMemo(() => {
    return TOPIC_LESSONS.filter((l) => {
      const matchesSubject = l.subject === activeSubject;
      const matchesSearch =
        searchQuery.trim() === '' ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.concepts.some((c) => c.heading.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSubject && matchesSearch;
    });
  }, [activeSubject, searchQuery]);

  // Questions for currently active lesson
  const topicQuestions = useMemo(() => {
    return QUESTIONS_DATABASE.filter(
      (q) => q.topicId === activeTopicLesson.id || activeTopicLesson.practiceQuestionIds.includes(q.id)
    );
  }, [activeTopicLesson]);

  const subjectIcons: Record<SubjectId, any> = {
    quantitative: Calculator,
    logical: Brain,
    verbal: BookOpenCheck,
    placement_skills: Zap,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Curriculum & Concept Vault</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Comprehensive Aptitude Learning
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl">
          Deep concepts, formulas, shortcuts, and placement-focused worked examples. Structure your preparation from fundamentals to speed solving.
        </p>
      </div>

      {/* Subject Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(SUBJECT_METADATA) as SubjectId[]).map((subjKey) => {
          const meta = SUBJECT_METADATA[subjKey];
          const isSelected = activeSubject === subjKey;
          const Icon = subjectIcons[subjKey];

          return (
            <button
              key={subjKey}
              onClick={() => {
                setActiveSubject(subjKey);
                // pick first topic in that subject
                const first = TOPIC_LESSONS.find((t) => t.subject === subjKey);
                if (first) setSelectedTopicForLearn(first.id);
              }}
              className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/80 shadow-[0_0_15px_-3px_rgba(245,158,11,0.25)]'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/40'
              }`}
            >
              <div
                className={`p-2 rounded-lg flex-shrink-0 ${
                  isSelected ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div
                  className={`text-sm font-bold truncate ${
                    isSelected ? 'text-white' : 'text-zinc-200'
                  }`}
                >
                  {meta.name}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {meta.topicsCount} Placement Topics
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Layout: Topic Navigator & In-Depth Topic Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Topics in this subject */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0e1017] border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Topics ({filteredLessons.length})
              </span>
              <span className="text-[11px] text-zinc-500">Select to study</span>
            </div>

            {/* Quick search inside current curriculum */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Topic List */}
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredLessons.map((lesson) => {
                const isActive = activeTopicLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedTopicForLearn(lesson.id);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-sm'
                        : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 pr-2">
                      <div className="text-xs sm:text-sm font-semibold truncate flex items-center gap-1.5">
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                        <span>{lesson.title}</span>
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">{lesson.tagline}</div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? 'text-amber-400' : 'text-zinc-600'
                      }`}
                    />
                  </button>
                );
              })}

              {filteredLessons.length === 0 && (
                <div className="text-center py-8 text-xs text-zinc-500">
                  No topics matching "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Area: Deep Interactive Lesson Reader */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#0e1017] border border-zinc-800 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-8">
            {/* Topic Header */}
            <div className="space-y-3 pb-6 border-b border-zinc-800/80">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{SUBJECT_METADATA[activeTopicLesson.subject]?.name}</span>
                </span>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{activeTopicLesson.estimatedMinutes} mins read</span>
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {activeTopicLesson.title}
              </h2>
              <p className="text-sm text-zinc-300 italic">{activeTopicLesson.tagline}</p>

              {/* Placement Importance Badge */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-semibold">Why this matters in placements: </strong>
                  {activeTopicLesson.placementImportance}
                </div>
              </div>
            </div>

            {/* Section 1: Core Concepts */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Concept Foundations</span>
              </h3>

              <div className="space-y-4">
                {activeTopicLesson.concepts.map((concept, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-2">
                    <h4 className="text-sm font-bold text-amber-300">{concept.heading}</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                      {concept.body}
                    </p>
                    {concept.bulletPoints && (
                      <ul className="space-y-1.5 pt-2 border-t border-zinc-800/60 mt-2">
                        {concept.bulletPoints.map((bp, bpIdx) => (
                          <li key={bpIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-amber-400 font-bold">›</span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Topic Specific Visual Graphic Diagrams */}
                {(activeTopicLesson.id === 'percentages' || activeTopicLesson.id === 'syllogisms') && (
                  <div className="pt-2">
                    <VennDiagramIllustration />
                  </div>
                )}
                {activeTopicLesson.id === 'seating_arrangement' && (
                  <div className="pt-2">
                    <CircularSeatingDiagram />
                  </div>
                )}
                {activeTopicLesson.id === 'time_speed_distance' && (
                  <div className="pt-2">
                    <ClockAngleDiagram />
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Important Formulas & Shortcuts */}
            {activeTopicLesson.formulas.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <span>Key Formulas & Relations</span>
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {activeTopicLesson.formulas.map((form, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400">{form.name}</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                          Formula {fIdx + 1}
                        </span>
                      </div>

                      {/* Formula Box */}
                      <div className="p-3.5 rounded-xl bg-black border border-amber-500/30 text-amber-300 font-mono text-sm sm:text-base font-bold text-center tracking-wide overflow-x-auto">
                        {form.expression}
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">{form.explanation}</p>

                      <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800/70 text-xs text-zinc-300 space-y-1">
                        <div className="text-[11px] font-semibold text-zinc-400">Example in practice:</div>
                        <div>{form.example}</div>
                      </div>

                      {form.shortcutNote && (
                        <div className="text-xs text-amber-300/90 flex items-center gap-1.5 pt-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{form.shortcutNote}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Worked Examples with Step-by-Step & Shortcuts */}
            {activeTopicLesson.workedExamples.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>Worked Examples</span>
                </h3>

                <div className="space-y-4">
                  {activeTopicLesson.workedExamples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-5 sm:p-6 rounded-2xl bg-[#0c0d14] border border-zinc-800 space-y-4"
                    >
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        {ex.title}
                      </div>

                      <div className="text-sm font-semibold text-zinc-100 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
                        {ex.problem}
                      </div>

                      {/* Solution steps */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-zinc-400">Standard Method:</div>
                        <div className="space-y-1.5 pl-2 border-l-2 border-zinc-700">
                          {ex.solutionSteps.map((step, sIdx) => (
                            <div key={sIdx} className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shortcut comparison */}
                      {ex.shortcutMethod && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-xs">
                          <div className="font-bold text-amber-300 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>30-Second Shortcut Method:</span>
                          </div>
                          <div className="text-zinc-200">{ex.shortcutMethod}</div>
                        </div>
                      )}

                      <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span><strong>Key Takeaway: </strong>{ex.keyTakeaway}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Common Placement Traps */}
            {activeTopicLesson.commonTraps.length > 0 && (
              <div className="p-5 sm:p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Common Placement Traps to Avoid</span>
                </h4>
                <ul className="space-y-2">
                  {activeTopicLesson.commonTraps.map((trap, tIdx) => (
                    <li key={tIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 5: Direct Topic Practice (Interactive) */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Topic Practice Questions ({topicQuestions.length})
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Test your understanding right now with instant evaluation.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {topicQuestions.map((q, qIdx) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    questionIndex={qIdx}
                    totalQuestions={topicQuestions.length}
                    showNextButton={false}
                  />
                ))}
              </div>
            </div>

            {/* Section 6: Related Next Topics */}
            {activeTopicLesson.relatedTopics.length > 0 && (
              <div className="pt-6 border-t border-zinc-800/80 space-y-3">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Recommended Next Topics in Sequence:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {activeTopicLesson.relatedTopics.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => {
                        setSelectedTopicForLearn(rel.id);
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-xs font-semibold text-zinc-200 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                    >
                      <span>{rel.title}</span>
                      <ArrowRight className="w-3 h-3 text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
