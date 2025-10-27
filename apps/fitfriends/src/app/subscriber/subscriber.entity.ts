import {Entity, Subscriber} from '@1770169-fitfriends/types';

export class SubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email!: string;
  public userId!: string;

  constructor(subscriber: Subscriber) {
    this.populate(subscriber);
  }

  public populate(subscriber: Subscriber) {
    this.id = subscriber.id;
    this.email = subscriber.email;
    this.userId = subscriber.userId;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      userId: this.userId
    };
  }

  static fromObject(subscriber: Subscriber) {
    return new SubscriberEntity(subscriber);
  }
}
