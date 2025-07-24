import {TrainingTime as PrismaModel} from '@1770169-fitfriends/models';

const TrainingTime = {
  [PrismaModel.SHORT]: 'short',
  [PrismaModel.MEDIUM]: 'medium',
  [PrismaModel.LONG]: 'long',
  [PrismaModel.EXTRA_LONG]: 'extraLong'
} as const;

export type TrainingTime = (typeof TrainingTime)[keyof typeof TrainingTime];
