import {ExerciseType} from './exercise.type';
import {PaymentMethodType} from './payment-method.type';

export type CreateOrderType = {
  exercise: ExerciseType;
  price: number;
  count: number;
  amount: number;
  payment: PaymentMethodType | null;
};
