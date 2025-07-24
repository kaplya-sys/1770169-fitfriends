import {FitnessLevel as PrismaModel} from '@1770169-fitfriends/models';

const FitnessLevel = {
  [PrismaModel.BEGINNER]: 'beginner',
  [PrismaModel.AMATEUR]: 'amateur',
  [PrismaModel.PROFESSIONAL]: 'professional'
} as const;

export type FitnessLevel = (typeof FitnessLevel)[keyof typeof FitnessLevel];
