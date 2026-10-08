export type SubjectId = 'quantitative' | 'logical' | 'verbal' | 'placement_skills';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Placement Challenge';

export type MistakeType = 
  | 'concept' 
  | 'calculation' 
  | 'misread' 
  | 'time_pressure' 
  | 'guessing' 
  | 'careless';

export interface Question {
  id: string;
  subject: SubjectId;
  topicId: string;
  topicName: string;
  subtopic?: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  shortcut?: string;
  difficulty: DifficultyLevel;
  expectedTimeSeconds: number;
  conceptTag: string;
  trapTag?: string;
  hint?: string;
  diagram?: string;
  source?: string;
  formulaRef?: string;
}

export interface FormulaItem {
  id: string;
  subject: SubjectId;
  topicId: string;
  topicName: string;
  name: string;
  formula: string;
  variables: { symbol: string; meaning: string }[];
  example: string;
  shortcut?: string;
  commonMistake?: string;
  tags: string[];
}

export interface WorkedExample {
  title: string;
  problem: string;
  solutionSteps: string[];
  shortcutMethod?: string;
  keyTakeaway: string;
}

export interface TopicLesson {
  id: string;
  subject: SubjectId;
  title: string;
  tagline: string;
  placementImportance: string;
  estimatedMinutes: number;
  concepts: {
    heading: string;
    body: string;
    bulletPoints?: string[];
  }[];
  formulas: {
    name: string;
    expression: string;
    explanation: string;
    example: string;
    shortcutNote?: string;
  }[];
  workedExamples: WorkedExample[];
  commonTraps: string[];
  shortcuts: string[];
  relatedTopics: { id: string; title: string; subject: SubjectId }[];
  practiceQuestionIds: string[];
}

export interface ErrorRecord {
  id: string;
  questionId: string;
  timestamp: number;
  studentAnswer: number;
  correctAnswer: number;
  mistakeType: MistakeType;
  notes?: string;
  isResolved: boolean;
  resolvedAt?: number;
}

export interface MockTest {
  id: string;
  title: string;
  category: 'Full Mock' | 'Company Pattern' | 'Topic Marathon' | 'Speed Sprint';
  targetCompany?: string;
  description: string;
  durationMinutes: number;
  questionIds: string[];
  negativeMarking: boolean;
  marksPerQuestion: number;
  negativePenalty: number;
  passingScore: number;
}

export interface TestAttemptResult {
  id: string;
  testId: string;
  testTitle: string;
  timestamp: number;
  durationTakenSeconds: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  score: number;
  percentage: number;
  accuracy: number;
  averageTimePerQuestion: number;
  answers: {
    questionId: string;
    selectedOption: number | null;
    isCorrect: boolean;
    timeSpentSeconds: number;
  }[];
  topicBreakdown: {
    topicName: string;
    total: number;
    correct: number;
    accuracy: number;
  }[];
}

export interface DiagnosticResult {
  id: string;
  timestamp: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  quantScore: { correct: number; total: number; percentage: number };
  logicalScore: { correct: number; total: number; percentage: number };
  verbalScore: { correct: number; total: number; percentage: number };
  strengths: string[];
  weakAreas: string[];
  recommendedPath: {
    step: number;
    topicId: string;
    topicName: string;
    subject: SubjectId;
    reason: string;
  }[];
}

export type ReadinessStage = 'Foundation Stage' | 'Improving' | 'Strong' | 'Placement Ready';

export interface ReadinessScore {
  overall: number; // 0 - 100
  accuracyScore: number;
  speedScore: number;
  consistencyScore: number;
  coverageScore: number;
  mockScore: number;
  status: ReadinessStage;
  rationale: string;
}

export interface TeacherBatch {
  id: string;
  name: string;
  department: string;
  semester: string;
  studentsCount: number;
  averageAccuracy: number;
  averageMockScore: number;
  weakTopics: string[];
  strongTopics: string[];
  assignedTests: string[];
}
