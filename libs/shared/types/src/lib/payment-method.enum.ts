import {PaymentMethod as PrismaModel} from '@1770169-fitfriends/models';

const PaymentMethod = {
  [PrismaModel.VISA]: 'visa',
  [PrismaModel.MIR]: 'mir',
  [PrismaModel.UMONEY]: 'umoney'
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
