export interface CompanyPattern {
  id: string;
  name: string;
  logoLetter: string;
  badge: string;
  avgPackage: string;
  difficulty: 'Moderate' | 'High' | 'Very High';
  sections: {
    name: string;
    questionsCount: number;
    durationMinutes: number;
    cutoffAdvice: string;
  }[];
  totalTimeMinutes: number;
  negativeMarking: boolean;
  keyTopics: string[];
  insiderStrategy: string;
}

export const COMPANY_PATTERNS: CompanyPattern[] = [
  {
    id: 'tcs_nqt',
    name: 'TCS NQT (Ninja & Digital)',
    logoLetter: 'T',
    badge: 'Mass & Prime Recruiter',
    avgPackage: '₹3.6 - ₹9.0 LPA',
    difficulty: 'Moderate',
    sections: [
      { name: 'Numerical Ability', questionsCount: 20, durationMinutes: 25, cutoffAdvice: 'Aim for 70%+ accuracy; heavy on Percentages, Profit & Loss, and Time & Work.' },
      { name: 'Reasoning Ability', questionsCount: 20, durationMinutes: 25, cutoffAdvice: '65%+ cutoff; Syllogisms, Seating Arrangement, and Data Sufficiency.' },
      { name: 'Verbal Ability', questionsCount: 25, durationMinutes: 25, cutoffAdvice: 'Spotting Errors, Para Jumbles, and Reading Comprehension.' },
    ],
    totalTimeMinutes: 75,
    negativeMarking: false,
    keyTopics: ['Percentages', 'Time & Work', 'Syllogisms', 'Reading Comprehension', 'Number System', 'Data Interpretation'],
    insiderStrategy: 'TCS uses sectional timers! You cannot switch between sections. Spend the full allocated minutes per section. There is no negative marking, so ensure 100% attempt before the timer expires.',
  },
  {
    id: 'infosys',
    name: 'Infosys Placement Test',
    logoLetter: 'I',
    badge: 'Tier-1 IT Services',
    avgPackage: '₹3.6 - ₹9.5 LPA',
    difficulty: 'High',
    sections: [
      { name: 'Mathematical Critical Thinking', questionsCount: 15, durationMinutes: 25, cutoffAdvice: 'High standard! P&C, Probability, and Cryptarithmetic appear often.' },
      { name: 'Logical Reasoning', questionsCount: 15, durationMinutes: 35, cutoffAdvice: 'Complex puzzle matrices and multi-layered seating arrangements.' },
      { name: 'Verbal Ability', questionsCount: 20, durationMinutes: 20, cutoffAdvice: 'Speed reading and rapid sentence correction.' },
    ],
    totalTimeMinutes: 80,
    negativeMarking: false,
    keyTopics: ['Cryptarithmetic', 'Permutations & Combinations', 'Data Sufficiency', 'Puzzles', 'Sentence Correction'],
    insiderStrategy: 'Infosys questions are more analytical than formula-heavy. Time management in Logical Reasoning is critical. Solve puzzles by drawing clear constraint grids.',
  },
  {
    id: 'accenture',
    name: 'Accenture Assessment',
    logoLetter: 'A',
    badge: 'Cognitive & Technical',
    avgPackage: '₹4.5 - ₹6.5 LPA',
    difficulty: 'Moderate',
    sections: [
      { name: 'Cognitive Aptitude', questionsCount: 50, durationMinutes: 50, cutoffAdvice: 'Critical Thinking, Abstract Reasoning, and English Grammar.' },
      { name: 'Technical Assessment', questionsCount: 40, durationMinutes: 40, cutoffAdvice: 'Pseudocode, Networking, and Cloud fundamentals.' },
    ],
    totalTimeMinutes: 90,
    negativeMarking: false,
    keyTopics: ['Direction Sense', 'Blood Relations', 'Venn Diagrams', 'Grammar Basics', 'Pseudocode'],
    insiderStrategy: 'Accenture evaluates cognitive speed with 1 question per minute. Use elimination and mental math shortcuts rather than long manual derivations.',
  },
  {
    id: 'wipro_elite',
    name: 'Wipro Elite NLTH',
    logoLetter: 'W',
    badge: 'National Level Test',
    avgPackage: '₹3.5 - ₹6.5 LPA',
    difficulty: 'Moderate',
    sections: [
      { name: 'Quantitative Aptitude', questionsCount: 16, durationMinutes: 16, cutoffAdvice: 'High speed arithmetic, LCM/HCF, Ratio and Proportions.' },
      { name: 'Logical Reasoning', questionsCount: 14, durationMinutes: 14, cutoffAdvice: 'Coding-Decoding, Series completion, and Analogy.' },
      { name: 'Verbal Ability', questionsCount: 18, durationMinutes: 18, cutoffAdvice: 'Synonyms, Antonyms, and Cloze Test.' },
    ],
    totalTimeMinutes: 48,
    negativeMarking: false,
    keyTopics: ['LCM & HCF', 'Ratio & Proportion', 'Coding-Decoding', 'Synonyms', 'Averages'],
    insiderStrategy: 'Exactly 1 minute per question. Prioritize direct calculation shortcuts. If an answer takes longer than 45 seconds, mark an educated guess and proceed.',
  },
  {
    id: 'cognizant_genc',
    name: 'Cognizant (GenC & GenC Next)',
    logoLetter: 'C',
    badge: 'Adaptive Rounds',
    avgPackage: '₹4.0 - ₹6.7 LPA',
    difficulty: 'Moderate',
    sections: [
      { name: 'Quantitative Ability', questionsCount: 25, durationMinutes: 35, cutoffAdvice: 'Arithmetic and Speed math.' },
      { name: 'Analytical Reasoning', questionsCount: 20, durationMinutes: 25, cutoffAdvice: 'Visual patterns and Deductive logic.' },
      { name: 'Verbal Ability', questionsCount: 20, durationMinutes: 20, cutoffAdvice: 'Vocabulary in context and Error identification.' },
    ],
    totalTimeMinutes: 80,
    negativeMarking: false,
    keyTopics: ['Time, Speed & Distance', 'Mixtures & Alligation', 'Visual Reasoning', 'Sentence Improvement'],
    insiderStrategy: 'Look out for visual pattern recognition. Maintain an even pace and review skipped questions with 5 minutes remaining.',
  },
];

export const FRACTION_PERCENTAGE_TABLE = [
  { fraction: '1/2', percentage: '50%', decimal: '0.50' },
  { fraction: '1/3', percentage: '33.33%', decimal: '0.333' },
  { fraction: '1/4', percentage: '25%', decimal: '0.25' },
  { fraction: '1/5', percentage: '20%', decimal: '0.20' },
  { fraction: '1/6', percentage: '16.67%', decimal: '0.166' },
  { fraction: '1/7', percentage: '14.28%', decimal: '0.142' },
  { fraction: '1/8', percentage: '12.5%', decimal: '0.125' },
  { fraction: '1/9', percentage: '11.11%', decimal: '0.111' },
  { fraction: '1/10', percentage: '10%', decimal: '0.10' },
  { fraction: '1/11', percentage: '9.09%', decimal: '0.090' },
  { fraction: '1/12', percentage: '8.33%', decimal: '0.083' },
  { fraction: '1/13', percentage: '7.69%', decimal: '0.076' },
  { fraction: '1/14', percentage: '7.14%', decimal: '0.071' },
  { fraction: '1/15', percentage: '6.67%', decimal: '0.066' },
  { fraction: '1/16', percentage: '6.25%', decimal: '0.0625' },
  { fraction: '1/20', percentage: '5%', decimal: '0.05' },
];

export const PYTHAGOREAN_TRIPLES = [
  { base: '3, 4, 5', scale: '6, 8, 10 · 9, 12, 15 · 12, 16, 20' },
  { base: '5, 12, 13', scale: '10, 24, 26 · 15, 36, 39' },
  { base: '8, 15, 17', scale: '16, 30, 34' },
  { base: '7, 24, 25', scale: '14, 48, 50' },
  { base: '9, 40, 41', scale: 'Common in advanced vector puzzles' },
];

export const TEST_STRATEGY_RULES = [
  {
    title: 'The 3-Pass Test Strategy',
    desc: 'Pass 1 (0–20 mins): Solve all 100% familiar direct formula questions (usually 40% of the paper). Pass 2 (20–50 mins): Tackle multi-step and calculation problems. Pass 3 (50–60 mins): Review marked-for-review and attempt remaining questions.',
  },
  {
    title: 'The 30-Second Question Rule',
    desc: 'If after reading for 30 seconds you do not know the exact first step, mark for review immediately. Never waste 3 minutes trying to crack an unfamiliar puzzle in the first half.',
  },
  {
    title: 'Unit-Digit & Estimation Elimination',
    desc: 'Before calculating full multiplications, check the unit digits of the 4 options. If all end in different digits, calculate only the unit digit in 3 seconds.',
  },
  {
    title: 'Negative Marking Discipline',
    desc: 'If an exam penalizes wrong answers (e.g. -0.25), only guess if you can confidently eliminate at least 2 incorrect options. Expected value turns positive only after eliminating two choices.',
  },
];
