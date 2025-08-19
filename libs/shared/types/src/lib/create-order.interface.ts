import {Exercise, PaymentMethod} from "@1770169-fitfriends/models";

export interface CreateOrder {
  exercise: Exercise;
  price: number;
  count: number;
  amount: number;
  payment: PaymentMethod;
};

