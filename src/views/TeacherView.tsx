import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Question, MockTest, SubjectId, DifficultyLevel } from '../types';
import { SITLogo, NAACLogo, IICLogo } from '../components/common/InstitutionalLogos';
import { LogoManagerModal } from '../components/common/LogoManagerModal';
import {
  Users2,
  PlusCircle,
  FileCheck2,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Send,
  Trash2,
  Layers,
  GraduationCap,
  Sparkles,
  UploadCloud,
} from 'lucide-react';

export const TeacherView: React.FC = () => {
  const {
    allQuestions,
    allMockTests,
    teacherBatches,
    addTeacherQuestion,
    addTeacherTest,
    setUserRole,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'analytics' | 'questions' | 'tests' | 'batches'>('analytics');
  const [showLogoModal, setShowLogoModal] = useState<boolean>(false);

  // Form states for creating question
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<SubjectId>('quantitative');
  const [newTopicName, setNewTopicName] = useState<string>('Percentages');
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState<string>('');
  const [newShortcut, setNewShortcut] = useState<string>('');
  const [newDifficulty, setNewDifficulty] = useState<DifficultyLevel>('Medium');
  const [newExpectedTime, setNewExpectedTime] = useState<number>(45);

  // Form states for creating test
  const [showTestModal, setShowTestModal] = useState<boolean>(false);
  const [newTestTitle, setNewTestTitle] = useState<string>('');
  const [newTestDuration, setNewTestDuration] = useState<number>(20);
  const [newNegativeMarking, setNewNegativeMarking] = useState<boolean>(true);
  const [selectedQuestionIdsForTest, setSelectedQuestionIdsForTest] = useState<string[]>([]);

  // Selected batch for class analytics
  const [selectedBatchId, setSelectedBatchId] = useState<string>(teacherBatches[0]?.id || '');
  const activeBatch = teacherBatches.find((b) => b.id === selectedBatchId) || teacherBatches[0];

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || newOptions.some((o) => !o.trim())) {
      alert('Please fill out question text and all 4 options.');
      return;
    }

    const created: Question = {
      id: `q_custom_${Date.now()}`,
      subject: newSubject,
      topicId: newTopicName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      topicName: newTopicName,
      questionText: newQuestionText,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation || 'Teacher provided worked solution.',
      shortcut: newShortcut || undefined,
      difficulty: newDifficulty,
      expectedTimeSeconds: newExpectedTime,
      conceptTag: 'Faculty Curated',
      trapTag: 'Common college exam trap',
    };

    addTeacherQuestion(created);
    setShowQuestionModal(false);
    // Reset form
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewExplanation('');
    setNewShortcut('');
    alert('Question added successfully to the placement repository!');
  };

  const handleCreateTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim() || selectedQuestionIdsForTest.length === 0) {
      alert('Please provide a test title and select at least 1 question.');
      return;
    }

    const createdTest: MockTest = {
      id: `mock_faculty_${Date.now()}`,
      title: newTestTitle,
      category: 'Topic Marathon',
      description: 'Custom placement test curated and assigned by college training faculty.',
      durationMinutes: newTestDuration,
      questionIds: selectedQuestionIdsForTest,
      negativeMarking: newNegativeMarking,
      marksPerQuestion: 1,
      negativePenalty: 0.25,
      passingScore: Math.ceil(selectedQuestionIdsForTest.length * 0.6),
    };

    addTeacherTest(createdTest);
    setShowTestModal(false);
    setNewTestTitle('');
    setSelectedQuestionIdsForTest([]);
    alert('Faculty placement test created and published!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
            <Users2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Faculty & Trainer Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Placement Cell & Faculty Portal
          </h1>
          <p className="text-sm text-zinc-400">
            Monitor batch performance, isolate class-wide weak topics in seconds, curate question banks, and assign tests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Institutional Logos in Faculty Portal */}
          <div className="hidden sm:flex items-center gap-2.5 p-1.5 px-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <SITLogo size="sm" />
            <NAACLogo size="sm" />
            <IICLogo size="sm" />
            <button
              onClick={() => setShowLogoModal(true)}
              className="ml-1 p-1 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors"
              title="Upload / Customize Logos"
            >
              <UploadCloud className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setUserRole('student')}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-xs font-semibold text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Switch to Student View</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-2">
        {[
          { id: 'analytics', label: 'Batch Analytics & Weak Areas' },
          { id: 'questions', label: `Manage Questions (${allQuestions.length})` },
          { id: 'tests', label: `Assigned Tests (${allMockTests.length})` },
          { id: 'batches', label: `Class Batches (${teacherBatches.length})` },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: BATCH ANALYTICS & WEAK TOPIC SPOTLIGHT */}
      {activeSection === 'analytics' && activeBatch && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Batch Selector Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-semibold">Selected Class Batch:</span>
            <select
              value={selectedBatchId}
              onChange={(e) => setSelectedBatchId(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-white text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              {teacherBatches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.department})
                </option>
              ))}
            </select>
          </div>

          {/* CRITICAL PRD REQUIREMENT: Instant 2-second class weak area diagnosis */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/20 via-zinc-900/90 to-amber-950/20 border border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Instant Diagnostic Diagnosis for {activeBatch.name}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
              <span className="text-rose-400 font-bold">Class Weak Areas Alert: </span>
              Your class is currently weak in{' '}
              <strong className="text-amber-300">{activeBatch.weakTopics.join(', ')}</strong>.
              Average accuracy on these topics is currently below the 60% campus screening benchmark.
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-zinc-400">Recommended Trainer Action:</span>
              <button
                onClick={() => {
                  setActiveSection('tests');
                  setShowTestModal(true);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Assign Remedial Practice Test</span>
              </button>
            </div>
          </div>

          {/* Batch Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {activeBatch.studentsCount}
              </div>
              <div className="text-xs text-zinc-400">Enrolled Students</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
                {activeBatch.averageAccuracy}%
              </div>
              <div className="text-xs text-zinc-400">Class Average Accuracy</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-heading">
                {activeBatch.averageMockScore} / 20
              </div>
              <div className="text-xs text-zinc-400">Avg Mock Test Score</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                {activeBatch.assignedTests.length}
              </div>
              <div className="text-xs text-zinc-400">Active Test Windows</div>
            </div>
          </div>

          {/* Strong vs Weak Topics comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Batch Weak Topics (Requires Lecture Focus)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {activeBatch.weakTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <span>{topic}</span>
                    <span className="text-rose-400 font-bold">~44% Accuracy</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Batch Strong Topics (Placement Ready)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {activeBatch.strongTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <span>{topic}</span>
                    <span className="text-emerald-400 font-bold">~78% Accuracy</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: QUESTION BANK MANAGEMENT */}
      {activeSection === 'questions' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Repository Questions</h2>
              <p className="text-xs text-zinc-400">Total {allQuestions.length} verified placement items</p>
            </div>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Question</span>
            </button>
          </div>

          {/* Question List Preview */}
          <div className="space-y-3">
            {allQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0e1017] border border-zinc-800 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-zinc-800 text-amber-400">
                      {q.id}
                    </span>
                    <span className="font-semibold text-zinc-200">{q.topicName}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{q.difficulty}</span>
                  </div>
                  <span className="text-zinc-500">{q.expectedTimeSeconds}s expected</span>
                </div>

                <div className="text-sm font-medium text-white line-clamp-2">
                  {q.questionText}
                </div>

                <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                  Correct Answer: Option {String.fromCharCode(65 + q.correctAnswer)} (
                  {q.options[q.correctAnswer]})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TESTS CREATION & ASSIGNMENT */}
      {activeSection === 'tests' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Mock Examinations</h2>
              <p className="text-xs text-zinc-400">Configure duration, questions, and negative marking</p>
            </div>
            <button
              onClick={() => setShowTestModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create & Assign Test</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allMockTests.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-[#0e1017] border border-zinc-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300">
                    {t.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{t.durationMinutes} mins</span>
                </div>
                <h3 className="text-base font-bold text-white">{t.title}</h3>
                <p className="text-xs text-zinc-400">{t.description}</p>
                <div className="text-xs text-zinc-300 pt-2 border-t border-zinc-800 flex justify-between">
                  <span>{t.questionIds.length} Questions</span>
                  <span>Passing: {t.passingScore} marks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: BATCHES */}
      {activeSection === 'batches' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="text-lg font-bold text-white font-heading">Enrolled College Batches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacherBatches.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-[#0e1017] border border-zinc-800 space-y-3"
              >
                <h3 className="text-base font-bold text-white">{b.name}</h3>
                <div className="text-xs text-zinc-400">{b.department} · {b.semester}</div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 block">Class Accuracy</span>
                    <span className="font-bold text-amber-400">{b.averageAccuracy}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 block">Students</span>
                    <span className="font-bold text-white">{b.studentsCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: CREATE QUESTION */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1017] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white font-heading">
                Add Question to Placement Bank
              </h3>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateQuestionSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Subject Area</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as SubjectId)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                  >
                    <option value="quantitative">Quantitative Aptitude</option>
                    <option value="logical">Logical Reasoning</option>
                    <option value="verbal">Verbal Ability</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Topic Name</label>
                  <input
                    type="text"
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    placeholder="e.g. Time & Work"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Question Text</label>
                <textarea
                  rows={3}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Enter problem statement with numbers and units..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white text-xs"
                  required
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block text-zinc-400 font-semibold">Options A, B, C, D</label>
                {newOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 font-bold text-amber-400 text-center">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newOptions];
                        updated[idx] = e.target.value;
                        setNewOptions(updated);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                      required
                    />
                    <input
                      type="radio"
                      name="correctOpt"
                      checked={newCorrectAnswer === idx}
                      onChange={() => setNewCorrectAnswer(idx)}
                      className="cursor-pointer"
                      title="Mark as correct answer"
                    />
                    <span className="text-[10px] text-zinc-500">Correct?</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Placement Challenge">Placement Challenge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Target Time (Sec)</label>
                  <input
                    type="number"
                    value={newExpectedTime}
                    onChange={(e) => setNewExpectedTime(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Step-by-Step Solution</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Detail the reasoning step-by-step..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">30-Second Shortcut Method (Optional)</label>
                <input
                  type="text"
                  value={newShortcut}
                  onChange={(e) => setNewShortcut(e.target.value)}
                  placeholder="Vedic/LCM/Golden ratio shortcut..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-xs hover:brightness-110 shadow-md"
              >
                Publish Question to Bank
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE TEST */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1017] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white font-heading">
                Create Placement Assessment Test
              </h3>
              <button
                onClick={() => setShowTestModal(false)}
                className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateTestSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Test Title</label>
                <input
                  type="text"
                  value={newTestTitle}
                  onChange={(e) => setNewTestTitle(e.target.value)}
                  placeholder="e.g. Week 4 - Time & Work Sprint Test"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={newTestDuration}
                    onChange={(e) => setNewTestDuration(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Negative Marking</label>
                  <select
                    value={newNegativeMarking ? 'yes' : 'no'}
                    onChange={(e) => setNewNegativeMarking(e.target.value === 'yes')}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white"
                  >
                    <option value="yes">Yes (-0.25 penalty)</option>
                    <option value="no">No negative marking</option>
                  </select>
                </div>
              </div>

              {/* Select Questions */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-zinc-400 font-semibold">
                    Select Questions ({selectedQuestionIdsForTest.length} selected)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedQuestionIdsForTest.length === allQuestions.length) {
                        setSelectedQuestionIdsForTest([]);
                      } else {
                        setSelectedQuestionIdsForTest(allQuestions.slice(0, 10).map((q) => q.id));
                      }
                    }}
                    className="text-[11px] text-amber-400"
                  >
                    Select Top 10
                  </button>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-zinc-900 border border-zinc-800 rounded-xl">
                  {allQuestions.map((q) => {
                    const isSelected = selectedQuestionIdsForTest.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className="flex items-center gap-2 p-1.5 rounded hover:bg-zinc-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedQuestionIdsForTest((prev) => [...prev, q.id]);
                            } else {
                              setSelectedQuestionIdsForTest((prev) =>
                                prev.filter((id) => id !== q.id)
                              );
                            }
                          }}
                        />
                        <span className="text-amber-400 font-mono text-[10px]">{q.topicName}:</span>
                        <span className="text-zinc-300 truncate text-[11px] flex-1">
                          {q.questionText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-xs hover:brightness-110 shadow-md"
              >
                Create & Publish Test to Batches
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Institutional & Brand Logo Manager Modal */}
      <LogoManagerModal isOpen={showLogoModal} onClose={() => setShowLogoModal(false)} />
    </div>
  );
};
