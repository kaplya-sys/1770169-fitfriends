export const TrainingTime = {
  Short: 'short',
  Medium: 'medium',
  Long: 'long',
  ExtraLong: 'extraLong'
} as const;

export type TrainingTimeType = (typeof TrainingTime)[keyof typeof TrainingTime];
