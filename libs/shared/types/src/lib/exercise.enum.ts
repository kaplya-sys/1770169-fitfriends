import {Exercise as PrismaModel} from '@1770169-fitfriends/models';

const Exercise = {
  [PrismaModel.YOGA]: 'yoga',
  [PrismaModel.RUNNING]: 'running',
  [PrismaModel.BOXING]: 'boxing',
  [PrismaModel.STRETCHING]: 'stretching',
  [PrismaModel.CROSSFIT]: 'crossfit',
  [PrismaModel.AEROBICS]: 'aerobics',
  [PrismaModel.PILATES]: 'pilates'
} as const;

export type Exercise = (typeof Exercise)[keyof typeof Exercise];
