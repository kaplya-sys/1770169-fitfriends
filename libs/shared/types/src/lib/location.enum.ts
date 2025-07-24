import {Location as PrismaModel} from '@1770169-fitfriends/models';

const Location = {
  [PrismaModel.PETROGRADSKAYA]: 'petrogradskaya',
  [PrismaModel.PIONERSKAYA]: 'pionerskaya',
  [PrismaModel.SPORTIVNAYA]: 'sportivnaya',
  [PrismaModel.UDELNAYA]: 'udelnaya',
  [PrismaModel.ZVEZDNAYA]: 'zvezdnaya'
} as const;

export type Location = (typeof Location)[keyof typeof Location];
