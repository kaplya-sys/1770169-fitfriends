import {Gender as PrismaModel} from '@1770169-fitfriends/models';

const Gender = {
  [PrismaModel.FEMALE]: 'female',
  [PrismaModel.MALE]: 'male',
  [PrismaModel.WHATEVER]: 'whatever'
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
