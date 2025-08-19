import {Exercise, PaymentMethod} from '@1770169-fitfriends/models';

import {Training} from './training.interface';

export interface Order {
  id?: string;
  exercise: Exercise;
  price: number;
  count: number;
  amount: number;
  payment: PaymentMethod;
  createdAt?: Date;
  userId: string ;
  trainingId: string;
  training?: Training;
};
