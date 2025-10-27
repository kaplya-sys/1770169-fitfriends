import {Exercise, PaymentMethod} from '@1770169-fitfriends/models';
import {Entity, Order, Training} from '@1770169-fitfriends/types';

export class OrderEntity implements Order, Entity<string> {
  public id?: string;
  public exercise!: Exercise;
  public price!: number;
  public count!: number;
  public amount!: number;
  public payment!: PaymentMethod;
  public createdAt?: Date;
  public userId!: string;
  public trainingId!: string;
  public training?: Training;

  constructor(order: Order) {
    this.populate(order);
  }

  public populate(order: Order) {
    this.id = order.id;
    this.exercise  = order.exercise;
    this.price = order.price;
    this.count = order.count;
    this.amount = order.amount;
    this.payment = order.payment;
    this.createdAt = order.createdAt;
    this.userId = order.userId;
    this.trainingId = order.trainingId;
    this.training = order.training;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      exercise: this.exercise,
      price: this.price,
      count: this.count,
      amount: this.amount,
      payment: this.payment,
      createdAt: this.createdAt,
      userId: this.userId,
      trainingId: this.trainingId,
      training: this.training
    }
  }

  public toPrismaObject() {
    return {
      exercise: this.exercise,
      price: this.price,
      count: this.count,
      amount: this.amount,
      payment: this.payment,
      userId: this.userId,
      trainingId: this.trainingId,
    }
  }

  static fromObject(order: Order) {
    return new OrderEntity(order);
  }
}
