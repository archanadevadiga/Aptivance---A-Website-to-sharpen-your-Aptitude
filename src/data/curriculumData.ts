import { TopicLesson, SubjectId } from '../types';

export const SUBJECT_METADATA: Record<SubjectId, {
  name: string;
  shortDesc: string;
  icon: string;
  accentColor: string;
  topicsCount: number;
}> = {
  quantitative: {
    name: 'Quantitative Aptitude',
    shortDesc: 'Mathematical foundations, commercial math, modern arithmetic, and data interpretation for campus screening tests.',
    icon: 'Calculator',
    accentColor: '#f59e0b', // Gold / Amber
    topicsCount: 22,
  },
  logical: {
    name: 'Logical Reasoning',
    shortDesc: 'Analytical deductions, series puzzles, syllogisms, and structural thinking demanded by top hiring rounds.',
    icon: 'BrainCircuit',
    accentColor: '#38bdf8', // Sky Blue / Cyan accent
    topicsCount: 12,
  },
  verbal: {
    name: 'Verbal Ability',
    shortDesc: 'Grammatical precision, sentence restructuring, reading comprehension, and error spotting for communication rounds.',
    icon: 'BookOpenCheck',
    accentColor: '#10b981', // Emerald
    topicsCount: 7,
  },
  placement_skills: {
    name: 'Placement Strategy & Shortcuts',
    shortDesc: 'Vedic math shortcuts, fraction-to-percentage speeds, company cutoffs, and elimination techniques.',
    icon: 'Zap',
    accentColor: '#fbbf24', // Bright Gold
    topicsCount: 4,
  },
};

export const TOPIC_LESSONS: TopicLesson[] = [
  // ================= QUANTITATIVE APTITUDE =================
  {
    id: 'percentages',
    subject: 'quantitative',
    title: 'Percentages & Fraction Equivalents',
    tagline: 'The universal cornerstone of placement quantitative questions.',
    placementImportance: 'Featured in 95%+ of placement exams (TCS, Infosys, Accenture, Cognizant). Powers Profit & Loss, Simple Interest, and Data Interpretation.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. What is Percentage & Fraction Invariance',
        body: 'A percentage is a fraction with denominator 100. The secret to 30-second solving is converting percentages directly into simplified fractions rather than multiplying by decimal numbers.',
        bulletPoints: [
          'Multiplying factor (MF) for x% increase = (1 + x/100). E.g., 20% increase = multiply by 1.2 or 6/5.',
          'Multiplying factor for x% decrease = (1 - x/100). E.g., 16.66% decrease = multiply by 5/6.',
          'Percentage Change = (|Final - Initial| / Initial) × 100. The denominator is ALWAYS the base value.',
        ],
      },
      {
        heading: '2. Successive Percentage Change',
        body: 'When a quantity changes by a% followed by b%, the net percentage change is given by the algebraic formula: Net % = a + b + (a × b)/100. Take negative signs for decreases.',
      },
      {
        heading: '3. Product Constancy (Price × Consumption = Expenditure)',
        body: 'If A × B = Constant, and A increases by x/y, then B MUST decrease by x / (x + y) to keep the product unchanged.',
        bulletPoints: [
          'If price rises by 25% (1/4), consumption must drop by 1/(4+1) = 1/5 = 20%.',
          'If speed increases by 33.33% (1/3), time taken decreases by 1/(3+1) = 1/4 = 25%.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Successive Percentage Change',
        expression: 'Net % Change = a + b + (ab / 100)',
        explanation: 'Use + for increase and - for decrease or discounts.',
        example: 'A salary is hiked by 20% then cut by 10%. Net = 20 - 10 + (20 × -10)/100 = 10 - 2 = +8% increase.',
        shortcutNote: 'Do not compute intermediate values; apply formula directly to fractions.',
      },
      {
        name: 'Price-Consumption Inverse Rule',
        expression: 'Increase of a/b ⟹ Decrease of a/(a + b)',
        explanation: 'Maintains zero net change in product when variables are inversely proportional.',
        example: 'Sugar price rises by 20% (1/5). Consumption reduction = 1 / (1 + 5) = 1/6 = 16.67%.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Successive Changes on Product Cost',
        problem: 'A laptop price was first increased by 25% due to chip shortages, and then lowered by 20% during Diwali sales. What is the overall percentage change on the original price?',
        solutionSteps: [
          'Step 1: Identify rates: a = +25, b = -20.',
          'Step 2: Plug into successive formula: Net = 25 - 20 + ((25 × -20) / 100).',
          'Step 3: Simplify: 5 + (-500 / 100) = 5 - 5 = 0%.',
        ],
        shortcutMethod: 'Fraction method: 25% increase = × 5/4. 20% decrease = × 4/5. Combined factor = (5/4) × (4/5) = 1 (No change!). Solved in 5 seconds.',
        keyTakeaway: 'An increase of 1/x followed by a decrease of 1/(x+1) always yields a net 0% change.',
      },
      {
        title: 'Example 2: Population Growth Over Consecutive Years',
        problem: 'The population of an IT park increases by 10% in Year 1 and 20% in Year 2. If the population at the end of Year 2 is 13,200, find the original population.',
        solutionSteps: [
          'Step 1: Year 1 factor = 11/10. Year 2 factor = 6/5.',
          'Step 2: Combined factor = (11/10) × (6/5) = 66/50 = 33/25 = 1.32.',
          'Step 3: Original × 1.32 = 13,200 ⟹ Original = 13,200 / 1.32 = 10,000.',
        ],
        keyTakeaway: 'Always work backward using fractional ratios rather than 100 decimal steps.',
      },
    ],
    commonTraps: [
      'Confusing base value: In "A is what % more than B", the denominator is B. In "B is what % less than A", the denominator is A.',
      'Assuming +20% and -20% cancel out to 0%. In reality, a% increase followed by a% decrease always results in a net LOSS of (a²/100)%.',
    ],
    shortcuts: [
      'Remember essential fractions: 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%, 1/12 = 8.33%.',
      'Split-and-Add mental math: 35% of 240 = 25% of 240 (60) + 10% of 240 (24) = 84.',
    ],
    relatedTopics: [
      { id: 'profit_loss', title: 'Profit, Loss & Discount', subject: 'quantitative' },
      { id: 'ratio_proportion', title: 'Ratio & Proportion', subject: 'quantitative' },
      { id: 'data_interpretation', title: 'Data Interpretation', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_pct_01', 'q_pct_02', 'q_pct_03', 'q_pct_04'],
  },

  {
    id: 'profit_loss',
    subject: 'quantitative',
    title: 'Profit, Loss & Discount',
    tagline: 'Commercial mathematics asked in every major company screening round.',
    placementImportance: 'Tested heavily by TCS, Cognizant, and Wipro. Frequently combined with Marked Price (MP) and false weight trick questions.',
    estimatedMinutes: 25,
    concepts: [
      {
        heading: '1. Fundamentals of CP, SP, and MP',
        body: 'Profit or Loss is ALWAYS calculated on Cost Price (CP) unless specified otherwise. Discount is ALWAYS calculated on Marked Price (MP).',
        bulletPoints: [
          'Profit = SP - CP | Profit % = (Profit / CP) × 100',
          'Loss = CP - SP | Loss % = (Loss / CP) × 100',
          'SP = CP × (100 + P%) / 100 = MP × (100 - D%) / 100',
          'CP : MP Ratio = (100 - Discount%) : (100 + Profit%)',
        ],
      },
      {
        heading: '2. Dishonest Merchant & False Weights',
        body: 'When a trader claims to sell at Cost Price but uses a false weight of (1000 - g) grams instead of 1 kg, Gain % = [Error / (True Value - Error)] × 100.',
      },
      {
        heading: '3. Successive Discounts',
        body: 'Two successive discounts of d1% and d2% are equivalent to a single discount of: Equivalent D% = d1 + d2 - (d1 × d2) / 100.',
      },
    ],
    formulas: [
      {
        name: 'CP to Marked Price Golden Ratio',
        expression: 'CP / MP = (100 - D%) / (100 + P%)',
        explanation: 'Enables jumping directly from Cost Price to Marked Price without finding SP.',
        example: 'Trader gives 10% discount and still earns 20% profit. CP/MP = (100 - 10)/(100 + 20) = 90/120 = 3/4. So MP is 33.33% above CP.',
      },
      {
        name: 'Dishonest Dealer Gain Percentage',
        expression: 'Gain % = [Error / (False Weight)] × 100',
        explanation: 'Error is the deficit amount delivered to the buyer.',
        example: 'Uses 800g instead of 1000g. Error = 200g. Gain % = (200 / 800) × 100 = 25%.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Marked Price Direct Ratio Application',
        problem: 'A retailer buys an electric kettle for ₹1,800. What price should he mark on it so that after offering a discount of 10%, he still makes a profit of 25%?',
        solutionSteps: [
          'Step 1: Use Golden Ratio: CP / MP = (100 - D%) / (100 + P%)',
          'Step 2: CP / MP = (100 - 10) / (100 + 25) = 90 / 125 = 18 / 25',
          'Step 3: 1,800 / MP = 18 / 25 ⟹ MP = (1,800 × 25) / 18 = ₹2,500.',
        ],
        shortcutMethod: '18 units = 1800 ⟹ 1 unit = 100 ⟹ 25 units = 2500. Solved in 10 seconds without calculating SP.',
        keyTakeaway: 'Never compute intermediate Selling Price when given both discount% and profit%.',
      },
    ],
    commonTraps: [
      'Applying discount to Cost Price. Discount is strictly on Marked Price.',
      'In dishonest dealer questions, students often divide by 1000g instead of 800g (the actual goods given away).',
    ],
    shortcuts: [
      'When two items are sold at the same SP, one at x% profit and the other at x% loss, there is ALWAYS an overall loss of (x/10)% squared = (x²/100)%.',
    ],
    relatedTopics: [
      { id: 'percentages', title: 'Percentages', subject: 'quantitative' },
      { id: 'simple_compound_interest', title: 'Simple & Compound Interest', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_pl_01', 'q_pl_02', 'q_pl_03'],
  },

  {
    id: 'time_work',
    subject: 'quantitative',
    title: 'Time & Work (LCM Method)',
    tagline: 'Solve complex crew and pipe problems with whole-number unit efficiencies.',
    placementImportance: 'Top 3 most asked topics across all engineering campus placement tests. Solvable in under 40 seconds using LCM.',
    estimatedMinutes: 25,
    concepts: [
      {
        heading: '1. The LCM Total Work Framework',
        body: 'Forget working with 1/A and 1/B fractions. Assume Total Work = LCM of given individual times. Then compute daily efficiency = Total Work / Days.',
        bulletPoints: [
          'If A takes 12 days and B takes 15 days, LCM(12, 15) = 60 units.',
          'A efficiency = 60/12 = 5 units/day; B efficiency = 60/15 = 4 units/day.',
          'Combined efficiency = 5 + 4 = 9 units/day. Total days = 60 / 9 = 20/3 = 6.67 days.',
        ],
      },
      {
        heading: '2. The MDH Work Formula (Men, Days, Hours)',
        body: 'Work Done = Men × Days × Hours × Efficiency. Therefore: (M1 × D1 × H1 × E1) / W1 = (M2 × D2 × H2 × E2) / W2.',
      },
      {
        heading: '3. Pipes and Cisterns Equivalence',
        body: 'Inlet pipes do positive work (+ units/hr); leak/outlet pipes do negative work (- units/hr). Same LCM framework applies directly.',
      },
    ],
    formulas: [
      {
        name: 'Combined Time (Two Workers)',
        expression: 'Time = (A × B) / (A + B)',
        explanation: 'Quick shortcut when only two entities work together from start to finish.',
        example: 'A takes 20 days, B takes 30 days. Combined = (20 × 30) / (20 + 30) = 600 / 50 = 12 days.',
      },
      {
        name: 'Chain Rule / MDH Formula',
        expression: '(M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2',
        explanation: 'Equate when work amounts W1 and W2 are different.',
        example: '15 men can dig a 50m trench in 6 days. How many days will 10 men take to dig a 100m trench?',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Leaving Mid-Way Problem',
        problem: 'A can finish a software module in 12 days and B in 18 days. They worked together for 4 days, then A left. How many more days will B take to complete the remaining code?',
        solutionSteps: [
          'Step 1: Total Work = LCM(12, 18) = 36 units.',
          'Step 2: Efficiency of A = 36/12 = 3 units/day. Efficiency of B = 36/18 = 2 units/day.',
          'Step 3: In 4 days together, work done = 4 × (3 + 2) = 20 units.',
          'Step 4: Remaining work = 36 - 20 = 16 units.',
          'Step 5: Days taken by B alone = 16 / 2 = 8 days.',
        ],
        shortcutMethod: 'Fast mental subtraction: Remaining 16 units at 2 units/day = 8 days.',
        keyTakeaway: 'Always subtract work done during collaborative period before dividing by lone worker efficiency.',
      },
    ],
    commonTraps: [
      'Adding days instead of adding efficiencies! If A takes 10 days and B takes 10 days, combined is 5 days, NEVER 20.',
      'Treating "left before completion" identically to "left after starting". If someone leaves x days before end, add their x days work to total units.',
    ],
    shortcuts: [
      'If A is twice as efficient as B, Ratio of Efficiency = 2:1, Ratio of Time = 1:2. Time and Efficiency are inversely proportional.',
    ],
    relatedTopics: [
      { id: 'pipes_cisterns', title: 'Pipes & Cisterns', subject: 'quantitative' },
      { id: 'time_speed_distance', title: 'Time, Speed & Distance', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_tw_01', 'q_tw_02', 'q_tw_03'],
  },

  {
    id: 'time_speed_distance',
    subject: 'quantitative',
    title: 'Time, Speed & Distance (Trains & Boats)',
    tagline: 'Master relative speed, trains crossing platforms, and stream flows.',
    placementImportance: 'Essential for Infosys, Accenture, TCS, and AMCAT/CoCubes assessments. Solvable with relative speed rules.',
    estimatedMinutes: 25,
    concepts: [
      {
        heading: '1. Units Conversion & Core Relationship',
        body: 'Distance = Speed × Time. Always synchronize units before calculating: to convert km/hr to m/s, multiply by 5/18. To convert m/s to km/hr, multiply by 18/5.',
      },
      {
        heading: '2. Average Speed for Equal Distances',
        body: 'When traveling distance D at speed S1 and returning same distance D at speed S2, Average Speed = (2 × S1 × S2) / (S1 + S2). Note: It is NEVER the arithmetic mean (S1+S2)/2!',
      },
      {
        heading: '3. Relative Speed Principles',
        body: 'Same direction = |S1 - S2| (subtract speeds). Opposite direction (towards each other) = S1 + S2 (add speeds).',
        bulletPoints: [
          'Train crossing a pole/person: Distance = Length of Train.',
          'Train crossing a platform/bridge: Distance = Length of Train + Length of Platform.',
          'Boats in water: Downstream Speed (D) = Speed in still water (u) + Stream speed (v).',
          'Upstream Speed (U) = u - v ⟹ Still water speed u = (D + U)/2; Stream speed v = (D - U)/2.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Average Speed (Equal Distances)',
        expression: 'Avg Speed = (2 × u × v) / (u + v)',
        explanation: 'Harmonic mean of the two speeds.',
        example: 'A car goes at 60 km/h and returns at 40 km/h. Avg speed = (2 × 60 × 40) / (60 + 40) = 4800 / 100 = 48 km/h.',
      },
      {
        name: 'Train Crossing Platform Time',
        expression: 'Time = (Length_train + Length_platform) / Speed_train',
        explanation: 'Convert speed to m/s by multiplying with 5/18.',
        example: 'Train of 180m crossing 120m platform at 54 km/h (15 m/s). Time = (180+120)/15 = 300/15 = 20 seconds.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Train Crossing a Moving Person',
        problem: 'A train 150m long moving at 68 km/h crosses a man running in the same direction at 8 km/h. How many seconds does the train take to pass the man?',
        solutionSteps: [
          'Step 1: Same direction ⟹ Relative Speed = 68 - 8 = 60 km/h.',
          'Step 2: Convert to m/s: 60 × (5 / 18) = 300 / 18 = 50 / 3 m/s.',
          'Step 3: Distance to cover = Length of train = 150m.',
          'Step 4: Time = 150 / (50 / 3) = (150 × 3) / 50 = 9 seconds.',
        ],
        keyTakeaway: 'Always compute relative speed first before converting to m/s.',
      },
    ],
    commonTraps: [
      'Averaging speeds by simple arithmetic mean (e.g. (60+40)/2 = 50 km/h is incorrect, answer is 48 km/h).',
      'Forgetting to add platform length to train length in bridge/tunnel crossing problems.',
    ],
    shortcuts: [
      '5/18 quick table: 18 km/h = 5 m/s, 36 km/h = 10 m/s, 54 km/h = 15 m/s, 72 km/h = 20 m/s, 90 km/h = 25 m/s.',
    ],
    relatedTopics: [
      { id: 'time_work', title: 'Time & Work', subject: 'quantitative' },
      { id: 'ratio_proportion', title: 'Ratio & Proportion', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_tsd_01', 'q_tsd_02'],
  },

  {
    id: 'simple_compound_interest',
    subject: 'quantitative',
    title: 'Simple & Compound Interest',
    tagline: 'Master interest differentials and compound multiplier growth.',
    placementImportance: 'Tested consistently in quantitative rounds. 2-year and 3-year difference questions appear frequently in TCS & Infosys.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. Simple Interest (SI) Dynamics',
        body: 'SI = (P × R × T) / 100. In SI, the interest earned each year is CONSTANT because it is always calculated on the original Principal.',
      },
      {
        heading: '2. Compound Interest (CI) as Successive Growth',
        body: 'Amount = P(1 + R/100)^T. CI is essentially successive percentage growth. For 2 years at 10%, effective CI rate = 10 + 10 + (10×10)/100 = 21%, while SI rate = 20%. The difference is exactly 1%!',
      },
      {
        heading: '3. The CI - SI Difference Shortcuts',
        body: 'For 2 years: Difference = P × (R / 100)². For 3 years: Difference = P × (R / 100)² × (3 + R/100).',
      },
    ],
    formulas: [
      {
        name: '2-Year CI - SI Difference',
        expression: 'Diff = P × (R / 100)²',
        explanation: 'Instant solution for 2-year interest delta questions.',
        example: 'P = ₹5,000, R = 10%. Diff = 5000 × (10/100)² = 5000 × 0.01 = ₹50.',
      },
      {
        name: 'Rule of 72 (Doubling Money)',
        expression: 'Years to Double ≈ 72 / R',
        explanation: 'Approximate time for compound investment to double.',
        example: 'At 8% compound interest, money doubles in ~ 72 / 8 = 9 years.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Finding Principal from Difference',
        problem: 'The difference between Compound Interest and Simple Interest on a sum of money for 2 years at 8% per annum is ₹32. Find the sum.',
        solutionSteps: [
          'Step 1: Formula: Diff = P × (R / 100)²',
          'Step 2: 32 = P × (8 / 100)² = P × (64 / 10000)',
          'Step 3: P = (32 × 10000) / 64 = 10000 / 2 = ₹5,000.',
        ],
        keyTakeaway: 'This formula converts a 3-minute algebraic expansion into a 15-second calculation.',
      },
    ],
    commonTraps: [
      'Half-yearly compounding: Remember to halve the rate (R/2) and double the time periods (2T).',
    ],
    shortcuts: [
      'Effective CI rate for 2 years at R%: 2R + (R²/100)%. For 5% = 10.25%, for 10% = 21%, for 20% = 44%.',
    ],
    relatedTopics: [
      { id: 'percentages', title: 'Percentages', subject: 'quantitative' },
      { id: 'profit_loss', title: 'Profit & Loss', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_si_01', 'q_si_02'],
  },

  {
    id: 'ratio_proportion',
    subject: 'quantitative',
    title: 'Ratio, Proportion & Variations',
    tagline: 'Combine multi-variable ratios and allocate parts in seconds.',
    placementImportance: 'Fundamental bridge topic. Used across Partnership, Mixtures, Ages, and Work allocation.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. Combining Ratios (The N-Method)',
        body: 'If A:B = 2:3 and B:C = 4:5, combine them into A:B:C by multiplying terms: A = 2×4 = 8, B = 3×4 = 12, C = 3×5 = 15. A:B:C = 8:12:15.',
      },
      {
        heading: '2. Proportion and Mean Proportional',
        body: 'If a:b :: c:d, then Product of Extremes = Product of Means: a × d = b × c. Mean proportional between a and b is √(a × b). Third proportional to a and b is b² / a.',
      },
    ],
    formulas: [
      {
        name: 'Combined Ratio Shortcut (A:B and B:C)',
        expression: 'A:B:C = (a1 × b2) : (b1 × b2) : (b1 × c2)',
        explanation: 'Fills the gaps by sliding neighboring terms.',
        example: 'A:B = 3:4, B:C = 5:6 ⟹ A:B:C = (3×5):(4×5):(4×6) = 15:20:24.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Dividing Sum into Multi-tier Ratios',
        problem: '₹4,500 is divided among A, B, and C such that A:B = 2:3 and B:C = 4:5. How much does B receive?',
        solutionSteps: [
          'Step 1: Combine into A:B:C = (2×4):(3×4):(3×5) = 8:12:15.',
          'Step 2: Total parts = 8 + 12 + 15 = 35 parts.',
          'Step 3: ₹4500 / 35 doesn\'t simplify cleanly, so if sum is ₹4,200: 4200 / 35 = 120 per part. B receives 12 × 120 = ₹1,440.',
        ],
        keyTakeaway: 'Always combine before dividing the total sum.',
      },
    ],
    commonTraps: [
      'Directly adding ratios from different scales without normalizing the common variable.',
    ],
    shortcuts: [
      'In direct proportion y ∝ x, y1/x1 = y2/x2. In inverse proportion y ∝ 1/x, y1 × x1 = y2 × x2.',
    ],
    relatedTopics: [
      { id: 'percentages', title: 'Percentages', subject: 'quantitative' },
      { id: 'mixtures_alligation', title: 'Mixtures & Alligation', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_rp_01'],
  },

  {
    id: 'mixtures_alligation',
    subject: 'quantitative',
    title: 'Mixtures & Alligation Rule',
    tagline: 'The graphic X-cross rule that eliminates long weighted-average equations.',
    placementImportance: 'High yield for quick solving in Accenture, Cognizant, and product firms.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. The Alligation Cross Rule',
        body: 'When two ingredients of prices/qualities C1 (cheaper) and C2 (dearer) are mixed to obtain a mean value M, the ratio of quantities Q1 : Q2 = (C2 - M) : (M - C1).',
      },
      {
        heading: '2. Repeated Replacement of Pure Liquid',
        body: 'If a vessel contains V litres of pure liquid and x litres are removed and replaced with water n times, Remaining Pure Liquid = V × (1 - x/V)^n.',
      },
    ],
    formulas: [
      {
        name: 'The Alligation Cross Ratio',
        expression: 'Q(Cheaper) / Q(Dearer) = (Price_Dearer - Mean) / (Mean - Price_Cheaper)',
        explanation: 'Graphic cross subtraction.',
        example: 'Mix rice at ₹20/kg and ₹30/kg to get mixture at ₹26/kg. Ratio = (30-26) : (26-20) = 4 : 6 = 2 : 3.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Milk and Water Replacement',
        problem: 'A container has 40 litres of pure milk. 4 litres are drawn out and replaced with water. This process is repeated 2 more times (total 3 times). How much pure milk remains?',
        solutionSteps: [
          'Step 1: Formula: Remaining = V × (1 - x/V)^n',
          'Step 2: V = 40, x = 4, n = 3. 1 - 4/40 = 1 - 1/10 = 9/10.',
          'Step 3: Remaining = 40 × (9/10)³ = 40 × (729 / 1000) = 4 × 7.29 = 29.16 litres.',
        ],
        keyTakeaway: 'Fraction base (9/10) cubed is 729/1000. Fast mental arithmetic.',
      },
    ],
    commonTraps: [
      'Putting selling price in place of cost price in the alligation cross. All three entries MUST be on the same base (e.g. all Cost Prices).',
    ],
    shortcuts: [
      'Alligation can be applied to Averages, Speeds, and Profit percentages as well!',
    ],
    relatedTopics: [
      { id: 'ratio_proportion', title: 'Ratio & Proportion', subject: 'quantitative' },
      { id: 'percentages', title: 'Percentages', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_mix_01'],
  },

  {
    id: 'permutations_combinations',
    subject: 'quantitative',
    title: 'Permutations, Combinations & Probability',
    tagline: 'Arrangements, selections, and outcomes without brute-force counting.',
    placementImportance: 'Tested in product company rounds and Tier-1 service providers (Amazon, TCS Digital, Cognizant GenC Next).',
    estimatedMinutes: 25,
    concepts: [
      {
        heading: '1. Permutation (Order Matters) vs Combination (Selection Only)',
        body: 'P(n, r) = n! / (n - r)! (Arrangement of items in specific order). C(n, r) = n! / [r! (n - r)!] (Group selection where order is irrelevant).',
      },
      {
        heading: '2. Circular Permutation & Repetitions',
        body: 'Arranging n distinct items in a circle = (n - 1)!. Arranging a word with repeating letters like "APPLE" (5 letters, two Ps) = 5! / 2! = 120 / 2 = 60.',
      },
      {
        heading: '3. Probability of Complementary Events',
        body: 'P(At least one) = 1 - P(None). This single identity saves 80% of computation in coin, dice, and committee questions.',
      },
    ],
    formulas: [
      {
        name: 'Selection Formula (Combinations)',
        expression: 'nCr = n! / [r! × (n - r)!]',
        explanation: 'Shortcut: nCr = nC(n-r). E.g. 10C8 = 10C2 = (10 × 9) / (2 × 1) = 45.',
        example: 'Select 3 students from 7: 7C3 = (7 × 6 × 5) / (3 × 2 × 1) = 35.',
      },
      {
        name: 'Complementary Probability',
        expression: 'P(At least 1 success) = 1 - P(Zero successes)',
        explanation: 'Avoids summing multiple scenarios P(1) + P(2) + P(3)...',
        example: 'Tossing 3 coins, P(at least 1 head) = 1 - P(no heads/all tails) = 1 - (1/2)³ = 7/8.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Word Letter Arrangements with Condition',
        problem: 'In how many different ways can the letters of the word "LEADING" be arranged such that the vowels always come together?',
        solutionSteps: [
          'Step 1: Word: L, E, A, D, I, N, G (7 letters). Vowels = E, A, I (3 vowels). Consonants = L, D, N, G (4 consonants).',
          'Step 2: Bundle vowels together as a single unit (EAI). Total units = 4 consonants + 1 bundle = 5 units.',
          'Step 3: Arrange 5 units = 5! = 120 ways.',
          'Step 4: Arrange vowels within the bundle = 3! = 6 ways.',
          'Step 5: Total ways = 120 × 6 = 720 ways.',
        ],
        keyTakeaway: 'Always treat items that must stay together as a single super-element, then multiply by internal permutations.',
      },
    ],
    commonTraps: [
      'Forgetting to arrange items internally within the grouped bundle.',
    ],
    shortcuts: [
      'Handshake problem: n people shaking hands with each other exactly once = nC2 = n(n-1)/2.',
    ],
    relatedTopics: [
      { id: 'number_system', title: 'Number System', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_pnc_01', 'q_pnc_02'],
  },

  {
    id: 'number_system',
    subject: 'quantitative',
    title: 'Number System, HCF & LCM',
    tagline: 'Divisibility rules, unit digit cyclicity, and prime structures.',
    placementImportance: 'Present in every test. High frequency in TCS NQT Foundation and Infosys Mathematical Abilities.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. Unit Digit Cyclicity (Power Cycles)',
        body: 'Powers of digits cycle in patterns of at most 4: Cycle of 2: 2, 4, 8, 6. Cycle of 3: 3, 9, 7, 1. Cycle of 7: 7, 9, 3, 1. Cycle of 8: 8, 4, 2, 6. Divide the exponent by 4 to determine position.',
      },
      {
        heading: '2. Divisibility Shortcuts',
        body: 'By 3/9: Sum of digits. By 4: Last 2 digits. By 8: Last 3 digits. By 11: Difference of sum of alternate digits must be 0 or multiple of 11.',
      },
      {
        heading: '3. Fundamental LCM-HCF Identity',
        body: 'For any two numbers A and B: Product of Numbers = HCF × LCM. (A × B = HCF × LCM).',
      },
    ],
    formulas: [
      {
        name: 'Product of Two Numbers',
        expression: 'Number_1 × Number_2 = HCF × LCM',
        explanation: 'Only strictly valid for two numbers.',
        example: 'HCF = 12, LCM = 72. One number is 24. Other = (12 × 72)/24 = 36.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Finding Unit Digit of Large Exponent',
        problem: 'Find the unit digit of 7²⁴⁵ × 3³⁸.',
        solutionSteps: [
          'Step 1: Cyclicity of 7 is 4. Power 245 ÷ 4 leaves remainder 1 ⟹ Unit digit of 7²⁴⁵ = 7¹ = 7.',
          'Step 2: Cyclicity of 3 is 4. Power 38 ÷ 4 leaves remainder 2 ⟹ Unit digit of 3³⁸ = 3² = 9.',
          'Step 3: Multiply unit digits: 7 × 9 = 63 ⟹ Unit digit is 3.',
        ],
        keyTakeaway: 'Always take remainder modulo 4 for powers when computing unit digits.',
      },
    ],
    commonTraps: [
      'Applying Number1 × Number2 × Number3 = HCF × LCM for three numbers. It only works for pairs!',
    ],
    shortcuts: [
      'LCM of fractions = LCM of numerators / HCF of denominators. HCF of fractions = HCF of numerators / LCM of denominators.',
    ],
    relatedTopics: [
      { id: 'percentages', title: 'Percentages', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_num_01', 'q_num_02'],
  },

  // ================= LOGICAL REASONING =================
  {
    id: 'syllogisms',
    subject: 'logical',
    title: 'Syllogisms & Deductive Logic',
    tagline: 'Venn diagram deduction, 100% true conclusions, and Either-Or cases.',
    placementImportance: 'Tested in TCS, Infosys, Wipro, Capgemini, Tech Mahindra. 3 to 5 questions in reasoning section.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. Golden Rule of Syllogism',
        body: 'A conclusion is valid ONLY if it holds true in EVERY possible Venn diagram representation. If it is false even in one conceivable diagram, the conclusion is invalid.',
      },
      {
        heading: '2. Standard Quantifiers',
        body: 'All A are B (A is entirely inside B). Some A are B (A and B intersect). No A is B (A and B are completely disjoint). Some A are not B (At least one part of A lies outside B).',
      },
      {
        heading: '3. Either-Or Complementary Pairs',
        body: 'Three conditions for "Either I or II follows": Both individual conclusions must be independently doubtful (false); both must share the same subject and predicate; one must be affirmative and the other negative (Some + No, or All + Some Not).',
      },
    ],
    formulas: [
      {
        name: 'Complementary Pair Conditions',
        expression: 'Subject & Predicate identical + Both doubtful + (Some + No) OR (All + Some Not)',
        explanation: 'Must never pair "All" and "No" in Either-Or.',
        example: 'Conclusion 1: Some dogs are cats. Conclusion 2: No dog is cat. If both are uncertain, answer is Either I or II follows.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Syllogism with Negation',
        problem: 'Statements: All pens are books. No book is a phone. Conclusions: I. No pen is a phone. II. Some books are pens.',
        solutionSteps: [
          'Step 1: All pens are inside books. Books and phones have zero overlap.',
          'Step 2: Since the entire container (books) cannot touch phone, anything inside (pens) can never touch phone. Conclusion I is TRUE.',
          'Step 3: Since all pens are books, the intersection region of books contains pens. Conclusion II is TRUE.',
          'Step 4: Both I and II follow.',
        ],
        keyTakeaway: 'Outer boundary isolation automatically isolates whatever is enclosed within.',
      },
    ],
    commonTraps: [
      'Assuming "Some A are B" implies "Some A are NOT B". In formal logic, "Some" only guarantees at least one overlap; all might overlap!',
    ],
    shortcuts: [
      'If all statements are positive (All / Some), no definite negative conclusion (No / Some Not) can ever follow.',
    ],
    relatedTopics: [
      { id: 'seating_arrangement', title: 'Seating Arrangement', subject: 'logical' },
      { id: 'blood_relations', title: 'Blood Relations', subject: 'logical' },
    ],
    practiceQuestionIds: ['q_syl_01', 'q_syl_02'],
  },

  {
    id: 'blood_relations',
    subject: 'logical',
    title: 'Blood Relations & Family Trees',
    tagline: 'Map complex generational links using standard shorthand notation.',
    placementImportance: 'Consistent presence in every placement aptitude paper. 2-3 questions per test.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. Family Tree Shorthand Symbols',
        body: 'Male: [+], Female: [-]. Married couple: [=] double line. Siblings: [-] single horizontal line. Generations: Vertical line connecting levels.',
      },
      {
        heading: '2. Paternal vs Maternal Relations',
        body: 'Paternal = Father\'s side (Paternal uncle = Father\'s brother). Maternal = Mother\'s side. Nephew = Brother or sister\'s son. Niece = Brother or sister\'s daughter.',
      },
    ],
    formulas: [
      {
        name: 'Generational Level Shorthand',
        expression: 'Level +1: Parents/Uncles/Aunts | Level 0: Self/Siblings/Spouse/Cousins | Level -1: Children/Nieces/Nephews',
        explanation: 'Keeps track of generational distance instantly.',
        example: 'My father\'s only son = Myself (if speaker is male).',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Pointing to a Photograph',
        problem: 'Pointing to a photograph, Rohit said, "She is the daughter of the only son of my grandfather." How is the girl in the photograph related to Rohit?',
        solutionSteps: [
          'Step 1: Break from the end: "My grandfather" ⟹ Rohit\'s grandfather.',
          'Step 2: "The only son of my grandfather" ⟹ Rohit\'s father (since only son).',
          'Step 3: "Daughter of Rohit\'s father" ⟹ Rohit\'s sister.',
          'Step 4: Answer: Sister.',
        ],
        keyTakeaway: 'Always trace backward from the possessive pronoun "my".',
      },
    ],
    commonTraps: [
      'Assuming gender from names! In logical aptitude, a name like "Kiran" or "Robin" has unknown gender unless explicitly stated by pronoun (he/she) or relation.',
    ],
    shortcuts: [
      'Substitute yourself into the speaker\'s shoes for 1-sentence pointing puzzles.',
    ],
    relatedTopics: [
      { id: 'direction_sense', title: 'Direction Sense', subject: 'logical' },
      { id: 'seating_arrangement', title: 'Seating Arrangement', subject: 'logical' },
    ],
    practiceQuestionIds: ['q_br_01', 'q_br_02'],
  },

  {
    id: 'direction_sense',
    subject: 'logical',
    title: 'Direction Sense & Pythagoras Vectors',
    tagline: 'Compass orientations, angle turns, and shortest distance coordinates.',
    placementImportance: 'Quick scoring questions in TCS, Wipro, and Infosys test sets.',
    estimatedMinutes: 15,
    concepts: [
      {
        heading: '1. Cardinal & Intercardinal Compass',
        body: 'North (Up), South (Down), East (Right), West (Left). Northeast, Northwest, Southeast, Southwest.',
      },
      {
        heading: '2. Left and Right Turns',
        body: 'Facing North: Right is East, Left is West. Facing South: Right is West, Left is East (reversed!). Facing East: Right is South, Left is North. Facing West: Right is North, Left is South.',
      },
      {
        heading: '3. Shortest Distance (Pythagorean Theorem)',
        body: 'Shortest displacement = √(Δx² + Δy²). Memorize standard Pythagorean triples: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25).',
      },
    ],
    formulas: [
      {
        name: 'Displacement Formula',
        expression: 'Shortest Distance = √(Horizontal² + Vertical²)',
        explanation: 'Net horizontal distance along E-W axis and net vertical distance along N-S axis.',
        example: 'Walks 6m East, then 8m North. Distance = √(6² + 8²) = √(36 + 64) = 10m Northeast.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Multi-Turn Journey',
        problem: 'A person walks 12 km North, turns right and walks 5 km, then turns right again and walks 12 km. In which direction and how far is he from his initial point?',
        solutionSteps: [
          'Step 1: Vertical net = +12 km (North) - 12 km (South after 2 rights) = 0 km.',
          'Step 2: Horizontal net = +5 km (East).',
          'Step 3: Distance = 5 km East from initial point.',
        ],
        keyTakeaway: 'Cancel out equal opposing vectors (+12 North and -12 South = 0).',
      },
    ],
    commonTraps: [
      'In shadow problems at sunrise: Sun is in East, shadow is always cast towards West. At sunset: Sun is in West, shadow is cast towards East.',
    ],
    shortcuts: [
      'Recognize Pythagorean triples instantly without squaring large numbers.',
    ],
    relatedTopics: [
      { id: 'blood_relations', title: 'Blood Relations', subject: 'logical' },
      { id: 'seating_arrangement', title: 'Seating Arrangement', subject: 'logical' },
    ],
    practiceQuestionIds: ['q_dir_01'],
  },

  {
    id: 'seating_arrangement',
    subject: 'logical',
    title: 'Seating Arrangement (Linear & Circular)',
    tagline: 'Linear rows, circular inward/outward arrangements, and constraint grids.',
    placementImportance: 'Forms multi-question comprehension sets (3 to 5 marks) in placement tests.',
    estimatedMinutes: 25,
    concepts: [
      {
        heading: '1. Circular Arrangement Rules',
        body: 'When facing the center (inward): Right is Counter-Clockwise (anti-clockwise), Left is Clockwise. When facing outward: Right is Clockwise, Left is Anti-clockwise.',
      },
      {
        heading: '2. Clue Prioritization Strategy',
        body: 'Always start with definite position clues (e.g., "A sits third to the right of B"), NOT negative or ambiguous clues ("C is not adjacent to D"). Create 2 parallel possible cases and eliminate as contradictions appear.',
      },
    ],
    formulas: [
      {
        name: 'Opposite Position in Even Circle',
        expression: 'Position of Opposite Person = (n / 2) seats away',
        explanation: 'In 8-person circle, opposite person is exactly 4 seats away in either direction.',
        example: 'In 6 people circle, opposite person is 3 seats away.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Circular Placement Clue Execution',
        problem: '6 friends A, B, C, D, E, and F sit around a circular table facing the center. A is opposite to D. B is to the immediate right of A. F is between A and E. Who sits to the immediate left of D?',
        solutionSteps: [
          'Step 1: Place A at bottom (Pos 1) facing center. D sits directly opposite at top (Pos 4).',
          'Step 2: Facing center from Pos 1, Right is counter-clockwise ⟹ B is at Pos 2.',
          'Step 3: F is between A and E ⟹ Pos 6 must be F and Pos 5 must be E.',
          'Step 4: The only remaining seat Pos 3 goes to C.',
          'Step 5: D is at Pos 4 facing center. To D\'s immediate left (clockwise) is Pos 3 (C).',
        ],
        keyTakeaway: 'Lock in opposite anchors first, then wind clockwise or counter-clockwise.',
      },
    ],
    commonTraps: [
      'Mixing up right and left when characters face away from the center.',
    ],
    shortcuts: [
      'Draw a clock-face circle with 6 or 8 spokes for rapid sketching.',
    ],
    relatedTopics: [
      { id: 'syllogisms', title: 'Syllogisms', subject: 'logical' },
    ],
    practiceQuestionIds: ['q_seat_01'],
  },

  // ================= VERBAL ABILITY =================
  {
    id: 'spotting_errors',
    subject: 'verbal',
    title: 'Spotting Errors & Subject-Verb Agreement',
    tagline: 'Master the 10 most tested grammar rules that catch 90% of sentence errors.',
    placementImportance: 'Essential in TCS Verbal, Infosys Communication, and Accenture English rounds.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. Subject-Verb Agreement with Intervening Phrases',
        body: 'The verb must agree with the true grammatical subject, not the noun immediately preceding it in a prepositional phrase.',
        bulletPoints: [
          'The quality of these mangoes is (not are) exceptional.',
          'The teacher, along with all her students, was (not were) felicitated.',
          'Words like "as well as", "along with", "together with", "in addition to" do NOT change the number of the subject.',
        ],
      },
      {
        heading: '2. The Either... Or / Neither... Nor Proximity Rule',
        body: 'When subjects are joined by "either... or" or "neither... nor", the verb agrees with the subject closest to it. Example: Neither the principal nor the teachers were present. Neither the teachers nor the principal was present.',
      },
      {
        heading: '3. Redundancy & Tense Consistency',
        body: 'Avoid double comparatives ("more better"), double past tense ("did not went" ⟹ "did not go"), and contradictory modifiers.',
      },
    ],
    formulas: [
      {
        name: 'Proximity Concord Rule',
        expression: 'Neither S1 nor S2 + Verb [agrees with S2]',
        explanation: 'Verb takes number and person of the noun nearest to it.',
        example: 'Either the captain or the players have decided.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Spotting the Disguised Singular Error',
        problem: 'Identify the error part: "A herd of elephants (A) / were spotted (B) / migrating towards the foothills (C) / No error (D)"',
        solutionSteps: [
          'Step 1: The grammatical subject is "A herd" (collective noun representing one single unit).',
          'Step 2: "of elephants" is a prepositional modifier and does not make the subject plural.',
          'Step 3: Singular subject "A herd" requires singular auxiliary "was spotted", not "were spotted".',
          'Step 4: Error is in part (B).',
        ],
        keyTakeaway: 'Always isolate the collective noun from its plural complement.',
      },
    ],
    commonTraps: [
      'Getting swayed by plural nouns right next to the verb like "The bunch of keys were lost" (correct: was lost).',
    ],
    shortcuts: [
      'Eliminate parenthetical phrases set off by commas to spot the naked subject.',
    ],
    relatedTopics: [
      { id: 'sentence_correction', title: 'Sentence Correction', subject: 'verbal' },
    ],
    practiceQuestionIds: ['q_se_01', 'q_se_02'],
  },

  {
    id: 'sentence_correction',
    subject: 'verbal',
    title: 'Sentence Correction & Parallelism',
    tagline: 'Parallel structure, dangling modifiers, and correct idioms.',
    placementImportance: 'Tested in every tier-1 placement verbal section.',
    estimatedMinutes: 20,
    concepts: [
      {
        heading: '1. The Law of Parallelism',
        body: 'Items in a series or joined by conjunctions (and, but, or) must take identical grammatical forms.',
        bulletPoints: [
          'Incorrect: She enjoys reading, swimming, and to hike.',
          'Correct: She enjoys reading, swimming, and hiking. (All gerunds -ing).',
        ],
      },
      {
        heading: '2. Dangling and Misplaced Modifiers',
        body: 'An introductory participial phrase must modify the subject immediately following the comma.',
        bulletPoints: [
          'Incorrect: Walking down the street, the tree fell on me.',
          'Correct: Walking down the street, I saw the tree fall.',
        ],
      },
    ],
    formulas: [
      {
        name: 'Parallel Structure Rule',
        expression: 'Noun + Noun + Noun | Gerund + Gerund + Gerund | Infinitive + Infinitive',
        explanation: 'Balance elements on both sides of coordinating conjunctions.',
        example: 'The company aims to optimize latency, reduce costs, and improve uptime.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Fixing Misplaced Modifier',
        problem: 'Choose the best correction for: "Having finished the assignment, the TV was turned on by Rahul."',
        solutionSteps: [
          'Step 1: The introductory phrase "Having finished the assignment" describes an action.',
          'Step 2: Who finished the assignment? Rahul, not "the TV".',
          'Step 3: Correct sentence must place Rahul right after the comma: "Having finished the assignment, Rahul turned on the TV."',
        ],
        keyTakeaway: 'The subject after the comma must be capable of performing the action of the opening modifier.',
      },
    ],
    commonTraps: [
      'Passive voice constructions that detach the agent from the introductory modifier.',
    ],
    shortcuts: [
      'Scan the options for verbs matching the series suffix (-ing, -ed, to + verb).',
    ],
    relatedTopics: [
      { id: 'spotting_errors', title: 'Spotting Errors', subject: 'verbal' },
    ],
    practiceQuestionIds: ['q_sc_01'],
  },

  {
    id: 'reading_comprehension',
    subject: 'verbal',
    title: 'Reading Comprehension & Critical Inference',
    tagline: 'Skim techniques, question-first reading, and eliminating extreme choices.',
    placementImportance: 'Carries highest mark density in English screening sections.',
    estimatedMinutes: 25,
    concepts: [
      {
        heading: '1. The Question-First Skimming Protocol',
        body: 'Read the question stems FIRST before diving into the passage. This primes your brain to spot keywords, transition markers, and specific dates/names.',
      },
      {
        heading: '2. The Extreme Option Elimination Rule',
        body: 'In inference and main idea questions, options containing extreme categorical words ("always", "never", "only", "completely", "impossible") are almost always wrong. Placement passages favor nuanced, qualified statements ("often", "may", "suggests", "primarily").',
      },
    ],
    formulas: [
      {
        name: 'Elimination Matrix for RC',
        expression: 'Eliminate: Too broad + Too narrow + Extreme qualifiers + Out of scope',
        explanation: 'Leaves the balanced, evidence-supported inference.',
        example: 'If passage says "Many AI models hallucinate", eliminate option stating "AI will always fail in reasoning".',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Inference vs Direct Fact',
        problem: 'Passage: "Electric vehicles have seen a surge in adoption over the past three years. However, charging infrastructure in tier-2 cities remains underdeveloped, causing potential buyers to hesitate." What can be inferred?',
        solutionSteps: [
          'Step 1: Evaluate choices: A) EV sales will drop to zero. (Extreme - Reject).',
          'Step 2: B) Infrastructure availability directly influences consumer confidence in EV adoption. (Balanced, supported by text).',
          'Step 3: Option B is the sound inference.',
        ],
        keyTakeaway: 'An inference must be necessarily true based on given evidence, not an exaggerated leap.',
      },
    ],
    commonTraps: [
      'Bringing outside real-world knowledge into the answer instead of strictly sticking to author\'s text.',
    ],
    shortcuts: [
      'Transition words like "However", "Nonetheless", "Although" signal the author\'s true pivotal thesis.',
    ],
    relatedTopics: [
      { id: 'spotting_errors', title: 'Spotting Errors', subject: 'verbal' },
    ],
    practiceQuestionIds: ['q_rc_01'],
  },

  // ================= PLACEMENT SKILLS =================
  {
    id: 'mental_calculation_shortcuts',
    subject: 'placement_skills',
    title: 'Mental Math & Vedic Shortcuts',
    tagline: 'Cut calculation times in half for time-pressured aptitude rounds.',
    placementImportance: 'Saves 10 to 15 minutes across a 60-minute test. Eliminates basic calculation slip-ups.',
    estimatedMinutes: 15,
    concepts: [
      {
        heading: '1. Squaring Numbers Ending in 5',
        body: 'Multiply the tens digit by (tens digit + 1), then append 25. E.g., 65² = (6 × 7) followed by 25 = 4225. 85² = (8 × 9) followed by 25 = 7225.',
      },
      {
        heading: '2. Multiplication by 11',
        body: 'Keep the outer digits and insert sums of adjacent pairs. E.g., 35 × 11 = 3 _ 5 ⟹ 3 (3+5) 5 = 385. 423 × 11 = 4 (4+2) (2+3) 3 = 4653.',
      },
      {
        heading: '3. The 30-Second Question Selection Rule',
        body: 'Spend the first 30 seconds scanning the question. If you cannot visualize the solving path within 30 seconds, mark for review and MOVE FORWARD. Never get emotionally attached to a problem.',
      },
    ],
    formulas: [
      {
        name: 'Fraction to Percentage Speed Reference',
        expression: '1/2=50%, 1/3=33.3%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%',
        explanation: 'Commit this table to memory for instant mental conversion.',
        example: '3/8 = 3 × 12.5% = 37.5%. 5/6 = 1 - 1/6 = 100% - 16.67% = 83.33%.',
      },
    ],
    workedExamples: [
      {
        title: 'Example 1: Multiplying Numbers Close to Base 100',
        problem: 'Calculate 96 × 94 mentally.',
        solutionSteps: [
          'Step 1: Deviations from 100: 96 is -4, 94 is -6.',
          'Step 2: Cross subtract: 96 - 6 = 90 (or 94 - 4 = 90). First two digits = 90.',
          'Step 3: Multiply deviations: (-4) × (-6) = +24. Last two digits = 24.',
          'Step 4: Result = 9024.',
        ],
        keyTakeaway: 'Deviations from 100 allow instant 2-step mental multiplication.',
      },
    ],
    commonTraps: [
      'Doing scratchpad long-division when answers can be estimated by looking at option digit spreads.',
    ],
    shortcuts: [
      'Unit digit elimination: If options have different last digits, calculate only the unit digit!',
    ],
    relatedTopics: [
      { id: 'percentages', title: 'Percentages', subject: 'quantitative' },
    ],
    practiceQuestionIds: ['q_pct_01'],
  },
];
