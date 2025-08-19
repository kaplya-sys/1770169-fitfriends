export const FitnessLevel = {
  Beginner: 'beginner',
  Amateur: 'amateur',
  Professional: 'professional'
} as const;

export type FitnessLevelType = (typeof FitnessLevel)[keyof typeof FitnessLevel];
