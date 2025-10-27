import {Entity, Notification} from '@1770169-fitfriends/types';

export class NotificationEntity implements Notification, Entity<string> {
  public id?: string;
  public userId!: string;
  public text!: string;
  public createAt?: Date;

  constructor(notification: Notification) {
    this.populate(notification);
  }

  public populate(notification: Notification) {
    this.id = notification.id;
    this.userId = notification.userId;
    this.text = notification.text;
    this.createAt = notification.createAt;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      userId: this.userId,
      text: this.text,
      createAt: this.createAt
    }
  }

  public toPrismaObject() {
    return {
      userId: this.userId,
      text: this.text
    }
  }

  static fromObject(notification: Notification) {
    return new NotificationEntity(notification);
  }
}
