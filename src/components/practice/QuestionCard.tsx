import React, { useState } from 'react';
import { Question, MistakeType } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  RotateCcw,
  PlusCircle,
  Clock,
  ArrowRight,
  BookmarkCheck,
  Check,
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionIndex?: number;
  totalQuestions?: number;
  onNext?: () => void;
  showNextButton?: boolean;
  isTestMode?: boolean; // In test mode, answers are selected without revealing immediate feedback
  selectedOptionInTest?: number | null;
  onSelectOptionInTest?: (optionIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onNext,
  showNextButton = true,
  isTestMode = false,
  selectedOptionInTest = null,
  onSelectOptionInTest,
}) => {
  const { recordQuestionAnswer, recordError, errorBook, updateMistakeClassification } = useApp();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [addedToErrorBook, setAddedToErrorBook] = useState<boolean>(false);
  const [selectedMistakeType, setSelectedMistakeType] = useState<MistakeType>('concept');
  const [showMistakeSelector, setShowMistakeSelector] = useState<boolean>(false);

  // In test mode, defer to parent state
  if (isTestMode) {
    return (
      <div className="bg-[#0f1118] border border-zinc-800 rounded-xl p-5 sm:p-7 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-400">
              Question {questionIndex !== undefined ? questionIndex + 1 : ''}
              {totalQuestions ? ` of ${totalQuestions}` : ''}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400">{question.topicName}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{question.expectedTimeSeconds}s</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
              {question.difficulty}
            </span>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-zinc-100 text-base sm:text-lg font-medium leading-relaxed mb-6 whitespace-pre-line">
          {question.questionText}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionInTest === idx;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectOptionInTest && onSelectOptionInTest(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400/80 text-white shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]'
                    : 'bg-zinc-900/60 border-zinc-800/90 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50'
                }`}
              >
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {letter}
                </span>
                <span className="text-sm sm:text-base pt-0.5 leading-snug">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Interactive Practice Mode (with instant feedback & Error Book actions)
  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
    setHasSubmitted(true);

    const isCorrect = idx === question.correctAnswer;
    recordQuestionAnswer(question.id, idx, isCorrect);

    if (!isCorrect) {
      setShowMistakeSelector(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setShowHint(false);
    setShowMistakeSelector(false);
  };

  const handleSaveToErrorBookWithClassification = (type: MistakeType) => {
    setSelectedMistakeType(type);
    if (selectedOption !== null) {
      recordError(question.id, selectedOption, question.correctAnswer, type);
      setAddedToErrorBook(true);
      setShowMistakeSelector(false);
    }
  };

  const isAnswerCorrect = selectedOption !== null && selectedOption === question.correctAnswer;

  return (
    <div className="bg-[#0e1017] border border-zinc-800/90 rounded-2xl p-5 sm:p-7 shadow-xl">
      {/* Question Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-800/70">
        <div className="flex items-center gap-2">
          {questionIndex !== undefined && (
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Q{questionIndex + 1}
              {totalQuestions ? ` of ${totalQuestions}` : ''}
            </span>
          )}
          <span className="text-xs text-zinc-400 font-medium">{question.topicName}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-xs text-zinc-400">{question.conceptTag}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Target: {question.expectedTimeSeconds}s</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              question.difficulty === 'Easy'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                : question.difficulty === 'Medium'
                ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
            }`}
          >
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Question Text */}
      <div className="text-zinc-100 text-base sm:text-lg font-medium leading-relaxed mb-6 whitespace-pre-line">
        {question.questionText}
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.correctAnswer;

          let btnClasses = 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/40';
          let letterClasses = 'bg-zinc-800 text-zinc-400';

          if (hasSubmitted) {
            if (isCorrect) {
              btnClasses = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200';
              letterClasses = 'bg-emerald-500 text-zinc-950';
            } else if (isSelected && !isCorrect) {
              btnClasses = 'bg-rose-950/30 border-rose-500/60 text-rose-200';
              letterClasses = 'bg-rose-500 text-white';
            } else {
              btnClasses = 'bg-zinc-900/30 border-zinc-800/40 text-zinc-500 opacity-60';
            }
          } else if (isSelected) {
            btnClasses = 'bg-amber-500/20 border-amber-400 text-white';
            letterClasses = 'bg-amber-500 text-zinc-950';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={hasSubmitted}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${btnClasses}`}
            >
              <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${letterClasses}`}>
                {letter}
              </span>
              <span className="text-sm sm:text-base pt-0.5 leading-snug flex-1">{option}</span>
              {hasSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              )}
              {hasSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Post-Submission Feedback & Deep Explanation */}
      {hasSubmitted && (
        <div className="space-y-4 pt-4 border-t border-zinc-800/80 animate-in fade-in duration-200">
          {/* Result Banner */}
          <div
            className={`p-4 rounded-xl flex items-center justify-between ${
              isAnswerCorrect
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isAnswerCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-semibold text-sm">Correct! Great execution.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="font-semibold text-sm">
                    Incorrect. Correct answer is Option {String.fromCharCode(65 + question.correctAnswer)}: {question.options[question.correctAnswer]}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Try Again</span>
              </button>
            </div>
          </div>

          {/* Classification Trigger for Mistakes */}
          {!isAnswerCorrect && showMistakeSelector && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Classify your mistake for My Error Book:</span>
                </span>
                <span className="text-[11px] text-zinc-400">Helps diagnose recurring weak points</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { type: 'concept', label: 'Concept mistake' },
                  { type: 'calculation', label: 'Calculation mistake' },
                  { type: 'misread', label: 'Misread question' },
                  { type: 'time_pressure', label: 'Time pressure' },
                  { type: 'guessing', label: 'Guessing' },
                  { type: 'careless', label: 'Careless mistake' },
                ].map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() => handleSaveToErrorBookWithClassification(type as MistakeType)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-zinc-200 hover:text-amber-300 transition-colors text-left flex items-center justify-between"
                  >
                    <span>{label}</span>
                    <PlusCircle className="w-3 h-3 text-amber-400 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error book confirmed notice */}
          {addedToErrorBook && (
            <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-amber-400" />
                <span>Logged to your personal Error Book under <strong>{selectedMistakeType.replace('_', ' ')}</strong></span>
              </span>
              <span className="text-[11px] text-zinc-400">Available in Error Book tab</span>
            </div>
          )}

          {/* Step-by-Step Explanation */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Step-by-Step Solution</span>
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
              {question.explanation}
            </p>
          </div>

          {/* Shortcut Method & Common Trap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.shortcut && (
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>30-Second Shortcut Method</span>
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{question.shortcut}</p>
              </div>
            )}

            {question.trapTag && (
              <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Common Placement Trap</span>
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{question.trapTag}</p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            {!isAnswerCorrect && !addedToErrorBook && !showMistakeSelector && (
              <button
                onClick={() => setShowMistakeSelector(true)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Save to My Error Book</span>
              </button>
            )}

            {showNextButton && onNext && (
              <button
                onClick={() => {
                  handleReset();
                  onNext();
                }}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 text-xs font-bold hover:brightness-110 transition-all shadow-md"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
