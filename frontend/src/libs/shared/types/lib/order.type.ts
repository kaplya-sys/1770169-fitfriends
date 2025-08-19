import {ExerciseType} from './exercise.type';
import {PaymentMethodType} from './payment-method.type';
import {TrainingType} from './training.type';

export type OrderType = {
  id: string;
  exercise: ExerciseType;
  price: number;
  count: number;
  amount: number;
  payment: PaymentMethodType;
  createdAt: Date;
  training: TrainingType;
};
