export const Gender = {
  Female: 'female',
  Male: 'male',
  Whatever: 'whatever'
} as const;

export type GenderType = (typeof Gender)[keyof typeof Gender];
