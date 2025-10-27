import {UserApplicationStatus} from '@1770169-fitfriends/models';
import {Entity, User, UserApplication} from '@1770169-fitfriends/types';

export class UserApplicationEntity implements UserApplication, Entity<string> {
  public id?: string;
  public initiatorId!: string;
  public userId!: string;
  public status!: UserApplicationStatus;
  public user?: User;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(userApplication: UserApplication) {
    this.populate(userApplication);
  }

  public populate(userApplication: UserApplication) {
    this.id = userApplication.id;
    this.initiatorId = userApplication.initiatorId;
    this.userId = userApplication.userId;
    this.user = userApplication.user
    this.status = userApplication.status;
    this.createdAt = userApplication.createdAt;
    this.updatedAt = userApplication.updatedAt;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      initiatorId: this.initiatorId,
      userId: this.userId,
      user: this.user,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  public toPrismaObject() {
    return {
      initiatorId: this.initiatorId,
      userId: this.userId,
      status: this.status
    };
  }

  static fromObject(userApplication: UserApplication) {
    return new UserApplicationEntity(userApplication);
  }
}
