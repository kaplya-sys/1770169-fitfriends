export const FilterName = {
  TrainingFilter: 'trainingFilter',
  MyTrainingFilter: 'myTrainingFilter',
  UserFilter: 'userFilter'
} as const;

export type FilterNameType = (typeof FilterName)[keyof typeof FilterName];
