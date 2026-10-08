import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Question,
  ErrorRecord,
  MistakeType,
  TestAttemptResult,
  DiagnosticResult,
  ReadinessScore,
  TeacherBatch,
  MockTest,
} from '../types';
import { QUESTIONS_DATABASE } from '../data/questionsData';
import { MOCK_TESTS_CATALOG } from '../data/mockTestsData';

interface AppContextType {
  // Error Book
  errorBook: ErrorRecord[];
  recordError: (
    questionId: string,
    studentAnswer: number,
    correctAnswer: number,
    mistakeType?: MistakeType,
    notes?: string
  ) => void;
  updateMistakeClassification: (errorId: string, mistakeType: MistakeType) => void;
  toggleErrorResolved: (errorId: string) => void;
  removeErrorRecord: (errorId: string) => void;

  // Bookmarks
  bookmarkedFormulaIds: string[];
  toggleBookmarkFormula: (formulaId: string) => void;

  // Question & Practice Progress
  allQuestions: Question[];
  answeredQuestionIds: Record<string, { isCorrect: boolean; selectedOption: number; timestamp: number }>;
  recordQuestionAnswer: (questionId: string, selectedOption: number, isCorrect: boolean) => void;

  // Mock Tests
  allMockTests: MockTest[];
  testAttempts: TestAttemptResult[];
  saveTestAttempt: (attempt: TestAttemptResult) => void;

  // Diagnostic Test
  diagnosticResult: DiagnosticResult | null;
  saveDiagnosticResult: (result: DiagnosticResult) => void;

  // Readiness & Gamification
  readinessScore: ReadinessScore;
  currentStreak: number;
  totalQuestionsSolved: number;
  accuracyRate: number;
  averageSolvingTimeSeconds: number;

  // User Role & Teacher View
  userRole: 'student' | 'teacher';
  setUserRole: (role: 'student' | 'teacher') => void;
  teacherBatches: TeacherBatch[];
  addTeacherQuestion: (question: Question) => void;
  addTeacherTest: (test: MockTest) => void;

  // Navigation Helper
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTopicForLearn: string | null;
  setSelectedTopicForLearn: (topicId: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SEED_ERRORS: ErrorRecord[] = [
  {
    id: 'err_init_1',
    questionId: 'q_pct_02',
    timestamp: Date.now() - 86400000 * 2,
    studentAnswer: 0, // Selected No Change (0%)
    correctAnswer: 1, // Correct was 4% decrease
    mistakeType: 'concept',
    notes: 'Thought +20% and -20% canceled out algebraically without applying the base change multiplier.',
    isResolved: false,
  },
  {
    id: 'err_init_2',
    questionId: 'q_tw_01',
    timestamp: Date.now() - 86400000 * 1,
    studentAnswer: 1, // Selected 12 days
    correctAnswer: 0, // Correct was 8.57 days (or updated)
    mistakeType: 'calculation',
    notes: 'Subtracted individual efficiencies incorrectly from total work LCM.',
    isResolved: false,
  },
  {
    id: 'err_init_3',
    questionId: 'q_tsd_01',
    timestamp: Date.now() - 43200000,
    studentAnswer: 0, // Selected 50 km/h (arithmetic mean)
    correctAnswer: 1, // Correct was 48 km/h (harmonic mean)
    mistakeType: 'misread',
    notes: 'Jumped to (60+40)/2 without recognizing equal distance condition.',
    isResolved: false,
  },
];

const INITIAL_BATCHES: TeacherBatch[] = [
  {
    id: 'batch_cse_2027',
    name: 'B.Tech CSE - 2027 Placement Batch',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    studentsCount: 142,
    averageAccuracy: 64,
    averageMockScore: 14.2,
    weakTopics: ['Time & Work', 'Probability & Combinations', 'Syllogisms (Either-Or)'],
    strongTopics: ['Percentages', 'Direction Sense', 'Sentence Correction'],
    assignedTests: ['mock_full_campus_01', 'mock_tcs_nqt_01'],
  },
  {
    id: 'batch_ece_2027',
    name: 'B.Tech ECE - Core & IT Placement Batch',
    department: 'Electronics & Communication',
    semester: '6th Semester',
    studentsCount: 98,
    averageAccuracy: 58,
    averageMockScore: 12.8,
    weakTopics: ['Time, Speed & Distance', 'Reading Comprehension', 'Permutations & Combinations'],
    strongTopics: ['Number System', 'Blood Relations'],
    assignedTests: ['mock_quant_marathon'],
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTopicForLearn, setSelectedTopicForLearn] = useState<string | null>(null);

  // Role
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');

  // Error Book State
  const [errorBook, setErrorBook] = useState<ErrorRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aptivance_error_book');
      return saved ? JSON.parse(saved) : SEED_ERRORS;
    } catch {
      return SEED_ERRORS;
    }
  });

  // Bookmarks
  const [bookmarkedFormulaIds, setBookmarkedFormulaIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aptivance_bookmarked_formulas');
      return saved ? JSON.parse(saved) : ['f_pct_01', 'f_tw_01', 'f_tsd_01'];
    } catch {
      return ['f_pct_01', 'f_tw_01', 'f_tsd_01'];
    }
  });

  // Questions Answered History
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<
    Record<string, { isCorrect: boolean; selectedOption: number; timestamp: number }>
  >(() => {
    try {
      const saved = localStorage.getItem('aptivance_answered_questions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Teacher Custom Items
  const [teacherCustomQuestions, setTeacherCustomQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('aptivance_teacher_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [teacherCustomTests, setTeacherCustomTests] = useState<MockTest[]>(() => {
    try {
      const saved = localStorage.getItem('aptivance_teacher_tests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [teacherBatches, setTeacherBatches] = useState<TeacherBatch[]>(INITIAL_BATCHES);

  // Test Attempts
  const [testAttempts, setTestAttempts] = useState<TestAttemptResult[]>(() => {
    try {
      const saved = localStorage.getItem('aptivance_test_attempts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Diagnostic Result
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(() => {
    try {
      const saved = localStorage.getItem('aptivance_diagnostic_result');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aptivance_error_book', JSON.stringify(errorBook));
    } catch (e) {
      console.error(e);
    }
  }, [errorBook]);

  useEffect(() => {
    try {
      localStorage.setItem('aptivance_bookmarked_formulas', JSON.stringify(bookmarkedFormulaIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedFormulaIds]);

  useEffect(() => {
    try {
      localStorage.setItem('aptivance_answered_questions', JSON.stringify(answeredQuestionIds));
    } catch (e) {
      console.error(e);
    }
  }, [answeredQuestionIds]);

  useEffect(() => {
    try {
      localStorage.setItem('aptivance_test_attempts', JSON.stringify(testAttempts));
    } catch (e) {
      console.error(e);
    }
  }, [testAttempts]);

  useEffect(() => {
    try {
      if (diagnosticResult) {
        localStorage.setItem('aptivance_diagnostic_result', JSON.stringify(diagnosticResult));
      }
    } catch (e) {
      console.error(e);
    }
  }, [diagnosticResult]);

  // Combined Questions & Tests
  const allQuestions = [...QUESTIONS_DATABASE, ...teacherCustomQuestions];
  const allMockTests = [...MOCK_TESTS_CATALOG, ...teacherCustomTests];

  // Error Book operations
  const recordError = (
    questionId: string,
    studentAnswer: number,
    correctAnswer: number,
    mistakeType: MistakeType = 'concept',
    notes?: string
  ) => {
    setErrorBook((prev) => {
      // Don't add exact duplicate unresolved error
      const existing = prev.find((e) => e.questionId === questionId && !e.isResolved);
      if (existing) {
        return prev.map((e) =>
          e.id === existing.id
            ? { ...e, timestamp: Date.now(), studentAnswer, mistakeType, notes: notes || e.notes }
            : e
        );
      }
      const newEntry: ErrorRecord = {
        id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        questionId,
        timestamp: Date.now(),
        studentAnswer,
        correctAnswer,
        mistakeType,
        notes: notes || 'Logged during practice session.',
        isResolved: false,
      };
      return [newEntry, ...prev];
    });
  };

  const updateMistakeClassification = (errorId: string, mistakeType: MistakeType) => {
    setErrorBook((prev) =>
      prev.map((err) => (err.id === errorId ? { ...err, mistakeType } : err))
    );
  };

  const toggleErrorResolved = (errorId: string) => {
    setErrorBook((prev) =>
      prev.map((err) =>
        err.id === errorId
          ? {
              ...err,
              isResolved: !err.isResolved,
              resolvedAt: !err.isResolved ? Date.now() : undefined,
            }
          : err
      )
    );
  };

  const removeErrorRecord = (errorId: string) => {
    setErrorBook((prev) => prev.filter((err) => err.id !== errorId));
  };

  // Formula Bookmark operations
  const toggleBookmarkFormula = (formulaId: string) => {
    setBookmarkedFormulaIds((prev) =>
      prev.includes(formulaId) ? prev.filter((id) => id !== formulaId) : [...prev, formulaId]
    );
  };

  // Answer recording
  const recordQuestionAnswer = (questionId: string, selectedOption: number, isCorrect: boolean) => {
    setAnsweredQuestionIds((prev) => ({
      ...prev,
      [questionId]: {
        isCorrect,
        selectedOption,
        timestamp: Date.now(),
      },
    }));

    if (!isCorrect) {
      const q = allQuestions.find((item) => item.id === questionId);
      if (q) {
        recordError(questionId, selectedOption, q.correctAnswer, 'concept');
      }
    }
  };

  // Test Attempt operations
  const saveTestAttempt = (attempt: TestAttemptResult) => {
    setTestAttempts((prev) => [attempt, ...prev]);
  };

  const saveDiagnosticResult = (result: DiagnosticResult) => {
    setDiagnosticResult(result);
  };

  // Teacher actions
  const addTeacherQuestion = (question: Question) => {
    setTeacherCustomQuestions((prev) => {
      const updated = [question, ...prev];
      localStorage.setItem('aptivance_teacher_questions', JSON.stringify(updated));
      return updated;
    });
  };

  const addTeacherTest = (test: MockTest) => {
    setTeacherCustomTests((prev) => {
      const updated = [test, ...prev];
      localStorage.setItem('aptivance_teacher_tests', JSON.stringify(updated));
      return updated;
    });
  };

  // Stats calculation
  const totalQuestionsSolved = Object.keys(answeredQuestionIds).length;
  const correctCount = Object.values(answeredQuestionIds).filter((a) => a.isCorrect).length;
  const accuracyRate =
    totalQuestionsSolved > 0 ? Math.round((correctCount / totalQuestionsSolved) * 100) : 74;

  const averageSolvingTimeSeconds = 38; // standard baseline speed
  const currentStreak = 4; // active days in a row

  // Multi-dimensional Placement Readiness Score
  const calculateReadiness = (): ReadinessScore => {
    const accuracyScore = Math.min(100, Math.round((accuracyRate / 80) * 100));
    const coverageScore = Math.min(100, Math.round((totalQuestionsSolved / 25) * 100) || 55);
    const speedScore = 78; // 38s avg vs 60s benchmark
    const consistencyScore = 80;
    const mockScore = testAttempts.length > 0
      ? Math.round(testAttempts.reduce((acc, t) => acc + t.percentage, 0) / testAttempts.length)
      : (diagnosticResult ? diagnosticResult.percentage : 65);

    const overall = Math.round(
      accuracyScore * 0.3 +
      speedScore * 0.2 +
      consistencyScore * 0.15 +
      coverageScore * 0.15 +
      mockScore * 0.2
    );

    let status: 'Foundation Stage' | 'Improving' | 'Strong' | 'Placement Ready' = 'Improving';
    let rationale = '';

    if (overall >= 80) {
      status = 'Placement Ready';
      rationale = 'Excellent speed and concept stability. Your accuracy in high-frequency commercial math and deductive syllogisms meets Tier-1 company cutoffs.';
    } else if (overall >= 65) {
      status = 'Strong';
      rationale = 'Solid fundamentals across Quantitative and Logical topics. Target resolving remaining items in your Error Book to clear speed cutoffs.';
    } else if (overall >= 45) {
      status = 'Improving';
      rationale = 'Good conceptual progress. Focus on timed practice in Time & Work and Permutations to boost consistency.';
    } else {
      status = 'Foundation Stage';
      rationale = 'Complete the Diagnostic Test and follow the recommended foundational topic sequence.';
    }

    return {
      overall,
      accuracyScore,
      speedScore,
      consistencyScore,
      coverageScore,
      mockScore,
      status,
      rationale,
    };
  };

  const readinessScore = calculateReadiness();

  return (
    <AppContext.Provider
      value={{
        errorBook,
        recordError,
        updateMistakeClassification,
        toggleErrorResolved,
        removeErrorRecord,
        bookmarkedFormulaIds,
        toggleBookmarkFormula,
        allQuestions,
        answeredQuestionIds,
        recordQuestionAnswer,
        allMockTests,
        testAttempts,
        saveTestAttempt,
        diagnosticResult,
        saveDiagnosticResult,
        readinessScore,
        currentStreak,
        totalQuestionsSolved,
        accuracyRate,
        averageSolvingTimeSeconds,
        userRole,
        setUserRole,
        teacherBatches,
        addTeacherQuestion,
        addTeacherTest,
        activeTab,
        setActiveTab,
        selectedTopicForLearn,
        setSelectedTopicForLearn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
