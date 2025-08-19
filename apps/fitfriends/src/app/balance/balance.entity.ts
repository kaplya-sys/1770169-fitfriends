import {Entity} from "@1770169-fitfriends/core";
import {Balance, Training} from "@1770169-fitfriends/types";

export class BalanceEntity implements Balance, Entity<string> {
  public id?: string;
  public amount!: number;
  public userId!: string;
  public trainingId!: string;
  public training?: Training;

  constructor(balance: Balance) {
    this.populate(balance);
  }

  public populate(balance: Balance) {
    this.id = balance.id;
    this.amount = balance.amount;
    this.userId = balance.userId;
    this.trainingId = balance.trainingId;
    this.training = balance.training;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      amount: this.amount,
      userId: this.userId,
      trainingId: this.trainingId,
      training: this.training
    }
  }

  public toPrismaObject() {
    return {
      amount: this.amount,
      userId: this.userId,
      trainingId: this.trainingId
    }
  }

  static fromObject(balance: Balance) {
    return new BalanceEntity(balance);
  }
}
