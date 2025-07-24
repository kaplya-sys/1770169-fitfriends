import {Role as PrismaModel} from '@1770169-fitfriends/models';

const Role = {
  [PrismaModel.COACH]: 'coach',
  [PrismaModel.USER]: 'user'
} as const;

export type Role = (typeof Role)[keyof typeof Role];
