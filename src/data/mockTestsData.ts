import { MockTest } from '../types';

export const MOCK_TESTS_CATALOG: MockTest[] = [
  {
    id: 'mock_full_campus_01',
    title: 'Full Campus Placement Screening Mock',
    category: 'Full Mock',
    description: 'Comprehensive 3-section simulation mimicking standard engineering placement written tests across Quant, Logical, and Verbal.',
    durationMinutes: 30,
    questionIds: [
      'q_pct_01', 'q_pct_02', 'q_pl_01', 'q_tw_01', 'q_tsd_01',
      'q_si_01', 'q_pnc_01', 'q_num_01', 'q_syl_01', 'q_syl_02',
      'q_br_01', 'q_dir_01', 'q_seat_01', 'q_se_01', 'q_se_02',
      'q_sc_01', 'q_rc_01', 'q_pct_03', 'q_tw_02', 'q_pl_02'
    ],
    negativeMarking: true,
    marksPerQuestion: 1,
    negativePenalty: 0.25,
    passingScore: 13,
  },
  {
    id: 'mock_tcs_nqt_01',
    title: 'TCS NQT Foundation Simulation',
    category: 'Company Pattern',
    targetCompany: 'Tata Consultancy Services',
    description: 'Tailored to TCS NQT Foundation cognitive rounds with commercial math, deductive syllogisms, and grammar traps.',
    durationMinutes: 20,
    questionIds: [
      'q_pct_01', 'q_pl_01', 'q_tw_01', 'q_si_01', 'q_num_01',
      'q_syl_01', 'q_br_01', 'q_dir_01', 'q_se_01', 'q_sc_01'
    ],
    negativeMarking: false,
    marksPerQuestion: 1,
    negativePenalty: 0,
    passingScore: 7,
  },
  {
    id: 'mock_quant_marathon',
    title: 'Quantitative Aptitude Power Marathon',
    category: 'Topic Marathon',
    description: 'Deep dive into numerical problem solving: Percentages, Profit & Loss, Work, Speed, Interest, and Combinations.',
    durationMinutes: 25,
    questionIds: [
      'q_pct_01', 'q_pct_02', 'q_pct_03', 'q_pct_04',
      'q_pl_01', 'q_pl_02', 'q_pl_03', 'q_tw_01', 'q_tw_02',
      'q_tw_03', 'q_tsd_01', 'q_tsd_02'
    ],
    negativeMarking: true,
    marksPerQuestion: 1,
    negativePenalty: 0.25,
    passingScore: 8,
  },
  {
    id: 'mock_logical_blitz',
    title: 'Logical & Analytical Reasoning Blitz',
    category: 'Speed Sprint',
    description: 'High-speed deductive test targeting syllogism edge-cases, family tree relations, and linear seating arrangements.',
    durationMinutes: 15,
    questionIds: [
      'q_syl_01', 'q_syl_02', 'q_br_01', 'q_dir_01', 'q_seat_01'
    ],
    negativeMarking: false,
    marksPerQuestion: 1,
    negativePenalty: 0,
    passingScore: 4,
  },
  {
    id: 'mock_verbal_sprint',
    title: 'Verbal Ability & Grammar Accuracy Sprint',
    category: 'Speed Sprint',
    description: 'Rapid-fire language evaluation testing subject-verb agreement, modifier parallelism, and passage inference.',
    durationMinutes: 10,
    questionIds: [
      'q_se_01', 'q_se_02', 'q_sc_01', 'q_rc_01'
    ],
    negativeMarking: true,
    marksPerQuestion: 1,
    negativePenalty: 0.25,
    passingScore: 3,
  },
];
