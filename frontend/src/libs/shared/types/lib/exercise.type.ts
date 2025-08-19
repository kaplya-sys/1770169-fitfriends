export const Exercise = {
  Yoga: 'yoga',
  Running: 'running',
  Boxing: 'boxing',
  Stretching: 'stretching',
  Crossfit: 'crossfit',
  Aerobics: 'aerobics',
  Pilates: 'pilates'
} as const;

export type ExerciseType = (typeof Exercise)[keyof typeof Exercise];
