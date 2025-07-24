import {Exercise} from './exercise.enum';
import {PaymentMethod} from './payment-method.enum';

export interface Order {
  id: string;
  exercise: Exercise;
  price: number;
  count: number;
  amount: number;
  payment: PaymentMethod;
  createdAt: Date;
  userId: string ;
  trainingId: string;
};
